import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../../../../app.service';

@Component({
  selector: 'app-steps-step4-step1summary',
  templateUrl: './step1summary.component.html',
})
export class Step1SummaryComponent implements OnInit {

jobCategoryId: number;
jobCategory: string;
jobTitle = '';
minExp: number;
maxExp: number;
hasDescription: boolean;
completeDescription: string;
primarySkills = [];
secondarySkills = [];
roles = [];
client: string;
  constructor(private route: ActivatedRoute,
    private router: Router,  private appService: AppService) {
     this.appService.currentcategorytitle.subscribe((data) => {
          this.jobCategoryId = data.JobCategoryId; // And he have data here too!
          this.jobCategory = data.Category;
      });
      this.appService.currentClient.subscribe((data) => {
        // this.jobCategoryId = data.ClientId; // And he have data here too!
        this.client = data.ClientName;
    });
      this.appService.currentjobtitle.subscribe((data) => {
        this.jobTitle = data; // And he have data here too!
      });
      this.appService.currentminExp.subscribe((data) => {
        this.minExp = data; // And he have data here too!
      });
      this.appService.currentmaxExp.subscribe((data) => {
        this.maxExp = data; // And he have data here too!
      });
      // this.appService.addedresponsibilitiesChanged.subscribe((data) => {
      //   this.roles = data; // And he have data here too!
      // });
      this.appService.currentDescriptionChecked.subscribe((data) => {
        this.hasDescription = data; // And he have data here too!
      });
      this.appService.currentDescription.subscribe((data) => {
        this.completeDescription = data; // And he have data here too!
      });

      // this.appService.jobprimaryskillsChanged.subscribe((data) => {
      //   this.primarySkills = data; // And he have data here too!
      // });
      // this.appService.jobsecondaryskillsChanged.subscribe((data) => {
      //   this.secondarySkills = data; // And he have data here too!
      // });
  }


  ngOnInit() {
    // this.jobCategoryId = this.appService.jobcategory.value.JobCategoryId;
    // this.jobCategory = this.appService.jobcategory.value.Category;
    // this.jobTitle = this.appService.jobtitle.value;
    // this.minExp = this.appService.minExperience.value;
    // this.maxExp = this.appService.maxExperience.value;
    // this.hasDescription = this.appService.hasDescription.value;
    // this.completeDescription = this.appService.description.value;
     this.primarySkills = this.appService.primaryjobskills;
    this.secondarySkills = this.appService.secondaryjobskills;
     this.roles = this.appService.responsibilities;


    // this.insertJob.JobDescription = '';
    // this.insertJob.SalaryTypeId = 1;
    // this.insertJob.MinimumSalary = '1';
    // this.insertJob.MaximumSalary = '200';
  }






}
