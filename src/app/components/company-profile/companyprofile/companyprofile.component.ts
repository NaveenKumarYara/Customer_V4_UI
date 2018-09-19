import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CompanyProfileService } from '../company-profile.service';
import { CompanyBasicInfo } from '../../../../models/CompanyBasicInfo';
import { OtherInfo } from '../../../../models/OtherInfo';
@Component({
  selector: 'app-companyprofile',
  templateUrl: './companyprofile.component.html',
  styleUrls: ['./companyprofile.component.css']
})
export class CompanyprofileComponent implements OnInit {
  companybasicinfo : CompanyBasicInfo ;
  otherinfo:OtherInfo;
  constructor(private route: ActivatedRoute, private companyprofileservice : CompanyProfileService ) { }
  populateCompanyBasicInfo() {
    return this.companyprofileservice.getCompanyBasicInfo().subscribe(res => {
        this.companybasicinfo = res;
    });   
}
populateOtherInfo() {
  return this.companyprofileservice.getCompanyOtherInfo().subscribe(res => {
      this.otherinfo = res;
  });   
}
  ngOnInit() {
    this.populateCompanyBasicInfo();
    this.populateOtherInfo();
  }

}
