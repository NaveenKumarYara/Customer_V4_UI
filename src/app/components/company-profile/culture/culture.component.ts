import { Component, OnInit, Input, ViewChild, AfterViewInit,ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import { ApiService } from '../../../shared/services/api.service/api.service';
import { Router } from '@angular/router';
import { CompanyProfileService } from '../company-profile.service';
import {CompanyprofileComponent} from '../companyprofile/companyprofile.component';
import { AlertService } from '../../../shared/alerts/alerts.service';
declare var $: any;
declare var require: any;
import {  GetCompanyCulture } from '../../../../models/GetCompanyCulture';
@Component({
  selector: 'app-culture',
  templateUrl: './culture.component.html',
  styleUrls: ['./culture.component.css'],
  providers: [ApiService, AlertService]
})
export class CultureComponent implements OnInit {

//@Input() getcompanycluture:GetCompanyCulture;
getcompanycluture:GetCompanyCulture[];
customer: any;
customerId: any;
imageSrc: string;
userId: any;
name:any;
description:any;
videoUrl: string;
profileId: any;
ImageFile: string;
saveImage: FormGroup;
public file_srcs: string[] = [];
public debug_size_before: string[] = [];
public debug_size_after: string[] = [];
currentImageUpload: File;
companyLogo: any;
constructor( private _vcr: ViewContainerRef, private toastr: ToastsManager,private _service: ApiService, private route: Router, private fb: FormBuilder, private companyprofileservice: CompanyProfileService, private alertService: AlertService) {
  this.customer = JSON.parse(sessionStorage.getItem('userData'));
  this.customerId = this.customer.CustomerId;
  this.userId = this.customer.UserId;
  this.toastr.setRootViewContainerRef(_vcr);
  this.saveImage = this.fb.group({
    'companyCultureId':[0, Validators.required],
    'customerId': ['', Validators.nullValidator],
    'eventName': ['', Validators.nullValidator],
    'eventDate': ['2018-09-09', Validators.nullValidator],
    'eventDescription': ['', Validators.nullValidator],
    'Photo': [null, Validators.nullValidator],
  }); }

  ngOnInit() {
    this.populateCompanyCultures();
  }

  ClearThevalues()
  {
      this.name = '';
      this.description = '';
      this.imageSrc ='';  
      this.saveImage.reset();
      this.saveImage.patchValue({ 'companyCultureId': 0 });
      this.saveImage.patchValue({ 'eventDate': '2018-09-09' });
  }


  Edit(val)
  {
      this.name = val.EventName;
      this.description = val.EventDescription;
      this.ImageFile = val.Logotitle;
      this.imageSrc = val.EventPhoto;
      this.saveImage.value.companyCultureId = val.CompanyCultureId;
  }

  populateCompanyCultures() {
    return this.companyprofileservice.getCompanyCultures(this.customerId).subscribe(res => {
        this.getcompanycluture = res;
    });
   }

  Clear()
  {
    this.imageSrc = null;
  }

  DeleteId(id)
  {
    this._service.DeleteService('ProfileAPI/api/DeleteCompanyCulture?companyCultureId=',id)
    .subscribe(
    data => 
    {
     this.populateCompanyCultures();
    }
    )

  }

  uploadPhoto() {
    if(this.name == undefined || this.name == "")
    {
      this.alertService.error('Please provide the valid details!');
                setTimeout(() => {
                  this.alertService.clear();
                }, 3000);
    }
    else if(this.name != undefined || this.name != "")
    {
    if (this.saveImage.value !== '' && this.currentImageUpload != undefined) {
      let request = '';
      const _formData: FormData = new FormData();
      this.saveImage.value.eventName = this.name;
      this.saveImage.value.eventDescription = this.description;
      this.saveImage.value.customerId = this.customerId;
      request = JSON.stringify(this.saveImage.value);
      _formData.append('Photo', this.currentImageUpload);
      _formData.append('Model', request);
      const reader = new FileReader();
      this._service.byteStorage(_formData, 'ProfileAPI/api/InsertCompanyCulture').subscribe(data => {
        this.name = '';
        this.description = '';
        this.imageSrc ='';
        this.currentImageUpload == undefined;
        this.saveImage.reset();
        this.saveImage.patchValue({ 'companyCultureId': 0 });
        this.saveImage.patchValue({ 'eventDate': '2018-09-09' });
        this.populateCompanyCultures();
      });
    
 
  }
  else if (this.saveImage.value.companyCultureId>0 && this.currentImageUpload == undefined)
  {
    if (this.saveImage.value !== '') {
      this.saveImage.value.eventName = this.name;
      this.saveImage.value.eventDescription = this.description;
      this.saveImage.value.customerId = this.customerId;
      this.saveImage.value.EventPhoto = this.ImageFile;
      this._service.PostService(this.saveImage.value, 'ProfileAPI/api/UpdateCompanyCulture').subscribe(data => {
        this.name = '';
        this.description = '';
        this.imageSrc ='';
        this.saveImage.reset();
        this.saveImage.patchValue({ 'companyCultureId': 0 });
        this.saveImage.patchValue({ 'eventDate': '2018-09-09' });
        this.populateCompanyCultures();
      });
     }
    }
   }
  }
  onFileChange(event) {
    //this.alertService.clear();
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const stringToSplit = file.name;
      const x = stringToSplit.split('.');
      const ext = x[1];
      if ((ext === 'png' || ext === 'jpg' || ext === 'jpeg') || (ext === 'PNG' || ext === 'JPG' || ext === 'JPEG')) {
        if (file.size > 2048576) {
          //this.alertService.error('Too Big Size.. File Not Allowed');
          this.toastr.error('Too Big Size.. File Not Allowed if file contains more than 2mb!', 'Oops!');
          setTimeout(() => {
              this.toastr.dismissToast;
              this.imageSrc = '';
          }, 3000);
        } else {
          
          reader.readAsDataURL(file);
        reader.onload = () => {
          this.imageSrc = 'data:image/png;base64,' + reader.result.split(',')[1];
          this.currentImageUpload = file;      
        }
        }
      } else {
        //this.alertService.error('Please upload the files with extension jpg, png or jpeg');
        this.toastr.error('Please upload the files with extension jpg, png or jpeg!', 'Oops!');
        setTimeout(() => {
            this.toastr.dismissToast;
            this.imageSrc = '';
        }, 3000);
      }
  
    }
  
  }

}
