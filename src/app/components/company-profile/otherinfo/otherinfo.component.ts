import { Component, OnInit, Input } from '@angular/core';
import { CompanyProfileOtherIno } from '../../../../models/companyprofile-otherinfo';
import { CompanyProfileService } from '../company-profile.service';
import { Router } from '@angular/router';
import{otherInfo} from './otherInfo';
import { companysize } from '../../../../models/companyprofile';
import { ApiService } from '../../../shared/services';
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
 sizeid:any;
 iseditOther: any = false;
 sizelist:companysize[]=[];
companyTypeId:any;
RevenueInfo:any;
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
    this.GetCompany();
  }
  saveOtherInfo()
  {
    this.dateOfEstablishment=$("#EstablishedIn").val();
    this.numberOfEmployees=this.sizeid;
    this.numberOfOffices=$("#NumberOfOffices").val();
    this.companyTypeId=$("#company-type").val();
    this.RevenueInfo=$("#revenueinfo").val();
    this.otherInfo.customerId = this.customerId;
    this.otherInfo.dateOfEstablishment= this.dateOfEstablishment;
    this.otherInfo.numberOfEmployees=this.numberOfEmployees;
    this.otherInfo.numberOfOffices=this.numberOfOffices;
    this.otherInfo.companyTypeId= this.companyTypeId;
    this.otherInfo.RevenueInfo=this.RevenueInfo;
    this._service.PostService(this.otherInfo, 'ProfileAPI/api/UpdateOtherinfo')
    .subscribe(data => {
      this.populateCompanyProfileOtherInfo(this.customerId);
      this.iseditOther = false;
    },
      error => console.log(error));
}

GetCompany()
{
  return this.companyprofileservice.GetCompanySize().subscribe(
    data => {
      this.sizelist = data;
    }
  )

}

onchange(id)
{
  this.sizeid = id;
}

  
  populateCompanyProfileOtherInfo(customerId) {
    return this.companyprofileservice.getCompanyProfileOtherInfo(customerId).subscribe(res => {
        this.companyprofileotherinfo = res;
        this.numberOfEmployees = res.NumberOfEmployees;
    });
}
}
