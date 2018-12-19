import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { JobdetailsService } from '../../../jobdetails/jobdetails.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { AlertService } from '../../../../shared/alerts/alerts.service';
declare var $: any;
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-upload-profiles',
  templateUrl: './upload-profiles.component.html',
  styleUrls: ['./upload-profiles.component.css'],
  providers: [NgxSpinnerService,AlertService]
})
export class UploadProfilesComponent implements OnInit {
  fileUploadForm: FormGroup;
  selectedFileNames: string[] = [];
  inviteinfo =new InviteInfo();
  loaddata = true ;
  email:any;
  customerId = null;
  userId: number;
  customerName = null;
  // tslint:disable-next-line:max-line-length
  constructor(private spinner: NgxSpinnerService, private fb: FormBuilder, private jobdetailsservice: JobdetailsService, @Inject(MAT_DIALOG_DATA) public data: DialogData,private alertService : AlertService) {
    this.selectedFileNames = [];
    this.customerName =  JSON.parse(sessionStorage.getItem('userData'));
    this.userId = this.customerName.UserId;
   }

  ngOnInit() {
    this.fileUploadForm = this.fb.group({
      'userId': [5, Validators.required],
      'Url': ['', Validators.nullValidator],
      'FileName': ['', Validators.nullValidator],
      'UserName': ['', Validators.nullValidator],
      'ResumeFile': ['', Validators.compose([Validators.required])],
      'FileExtension': ['', Validators.nullValidator],
      'JobId': [ null, Validators.nullValidator],
      'CustomerName' : [this.customerName.FirstName + ' ' + this.customerName.LastName, Validators.nullValidator]
    });
    this.alertService.clear();
  }
  getFileDetails(e) {
    this.selectedFileNames = [];
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
    if (e.target.files.length > 40) {
      alert('Please select max 40 files.');
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
        this.alertService.success('Uploaded successfully');
      }
    }, error => {
     this.alertService.error('error in uploading profiles');
      this.spinner.hide();
           console.log('download error:', JSON.stringify(error));
          });
  }

 Clear()
 {
   this.alertService.clear();
 }
  CheckEmail()
  {
    this.email = $("#Email").val();
    this.jobdetailsservice.getUserId(this.email,this.customerId).subscribe(data =>
      {
      if(data == null)
      {
      this.SaveInvite(this.email);
      } 
      else if (data == this.email)   
      {
        this.alertService.error('Email already exits');
      } 
      });
  }

SaveInvite(email)
{
   this.inviteinfo.userId = this.userId;
   this.inviteinfo.jobId = JSON.parse(sessionStorage.getItem('jobId'));
   this.inviteinfo.userName = email;
   this.inviteinfo.fullName = 'user';
   this.inviteinfo.statusId = 0;
   this.inviteinfo.ToEmailId = email;
   this.inviteinfo.ApplicationName = 'Arytic';
   this.inviteinfo.CandFullName ='user';
   this.inviteinfo.CustFullName = 'customer';
   this.inviteinfo.ClientLogo = '';
   this.inviteinfo.AppLink ='http://demo.tenendus.com:1070/login'; 
   this.jobdetailsservice.InviteContact(this.inviteinfo).subscribe(data => {
      if (data==0) {
       $("#Email").val('');
       this.alertService.success('Mail sent successfully');
      }
    }, error => {
      alert('error ');
           console.log('error:', JSON.stringify(error));
          });
  }

}





export class InviteInfo
{
    userId: number;
    jobId: number;
    fullName: string;
    userName: string;
    statusId: number;
    CustFullName:string;
    CandFullName: string;
    AppLink: string;
    ToEmailId: string;
    ApplicationName: string;
    ClientLogo: string;
    }

