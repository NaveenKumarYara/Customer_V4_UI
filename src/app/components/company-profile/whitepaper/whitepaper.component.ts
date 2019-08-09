import { Component, OnInit, Input,ViewContainerRef, ViewChild} from '@angular/core';
import {  GetCompanyWhitePaper } from '../../../../models/GetCompanyWhitePaper';
import { GetCompanyNewsInfo } from '../../../../models/GetCompanyNewsInfo';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import { CompanyProfileService } from '../company-profile.service';
import { ApiService } from '../../../shared/services/api.service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-whitepaper',
  templateUrl: './whitepaper.component.html',
  styleUrls: ['./whitepaper.component.css']
})
export class WhitepaperComponent implements OnInit {
//@Input() getcompanywhitepaper: GetCompanyWhitePaper;
//@Input() getcompanynewsinfo: GetCompanyNewsInfo;
getcompanywhitepaper: GetCompanyWhitePaper[];
fileUploadForm: FormGroup;
customer: any;
name:any;
description:any;
Src: string;
filedata=new FormData();
PUpload: File;
customerId: any;
userId: any;
public file_srcs: string[] = [];
public debug_size_before: string[] = [];
public debug_size_after: string[] = [];
selectedFileNames: string[] = [];

constructor (private companyprofileservice: CompanyProfileService,private _service: ApiService,private _vcr:ViewContainerRef, private route: Router, private fb: FormBuilder,private spinner: NgxSpinnerService, private toastr: ToastsManager) { 
  this.customer = JSON.parse(sessionStorage.getItem('userData'));
  this.customerId = this.customer.CustomerId;
  this.userId = this.customer.UserId;
  this.toastr.setRootViewContainerRef(_vcr);
  this.fileUploadForm = this.fb.group({
    'CustomerId': [this.customerId, Validators.required],
    'CompanyWhitePaperId':[0, Validators.nullValidator],
    'WhitePaper': [null, Validators.nullValidator],
    'Description': ['', Validators.nullValidator],
    'Title':['', Validators.nullValidator],
    'CompanyWhitePaper': ['', Validators.nullValidator],
    'Url': ['', Validators.nullValidator],
    'FileName': ['', Validators.nullValidator],
    'UserName': ['', Validators.nullValidator],
    'FileExtension': ['', Validators.nullValidator],
  });
 }


 DeleteId(id)
    {

      this._service.DeleteService('ProfileAPI/api/DeleteCompanyWhitePaper?companyWhitePaperId=',id)
      .subscribe(
      data => 
      {
        this.populateCompanyWhitePapers();
      }
      )
  
    }

  ngOnInit() {
    this.populateCompanyWhitePapers();
  }

  populateCompanyWhitePapers() {
    return this.companyprofileservice.getCompanyWhitePapers(this.customerId).subscribe(res => {
        this.getcompanywhitepaper = res;
    });
}

  getFileDetails(e) {
    debugger
    this.selectedFileNames = [];
    let request = '';
    const formData = new FormData();

    // document.getElementById('jobId').value; //this.jobid;
    // this.fileUploadForm.value.ResumeFile = e.target.files[0];
    if (this.fileUploadForm.value !== '') {
      this.fileUploadForm.value.Title = this.name;
      this.fileUploadForm.value.Description = this.description;
      this.fileUploadForm.value.Url = '';
      this.fileUploadForm.value.FileName = e.target.files[0].name;
      this.fileUploadForm.value.FileExtension = e.target.files[0].type;
      request = JSON.stringify(this.fileUploadForm.value);
    }
    if (e.target.files.length > 5) {
     this.toastr.warning('Please select max 5 files.','Oops!');
      this.spinner.hide();
      e.preventDefault();
    } else {
      for (let i = 0; i < e.target.files.length; i++) {
        this.selectedFileNames.push(e.target.files[i].name);
        formData.append('WhitePaper', e.target.files[i]);
      }
     // this.loaddata = false;
      formData.append('Model', request);
      this.filedata= formData;
      //this.uploadMultiple(formData);
    }
  }
  uploadMultiple() {
    if(this.name==undefined&&this.description==undefined)
    {
      this.toastr.error('Please provide the valid details!', 'Oops!');
                setTimeout(() => {
                    this.toastr.dismissToast;
                }, 3000);
    }
    else if((this.name!=undefined&&this.description!=undefined)||(this.name!=""&&this.description!=""))
    {
    this._service.byteStorage(this.filedata, 'ProfileAPI/api/SaveWhitePaper').subscribe(data => {  // 'api/JobDescriptionParse'
      if (data) {
       // setTimeout(() => {
          /** spinner ends after 5 seconds */
       
       // }, 60000);
        this.toastr.success('Uploaded successfully', 'Success');
        setTimeout(() => {
         this.toastr.dismissToast;
         this.name = '';
         this.description = '';
         this.populateCompanyWhitePapers();
     }, 3000);
      }
    //   else if(data === null){
    //     this.toastr.warning('Email Not Exists', 'Oops!');
    //     this.spinner.hide();
    //     setTimeout(() => {
    //      this.toastr.dismissToast;
    //  }, 3000);
    // //  return false;
    //   }
    }, error => {
     this.toastr.error('error in uploading profiles!', 'Oops!');
     setTimeout(() => {
         this.toastr.dismissToast;
     }, 3000);
      this.spinner.hide();
           console.log('download error:', JSON.stringify(error));
          });
  }
}






}
