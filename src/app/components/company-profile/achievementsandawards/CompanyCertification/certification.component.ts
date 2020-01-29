import { Component, OnInit, Input, ViewChild, AfterViewInit,ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import { ApiService } from '../../../../shared/services/api.service/api.service';
import { Router } from '@angular/router';
import { CompanyProfileService } from '../../company-profile.service';
import { AlertService } from '../../../../shared/alerts/alerts.service';
import { GetCompanyCertification } from '../../../../../models/GetCompanyCertification';
declare var $: any;
declare var require: any;
@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  providers: [ApiService, AlertService]

})
export class CertificationComponent implements OnInit {
  //@Input() getcompanypertner:GetCompanyPartner;
  //@Input() getcompanycertification: GetCompanyCertification;
  //@Input() getcompanyachivements: GetCompanyAchievement;

  getcompanycertification: GetCompanyCertification[];
  customer: any;
  customerId: any;
  CimageSrc: string;
  userId: any;
  Cname:any;
  Cdescription:any;
  videoUrl: string;
  profileId: any;
  CImage: FormGroup;
  public file_srcs: string[] = [];
  public debug_size_before: string[] = [];
  public debug_size_after: string[] = [];
  currentImageUpload: File;
  ImageUpload: File;
  ImageFile: string;
  CImageUpload: File;
  constructor( private _vcr: ViewContainerRef, private toastr: ToastsManager,private _service: ApiService, private route: Router, private fb: FormBuilder, private companyprofileservice: CompanyProfileService, private alertService: AlertService) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId = this.customer.CustomerId;
    this.userId = this.customer.UserId;
    this.toastr.setRootViewContainerRef(_vcr);

    this.CImage = this.fb.group({
      'CompanyCertificationId':[0, Validators.required],
      'CustomerId': ['', Validators.required],
      'CertificationName': ['', Validators.nullValidator],
      'CertifiedUnder': ['', Validators.nullValidator],
      'CertificationLogo':['', Validators.nullValidator],
      'StartDate':['', Validators.nullValidator],
      'ExpiryDate':['', Validators.nullValidator],
      'Photo': [null, Validators.nullValidator],
    });
 }
  
    ngOnInit() {
      this.populateCompanyCertifications();
    }

   populateCompanyCertifications() {
     return this.companyprofileservice.getCompanyCertifications(this.customerId).subscribe(res => {
      this.getcompanycertification = res;
     });
   }
  
    Clear()
    {
      this.CimageSrc = null;
    }

    DeleteCId(id)
    {

      this._service.DeleteService('ProfileAPI/api/DeleteCompanyCertification?companyCertificationId=',id)
      .subscribe(
      data => 
      {
        this.populateCompanyCertifications();
      }
      )
  
    }

    ClearThevalues()
    {
        this.Cname = '';
        this.Cdescription = '';
        this.CimageSrc =''; 
        this.CImage.reset();
        this.CImage.patchValue({ 'CompanyCertificationId': 0 });
        this.CImage.patchValue({ 'StartDate': '' });
        this.CImage.patchValue({ 'ExpiryDate': '' });
    }

    Edit(val)
    {
        this.Cname = val.CertificationName;
        this.Cdescription = val.CertifiedUnder;
        this.CImage.value.CompanyCertificationId = val.CompanyCertificationId;     
        this.ImageFile = val.Logotitle;
        this.CimageSrc = val.CertificationLogo;
    }

    onFileChangeCertification(event) {
      //this.alertService.clear();
      const reader = new FileReader();
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        const stringToSplit = file.name;
        const x = stringToSplit.split('.');
        const ext = x[1];
        if ((ext === 'png' || ext === 'jpg' || ext === 'jpeg') || (ext === 'PNG' || ext === 'JPG' || ext === 'JPEG')) {
          if (file.size > 2048576) {
            this.alertService.error('Too Big Size.. File Not Allowed');
            //this.toastr.error('Too Big Size.. File Not Allowed if file contains more than 2mb!', 'Oops!');
            setTimeout(() => {
              this.alertService.clear();
              this.CimageSrc = '';
          }, 3000);
          } else {
            
            reader.readAsDataURL(file);
          reader.onload = () => {
            this.CimageSrc = 'data:image/png;base64,' + reader.result.split(',')[1];
            this.CImageUpload = file;      
          }
          }
        } else {
          this.alertService.error('Please upload the files with extension jpg, png or jpeg');
          //this.toastr.error('Please upload the files with extension jpg, png or jpeg!', 'Oops!');
          setTimeout(() => {
            this.alertService.clear();
            this.CimageSrc = '';
        }, 3000);
        }
    
      }
    
    }

    uploadCertification() {
      if(this.Cname == undefined || this.Cname =="")
      {
        this.alertService.error('Please provide the valid details!');
        setTimeout(() => {
          this.alertService.clear();
      }, 3000);
      }
      else if(this.Cname != undefined || this.Cname != "")
      {
      if(this.CImageUpload!= undefined && this.CImage.value !== '')
      {
      let request = '';
      const _formData: FormData = new FormData();

        this.CImage.value.CustomerId = this.customerId;
        this.CImage.value.CertificationName = this.Cname;
        this.CImage.value.CertifiedUnder = this.Cdescription;
        request = JSON.stringify(this.CImage.value);
      
      _formData.append('Photo', this.CImageUpload);
      _formData.append('Model', request);
      const reader = new FileReader();
      this._service.byteStorage(_formData, 'ProfileAPI/api/InsertCompanyCertification').subscribe(data => {
        this.Cname = '';
        this.Cdescription = '';
        this.CimageSrc ='';
        this.CImageUpload == undefined;
        this.alertService.success('Certification uploaded successfully');
        setTimeout(() => {
          this.alertService.clear();
      }, 3000);
        this.populateCompanyCertifications();
      });
        }
        else if (this.CImage.value.CompanyCertificationId>0 && this.CImageUpload == undefined)
        {
          if (this.CImage.value !== '') {
            this.CImage.value.CertificationName = this.Cname;
            this.CImage.value.CustomerId = this.customerId;
            this.CImage.value.CertifiedUnder = this.Cdescription;
            this.CImage.value.CertificationLogo = this.ImageFile;
            this._service.PostService(this.CImage.value, 'ProfileAPI/api/UpdateCompanyCertification').subscribe(data => {
              this.Cname = '';
              this.Cdescription = '';
              this.CimageSrc ='';
              this.ImageFile = '';
              this.CImage.reset();
              this.CImage.patchValue({ 'CompanyCertificationId': 0 });
              this.CImage.patchValue({ 'StartDate': '' });
              this.CImage.patchValue({ 'ExpiryDate': '' });
              this.alertService.success('Certification updated successfully');
              setTimeout(() => {
                this.alertService.clear();
            }, 3000);
              this.populateCompanyCertifications();
            });
          }
     
        }
      }
    }
  
  }
  



