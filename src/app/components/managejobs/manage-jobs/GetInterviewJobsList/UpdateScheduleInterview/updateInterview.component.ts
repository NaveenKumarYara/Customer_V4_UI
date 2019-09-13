import { Component, OnInit, Inject, Input, Output, ViewChild,ViewContainerRef } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CustomerUsers, PjTechnicalTeam } from '../../../../Postajob/models/jobPostInfo';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import {ScheduleType} from '../../../../jobdetails/models/ScheduleType';
import {InterviewListComponent} from '../interviewList.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AppService } from '../../../../../app.service';
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';
// import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import {  NgbModal, NgbModule, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { ManageJobService } from '../../../managejobs.service';
import {getDetails} from '../../../models/getDetails';
import { JobdetailsService } from '../../../../jobdetails/jobdetails.service';
import { EventEmitter } from 'events';
import { NgForm } from '@angular/forms';
import { Time } from '@angular/common';
import { aboutcompany } from '../../../../company-profile/aboutcompany/aboutcompany';
declare var $: any;

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-update-interview',
  templateUrl: './updateInterview.component.html',
  styleUrls: ['./updateInterview.component.css']
})
export class UpdateInterviewComponent implements OnInit {
  @ViewChild('schedule') schedule: NgForm;
  schIntw = new ScheduleInterview();
 @Output() eventStat = new EventEmitter();
  webxRI: boolean;
  skypeId: string;
  furtherInterview: boolean;
  travelExpense: boolean;
  phoneNumber: string;
  dailInNumber: string;
  bridgeUrl: string;
  time: NgbTimeStruct = {hour: 13, minute: 30, second: 0};
  hourStep = 1;
  minuteStep = 1;
  secondStep = 1;
  CurrentTime:any;
  // typeId: number;
  InterviewDate: any;
  selDate:any;
  @Input() userId: number;
  @Input() jobResponseId: number;
  customerUser: number;
  customerId: number;
  interviewId:number;
  processSelection: number;
  @Input() jobid: number;
  jobinterviewlist = new getDetails();
  managersList: Observable<CustomerUsers[]>;
  selectedUserInput = new Subject<string>();
  usersloading: boolean;
  selectedUserName = '';
  teammembers: '';
  list:boolean=false;
  teammemberslist: CustomerUsers[];
  typeList: ScheduleType[];
  jobInterview: ScheduleType;
  // addedteammembers: '';
  // addedteammemberslist: any; // PjTechnicalTeam[];
  getTeammember: CustomerUsers;
  customer: any;
  minDate:any;
  private subscription: Subscription;
  constructor(   private router: Router,public dialogRef: MatDialogRef<UpdateInterviewComponent>,@Inject(MAT_DIALOG_DATA) public data: any , private appService: AppService, private jobdetailsservice: JobdetailsService,private toastr: ToastsManager,private _vcr: ViewContainerRef,private managejobservice: ManageJobService) {
    // this.customerId = JSON.parse(sessionStorage.getItem('customerId'));
    // this.customerUser = JSON.parse(sessionStorage.getItem('userId'));
    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };
    let d: Date = new Date(this.data.iDate);
    this.InterviewDate = {year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()};  
    this.CurrentTime = this.data.iTime.split(':') ;
    let ti = this.CurrentTime[0];
    let mi = this.CurrentTime[1];
    this.time  = {hour: ti, minute: mi, second:0}    
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId = this.customer.CustomerId;
    this.customerUser = this.customer.UserId;
    this.toastr.setRootViewContainerRef(_vcr);
     // this.jobid = JSON.parse(sessionStorage.getItem('jobId'));
    // const current = new Date();
    // config.minDate = { year: current.getFullYear(), month:
    // current.getMonth() + 1, day: current.getDate() };
    // config.outsideDays = 'hidden';

    // this.clearTeamMemebers();
   }
   process(val) {
  // if (val > 0) {
    this.processSelection = val;
    // this.typeId = val;
  // }
  //  else if (this.typeId > 0) {
  //   this.processSelection = this.typeId;
  // }

   }

   GetInterviewDetails(jobId,ProfileId)
   {
    return this.managejobservice.GetInterViewDetails(jobId,ProfileId).subscribe(res => {
      this.jobinterviewlist = res;
      if(this.teammemberslist.length==0)
      {
        this.bridgeUrl = this.jobinterviewlist.BridgeUrl;
        this.skypeId = this.jobinterviewlist.SkypeId;
        this.phoneNumber = this.jobinterviewlist.PhoneNumber;
        this.dailInNumber = this.jobinterviewlist.AccessId;
        this.furtherInterview = this.jobinterviewlist.RequiredFurtherInterview;
        this.travelExpense = this.jobinterviewlist.TravelExpence;
        this.selectedUserName = this.jobinterviewlist.FirstName;
      }
    }); 

   }

  changeDate(updateSeasonStartDate: any)  {
    if (updateSeasonStartDate) {
      this.schIntw.InterviewDate = updateSeasonStartDate;
      // $('.jsDatePicker').datepicker('hide');
    }
  }
  // changeInterviewType(event) {
  //   this.typeId = event;
  // }
 clearTeamMemebers() {
  for (let i = 0; i <= 10; i++) {
    const index = i;
    this.appService.deleteTeammember(index);
  }
  this.deleteTeammember(0);
 }

  ngOnInit() {
    this.clearTeamMemebers();
    this.getcustomerusers();
    this.GetInterView();
    this.GetInterviewDetails(this.data.jobId,this.data.ProfileId);
    this.GetType();
    this.teammemberslist = this.appService.getTeammembers();
    this.subscription = this.appService.teammembersChanged
      .subscribe(
      (teammemberlist: CustomerUsers[]) => {
        this.teammemberslist = teammemberlist;
        }
      );

    $('body').on('change', '#datePickerCert', function () {
      $('#datePickerCert').trigger('click');
    });
    $('.datepicker').datepicker({ minDate: new Date() });

//     if (this.processSelection == null || this.processSelection === undefined) {
//   this.schIntw.InterviewTypeId = 1;
// } else {
//   this.schIntw.InterviewTypeId = this.processSelection;
// }


  }
  // toggleSeconds() {
  //   this.seconds = !this.seconds;
  // }
ScheduleInterview() {
if(this.schedule.invalid||this.selectedUserName == '')
{
    this.toastr.error('Please provide the valid details','Oops')
}
if (this.schedule.valid) {
this.schIntw.JobInterviewId = this.data.InterviewId;
this.schIntw.UserId = this.data.userId;
this.schIntw.JobId = this.data.jobId;
this.schIntw.ProfileId = this.data.ProfileId;
this.schIntw.JobResponseId = this.data.jobResponseId; 
this.schIntw.InterviewDatevalue =  new Date(this.InterviewDate.month + '/' + this.InterviewDate.day + '/' + this.InterviewDate.year).toDateString();// gemerated when sortlisted or applied
//this.schIntw.InterviewDate = new Date(this.InterviewDate.month + '/' + this.InterviewDate.day + '/' + this.InterviewDate.year);
  this.schIntw.StartTime = this.time.hour + ':' + this.time.minute;
// this.schIntw.EndTime=this.userId;
// skype or anytype
// this.schIntw.PhoneNumber=this.userId;
  // this.schIntw.BridgeUrl=this.userId;
// this.schIntw.AccessId=this.userId;
// this.schIntw.SkypeId=this.userId;
  this.schIntw.Comments = '';
   this.schIntw.ResponseStatusId = 7;
  //  if (this.processSelection == null || this.processSelection === undefined) {
  //   this.schIntw.InterviewTypeId = this.typeId;
  // } else if (this.processSelection != null) {
    this.schIntw.InterviewTypeId = this.processSelection;
  // }
  // what stage it is..hired...
// this.schIntw.IsActive=this.userId;
// this.schIntw.Rating=this.userId;

if (this.processSelection === 1) {
  // this.schIntw.RequiredFurtherInterview = this.inPersonRI;
  this.schIntw.TravelExpense = this.travelExpense;

} else if (this.processSelection === 2) {
  this.schIntw.PhoneNumber = this.phoneNumber;
    // this.schIntw.RequiredFurtherInterview = this.phone;
  // this.schIntw.SkypeId=this.userId;

} else if (this.processSelection === 3) {
  this.schIntw.SkypeId = this.skypeId;
  // this.schIntw.RequiredFurtherInterview = this.skypeRI;
  // this.schIntw.PhoneNumber=this.userId;
} else if (this.processSelection === 4) {
  this.schIntw.AccessId = this.dailInNumber;
  this.schIntw.BridgeUrl = this.bridgeUrl;
  // this.schIntw.RequiredFurtherInterview = this.webxRI;
  // this.schIntw.PhoneNumber=this.userId;
}
this.schIntw.RequiredFurtherInterview = this.furtherInterview;
this.schIntw.TravelExpense = this.travelExpense;
this.schIntw.StatusChangedByUserId = this.customerUser;
if(this.teammemberslist.length>0)
{
  this.schIntw.InterviewingPerson = this.teammemberslist.map(x => x.UserId).toString();
}
else
{
  this.schIntw.InterviewingPerson = this.jobinterviewlist.ModifiedBy;
}

  this.managejobservice.UpdateinterviewProcess(this.schIntw).subscribe(res => {
      this.eventStat.emit(null);
      this.schIntw = new ScheduleInterview();
      this.jobinterviewlist= new getDetails();
      this.dialogRef.close('submit');
     }) ;
    } else {
      return false;
    }
}

GetId(val)
{
  if(val>0)
  {
    this.interviewId = val;
  }
  else 
  {
    this.interviewId = 1;
  }

}

getcustomerusers() {
  this.managersList = concat(
    of([]), // default items
    this.selectedUserInput.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => this.usersloading = true),
      switchMap(term => this.appService.getCustomerUsers(this.customerId,  this.customerUser , false, term).pipe(
        catchError(() => of([])), // empty list on error
        tap(() => this.usersloading = false)
      ))
    )
  );
}
  GetType() {
   return this.jobdetailsservice.getInterviewtype(this.data.jobId).subscribe(res => {
    this.jobInterview = res;
    if(this.jobInterview.InterviewTypeId == null)
    {
      this.jobInterview.InterviewTypeId = 1; 
      this.processSelection = 1;
    }
    else if(this.jobInterview.InterviewTypeId != null)
    {
      this.processSelection = this.jobInterview.InterviewTypeId;
    }
    this.GetId(this.processSelection);
   });
   }
GetInterView() {
  return this.jobdetailsservice.getInterViewTypes().subscribe(res => {
 this.typeList = res;
  });
    }


  changeTeam(val) {
    this.getTeammember = val;
  }
  public addTeammembers() {
    this.list= true;
    // const newDomain = new CustomerUsers();
    // newDomain.FirstName = this.selectedUserName;
    if (this.getTeammember !== undefined) {
    const check = this.teamExists(this.getTeammember, this.teammemberslist);
    if (check === false) {
    this.appService.addTeammember(this.getTeammember);
    }
     // this.selectedUserName = '';
     $('#teamMbr').val('');
  }
  }
  teamExists(team, list) {​
    return list.some(function(elem) {
         return elem.UserId === team.UserId;
    });
 }
  private deleteTeammember(index: number) {
    this.appService.deleteTeammember(index);
  }

  private deletemember() {
   this.list = true;
   this.selectedUserName = '';
  }


  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
export class ScheduleInterview {
    public UserId: number;
    public JobId: number;
    public ProfileId:number;
    public JobInterviewId: number;
    public JobResponseId: number;
    public InterviewDate: Date;
    public InterviewDatevalue:string;
    public StartTime: string;
    public EndTime: string;
    public InterviewTypeId: number;
    public PhoneNumber: string;
    public BridgeUrl: string;
    public AccessId: string;
    public SkypeId: string;
    public Comments: string;
    public ResponseStatusId: number;
    public IsActive = true;
    public Rating: number;
    public RequiredFurtherInterview: boolean;
    public TravelExpense: boolean;
    public InterviewingPerson: string;
    public StatusChangedByUserId: number;

}
