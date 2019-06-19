import { Component, OnInit,Input} from '@angular/core';
import { GetCompanyBenefit } from '../../../../models/GetCompanyBenefit';
import { ApiService } from '../../../shared/services/api.service/api.service';
import { Router } from '@angular/router';
import { CompanyProfileService } from '../company-profile.service';
import {benefits} from './benefits';
declare var $: any;

@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.css']
})
export class BenefitsComponent implements OnInit {
@Input() getcompanybenfit:GetCompanyBenefit[];
customer : any;
customerId:any;
userId:any;
companybenfitId:any;
benefitId:any;
benefit:any;
benefits = new benefits();
constructor(private _service: ApiService, private route: Router, private companyprofileservice: CompanyProfileService) {
  this.customer = JSON.parse(sessionStorage.getItem('userData'));
  this.customerId =this.customer.CustomerId;
  this.userId = this.customer.UserId;
 }



  populateCompanyBenfits(customerId) {
    return this.companyprofileservice.getCompanyBenfits(customerId).subscribe(res => {
        this.getcompanybenfit = res;
    });
}
saveBenefits()
{
 if(this.benefitId>0)
 {
  this.companybenfitId=this.benefitId;
 }
 else
 {
  this.benefitId = 0;
  this.companybenfitId=this.benefitId;
 }
  //this.benefit = $("#benefitsVal").val();
  this.benefits.companyBenefitId =  this.companybenfitId;
  this.benefits.customerId = this.customerId;
  this.benefits.companyBenefit = this.benefit;
  this._service.PostService(this.benefits, 'ProfileAPI/api/InsertCompanyBenefits')
  .subscribe(data => {
    this.benefit = '';
    this.benefitId = 0;
    this.populateCompanyBenfits(this.customerId);
  },
    error => console.log(error));
}

EditBenefits(benefit)
{
  this.benefitId = benefit.CompanyBenefitId;
  this.benefit = benefit.CompanyBenefit;
}



deleteBenefits(benefit)
{
  this._service.DeleteService('ProfileAPI/api/DeleteCompanyBenefits?companyBenefitId=', benefit)
  .subscribe(data => {
    this.populateCompanyBenfits(this.customerId);
  }, error => { this._service.DebugMode(error); });
}
ngOnInit() {

}
}
