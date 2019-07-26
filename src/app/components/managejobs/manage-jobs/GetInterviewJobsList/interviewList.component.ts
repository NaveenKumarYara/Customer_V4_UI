import { Component, OnInit,  Input, ViewChild , ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ManageJobService } from '../../managejobs.service';
import { JobDetails } from '../../models/jobdetails';
// import { ApiService } from '../../../../shared/services/api.service/api.service';
import { AppService } from '../../../../app.service';
import { AlertService } from '../../../../shared/alerts/alerts.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {ValueArrayPipe} from '../../../managejobs/manage-jobs/ValueArrayPipe.pipe';
declare var $: any;

import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
@Component({
  selector: 'app-interviewList',
  templateUrl: './interviewList.component.html',
  styleUrls: ['./interviewList.component.css'],
  providers: [ ValueArrayPipe ]
})
export class InterviewListComponent implements OnInit {
    jobId: any;
    customer: any;
    customerId: any;
    joblist= new invterviewList();
    userId: any;
    constructor( private spinner: NgxSpinnerService,private toastr: ToastsManager,private _vcr: ViewContainerRef,private route: ActivatedRoute,
        private router: Router, private managejobservice: ManageJobService, private appService: AppService,private alertService : AlertService) {
        this.customer = JSON.parse(sessionStorage.getItem('userData'));
        this.customerId = this.customer.CustomerId;
        this.userId = this.customer.UserId;
        this.toastr.setRootViewContainerRef(_vcr);
       }
  ngOnInit() {
     this.spinner.show();
      this.populateJobInterViewlist();
  }

  populateJobInterViewlist() { 
    return this.managejobservice.GetInterviewList(this.userId,this.customerId).subscribe(res => {
      this.joblist = res;
      this.spinner.hide();
    }); 
  }

}



export class invterviewList
{
    public JobTitle :string;
    public JobLocations :string;
    public InterviewDate :Date;
    public InterviewType :string;
    public StartTime :string;
    public CandidateProfilePic : string;
    public CandidateFirstName:string;
    public CandidateLastName:string;
    public HiringLeaderFirstName:string;
    public HiringLeaderLastName:string;
}