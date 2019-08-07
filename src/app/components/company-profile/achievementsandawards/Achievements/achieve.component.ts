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
  ImageUpload: File;
  CImageUpload: File;
  constructor( private _vcr: ViewContainerRef, private toastr: ToastsManager,private _service: ApiService, private route: Router, private fb: FormBuilder, private companyprofileservice: CompanyProfileService, private alertService: AlertService) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId = this.customer.CustomerId;
    this.userId = this.customer.UserId;
    this.toastr.setRootViewContainerRef(_vcr);

    this.saveImage = this.fb.group({
      'CompanyAchievementId':[0, Validators.required],
      'CustomerId': [this.customerId, Validators.required],
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
 
    uploadPhoto() {
      debugger
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
      if (this.saveImage.value !== '') {
        this.saveImage.value.AwardTitle = this.name;
        this.saveImage.value.Description = this.description;
        request = JSON.stringify(this.saveImage.value);
      }
      _formData.append('Photo', this.currentImageUpload);
      _formData.append('Model', request);
      const reader = new FileReader();
      debugger
      this._service.byteStorage(_formData, 'ProfileAPI/api/InsertCompanyAchievement').subscribe(data => {
        this.name = '';
        this.description = '';
        this.imageSrc ='';
        this.populateCompanyAchivements();
      });
    }
    }
    onFileChange(event) {
      debugger
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
  




