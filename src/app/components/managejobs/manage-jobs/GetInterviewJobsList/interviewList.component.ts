import { Component, OnInit,  Input, ViewChild , ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ManageJobService } from '../../managejobs.service';
import { ScheduleInterviewComponent, ScheduleInterview } from '../../../jobdetails/view-jobdetails/viewjobdetails-candidate-profile/schedule-interview/schedule-interview.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { JobDetails } from '../../models/jobdetails';
// import { ApiService } from '../../../../shared/services/api.service/api.service';
import { AppService } from '../../../../app.service';
import { AlertService } from '../../../../shared/alerts/alerts.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {GetInterviewSortList,Jobs} from '../../../../../models/GetInterviewSortList';
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
    loaddata = false;
    joblistcount: number;
    sort:any;
    joblist= new GetInterviewSortList();
    userId: any;
    jobs: any;
    viewscheduleInterviewDialgoref: MatDialogRef<ScheduleInterviewComponent>;
    constructor( private spinner: NgxSpinnerService,private toastr: ToastsManager,private _vcr: ViewContainerRef,private route: ActivatedRoute,
        private router: Router, private managejobservice: ManageJobService, private appService: AppService,private alertService : AlertService, private dialog: MatDialog) {
        this.customer = JSON.parse(sessionStorage.getItem('userData'));
        this.customerId = this.customer.CustomerId;
        this.userId = this.customer.UserId;
        this.toastr.setRootViewContainerRef(_vcr);
       }
  ngOnInit() {
     this.spinner.show();
     this.managejobservice.updateListCount(6);
     this.managejobservice.currentlistcount.subscribe(x => this.joblistcount = x);
     this.populateJobInterViewlist(0);
  }


  populateJobInterViewlist(sortBy=0) { 
    return this.managejobservice.GetInterviewList(this.customerId,sortBy,this.joblistcount).subscribe(res => {
      this.loaddata = true;
      this.joblist = res;
      this.spinner.hide();
    }); 
  }

  updateListCount() {
    this.joblistcount += 6;
    this.managejobservice.updateListCount(this.joblistcount);
    this.populateJobInterViewlist(0);   
  }


  OpenScheduleInterviewDialog() {
    // var candidateUserId = $("#candidateUserId").val();
    // var candidateId = +candidateUserId;
    const scheduleIntwdialogRef = this.dialog.open(ScheduleInterviewComponent,
      {
        width: '750px',
        position: {right : '0px'},
        height : '750px',
        data: {
         // status : this.statusid
        }
      }
    );
    scheduleIntwdialogRef.afterClosed().subscribe(result => {
     // this.jobDetails.populateJobsStaticInfo(this.jobid);
      console.log('Chatbox Dialog result: ${result}');
    });
  }



  ViewJobdetails(jobId) {
    sessionStorage.setItem('jobId', JSON.stringify(jobId));
    this.router.navigateByUrl('app-view-jobdetails');
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
    public HiringLeaderProfilePic:string;
    public HiringLeaderFirstName:string;
    public HiringLeaderLastName:string;
}