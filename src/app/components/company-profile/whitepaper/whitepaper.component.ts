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
    'CompanyWhitePaper': ['', Validators.nullValidator]
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
        debugger
    });
}

  getFileDetails(e) {
    debugger
    this.selectedFileNames = [];
    this.spinner.show();
    let request = '';
    const formData = new FormData();
    this.fileUploadForm.value.FileName = this.name;
    
    // document.getElementById('jobId').value; //this.jobid;
    // this.fileUploadForm.value.ResumeFile = e.target.files[0];
    if (this.fileUploadForm.value !== '') {
      this.fileUploadForm.value.Title = this.name;
      this.fileUploadForm.value.Description = this.description;
      request = JSON.stringify(this.fileUploadForm.value);
    }
    if (e.target.files.length > 5) {
     this.toastr.warning('Please select max 5 files.','Oops!');
      this.spinner.hide();
      e.preventDefault();
    } else {
      for (let i = 0; i < e.target.files.length; i++) {
        this.selectedFileNames.push(e.target.files[i].name);
        formData.append('CompanyWhitePaper', e.target.files[i]);
      }
     // this.loaddata = false;
      formData.append('Model', request);
      this.uploadMultiple(formData);
    }
  }
  uploadMultiple(formData) {
    debugger
    this._service.byteStorage(formData, 'ProfileAPI/api/SaveWhitePaper').subscribe(data => {  // 'api/JobDescriptionParse'
      if (data) {
       // setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
       // }, 60000);
        this.toastr.success('Uploaded successfully', 'Success');
        setTimeout(() => {
         this.toastr.dismissToast;
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

  onFileChange(event) {
    //this.alertService.clear();
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const stringToSplit = file.name;
      const x = stringToSplit.split('.');
      const ext = x[1];
    
        if (file.size > 2048576) {
          //this.alertService.error('Too Big Size.. File Not Allowed');
          this.toastr.error('Too Big Size.. File Not Allowed if file contains more than 2mb!', 'Oops!');
          setTimeout(() => {
              this.toastr.dismissToast;
            
          }, 3000);
        } else {
          
          reader.readAsDataURL(file);
        reader.onload = () => {        
          this.Src = 'data:doc/pdf;base64,' + reader.result.split(',')[1];
          this.PUpload = file;      
        }
        }
      } 
  
    
  
  }

  upload() {
    if(this.name==undefined)
    {
      this.toastr.error('Please provide the valid details!', 'Oops!');
                setTimeout(() => {
                    this.toastr.dismissToast;
                }, 3000);
    }
    else if((this.name!=undefined)||(this.name!=""))
    {
    let request = '';
    const _formData: FormData = new FormData();
    if (this.fileUploadForm.value !== '') 
    {
      this.fileUploadForm.value.Title = this.name;
      this.fileUploadForm.value.Description = this.description;
      request = JSON.stringify(this.fileUploadForm.value);
    }
    debugger
    _formData.append('WhitePaper', this.PUpload);
    _formData.append('Model', request);
    const reader = new FileReader();
    debugger
    this._service.byteStorage(_formData, 'ProfileAPI/api/SaveWhitePaper').subscribe(data => {
      this.name = '';
      this.populateCompanyWhitePapers();
    });
  }
  }


}
