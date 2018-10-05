import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../../../../app.service';
import { InsertJob } from '../../models/jobPostInfo';

@Component({
  selector: 'app-steps-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.css']
})
export class Step4Component implements OnInit {

  insertJob = new InsertJob();

  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {

  }


  ngOnInit() {
  }

  postJob(step) {
    this.insertJob.JobCategoryId = this.appService.jobcategory.value.JobCategoryId;
    this.insertJob.CustomerId = 1;
    this.insertJob.UserId = 5;
    this.insertJob.JobPositionId = '';
    this.insertJob.JobTitle = this.appService.jobtitle.value;
    this.insertJob.XmlSkills = this.appService.primaryjobskills.concat(this.appService.secondaryjobskills);
    const res = localStorage.getItem('jobId');
    this.insertJob.JobId = parseInt(res, 10);
    this.insertJob.MinExperienceId = this.appService.minExperience.value;
    this.insertJob.MaxExperienceId = this.appService.maxExperience.value;
   // this.insertJob.XmlRoleId = this.appService.responsibilities;
    this.insertJob.CompleteDescription = this.appService.hasDescription.value;
    this.insertJob.JobDescription = '';
    this.insertJob.SalaryTypeId = 1;
    this.insertJob.MinimumSalary = '1';
    this.insertJob.MaximumSalary = '200';

    this.insertJob.NumberOfVacancies = this.appService.noofOpenings.value;
    this.insertJob.PreferredLocationId = this.appService.location.value;
    this.insertJob.XmlQualifications = this.appService.addqualifications;
    this.insertJob.XmlDomains = this.appService.adddomain;
   // this.insertJob.XmlPersonType = this.personalityType.checkpersonType;


    this.insertJob.IsDrafted = false;
    this.insertJob.StepNumber = 4;

    this.insertJob.EmploymentTypeId = this.appService.employmentType.value.EmploymentTypeId;
    if (this.insertJob.EmploymentTypeId === 2) {
    this.insertJob.ContractExtended = true;
    }
    this.insertJob.ContractDuration = this.appService.contractDuration.value;
    this.insertJob.HiringProcessId = this.appService.interviewType.value.InterviewTypeId;
    this.insertJob.HiringManagerId = this.appService.reportingManager.value.UserId;
    this.insertJob.XmlTechnicalTeam = this.appService.addedteammembers;
    this.appService.postjob(this.insertJob).subscribe(data => {
      if (data) {
        // this.insertJob.JobId = data;
        this.router.navigate(['/app-createajob/app-steps-step4']);
      }
    });
  }





}
