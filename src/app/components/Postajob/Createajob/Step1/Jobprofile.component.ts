import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../../../../app.service';
import { jobImps } from '../../models/jobPostInfo';

declare var  $: any ;
@Component({
  selector: 'app-steps-step1-jobprofile',
  templateUrl: './Jobprofile.component.html',
  styleUrls: ['./Jobprofile.component.css']
})
export class JobprofileComponent implements OnInit {
  @ViewChild('profileForm') profileForm: any;
declare;
hasCompleteDescription: boolean;
jobDescription: string;
hasCompleteDescriptionList: any;
jobPositionId:string;
jobPriority:number=3;
jobimplist:jobImps[]=[];
  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {

  }

  setValue(val) {
    this.hasCompleteDescription = val;
    this.jobDescription = val ? this.jobDescription : '';
    this.appService.updatehaddescription(this.hasCompleteDescription);
    // if (!this.hasCompleteDescription) {
    //   $('#completeDescription').prop('disabled', true);
    // } else {
    //   $('#completeDescription').prop('disable', false);
    // }
  }

  updateJobImp() {
    this.appService.updateJobImp(this.jobPriority);
  }

  GetJobPriority() {
     this.appService.GetJobPriority().subscribe(res => {
      this.jobimplist = res;
  });
  }


  ngOnInit() {
    this.GetJobPriority();
    this.populatedescriptioncheck();
   // if (localStorage.getItem('jobId') != null) {
    this.appService.currentDescriptionChecked.subscribe(x => this.hasCompleteDescription = x);
    this.appService.currentjobImp.subscribe(x=>this.jobPriority=x)
    // if (this.hasCompleteDescription === undefined) {
    //   this.hasCompleteDescription = false;
    // }
    this.appService.currentDescription.subscribe(x => this.jobDescription = x);
    this.appService.currentjobPosition.subscribe(x => this.jobPositionId = x);

  // }
}
populatedescriptioncheck() {
    this.hasCompleteDescriptionList  = this.appService.getHasDescription();
  }

  changeDescription(val) {
    this.jobDescription = val;
    this.appService.updatedescription(this.jobDescription);
  }
  
  changeJobPosition(val) {
    this.jobPositionId = val;
    this.appService.updateJobPosition(this.jobPositionId);
  }


}
