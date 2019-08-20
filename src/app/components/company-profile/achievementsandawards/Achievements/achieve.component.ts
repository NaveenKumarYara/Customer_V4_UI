import { Component, OnInit, Input, ViewChild, AfterViewInit,ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import { ApiService } from '../../../../shared/services/api.service/api.service';
import { Router } from '@angular/router';
import { CompanyProfileService } from '../../company-profile.service';
import { AlertService } from '../../../../shared/alerts/alerts.service';
import { GetCompanyAchievement } from '../../../../../models/GetCompanyAchievement';
declare var $: any;
declare var require: any;
@Component({
  selector: 'app-achievements',
  templateUrl: './achieve.component.html'
})
export class AchievementsComponent implements OnInit {
  //@Input() getcompanypertner:GetCompanyPartner;
  //@Input() getcompanycertification: GetCompanyCertification;
  //@Input() getcompanyachivements: GetCompanyAchievement;
  getcompanyachivements:GetCompanyAchievement[];
  customer: any;
  customerId: any;
  imageSrc: string;
  userId: any;
  name:any;
  description:any;
  videoUrl: string;
  profileId: any;
  saveImage: FormGroup;
  public file_srcs: string[] = [];
  public debug_size_before: string[] = [];
  public debug_size_after: string[] = [];
  currentImageUpload: File;
  ImageFile: string;
  ImageUpload: File;
  CImageUpload: File;
  constructor( private _vcr: ViewContainerRef, private toastr: ToastsManager,private _service: ApiService, private route: Router, private fb: FormBuilder, private companyprofileservice: CompanyProfileService, private alertService: AlertService) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId = this.customer.CustomerId;
    this.userId = this.customer.UserId;
    this.toastr.setRootViewContainerRef(_vcr);

    this.saveImage = this.fb.group({
      'CompanyAchievementId':[0, Validators.required],
      'CustomerId': ['', Validators.nullValidator],
      'AwardTitle': ['', Validators.nullValidator],
      'AwardedYear': ['2019', Validators.nullValidator],
      'Description': ['', Validators.nullValidator],
      'AwardLogo':['', Validators.nullValidator],
      'Photo': [null, Validators.nullValidator],
    });
    }
  
    ngOnInit() {
      this.populateCompanyAchivements();
    }

    populateCompanyAchivements() {
      return this.companyprofileservice.getCompanyAchivements(this.customerId).subscribe(res => {
          this.getcompanyachivements = res;
      });
    }

    Clear()
    {
      this.imageSrc = null;
    }

    DeleteId(id)
    {
      this._service.DeleteService('ProfileAPI/api/DeleteCompanyAchievement?companyAchievementId=',id)
      .subscribe(
      data => 
      {
        this.populateCompanyAchivements();
      }
      )
  
    }

    ClearThevalues()
    {
        this.name = '';
        this.description = '';
        this.imageSrc ='';  
        this.saveImage.reset();
        this.saveImage.patchValue({ 'CompanyAchievementId': 0 });
        this.saveImage.patchValue({ 'AwardedYear': 2019 });
    }

    Edit(val)
    {
        this.name = val.AwardTitle;
        this.description = val.Description;
        this.saveImage.value.CompanyAchievementId = val.CompanyAchievementId;
        this.ImageFile = val.Logotitle;
        this.imageSrc = val.AwardLogo;
    }
 
    uploadPhoto() {
      if((this.name==undefined)||(this.name==""))
      {
        this.toastr.error('Please provide the valid details!', 'Oops!');
                  setTimeout(() => {
                      this.toastr.dismissToast;
                  }, 3000);
      }
      else if((this.name!=undefined)||(this.name!=""))
      {
      if(this.currentImageUpload != undefined)
      {
        let request = '';
        const _formData: FormData = new FormData();
        if (this.saveImage.value !== '') {
          this.saveImage.value.AwardTitle = this.name;
          this.saveImage.value.CustomerId = this.customerId;
          this.saveImage.value.Description = this.description;
          request = JSON.stringify(this.saveImage.value);
        }
        _formData.append('Photo', this.currentImageUpload);
        _formData.append('Model', request);
        const reader = new FileReader();
        this._service.byteStorage(_formData, 'ProfileAPI/api/InsertCompanyAchievement').subscribe(data => {
          this.name = '';
          this.description = '';
          this.imageSrc ='';
          this.saveImage.reset();
          this.saveImage.patchValue({ 'CompanyAchievementId': 0 });
          this.saveImage.patchValue({ 'AwardedYear': 2019 });
          this.populateCompanyAchivements();
        });
      }
      else if (this.saveImage.value.CompanyAchievementId>0 && this.currentImageUpload == undefined)
      {
      if (this.saveImage.value !== '') {
        this.saveImage.value.AwardTitle = this.name;
        this.saveImage.value.CustomerId = this.customerId;
        this.saveImage.value.Description = this.description;
        this.saveImage.value.AwardLogo = this.ImageFile;
      }
      this._service.PostService(this.saveImage.value, 'ProfileAPI/api/UpdateCompanyAchievement').subscribe(data => {
        this.name = '';
        this.description = '';
        this.imageSrc ='';
        this.ImageFile = '';
        this.saveImage.reset();
        this.saveImage.patchValue({ 'CompanyAchievementId': 0 });
        this.saveImage.patchValue({ 'AwardedYear': 2019 });
        this.populateCompanyAchivements();
      });
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
  




