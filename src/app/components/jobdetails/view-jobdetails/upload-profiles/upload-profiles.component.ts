import { Component, OnInit, Inject,ViewContainerRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { JobdetailsService } from '../../../jobdetails/jobdetails.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import { IfObservable } from 'rxjs/observable/IfObservable';
import {SearchProfileDeatils} from '../../models/SearchProfileDeatils';
import {Profile} from '../../models/SearchProfileDeatils';
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
  searchprofilesFrom:FormGroup;
  searchprofiles : Profile[];
  profiles:Profile[];
  searchprocess:any;
  Count: any;
  selectedFileNames: string[] = [];
  inviteinfo =new InviteInfo();
  loaddata = true ;
  searchString :any;
  SearchList: any = [];
  norecord:any= false;
  isFullDisplayed:any= false;
  email:any;
  customerId = null;
  userId: number;
  customerName = null;
  // tslint:disable-next-line:max-line-length
  constructor(private spinner: NgxSpinnerService,private toastr:ToastsManager,private _vcr: ViewContainerRef, private fb: FormBuilder, private jobdetailsservice: JobdetailsService, @Inject(MAT_DIALOG_DATA) public data: DialogData,private alertService : AlertService) {
    this.selectedFileNames = [];
    this.customerName =  JSON.parse(sessionStorage.getItem('userData'));
    this.userId = this.customerName.UserId;
    this.toastr.setRootViewContainerRef(_vcr);
   }

  ngOnInit() {
    this.searchprofilesFrom = this.fb.group({
      'CustomerId':  [this.customerName.CustomerId, Validators.required],
      'JobId':['', Validators.required],
      'SearchString': ['', Validators.nullValidator],
      'Experience': ['', Validators.nullValidator],
      'Location': ['', Validators.nullValidator],
      'QualificationId': [0, Validators.nullValidator],
      'PageNumber': [1, Validators.nullValidator],
      'NumberOfRows': [1000, Validators.nullValidator],
    });
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
    this.SearchProfiles();
    this.alertService.clear();
    /** */
    $(function(){
        $('[name="list1"]').change(function()
         {
          if ($(this).is(':checked')) {
            $(this).parent().parent().children(".hover-h").addClass("dblock");  
          }
           else if ($(this).prop('checked', false)) {
             $(this).parent().parent().children(".hover-h").removeClass("dblock");
           };
        });
       }); 
    /** */

  }
  SearchProfiles()
  {
    this.searchprofilesFrom.value.JobId = JSON.parse(sessionStorage.getItem('jobId')); 
    if(this.searchString != null)
    {
      this.searchprofilesFrom.value.SearchString = this.searchString;
      this.searchprofilesFrom.value.CustomerId = this.customerName.CustomerId;
      this.searchprofilesFrom.value.QualificationId = 0;
      this.searchprofilesFrom.value.Location = '';
      this.searchprofilesFrom.value.Experience = '';
      this.searchprofilesFrom.value.PageNumber = 1;
      this.searchprofilesFrom.value.NumberOfRows = 1000;
    }
    this.jobdetailsservice.searchCandidateProfiles(this.searchprofilesFrom.value)
    .subscribe(
    data => {    
      this.isFullDisplayed = true;
      this.Count = data.TotalProfileCount;   
      this.profiles = data.Profile;   
      debugger  
      this.searchprofilesFrom.reset();
      //this.searchprocess = data.Profile;
      //this.profiles = this.searchprofiles.slice(0,10);
  });

  }

  SetSearch(val)
 {
   this.SearchList = [];
   this.searchString = val;
 }

 searchProfile(value)
 {
   this.searchString = value;
   this.SearchProfiles();
 }

  GetSearchText(value) {
    return this.jobdetailsservice.GetAutoSearch(value)
    .subscribe(data => {
          if (data.length > 0) {  
            this.SearchList =data;
          }
          else {
            this.SearchList = [];
          }
        
          }, 
     
        error => { 
          this.SearchList = [];
         });
  
  }
  // getData(){
  //   debugger
  //   if(this.profiles.length < this.searchprofiles.length){  
  //     let len = this.profiles.length;
  //     for(let i=len;i<=len+9;i++)
  //     {
  //       this.profiles.push(this.searchprofiles[i]);
  //     }
  //   }
  //   else{
  //     this.isFullDisplayed = true;
  // }
  
  // }
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
        this.toastr.success('Uploaded successfully','Success');
        setTimeout(() => {
         this.toastr.dismissToast;
     }, 3000);
      }
    }, error => {
     this.toastr.error('error in uploading profiles!', 'Oops!');
     setTimeout(() => {
         this.toastr.dismissToast;
     }, 3000);
      this.spinner.hide();
           console.log('download error:', JSON.stringify(error));
          });
  }

 Clear()
 {
  this.searchString = '';
  this.SearchProfiles();
  this.searchprofilesFrom.reset();
  this.toastr.dismissToast;
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
        this.toastr.error('Email already exits!', 'Oops!');
        setTimeout(() => {
            this.toastr.dismissToast;
        }, 3000);
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
   this.inviteinfo.CandFullName =email;
   this.inviteinfo.CustFullName = 'Arytic';
   this.inviteinfo.ClientLogo = '';
   this.inviteinfo.AppLink ='http://dev.arytic.com/candidatesignup'; 
   this.jobdetailsservice.InviteContact(this.inviteinfo).subscribe(data => {
      if (data==0) {
       $("#Email").val('');
       this.toastr.success('Mail sent successfully','Success');
       setTimeout(() => {
        this.toastr.dismissToast;
    }, 3000);
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

