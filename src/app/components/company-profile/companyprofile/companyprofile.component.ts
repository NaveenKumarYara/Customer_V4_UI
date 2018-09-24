import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
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
  styleUrls: ['./companyprofile.component.css']
})
export class CompanyprofileComponent implements OnInit {
    companyprofile: CompanyProfile;
    companyprofileotherinfo: CompanyProfileOtherIno;
    companyprofilelocationinfo: CustomerLocationInfo[]=[];
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

  constructor(private route: ActivatedRoute,
      private router: Router, private companyprofileservice: CompanyProfileService) { }

    populateCompanyProfile() {
        return this.companyprofileservice.getCompanyProfile().subscribe(res => {
            this.companyprofile = res;
        });
    }

    populateCompanyProfileOtherInfo() {
        return this.companyprofileservice.getCompanyProfileOtherInfo().subscribe(res => {
            this.companyprofileotherinfo = res;
        });
    }

    populateCompanyLogo() {
        return this.companyprofileservice.getCompanyLogo().subscribe(res => {
            this.getcompanylogo= res;
        });
    }

    populateAboutCompanyInfo() {
        return this.companyprofileservice.getCompanyAboutInfo().subscribe(res => {
            this.getaboutcompany = res;
        });
    }

    populateCompanyBenfits() {
        return this.companyprofileservice.getCompanyBenfits().subscribe(res => {
            this.getcompanybenfit = res;
        });
    }

    populateCompanyAchivements() {
        return this.companyprofileservice.getCompanyAchivements().subscribe(res => {
            this.getcompanyachivements = res;
        });
    }

    populateCompanyCultures() {
        return this.companyprofileservice.getCompanyCultures().subscribe(res => {
            this.getcompanycluture = res;
        });
    }

    populateCompanyCertifications() {
        return this.companyprofileservice.getCompanyCertifications().subscribe(res => {
            this.getcompanycertification = res;
        });
    }

    populateCompanyPartners() {
        return this.companyprofileservice.getCompanyPartnerShips().subscribe(res => {
            this.getcompanypertner = res;
        });
    }



    populateCompanyTechnologies() {
        return this.companyprofileservice.GetCompanyTechnologies().subscribe(res => {
            this.getcompanytechnology = res;
        });
    }

    populateCompanyWhitePapers() {
        return this.companyprofileservice.getCompanyWhitePapers().subscribe(res => {
            this.getcompanywhitepaper = res;
        });
    }

    populateCompanyNewsInfo() {
        return this.companyprofileservice.getCompanyNewsInfo().subscribe(res => {
            this.getcompanynewsinfo = res;
        });
    }

    populateCompanySpecialities()
    {
        return this.companyprofileservice.getCompanySpecialities().subscribe(res => {
            this.companyspecialities = res;
        });
    }

    populateCompanyProfileLocationInfo() {
        return this.companyprofileservice.getCompanyCustomerLocationInfo().subscribe(res => {
            this.companyprofilelocationinfo = res;
        });
    }

    ngOnInit() {
        this.populateCompanyProfile();
        this.populateCompanyProfileOtherInfo();
        this.populateCompanyProfileLocationInfo();
        this.populateCompanyLogo();
        this.populateAboutCompanyInfo();
        this.populateCompanyBenfits();
        this.populateCompanySpecialities();
        this.populateCompanyTechnologies();
        this.populateCompanyWhitePapers();
        this.populateCompanyNewsInfo();
        this.populateCompanyAchivements();
        this.populateCompanyCertifications();
        this.populateCompanyCultures();
        this.populateCompanyPartners();
  }

}
