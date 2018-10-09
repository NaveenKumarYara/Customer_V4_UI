import { Component, OnInit, Input } from '@angular/core';
import { CompanyProfileOtherIno } from '../../../../models/companyprofile-otherinfo';
import { CompanyProfileService } from '../company-profile.service';
import { Router } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service/api.service';
import{otherInfo} from './otherInfo';
declare var $: any;
@Component({
  selector: 'app-otherinfo',
  templateUrl: './otherinfo.component.html',
  styleUrls: ['./otherinfo.component.css'],
  providers: [ApiService]
})
export class OtherinfoComponent implements OnInit {
    @Input() companyprofileotherinfo: CompanyProfileOtherIno;
 customer:any;
 customerId:any;
 userId:any;
 iseditOther: any = false;
companyTypeId:any;
numberOfOffices:any;
numberOfEmployees:any;
dateOfEstablishment:any;
 otherInfo=new otherInfo();
    constructor(private _service: ApiService, private route: Router, private companyprofileservice: CompanyProfileService) {
      this.customer = JSON.parse(sessionStorage.getItem('userData'));
      this.customerId =this.customer.CustomerId;
      this.userId = this.customer.UserId;
     }

  ngOnInit() {
  }
  saveOtherInfo()
  {
    debugger
    this.dateOfEstablishment=$("#EstablishedIn").val();
    this.numberOfEmployees=$("#NumberOfEmployees").val();
    this.numberOfOffices=$("#NumberOfOffices").val();
    this.companyTypeId=$("#company-type").val();
    this.otherInfo.customerId = this.customerId;
    this.otherInfo.dateOfEstablishment= this.dateOfEstablishment;
    this.otherInfo.numberOfEmployees=this.numberOfEmployees;
    this.otherInfo.numberOfOffices=this.numberOfOffices;
    this.otherInfo.companyTypeId= this.companyTypeId;
    this._service.PostService(this.otherInfo, 'ProfileAPI/api/UpdateOtherinfo')
    .subscribe(data => {
      this.populateCompanyProfileOtherInfo(this.customerId);
      this.iseditOther = false;
    },
      error => console.log(error));
}
  
  populateCompanyProfileOtherInfo(customerId) {
    return this.companyprofileservice.getCompanyProfileOtherInfo(customerId).subscribe(res => {
        this.companyprofileotherinfo = res;
    });
}
}
