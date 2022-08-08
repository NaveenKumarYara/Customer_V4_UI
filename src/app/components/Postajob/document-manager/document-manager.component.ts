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
import { ApiService, SettingsService } from '../../../shared/services';
import { AppService } from '../../../app.service';
import { AlertService } from '../../../shared/alerts/alerts.service';
import { JobdetailsService } from '../../jobdetails/jobdetails.service';
const URL = 'http://localhost:4200/fileupload/';
const http = require('https');
const fs = require('fs');
declare var $: any;
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-document-manager',
  templateUrl: './document-manager.component.html',
  styleUrls: ['./document-manager.component.css']
})
export class DocumentManagerComponent implements OnInit {
  uploader:FileUploader;
  selectedFiles: any= [];
  isProcessing: boolean;
  fileUploadForm: FormGroup;
  formDAtaList: Array<FormData> = [];
  customerName: any;
  selectedFileNames: string[] = [];
  constructor(public dialogRef: MatDialogRef<DocumentManagerComponent>,private appService: AppService,private _service: ApiService,private jobdetailsservice: JobdetailsService,private _snackBar: MatSnackBar, private spinner: NgxSpinnerService, private toastr: ToastsManager, private _vcr: ViewContainerRef, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private alertService: AlertService) { 
    this.toastr.setRootViewContainerRef(_vcr);
    this.customerName = JSON.parse(sessionStorage.getItem('userData'));
    let maxFileSize = 2 * 1024 * 1024;
    this.uploader = new FileUploader({
      url: URL,
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      allowedFileType: ['pdf','doc','rtf','docx'],
      maxFileSize : maxFileSize,
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
      'userId': [this.customerName.UserId, Validators.required],
      'Url': ['', Validators.nullValidator],
      'FileName': ['', Validators.nullValidator],
      'Title': ['', Validators.nullValidator],
      'UserName': ['', Validators.nullValidator],
      'ResumeFile': ['', Validators.compose([Validators.required])],
      'FileExtension': ['', Validators.nullValidator],
      'JobId': [null, Validators.nullValidator]
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
        this.fileUploadForm.value.title = this.selectedFiles[i].name + 'aryticDP';
        if (this.fileUploadForm.value !== '') {
          request = JSON.stringify(this.fileUploadForm.value);
        }
        formData.append('ResumeFile', this.selectedFiles[i]);
        formData.append('Model', request);       
        this.jobdetailsservice.byteStorage(formData, 'ProfileApi/api/InsertCustomerDocuments').subscribe(data => {  // 'api/JobDescriptionParse'
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
          this.dialogRef.close(); 
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
    if (this.uploader.queue.length > 0) {
      for (let i = 0; i < this.uploader.queue.length; i++) {
        let file: File = this.uploader.queue[i]._file;
         this.selectedFiles.push(file);
      }
      if(this.uploader.queue.length > 5)
      {
        this.toastr.warning('Please upload maximum of 5 profiles.','Oh no!!!');
      }
    }
  }

}
