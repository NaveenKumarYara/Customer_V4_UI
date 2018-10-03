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

@Component({
  selector: 'app-steps-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css']
})
export class Step3Component implements OnInit {

  @ViewChild(Step2Component) step2: Step2Component;
  @ViewChild(ContractDurationComponent) contractDuration: ContractDurationComponent;
  @ViewChild(ContractExtensionComponent) locations: ContractExtensionComponent;
  @ViewChild(EmploymentTypeComponent) empType: EmploymentTypeComponent;
  @ViewChild(InterviewTypeComponent) intwType: InterviewTypeComponent;
  @ViewChild(ReportingManagerComponent) reporting: ReportingManagerComponent;
  @ViewChild(TeammembersComponent) team: TeammembersComponent;
  formData: any;
  // joblist = new InsertJob();
  insertJob = new InsertJob();

  pjSkill: PjSkill;
  pjRole: PjRole;
  pjDisc: PjDisc;
  pjDomain: PjDomain;
  pjEducationDetails: PjEducationDetails;
  pjTechnicalTeam: PjTechnicalTeam;
  pjJobAccessTo: PjJobAccessTo;

  pjSkillList: any = [];
  pjRoleList: any = [];
  pjDiscList: any = [];
  pjDomainList: any = [];
  pjEducationDetailsList: any = [];
  pjTechnicalTeamList: any = [];
  pjJobAccessToList: any = [];
  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {
  }


  ngOnInit() {
  }


  postJob(step) {
    this.insertJob.JobCategoryId = parseInt(this.appService.jobcategory.value, 10);
    this.insertJob.CustomerId = 1;
    this.insertJob.UserId = 5;
    this.insertJob.JobPositionId = '';
//    this.insertJob.JobId = 0;
    this.insertJob.JobTitle = this.appService.jobtitle.value;
    // this.insertJob.MinExperienceId = this.step1.jobDetail.minExperience;
    // this.insertJob.MaxExperienceId = this.step1.jobDetail.maxExperience;
    // this.insertJob.CompleteDescription = this.step1.jobProfile.hasCompleteDescription;
    // this.insertJob.JobDescription = this.step1.jobProfile.jobDescription;
     this.insertJob.XmlSkills = this.appService.primaryjobskills.concat( this.appService.secondaryjobskills);
    // this.insertJob.XmlRoleId = this.step1.jobResponsibility.roleIdList;
    this.insertJob.EmploymentTypeId = 1;
    const res = localStorage.getItem('jobId');
    this.insertJob.JobId = parseInt(res, 10);
    this.insertJob.SalaryTypeId = 1;
    this.insertJob.MinimumSalary = '1';
    this.insertJob.MaximumSalary = '200';
    // step2
    // this.insertJob.NumberOfVacancies = this.step2.openings.noOfOpenings;
    // this.insertJob.PreferredLocationId = this.step2.locations.location;
    // this.insertJob.XmlQualifications = this.step2.qualification.addqualificationList;
    //  this.insertJob.XmlDomains = this.step2.domain.addDomainList;
    // this.insertJob.XmlPersonType = this.step2.personalityType.checkpersonType;
    // step3
    this.insertJob.IsDrafted = true;
    this.insertJob.StepNumber = step;
    this.insertJob.EmploymentTypeId = this.empType.employmentTypeId;
    this.insertJob.ContractExtended = true;
    this.insertJob.ContractDuration = this.contractDuration.contractDuration;
    this.insertJob.HiringProcessId = this.intwType.interviewType;
    this.insertJob.HiringManagerId = parseInt(this.reporting.selectedInput[0].value, 10);
    this.insertJob.XmlTechnicalTeam = this.team.addedteammemberslist;
    this.appService.postjob(this.insertJob).subscribe(data => {
      if (data) {
        // this.insertJob.JobId = data;
        this.router.navigate(['/app-createajob/app-steps-step4']);
      }
    });

  }




}
