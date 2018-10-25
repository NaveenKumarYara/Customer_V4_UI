import { Component, OnInit, Inject, Input, Output } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { CustomerUsers, PjTechnicalTeam } from '../../../../Postajob/models/jobPostInfo';
import { Subject } from 'rxjs/Subject';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AppService } from '../../../../../app.service';
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';
// import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import { NgbModal, NgbModule, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { JobdetailsService } from '../../../jobdetails.service';
import { EventEmitter } from 'events';
declare var $: any;

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-schedule-interview',
  templateUrl: './schedule-interview.component.html',
  styleUrls: ['./schedule-interview.component.css']
})
export class ScheduleInterviewComponent implements OnInit {
  schIntw = new ScheduleInterview();
 @Output() eventStat = new EventEmitter();
  webxRI: boolean;
  skypeRI: boolean;
  inPersonRI: boolean;
  time: NgbTimeStruct = {hour: 13, minute: 30, second: 0};
  hourStep = 1;
  minuteStep = 1;
  secondStep = 1;
  InterviewDate: any;
  @Input() userId: number;
  @Input() jobResponseId: number;
  customerUser: number;
  customerId: number;
  processSelection: number;
  @Input() jobid: number;
  managersList: Observable<CustomerUsers[]>;
  selectedUserInput = new Subject<string>();
  usersloading: boolean;
  selectedUserName = '';
  teammembers: '';
  teammemberslist: CustomerUsers[];

  addedteammembers: '';
  addedteammemberslist: any; // PjTechnicalTeam[];
  getTeammember: CustomerUsers;
  private subscription: Subscription;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private appService: AppService, private jobdetailsservice: JobdetailsService) {
    this.customerId = JSON.parse(sessionStorage.getItem('customerId'));
    this.customerUser = JSON.parse(sessionStorage.getItem('userId'));
   // this.jobid = JSON.parse(sessionStorage.getItem('jobId'));
   }
   process(val) {
// if (val === 1) {
  this.processSelection = val;
// } else if (val === 2) {

// } else {

// }
   }

  changeDate(updateSeasonStartDate: any)  {
    if (updateSeasonStartDate) {
      this.schIntw.InterviewDate = updateSeasonStartDate;
      // $('.jsDatePicker').datepicker('hide');
    }
  }
  ngOnInit() {
    $('body').on('change', '#datePickerCert', function () {
      $('#datePickerCert').trigger('click');
    });
    // $('.datepicker').datepicker({
    //   daysOfWeekDisabled: '06',
    //   startDate: new Date(),
    //   format: 'M, dd yyyy'
    // }).on('changeDate', function () {
    //   $(this).datepicker('hide');
    // });
    this.getcustomerusers();
    this.teammemberslist = this.appService.getTeammembers();
    this.subscription = this.appService.teammembersChanged
      .subscribe(
      (teammemberlist: CustomerUsers[]) => {
        this.teammemberslist = teammemberlist;
        // this.addedteammemberslist.push(this.teammemberslist.forEach(x => x.UserId));
        }
      );

      // this.addedteammemberslist = this.appService.getaddedTeammembers();
      // this.subscription = this.appService.addedteammembersChanged
      //   .subscribe(
      //   (teammemberlist: PjTechnicalTeam[]) => {
      //     this.addedteammemberslist = teammemberlist;
      //     }
      //   );
  }
  // toggleSeconds() {
  //   this.seconds = !this.seconds;
  // }
  ScheduleInterview() {
this.schIntw.UserId = null;
this.schIntw.JobId = this.data.jobId;
this.schIntw.JobInterviewId = this.userId;
this.schIntw.JobResponseId = this.data.jobResponseId; // gemerated when sortlisted or applied
this.schIntw.InterviewDate = new Date(this.InterviewDate.month + '/' + this.InterviewDate.day + '/' + this.InterviewDate.year);
  this.schIntw.StartTime = this.time.hour + ':' + this.time.minute;
// this.schIntw.EndTime=this.userId;
this.schIntw.InterviewTypeId = this.userId; // skype or anytype
// this.schIntw.PhoneNumber=this.userId;
  // this.schIntw.BridgeUrl=this.userId;
// this.schIntw.AccessId=this.userId;
// this.schIntw.SkypeId=this.userId;
  this.schIntw.Comments = '';
   this.schIntw.ResponseStatusId = 7; // what stage it is..hired...
// this.schIntw.IsActive=this.userId;
// this.schIntw.Rating=this.userId;
if (this.processSelection === 1) {
  this.schIntw.RequiredFurtherInterview = this.inPersonRI;
} else if (this.processSelection === 2) {
  this.schIntw.RequiredFurtherInterview = this.skypeRI;
  // this.schIntw.SkypeId=this.userId;
} else if (this.processSelection === 3) {
  this.schIntw.RequiredFurtherInterview = this.webxRI;
  // this.schIntw.PhoneNumber=this.userId;
}
 this.schIntw.StatusChangedByUserId = this.customerUser;
  this.schIntw.InterviewingPerson = this.teammemberslist.map(x => x.UserId).toString();
    this.jobdetailsservice.interviewProcess(this.schIntw).subscribe(res => {
      this.eventStat.emit(null);
     }) ;
}
  getcustomerusers()  {
    this.managersList = concat(
      of([]), // default items
      this.selectedUserInput.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => this.usersloading = true),
        switchMap(term => this.appService.getCustomerUsers().pipe(
          catchError(() => of([])), // empty list on error
          tap(() => this.usersloading = false)
        ))
      )
    );
  }
  changeTeam(val) {
    this.getTeammember = val;
  }
  private addTeammembers() {
    // const newDomain = new CustomerUsers();
    // newDomain.FirstName = this.selectedUserName;
    this.appService.addTeammember(this.getTeammember);
  }
  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
export class ScheduleInterview {
    public UserId: number;
    public JobId: number;
    public JobInterviewId: number;
    public JobResponseId: number;
    public InterviewDate: Date;
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
    public InterviewingPerson: string;
    public StatusChangedByUserId: number;

}
