import { Component,Input,OnInit } from '@angular/core';
import { GetAboutCompany } from '../../../../models/GetAboutCompany';
import { aboutcompany } from './aboutcompany';
import { ApiService } from '../../../shared/services/api.service';
import { Router } from '@angular/router';
import { CompanyProfileService } from '../company-profile.service';

declare var $: any;
@Component({
  selector: 'app-aboutcompany',
  templateUrl: './aboutcompany.component.html',
  styleUrls: ['./aboutcompany.component.css']
})
export class AboutcompanyComponent implements OnInit {
  @Input() getaboutcompany: GetAboutCompany[];
  aboutInfo= new aboutcompany();
  customer : any;
  customerId:any;
  userId:any;
  companyabout:any;
  companyDescription:any;
  companyVision:any;
  coreValue:any;
  iseditAbout: any = false;
  constructor(private _service: ApiService, private route: Router, private companyprofileservice: CompanyProfileService) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId =this.customer.CustomerId;
    this.userId = this.customer.UserId;
   }


  ngOnInit() {
  }
  populateAboutCompanyInfo(customerId) {
    return this.companyprofileservice.getCompanyAboutInfo(customerId).subscribe(res => {
        this.getaboutcompany = res;
    });
}
  saveAboutInfo()
  {
    this.companyDescription=$("#CompanyDescription").val();
    this.companyVision=$("#CompanyVision").val();
    this.coreValue =$("#CoreValue").val();
    this.aboutInfo.customerId = this.customerId;
    this.aboutInfo.CompanyDescription = this.companyDescription;
    this.aboutInfo.CompanyVision = this.companyVision;
    this.aboutInfo.CoreValue = this.coreValue;
    this._service.PostService(this.aboutInfo, 'ProfileAPI/api/UpdateAboutCompany')
    .subscribe(data => {
      this.iseditAbout = false;
      this.populateAboutCompanyInfo(this.customerId);
    },
      error => console.log(error));
}


}
