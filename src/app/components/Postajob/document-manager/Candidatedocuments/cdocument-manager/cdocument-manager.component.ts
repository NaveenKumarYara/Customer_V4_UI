import { Component, OnInit, Inject, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { FileUploader } from 'ng2-file-upload';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { setTheme } from 'ngx-bootstrap/utils';
import { promise } from 'protractor';
import { resolve } from 'url';
import { c } from '@angular/core/src/render3';
import { SettingsService } from '../../../../../../settings/settings.service';
import { ApiService } from '../../../../../shared/services';
import { AppService } from '../../../../../app.service';
import { AlertService } from '../../../../../shared/alerts/alerts.service';
import { JobdetailsService } from '../../../../jobdetails/jobdetails.service';
const URL = 'http://localhost:4200/fileupload/';
const http = require('https');
const fs = require('fs');
import * as FileSaver from "file-saver";
import { Resume } from '../../../../company-profile/companyprofile/companyprofile.component';
declare var $: any;
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}


@Component({
  selector: 'app-cdocument-manager',
  templateUrl: './cdocument-manager.component.html',
  styleUrls: ['./cdocument-manager.component.css']
})
export class CdocumentManagerComponent implements OnInit {
  uploader:FileUploader;
  selectedFiles: any= [];
  JobDocuments:any=[];
  isProcessing: boolean;
  MyDocuments: any = [];
  fileUploadForm: FormGroup;
  formDAtaList: Array<FormData> = [];
  customerName: any;
  fileType = new Resume();
  fileExt: any;
  CandidateName:any;
  selectedFileNames: string[] = [];
  fileErrorDetail: { file: any; error: string; };
  constructor(public dialogRef: MatDialogRef<CdocumentManagerComponent>,private appService: AppService,private settingsService: SettingsService,private _service: ApiService,private jobdetailsservice: JobdetailsService,private _snackBar: MatSnackBar, private spinner: NgxSpinnerService, private toastr: ToastsManager, private _vcr: ViewContainerRef, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private alertService: AlertService) { 
    this.toastr.setRootViewContainerRef(_vcr);
    this.customerName = JSON.parse(sessionStorage.getItem('userData'));
    let maxFileSize = 2 * 1024 * 1024;
    this.uploader = new FileUploader({
      url: URL,
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      allowedFileType: ['pdf','doc','rtf','docx','txt'],
      maxFileSize : maxFileSize,
      filters: [ { name: 'fileTypeAllowed', fn: function (item , options) { let itemType = item.name.substring(item.name.lastIndexOf('.')+1, item.name.length) || item.name; let fileTypesAllowed = ['pdf','doc','rtf','docx','txt']; if (!fileTypesAllowed.includes(itemType)) { return this.queue.onWhenAddingFileFailed; } else { return this.queue; } } } ],
      formatDataFunction: async (item) => {
        return new Promise( (resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date()
          });
        });
      }

    
    });
  }

  ngOnInit() {
    this.fileUploadForm = this.fb.group({
      'Url': ['', Validators.nullValidator],
      'FileName': ['', Validators.nullValidator],
      'Title': ['', Validators.nullValidator],
      'UserName': ['', Validators.nullValidator],
      'ResumeFile': ['', Validators.compose([Validators.required])],
      'FileExtension': ['', Validators.nullValidator],
      'JobId': [null, Validators.nullValidator],
      'ProfileId': [null, Validators.nullValidator]
    });
    this.CandidateName = this.data.Name;
    this.PopulateJobDocuments();
    this.PopulateDocuments();
  }

  PopulateJobDocuments() {
    this._service.GetService('ProfileAPI/api/GetJobDocuments?jobId=', this.data.jobId)
   .subscribe(
     r => {
      this.JobDocuments = r;
    });
  
  }

  PopulateDocuments() {
    // let params = new HttpParams();
    // params = params.append('jobId', this.jobId);
    // params = params.append('profileId', this.candidateDetails.ProfileId.toString());
    this._service.GetService('ProfileAPI/api/GetProfileDocuments?jobId=', this.data.jobId + '&profileId=' + this.data.ProfileId)
      .subscribe(
        r => {
          this.MyDocuments = r;
        });

  }
  
  async getFileFromUrl(url, name, defaultType = 'application/pdf'){
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], name, {
      type: data.type || defaultType,
    });
  }


  
  DelDocument(d)
  {
    this._service.DeleteService("ProfileAPI/api/DeletePD?Id=", d).subscribe((dt) => {
      if(dt==0)
      { 
        this.toastr.success("File Deleted!", "Success!");
      setTimeout(() => {
        this.toastr.dismissToast;
      }, 3000);
        this.PopulateJobDocuments();
        this.PopulateDocuments();
      }
    })
  }

  base64ToArrayBuffer(base64) {
    const binary_string = window.atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  DownloadDocumentP(d) {
    let fileDat = this.JobDocuments.find(x => x.DocName === d);
    let fileExt: any;
    let re = /\#/gi;
    let name = d.replace(re, "%23");
    let u = this.settingsService.settings.IdentitybaseUrl + '/home/WhitePapers?id=';
    let url = u + name;
    this._service.GetService("ProfileAPI/api/GetNoteFilesDownload?url=", url).subscribe((fileData) => {
      let exp = d.split("aryticDP")[0];
      fileExt = exp.split(".").pop();
      let Name = exp.split(".")[0];
      this.toastr.success("Downloading!", "Success!");
      setTimeout(() => {
        this.toastr.dismissToast;
      }, 3000);

      if (fileExt == "pdf") {
        let byteArr = this.base64ToArrayBuffer(fileData);
        let blob = new Blob([byteArr], { type: "application/pdf" });
        FileSaver.saveAs(blob, Name);
      }
      if (fileExt == "png" || fileExt == "jpeg") {
        let byteArr = this.base64ToArrayBuffer(fileData);
        let blob = new Blob([byteArr], { type: "application/image" });
        FileSaver.saveAs(blob, Name);
      } else if (fileExt == "doc" || fileExt == "docx") {
        let byteArr = this.base64ToArrayBuffer(fileData);
        let blob = new Blob([byteArr], { type: "application/pdf" });
        FileSaver.saveAs(blob, exp);
      }
    });








  }

  
  DownloadDocument(d)
  {
    let fileDat = this.JobDocuments.find(x=>x.DocName === d);
    let fileExt:any;
    debugger
    this._service.GetService("ProfileAPI/api/GetNoteFilesDownload?url=", fileDat.DocUrl).subscribe((fileData) => {
      let exp = d.split("aryticDP")[0];
      fileExt = exp.split(".").pop();
      let Name = exp.split(".")[0];
      this.toastr.success("Downloading!", "Success!");
      setTimeout(() => {
        this.toastr.dismissToast;
      }, 3000);
  
      if (fileExt == "pdf") {
        let byteArr = this.base64ToArrayBuffer(fileData);
        let blob = new Blob([byteArr], { type: "application/pdf" });
        FileSaver.saveAs(blob, Name);
      }
      if (fileExt == "png" || fileExt == "jpeg") {
        let byteArr = this.base64ToArrayBuffer(fileData);
        let blob = new Blob([byteArr], { type: "application/image" });
        FileSaver.saveAs(blob, Name);
      } else if (fileExt == "doc" || fileExt == "docx" || fileExt == "txt") {
        let byteArr = this.base64ToArrayBuffer(fileData);
        let blob = new Blob([byteArr], { type: "application/pdf" });
        FileSaver.saveAs(blob, exp);
      }
    });
   
  
  
     
    
    
   
  
  }

  DownloadResume(val)
  {
    let Pid = this.data.ProfileId;
    this._service.GetService("ProfileAPI/api/GetResume?profileId=", Pid).subscribe((fileData) => {
      this.fileType = fileData;
      let exp = this.fileType.Url.split(".").pop();
      this.fileExt = exp;
      this.toastr.success("Downloading!", "Success!");
      setTimeout(() => {
        this.toastr.dismissToast;
      }, 3000);
      //debugger

      if (this.fileExt == "pdf") {
        let byteArr = this.base64ToArrayBuffer(fileData.ResumeFile);
        let blob = new Blob([byteArr], { type: "application/pdf" });
        FileSaver.saveAs(blob, val);
      } else if (this.fileExt == "doc" || this.fileExt == "docx") {
        var extension = ".doc";
        let byteArr = this.base64ToArrayBuffer(fileData.ResumeFile);
        let blob = new Blob([byteArr], { type: "application/pdf" });
        FileSaver.saveAs(blob, val + extension);
      }
    });
  }

  processResumes() {

   
    if(this.selectedFiles.length>0)
    {
      this.isProcessing = true;
      this.formDAtaList = [];
      for (let i = 0; i < this.selectedFiles.length; i++) {
        let request = '';
        var formData = new FormData();
        this.fileUploadForm.value.Url = '';
        this.fileUploadForm.value.FileName = this.selectedFiles[i].name;
        this.fileUploadForm.value.FileExtension = this.selectedFiles[i].type;
        this.fileUploadForm.value.UserName = null;
        this.fileUploadForm.value.JobId = this.data.jobId;
        this.fileUploadForm.value.ProfileId = this.data.ProfileId;
        this.fileUploadForm.value.title = this.selectedFiles[i].name + 'aryticDP';
        if (this.fileUploadForm.value !== '') {
          request = JSON.stringify(this.fileUploadForm.value);
        }
        formData.append('ResumeFile', this.selectedFiles[i]);
        formData.append('Model', request);       
        this.jobdetailsservice.byteStorage(formData, 'ProfileApi/api/InsertCandidateDocuments').subscribe(data => {  // 'api/JobDescriptionParse'
          if (data) {
          
            this.selectedFileNames.push(this.selectedFiles[i].name);
            
          }
          })
      }
      if(this.uploader.onCompleteAll)
      {
        this.isProcessing = false;
        this.toastr.success('Added the Attachments for Job','Success!!!');
        setTimeout(() => {
          this.toastr.dismissToast;
          this.uploader.queue = [];
          this.selectedFiles=[];
          this.PopulateJobDocuments();
          this.PopulateDocuments();
          // this.dialogRef.close(); 
        }, 2000);
       
       
      }

      
    }
    
  }

  DeleteRecord(i)
  {
    this.uploader.removeFromQueue(i);
    this.selectedFiles.splice(i, 1);
  }

  onFileSelected(event) {
    this.uploader.onWhenAddingFileFailed = (item: any, filter: any, options: any) => {
      switch (filter.name) {
    
        case 'fileTypeAllowed':
            this.fileErrorDetail = {
    
              file: item.name,
              error: `File type not allowed`
    
            }
            break;
        default: {
          //console.log('Invalid upload');
          this.toastr.warning('Invalid file upload','Oh no!!');
          break;
         }
    
      }
    
    };
    if (this.uploader.queue.length > 0) {

      
  
     
      for (let i = 0; i < this.uploader.queue.length; i++) {
   
        let file: File = this.uploader.queue[i]._file;
         this.selectedFiles.push(file);
      }
      if(this.uploader.queue.length > 6)
      {
        this.toastr.warning('Please upload maximum of 5 files.','Oh no!!!');
      }
    }
  }

}
