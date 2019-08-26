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
    search:any='';
    value:any;
    splitVal: any = [];
    SearchList: any = [];
    searchval:any;
    searchString:any;
    joblist= new GetInterviewSortList();
    InterviewAcceptance = new GetInterviewSortList();
    userId: any;
    listSort:any;
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
     this.populateJobInterViewlist(0,0,'');
  }


  populateJobInterViewlist(sort=0,listsort=0,search='') { 
    this.sort=sort;
    this.listSort=listsort;
    this.search=search;
    debugger
    return this.managejobservice.GetInterviewList(this.customerId,this.sort,this.listSort,search,this.joblistcount).subscribe(res => {
      this.loaddata = true;
      this.joblist = res;
      this.spinner.hide();
    }); 
  }

  GetInterviewAcceptance(newdate,jobid,userId)
  {
   if(newdate=1)
   {
   return this.managejobservice.GetInterViewAcceptance(userId,jobid).subscribe(res => {
    this.loaddata = true;
    this.spinner.hide();
   }); 
   }
  }

  Search(val)
  {
   this.searchString = val;
   this.populateJobInterViewlist(0,0,this.searchString);
   this.SearchList = [];
   this.GetSearchText(null);    
  }

  SearchEnter(searchval)
  {
    this.SearchList = [];
    this.GetSearchText(null);    
    this.Search(searchval);
  }

  SetSearch(val)
  {
    this.SearchList = [];
    this.Search(val);
  }

  GetSearchText(value) {
    this.value = value;
    return this.managejobservice.GetInterviewAutoSearch(value,this.customerId)
    .subscribe(data => {
          if (data.length > 0) {  
            this.SearchList =data;
          }
          else {
            if (this.value == "") {
             this.SearchList = [];
             this.Search(this.value);           
            }
            this.SearchList = [];
          }
        
          },     
        error => { 
          this.SearchList = [];
        });
  }

  updateListCount() {
    this.joblistcount += 6;
    this.managejobservice.updateListCount(this.joblistcount);
    this.populateJobInterViewlist(0,0);   
  }


  OpenScheduleInterviewDialog(jobResponseId,jobid,profileId,userId) {
    // var candidateUserId = $("#candidateUserId").val();
    // var candidateId = +candidateUserId;
    if(profileId>0)
    {
    const scheduleIntwdialogRef = this.dialog.open(ScheduleInterviewComponent,
      {
        width: '750px',
        position: {right : '0px'},
        height : '750px',
        data: {
         jobResponseId: jobResponseId,
         jobId: jobid,
         ProfileId: profileId,
         userId: userId
        }
      }
    );
    scheduleIntwdialogRef.afterClosed().subscribe(result => {
     // this.jobDetails.populateJobsStaticInfo(this.jobid);
      console.log('Chatbox Dialog result: ${result}');
    });
  }
  else 
  {
    this.toastr.error('Profile Does not Exist','!Oops');
    
  }
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
    public CPFromTime:string;
    public CandidateProfilePic : string;
    public CandidateFirstName:string;
    public CandidateLastName:string;
    public HiringLeaderProfilePic:string;
    public HiringLeaderFirstName:string;
    public HiringLeaderLastName:string;
}