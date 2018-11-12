import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ContractDurationComponent } from './contractduration.component';
import { ContractExtensionComponent } from './contractextension.component';
import { EmploymentTypeComponent } from './employmenttype.component';
import { TeammembersComponent } from './teammembers.component';
import { ReportingManagerComponent } from './reportingmanager.component';
import { InterviewTypeComponent } from './interviewtype.component';
import { InsertJob, PjSkill, PjRole, PjDisc, PjDomain, PjEducationDetails, PjTechnicalTeam, PjJobAccessTo } from '../../models/jobPostInfo';
import { AppService } from '../../../../app.service';
import { Step2Component } from '../Step2/step2.component';
import { JobcategoryComponent } from '../Step1/Jobcategory.component';
import { JobdetailsComponent } from '../Step1/Jobdetails.component';
import { JobprofileComponent } from '../Step1/Jobprofile.component';
import { JobResponsibilitiesComponent } from '../Step1/Jobresponsibilities.component';
import { JobskillsetComponent } from '../Step1/Jobskillset.component';
import { DomainExpertiseComponent } from '../Step2/domainexpertise.component';
import { LocationwiseJobsComponent } from '../Step2/locationwisejobs.component';
import { NoofopeningsComponent } from '../Step2/noofopenings.component';
import { PersonalityTypeComponent } from '../Step2/PersonalityType.component';
import { QualificationsComponent } from '../Step2/qualifications.component';
import { StepsComponent } from '../steps.component';

@Component({
  selector: 'app-steps-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css']
})
export class Step3Component implements OnInit {

  // @ViewChild(Step2Component) step2: Step2Component;
  // @ViewChild(JobcategoryComponent) jobCategory: JobcategoryComponent;
  // @ViewChild(JobdetailsComponent) jobDetail: JobdetailsComponent;
  // @ViewChild(JobprofileComponent) jobProfile: JobprofileComponent;
  // @ViewChild(JobResponsibilitiesComponent) jobResponsibility: JobResponsibilitiesComponent;
  // @ViewChild(JobskillsetComponent) jobSkills: JobskillsetComponent;
  jobCategory: number;
  jobMinExp: number;
  jobMaxExp: number;
  jobTitle: string;
  jobDescription: string;
  jobHasDescription: boolean;
  jobResponsibility: any;
  jobSkillsPrimary: any;
  jobSkillsSecondary: any;
  // @ViewChild(DomainExpertiseComponent) domain: DomainExpertiseComponent;
  // @ViewChild(LocationwiseJobsComponent) locations: LocationwiseJobsComponent;
  // @ViewChild(NoofopeningsComponent) openings: NoofopeningsComponent;
  // @ViewChild(PersonalityTypeComponent) personalityType: PersonalityTypeComponent;
  // @ViewChild(QualificationsComponent) qualification: QualificationsComponent;
  domain: any;
  locations: any;
  openings: any;
  personalityType: any;
  qualification: any;
  @ViewChild(ContractDurationComponent) contractDuration: ContractDurationComponent;
  @ViewChild(ContractExtensionComponent) contractExtension: ContractExtensionComponent;
  @ViewChild(EmploymentTypeComponent) empType: EmploymentTypeComponent;
  @ViewChild(InterviewTypeComponent) intwType: InterviewTypeComponent;
  @ViewChild(ReportingManagerComponent) reporting: ReportingManagerComponent;
  @ViewChild(TeammembersComponent) team: TeammembersComponent;
  formData: any;
  customer: any;
  userId: any;
  customerId: any;
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
    private router: Router, private appService: AppService, private steps: StepsComponent) {
      this.customer = JSON.parse(sessionStorage.getItem('userData'));
      this.customerId = this.customer.CustomerId;
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
    // this.appService.addedresponsibilitiesChanged.subscribe((data) => {
    //   this.jobResponsibility = data; // And he have data here too!
    // });
    this.appService.currentDescriptionChecked.subscribe((data) => {
      this.jobHasDescription = data; // And he have data here too!
    });
    this.appService.currentDescription.subscribe((data) => {
      this.jobDescription = data; // And he have data here too!
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
      this.locations = data.PreferredLocationId; // And he have data here too!
    });
    this.appService.currentOpenings.subscribe((data) => {
      this.openings = data; // And he have data here too!
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


  ngOnInit() {
  }


  postJob(step) {
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
    this.insertJob.JobPositionId = '';
    const res = localStorage.getItem('jobId');
    this.insertJob.JobId = parseInt(res, 10);

  //  this.insertJob.JobCategoryId = this.appService.jobcategory.value.JobCategoryId;
  //   this.insertJob.JobTitle = this.appService.jobtitle.value;
  //   this.insertJob.MinExperienceId = this.appService.minExperience.value;
  //   this.insertJob.MaxExperienceId = this.appService.maxExperience.value;
  //   this.insertJob.XmlRoleId = this.appService.addedresponsibilities;
  //   this.insertJob.CompleteDescription = this.appService.hasDescription.value;
  //   this.insertJob.JobDescription = this.appService.description.value;
  //   this.insertJob.XmlSkills = this.appService.primaryjobskills.concat( this.appService.secondaryjobskills);

    this.insertJob.JobCategoryId = this.jobCategory; // this.appService.jobcategory.value.JobCategoryId;
    this.insertJob.JobTitle = this.jobTitle; // this.appService.jobtitle.value;
    this.insertJob.MinExperienceId = this.jobMinExp; // this.appService.minExperience.value;
    this.insertJob.MaxExperienceId = this.jobMaxExp;  // this.appService.maxExperience.value;
    this.insertJob.XmlRoleId =  this.appService.addedresponsibilities; // this.jobResponsibility ;
    this.insertJob.CompleteDescription = this.jobHasDescription; // this.appService.hasDescription.value;
    this.insertJob.JobDescription = this.jobDescription; // this.appService.description.value;
    this.insertJob.XmlSkills = this.appService.primaryjobskills.concat( this.appService.secondaryjobskills);
     // this.jobSkillsPrimary.concat(this.jobSkillsSecondary);

    // step2
    this.insertJob.SalaryTypeId = 1;
    this.insertJob.MinimumSalary = '1';
    this.insertJob.MaximumSalary = '200';
    this.insertJob.NumberOfVacancies = this.openings; // this.appService.noofOpenings.value;
    this.insertJob.PreferredLocationId = this.locations ; // this.appService.location.value.locationId.toString();
    this.insertJob.XmlQualifications =  this.appService.addqualifications; // this.qualification;
    this.insertJob.XmlDomains = this.appService.adddomain; // this.domain;
    this.insertJob.XmlPersonType =  this.appService.personTypeSingle; // this.personalityType;


    // step3
    this.insertJob.IsDrafted = true;
    this.insertJob.StepNumber = step;
    this.insertJob.EmploymentTypeId = this.empType.employmentType.EmploymentTypeId;
    if (this.insertJob.EmploymentTypeId === 2) {
    this.insertJob.ContractExtended = true; }
    this.insertJob.ContractDuration = this.contractDuration.contractDuration;
    this.insertJob.HiringProcessId = this.intwType.interviewType.InterviewTypeId;
    this.insertJob.HiringManagerId = this.reporting.selectedManager.UserId;
    // //this.appService.reportingManager.value.UserId; // parseInt(this.reporting.selectedInput[0].value, 10);
    this.insertJob.XmlTechnicalTeam = this.team.addedteammemberslist;
    this.appService.postjob(this.insertJob).subscribe(data => {
      if (data) {
        // this.insertJob.JobId = data;
        this.steps.step4toggleClass();
        this.router.navigate(['/app-createajob/app-steps-step4']);
      }
    });

  }


  backtoStep2() {
    this.steps.step2toggleClass();
  }

}
