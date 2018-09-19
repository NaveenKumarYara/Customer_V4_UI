import { Component, OnInit } from '@angular/core';
import {  Observable, Subject } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CompanyProfileService } from '../company-profile.service';
import { CompanyBasicInfo } from '../../../../models/CompanyBasicInfo';
import { OtherInfo } from '../../../../models/OtherInfo';
import { CompanyLocations} from '../../../../models/CompanyLocations';
@Component({
  selector: 'app-companyprofile',
  templateUrl: './companyprofile.component.html',
  styleUrls: ['./companyprofile.component.css']
})
export class CompanyprofileComponent implements OnInit {
  companybasicinfo : CompanyBasicInfo ;
  otherinfo:OtherInfo;
  id: any;
  sub: any;
  companylocations: CompanyLocations[] = [];
  listcount: number;
  loaddata: boolean = false;

  constructor(private route: ActivatedRoute, private companyprofileservice : CompanyProfileService ) { }
  private data: Observable<any>;
private fruits: Array<CompanyLocations> = [];
private anyErrors: boolean;
private finished: boolean;

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





populateLocationlist() {
  return this.companyprofileservice.getCompanyLocations(this.listcount).subscribe(res => {
    this.companylocations = res;
    this.loaddata = true;
  });
}

updateListCount() {
  this.listcount += 6;
  this.companyprofileservice.updateJobListCount(this.listcount);
}
  ngOnInit() {
    this.sub =
    this.route.params.subscribe(params => {
    this.id = params['id'];     
    })
    this.companyprofileservice.currentlistcount.subscribe(x => this.listcount = x);
    this.populateLocationlist();
    this.populateCompanyBasicInfo();
    this.populateOtherInfo();
  }

}
