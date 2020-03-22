import { Component, OnInit, Inject ,ViewContainerRef} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../../../../app.service';
import { InsertJob, PjDepartments } from '../../models/jobPostInfo';
import { Location } from '@angular/common';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import { StepsComponent } from '../steps.component';
@Component({
  selector: 'app-steps-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.css']
})
export class Step4Component implements OnInit {z
// step1
//Loader Condition
  loading = false;
//Loader Condition
  insertJob = new InsertJob();
  jobCategory: number;
  jobMinExp: number;
  jobMaxExp: number;
  Template:number;
  jobTitle: string;
  TemplateName:string;
  jobDescription: string;
  jobPositionId: string;
  jobHasDescription: boolean;
  jobResponsibility: any;
  jobSkillsPrimary: any;
  jobSkillsSecondary: any;
  departments: any;
  client: any;
  pjDepartments:  PjDepartments[] = [];
// step2
  domain: any;
  locations: any;
  openings: any;
  personalityType: any;
  qualification: any;
  draftItem: any;
  JobIds=[];
// step3
  contractDuration: any;
  contractExtension: any;
  empType: any;
  complete: any;
  salaryType: any;
  intwType: any;
  reporting: any;
  customer: any;
  disable:any;
  userId: any;
  customerId: any;
  flag:boolean= true;
  team: any;
  constructor(private route: ActivatedRoute,private toastr: ToastsManager, private _vcr: ViewContainerRef,
    private router: Router, private appService: AppService, private location: Location, private steps: StepsComponent) {
      this.customer = JSON.parse(sessionStorage.getItem('userData'));
      this.customerId = this.customer.CustomerId;
      this.disable =  localStorage.getItem('Item');    
      this.toastr.setRootViewContainerRef(_vcr);
      this.complete = JSON.parse(localStorage.getItem('completed'));
      this.draftItem = JSON.parse(localStorage.getItem('draftItem'));
      this.userId = this.customer.UserId;
      this.appService.currentcategorytitle.subscribe((data) => {
        this.jobCategory = data.JobCategoryId; // And he have data here too!
    });
    this.appService.currentjobtitle.subscribe((data) => {
      this.jobTitle = data; // And he have data here too!
    });
    this.appService.currentminExp.subscribe((data) => {
      this.jobMinExp = data; // And he have data here too!
    });
    this.appService.currentmaxExp.subscribe((data) => {
      this.jobMaxExp = data; // And he have data here too!
    });
    this.appService.addedresponsibilitiesChanged.subscribe((data) => {
      this.jobResponsibility = data; // And he have data here too!
    });
    this.appService.currentDescriptionChecked.subscribe((data) => {
      this.jobHasDescription = data; // And he have data here too!
    });
    this.appService.currentDescription.subscribe((data) => {
      this.jobDescription = data; // And he have data here too!
    });
    this.appService.currentjobPosition.subscribe((data) => {
      this.jobPositionId = data; // And he have data here too!
    });
    this.appService.jobprimaryskillsChanged.subscribe((data) => {
      this.jobSkillsPrimary = data; // And he have data here too!
    });
    this.appService.jobsecondaryskillsChanged.subscribe((data) => {
      this.jobSkillsSecondary = data; // And he have data here too!
    });
    this.appService.currentClient.subscribe((data) => {
      this.client = data; // And he have data here too!
    });
    this.appService.addeddepartmentsChanged.subscribe((data) => {
      this.departments = data; // And he have data here too!
    });
    // step2:

    this.appService.adddomainChanged.subscribe((data) => {
      this.domain = data; // And he have data here too!
    });
    this.appService.currentlocation.subscribe((data) => {
      this.locations = data; // And he have data here too!
    });
    this.appService.currentOpenings.subscribe((data) => {
      this.openings = data; // And he have data here too!
    });
    this.appService.personTypeSingleChanged.subscribe((data) => {
      this.personalityType = data; // And he have data here too!
    });
    this.appService.addqualificationsChanged.subscribe((data) => {
      this.qualification = data; // And he have data here too!
    });

    // step3:

    this.appService.currentEmploymentType.subscribe((data) => {
      this.empType = data.EmploymentTypeId; // And he have data here too!
    });
    this.appService.currentSalaryTYpe.subscribe((data) => {
      this.salaryType = data.SalaryTypeId; // And he have data here too!
    });
    this.appService.currentContractDuration.subscribe((data) => {
      this.contractDuration = data; // And he have data here too!
    });
    this.appService.currentInterviewType.subscribe((data) => {
      this.intwType = data.InterviewTypeId; // And he have data here too!
    });
    this.appService.currentcustomerUsers.subscribe((data) => {
      this.reporting = data.UserId; // And he have data here too!
    });
    this.appService.addedteammembersChanged.subscribe((data) => {
      this.team = data; // And he have data here too!
    });
    this.flag = false;
  }


  ngOnInit() {  
    this.JobIds = this.appService.JobIds;
  }


  checkValue(event: any){
    this.Template = event;
 }
  postJob(step) {
    //for loader placed the below condition
    this.loading = true;
    //
    // this.appService.updateStepNumber(step);
    if(this.disable == "true")
    {
      const res = localStorage.getItem('JobId');    
      this.insertJob.JobId = res != null ? parseInt(res, 10) : 0;
    }
    else 
    {
     const res = localStorage.getItem('jobId');
     // if (res != null) {
     this.insertJob.JobId = res != null ? parseInt(res, 10) : 0;
    }
    this.insertJob.CustomerId = this.customerId;
    this.insertJob.UserId = this.userId;
    this.insertJob.JobPositionId = this.jobPositionId;

    this.insertJob.JobCategoryId = this.jobCategory; // this.appService.jobcategory.value.JobCategoryId;
    this.insertJob.JobTitle = this.jobTitle; // this.appService.jobtitle.value;
    this.insertJob.MinExperienceId = this.jobMinExp; // this.appService.minExperience.value;
    this.insertJob.MaxExperienceId = this.jobMaxExp;  // this.appService.maxExperience.value;
    this.insertJob.XmlRoleId =  this.appService.addedresponsibilities; // this.jobResponsibility ;
    this.insertJob.CompleteDescription = this.jobHasDescription; // this.appService.hasDescription.value;
    this.insertJob.JobDescription = this.jobDescription; // this.appService.description.value;
    this.insertJob.XmlSkills =  this.appService.primaryjobskills.concat( this.appService.secondaryjobskills);
    // this.jobSkillsPrimary.concat(this.jobSkillsSecondary);
    this.insertJob.ClientId = this.client.ClientId;
    this.insertJob.ClientName = this.insertJob.ClientId > 0 ? '' : this.client.ClientName ;
    // this.insertJob.ClientId = parseInt(localStorage.getItem('clientId'), 10);
    // this.insertJob.ClientName = localStorage.getItem('clientName');
    this.insertJob.XmlDepartment = this.appService.addeddepartments; // this.pjDepartments; //  this.departments;
    // step2

    //this.insertJob.NumberOfVacancies = this.openings; // this.appService.noofOpenings.value;
    //this.insertJob.PreferredLocationId = this.locations ; // this.appService.location.value.locationId.toString();
    this.insertJob.XmlQualifications = this.appService.addqualifications; //  this.qualification;
    this.insertJob.XmlDomains = this.appService.adddomain; // this.domain;
     this.insertJob.XmlPersonType = this.appService.personTypeSingle; //  this.personalityType;
     //matching Criteria
     this.insertJob.MatchingCrieterias = this.appService.skillPostData;

    

    // this.insertJob.JobCategoryId = this.appService.jobcategory.value.JobCategoryId;
    // this.insertJob.JobTitle = this.appService.jobtitle.value;
    // this.insertJob.XmlSkills = this.appService.primaryjobskills.concat(this.appService.secondaryjobskills);

    // this.insertJob.MinExperienceId = this.appService.minExperience.value;
    // this.insertJob.MaxExperienceId = this.appService.maxExperience.value;
    // this.insertJob.XmlRoleId = this.appService.addedresponsibilities;
    // this.insertJob.CompleteDescription = this.appService.hasDescription.value;
    // this.insertJob.JobDescription = this.appService.description.value;
    // this.insertJob.SalaryTypeId = 1;
    // this.insertJob.MinimumSalary = '1';
    // this.insertJob.MaximumSalary = '200';

    // this.insertJob.NumberOfVacancies = this.appService.noofOpenings.value;
    // this.insertJob.PreferredLocationId = this.appService.location.value.locationId.toString();
    // this.insertJob.XmlQualifications = this.appService.addqualifications;
    // this.insertJob.XmlDomains = this.appService.adddomain;
    //  this.insertJob.XmlPersonType = this.appService.personTypeSingle;



    this.insertJob.EmploymentTypeId = this.empType; // this.appService.employmentType.value.EmploymentTypeId;
   // if (localStorage.getItem('EditMode') != null && this.insertJob.JobId > 0) {
      // this.appService.currentEmploymentType.subscribe((data) => {
      //   this.insertJob.EmploymentTypeId = data.EmploymentTypeId; // And he have data here too!
      // });
    if (this.insertJob.EmploymentTypeId === 2) {
      this.appService.currentContractExtension.subscribe((data) => {
        this.insertJob.WorkAuthorizationId = data.WorkAuthorizationId; // And he have data here too!
      });
      this.appService.currentContractDuration.subscribe((data) => {
        this.insertJob.ContractDuration = data; // And he have data here too!
      });
    }
    this.insertJob.SalaryTypeId = this.salaryType;
    if (this.insertJob.EmploymentTypeId === 2) {
      this.appService.currentMinRate.subscribe(x => this.insertJob.MinimumSalary = x.toString());
      this.appService.currentMaxRate.subscribe(x => this.insertJob.MaximumSalary = x.toString());
    } else if (this.insertJob.EmploymentTypeId === 1) {
      this.appService.currentMinHourlyRate.subscribe(x => this.insertJob.MinimumSalary = x.toString());
      this.appService.currentMaxHourlyRate.subscribe(x => this.insertJob.MaximumSalary = x.toString());
      // this.insertJob.ContractExtended = true;
      // this.insertJob.ContractDuration = this.contractDuration;
     }
    // this.insertJob.MinimumSalary = this.insertJob.SalaryTypeId==1?this.appService.currentMinRate.subscribe(x => this.insertJob.MinimumSalary = x) :this.appService.currentMinHourlyRate.subscribe(x => this.insertJob.MinimumSalary= x);
    // this.insertJob.MaximumSalary =  this.insertJob.SalaryTypeId==1?this.appService.currentMaxRate.subscribe(x => this.maxAnnualRate = x):    this.appService.currentMaxHourlyRate.subscribe(x => this.maxHourRate = x);
    // this.insertJob.IsDrafted = true;
    if (localStorage.getItem('EditMode') != null && this.insertJob.JobId > 0) {
      this.appService.currentDraft.subscribe(x => this.insertJob.IsDrafted = x);
   // this.insertJob.StepNumber = 4;
    } else {
        this.insertJob.IsDrafted = true;
    }
    this.insertJob.StepNumber = 4;
    if (this.appService.stepNumber.value <= step) {
      this.appService.updateStepNumber(step);
      }
      if (this.appService.isDrafted.value != null) {
        this.appService.updateJobDraft(this.insertJob.IsDrafted);
        }
    // }
  //   else {
  //   this.insertJob.EmploymentTypeId = 1;
  //   this.insertJob.SalaryTypeId = 1;
  //   this.insertJob.MinimumSalary = '1';
  //   this.insertJob.MaximumSalary = '200';
  //   this.insertJob.IsDrafted = false;
  //   this.insertJob.StepNumber = 4;
  // }
  //   if (this.insertJob.EmploymentTypeId === 2) {
  //   this.insertJob.ContractExtended = true;
  //   this.insertJob.ContractDuration = this.contractDuration;
  // } // this.appService.contractDuration.value;
    this.insertJob.HiringProcessId = this.intwType; // this.appService.interviewType.value.InterviewTypeId;
    this.insertJob.HiringManagerId = this.reporting; // this.appService.reportingManager.value.UserId;
    this.insertJob.XmlTechnicalTeam = this.appService.addedteammembers;
    this.insertJob.SaveAsTemplate = this.Template;
    if (this.draftItem === true) {
    this.insertJob.Draft = this.draftItem;
    this.insertJob.Email = this.customer.Email;
    } // this.team;
    if(this.Template == 1 && this.TemplateName == '' || this.Template == 1 && this.TemplateName == undefined)
    {
      this.toastr.error('Template name is required!','Oops');
      setTimeout(() => {
        this.toastr.dismissToast;
    }, 3000);
    }
    else 
    {
      if(this.JobIds&&this.JobIds.length>0)
      {
      var res = new Promise((resolve, reject) => {
      this.JobIds.forEach((value, index, array) => {
      this.insertJob.JobId = value;
      this.insertJob.TemplateSaveTitle = this.TemplateName;
      debugger
      this.appService.postjob(this.insertJob).subscribe(data => {
        if (data) {        
          // this.insertJob.JobId = data;
          // window.location.href = '/app-manage-jobs/app-manage-load-joblist/1';
          // this.location.go('/app-manage-jobs/app-manage-load-joblist/1');
          localStorage.removeItem('draftItem');
          localStorage.removeItem('hide');
          localStorage.removeItem('SalaryTypeId');
          this.TemplateName= null;
          // this.router.navigate(['/app-manage-jobs/app-manage-load-joblist/1']);
          this.router.navigate([localStorage.getItem('EditViewJob') != null ?
          this.ViewJobdetails(this.insertJob.JobId) : '/app-manage-jobs/app-manage-load-joblist/1']);
        }
      });
      if (index === array.length -1) resolve();
      debugger
    });
  });

   res.then(() => {
   this.router.navigate(['/app-manage-jobs/app-manage-load-joblist/1']);
   });
   
      
       }
       if(this.JobIds.length==0 || this.JobIds == undefined)
      {
      this.insertJob.TemplateSaveTitle = this.TemplateName;
      this.appService.postjob(this.insertJob).subscribe(data => {
        if (data) {        
          // this.insertJob.JobId = data;
          // window.location.href = '/app-manage-jobs/app-manage-load-joblist/1';
          // this.location.go('/app-manage-jobs/app-manage-load-joblist/1');
          localStorage.removeItem('draftItem');
          localStorage.removeItem('hide');
          localStorage.removeItem('SalaryTypeId');
          this.TemplateName= null;
          // this.router.navigate(['/app-manage-jobs/app-manage-load-joblist/1']);
          this.router.navigate([localStorage.getItem('EditViewJob') != null ?
          this.ViewJobdetails(this.insertJob.JobId) : '/app-manage-jobs/app-manage-load-joblist/1']);
        }
      });

       }
     
     }
  }
  ViewJobdetails(jobId) {
    sessionStorage.setItem('jobId', JSON.stringify(jobId));
    this.router.navigateByUrl('app-view-jobdetails');
  }
  backtoStep3() {
    if (this.complete > 0) {
      this.steps.step3toggleClass(this.complete);
    } else {
      this.steps.step3toggleClass(2);
    }
  }

  asyncFunction (item, cb) {
    setTimeout(() => {      
      console.log('done with', item);
      cb();
    }, 3000);
  }


}
