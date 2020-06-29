import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ScheduleInterview } from '../schedule-interview/schedule-interview.component';
import { JobdetailsService } from '../../../jobdetails.service';
import { AppService } from '../../../../../app.service';
import {  NgbModal, NgbModule, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../../../shared/services/api.service/api.service';
declare var $: any;
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-hiredialog',
  templateUrl: './hire.component.html',
  styleUrls: ['./hire.component.css']
})
export class HiredialogComponent {
  customerId: any;
  userId: any;
  Comment: string;
  customer: any;
  salaryDetails:any;
  addon = new addon();
  valueSal:number;
  schIntw = new ScheduleInterview();
 @Input() jobid: number;
 @Input() statusid: number;
 @Output() eventStat = new EventEmitter();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _service: ApiService,private appService: AppService,private jobdetailsservice: JobdetailsService) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId = JSON.parse(sessionStorage.getItem('customerId'));
      this.userId = this.customer.UserId;
      this.jobid = JSON.parse(sessionStorage.getItem('jobId'));
      this.GetSalarayDetails();
   }

   ngOnInit()
   {
    $('body').on('change', '#datePickerCert', function () {
        $('#datePickerCert').trigger('click');
      });
      $('.datepicker').datepicker({ minDate: new Date() });
    
   }


Check()
{

   this._service.GetService('ProfileAPI/api/GetProfileStatus?profileId=', this.data.ProfileId).subscribe(
   data => {
  var IsPublic = data.isPublicAvailable;
  if(IsPublic==true)
   {
  return this.appService.GetCustomerSubscription(this.customer.UserId).subscribe(res => {
  this.addon.SubscriptionId = res.subscriptionId;
  this.addon.AddonId = "2";
  var value = ((Math.round(this.valueSal)*100)/7).toFixed(0);
  this.addon.AddonUnitPrice = Number(value);
  this.addon.AddonQuantity = 1;
  this.jobdetailsservice.AddonHirefee(this.addon).subscribe(result => {
    console.log(result);
  });
  
});
 }
 });


}

   GetSalarayDetails()
   {
    this._service.GetService('ProfileAPI/api/GetJobSalaryDetails?JobId=', this.data.jobId).subscribe(
      data => {
        this.salaryDetails = data;
        this.valueSal=this.salaryDetails.MaximumSalary;
      });
   }


  Hire() {
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
    this.schIntw.Comments = null;
    this.schIntw.ResponseStatusId = 11; // what stage it is..hired...
    this.schIntw.IsActive = null;
    this.schIntw.Rating = null;
    this.schIntw.RequiredFurtherInterview = null;
    this.schIntw.StatusChangedByUserId = this.userId;
    this.schIntw.InterviewingPerson = null;
    this.jobdetailsservice.interviewProcess(this.schIntw).subscribe(res => {
    // this.jobDetails.populateJobsStaticInfo(this.jobid);
      this.Check();
      this.eventStat.emit(null);
      console.log(res);
      }) ;
    }
}

export class addon
{
    SubscriptionId: string;
    AddonId:string;
    AddonUnitPrice:number;
    AddonQuantity:number;
}

