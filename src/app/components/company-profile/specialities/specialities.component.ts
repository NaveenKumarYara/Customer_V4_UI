import { Component,Input, OnInit } from '@angular/core';
import { CompanySpecialities } from '../../../../models/CompanySpecialities';
import { GetCompanyTechnology } from '../../../../models/GetCompanyTechnology';
import { ApiService } from '../../../shared/services/api.service/api.service';
import { Router } from '@angular/router';
import { CompanyProfileService } from '../company-profile.service';
import {specialities} from './specialities';
declare var $: any;

@Component({
  selector: 'app-specialities',
  templateUrl: './specialities.component.html',
  styleUrls: ['./specialities.component.css']
})
export class SpecialitiesComponent implements OnInit {
   @Input() companyspecialities : CompanySpecialities[];
   @Input() getcompanytechnology : GetCompanyTechnology;
   customer : any;
   customerId:any;
   userId:any;
   companyspecialityId:any;
   specialityId:any;
   speciality:any;
   specialities = new specialities();
   constructor(private _service: ApiService, private route: Router, private companyprofileservice: CompanyProfileService) {
     this.customer = JSON.parse(sessionStorage.getItem('userData'));
     this.customerId =this.customer.CustomerId;
     this.userId = this.customer.UserId;
    }
  populateCompanySpecialities(customerId)
  {
      return this.companyprofileservice.getCompanySpecialities(customerId).subscribe(res => {
          this.companyspecialities = res;
      });
  }
saveSpecialities()
{
 if(this.specialityId>0)
 {
  this.companyspecialityId=this.specialityId;
 }
 else
 {
  this.specialityId = 0;
  this.companyspecialityId=this.specialityId;
 }
  this.speciality = $("#specialVal").val();
  this.specialities.companySpecialityId =  this.companyspecialityId;
  this.specialities.customerId = this.customerId;
  this.specialities.companySpeciality = this.speciality;
  this._service.PostService(this.specialities, 'ProfileAPI/api/InsertCompanySpeciality')
  .subscribe(data => {
    $("#specialVal").val('');
    this.specialityId=null;
    this.  populateCompanySpecialities(this.customerId);
  },
    error => console.log(error));
}

EditSpecialities(special)
{
  this.specialityId = special.CompanySpecialityId ;
  var contents = special.CompanySpeciality;
  this.speciality = $("#specialVal").val(contents);
 
}



deleteSpecialities(special)
{
  this._service.DeleteService('ProfileAPI/api/DeleteCompanySpeciality?companySpecialityId=', special)
  .subscribe(data => {
    this.populateCompanySpecialities(this.customerId);
  }, error => { this._service.DebugMode(error); });
}
  ngOnInit() {
  }

}
