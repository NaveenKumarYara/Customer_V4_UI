import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {GetCustomerDepartments} from '../../../../models/GetCustomerDepartments';
import { GetCustomerClients } from "../../../../models/GetCustomerClients";
import { AppService } from '../../../app.service';
import { CompanyProfileService } from '../company-profile.service';
import { CompanyProfile } from '../../../../models/companyprofile';
import { CompanyProfileOtherIno } from '../../../../models/companyprofile-otherinfo';
import { CustomerLocationInfo } from '../../../../models/customerlocationinfo';
import { GetCompanyLogo } from '../../../../models/GetCompanyLogo';
import { GetAboutCompany } from '../../../../models/GetAboutCompany';
import { GetCompanyBenefit } from '../../../../models/GetCompanyBenefit';
import { CompanySpecialities } from '../../../../models/CompanySpecialities';
import { GetCompanyTechnology } from '../../../../models/GetCompanyTechnology';
import { GetCompanyWhitePaper } from '../../../../models/GetCompanyWhitePaper';
import { GetCompanyNewsInfo } from '../../../../models/GetCompanyNewsInfo';
import {  GetCompanyPartner } from '../../../../models/GetCompanyPartner';
import {  GetCompanyCulture } from '../../../../models/GetCompanyCulture';
import { GetCompanyCertification } from '../../../../models/GetCompanyCertification';
import { GetCompanyAchievement } from '../../../../models/GetCompanyAchievement';

@Component({
  selector: 'app-companyprofile',
  templateUrl: './companyprofile.component.html',
  styleUrls: ['./companyprofile.component.css'],
  providers: [AppService]
})
export class CompanyprofileComponent implements OnInit {
    customer:any;
    customerId:any;
    userId:any;
    show:boolean=false;
    getCustomerDepartments: GetCustomerDepartments[];
    getCustomerClients:GetCustomerClients[];
    companyprofile: CompanyProfile;
    companyprofileotherinfo: CompanyProfileOtherIno;
    companyprofilelocationinfo: CustomerLocationInfo[];
    getaboutcompany: GetAboutCompany[];
    getcompanybenfit: GetCompanyBenefit[];
    companyspecialities : CompanySpecialities[];
    getcompanytechnology : GetCompanyTechnology[];
    getcompanylogo:GetCompanyLogo;
    getcompanywhitepaper: GetCompanyWhitePaper[];
    getcompanynewsinfo: GetCompanyNewsInfo[];
    getcompanypertner:GetCompanyPartner[];
    getcompanycertification: GetCompanyCertification[];
    getcompanycluture:GetCompanyCulture[];
    getcompanyachivements: GetCompanyAchievement[];

  constructor(private route: ActivatedRoute, private appService: AppService,
      private router: Router, private companyprofileservice: CompanyProfileService) { 
        this.customer = JSON.parse(sessionStorage.getItem('userData'));
        this.customerId =this.customer.CustomerId;
        this.userId=this.customer.UserId;
      }

    populateCompanyProfile(customerId) {
        return this.companyprofileservice.getCompanyProfile(customerId).subscribe(res => {
            this.companyprofile = res;
        });
    }

    populateCompanyProfileOtherInfo(customerId) {
        return this.companyprofileservice.getCompanyProfileOtherInfo(customerId).subscribe(res => {
            this.companyprofileotherinfo = res;
        });
    }

    populateCompanyLogo(customerId) {
        return this.companyprofileservice.getCompanyLogo(customerId).subscribe(res => {
            this.getcompanylogo= res;
        });
    }

    populateAboutCompanyInfo(customerId) {
        return this.companyprofileservice.getCompanyAboutInfo(customerId).subscribe(res => {
            this.getaboutcompany = res;
        });
    }

    populateCompanyBenfits(customerId) {
        return this.companyprofileservice.getCompanyBenfits(customerId).subscribe(res => {
            this.getcompanybenfit = res;
        });
    }

    populateCompanyTechnologies(customerId) {
        return this.companyprofileservice.GetCompanyTechnologies(customerId).subscribe(res => {
            this.getcompanytechnology = res;
        });
    }



  

    populateCompanySpecialities(customerId)
    {
        return this.companyprofileservice.getCompanySpecialities(customerId).subscribe(res => {
            this.companyspecialities = res;
        });
    }

    populateCompanyProfileLocationInfo(customerId) {
        return this.companyprofileservice.getCompanyCustomerLocationList(customerId).subscribe(res => {
            this.companyprofilelocationinfo = res;
        });
    }

    GetCustomerClients(customerId)
    {
    return this.appService.GetCustomerClients(customerId,0).subscribe(res => {
        this.getCustomerClients = res;
    });
    }

    GetCustomerDepartment(customerId)
   {
    return this.appService.GetCustomerDepartments(customerId,0).subscribe(res => {
    this.getCustomerDepartments = res;
   });
   }
   getcandidateview()
   {
     this.router.navigateByUrl('app-candidateview')
   }
    ngOnInit() {
        this.populateCompanyProfile(this.customerId);
        this.populateCompanyProfileOtherInfo(this.customerId);
        this.populateCompanyProfileLocationInfo(this.customerId);
        this.populateCompanyLogo(this.customerId);
        this.populateAboutCompanyInfo(this.customerId);
        this.populateCompanyBenfits(this.customerId);
        this.populateCompanySpecialities(this.customerId);
        this.populateCompanyTechnologies(this.customerId);      
        this.GetCustomerClients(this.customerId);
        this.GetCustomerDepartment(this.customerId);
  }

}
