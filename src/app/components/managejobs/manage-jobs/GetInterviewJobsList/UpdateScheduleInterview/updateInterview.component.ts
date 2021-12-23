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
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {CustomerContacts} from '../../../../../../models/customercontacts';

import { Time } from '@angular/common';
import { aboutcompany } from '../../../../company-profile/aboutcompany/aboutcompany';
declare var $: any;
const URL = 'http://localhost:4300/fileupload/';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { Notes } from '../../../../jobdetails/view-jobdetails/viewjobdetails-candidate-profile/schedule-interview/schedule-interview.component';
import { ApiService } from '../../../../../shared/services/api.service';
import { element } from 'protractor';
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
  showadd:any;
  loading = false;
  loginstyle(): void {
    this.loading = true;
  }
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
  customercontacts : CustomerContacts[];
  selectedUserInput = new Subject<string>();
  usersloading: boolean;
  selectedUserName :number;
  teammembers: '';
  list:boolean=false;
  uploader:FileUploader;
  teammemberslist: CustomerUsers[];
  typeList: ScheduleType[];
  jobInterview: ScheduleType;
  // addedteammembers: '';
  // addedteammemberslist: any; // PjTechnicalTeam[];
  getTeammember: CustomerUsers;
  customer: any;
  minDate:any;
  savenote = new Notes();
  NId : any=[];
  AddUser:boolean= true;
  fileUploadForm: FormGroup;
  info:number;
  Comment:any;
  isShown1: boolean = true ;
  isShown2: boolean = false ;
  isShown3: boolean = false ;
  private subscription: Subscription;
  checkemail: any;

  constructor(   private router: Router,private _service: ApiService,public dialogRef: MatDialogRef<UpdateInterviewComponent>,private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any , private appService: AppService, private jobdetailsservice: JobdetailsService,private toastr: ToastsManager,private _vcr: ViewContainerRef,private managejobservice: ManageJobService) {
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
    this._service.GetService("ProfileAPI/api/GetProfileEmail?profileId=", this.data.ProfileId).subscribe((email) => {
      this.checkemail = email.UserName;
    })
    return this.managejobservice.GetInterViewDetails(jobId,ProfileId).subscribe(res => {
      this.jobinterviewlist = res;
      this.savenote.OtherInfo = 'Technical';
      if(this.teammemberslist.length==0)
      {
        this.bridgeUrl = this.jobinterviewlist.BridgeUrl;
        this.skypeId = this.jobinterviewlist.SkypeId;
        this.phoneNumber = this.jobinterviewlist.PhoneNumber;
        this.dailInNumber = this.jobinterviewlist.AccessId;
        this.furtherInterview = this.jobinterviewlist.RequiredFurtherInterview;
        this.travelExpense = this.jobinterviewlist.TravelExpence;
        this.GetId(this.jobinterviewlist.InterviewTypeId);
        this.info = 1;
        this.Comment = this.jobinterviewlist.Comments;
        //this.selectedUserName = this.jobinterviewlist.;
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

 GetCustomerContacts()
 {
   return this.appService.getCustomerContacts(this.customerId).subscribe(res => {
     this.customercontacts = res;
     this.customercontacts = this.customercontacts.filter(
      name=> name.FirstName !="Invited" && name.IsRemove == false);
      this.selectedUserName= this.customercontacts[0].UserId;
 });
 }

  ngOnInit() {
    this.clearTeamMemebers();
    this.getcustomerusers();
    this.GetInterView();
    this.GetCustomerContacts();
    this.GetInterviewDetails(this.data.jobId,this.data.ProfileId);
    this.GetType();
    this.teammemberslist = this.appService.getTeammembers();
    this.subscription = this.appService.teammembersChanged
      .subscribe(
      (teammemberlist: CustomerUsers[]) => {
        this.teammemberslist = teammemberlist;
        }
      );

      this.uploader = new FileUploader({
        url: URL,
        disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
        formatDataFunctionIsAsync: true,
        allowedFileType: ['image', 'pdf','doc'],
        
        formatDataFunction: async (item) => {
          return new Promise( (resolve, reject) => {
            resolve({
              name: item._file.name,
              length: item._file.size,
              contentType: item._file.type,
              date: new Date()
            });
          });
        }
      });
  
      this.fileUploadForm = this.fb.group({ 
        'NoteId': [0, Validators.required],
        'ProfileId': [this.data.ProfileId, Validators.nullValidator],
        'JobId': [this.data.jobId, Validators.nullValidator],
        'customerUserId': [this.customerUser, Validators.required],
        'toUserId': [0, Validators.required],
        'Title':['', Validators.nullValidator],
        'Attachment': [null, Validators.nullValidator],
        'FileExtension': ['', Validators.nullValidator],
        'DocUrl': ['', Validators.nullValidator]
      });

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
if(this.schedule.invalid)
{
    this.toastr.error('Please provide the valid details','Oops')
}
if (this.schedule.valid) {
this.schIntw.JobInterviewId = this.jobinterviewlist.JobInterviewId;
this.schIntw.UserId = this.data.userId;
this.schIntw.JobId = this.data.jobId;
this.schIntw.ProfileId = this.data.ProfileId;
this.schIntw.JobResponseId = this.data.jobResponseId; 
this.schIntw.InterviewDatevalue =  new Date(this.InterviewDate.month + '/' + this.InterviewDate.day + '/' + this.InterviewDate.year).toDateString();// gemerated when sortlisted or applied
//this.schIntw.InterviewDate = new Date(this.InterviewDate.month + '/' + this.InterviewDate.day + '/' + this.InterviewDate.year);
let time;
if(this.time.minute === 0)
{
  time = '00'; 
}
else
{
  time = this.time.minute;
}
  this.schIntw.StartTime = this.time.hour + ':' + time;
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

this.schIntw.Comments = this.Comment;

  this.managejobservice.UpdateinterviewProcess(this.schIntw).subscribe(res => {
      this.eventStat.emit(null);
      this.schIntw = new ScheduleInterview();
      this.jobinterviewlist= new getDetails();
      this.dialogRef.close('submit');
      this.SaveNotes();
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


    SaveNotes()
{
 this.savenote.ProfileId=this.data.ProfileId;
 this.savenote.JobId = this.data.jobId;
 this.savenote.customerUserId = this.customerUser;
//  if(this.isShown1==true&&this.isShown2==false)
//  {
//   this.savenote.toUserId = this.teammemberslist.map(x => x.UserId).toString() +','+this.customer.UserId.toString();
//   this.savenote.isCandidate=false;
//   this.savenote.OtherInfo = this.savenote.OtherInfo;
//   this.savenote.Doc = '';
//  }
//  if(this.isShown2==true&&this.isShown1==false)
//  {
//   this.savenote.toUserId=this.data.userId.toString()+','+this.customer.UserId.toString(); 
//   this.savenote.isCandidate=true;
//   this.savenote.OtherInfo = ' ';
//   this.savenote.Doc = this.data.userId.toString()+','+this.customer.UserId.toString(); 
//  }
 if(this.isShown1==true)
 {
  this.savenote.toUserId = this.teammemberslist.map(x => x.UserId).toString()+','+this.data.userId.toString() +','+this.customer.UserId.toString();
  this.savenote.isCandidate=true;
  this.savenote.OtherInfo = this.savenote.OtherInfo;
  this.savenote.Doc = this.teammemberslist.map(x => x.UserId).toString()+','+this.data.userId.toString() +','+this.customer.UserId.toString();
 }

 else
 {
  this.savenote.toUserId=this.data.userId.toString()+','+this.customer.UserId.toString(); 
  this.savenote.isCandidate=true;
  this.savenote.OtherInfo = 'Technical';
  this.savenote.Doc = this.data.userId.toString()+','+this.customer.UserId.toString(); 
 }

 this.savenote.Comments=this.Comment;
 this.savenote.statusId = 7;


 let Ids = Array.from(this.savenote.toUserId.split(','));
 var res = new Promise<void>((resolve, reject) => { 
 Ids.forEach((value, index, array)=>
 {
    this.savenote.toUserId = value;
    debugger
   this.jobdetailsservice.SaveProfileNote(this.savenote)
   .subscribe(
   status => {
     if(status>0)
     {
    this.teammemberslist = [];
    $('#teamMbr').val('');
    this.getTeammember = new CustomerUsers();
    this.clearTeamMemebers();
    this.Comment = "";
    //this.EmailId = " ";
    this.NId.push(status);
    
  
     //this.SaveNotes(this.selectedComments);
     if (index === array.length -1)
     {
    
        resolve();
      }  
    
  }
   }                
   );
   
 }) 
      });
	  
res.then(() => {

  this.NId.forEach(element => {
    if(this.uploader.queue.length>0)
    {
      for (let i = 0; i < this.uploader.queue.length; i++) {
        let fileItem = this.uploader.queue[i]._file;
        if(fileItem.size > 10000000){
          this.toastr.error("Each File should be less than 10 MB of size.","!Oh no");
          return;
        }
      }
      for (let j = 0; j < this.uploader.queue.length; j++) {
        let data = new FormData();
        let request = '';
        let fileItem = this.uploader.queue[j]._file;
        if (this.fileUploadForm.value !== '') {
          this.fileUploadForm.value.Title = fileItem.name;
          this.fileUploadForm.value.DocUrl = '';
          this.fileUploadForm.value.toUserId = this.customer.UserId.toString();
          this.fileUploadForm.value.NoteId=element;
          this.fileUploadForm.value.FileExtension =fileItem.type;
           request = JSON.stringify(this.fileUploadForm.value);
         }     
        data.append('Attachment', fileItem);
        data.append('fileSeq', 'seq'+j);
        data.append('Model', request);
        this.uploadFile(data);
      }
      
    }
  });
  this.uploader.clearQueue();
   this.toastr.success('Sent successfully', 'Success');
   setTimeout(() => {
    this.toastr.dismissToast;
    //this.savenote = new Notes();
    this.eventStat.emit(null);
    this.dialogRef.close();
  }, 3000);
  
 
  });
}


uploadMultiple(){
  for (let i = 0; i < this.uploader.queue.length; i++) {
    let fileItem = this.uploader.queue[i]._file;
    if(fileItem.size > 10000000){
      this.toastr.error("Each File should be less than 10 MB of size.","!Oh no");
      return;
    }
  }
  for (let j = 0; j < this.uploader.queue.length; j++) {
    let data = new FormData();
    let request = '';
    let fileItem = this.uploader.queue[j]._file;
    if (this.fileUploadForm.value !== '') {
      this.fileUploadForm.value.Title = fileItem.name;
      this.fileUploadForm.value.DocUrl = '';
      this.fileUploadForm.value.FileExtension =fileItem.type;
       request = JSON.stringify(this.fileUploadForm.value);
     }     
    data.append('Attachment', fileItem);
    data.append('fileSeq', 'seq'+j);
    data.append('Model', request);
    this.uploadFile(data);
  }
  this.uploader.clearQueue();
}

uploadFile(data: FormData){
this._service.byteStorage(data, 'ProfileAPI/api/InsertProfileAttachments').subscribe(data => {
  //this.dialogRef.close();
  this.savenote = new Notes();   
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
   //this.selectedUserName = '';
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
    public IsUploaded: boolean;
    public IsInvited: boolean;
}
