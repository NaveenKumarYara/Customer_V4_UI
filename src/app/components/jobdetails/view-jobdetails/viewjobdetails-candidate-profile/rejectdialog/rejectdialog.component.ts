import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ScheduleInterview } from '../schedule-interview/schedule-interview.component';
import { JobdetailsService } from '../../../jobdetails.service';
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
  schIntw = new ScheduleInterview();
 @Input() jobid: number;
 @Input() statusid: number;
 @Output() eventStat = new EventEmitter();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private jobdetailsservice: JobdetailsService) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId = JSON.parse(sessionStorage.getItem('customerId'));
      this.userId = this.customer.UserId;
      this.jobid = JSON.parse(sessionStorage.getItem('jobId'));
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
    // this.jobDetails.populateJobsStaticInfo(this.jobid);
    this.eventStat.emit(null);
      console.log(res);
      }) ;
    }
}
