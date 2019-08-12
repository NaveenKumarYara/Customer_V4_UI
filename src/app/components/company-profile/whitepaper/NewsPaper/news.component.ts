import { Component, OnInit, Input, ViewChild, AfterViewInit,ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import { GetCompanyNewsInfo } from '../../../../../models/GetCompanyNewsInfo';
import { ApiService } from '../../../../shared/services/api.service/api.service';
import { Router } from '@angular/router';
import { CompanyProfileService } from '../../company-profile.service';
import { AlertService } from '../../../../shared/alerts/alerts.service';
declare var $: any;
declare var require: any;
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html'
})
export class NewsComponent implements OnInit {
  //@Input() getcompanypertner:GetCompanyPartner;
  //@Input() getcompanycertification: GetCompanyCertification;
  //@Input() getcompanyachivements: GetCompanyAchievement;
  getcompanynewsinfo: GetCompanyNewsInfo[];
  customer: any;
  customerId: any;
  imageSrc: string;
  userId: any;
  name:any;
  description:any;
  videoUrl: string;
  profileId: any;
  CImage: FormGroup;
  public file_srcs: string[] = [];
  public debug_size_before: string[] = [];
  public debug_size_after: string[] = [];
  currentImageUpload: File;
  ImageUpload: File;
  CImageUpload: File;
  constructor( private _vcr: ViewContainerRef, private toastr: ToastsManager,private _service: ApiService, private route: Router, private fb: FormBuilder, private companyprofileservice: CompanyProfileService, private alertService: AlertService) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId = this.customer.CustomerId;
    this.userId = this.customer.UserId;
    this.toastr.setRootViewContainerRef(_vcr);

    this.CImage = this.fb.group({
      'companyNewsInfoId':[0, Validators.required],
      'CustomerId': [this.customerId, Validators.required],
      'newsTypeId': [1, Validators.nullValidator],
      'newsTitle': ['', Validators.nullValidator],
      'imageURL':['', Validators.nullValidator],
      'newsDate':['', Validators.nullValidator],
      'newsDescription':['', Validators.nullValidator],
      'Photo': [null, Validators.nullValidator],
    });
 }
  
    ngOnInit() {
      this.populateCompanyNewsInfo();
    }

    populateCompanyNewsInfo() {
        return this.companyprofileservice.getCompanyNewsInfo(this.customerId).subscribe(res => {
            this.getcompanynewsinfo = res;
        });
    }
  
    Clear()
    {
      this.imageSrc = null;
    }

    DeleteId(id)
    {

      this._service.DeleteService('ProfileAPI/api/DeleteCompanyNewsInfo?companyNewsInfoId=',id)
      .subscribe(
      data => 
      {
        this.populateCompanyNewsInfo();
      }
      )
  
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
            this.CImageUpload = file;      
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

    uploadNews() {
      if(this.name==undefined&&this.description==undefined)
      {
        this.toastr.error('Please provide the valid details!', 'Oops!');
                  setTimeout(() => {
                      this.toastr.dismissToast;
                  }, 3000);
      }
      else if((this.name!=undefined&&this.description!=undefined)||(this.name!=""&&this.description!=""))
      {
      let request = '';
      const _formData: FormData = new FormData();
      if (this.CImage.value !== '') {
        this.CImage.value.newsTitle = this.name;
        this.CImage.value.newsDescription = this.description;
        request = JSON.stringify(this.CImage.value);
      }
      _formData.append('Photo', this.CImageUpload);
      _formData.append('Model', request);
      const reader = new FileReader();
      this._service.byteStorage(_formData, 'ProfileAPI/api/InsertCompanyNewsInfo').subscribe(data => {
        this.name = '';
        this.description = '';
        this.imageSrc ='';
        this.populateCompanyNewsInfo();
      });
    }
    }
  
  }
  


