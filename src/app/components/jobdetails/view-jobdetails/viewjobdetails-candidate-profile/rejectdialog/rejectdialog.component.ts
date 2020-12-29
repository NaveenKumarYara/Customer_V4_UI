import { Component, Inject, Input, Output, EventEmitter,ViewContainerRef } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import { ScheduleInterview } from '../schedule-interview/schedule-interview.component';
import { JobdetailsService } from '../../../jobdetails.service';
import { AppService } from '../../../../../app.service';
import { SettingsService } from '../../../../../../settings/settings.service';
import { GetJobDetailCustomer } from '../../../../../../models/GetJobDetailCustomer';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-rejectdialog',
  templateUrl: './rejectdialog.component.html',
  styleUrls: ['./rejectdialog.component.css']
})
export class RejectdialogComponent {
  customerId: any;
  userId: any;
  Comment: string;
  customer: any;
  status= new JobStatus();
  schIntw = new ScheduleInterview();
  jobdetailscustomer = new  GetJobDetailCustomer();
 @Input() jobid: number;
 @Input() statusid: number;
 @Output() eventStat = new EventEmitter();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private jobdetailsservice: JobdetailsService,private appService: AppService,private settingsService: SettingsService,private toastr: ToastsManager, private _vcr: ViewContainerRef) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId = this.customer.CustomerId;
      this.userId = this.customer.UserId;
      this.jobid = JSON.parse(sessionStorage.getItem('jobId'));
      this.toastr.setRootViewContainerRef(_vcr);
   }

   PopulateJobdetail () {
    return this.jobdetailsservice.getJobDetailCustomer(this.customerId, this.data.jobId).subscribe(res => {
      this.jobdetailscustomer = res;
      this.SendStatusEmail();
    });
  
  }

   SendStatusEmail()
   {
     this.status.AppLink = this.settingsService.settings.CandidateLogin;
     this.status.JobStatus = 'Rejected';
     this.status.FromEmail = this.customer.Email;
     this.status.ToEmailID = this.data.Email;
     this.status.FullName = this.data.FullName;
     this.status.JobTitle = this.jobdetailscustomer.JobInfo.JobTitle;
     this.status.JobLocation = this.jobdetailscustomer.JobLocation[0].CityName + ','+ this.jobdetailscustomer.JobLocation[0].StateName;

     this.appService.SendJobStatus(this.status)
     .subscribe(
     status => {
        this.toastr.success('Email Sent','Success');
           setTimeout(() => {          
               this.toastr.dismissToast; 
             }, 3000);
            
          } 
                     
     );
   }

  Reject() {
    this.schIntw.UserId = null;
    this.schIntw.JobId = this.data.jobId;
    this.schIntw.ProfileId = this.data.ProfileId;
    this.schIntw.JobInterviewId = 0;
    this.schIntw.JobResponseId =  this.data.jobResponseId; // gemerated when sortlisted or applied
    this.schIntw.InterviewDatevalue  = '';
    this.schIntw.StartTime = null;
    this.schIntw.InterviewTypeId = null; // skype or anytype
    this.schIntw.PhoneNumber = null;
    this.schIntw.BridgeUrl = null;
    this.schIntw.AccessId = null;
    this.schIntw.SkypeId = null;
    this.schIntw.Comments = this.Comment;
    this.schIntw.ResponseStatusId = 6; // what stage it is..hired...
    this.schIntw.IsActive = null;
    this.schIntw.Rating = null;
    this.schIntw.RequiredFurtherInterview = null;
    this.schIntw.StatusChangedByUserId = this.userId;
    this.schIntw.InterviewingPerson = null;
    this.jobdetailsservice.interviewProcess(this.schIntw).subscribe(res => {
      this.toastr.success('Email Sent','Success');
           setTimeout(() => {          
               this.toastr.dismissToast; 
             }, 3000);
      this.PopulateJobdetail();
    // this.jobDetails.populateJobsStaticInfo(this.jobid);
    
    this.eventStat.emit(null);
      console.log(res);
      }) ;
    }
}


export class JobStatus
{
    public FullName :string
    public AppLink :string
    public JobStatus :string
    public ToEmailID :string
    public JobLocation :string
    public  FromEmail :string
    public JobTitle :string
}
