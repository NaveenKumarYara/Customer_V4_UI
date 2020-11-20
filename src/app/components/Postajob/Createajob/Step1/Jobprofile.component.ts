import { Component, OnInit, Inject, ViewChild,ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../../../../app.service';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
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
  public addTagIndustry: (name)=>void;
  public addTagPosition: (name)=>void;
  public addTagCategory: (name)=>void;
  public addTagTitle: (name)=>void;
  public addTagKey: (name)=>void;
declare;
hasCompleteDescription: boolean;
jobDescription: string;
customerId: number;
customer: any;
keyslist:any=[];
newIndustry = new NewIndustry();
newPostiton = new saveNewPositionType();
newCategory = new saveNewCategory();
newJobTitle = new saveNewTitle();
newKeyResponse = new saveNewKeyRoles();
domainlist: GetKeyRole[];
domains: Observable<GetKeyRole[]>;
getDomain = new GetKeyRole();
hasCompleteDescriptionList: any;
addkeyList: KeyRole[];
jobPositionId:string;
Postions:any=[];
SelectKey:any;
Department:string;
DepartmentId:string;
Category:string;
CategoryId:string;
Title:string;
TitleId:string;
newtitle;
newdepartment;
newindustry;
newcategory;
categories:any=[];
KeyResponses:any=[];
Industries:any=[];
minExperience:number=3;
maxExperience:number=6;
MinimumExperience = 3;
MaximumExperience = 6;
jobtitlelist:any=[];
IndustryId:any;
Industry:any;
disable:any;
disableLoc = false;
isDrafted: boolean;
jobPriority:number=3;
jobimplist:jobImps[]=[];
  constructor(private route: ActivatedRoute,private toastr: ToastsManager, private _vcr: ViewContainerRef,
    private router: Router, private appService: AppService) {
      this.customer = JSON.parse(sessionStorage.getItem('userData'));
      this.customerId = this.customer.CustomerId;
      this.disable =  localStorage.getItem('Item');
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



NewIndustry(val)
{
  this.newIndustry.IndustryName = val;
  this.appService.AddIndustry(this.newIndustry).subscribe(
    data => {
      if(data>0)
      {
        this.IndustryId = data;
        this.Industry = val;
        this.appService.updateJobIndustry(this.Industry);
      }
    })
}

NewPosition(val)
{
  this.newPostiton.Name = val;
  this.newPostiton.IndustryId = Number(this.IndustryId);
  this.appService.AddPositionType(this.newPostiton).subscribe(
    data => {
      if(data>0)
      {
        this.DepartmentId = data;
        this.Department = val;
        this.appService.updateJobPositionType(this.Department);
      }
    })
}

NewCategory(val)
{
  this.newCategory.Name = val;
  this.newCategory.PositionId = Number(this.DepartmentId);
  this.appService.AddCategory(this.newCategory).subscribe(
    data => {
      if(data>0)
      {
        this.CategoryId = data;
        this.Category = val;
        this.appService.updateJobCategoryNew(this.Category);
      }
    })
}

NewJobTitle(val)
{
  this.newJobTitle.Name = val;
  this.newJobTitle.CategoryId = Number(this.CategoryId);
  this.appService.AddJobtitle(this.newJobTitle).subscribe(
    data => {
      if(data>0)
      {
        this.TitleId = data;
        this.Title = val;
        this.appService.updateJobtitle(this.Title);
      }
    })
}

NewKeyResponse(val)
{
  this.newKeyResponse.Name = val;
  this.newKeyResponse.RoleId = Number(this.TitleId);
  this.appService.AddKeyResponsibilities(this.newKeyResponse).subscribe(
    data => {
      if(data>0)
      {
        this.getDomain.DCode = val;
        this.getDomain.CustomerKeyResponsebility = data;
      }
    })
}

  addIndustry(val)
  {
    const  Industries = new NewIndustry();
    Industries.IndustryName = val;
    if(val!=null)
    {
      this.NewIndustry(val);
    }
    return { Code: Industries.IndustryName , tag: true};
  }



  addPosition(val1)
  {
    const position = new saveNewPositionType();
    position.Name = val1;
    if(val1!=null)
    {
      this.NewPosition(val1);
    }
    return { Code: position.Name , tag: true};
  }

  addCategory(val2)
  {
    const category = new saveNewCategory();
    category.Name = val2;
    if(val2!=null)
    {
      this.NewCategory(val2);
    }
    return { Code: category.Name , tag: true};
  }

  addTitle(val3)
  {
    const title = new saveNewTitle();
    title.Name = val3;
    if(val3!=null)
    {
      this.NewJobTitle(val3);
    }
    return { Code: title.Name , tag: true};
  }

  addKeyRes(val4)
  {
    const kres = new saveNewKeyRoles();
    kres.Name = val4;
    if(val4!=null)
    {
      this.NewKeyResponse(val4);
    }
    return { Code: kres.Name , tag: true};
  }
  


  updatePostionType(val)
  {
    this.DepartmentId = val.PositionId.toString();
    this.Department = val.Code;
    this.appService.updateJobPositionType(this.Department);
    this.appService.updateJobPositionTypeId(this.DepartmentId);
    this.GetCustomerCategory(this.DepartmentId);
  }

  updateJobImp() {
    this.appService.updateJobImp(this.jobPriority);
  }

 

  GetCustomerTitles(Id)
  {
     this.appService.GetJobTitleRoles(Id).subscribe(res2 => {
     this.jobtitlelist = res2;
  });
  }

  updateJobIndustry(val) { 
    this.Industry = val.Code;
    this.IndustryId = val.IndustryId.toString();
    this.appService.updateJobIndustry(this.Industry);
    this.appService.updateJobIndustryId(this.IndustryId);
    this.GetCustomerPosition(this.IndustryId);
  }

 GetCustomerIndustry()
 {
    //this.appService.GetCustomerIndustries(this.customerId).subscribe(res => {
    this.appService.GetIndustries().subscribe(res => {
    this.Industries = res;
 });
 }

 GetCustomerPosition(Id)
 {
  this.appService.GetPositionTypes(Id).subscribe(res1 => {
    this.Postions = res1;
 });
 }


 changeValue(val)
 {
   this.getDomain.DCode = val.Code;
   this.getDomain.CustomerKeyResponsebility = val.KeyId;
 }


  GetJobPriority() {
     this.appService.GetJobPriority().subscribe(res => {
      this.jobimplist = res;
  });
  }

   deleteDomain(index: number) {
    this.appService.deletekeyRole(index);
  }



  ngOnInit() {
    //this.addTagNowRef = this.NewIndustry.bind(this);
    this.addTagIndustry = (name) => this.addIndustry(name);
    this.addTagPosition = (name1) => this.addPosition(name1);
    this.addTagCategory = (name2) => this.addCategory(name2);
    this.addTagTitle = (name3) => this.addTitle(name3);
    this.addTagKey = (name4) => this.addKeyRes(name4);
    this.populatedescriptioncheck();
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

    // if (this.hasCompleteDescription === undefined) {
    //   this.hasCompleteDescription = false;
    // }
    this.appService.currentjobIndustry.subscribe(x=>this.Industry=x);
    this.appService.currentjobIndustryId.subscribe(x=>this.IndustryId=x);
    this.appService.currentDescription.subscribe(x => this.jobDescription = x);
    this.appService.currentjobPosition.subscribe(x => this.jobPositionId = x);
    this.appService.currentjobtypePosition.subscribe(x=>this.Department=x);
    this.appService.currentjobtypePositionId.subscribe(x=>this.DepartmentId=x);
    this.appService.currentcategorytitlenew.subscribe(x=>this.Category=x);
    this.appService.currentcategorytitlenewId.subscribe(x=>this.CategoryId=x);
    this.appService.currentjobtitle.subscribe(x=>this.Title=x);
    this.appService.currentjobtitleId.subscribe(x=>this.TitleId=x);
    if(this.Title=='')
    {
      this.Title= this.newtitle;
    }
    if(this.Department=='')
    {
      this.Department = this.newdepartment;
    }
    if(this.Category=='')
    {
      this.Category = this.newcategory;
    }
    if(this.Industry=='')
    {
      this.Industry = this.newindustry;
    }
    this.appService.currentjobtitleId.subscribe(x=>
      {
        this.TitleId=x;
        if(this.TitleId !=='')
        {
          this.GetKeyRespones(this.TitleId);
        }
      }
     
      );


    this.GetJobPriority();
    this.GetCustomerIndustry();

  // }
}

numberOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)&& charCode !=46 ) {
    return false;
  }
  return true;

}

GetCustomerCategory(Id)
{
 this.appService.GetCategories(Id).subscribe(res => {
    this.categories = res; 
});
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



  dExists(domain, list) {​
    return list.some(function(elem) {
         return elem.Code === domain.Code;
    });
 }

updateJobCategory(val)
{
  this.CategoryId = val.CategoryId.toString();
  this.Category = val.Code;
  this.GetCustomerTitles(this.CategoryId);
  this.appService.updateJobCategoryNew(this.Category);
  this.appService.updateJobCategoryNewId(this.CategoryId);
}

public addkeyRole() {
  if (this.roleForm.valid) {
    if (this.MaximumExperience < this.MinimumExperience) {
      return false;
  }
    this.getDomain.CustomerKeyMinExperienceId =  Number(this.MinimumExperience*12);  // parseFloat((this.MaximumExperience / 12).toFixed(1));
    this.getDomain.CustomerKeyMaxExperienceId =  Number(this.MaximumExperience*12);
    if(this.getDomain.CustomerKeyMinExperienceId === 0)
    {
      this.toastr.error('Minimum experience should be greater than 0!', 'Oops!');
      setTimeout(() => {
          this.toastr.dismissToast;
      }, 3000);
       return false;
    } 
    if(this.getDomain.CustomerKeyMaxExperienceId === 0)
    {
      this.toastr.error('Maximum experience should be greater than 0!', 'Oops!');
      setTimeout(() => {
          this.toastr.dismissToast;
      }, 3000);
       return false;
    }
    if (this.getDomain.CustomerKeyMinExperienceId > this.getDomain.CustomerKeyMaxExperienceId) {
      this.toastr.error('Minimum experience should not be greater than Maximum experience!', 'Oops!');
          setTimeout(() => {
              this.toastr.dismissToast;
          }, 3000);
          return false;
     }
    else
    {
      this.appService.addKeyRole(this.getDomain);
      this.SelectKey=undefined;
      this.roleForm.resetForm();
      this.MaximumExperience = 6;
      this.MinimumExperience = 3;
      this.getDomain = new GetKeyRole();
    }

}
  }



  updateJobTitle(val) {
    this.TitleId = val.RoleId.toString();
    this.Title = val.Code;
    this.GetKeyRespones(this.TitleId);
    this.appService.updateJobtitleId(this.TitleId);
    this.appService.updateJobtitle(this.Title);
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

  ngAfterViewChecked() {
    this.appService.currentDraft.subscribe(x => this.isDrafted = x);
    if(this.disable == "true")
    {
      this.disableLoc = false;
    }
    else 
    {
      this.disableLoc = (localStorage.getItem('EditMode') != null && this.isDrafted === false) ? true : false;
    }
   
  }


}


export class NewIndustry
{  
    IndustryName: string;  
}

export class saveNewPositionType
{
  IndustryId: number;
  Name: string;
}

export class saveNewCategory
{
  PositionId: number;
  Name: string;
}

export class saveNewTitle
{
  CategoryId: number;
  Name: string;
}

export class saveNewKeyRoles
{
  RoleId: number;
  Name: string;
}
