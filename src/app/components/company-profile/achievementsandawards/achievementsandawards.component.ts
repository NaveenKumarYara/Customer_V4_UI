import { Component, OnInit, Input, ViewChild, AfterViewInit,ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import { ApiService } from '../../../shared/services/api.service/api.service';
import { Router } from '@angular/router';
import { CompanyProfileService } from '../company-profile.service';
import {CompanyprofileComponent} from '../companyprofile/companyprofile.component';
import { AlertService } from '../../../shared/alerts/alerts.service';
import {  GetCompanyPartner } from '../../../../models/GetCompanyPartner';
import { GetCompanyCertification } from '../../../../models/GetCompanyCertification';
import { GetCompanyAchievement } from '../../../../models/GetCompanyAchievement';
declare var $: any;
declare var require: any;
@Component({
  selector: 'app-achievementsandawards',
  templateUrl: './achievementsandawards.component.html',
  styleUrls: ['./achievementsandawards.component.css']
})
export class AchievementsandawardsComponent implements OnInit {
  //@Input() getcompanypertner:GetCompanyPartner;
  //@Input() getcompanycertification: GetCompanyCertification;
  //@Input() getcompanyachivements: GetCompanyAchievement;
  getcompanyachivements:GetCompanyAchievement[];
  getcompanypertner:GetCompanyPartner[];
  getcompanycertification: GetCompanyCertification[];
  customer: any;
  customerId: any;
  imageSrc: string;
  CimageSrc: string;
  imageSrc1: string;
  userId: any;
  name:any;
  description:any;
  Pname:any;
  Pdescription:any;
  Cname:any;
  AShow:boolean=false;
  PShow:boolean=false;
  CShow:boolean=false;
  Cdescription:any;
  videoUrl: string;
  profileId: any;
  saveImage: FormGroup;
  Image: FormGroup;
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
    this.Image = this.fb.group({
      'CompanyPartnerId':[0, Validators.required],
      'CustomerId': [this.customerId, Validators.required],
      'PartnerName': ['', Validators.nullValidator],
      'Description': ['', Validators.nullValidator],
      'PartnerLogo':['', Validators.nullValidator],
      'Photo': [null, Validators.nullValidator],
    });
    this.CImage = this.fb.group({
      'CompanyCertificationId':[0, Validators.required],
      'CustomerId': [this.customerId, Validators.required],
      'CertificationName': ['', Validators.nullValidator],
      'CertifiedUnder': ['', Validators.nullValidator],
      'CertificationLogo':['', Validators.nullValidator],
      'StartDate':['', Validators.nullValidator],
      'ExpiryDate':['', Validators.nullValidator],
      'Photo': [null, Validators.nullValidator],
    });
    this.saveImage = this.fb.group({
      'CompanyAchievementId':[0, Validators.required],
      'CustomerId': [this.customerId, Validators.required],
      'AwardTitle': ['', Validators.nullValidator],
      'AwardedYear': ['2019', Validators.nullValidator],
      'Description': ['', Validators.nullValidator],
      'AwardLogo':['', Validators.nullValidator],
      'Photo': [null, Validators.nullValidator],
    }); }
  
    ngOnInit() {
    
    }  
  }
  

  


