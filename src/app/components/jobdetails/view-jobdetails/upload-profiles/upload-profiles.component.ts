import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { JobdetailsService } from '../../../jobdetails/jobdetails.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-upload-profiles',
  templateUrl: './upload-profiles.component.html',
  styleUrls: ['./upload-profiles.component.css'],
  providers: [NgxSpinnerService]
})
export class UploadProfilesComponent implements OnInit {
  fileUploadForm: FormGroup;
  selectedFileNames: string[] = [];
  loaddata=true ;
  constructor(private spinner: NgxSpinnerService, private fb: FormBuilder, private jobdetailsservice: JobdetailsService, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.selectedFileNames = [];
   }
  
  ngOnInit() {
    this.fileUploadForm = this.fb.group({
      'userId': [5, Validators.required],
      'Url': ['', Validators.nullValidator],
      'FileName': ['', Validators.nullValidator],
      'UserName': ['', Validators.nullValidator],
      'ResumeFile': ['', Validators.compose([Validators.required])],
      'FileExtension': ['', Validators.nullValidator],
      'JobId': [ null, Validators.nullValidator]
    });
  }
  getFileDetails(e) {
    this.spinner.show();
    let request = '';
    const formData = new FormData();
    this.fileUploadForm.value.Url = '';
    this.fileUploadForm.value.FileName = e.target.files[0].name;
    this.fileUploadForm.value.FileExtension = e.target.files[0].type;
    this.fileUploadForm.value.UserName = null;
    this.fileUploadForm.value.JobId = (<HTMLInputElement>document.getElementById('jobId')).value;
    // document.getElementById('jobId').value; //this.jobid;
    // this.fileUploadForm.value.ResumeFile = e.target.files[0];
    if (this.fileUploadForm.value !== '') {
      request = JSON.stringify(this.fileUploadForm.value);
    }
    if (e.target.files.length > 5) {
      alert('Please select max 5 files.');
      this.spinner.hide();
      e.preventDefault();
    } else {
      for (let i = 0; i < e.target.files.length; i++) {
        this.selectedFileNames.push(e.target.files[i].name);
        formData.append('ResumeFile', e.target.files[i]);
      }
     // this.loaddata = false;
      formData.append('Model', request);
      this.uploadMultiple(formData);
    }
  }
  uploadMultiple(formData) {
    this.jobdetailsservice.byteStorage(formData, 'ProfileAPI/api/ParseResume').subscribe(data => {
      if (data) {
       // setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
       // }, 60000);
        alert('Uploaded successfully');
      }
    }, error => {
      alert('error in uploading profiles');
      this.spinner.hide();
           console.log('download error:', JSON.stringify(error));
          });
  }

}
