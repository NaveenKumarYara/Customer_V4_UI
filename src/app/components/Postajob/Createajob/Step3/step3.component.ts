import { Component, OnInit, Inject, ViewChild,HostListener, ViewContainerRef ,AfterViewChecked} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ContractDurationComponent } from './contractduration.component';
import { ContractExtensionComponent } from './contractextension.component';
import { EmploymentTypeComponent } from './employmenttype.component';
import { TeammembersComponent } from './teammembers.component';
import { ReportingManagerComponent } from './reportingmanager.component';
import { InterviewTypeComponent } from './interviewtype.component';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import { InsertJob, PjSkill, PjRole, PjDisc, PjDomain, PjEducationDetails, PjTechnicalTeam, PjJobAccessTo, PjDepartments } from '../../models/jobPostInfo';
import { AppService } from '../../../../app.service';
// import { Step2Component } from '../Step2/step2.component';
// import { JobcategoryComponent } from '../Step1/Jobcategory.component';
// import { JobdetailsComponent } from '../Step1/Jobdetails.component';
// import { JobprofileComponent } from '../Step1/Jobprofile.component';
// import { JobResponsibilitiesComponent } from '../Step2/Jobresponsibilities.component';
// import { JobskillsetComponent } from '../Step2/Jobskillset.component';
// import { DomainExpertiseComponent } from '../Step2/domainexpertise.component';
// import { LocationwiseJobsComponent } from '../Step1/locationwisejobs.component';
// import { NoofopeningsComponent } from '../Step1/noofopenings.component';
// import { PersonalityTypeComponent } from '../Step2/PersonalityType.component';
// import { QualificationsComponent } from '../Step2/qualifications.component';
import { StepsComponent } from '../steps.component';
import { UploadvideoprofileComponent } from './uploadvideoprofile.component';
import { MatDialog } from '@angular/material';
import { EmploymentType } from '../../../../../models/employmenttype.model';
import { SalarysliderComponent } from './salaryslider.component';
import { recriuterComponent } from './recriuter.component';
import { Options, LabelType  } from '@angular-slider/ngx-slider';
import { MatchingDetails } from '../../../jobdetails/models/matchingDetails';
import * as introJs from 'intro.js/intro.js';
import { OnDestroy } from '@angular/core/public_api';
import { ClientsComponent } from '../Step1/clients.component';
declare var $: any;
declare var jQuery: any;
// import { SalarysliderComponent } from './salaryslider.component';

@Component({
  selector: 'app-steps-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css']
})
export class Step3Component implements OnInit,AfterViewChecked,OnDestroy {
  @ViewChild(ClientsComponent) client: ClientsComponent;
  // @ViewChild(Step2Component) step2: Step2Component;
  // @ViewChild(JobcategoryComponent) jobCategory: JobcategoryComponent;
  // @ViewChild(JobdetailsComponent) jobDetail: JobdetailsComponent;
  // @ViewChild(JobprofileComponent) jobProfile: JobprofileComponent;
  // @ViewChild(JobResponsibilitiesComponent) jobResponsibility: JobResponsibilitiesComponent;
  // @ViewChild(JobskillsetComponent) jobSkills: JobskillsetComponent;
  minValue: number = 60;
  maxValue: number = 100;
  JobFitval: number = 40;
  introJS = introJs();
  options: Options = {
    ceil: 100,
    floor: 0,
    step: 5,
    showSelectionBar: true,
    showTicks: true
  };
  TotalExperience:boolean=true;
  Title:boolean=true;
  Domain:boolean=true;
  disable1:any;
  disableLoc = false;
  isDrafted: boolean;
  jobCategory: number;
  jobMinExp: number;
  jobMaxExp: number;
  jobTitle: string;
  jobDescription: string;
  jobPositionId: string;
  jobHasDescription: boolean;
  jobResponsibility: any;
  jobSkillsPrimary: any;
  jobSkillsSecondary: any;
  JobIds=[];
  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    event.returnValue = false;
}
  // @ViewChild(DomainExpertiseComponent) domain: DomainExpertiseComponent;
  // @ViewChild(LocationwiseJobsComponent) locations: LocationwiseJobsComponent;
  // @ViewChild(NoofopeningsComponent) openings: NoofopeningsComponent;
  // @ViewChild(PersonalityTypeComponent) personalityType: PersonalityTypeComponent;
  // @ViewChild(QualificationsComponent) qualification: QualificationsComponent;
  domain: any;
  locations: any;
  openings: any;
  scroll:boolean=false;
  personalityType: any;
  qualification: any;
  match = new MatchingWeightage();
  @ViewChild(ContractDurationComponent) contractDuration: ContractDurationComponent;
  @ViewChild(ContractExtensionComponent) contractExtension: ContractExtensionComponent;
  @ViewChild(EmploymentTypeComponent) empType: EmploymentTypeComponent;
  @ViewChild(InterviewTypeComponent) intwType: InterviewTypeComponent;
  @ViewChild(ReportingManagerComponent) reporting: ReportingManagerComponent;
  @ViewChild(recriuterComponent) recriuter: recriuterComponent;
  @ViewChild(TeammembersComponent) team: TeammembersComponent;
  @ViewChild(SalarysliderComponent) salSlider: SalarysliderComponent;
  // @ViewChild(SalarysliderComponent) salary: SalarysliderComponent;
  formData: any;
  customer: any;
  jobIdExists: any;
  userId: any;
  customerId: any;
  complete: any;
  // joblist = new InsertJob();
  insertJob = new InsertJob();
  departments: any;
  //client: any;
  disable:any;
  employmentType: EmploymentType;
  show = false;
  pjDepartments:  PjDepartments[] = [];
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
  constructor(private route: ActivatedRoute, private toastr: ToastsManager, private _vcr: ViewContainerRef,
    private router: Router, private appService: AppService, private steps: StepsComponent, private dialog: MatDialog) {
      this.customer = JSON.parse(sessionStorage.getItem('userData'));
      this.complete = JSON.parse(localStorage.getItem('completed'));
      this.disable =  localStorage.getItem('Item');
      this.customerId = this.customer.CustomerId;
      this.userId = this.customer.UserId;
      this.jobIdExists = localStorage.getItem('hide');
      this.toastr.setRootViewContainerRef(_vcr);
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
    // this.appService.addedresponsibilitiesChanged.subscribe((data) => {
    //   this.jobResponsibility = data; // And he have data here too!
    // });
    this.appService.currentDescriptionChecked.subscribe((data) => {
      this.jobHasDescription = data; // And he have data here too!
    });
    this.appService.currentDescription.subscribe((data) => {
      this.jobDescription = data; // And he have data here too!
    });
    this.appService.currentjobPosition.subscribe((data) => {
      this.jobPositionId = data; // And he have data here too!
    });
    // this.appService.jobprimaryskillsChanged.subscribe((data) => {
    //   this.jobSkillsPrimary = data; // And he have data here too!
    // });
    // this.appService.jobsecondaryskillsChanged.subscribe((data) => {
    //   this.jobSkillsSecondary = data; // And he have data here too!
    // });

    // step2:

    // this.appService.adddomainChanged.subscribe((data) => {
    //   this.domain = data; // And he have data here too!
    // });
    this.appService.currentlocation.subscribe((data) => {
      this.locations = data; // And he have data here too!
    });
    this.appService.currentOpenings.subscribe((data) => {
      this.openings = data; // And he have data here too!
    });
    // this.appService.currentClient.subscribe((data) => {
    //   this.client = data; // And he have data here too!
    // });
    this.appService.addeddepartmentsChanged.subscribe((data) => {
      this.departments = data; // And he have data here too!
    });
    // this.appService.personTypeSingleChanged.subscribe((data) => {
    //   this.personalityType = data; // And he have data here too!
    // });
    // this.appService.addqualificationsChanged.subscribe((data) => {
    //   this.qualification = data; // And he have data here too!
    // });


    // this.appService.currentDescription.subscribe((data) => {
    //   this.jobDescription = data; // And he have data here too!
    // });
    // this.appService.jobprimaryskillsChanged.subscribe((data) => {
    //   this.jobSkillsPrimary = data; // And he have data here too!
    // });
    // this.appService.jobsecondaryskillsChanged.subscribe((data) => {
    //   this.jobSkillsSecondary = data; // And he have data here too!
    // });
  }

  onValueChange(event: any)
  {
    this.minValue = event;
    this.JobFitval = this.maxValue-this.minValue;
  }

  start()
  {
    this.introJS.start();
  }

  Close()
  {
    this.introJS.exit();
  }

  ngOnDestroy() {
    this.Close();
  }

  OpenScheduleInterviewDialog() {
    this.Close();
    // var candidateUserId = $("#candidateUserId").val();
    // var candidateId = +candidateUserId;
    const scheduleIntwdialogRef = this.dialog.open(UploadvideoprofileComponent,
      {
        width: '850px',
        position: {right : '0px'},
        height : '750px',
        panelClass:'videoSizzlePop',
        data: {
          // jobResponseId: jobResponseId,
          jobId:  parseInt(localStorage.getItem('jobId'), 10),
         // userId: userId
         // status : this.statusid
        }
      }
    );
    scheduleIntwdialogRef.afterClosed().subscribe(result => {
     // this.jobDetails.populateJobsStaticInfo(this.jobid);
      // this.myEvent.emit(null);
      console.log('Chatbox Dialog result: ${result}');
    });
  }
  ngOnInit() {
    // this.appService.currentEmploymentType.subscribe(x => this.employmentType = x);
    this.changeEmploymentType();
    this.JobIds = this.appService.JobIds;
    this.JobFitval = this.maxValue-this.minValue;    
    let JId = localStorage.getItem('JobId');
    if(JId != null)
    {
      this.GetJobMatching(JId); 
    }
   
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

  changeEmploymentType() {
    this.appService.currentEmploymentType.subscribe(x => this.employmentType = x);
    if (this.employmentType.EmploymentTypeId === 2) {
      this.show = true;
    } else {
      this.show = false;
    }
  }

  SaveMatching(JobId)
  {
    this.JobFitval = Math.round(this.maxValue - this.minValue)
    this.match.jobFit = this.JobFitval;
    this.match.skillFit = this.minValue;
    this.match.domain = this.Domain;
    this.match.role = this.Title;
    this.match.totalExp = this.TotalExperience;
    this.match.jobId=JobId;
    this.match.userId = this.customer.UserId;
    this.appService.postjobMatching(this.match).subscribe(data => {
      if (data>=0) {
            this.match = new MatchingWeightage();
            this.GetJobMatching(JobId);
      }
      })

  }

  GetJobMatching(JId)
  {
    this.appService.GetJobMatching(JId).subscribe(data => {
      if (data != "No records found") {
         this.minValue = data.SkillFit;
         this.JobFitval = data.JobFit;
         this.Domain  = data.JobDomain;
         this.TotalExperience = data.JobTotalExp;
         this.Title = data.JobRole;

      }
      })
  }

  checkTotalExperience(event: any) {
    this.TotalExperience = event;
  }

  checkTitle(event: any) {
    this.Title = event;
  }

  checkDomain(event: any) {
    this.Domain = event;
  }

  postJob(step, exit?) {
    // this.appService.updateStepNumber(step);
//     this.insertJob.JobCategoryId = this.appService.jobcategory.value.JobCategoryId; // this.appService.jobcategory.JobCategoryId;
//     this.insertJob.CustomerId = 1;
//     this.insertJob.UserId = 5;
//     this.insertJob.JobPositionId = '';
// //    this.insertJob.JobId = 0;
//     this.insertJob.JobTitle = this.appService.jobtitle.value;
//     // this.insertJob.MinExperienceId = this.step1.jobDetail.minExperience;
//     // this.insertJob.MaxExperienceId = this.step1.jobDetail.maxExperience;
//     // this.insertJob.CompleteDescription = this.step1.jobProfile.hasCompleteDescription;
//     // this.insertJob.JobDescription = this.step1.jobProfile.jobDescription;
//      this.insertJob.XmlSkills = this.appService.primaryjobskills.concat(this.appService.secondaryjobskills);
//     // this.insertJob.XmlRoleId = this.step1.jobResponsibility.roleIdList;

//     const res = localStorage.getItem('jobId');
//     this.insertJob.JobId = parseInt(res, 10);
//     this.insertJob.SalaryTypeId = 1;
//     this.insertJob.MinimumSalary = '1';
//     this.insertJob.MaximumSalary = '200';
//     // step2
//     // this.insertJob.NumberOfVacancies = this.step2.openings.noOfOpenings;
//     // this.insertJob.PreferredLocationId = this.step2.locations.location;
//     // this.insertJob.XmlQualifications = this.step2.qualification.addqualificationList;
//     //  this.insertJob.XmlDomains = this.step2.domain.addDomainList;
//     // this.insertJob.XmlPersonType = this.step2.personalityType.checkpersonType;

    // step1
    this.insertJob.CustomerId = this.customerId;
    this.insertJob.UserId = this.userId;
    this.insertJob.JobPositionId = this.jobPositionId;
    if(this.disable == "true")
    {
      this.insertJob.JobId =  0;
    }
    else 
    {
     const res = localStorage.getItem('jobId');
     // if (res != null) {
     this.insertJob.JobId = res != null ? parseInt(res, 10) : 0;
    }

  //  this.insertJob.JobCategoryId = this.appService.jobcategory.value.JobCategoryId;
  //   this.insertJob.JobTitle = this.appService.jobtitle.value;
  //   this.insertJob.MinExperienceId = this.appService.minExperience.value;
  //   this.insertJob.MaxExperienceId = this.appService.maxExperience.value;
  //   this.insertJob.XmlRoleId = this.appService.addedresponsibilities;
  //   this.insertJob.CompleteDescription = this.appService.hasDescription.value;
  //   this.insertJob.JobDescription = this.appService.description.value;
  //   this.insertJob.XmlSkills = this.appService.primaryjobskills.concat( this.appService.secondaryjobskills);
  this.insertJob.HideSalary = this.appService.HideSalary;
  
  this.insertJob.ClientId = this.appService.clientModel.value.ClientId;

  if(this.appService.clientModel.value.ClientId>0)
  {
    this.insertJob.ClientName =   this.appService.clientModel.value.ClientName ;
  }
else
{
  this.insertJob.ClientName =   ' ';
}
    this.insertJob.BonusOffered = this.appService.BonusOffered;
    this.insertJob.JobCategoryId = this.jobCategory; // this.appService.jobcategory.value.JobCategoryId;
    this.insertJob.JobTitle = this.jobTitle; // this.appService.jobtitle.value;
    this.insertJob.MinExperienceId = Math.round(this.jobMinExp); // this.appService.minExperience.value;
    this.insertJob.MaxExperienceId = Math.round(this.jobMaxExp);  // this.appService.maxExperience.value;
    this.insertJob.XmlRoleId =  this.appService.addedresponsibilities; // this.jobResponsibility ;
    this.insertJob.CompleteDescription = this.jobHasDescription; // this.appService.hasDescription.value;
    this.insertJob.JobDescription = this.jobDescription; // this.appService.description.value;
    this.insertJob.XmlSkills = this.appService.primaryjobskills.concat( this.appService.secondaryjobskills);
     // this.jobSkillsPrimary.concat(this.jobSkillsSecondary);
    //  this.insertJob.ClientId = this.client.ClientId;
    //  this.insertJob.ClientName = this.insertJob.ClientId > 0 ? '' : this.client.ClientName;
    // this.insertJob.ClientId = parseInt(localStorage.getItem('clientId'), 10);
    // this.insertJob.ClientName = localStorage.getItem('clientName');
     this.insertJob.XmlDepartment = this.appService.addeddepartments;  //  this.pjDepartments; // this.departments;
     this.insertJob.SaveAsTemplate = 0;
    // step2

    this.insertJob.NumberOfVacancies = this.openings; // this.appService.noofOpenings.value;
    this.insertJob.PreferredLocationId = this.locations ; // this.appService.location.value.locationId.toString();
    this.insertJob.XmlQualifications =  this.appService.addqualifications; // this.qualification;
    this.insertJob.XmlDomains = this.appService.adddomain; // this.domain;
    this.insertJob.XmlPersonType =  this.appService.personTypeSingle; // this.personalityType;


    // step3
    // this.insertJob.EmploymentTypeId = this.empType.employmentType.EmploymentTypeId;
    // this.insertJob.SalaryTypeId = this.salSlider.salaryTypeSelected.SalaryTypeId;
    // localStorage.setItem('SalaryTypeId', this.salSlider.salaryTypeSelected.SalaryTypeId.toString());
    // if (this.insertJob.EmploymentTypeId === 2) {
    //   this.insertJob.ContractExtended = true;
    //   this.insertJob.ContractDuration = this.contractDuration.contractDuration;
    //   this.insertJob.WorkAuthorizationId = this.contractExtension.contractExtension.WorkAuthorizationId;
    // }
    // this.insertJob.MatchingCrieterias = this.appService.skillPostData;
    // this.insertJob.RemoteWorkId= this.appService.RemoteWork;
    // this.insertJob.MinimumSalary = this.salary.minAnnualRate.toString();
    // this.insertJob.MaximumSalary = this.salary.minAnnualRate.toString();

    // if (this.insertJob.EmploymentTypeId === 1) {
    //   this.appService.currentMinRate.subscribe(x => this.insertJob.MinimumSalary = x.toString());
    //   this.appService.currentMaxRate.subscribe(x => this.insertJob.MaximumSalary = x.toString());
    // } else  if (this.insertJob.EmploymentTypeId === 2) {
    //   this.appService.currentMinHourlyRate.subscribe(x => this.insertJob.MinimumSalary = x.toString());
    //   this.appService.currentMaxHourlyRate.subscribe(x => this.insertJob.MaximumSalary = x.toString());
    // this.insertJob.ContractExtended = true;
    // this.insertJob.ContractDuration = this.contractDuration.contractDuration; }


    // if (localStorage.getItem('EditMode') != null && this.insertJob.JobId > 0) {
      // this.appService.currentEmploymentType.subscribe((data) => {
      //   this.insertJob.EmploymentTypeId = data.EmploymentTypeId; // And he have data here too!
      // });
    // this.insertJob.EmploymentTypeId = 1;
   // this.insertJob.SalaryTypeId = this.insertJob.EmploymentTypeId;
    if (this.insertJob.SalaryTypeId === 2) {
      this.appService.currentMinRate.subscribe(x => this.insertJob.MinimumSalary = x.toString());
      this.appService.currentMaxRate.subscribe(x => this.insertJob.MaximumSalary = x.toString());
    } else if (this.insertJob.SalaryTypeId === 1) {
      this.appService.currentMinHourlyRate.subscribe(x => this.insertJob.MinimumSalary = x.toString());
      this.appService.currentMaxHourlyRate.subscribe(x => this.insertJob.MaximumSalary = x.toString());
  }
    // this.insertJob.MinimumSalary = this.insertJob.SalaryTypeId==1?this.appService.currentMinRate.subscribe(x => this.insertJob.MinimumSalary = x) :this.appService.currentMinHourlyRate.subscribe(x => this.insertJob.MinimumSalary= x);
    // this.insertJob.MaximumSalary =  this.insertJob.SalaryTypeId==1?this.appService.currentMaxRate.subscribe(x => this.maxAnnualRate = x):    this.appService.currentMaxHourlyRate.subscribe(x => this.maxHourRate = x);
    if (localStorage.getItem('EditMode') != null && this.insertJob.JobId > 0) {
      this.appService.currentDraft.subscribe(x => this.insertJob.IsDrafted = x);
   // this.insertJob.StepNumber = 4;
    } else {
        this.insertJob.IsDrafted = true;
    }
    this.insertJob.StepNumber = step;
    if (this.appService.stepNumber.value <= step) {
      this.appService.updateStepNumber(step);
      }
      if (this.appService.isDrafted.value != null) {
        this.appService.updateJobDraft(this.insertJob.IsDrafted);
        }
   // }
  //    else {
  //   this.insertJob.EmploymentTypeId = 1;
  //   this.insertJob.SalaryTypeId = 1;
  //   this.insertJob.MinimumSalary = '1';
  //   this.insertJob.MaximumSalary = '200';
  //   this.insertJob.IsDrafted = true;
  //   this.insertJob.StepNumber = step;
  // }


    // this.insertJob.IsDrafted = true;
    // this.insertJob.StepNumber = step;


    this.insertJob.HiringProcessId = this.intwType.interviewType.InterviewTypeId;
    let val =this.appService.rList!=undefined?this.appService.rList:this.customer.UserId;
    this.insertJob.HiringManagerId = Number(val);
    //this.insertJob.XmlTechnicalTeam
    // //this.appService.reportingManager.value.UserId; // parseInt(this.reporting.selectedInput[0].value, 10);
     this.insertJob.XmlTechnicalTeam = this.appService.teammembers;
    if(this.JobIds&&this.JobIds.length>0)
    {
      var res = new Promise<void>((resolve, reject) => {
        this.JobIds.forEach((value, index, array) => {
    //  let requests =  this.JobIds.map((item) => {
          this.insertJob.JobId = value;
          this.SaveMatching(this.insertJob.JobId);
      this.appService.postjob(this.insertJob).subscribe(data => {
        if (data) {
          // this.insertJob.JobId = data;
          if (exit === 0) {
            this.router.navigate([localStorage.getItem('EditViewJob') != null ?
            this.ViewJobdetails(this.insertJob.JobId) : '/app-manage-jobs/app-manage-load-joblist/1']);
            this.appService.resetJob();
          } else {
          if (this.complete > 0) {
            this.steps.step4toggleClass(this.complete);
          } else {
            this.steps.step4toggleClass(3);
          }
  
          //this.router.navigate(['/app-createajob/app-steps-step4']);
        }
        }
      });
      if (index === array.length -1) resolve();
     });
      });

      res.then(() => {
          this.router.navigate(['/app-createajob/app-steps-step4']);  
      });
    }
     if(this.JobIds.length==0 || this.JobIds == undefined)
    {
      this.SaveMatching(this.insertJob.JobId);
      this.appService.postjob(this.insertJob).subscribe(data => {
        if (data) {
          // this.insertJob.JobId = data;
          if (exit === 0) {
            this.router.navigate([localStorage.getItem('EditViewJob') != null ?
            this.ViewJobdetails(this.insertJob.JobId) : '/app-manage-jobs/app-manage-load-joblist/1']);
            this.appService.resetJob();
          } else {
          if (this.complete > 0) {
            this.steps.step4toggleClass(this.complete);
          } else {
            this.steps.step4toggleClass(3);
          }
  
          this.router.navigate(['/app-createajob/app-steps-step4']);
        }
        }
      });
    }
    
  }

  scrolling=(s)=>{
    let sc = s.target.scrollingElement.scrollTop;
    console.log();
    if(sc >=100){this.scroll=true}
    else{this.scroll=false}
  }

  ngAfterViewChecked() {
    this.appService.currentDraft.subscribe(x => this.isDrafted = x);
    this.disable1= (localStorage.getItem('EditMode') != null && this.isDrafted === false) ? true : false;   
     
  }

  ViewJobdetails(jobId) {
    sessionStorage.setItem('jobId', JSON.stringify(jobId));
    this.router.navigateByUrl('app-view-jobdetails');
  }

  backtoStep2() {
    if (this.complete > 0) {
      this.steps.step2toggleClass(this.complete);
    } else {
    this.steps.step2toggleClass(1);
    }
  }

  asyncFunction (item, cb) {
    setTimeout(() => {      
      console.log('done with', item);
      cb();
    }, 3000);
  }

}


export class MatchingWeightage {
  jobId: number | null;
  userId: number | null;
  jobFit: number | null;
  skillFit: number | null;
  domain: boolean | null;
  totalExp: boolean | null;
  role: boolean | null;
}