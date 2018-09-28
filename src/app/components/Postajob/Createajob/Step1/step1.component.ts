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
import {InsertJob} from '../../models/jobPostInfo';
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
  formData: any;
  joblist = new InsertJob();
  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {
  }
  ngOnInit() {
  }
  postJob(step) {
    this.joblist.JobCategoryId = this.jobCategory.selectedCategory;
    // this.joblist.JobPositionId = '';
    this.appService.postjob(this.formData).subscribe(data => {
      if (data) {
        this.router.navigate(['/app-createajob/app-steps-step2']);
      }
    });

  }




}
