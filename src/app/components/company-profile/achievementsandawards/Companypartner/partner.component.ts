import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import { ApiService } from '../../../../shared/services/api.service';
import { Router } from '@angular/router';
import { CompanyProfileService } from '../../company-profile.service';
import { AlertService } from '../../../../shared/alerts/alerts.service';
import {  GetCompanyPartner } from '../../../../../models/GetCompanyPartner';

declare var $: any;
declare var require: any;
@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  providers: [ApiService, AlertService]
})
export class PartnerComponent implements OnInit {
  //@Input() getcompanypertner:GetCompanyPartner;
  //@Input() getcompanycertification: GetCompanyCertification;
  //@Input() getcompanyachivements: GetCompanyAchievement;
  getcompanypartner:GetCompanyPartner[]=[];
  customer: any;
  customerId: any;
  imageSrc: string;
  userId: any;
  Pname:any;
  Pdescription:any;
  profileId: any;
  ImageFile: string;
  Image: FormGroup;
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
    this.Image = this.fb.group({
      'CompanyPartnerId':[0, Validators.required],
      'CustomerId': [this.customerId, Validators.required],
      'PartnerName': ['', Validators.nullValidator],
      'Description': ['', Validators.nullValidator],
      'PartnerLogo':['', Validators.nullValidator],
      'Photo': [null, Validators.nullValidator],
    });
 }

 
 ClearThevalues()
 {
     this.Pname = '';
     this.Pdescription = '';
     this.imageSrc ='';  
     this.Image.reset();
     this.Image.patchValue({ 'CompanyPartnerId': 0 });
 }



 Edit(val)
 {
     this.Pname = val.PartnerName;
     this.Pdescription = val.Description;
     this.Image.value.CompanyPartnerId = val.CompanyPartnerId;
     this.ImageFile = val.Logotitle;
     this.imageSrc = val.PartnerLogo;
 }
  
    ngOnInit() {
      this.populateCompanyPartners();
    }

    populateCompanyPartners() {
    return this.companyprofileservice.getCompanyPartnerShips(this.customerId).subscribe(res => {
        this.getcompanypartner = res;
    });
    }
 
    Clear()
    {
      this.imageSrc = null;
    }

    DeletepartnerId(id)
    {
      this._service.DeleteService('ProfileAPI/api/DeleteCompanyPartner?companyPartnerId=',id)
      .subscribe(
      data => 
      {
        this.populateCompanyPartners();
      }
      )
  
    }

    onFileChangePartner(event) {
      //this.alertService.clear();
      const reader = new FileReader();
      if (event.target.files && event.target.files.length > 0) {
        const file= event.target.files[0];
        const stringToSplit = file.name;
        const x = stringToSplit.split('.');
        const ext = x[1];
        if ((ext === 'png' || ext === 'jpg' || ext === 'jpeg') || (ext === 'PNG' || ext === 'JPG' || ext === 'JPEG')) {
          if (file.size > 2048576) {
            this.alertService.error('Too Big Size.. File Not Allowed');
            //this.toastr.error('Too Big Size.. File Not Allowed if file contains more than 2mb!', 'Oops!');
            setTimeout(() => {
              this.alertService.clear();
                this.imageSrc = '';
            }, 3000);
          } else {
            
            reader.readAsDataURL(file);
          reader.onload = () => {
            this.imageSrc = 'data:image/png;base64,' + reader.result.split(',')[1];
            this.ImageUpload = file;      
          }
          }
        } else {
          this.alertService.error('Please upload the files with extension jpg, png or jpeg');
          //this.toastr.error('Please upload the files with extension jpg, png or jpeg!', 'Oops!');
          setTimeout(() => {
            this.alertService.clear();
            this.imageSrc = '';
          }, 3000);
        }
    
      }
    
    }
    uploadPhotoPartner() {
      if(this.Pname == undefined || this.Pname == "")
      {
        this.alertService.error('Please provide the valid details');
        //this.toastr.error('Please provide the valid details!', 'Oops!');
                  setTimeout(() => {
                    this.alertService.clear();
                  }, 3000);
      }
      else if(this.Pname !=undefined || this.Pname !="")
      {
        if(this.ImageUpload != undefined && this.Image.value !== ''&& this.imageSrc!='')
        {

        let request = '';
        let _formData: FormData = new FormData();
        this.Image.value.PartnerName = this.Pname;
        this.Image.value.Description= this.Pdescription;
        this.Image.value.CustomerId = this.customerId;
        request = JSON.stringify(this.Image.value);
        _formData.append('Photo', this.ImageUpload);
        _formData.append('Model', request);
        const reader = new FileReader();
        this._service.byteStorage(_formData, 'ProfileAPI/api/InsertCompanyPartner').subscribe(data => {
          this.Pname = '';
          this.Pdescription = '';
          this.imageSrc ='';
          this.ImageUpload == undefined
          _formData = new FormData();
          this.Image.reset();
          this.Image.patchValue({ 'CompanyPartnerId': 0 });
          this.populateCompanyPartners();
          });
         }
       
        else if (this.Image.value.CompanyPartnerId>0 && this.ImageUpload == undefined)
      {
        if (this.Image.value !== '') {
          this.Image.value.PartnerName = this.Pname;
          this.Image.value.Description= this.Pdescription;
          this.Image.value.CustomerId = this.customerId;
          this.Image.value.PartnerLogo = this.ImageFile;    
          this._service.PostService(this.Image.value, 'ProfileAPI/api/UpdateCompanyPartner').subscribe(data => {
            this.Pname = '';
            this.Pdescription = '';
            this.imageSrc ='';
            this.Image.reset();
            this.Image.patchValue({ 'CompanyPartnerId': 0 });
            this.populateCompanyPartners();
            });     
        }

  
        }
     }
    }

  

  }
  



