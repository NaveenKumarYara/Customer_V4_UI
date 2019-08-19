import { Component, OnInit,Input} from '@angular/core';
import { GetCompanyBenefit } from '../../../../models/GetCompanyBenefit';
import { ApiService } from '../../../shared/services/api.service/api.service';
import { Router } from '@angular/router';
import { CompanyProfileService } from '../company-profile.service';
import { CompanySpecialities } from '../../../../models/CompanySpecialities';
import { GetCompanyTechnology } from '../../../../models/GetCompanyTechnology';
import {specialities} from '../specialities/specialities';
import { AppService } from '../../../app.service';
import {technologies} from '../specialities/technologies';
import {GetCustomerDepartments} from '../../../../models/GetCustomerDepartments';
import { GetCustomerClients } from "../../../../models/GetCustomerClients";
import {benefits} from './benefits';
declare var $: any;

@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.css']
})
export class BenefitsComponent implements OnInit {
@Input() getcompanybenfit:GetCompanyBenefit[];
@Input() companyspecialities : CompanySpecialities[];
@Input() getcompanytechnology : GetCompanyTechnology[];
@Input() getCustomerDepartments: GetCustomerDepartments[];
@Input() getCustomerClients:GetCustomerClients[];
customer : any;
customerId:any;
userId:any;
companybenfitId:any;
benefitId:any;
benefit:any;
benefits = new benefits();
companyspecialityId:any;
specialityId:any;
speciality:any;
clientId:any;
clientName:any;
departmentId:any;
departmentName:any;
companytechnologyId:any;
companytechnology:any;
technologyId:any;
specialities = new specialities();
technologies = new technologies();
client = new GetCustomerClients();
department = new GetCustomerDepartments();
constructor(private _service: ApiService, private appService: AppService, private route: Router, private companyprofileservice: CompanyProfileService) {
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
GetCustomerClients(customerId,clientId)
{
return this.appService.GetCustomerClients(customerId,clientId).subscribe(res => {
  this.getCustomerClients = res;
});
}

GetCustomerDepartment(customerId,departmentId)
{
return this.appService.GetCustomerDepartments(customerId,departmentId).subscribe(res => {
this.getCustomerDepartments = res;
});
}

SaveClients()
{
if(this.clientName != "" || this.clientName!= null || this.clientName != undefined)
{

if(this.clientId > 0)
{
  this.client.ClientId = this.clientId;
}
else
{
  this.client.ClientId = 0;
}
this.client.CustomerId = this.customerId;
this.client.ClientName = this.clientName;
this._service.PostService(this.client, 'ProfileAPI/api/InsertCustomerClients')
.subscribe(data => {
  this.clientId = null;
  this.clientName = '';
  this.client.ClientId = null;
  this.client.ClientName = null;
  this.GetCustomerClients(this.customerId,0);
},

  error => console.log(error));
}
}

SaveDepartments()
{
if(this.departmentName != "")
{

if(this.departmentId > 0)
{
  this.department.DepartmentId = this.departmentId;
}
else
{
  this.department.DepartmentId = 0;
}
this.department.CustomerId = this.customerId;
this.department.Department = this.departmentName;
this._service.PostService(this.department, 'ProfileAPI/api/InsertCustomerDepartments')
.subscribe(data => {
  this.departmentId = null;
  this.departmentName = '';
  this.department.DepartmentId = null;
  this.department.Department = null;
  this.GetCustomerDepartment(this.customerId,0);
},

  error => console.log(error));
}
}

savetechnologies()
{
if( this.companytechnology!= ""|| this.companytechnology != undefined)
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
  this.technologyId = 0;
  this.companytechnology='';
   this.populateCompanyTechnologies(this.customerId);
 },
   error => console.log(error));
}

}
saveSpecialities()
{
if( this.speciality!= ""|| this.speciality != undefined)
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
this.specialities.companySpecialityId =  this.companyspecialityId;
this.specialities.customerId = this.customerId;
this.specialities.companySpeciality = this.speciality;
this._service.PostService(this.specialities, 'ProfileAPI/api/InsertCompanySpeciality')
.subscribe(data => {
  this.speciality = '';
  this.specialityId = 0;
  this.populateCompanySpecialities(this.customerId);
},
  error => console.log(error));
}
}

EditSpecialities(special)
{
this.specialityId = special.CompanySpecialityId ;
this.speciality = special.CompanySpeciality;

}

Edittechnology(technology)
{
this.technologyId = technology.CompanyTechnologyId;
this.companytechnology = technology.TechnologyName;

}

EditDepartments(dept)
{
this.departmentId = dept.DepartmentId;
this.departmentName = dept.CustomerDepartment;
}

EditClient(client)
{
this.clientId = client.ClientId;
this.clientName = client.ClientName;
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


deleteClient(CId)
{
return this.appService.DeleteClients(CId).subscribe(res => {
  if(res == 0)
  {
    this.GetCustomerClients(this.customerId,0);
  }
 })
}

deleteDepart(deptId)
{
return this.appService.DeleteDepartments(deptId).subscribe(res => {
  if(res == 0)
  {
    this.GetCustomerDepartment(this.customerId,0);
  }
 })
}
ngOnInit() {
  (function ($) {
    function navLineResizeHandler() {
      var nav = $('.nav-tabs');
      var activeLink = nav.children('li.active');
      var activeLine = nav.children('.active-line');
      var windowWidth = $(window).scrollLeft();
  
      $.each(activeLine, function (index, element) {
        var $element = $(element);
        $element.css({
          width: $element.parent().children(".active").css("width"),
          left: $element.parent().children(".active").position().left - windowWidth
        });
      });
    }
  
    function navLineClickHandler() {
      var btnWidth = $(this).css("width");
      var line = $(this).parent().find(".active-line");
      var btnBox = this.getBoundingClientRect();
      var windowBox = this.parentNode.getBoundingClientRect();
  
      line.css({
        width: btnWidth,
        left: btnBox.left - windowBox.left
      });
    }
  
    $(document).ready(navLineResizeHandler);
  
    $(window).resize(function () {
      setTimeout(navLineResizeHandler, 1000);
    });
  
    var appliedTabBtn = $(".active-line-move .nav-tabs li");
    var appliedLine = $(".active-line-move .nav-tabs .active-line");
    appliedTabBtn.on("click", navLineClickHandler);
  
    
  })($);

}
}
