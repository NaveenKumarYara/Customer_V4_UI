import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../../../../app.service';
import { JobResponsibilitiesComponent } from './Jobresponsibilities.component';
import { JobcategoryComponent } from './Jobcategory.component';
import { JobdetailsComponent } from './Jobdetails.component';
import { JobprofileComponent } from './Jobprofile.component';
import { JobskillsetComponent } from './Jobskillset.component';
declare var $: any;
declare var jQuery: any;
import {InsertJob, PjSkill, PjRole, PjDisc, PjDomain, PjEducationDetails, PjTechnicalTeam, PjJobAccessTo} from '../../models/jobPostInfo';
import { CreateajobComponent } from '../createajob.component';
@Component({
  selector: 'app-steps-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component implements OnInit {
  @ViewChild(JobcategoryComponent) jobCategory: JobcategoryComponent;
  @ViewChild(JobdetailsComponent) jobDetail: JobdetailsComponent;
  @ViewChild(JobprofileComponent) jobProfile: JobprofileComponent;
  @ViewChild(JobResponsibilitiesComponent) jobResponsibility: JobResponsibilitiesComponent;
  @ViewChild(JobskillsetComponent) jobSkills: JobskillsetComponent;
  // formData: any;
  // joblist = new InsertJob();

  customer: any;
  userId: any;
  customerId: any;
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
    private router: Router, private appService: AppService, private creteComponent: CreateajobComponent) {
      this.customer = JSON.parse(sessionStorage.getItem('userData'));
      this.customerId = this.customer.CustomerId;
      this.userId = this.customer.UserId;
      this.route.params.subscribe(params => {
        console.log(params);
        if (params['jobId'] > 0) {
          // this.populatePersonType(params['jobId']);
          // this.PopulateJobdetail(params['jobId']);
          this.creteComponent.PopulateJobdetail(params['jobId']);
        }
      });
  }
  ngOnInit() {
  }
  postJob(step) {
    this.insertJob.CustomerId = this.customerId;
    this.insertJob.UserId = this.userId;
    this.insertJob.JobPositionId = '';
   // this.insertJob.JobId = 0;
    const res = localStorage.getItem('jobId');
    // if (res != null) {
    this.insertJob.JobId = res != null ? parseInt(res, 10) : 0;
   // }
    this.insertJob.JobCategoryId = this.jobCategory.selectedCategory.JobCategoryId;
    this.insertJob.JobTitle = this.jobDetail.selectedTitle;
    this.insertJob.MinExperienceId = this.jobDetail.minExperience;
    this.insertJob.MaxExperienceId = this.jobDetail.maxExperience;
    this.insertJob.CompleteDescription = this.jobProfile.hasCompleteDescription;
    this.insertJob.JobDescription = this.jobProfile.jobDescription;
    this.insertJob.XmlSkills = this.jobSkills.primaryjobskills.concat( this.jobSkills.secondaryjobskills);
    this.insertJob.XmlRoleId = this.jobResponsibility.roleIdList;
    this.insertJob.EmploymentTypeId = 1;
    this.insertJob.SalaryTypeId = 1;
    this.insertJob.MinimumSalary = '1';
    this.insertJob.MaximumSalary = '200';
    this.insertJob.IsDrafted = true;
    this.insertJob.StepNumber = step;
    this.appService.postjob(this.insertJob).subscribe(data => {
      if (data) {
        this.insertJob.JobId = data;
        localStorage.setItem('jobId', this.insertJob.JobId.toString());
        this.router.navigate(['/app-createajob/app-steps-step2']);
      }
    });

  }

  postJob1(step) {
    this.pjSkill = new PjSkill();
    this.pjSkill.MaximumExp = 10;
    this.pjSkill.MinimumExp = 3;
    this.pjSkill.SkillName = 'Javascript';
    this.pjSkill.SkillType = true;

    this.pjRole = new PjRole();
    this.pjRole.RoleId = 10;

    this.pjDisc = new PjDisc();
    this.pjDisc.DiscTestId = 1; // PjDisc;

    this.pjDomain = new PjDomain();
    this.pjDomain.Description = 'xxx';
    this.pjDomain.DomainId = 1;
    this.pjDomain.ExperienceRequired = true;
    this.pjDomain.MaximumExperience = 10;
    this.pjDomain.MinimumExperience = 1;

    this.pjEducationDetails = new PjEducationDetails();
    this.pjEducationDetails.IsActive = true; // PjEducationDetails;
    this.pjEducationDetails.QualificationId = 1;

    this.pjTechnicalTeam = new PjTechnicalTeam();
    this.pjTechnicalTeam.UserId = 17;

    this.pjJobAccessTo = new PjJobAccessTo();
    this.pjJobAccessTo.CustomerId = 1;
    this.pjJobAccessTo.UserId = 17;


    this.pjSkillList.push(this.pjSkill);
    this.pjRoleList.push(this.pjRole);
    this.pjDiscList.push(this.pjDisc);
    this.pjDomainList.push(this.pjDomain);
    this.pjEducationDetailsList.push(this.pjEducationDetails);
    this.pjTechnicalTeamList.push(this.pjTechnicalTeam);
    this.pjJobAccessToList.push(this.pjJobAccessTo);

    this.insertJob = new InsertJob();
    this.insertJob.JobId = 0;
    this.insertJob.JobPositionId = 'Microsoft-123';
    this.insertJob.UserId = 5;
    this.insertJob.CustomerId = 1;
    this.insertJob.JobCategoryId = 1;
    this.insertJob.JobTitle = 'Bigdata Developer';
    this.insertJob.MinExperienceId = 3;
    this.insertJob.MaxExperienceId = 5;
    this.insertJob.CompleteDescription = true;
    this.insertJob.JobDescription = 'Responsible for setup,';
    this.insertJob.NumberOfVacancies = 3;
    this.insertJob.PreferredLocationId = '1';
    this.insertJob.EmploymentTypeId = 1;
    this.insertJob.ContractDuration = null;
    this.insertJob.ContractExtended = true;
    this.insertJob.PossibilityOfFullTime = true;
    this.insertJob.AfterWhatDuration = '2 Months';
    this.insertJob.SalaryTypeId = 1;
    this.insertJob.MinimumSalary = '300';
    this.insertJob.MaximumSalary = '500';
    this.insertJob.HideSalary = false;
    this.insertJob.BonusOffered = true;
    this.insertJob.HiringProcessId = 1;
    this.insertJob.HiringManagerId = 5;
    this.insertJob.IsPrivate = true;
    this.insertJob.ExpiryDate = new Date();
    this.insertJob.SaveAsTemplate = true;
    this.insertJob.StepNumber = 4;
    this.insertJob.IsDrafted = false;
    this.insertJob.XmlTechnicalTeam = this.pjTechnicalTeamList;
    this.insertJob.XmlAccessToUsers = this.pjJobAccessToList;
    this.insertJob.XmlSkills = this.pjSkillList;
    this.insertJob.XmlRoleId = this.pjRoleList;
    this.insertJob.XmlPersonType = this.pjDiscList;
    this.insertJob.XmlDomains = this.pjDomainList;
    this.insertJob.XmlQualifications = this.pjEducationDetailsList;



    this.appService.postjob(this.insertJob)
      .subscribe(
      data => {
        // this.expForm.reset();
        $('#expModalCO').removeClass('modalOpen');
        $('#expModalCO').addClass('modalClose');
        $('#professionalexperience').modal('hide');
        // $('#professionalexperience').find('input,textarea,select').val('');
        $('#Loding').hide('');
        // this.GetExperience();
      }); // error => { this._service.DebugMode(error); });

  }


}
