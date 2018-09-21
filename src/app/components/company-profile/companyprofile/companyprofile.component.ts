import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { CompanyProfileService } from '../company-profile.service';
import { CompanyProfile } from '../../../../models/companyprofile';
import { CompanyProfileOtherIno } from '../../../../models/companyprofile-otherinfo';
import { CustomerLocationInfo } from '../../../../models/customerlocationinfo';
import {GetCompanyLogo} from '../../../../models/GetCompanyLogo';
@Component({
  selector: 'app-companyprofile',
  templateUrl: './companyprofile.component.html',
  styleUrls: ['./companyprofile.component.css']
})
export class CompanyprofileComponent implements OnInit {
    companyprofile: CompanyProfile;
    companyprofileotherinfo: CompanyProfileOtherIno;
    companyprofilelocationinfo: CustomerLocationInfo[]=[];
    getcompanylogo:GetCompanyLogo;
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
  }

}
