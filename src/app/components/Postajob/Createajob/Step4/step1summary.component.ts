import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../../../../app.service';

@Component({
  selector: 'app-steps-step4-step1summary',
  templateUrl: './step1summary.component.html',
})
export class Step1SummaryComponent implements OnInit {

jobCategory: number;
jobTitle = '';
minExp: number;
maxExp: number;
hasDescription: boolean;
completeDescription: string;
primarySkills = [];
secondarySkills = [];
roles = '';

  constructor(private route: ActivatedRoute,
    private router: Router,  private appService: AppService) {

  }


  ngOnInit() {
    this.jobCategory = this.appService.jobcategory.value.JobCategoryId;
    this.jobTitle = this.appService.jobtitle.value;
    this.minExp = this.appService.minExperience.value;
    this.maxExp = this.appService.maxExperience.value;
    this.hasDescription = this.appService.hasDescription.value;
    this.completeDescription = '';
    this.primarySkills = this.appService.primaryjobskills;
    this.secondarySkills = this.appService.secondaryjobskills;
    this.roles = '';

 
    // this.insertJob.JobDescription = '';
    // this.insertJob.SalaryTypeId = 1;
    // this.insertJob.MinimumSalary = '1';
    // this.insertJob.MaximumSalary = '200';
  }






}
