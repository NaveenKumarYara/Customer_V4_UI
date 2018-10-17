import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { CustomerUsers, PjTechnicalTeam } from '../../../../Postajob/models/jobPostInfo';
import { Subject } from 'rxjs/Subject'; 
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AppService } from '../../../../../app.service';
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';  
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-sharedialog',
  templateUrl: './sharedialog.component.html',
  styleUrls: ['./sharedialog.component.css']
})

export class SharedialogComponent implements OnInit{
  schIntw= new ScheduleInterview();
  @Input() userId: number;
  customerId:number;
  jobid:number;
  managersList: Observable<CustomerUsers[]>;
  selectedUserInput = new Subject<string>();
  usersloading: boolean;
  selectedUserName = '';
  teammembers: '';
  teammemberslist: CustomerUsers[];

  addedteammembers: '';
  addedteammemberslist: PjTechnicalTeam[];
  getTeammember: CustomerUsers;
  private subscription: Subscription;
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private appService: AppService) {
    this.customerId = JSON.parse(sessionStorage.getItem('customerId'));
    this.userId = JSON.parse(sessionStorage.getItem('userId'));
    this.jobid = JSON.parse(sessionStorage.getItem('jobId'));
   }


  changeDate(updateSeasonStartDate: any)  {
    if (updateSeasonStartDate) {
      this.schIntw.InterviewDate = updateSeasonStartDate;
      // $('.jsDatePicker').datepicker('hide');
    }
  }
  ngOnInit()
  {
    $('body').on('change', '#datePickerCert', function () {
      $('#datePickerCert').trigger('click');
    });
    this.getcustomerusers();
    this.teammemberslist = this.appService.getTeammembers();
    this.subscription = this.appService.teammembersChanged
      .subscribe(
      (teammemberlist: CustomerUsers[]) => {
        this.teammemberslist = teammemberlist;
        }
      );

      this.addedteammemberslist = this.appService.getaddedTeammembers();
      this.subscription = this.appService.addedteammembersChanged
        .subscribe(
        (teammemberlist: PjTechnicalTeam[]) => {
          this.addedteammemberslist = teammemberlist;
          }
        );
  }
  ScheduleInterview()
  {
this.schIntw.UserId=this.userId;
this.schIntw.JobId=this.userId;
this.schIntw.JobInterviewId=this.userId;
this.schIntw.JobResponseId=this.userId; //gemerated when sortlisted or applied
///  this.schIntw.InterviewDate=this.userId;
// this.schIntw.StartTime=this.userId;
// this.schIntw.EndTime=this.userId;
this.schIntw.InterviewTypeId=this.userId; //skype or anytype
// this.schIntw.PhoneNumber=this.userId;
  // this.schIntw.BridgeUrl=this.userId;
// this.schIntw.AccessId=this.userId;
// this.schIntw.SkypeId=this.userId;
  this.schIntw.Comments="";
 // this.schIntw.ResponseStatusId=this.userId; // what stage it is..hired...
// this.schIntw.IsActive=this.userId;
// this.schIntw.Rating=this.userId;
// this.schIntw.RequiredFurtherInterview=this.userId;
 this.schIntw.StatusChangedByUserId=this.userId;
  this.schIntw.InterviewingPerson=this.addedteammemberslist.toString();
  }
  getcustomerusers() {
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
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
export class ScheduleInterview
{ 
    public UserId: number
    public JobId: number
    public JobInterviewId: number
    public JobResponseId: number
    public InterviewDate: Date
    public StartTime: string
    public EndTime: string
    public InterviewTypeId: number
    public PhoneNumber: string
    public BridgeUrl: string
    public AccessId: string
    public SkypeId: string
    public Comments: string
    public ResponseStatusId: number
    public IsActive: boolean=true
    public Rating:number
    public RequiredFurtherInterview: boolean
    public InterviewingPerson: string
    public StatusChangedByUserId: number
   
}