import { animate } from '@angular/animations';
import { Component, OnInit,EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { ApiService } from 'src/app/shared/components/services/api.service';
import { SettingsService } from 'src/settings/settings.service';
import * as FileSaver from "file-saver";



function readBase64(file:any) {
  var reader  = new FileReader();
  var future = new Promise((resolve, reject) => {
    reader.addEventListener("load", function () {
      resolve(reader.result);
    }, false);

    reader.addEventListener("error", function (event) {
      reject(event);
    }, false);

    reader.readAsDataURL(file);
  });
}
@Component({
  selector: 'app-job-documents',
  templateUrl: './job-documents.component.html',
  styleUrls: ['./job-documents.component.scss']
})
export class JobDocumentsComponent implements OnInit {
  _job: any = null;
  options!: UploaderOptions;
  formData?: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver?: boolean;
  fileName:any
  showJobForm = 'false';
  fileUploadForm!: FormGroup;
  JobDocuments:any =[]
  selectedUserName: any | undefined
  selectedFileNames: string[] = [];
  NId : any=[];
  Swal = require('sweetalert2');


  notesDocViewerUrl = 'https://docs.google.com/viewerng/viewer?url='+this.settingsService.settings.IdentitybaseUrl+'/home/WhitePapers?id=';
  formDAtaList: any =[];
  
  constructor(private fb: FormBuilder, private apiService: ApiService,private settingsService: SettingsService) { 
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }
  get job(): any {
    return this._job
  }

  @Input() set job(value: any) {
    this._job = value;
    if (value) {
      this.PopulateJobDocuments();
    
    }
  }

  ngOnInit(): void {
    this.fileUploadForm = this.fb.group({
      'userId': [this.job?.UserId, Validators.required],
      'Url': ['', Validators.nullValidator],
      'FileName': ['', Validators.nullValidator],
      'Title': ['', Validators.nullValidator],
      'UserName': ['', Validators.nullValidator],
      'ResumeFile': ['', Validators.compose([Validators.required])],
      'FileExtension': ['', Validators.nullValidator],
      'JobId': [null, Validators.nullValidator]
    });
    
    this.PopulateJobDocuments();
  }

  resetFormAndPopulateJobDocuments() {
    this.files = []
    this.PopulateJobDocuments();
  }

  processResumes() {
    
  
    if (this.files.length > 0) {
      for (let i = 0; i < this.files.length; i++) {
        let fileItem = this.files[i];
        if (fileItem.size > 10000000) {
          // this.toastr.error("Each File should be less than 10 MB of size.","!Oh no");
          this.Swal(
            {
              title: 'Each File should be less than 10 MB of size.","!Oh no"',
              showConfirmButton: true,
              timer: 3000,
              type: "error"
            });
          console.log("Each File should be less than 10 MB of size.");
          return;
        }
      }
      for (let j = 0; j < this.files.length; j++) {
        let data = new FormData();
        let request = '';
        let fileItem = this.files[j];
        // if (this.fileUploadForm.value != '') {
          // this.fileUploadForm.value.Title = fileItem.name;
           this.fileUploadForm.value.Url = '';
          this.fileUploadForm.value.FileName = fileItem.name;
          this.fileUploadForm.value.FileExtension = fileItem.type;
          this.fileUploadForm.value.UserName = null;
          this.fileUploadForm.value.JobId = this.job.JobId;
          this.fileUploadForm.value.title = fileItem.name + 'aryticDP';
          this.fileUploadForm.value.DocUrl = '';
          this.fileUploadForm.value.userId = this.job.UserId;
          // this.fileUploadForm.value.CustomerUserId = this.savenote.customerUserId;
          // this.fileUploadForm.value.Comments = 'Sample Comment';
          // this.fileUploadForm.value.OtherInfo = this.savenote.OtherInfo;
          // this.fileUploadForm.value.StatusId = this.savenote.statusId;
          // this.fileUploadForm.value.Doc = this.savenote.Doc;
          // this.fileUploadForm.value.NoteId = 0;
          // this.fileUploadForm.value.FileExtension = fileItem.type;
          request = JSON.stringify(this.fileUploadForm.value);
        // }
        data.append('Attachment', fileItem.nativeFile!);
        data.append('fileSeq', 'seq' + j);
        data.append('Model', request);
        this.uploadFile(data);
      }
    }
    // if(this.files.length > 5){
    //   this.Swal(
    //     {
    //       title: 'Already % .","!Oh no"',
    //       showConfirmButton: true,
    //       timer: 3000,
    //       type: "error"
    //     });
    // }
  }

  uploadFile(data: FormData) {
    this.apiService.InsertCustomerDocuments(data).subscribe(data => {
      console.log(data,"fydtwukgcsdiu")
      if (data <= 0) {
        this.Swal(
          {
            title: 'Error while uploading document',
            showConfirmButton: true,
            timer: 3000,
            type: "error"
          });
        return;
      }
      this.Swal(
        {
          title: 'Document uploaded successfully',
          showConfirmButton: true,
          timer: 3000,
          type: "success"
        });
      this.resetFormAndPopulateJobDocuments();
    })
  }
  
  onUploadOutput(output: UploadOutput): void {
    console.log("file",this.files)

    if (output.type === 'allAddedToQueue') { // when all files added in queue
      // uncomment this if you want to auto upload files when added
      // const event: UploadInput = {
      //   type: 'uploadAll',
      //   url: '/upload',
      //   method: 'POST',
      //   data: { foo: 'bar' }
      // };
      // this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') { // add file to array when added
      const ext = output.file.name.split('.').pop()
      if(ext === 'doc' ||ext === 'docx' || ext === 'pdf'||ext === 'txt'){
        this.files.push(output.file);
      }
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    }
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }

  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }
  deleteDoc(x:any){
    this.files.splice(x, 1);
    console.log("files",this.files)
  }
  showJobFormHandler() {
    this.showJobForm = 'true';
  }
  showJobFormHideHandler(){
    this.showJobForm = 'false'
    this.resetFormAndPopulateJobDocuments();
  }
  // sendDocuments(){

  // }

  PopulateJobDocuments() {
    if (!this.job?.JobId) {
      return;
    }
    this.apiService.GetProfileService('/api/GetJobDocuments?jobId=', this.job.JobId)
   .subscribe(
     (res:any) => {
      console.log("resDocres",res)

     this.JobDocuments= res.map((v:any) => {
      return{
        'DocName':v.DocName.split('_').shift(),
        'DocUrl':v.DocUrl,
        'type':v.DocName.split('.').pop(),
        'Id':v.Id
      }
     })
      console.log("resDoc",this.JobDocuments)
    });
  }

  formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
} 

base64ToArrayBuffer(base64:any) {
  const binary_string = window.atob(base64);
  const len = binary_string.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

DownloadDocument(d:any){
  console.log("data",d)
  console.log("JobNotes",this.JobDocuments)

  let fileDat = this.JobDocuments.find((x:any)=>x.DocName === d);
  let fileExt:any;
  console.log("dddddddd",fileDat)

  
  this.apiService.GetProfileService("/api/GetNoteFilesDownload?url=", fileDat.DocUrl).subscribe((fileData) => {
    
    let exp = d.split("aryticDP")[0];
    console.log("fileDta",fileDat)
    fileExt = exp.split(".").pop();
    let Name = exp.split(".")[0];
      // this.toastr.success("Downloading!", "Success!");
      // setTimeout(() => {
      //   this.toastr.dismissToast;
      // }, 3000);

    

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

DelDocument(d:any)
{
  this.apiService.DeleteService("/api/DeleteCD?Id=", d).subscribe((dt) => {
    if(dt==0)
    { 
  this.Swal(
            {
              title: 'File Deleted',
              showConfirmButton: true,
              timer: 3000,
              type: "Success"
            });
      this.PopulateJobDocuments();
    }
  })
}

}

