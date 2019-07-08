import { Component, OnInit, Input,ViewContainerRef, ViewChild} from '@angular/core';
import {  GetCompanyWhitePaper } from '../../../../models/GetCompanyWhitePaper';
import { GetCompanyNewsInfo } from '../../../../models/GetCompanyNewsInfo';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import { ApiService } from '../../../shared/services/api.service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-whitepaper',
  templateUrl: './whitepaper.component.html',
  styleUrls: ['./whitepaper.component.css']
})
export class WhitepaperComponent implements OnInit {
@Input() getcompanywhitepaper: GetCompanyWhitePaper;
@Input() getcompanynewsinfo: GetCompanyNewsInfo;
fileUploadForm: FormGroup;
customer: any;
customerId: any;
userId: any;
selectedFileNames: string[] = [];

constructor (private _service: ApiService,private _vcr:ViewContainerRef, private route: Router, private fb: FormBuilder,private spinner: NgxSpinnerService, private toastr: ToastsManager) { 
  this.customer = JSON.parse(sessionStorage.getItem('userData'));
  this.customerId = this.customer.CustomerId;
  this.userId = this.customer.UserId;
  this.toastr.setRootViewContainerRef(_vcr);
 }

myFiles:string [] = [];
sMsg:string = '';


  ngOnInit() {
    this.fileUploadForm = this.fb.group({
      'CustomerId': [this.customerId, Validators.required],
      'CompanyWhitePaperId':[0, Validators.nullValidator],
      'Url': ['', Validators.nullValidator],
      'FileName': ['', Validators.nullValidator],
      'UserName': ['', Validators.nullValidator],
      'CompanyWhitePaper': ['', Validators.compose([Validators.required])],
      'FileExtension': ['', Validators.nullValidator],
      'CustomerName' : [this.customer.FirstName + ' ' + this.customer.LastName, Validators.nullValidator],
    });
  }

  getFileDetails(e) {
    debugger
    this.selectedFileNames = [];
    this.spinner.show();
    let request = '';
    const formData = new FormData();
    this.fileUploadForm.value.Url = '';
    this.fileUploadForm.value.FileName = e.target.files[0].name;
    this.fileUploadForm.value.FileExtension = e.target.files[0].type;
    this.fileUploadForm.value.UserName = null;
    // document.getElementById('jobId').value; //this.jobid;
    // this.fileUploadForm.value.ResumeFile = e.target.files[0];
    if (this.fileUploadForm.value !== '') {
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
    this._service.byteStorage(formData, 'ProfileAPI/api/InsertCompanyWhitepaper').subscribe(data => {  // 'api/JobDescriptionParse'
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

}
