import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../../../../app.service';
declare var  $: any ;
@Component({
  selector: 'app-steps-step1-jobprofile',
  templateUrl: './jobprofile.component.html',
  styleUrls: ['./jobprofile.component.css']
})
export class JobprofileComponent implements OnInit {
  @ViewChild('profileForm') profileForm: any;
declare;
hasCompleteDescription: boolean;
jobDescription: string;
hasCompleteDescriptionList: any;
jobPositionId:string;
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
  ngOnInit() {
    this.populatedescriptioncheck();
   // if (localStorage.getItem('jobId') != null) {
    this.appService.currentDescriptionChecked.subscribe(x => this.hasCompleteDescription = x);
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
