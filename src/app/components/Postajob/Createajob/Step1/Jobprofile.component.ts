import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../../../../app.service';
import { GetKeyRole, jobImps, KeyRole } from '../../models/jobPostInfo';
import { FormControl, NgForm } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
declare var  $: any ;
@Component({
  selector: 'app-steps-step1-jobprofile',
  templateUrl: './Jobprofile.component.html',
  styleUrls: ['./Jobprofile.component.css']
})
export class JobprofileComponent implements OnInit {
  @ViewChild('profileForm') profileForm: any;
  @ViewChild('roleForm') roleForm: NgForm;
  private subscription: Subscription;
  private subscriptions: Subscription;
declare;
hasCompleteDescription: boolean;
jobDescription: string;
customerId: number;
customer: any;
keyslist:any=[];
domainlist: GetKeyRole[];
domains: Observable<GetKeyRole[]>;
getDomain = new GetKeyRole();
hasCompleteDescriptionList: any;
addkeyList: KeyRole[];
jobPositionId:string;
Postions:any=[];
SelectKey:any;
SelectDepartment:string;
selectedCategory:any;
selectedTitle:any;
categories:any=[];
KeyResponses:any=[];
Industries:any=[];
minExperience:number=3;
maxExperience:number=6;
MinimumExperience = 3;
MaximumExperience = 6;
jobtitlelist:any=[];
jobPriority:number=3;
jobimplist:jobImps[]=[];
  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {
      this.customer = JSON.parse(sessionStorage.getItem('userData'));
      this.customerId = this.customer.CustomerId;
  }

  setValue(val) {
    this.hasCompleteDescription = val;
    this.jobDescription = val ? this.jobDescription : '';
    this.appService.updatehaddescription(this.hasCompleteDescription);
    // if (!this.hasCompleteDescription) {
    //   $('#completeDescription').prop('disabled', true);
    // } else {
    //   $('#completeDescription').prop('disable', false);
    // }
  }

  updateJobImp() {
    this.appService.updateJobImp(this.jobPriority);
  }

  updatePostionType()
  {
    this.appService.updateJobPositionType(this.SelectDepartment);
    this.GetCustomerCategory(this.SelectDepartment);
  }

  

 GetCustomerIndustry()
 {
    this.appService.GetCustomerIndustries(this.customerId).subscribe(res => {
    this.Industries = res[0];
    this.GetCustomerPosition(this.Industries.IndustryId);
 });
 }

 GetCustomerPosition(Id)
 {
  this.appService.GetPositionTypes(Id).subscribe(res1 => {
    this.Postions = res1;
 });
 }

 GetCustomerTitles(Id)
 {
  this.appService.GetJobTitleRoles(Id).subscribe(res2 => {
    this.jobtitlelist = res2;
 });
 }

  GetJobPriority() {
     this.appService.GetJobPriority().subscribe(res => {
      this.jobimplist = res;
  });
  }

  private deleteDomain(index: number) {
    this.appService.deletekeyRole(index);
  }

  
  changeValue(val)
  {
    this.getDomain.DCode = val.Code;
    this.getDomain.CustomerKeyResponsebility = val.KeyId;
  }


  ngOnInit() {
    this.GetJobPriority();
    this.GetCustomerIndustry();
    this.populatedescriptioncheck();
    this.keyslist = this.appService.getKeyRoleList();
    this.subscription = this.appService.keyroleChanged
      .subscribe(
      (domain: GetKeyRole[]) => {
        this.keyslist = domain;
        }
      );

      this.addkeyList = this.appService.getAddedKeyRole();
      this.subscriptions = this.appService.addkeyroleChanged
        .subscribe(
        (domain: KeyRole[]) => {
          this.addkeyList = domain;
          }
        );

   // if (localStorage.getItem('jobId') != null) {
    this.appService.currentDescriptionChecked.subscribe(x => this.hasCompleteDescription = x);
    this.appService.currentjobImp.subscribe(x=>this.jobPriority=x)
    this.appService.currentminExp.subscribe(x => {
      let val = x/12;
      this.minExperience = Number(val.toFixed(2));
    });
   this.appService.currentmaxExp.subscribe(y => {
      let value = y/12;
      this.maxExperience = Number(value.toFixed(2));
   } );
    // if (this.hasCompleteDescription === undefined) {
    //   this.hasCompleteDescription = false;
    // }
    this.appService.currentDescription.subscribe(x => this.jobDescription = x);
    this.appService.currentjobPosition.subscribe(x => this.jobPositionId = x);

  // }
}

GetCustomerCategory(Id)
{
 this.appService.GetCategories(Id).subscribe(res => {
    this.categories = res; 
});
}

numberOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)&& charCode !=46 ) {
    return false;
  }
  return true;

}

onMaxChange()
{
  let val=Number(this.maxExperience*12);
  this.appService.updateMaxExp(val);
}
onMinChange()
{
  let val=Number(this.minExperience*12);
  this.appService.updateMinExp(val);
}



GetKeyRespones(Id)
{
  this.appService.GetJobKeyResponses(Id).subscribe(res3 => {
    this.KeyResponses = res3; 
});
}

public addkeyRole() {
  if (this.roleForm.valid) {
    if (this.MaximumExperience < this.MinimumExperience) {
      return false;
  }
    this.getDomain.CustomerKeyMinExperienceId =  Number(this.MinimumExperience*12);  // parseFloat((this.MaximumExperience / 12).toFixed(1));
    this.getDomain.CustomerKeyMaxExperienceId =  Number(this.MaximumExperience*12); //  parseFloat((this.MinimumExperience / 12).toFixed(1)) ;
    this.appService.addKeyRole(this.getDomain);
    this.SelectKey=undefined;
    // this.getDomain = new GetDomain();
    // this.selecteddomainname = '';
    this.roleForm.resetForm();
    this.MaximumExperience = 6;
    this.MinimumExperience = 3;
    this.getDomain = new GetKeyRole();
}
  }

  dExists(domain, list) {​
    return list.some(function(elem) {
         return elem.Code === domain.Code;
    });
 }

updateJobCategory()
{
  this.GetCustomerTitles(this.selectedCategory);
  this.appService.updateJobCategory(this.selectedCategory);
}

updateJobTitle(val) {
  let id = val.RoleId;
  let title = val.Code;
  this.GetKeyRespones(id);
  this.appService.updateJobtitleId(id);
  this.appService.updateJobtitle(title);
}



populatedescriptioncheck() {
    this.hasCompleteDescriptionList  = this.appService.getHasDescription();
  }

  changeDescription(val) {
    this.jobDescription = val;
    this.appService.updatedescription(this.jobDescription);
  }
  
  changeJobPosition(val) {
    this.jobPositionId = val;
    this.appService.updateJobPosition(this.jobPositionId);
  }


}
