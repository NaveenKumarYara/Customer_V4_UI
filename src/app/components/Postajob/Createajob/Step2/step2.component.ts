import { Component, OnInit, Inject, ViewChild,HostListener, AfterViewChecked,ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DomainExpertiseComponent } from './domainexpertise.component';
import { PersonalityTypeComponent } from './PersonalityType.component';
import { QualificationsComponent } from './qualifications.component';
import { AlertService } from '../../../../shared/alerts/alerts.service';
// import { LocationwiseJobsComponent } from '../Step1/locationwisejobs.component';
// import { NoofopeningsComponent } from '../Step1/noofopenings.component';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import { InsertJob, PjSkill, PjRole, PjDisc, PjDomain, PjEducationDetails, PjTechnicalTeam, PjJobAccessTo, PjDepartments } from '../../models/jobPostInfo';
import { AppService } from '../../../../app.service';
import { Step1Component } from '../Step1/step1.component';
import { JobcategoryComponent } from '../Step1/Jobcategory.component';
import { JobdetailsComponent } from '../Step1/Jobdetails.component';
import { JobprofileComponent } from '../Step1/Jobprofile.component';
import { JobResponsibilitiesComponent } from '../Step2/Jobresponsibilities.component';
import { JobskillsetComponent } from '../Step2/Jobskillset.component';
import { StepsComponent } from '../steps.component';
import swal from "sweetalert2";
import { ImmigrationComponent } from './immi.component';
import { MatDialog } from '@angular/material';
import { DocumentManagerComponent } from '../../document-manager/document-manager.component';
declare var $: any;
declare var jQuery: any;
import * as introJs from 'intro.js/intro.js';
@Component({
  selector: 'app-steps-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2Component implements OnInit,AfterViewChecked {
  // @ViewChild(Step1Component) step1: Step1Component;
  // @ViewChild(JobcategoryComponent) jobCategory: JobcategoryComponent;
  // @ViewChild(JobdetailsComponent) jobDetail: JobdetailsComponent;
  // @ViewChild(JobprofileComponent) jobProfile: JobprofileComponent;
  // @ViewChild(JobResponsibilitiesComponent) jobResponsibility: JobResponsibilitiesComponent;
  // @ViewChild(JobskillsetComponent) jobSkills: JobskillsetComponent;
  jobIdExists: any;
  jobCategory: number;
  jobMinExp: number;
  jobMaxExp: number;
  jobTitle: string;
  introJS = introJs();
  salaryMinRate: number;
  salaryMaxRate: number;
  jobDescription: string;
  jobPositionId: string;
  jobHasDescription: boolean;
  jobResponsibilities: any;
  jobSkillsPrimary: any;
  jobSkillsSecondary: any;
  departments: any;
  client: any;
  disable:any;
  customer: any;
  complete: any;
  userId: any;
  customerId: any;
  JobIds=[];
  disable1:any;
  scroll:boolean=false;
disableLoc = false;
isDrafted: boolean;
  pjDepartments:  PjDepartments[] = [];
  @ViewChild(DomainExpertiseComponent) domain: DomainExpertiseComponent;
  // @ViewChild(LocationwiseJobsComponent) locations: LocationwiseJobsComponent;
  // @ViewChild(NoofopeningsComponent) openings: NoofopeningsComponent;
  @ViewChild(PersonalityTypeComponent) personalityType: PersonalityTypeComponent;
  @ViewChild(QualificationsComponent) qualification: QualificationsComponent;
  @ViewChild(JobResponsibilitiesComponent) jobResponsibility: JobResponsibilitiesComponent;
  @ViewChild(JobskillsetComponent) jobSkills: JobskillsetComponent;
  @ViewChild(ImmigrationComponent) immi: ImmigrationComponent;
  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    event.returnValue = false;
}
  // formData: any;
  // joblist = new InsertJob();
  insertJob = new InsertJob();
  checkIndustry:number;
  // pjSkill: PjSkill;
  // pjRole: PjRole;
  // pjDisc: PjDisc;
  // pjDomain: PjDomain;
  // pjEducationDetails: PjEducationDetails;
  // pjTechnicalTeam: PjTechnicalTeam;
  // pjJobAccessTo: PjJobAccessTo;
  // pjSkillList: any = [];
  // pjRoleList: any = [];
  // pjDiscList: any = [];
  // pjDomainList: any = [];
  // pjEducationDetailsList: any = [];
  // pjTechnicalTeamList: any = [];
  // pjJobAccessToList: any = [];
  constructor(private route: ActivatedRoute, private toastr: ToastsManager, private _vcr: ViewContainerRef,private dialog: MatDialog,
    private router: Router, private appService: AppService, private steps: StepsComponent, private alertService: AlertService) {
      this.customer = JSON.parse(sessionStorage.getItem('userData'));
      this.complete = JSON.parse(localStorage.getItem('completed'));
      const swal = require('sweetalert2');
      this.disable =  localStorage.getItem('Item');
      this.customerId = this.customer.CustomerId;
      this.userId = this.customer.UserId;
      this.jobIdExists = localStorage.getItem('hide');
      this.toastr.setRootViewContainerRef(_vcr);
    this.appService.currentcategorytitle.subscribe((data) => {
        this.jobCategory = data.JobCategoryId; // And he have data here too!
    });
   this.appService.IndustryId.subscribe((data)=>
   {
     this.checkIndustry = Number(data);
   });
    this.appService.currentjobtitle.subscribe((data) => {
      this.jobTitle = data; // And he have data here too!
    });
    this.appService.currentMinRate.subscribe((data) => {
      this.salaryMinRate = data; // And he have data here too!
    });
    this.appService.currentMaxRate.subscribe((data) => {
      this.salaryMaxRate = data; // And he have data here too!
    });
    this.appService.currentminExp.subscribe((data) => {
      this.jobMinExp = data; // And he have data here too!
    });
    this.appService.currentmaxExp.subscribe((data) => {
      this.jobMaxExp = data; // And he have data here too!
    });
    this.appService.addedresponsibilitiesChanged.subscribe((data) => {
      this.jobResponsibilities = data; // And he have data here too!
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
  }

  documentManagerDialog() {
    const res = localStorage.getItem('jobId');
    let JID  = res != null ? parseInt(res, 10) : 0;
    this.dialog.open(DocumentManagerComponent, {
      width: "80vw",
      position: { right: "0px" },
      height: "750px",
      data: {
        jobId: JID
      },
      panelClass: 'candiateModalPop'
    });
  }

  start()
  {
    this.introJS.start();
  }


  ngOnInit() {
    this.alertService.clear();
    this.JobIds = this.appService.JobIds;
    //window.addEventListener('scroll', this.scrolling, true);
    // $(window).scroll(function(event) {
    //   function footer()
    //     {
    //         var scroll = $(window).scrollTop(); 
    //         if(scroll < 800)
    //         { 
    //             $(".poj-footer").fadeIn("slow").addClass("show");
    //         }
          
    //         else
    //         {
    //             $(".poj-footer").fadeOut("slow").removeClass("show");
    //         }
            
    //         clearTimeout($.data(this, 'scrollTimer'));
    //         $.data(this, 'scrollTimer', setTimeout(function() {
    //             if ($('.poj-footer').is(':hover')) {
    //             footer();
    //         }
    //             else
    //             {
    //               $(".poj-footer").fadeOut("slow");
    //             }
    //     }, 2000));
    //     }
    //     footer();
    // });
  }

  scrolling=(s)=>{
    let sc = s.target.scrollingElement.scrollTop;
    console.log();
    if(sc >=100){this.scroll=true}
    else{this.scroll=false}
  }

  postJob(step, exit?) {
    if(this.qualification.addkeyList.length===0)
    {
        swal(
          {
            title: 'Are you sure?',
            text: 'Key Responsibilities not yet provided',
            showCancelButton: true,
            confirmButtonText: 'Yes, go ahead.',
            cancelButtonText: 'No, let me think',
            showConfirmButton: true,
            type: "info",
            confirmButtonColor: '#66dab5',
            cancelButtonColor: '#FF0000'
          }).then((result) => {
            if (result.value === true) {
              if (
                // this.openings.noOfOpenings > 0 && this.locations.prfLoc.CityId > 0
               this.jobSkills.primaryjobskills.concat(this.jobSkills.secondaryjobskills).length > 0) {
             this.insertJob.CustomerId = this.customerId;
             this.insertJob.UserId = this.userId;
             this.insertJob.JobPositionId = this.jobPositionId;
             if(this.disable == "true")
             {  
               this.insertJob.JobId = 0;
             }
             else 
             {
              const res = localStorage.getItem('jobId');
              // if (res != null) {
              this.insertJob.JobId = res != null ? parseInt(res, 10) : 0;
             }
             this.insertJob.HideSalary = this.appService.HideSalary;
             this.insertJob.BonusOffered = this.appService.BonusOffered;
             this.insertJob.JobCategoryId = this.jobCategory; // this.appService.jobcategory.value.JobCategoryId;
             this.insertJob.JobTitle = this.jobTitle; // this.appService.jobtitle.value;
             this.insertJob.MinExperienceId = Math.round(this.jobMinExp); // this.appService.minExperience.value;
             this.insertJob.MaxExperienceId = Math.round(this.jobMaxExp);  // this.appService.maxExperience.value;
             this.insertJob.XmlRoleId =  this.appService.addedresponsibilities; // this.jobResponsibility ;
             this.insertJob.CompleteDescription = this.jobHasDescription; // this.appService.hasDescription.value;
             this.insertJob.JobDescription = this.jobDescription; // this.appService.description.value;
             this.insertJob.XmlSkills = this.appService.primaryjobskills.concat( this.appService.secondaryjobskills);
             this.insertJob.ClientId = this.client.ClientId;
             this.insertJob.XmlKeyResponses = this.qualification.addkeyList;
           
         
             this.insertJob.SaveAsTemplate = 0;
             this.insertJob.ClientName = this.insertJob.ClientId > 0 ? '' : this.client.ClientName ;
             // this.insertJob.ClientId = parseInt(localStorage.getItem('clientId'), 10);
             // this.insertJob.ClientName = localStorage.getItem('clientName');
             this.insertJob.XmlDepartment =  this.appService.addeddepartments; // this.pjDepartments; //this.departments;
            
             // this.insertJob.DepartmentId = this.appService.addeddepartments;
         
         
             //  this.jobSkillsPrimary.concat(this.jobSkillsSecondary);
         
             // step2
             // moved to step2
             // this.insertJob.NumberOfVacancies = this.openings.noOfOpenings;
             // this.insertJob.PreferredLocationId = this.locations.prfLoc.CityId.toString();
             this.insertJob.XmlSkills = this.jobSkills.primaryjobskills.concat(this.jobSkills.secondaryjobskills);
             this.insertJob.XmlRoleId = this.jobResponsibility.roleIdList;
             //debugger
             // end moved to step2
             this.insertJob.XmlQualifications = this.qualification.addqualificationList;
             
             if(this.domain != undefined)
             {
               this.insertJob.XmlDomains = this.domain.addDomainList;
             }
              
             this.insertJob.XmlPersonType = this.personalityType.checkpersonType;
              if(this.immi.selectedItems.length>0)
             {
               this.immi.AddStatus();
             }  
             // this.insertJob.IsDrafted = true;
             // this.insertJob.StepNumber = 2;
             // this.insertJob.EmploymentTypeId = 1;
             //  this.insertJob.SalaryTypeId = 1;
             // this.insertJob.MinimumSalary = this.salaryMinRate.toString();
             // this.insertJob.MaximumSalary = this.salaryMaxRate.toString();
         
             if (localStorage.getItem('EditMode') != null && this.insertJob.JobId > 0) {
               this.appService.currentEmploymentType.subscribe((data) => {
                 this.insertJob.EmploymentTypeId = data.EmploymentTypeId; // And he have data here too!
               });
               this.appService.currentSalaryTYpe.subscribe((data) => {
                 this.insertJob.SalaryTypeId = data.SalaryTypeId; // And he have data here too!
               });
               if (this.insertJob.EmploymentTypeId === 2) {
                 this.appService.currentContractExtension.subscribe((data) => {
                   this.insertJob.WorkAuthorizationId = this.appService.Workauthorize.toString(); // And he have data here too!
                 });
                 this.appService.currentContractDuration.subscribe((data) => {
                   this.insertJob.ContractDuration = data; // And he have data here too!
                 });
               }
             // this.insertJob.EmploymentTypeId = 1;
             // this.insertJob.SalaryTypeId = this.insertJob.EmploymentTypeId;
             if (this.insertJob.SalaryTypeId === 2) {
               this.appService.currentMinRate.subscribe(x => this.insertJob.MinimumSalary = x.toString());
               this.appService.currentMaxRate.subscribe(x => this.insertJob.MaximumSalary = x.toString());
             } else if (this.insertJob.SalaryTypeId === 1) {
               this.appService.currentMinHourlyRate.subscribe(x => this.insertJob.MinimumSalary = x.toString());
               this.appService.currentMaxHourlyRate.subscribe(x => this.insertJob.MaximumSalary = x.toString());
               // this.insertJob.ContractExtended = true;
             }
             // this.insertJob.MinimumSalary = this.insertJob.SalaryTypeId==1?this.appService.currentMinRate.subscribe(x => this.insertJob.MinimumSalary = x) :this.appService.currentMinHourlyRate.subscribe(x => this.insertJob.MinimumSalary= x);
             // this.insertJob.MaximumSalary =  this.insertJob.SalaryTypeId==1?this.appService.currentMaxRate.subscribe(x => this.maxAnnualRate = x):    this.appService.currentMaxHourlyRate.subscribe(x => this.maxHourRate = x);
             this.appService.currentDraft.subscribe(x => this.insertJob.IsDrafted = x);
             // this.insertJob.StepNumber = 4;
             } else {
             this.insertJob.EmploymentTypeId = 1;
             this.insertJob.SalaryTypeId = 1;
             this.insertJob.MinimumSalary = '1';
             this.insertJob.MaximumSalary = '200';
             this.insertJob.IsDrafted = true;
           }
             this.insertJob.StepNumber = step;
             if (this.appService.stepNumber.value <= step) {
               this.appService.updateStepNumber(step);
               }
             if (this.appService.isDrafted.value != null) {
               this.appService.updateJobDraft(this.insertJob.IsDrafted);
               }
               if(this.JobIds&&this.JobIds.length>0)
               {
                 var res = new Promise<void>((resolve, reject) => {
                   this.JobIds.forEach((value, index, array) => {
               //  let requests =  this.JobIds.map((item) => {
                     this.insertJob.JobId = value;
                     this.appService.postjob(this.insertJob).subscribe(data => {
                   if (data) {
                     // this.insertJob.JobId = data;
                     if (exit === 0) {
                       this.router.navigate([localStorage.getItem('EditViewJob') != null ?
                       this.ViewJobdetails(this.insertJob.JobId) : '/app-manage-jobs/app-manage-load-joblist/1']);
                       this.appService.resetJob();
                     } else {
                     if (this.complete > 0) {
                       this.steps.step3toggleClass(this.complete);
                     } else {
                       this.steps.step3toggleClass(2);
                     }
             
                     //this.router.navigate(['/app-createajob/app-steps-step4']);
                   }
                   }
                 });
                 if (index === array.length -1) 
                 
                 resolve();
                });
                 });
           
                 res.then(() => {
                     this.router.navigate(['/app-createajob/app-steps-step3']);    
                 });
               }
                if(this.JobIds.length==0 || this.JobIds == undefined)
               {
                 this.appService.postjob(this.insertJob).subscribe(data => {
                   if (data) {
                     // this.insertJob.JobId = data;
                     if (exit === 0) {
                       this.router.navigate([localStorage.getItem('EditViewJob') != null ?
                       this.ViewJobdetails(this.insertJob.JobId) : '/app-manage-jobs/app-manage-load-joblist/1']);
                       this.appService.resetJob();
                     } else {
                     if (this.complete > 0) {
                       this.steps.step3toggleClass(this.complete);
                     } else {
                       this.steps.step3toggleClass(2);
                     }
                     this.router.navigate(['/app-createajob/app-steps-step3']);
                   }
                 }
                 });
               }
              
          
           } else {
             this.toastr.error('Please Add/Select Skills!', 'Oops!');
             setTimeout(() => {
                 this.toastr.dismissToast;
             }, 3000);
             window.scrollTo(300, 300);
             return false;
           }
            }
          });
    }
    else
    {
      if (
        // this.openings.noOfOpenings > 0 && this.locations.prfLoc.CityId > 0
       this.jobSkills.primaryjobskills.concat(this.jobSkills.secondaryjobskills).length > 0) {
     this.insertJob.CustomerId = this.customerId;
     this.insertJob.UserId = this.userId;
     this.insertJob.JobPositionId = this.jobPositionId;
     if(this.disable == "true")
     {  
       this.insertJob.JobId = 0;
     }
     else 
     {
      const res = localStorage.getItem('jobId');
      // if (res != null) {
      this.insertJob.JobId = res != null ? parseInt(res, 10) : 0;
     }
     this.insertJob.HideSalary = this.appService.HideSalary;
     this.insertJob.BonusOffered = this.appService.BonusOffered;
     this.insertJob.JobCategoryId = this.jobCategory; // this.appService.jobcategory.value.JobCategoryId;
     this.insertJob.JobTitle = this.jobTitle; // this.appService.jobtitle.value;
     this.insertJob.MinExperienceId = Math.round(this.jobMinExp); // this.appService.minExperience.value;
     this.insertJob.MaxExperienceId = Math.round(this.jobMaxExp);  // this.appService.maxExperience.value;
     this.insertJob.XmlRoleId =  this.appService.addedresponsibilities; // this.jobResponsibility ;
     this.insertJob.CompleteDescription = this.jobHasDescription; // this.appService.hasDescription.value;
     this.insertJob.JobDescription = this.jobDescription; // this.appService.description.value;
     this.insertJob.XmlSkills = this.appService.primaryjobskills.concat( this.appService.secondaryjobskills);
     this.insertJob.ClientId = this.client.ClientId;
     this.insertJob.XmlKeyResponses = this.qualification.addkeyList;
   
 
     this.insertJob.SaveAsTemplate = 0;
     this.insertJob.ClientName = this.insertJob.ClientId > 0 ? '' : this.client.ClientName ;
     // this.insertJob.ClientId = parseInt(localStorage.getItem('clientId'), 10);
     // this.insertJob.ClientName = localStorage.getItem('clientName');
     this.insertJob.XmlDepartment =  this.appService.addeddepartments; // this.pjDepartments; //this.departments;
    
     // this.insertJob.DepartmentId = this.appService.addeddepartments;
 
 
     //  this.jobSkillsPrimary.concat(this.jobSkillsSecondary);
 
     // step2
     // moved to step2
     // this.insertJob.NumberOfVacancies = this.openings.noOfOpenings;
     // this.insertJob.PreferredLocationId = this.locations.prfLoc.CityId.toString();
     this.insertJob.XmlSkills = this.jobSkills.primaryjobskills.concat(this.jobSkills.secondaryjobskills);
     this.insertJob.XmlRoleId = this.jobResponsibility.roleIdList;
     //debugger
     // end moved to step2
     this.insertJob.XmlQualifications = this.qualification.addqualificationList;
     
     if(this.domain != undefined)
     {
       this.insertJob.XmlDomains = this.domain.addDomainList;
     }
      
     this.insertJob.XmlPersonType = this.personalityType.checkpersonType;
      if(this.immi.selectedItems.length>0)
     {
       this.immi.AddStatus();
     }  
     // this.insertJob.IsDrafted = true;
     // this.insertJob.StepNumber = 2;
     // this.insertJob.EmploymentTypeId = 1;
     //  this.insertJob.SalaryTypeId = 1;
     // this.insertJob.MinimumSalary = this.salaryMinRate.toString();
     // this.insertJob.MaximumSalary = this.salaryMaxRate.toString();
 
     if (localStorage.getItem('EditMode') != null && this.insertJob.JobId > 0) {
       this.appService.currentEmploymentType.subscribe((data) => {
         this.insertJob.EmploymentTypeId = data.EmploymentTypeId; // And he have data here too!
       });
       this.appService.currentSalaryTYpe.subscribe((data) => {
         this.insertJob.SalaryTypeId = data.SalaryTypeId; // And he have data here too!
       });
       if (this.insertJob.EmploymentTypeId === 2) {
         this.appService.currentContractExtension.subscribe((data) => {
           this.insertJob.WorkAuthorizationId = this.appService.Workauthorize.toString(); // And he have data here too!
         });
         this.appService.currentContractDuration.subscribe((data) => {
           this.insertJob.ContractDuration = data; // And he have data here too!
         });
       }
     // this.insertJob.EmploymentTypeId = 1;
     // this.insertJob.SalaryTypeId = this.insertJob.EmploymentTypeId;
     if (this.insertJob.SalaryTypeId === 2) {
       this.appService.currentMinRate.subscribe(x => this.insertJob.MinimumSalary = x.toString());
       this.appService.currentMaxRate.subscribe(x => this.insertJob.MaximumSalary = x.toString());
     } else if (this.insertJob.SalaryTypeId === 1) {
       this.appService.currentMinHourlyRate.subscribe(x => this.insertJob.MinimumSalary = x.toString());
       this.appService.currentMaxHourlyRate.subscribe(x => this.insertJob.MaximumSalary = x.toString());
       // this.insertJob.ContractExtended = true;
     }
     // this.insertJob.MinimumSalary = this.insertJob.SalaryTypeId==1?this.appService.currentMinRate.subscribe(x => this.insertJob.MinimumSalary = x) :this.appService.currentMinHourlyRate.subscribe(x => this.insertJob.MinimumSalary= x);
     // this.insertJob.MaximumSalary =  this.insertJob.SalaryTypeId==1?this.appService.currentMaxRate.subscribe(x => this.maxAnnualRate = x):    this.appService.currentMaxHourlyRate.subscribe(x => this.maxHourRate = x);
     this.appService.currentDraft.subscribe(x => this.insertJob.IsDrafted = x);
     // this.insertJob.StepNumber = 4;
     } else {
     this.insertJob.EmploymentTypeId = 1;
     this.insertJob.SalaryTypeId = 1;
     this.insertJob.MinimumSalary = '1';
     this.insertJob.MaximumSalary = '200';
     this.insertJob.IsDrafted = true;
   }
     this.insertJob.StepNumber = step;
     if (this.appService.stepNumber.value <= step) {
       this.appService.updateStepNumber(step);
       }
     if (this.appService.isDrafted.value != null) {
       this.appService.updateJobDraft(this.insertJob.IsDrafted);
       }
       if(this.JobIds&&this.JobIds.length>0)
       {
         var res = new Promise<void>((resolve, reject) => {
           this.JobIds.forEach((value, index, array) => {
       //  let requests =  this.JobIds.map((item) => {
             this.insertJob.JobId = value;
             this.appService.postjob(this.insertJob).subscribe(data => {
           if (data) {
             // this.insertJob.JobId = data;
             if (exit === 0) {
               this.router.navigate([localStorage.getItem('EditViewJob') != null ?
               this.ViewJobdetails(this.insertJob.JobId) : '/app-manage-jobs/app-manage-load-joblist/1']);
               this.appService.resetJob();
             } else {
             if (this.complete > 0) {
               this.steps.step3toggleClass(this.complete);
             } else {
               this.steps.step3toggleClass(2);
             }
     
             //this.router.navigate(['/app-createajob/app-steps-step4']);
           }
           }
         });
         if (index === array.length -1) 
         
         resolve();
        });
         });
   
         res.then(() => {
             this.router.navigate(['/app-createajob/app-steps-step3']);    
         });
       }
        if(this.JobIds.length==0 || this.JobIds == undefined)
       {
         this.appService.postjob(this.insertJob).subscribe(data => {
           if (data) {
             // this.insertJob.JobId = data;
             if (exit === 0) {
               this.router.navigate([localStorage.getItem('EditViewJob') != null ?
               this.ViewJobdetails(this.insertJob.JobId) : '/app-manage-jobs/app-manage-load-joblist/1']);
               this.appService.resetJob();
             } else {
             if (this.complete > 0) {
               this.steps.step3toggleClass(this.complete);
             } else {
               this.steps.step3toggleClass(2);
             }
             this.router.navigate(['/app-createajob/app-steps-step3']);
           }
         }
         });
       }
      
  
   } else {
     this.toastr.error('Please Add/Select Skills!', 'Oops!');
     setTimeout(() => {
         this.toastr.dismissToast;
     }, 3000);
     window.scrollTo(300, 300);
     return false;
   }
    }

   
  }
  ViewJobdetails(jobId) {
    sessionStorage.setItem('jobId', JSON.stringify(jobId));
    this.router.navigateByUrl('app-view-jobdetails');
  }
  backtoStep1() {
    if (this.complete > 0) {
      this.steps.step1toggleClass(this.complete);
    } else {
    this.steps.step1toggleClass(0);
    }
  }
  asyncFunction (item, cb) {
    setTimeout(() => {      
      console.log('done with', item);
      cb();
    }, 1000);
  }
  ngAfterViewChecked() {
    this.appService.currentDraft.subscribe(x => this.isDrafted = x);
    this.disable1= (localStorage.getItem('EditMode') != null && this.isDrafted === false) ? true : false;      
  }


}
