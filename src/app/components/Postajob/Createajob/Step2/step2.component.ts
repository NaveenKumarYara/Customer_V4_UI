import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DomainExpertiseComponent } from './domainexpertise.component';
import { LocationwiseJobsComponent } from './locationwisejobs.component';
import { PersonalityTypeComponent } from './PersonalityType.component';
import { QualificationsComponent } from './qualifications.component';
import { AlertService } from '../../../../shared/alerts/alerts.service';
import { NoofopeningsComponent } from './noofopenings.component';
import { InsertJob, PjSkill, PjRole, PjDisc, PjDomain, PjEducationDetails, PjTechnicalTeam, PjJobAccessTo } from '../../models/jobPostInfo';
import { AppService } from '../../../../app.service';
import { Step1Component } from '../Step1/step1.component';
import { JobcategoryComponent } from '../Step1/Jobcategory.component';
import { JobdetailsComponent } from '../Step1/Jobdetails.component';
import { JobprofileComponent } from '../Step1/Jobprofile.component';
import { JobResponsibilitiesComponent } from '../Step1/Jobresponsibilities.component';
import { JobskillsetComponent } from '../Step1/Jobskillset.component';
import { StepsComponent } from '../steps.component';

@Component({
  selector: 'app-steps-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2Component implements OnInit {
  // @ViewChild(Step1Component) step1: Step1Component;
  // @ViewChild(JobcategoryComponent) jobCategory: JobcategoryComponent;
  // @ViewChild(JobdetailsComponent) jobDetail: JobdetailsComponent;
  // @ViewChild(JobprofileComponent) jobProfile: JobprofileComponent;
  // @ViewChild(JobResponsibilitiesComponent) jobResponsibility: JobResponsibilitiesComponent;
  // @ViewChild(JobskillsetComponent) jobSkills: JobskillsetComponent;

  jobCategory: number;
  jobMinExp: number;
  jobMaxExp: number;
  jobTitle: string;
  salaryMinRate: number;
  salaryMaxRate: number;
  jobDescription: string;
  jobHasDescription: boolean;
  jobResponsibility: any;
  jobSkillsPrimary: any;
  jobSkillsSecondary: any;
  customer: any;
  userId: any;
  customerId: any;
  @ViewChild(DomainExpertiseComponent) domain: DomainExpertiseComponent;
  @ViewChild(LocationwiseJobsComponent) locations: LocationwiseJobsComponent;
  @ViewChild(NoofopeningsComponent) openings: NoofopeningsComponent;
  @ViewChild(PersonalityTypeComponent) personalityType: PersonalityTypeComponent;
  @ViewChild(QualificationsComponent) qualification: QualificationsComponent;
  // formData: any;
  // joblist = new InsertJob();
  insertJob = new InsertJob();
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
  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService, private steps: StepsComponent,private alertService : AlertService) {
      this.customer = JSON.parse(sessionStorage.getItem('userData'));
      this.customerId = this.customer.CustomerId;
      this.userId = this.customer.UserId;
    this.appService.currentcategorytitle.subscribe((data) => {
        this.jobCategory = data.JobCategoryId; // And he have data here too!
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
      this.jobResponsibility = data; // And he have data here too!
    });
    this.appService.currentDescriptionChecked.subscribe((data) => {
      this.jobHasDescription = data; // And he have data here too!
    });
    this.appService.currentDescription.subscribe((data) => {
      this.jobDescription = data; // And he have data here too!
    });
    this.appService.jobprimaryskillsChanged.subscribe((data) => {
      this.jobSkillsPrimary = data; // And he have data here too!
    });
    this.appService.jobsecondaryskillsChanged.subscribe((data) => {
      this.jobSkillsSecondary = data; // And he have data here too!
    });
  }
  ngOnInit() {
    this.alertService.clear();
  }

  postJob(step) {
   // this.appService.updateStepNumber(step);
    // this.insertJob.JobCategoryId =  this.appService.jobcategory.value.JobCategoryId;
    // this.insertJob.CustomerId = 1;
    // this.insertJob.UserId = 5;
    // this.insertJob.JobPositionId = '';
    // this.insertJob.JobTitle = this.appService.jobtitle.value;
    // // this.insertJob.MinExperienceId = this.step1.jobDetail.minExperience;
    // // this.insertJob.MaxExperienceId = this.step1.jobDetail.maxExperience;
    // // this.insertJob.CompleteDescription = this.step1.jobProfile.hasCompleteDescription;
    // // this.insertJob.JobDescription = this.step1.jobProfile.jobDescription;
    //  this.insertJob.XmlSkills = this.appService.primaryjobskills.concat( this.appService.secondaryjobskills);
    // // this.insertJob.XmlRoleId = this.step1.jobResponsibility.roleIdList;
    if (this.openings.noOfOpenings > 0 && this.locations.prfLoc.PreferredLocationId.toString() != null ) {
    this.insertJob.CustomerId = this.customerId;
    this.insertJob.UserId = this.userId;
    this.insertJob.JobPositionId = '';
    const res = localStorage.getItem('jobId');
    this.insertJob.JobId = parseInt(res, 10);
    this.insertJob.JobCategoryId = this.jobCategory; // this.appService.jobcategory.value.JobCategoryId;
    this.insertJob.JobTitle = this.jobTitle; // this.appService.jobtitle.value;
    this.insertJob.MinExperienceId = this.jobMinExp; // this.appService.minExperience.value;
    this.insertJob.MaxExperienceId = this.jobMaxExp;  // this.appService.maxExperience.value;
    this.insertJob.XmlRoleId =  this.appService.addedresponsibilities; // this.jobResponsibility ;
    this.insertJob.CompleteDescription = this.jobHasDescription; // this.appService.hasDescription.value;
    this.insertJob.JobDescription = this.jobDescription; // this.appService.description.value;
    this.insertJob.XmlSkills = this.appService.primaryjobskills.concat( this.appService.secondaryjobskills);
    //  this.jobSkillsPrimary.concat(this.jobSkillsSecondary);

    // step2
    this.insertJob.NumberOfVacancies = this.openings.noOfOpenings;
    this.insertJob.PreferredLocationId = this.locations.prfLoc.PreferredLocationId.toString();
    this.insertJob.XmlQualifications = this.qualification.addqualificationList;
     this.insertJob.XmlDomains = this.domain.addDomainList;
    this.insertJob.XmlPersonType = this.personalityType.checkpersonType;

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
    // this.insertJob.EmploymentTypeId = 1;
    this.insertJob.SalaryTypeId = this.insertJob.EmploymentTypeId;
    if (this.insertJob.SalaryTypeId === 1) {
      this.appService.currentMinRate.subscribe(x => this.insertJob.MinimumSalary = x.toString());
      this.appService.currentMaxRate.subscribe(x => this.insertJob.MaximumSalary = x.toString());
    } else if (this.insertJob.SalaryTypeId === 2) {
      this.appService.currentMinHourlyRate.subscribe(x => this.insertJob.MinimumSalary = x.toString());
      this.appService.currentMaxHourlyRate.subscribe(x => this.insertJob.MaximumSalary = x.toString());
      this.insertJob.ContractExtended = true;
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
    this.appService.postjob(this.insertJob).subscribe(data => {
      if (data) {
        // this.insertJob.JobId = data;
        this.steps.step3toggleClass();
        this.router.navigate(['/app-createajob/app-steps-step3']);
      }
    });
  } else {
    this.alertService.error('please enter mandatory fields');
    setTimeout(() => {
      this.alertService.clear();
    }, 2000);
    return false;
  }
  }

  backtoStep1() {
    this.steps.step1toggleClass();
  }




}
