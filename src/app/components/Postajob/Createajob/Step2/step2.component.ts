import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DomainExpertiseComponent } from './domainexpertise.component';
import { LocationwiseJobsComponent } from './locationwisejobs.component';
import { PersonalityTypeComponent } from './PersonalityType.component';
import { QualificationsComponent } from './qualifications.component';
import { NoofopeningsComponent } from './noofopenings.component';
import { InsertJob, PjSkill, PjRole, PjDisc, PjDomain, PjEducationDetails, PjTechnicalTeam, PjJobAccessTo } from '../../models/jobPostInfo';
import { AppService } from '../../../../app.service';
import { Step1Component } from '../Step1/step1.component';

@Component({
  selector: 'app-steps-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2Component implements OnInit {
  @ViewChild(Step1Component) step1: Step1Component;
  @ViewChild(DomainExpertiseComponent) domain: DomainExpertiseComponent;
  @ViewChild(LocationwiseJobsComponent) locations: LocationwiseJobsComponent;
  @ViewChild(NoofopeningsComponent) openings: NoofopeningsComponent;
  @ViewChild(PersonalityTypeComponent) personalityType: PersonalityTypeComponent;
  @ViewChild(QualificationsComponent) qualification: QualificationsComponent;
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
    this.insertJob.NumberOfVacancies = this.openings.noOfOpenings;
    this.insertJob.PreferredLocationId = this.locations.location;
    this.insertJob.XmlQualifications = this.qualification.addqualificationList;
     this.insertJob.XmlDomains = this.domain.addDomainList;
    this.insertJob.XmlPersonType = this.personalityType.checkpersonType;
    this.insertJob.IsDrafted = true;
    this.insertJob.StepNumber = 2;
    // this.joblist.JobPositionId = '';
    this.appService.postjob(this.insertJob).subscribe(data => {
      if (data) {
        // this.insertJob.JobId = data;
        this.router.navigate(['/app-createajob/app-steps-step2']);
      }
    });

  }




}
