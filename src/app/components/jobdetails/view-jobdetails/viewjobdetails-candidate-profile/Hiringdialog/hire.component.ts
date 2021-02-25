import { Component, Inject, Input, Output, EventEmitter,ViewContainerRef} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ScheduleInterview } from '../schedule-interview/schedule-interview.component';
import { JobdetailsService } from '../../../jobdetails.service';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import { AppService } from '../../../../../app.service';
import {  NgbModal, NgbModule, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../../../shared/services/api.service/api.service';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { SettingsService } from '../../../../../../settings/settings.service';
import { GetJobDetailCustomer } from '../../../../../../models/GetJobDetailCustomer';
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
  employmenttypelist: any;
  employmentTypeId: number;
  contractdurationlist:any;
  Comment: string;
  customer: any;
  salaryDetails:any;
  addon = new addon();
  valueSal:number;
  status= new JobStatus();
  IDate:any;
  jobdetailscustomer = new  GetJobDetailCustomer();
  contract:string;
  TypeId:any;
  schIntw = new ScheduleInterview();
 @Input() jobid: number;
 @Input() statusid: number;
 @Output() eventStat = new EventEmitter();
  constructor(public dialogRef: MatDialogRef<HiredialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private _service: ApiService,private appService: AppService,private jobdetailsservice: JobdetailsService,private toastr: ToastsManager, private _vcr: ViewContainerRef,private settingsService: SettingsService) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId = this.customer.CustomerId;
      this.userId = this.customer.UserId;
      this.jobid = JSON.parse(sessionStorage.getItem('jobId'));
      this.toastr.setRootViewContainerRef(_vcr);
      this.GetSalarayDetails();
      this.populateEmploymentType();
      this.populateContractduration();
   }

   ngOnInit()
   {
    $('body').on('change', '#datePickerCert', function () {
        $('#datePickerCert').trigger('click');
      });
      $('.datepicker').datepicker({ minDate: new Date() });
     
    
   }

   populateEmploymentType() {
    this.appService.getEmploymentType().subscribe(res => {
        this.employmenttypelist = res.filter(x => x.EmploymentType);
    });
}

populateContractduration() {
  this.appService.getContractduration().subscribe(res => {
    this.contractdurationlist = res.filter(x => x.ContractDuration);
  });
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
  if (this.salaryDetails.SalaryTypeId == 1)
  {
    if(this.TypeId == 2 && this.contract != null)
    {
      if(this.contract == "0-3 months")
      {
        var val1 = ((Math.round(this.valueSal)*2000*7)).toFixed(0);
        this.addon.AddonUnitPrice = Number(val1)/4;
      }
      else if(this.contract == "3-6 months")
      {
        var val2 = ((Math.round(this.valueSal)*2000*7)).toFixed(0);
        this.addon.AddonUnitPrice = Number(val2)/2;
      }
      else if(this.contract >= "6-12 months")
      {
        var val3 = ((Math.round(this.valueSal)*2000*7)).toFixed(0);
        this.addon.AddonUnitPrice = Number(val3);
      }
    }
    else if(this.TypeId != 2)
     {
    var val = ((Math.round(this.valueSal)*2000*7)).toFixed(0);
    this.addon.AddonUnitPrice = Number(val);
     }
 
  }
  else if (this.salaryDetails.SalaryTypeId == 2)
  {
    if(this.TypeId == 2 && this.contract != null)
    {
      if(this.contract == "0-3 months")
      {
        var value1 = ((Math.round(this.valueSal)*7)).toFixed(0);
        this.addon.AddonUnitPrice = Number(value1)/4;
      }
      else if(this.contract == "3-6 months")
      {
        var value2 = ((Math.round(this.valueSal)*7)).toFixed(0);
        this.addon.AddonUnitPrice = Number(value2)/2;
      }
      else if(this.contract >= "6-12 months")
      {
        var value3 = ((Math.round(this.valueSal)*7)).toFixed(0);
        this.addon.AddonUnitPrice = Number(value3);
      }
    }
    else if(this.TypeId != 2)
    {
      var value = ((Math.round(this.valueSal)*7)).toFixed(0);
      this.addon.AddonUnitPrice = Number(value);
    }
   
  }
  this.addon.AddonQuantity = 1;
   return this.jobdetailsservice.AddonHirefee(this.addon).subscribe(result => {
    this.eventStat.emit(null);
    console.log(result);
  });
  
});
 }
 });


}

PopulateJobdetail () {
  return this.jobdetailsservice.getJobDetailCustomer(this.customerId, this.data.jobId).subscribe(res => {
    this.jobdetailscustomer = res;
    this.SendStatusEmail();
  });

}

gotit(na) {
  debugger
  this.TypeId=na;
  }

  gott(n) {
    this.contract=n;
    }

   GetSalarayDetails()
   {
    this._service.GetService('ProfileAPI/api/GetJobSalaryDetails?JobId=', this.data.jobId).subscribe(
      data => {
        this.salaryDetails = data;
        this.valueSal=this.salaryDetails.MaximumSalary;
        this.TypeId = this.salaryDetails.EmploymentTypeId;
        this.contract = this.salaryDetails.ContractDuration;
      });
   }
   SendStatusEmail()
   {
     this.status.AppLink = this.settingsService.settings.CandidateLogin;
     this.status.JobStatus = 'Hired';
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
   

  Hire() {
    let sal = this.valueSal.toString();
    if((sal==undefined)||(sal==''))
    {
    this.toastr.error('Please provide the salary details','Oops');
    return false;
    }
    if((this.IDate==undefined)||(this.IDate==''))
     {
     this.toastr.error('Please provide the date details','Oops');
     return false;
     }
     else
     {

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
      this.PopulateJobdetail();
      this.toastr.success('Email Sent','Success');
      setTimeout(() => {          
          this.toastr.dismissToast; 
        }, 3000);
      this.eventStat.emit(null);
      this.dialogRef.close();
      console.log(res);
      }) ;
    }
  }
}

export class addon
{
    SubscriptionId: string;
    AddonId:string;
    AddonUnitPrice:number;
    AddonQuantity:number;
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

