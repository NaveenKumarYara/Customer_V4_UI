import { Component,Input, OnInit } from '@angular/core';
import { CompanySpecialities } from '../../../../models/CompanySpecialities';
import { GetCompanyTechnology } from '../../../../models/GetCompanyTechnology';
import { ApiService } from '../../../shared/services/api.service/api.service';
import { Router } from '@angular/router';
import { CompanyProfileService } from '../company-profile.service';
import {specialities} from './specialities';
import { AppService } from '../../../app.service';
import {technologies} from './technologies';
import {GetCustomerDepartments} from '../../../../models/GetCustomerDepartments';
import { GetCustomerClients } from "../../../../models/GetCustomerClients";
declare var $: any;

@Component({
  selector: 'app-specialities',
  templateUrl: './specialities.component.html',
  styleUrls: ['./specialities.component.css'],
  providers: [AppService]
})
export class SpecialitiesComponent implements OnInit {
   @Input() companyspecialities : CompanySpecialities[];
   @Input() getcompanytechnology : GetCompanyTechnology[];
   @Input() getCustomerDepartments: GetCustomerDepartments[];
   @Input() getCustomerClients:GetCustomerClients[];
   customer : any;
   customerId:any;
   userId:any;
   companyspecialityId:any;
   specialityId:any;
   speciality:any;
   companytechnologyId:any;
   companytechnology:any;
   technologyId:any;
   specialities = new specialities();
   technologies = new technologies();
   constructor(private _service: ApiService, private appService: AppService, private route: Router, private companyprofileservice: CompanyProfileService) {
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
  populateCompanyTechnologies(customerId) {
    return this.companyprofileservice.GetCompanyTechnologies(customerId).subscribe(res => {
        this.getcompanytechnology = res;
    });
}
savetechnologies()
{
  if(this.technologyId>0)
  {
   this.companytechnologyId=this.technologyId;
  }
  else
  {
    this.technologyId = 0;
   this.companytechnologyId=this.technologyId;
  }
   this.companytechnology = $("#techVal").val();
   this.technologies.companyTechnologyId=  this.companytechnologyId;
   this.technologies.customerId = this.customerId;
   this.technologies.technologyName = this.companytechnology;
   this._service.PostService(this.technologies, 'ProfileAPI/api/InsertCompanyTechnology')
   .subscribe(data => {
     $("#techVal").val('');
     this.technologyId=null;
     this.populateCompanyTechnologies(this.customerId);
   },
     error => console.log(error));

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
    this.populateCompanySpecialities(this.customerId);
  },
    error => console.log(error));
}

EditSpecialities(special)
{
  this.specialityId = special.CompanySpecialityId ;
  var contents = special.CompanySpeciality;
  this.speciality = $("#specialVal").val(contents);
 
}

Edittechnology(technology)
{
  this.technologyId = technology.CompanyTechnologyId;
  var contents = technology.TechnologyName;
  this.companytechnology = $("#techVal").val(contents);
 
}

deletetechnology(technology)
{
  this._service.DeleteService('ProfileAPI/api/DeleteCompanyTechnology?companyTechnologyId=',technology)
  .subscribe(data => {
    this.populateCompanyTechnologies(this.customerId);
  }, error => { this._service.DebugMode(error); });
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
