import { Component, OnInit, Input } from '@angular/core';
import { CompanyProfile } from '../../../../models/companyprofile';
import {GetCompanyLogo} from '../../../../models/GetCompanyLogo';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service/api.service';
import { basicinfo } from './basicinfo';
import { Router } from '@angular/router';
import { CompanyProfileService } from '../company-profile.service';
declare var $: any;
@Component({
  selector: 'app-basicinfo',
  templateUrl: './basicinfo.component.html',
  styleUrls: ['./basicinfo.component.css'],
  providers: [ApiService]
})
export class BasicinfoComponent implements OnInit {
    @Input() companyprofile: CompanyProfile;
    @Input() getcompanylogo:GetCompanyLogo;
    customer : any;
    customerId:any;
    userId:any;
    basicinfo =new basicinfo();
    profileId:any;
    locations: any;
    companyName:any; 
    website:any; 
    contactEmail:any; 
    linkedInURL:any; 
    facebookURL:any; 
    twitterURL:any; 
    mobilePhone:any; 
    homePhone:any; 
    address1:any; 
    address2:any; 
    iseditProfile: any = false;
    fullname: any;
  firstname: any;
  lastname: any;
  constructor(private _service: ApiService, private route: Router, private companyprofileservice: CompanyProfileService) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId =this.customer.CustomerId;
    this.userId = this.customer.UserId;
   }

  ngOnInit() {
  }
  populateCompanyProfile(customerId) {
    return this.companyprofileservice.getCompanyProfile(customerId).subscribe(res => {
        this.companyprofile = res;
    });
}

  saveProfile() {
    this.locations = $("#searchZipCode").val();
    if (this.locations.length <= 7) {
      alert('please select from Google Location');
    }
    else {
      this.iseditProfile = true;
      this.locations = $("#searchZipCode").val();
      this.companyName = $("#companyName").val(); 
      this.website= $("#webSite").val();
      this.contactEmail= $("#contactEmail").val();
      this.linkedInURL= $("#linkedinUrl").val();
      this.facebookURL= $("#facebookUrl").val();
      this.twitterURL= $("#twitterUrl").val();
      this.mobilePhone= $("#mobile").val();
      this.homePhone= $("#home").val();
      this.address1= $("#address1").val();
      this.basicinfo.customerId = this.customerId;
      this.basicinfo.companyName =  this.companyName;
      this.basicinfo.website= this.website;
      this.basicinfo.contactEmail=this.contactEmail;
      this.basicinfo.linkedInURL= this.linkedInURL;
      this.basicinfo.facebookURL=  this.facebookURL;
      this.basicinfo.twitterURL= this.twitterURL;
      this.basicinfo.mobilePhone=this.mobilePhone;
      this.basicinfo.homePhone= this.homePhone;
      this.basicinfo.address1= this.address1;
      this.basicinfo.address2=this.locations;

     }
     this._service.PostService(this.basicinfo, 'ProfileAPI/api/UpdateCompanyprofile')
        .subscribe(data => {
          $("#autocompletezip").val('');
          var contents = $("#searchZipCode").val();
          $("#autocompletezip").val(contents);
          this.populateCompanyProfile(this.customerId);
          this.iseditProfile = false;
        },
          error => console.log(error));
    }
  }