import { Component, OnInit, Inject, Input, Output, ViewChild,ViewContainerRef } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CustomerUsers, PjTechnicalTeam } from '../../../../Postajob/models/jobPostInfo';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import {ScheduleType} from '../../../models/ScheduleType';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import {CustomerContacts} from '../../../../../../models/customercontacts';
import { AppService } from '../../../../../app.service';
import { ResetComponent } from '../../../../ResetPassword/resetpassword.component';
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';
// import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import {  NgbModal, NgbModule, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { JobdetailsService } from '../../../jobdetails.service';
import { EventEmitter } from 'events';
import { NgForm } from '@angular/forms';
import {Options} from '../schedule-interview/options';
import { SettingsService } from '../../../../../../settings/settings.service';
import { GetJobDetailCustomer } from '../../../../../../models/GetJobDetailCustomer';
import { ApiService } from '../../../../../shared/services/api.service/api.service';
declare var $: any;
const URL = 'http://localhost:4300/fileupload/';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-schedule-interview',
  templateUrl: './schedule-interview.component.html',
  styleUrls: ['./schedule-interview.component.css'],
  providers: [ApiService]
})
export class ScheduleInterviewComponent implements OnInit {
  @ViewChild('schedule') schedule: NgForm;
  selectedOption:Options = new Options(1, 'Skype' );
  options = [
    new Options(1, 'Skype' ),
     new Options(2, 'WebEX' ),
     new Options(3, 'Zoom Link'),
      new Options(4, 'Other' )
  ];
  schIntw = new ScheduleInterview();
  status = new JobInterviewStatus();
 @Output() eventStat = new EventEmitter();
 jobdetailscustomer = new  GetJobDetailCustomer();
 loading = false;
 loginstyle(): void {
   this.loading = true;
 }
  webxRI: boolean;
  skypeId: string;
  Addform: FormGroup;
  Comment: string;
  furtherInterview: boolean;
  travelExpense: boolean;
  phoneNumber: string;
  dailInNumber: string;
  show : any = false;
  Value: number;
  Forgotform: any;
  result :any;
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"; 
  bridgeUrl: string;
  time: NgbTimeStruct = {hour: 13, minute: 30, second: 0};
  hourStep = 1;
  minuteStep = 1;
  secondStep = 1;
  checkemail:any;
  matching:any;
  showadd:boolean=false;
  // typeId: number;
  InterviewDate: any;
  @Input() userId: number;
  @Input() jobResponseId: number;
  customerUser: number;
  customerId: number;
  interviewId:number;
  processSelection: number;
  uploader:FileUploader;
  @Input() jobid: number;
  managersList: Observable<CustomerUsers[]>;
  customercontacts : CustomerContacts[];
  selectedUserInput = new Subject<string>();
  usersloading: boolean;
  selectedUserName :number;
  teammembers: '';
  teammemberslist: CustomerUsers[];
  typeList: ScheduleType[];
  savenote = new Notes();
  jobInterview: ScheduleType;
  AddUser:boolean= true;
  fileUploadForm: FormGroup;
  info:number;
  isShown1: boolean = true ;
  isShown2: boolean = false ;
  isShown3: boolean = false ;

  // addedteammembers: '';
  // addedteammemberslist: any; // PjTechnicalTeam[];
  getTeammember: CustomerUsers;
  customer: any;
  private subscription: Subscription;
  constructor( public dialogRef: MatDialogRef<ScheduleInterviewComponent>,@Inject(MAT_DIALOG_DATA) public data: any , private appService: AppService,private _service: ApiService, private jobdetailsservice: JobdetailsService, private fb: FormBuilder, private toastr: ToastsManager, private _vcr: ViewContainerRef,private settingsService: SettingsService) {
    // this.customerId = JSON.parse(sessionStorage.getItem('customerId'));
    // this.customerUser = JSON.parse(sessionStorage.getItem('userId'));
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId = this.customer.CustomerId;
    this.customerUser = this.customer.UserId;
    this.toastr.setRootViewContainerRef(_vcr);
    this.matching= this.data.Matching;
    this.AddUser = true;
    this.info = 1;
    this.checkemail=this.data.Email;
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

   getValue(optionid) {
    this.selectedOption = this.options.filter((item)=> item.id == optionid)[0];
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
      this.customercontacts =  res.filter((i) => { 

        if(i.FirstName !="Invited"  && i.FirstName != this.customer.FirstName)
        {
          return i.FirstName=i.FirstName + ' ' + i.LastName + ' - ' + i.RoleName; 
        }                      
       })
      //this.selectedUserName= this.customercontacts[0].UserId;
  });
  }

  ngOnInit() {
    this.show = false;
    this.showadd=false;
    this.savenote.OtherInfo = "General";
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
    this.Addform = this.fb.group({
      'CandidateIdentifier':  ['', Validators.compose([Validators.nullValidator])],
      'CustomerId': ['', Validators.compose([Validators.nullValidator])],
      'UserId'  : ['', Validators.compose([Validators.nullValidator])],    
      'FirstName': ['', Validators.compose([Validators.required])],   
      'LastName': ['', Validators.compose([Validators.required])],
      'PhoneNumber': ['',  Validators.compose([Validators.nullValidator])],   
      'ContactEmail'   : ['', Validators.compose([Validators.required])],
      'Password': ['', Validators.compose([Validators.nullValidator])],                   
      'UserRoleId':['', Validators.compose([Validators.nullValidator])],   
      'IsActive':[ '', Validators.compose([Validators.nullValidator])],    
    });
    this.Forgotform = this.fb.group({
      'EmailId': ['', Validators.compose([Validators.required])],  
    });


    this.clearTeamMemebers();
    this.getcustomerusers();
    this.GetInterView();
    this.GetType();
    this.GetCustomerContacts();
    
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

  
  teamchange(val,inf)
  {
  this.AddUser= val;
  this.info = inf;
  }

ScheduleInterview() {
if(this.schedule.invalid)
{
    this.toastr.error('Please provide the valid details','Oops')
}
if (this.schedule.valid) {
this.schIntw.UserId = null;
this.schIntw.JobId = this.data.jobId;
this.schIntw.ProfileId = this.data.ProfileId;
this.schIntw.JobInterviewId = 0;
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
  this.schIntw.AccessId = this.dailInNumber;
  this.schIntw.BridgeUrl = this.bridgeUrl;
  // this.schIntw.RequiredFurtherInterview = this.skypeRI;
  // this.schIntw.PhoneNumber=this.userId;
 } 
//else if (this.processSelection === 4) {
//   this.schIntw.AccessId = this.dailInNumber;
//   this.schIntw.BridgeUrl = this.bridgeUrl;
//   // this.schIntw.RequiredFurtherInterview = this.webxRI;
//   // this.schIntw.PhoneNumber=this.userId;
// }
this.schIntw.RequiredFurtherInterview = this.furtherInterview;
this.schIntw.TravelExpense = this.travelExpense;
this.schIntw.StatusChangedByUserId = this.customerUser;
this.schIntw.Comments = this.Comment;
if(this.selectedUserName === undefined || this.selectedUserName === null)
{
  this.selectedUserName=this.customer.UserId;
  this.schIntw.InterviewingPerson = this.selectedUserName.toString();
}
else
{
  this.schIntw.InterviewingPerson = this.selectedUserName.toString();
}
  this.jobdetailsservice.interviewProcess(this.schIntw).subscribe(res => {
    this.PopulateJobdetail();
    this.SaveNotes();
     }) ;
    } else {
      return false;
    }
}


toggleShow1() {

  this.isShown1 = ! this.isShown1;
  
  }

  toggleShow2() {

    this.isShown2 = ! this.isShown2;
    
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

SaveNotes()
{
 this.savenote.ProfileId=this.data.ProfileId;
 this.savenote.JobId = this.data.jobId;
 this.savenote.customerUserId = this.customerUser;
 if(this.isShown1==true&&this.isShown2==false)
 {
  this.savenote.toUserId = this.teammemberslist.map(x => x.UserId).toString() +','+this.customer.UserId.toString();
  this.savenote.isCandidate=false;
  this.savenote.OtherInfo = this.savenote.OtherInfo;
  this.savenote.Doc = '';
 }
 if(this.isShown2==true&&this.isShown1==false)
 {
  this.savenote.toUserId=this.data.userId.toString()+','+this.customer.UserId.toString(); 
  this.savenote.isCandidate=true;
  this.savenote.OtherInfo = ' ';
  this.savenote.Doc = this.data.userId.toString()+','+this.customer.UserId.toString(); 
 }
 if(this.isShown1==true&&this.isShown2==true)
 {
  this.savenote.toUserId = this.teammemberslist.map(x => x.UserId).toString()+','+this.data.userId.toString() +','+this.customer.UserId.toString();
  this.savenote.isCandidate=true;
  this.savenote.OtherInfo = this.savenote.OtherInfo;
  this.savenote.Doc = this.teammemberslist.map(x => x.UserId).toString()+','+this.data.userId.toString() +','+this.customer.UserId.toString();
 }
 this.savenote.Comments=this.Comment;
 this.savenote.statusId = 7;

 this.jobdetailsservice.SaveProfileNote(this.savenote)
 .subscribe(
 status => {
   if(status>0)
   {
  this.teammemberslist = [];
  $('#teamMbr').val('');
  //this.selectedUserName = ''
  this.getTeammember = new CustomerUsers();
  this.clearTeamMemebers();
  this.Comment = "";
  this.toastr.success('Sent successfully', 'Success');
  setTimeout(() => {
   this.toastr.dismissToast;
   if(this.uploader.queue.length>0)
   {
    this.fileUploadForm.value.NoteId=status;
    this.fileUploadForm.value.toUserId = this.savenote.toUserId;
    this.uploadMultiple();
   }
   else
   {
     this.dialogRef.close();
   }

   //this.SaveNotes(this.selectedComments);
 
  }, 3000);   
}
 }                
 );
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
  this.dialogRef.close();   
  }); 
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
  this.status.Date = new Date(this.InterviewDate.month + '/' + this.InterviewDate.day + '/' + this.InterviewDate.year).toDateString() +'@'+ this.time.hour + ':' + this.time.minute;
  this.status.JobStatus = 'Scheduled Interview';
  if (this.processSelection === 1) {
    this.status.InterviewType = "In-Person";
    this.status.InterviewDetails = "Face2Face";
  
  } else if (this.processSelection === 2) {
    this.status.InterviewType = "Phone";
    this.status.InterviewDetails =  this.phoneNumber;
  
  } 
  else if (this.processSelection === 3) {
    this.status.InterviewType = "Video-Conference";
    if(this.skypeId != undefined && this.skypeId != '')
    {
      this.status.InterviewDetails =  this.skypeId;
    }
    else
    {
      this.status.InterviewDetails =  this.dailInNumber + this.bridgeUrl;
    }
   
   } 
  this.status.FromEmail = this.customer.Email;
  this.status.ToEmailID = this.data.Email;
  this.status.FullName = this.data.FullName;
  this.status.JobTitle = this.jobdetailscustomer.JobInfo.JobTitle;
  this.status.JobLocation = this.jobdetailscustomer.JobLocation[0].CityName + ','+ this.jobdetailscustomer.JobLocation[0].StateName;
  this.appService.SendJobInterviewStatus(this.status)
  .subscribe(
  status => {
     this.toastr.success('Email Sent','Success');
        setTimeout(() => {          
            this.toastr.dismissToast; 
            this.eventStat.emit(null);
            this.schIntw = new ScheduleInterview();
            this.dialogRef.close();
          }, 3000);
         
       } 
                  
  );
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
  PopulateRoles(val)
  {
   this.Value= val;
  }
  ResetUser()
  {
    this.show = false;
    this.Addform.reset();            
  }

  SaveUser()
  {
    if(this.Addform.invalid)
    {
      this.Addform.controls['FirstName'].markAsTouched()
      this.Addform.controls['LastName'].markAsTouched()
      this.Addform.controls['ContactEmail'].markAsTouched()
      this.toastr.error('Please provide the valid details!', 'Oops!');
        setTimeout(() => {
            this.toastr.dismissToast;
        }, 3000);
    }
    else if(this.result.UserId>0)
    {  
      this.show = true;    
    }
    else if(this.result.UserId==0)
    {
      this.Addform.value.UserId = 0;
      this.Addform.value.CustomerId = this.customerId;
      this.Addform.value.Password = 123456;
      this.Addform.value.UserRoleId = this.Value?this.Value:"8";
      this.Addform.value.IsActive = true;
        this.appService.addCustomerUser(this.Addform.value)
        .subscribe(
        data => {         
        if(data>0)
        {   
        this.Forgotform.value.EmailId = this.Addform.value.ContactEmail;
        this.appService.ActivateCustomerUser(this.Forgotform.value)
        .subscribe(
        data1 => {
           this.toastr.success('Please check your email to reset the password','Success');
              setTimeout(() => { 
                  this.Addform.reset(); 
                  this.showadd=false;           
                  this.toastr.dismissToast; 
                  this.GetCustomerContacts();  
                }, 3000);
               
             } 
                        
        );
        }  
      });
    }
  }
  GetEmailValidate()
  {
    this.show = false;
    this.appService.validateemail(this.Addform.value.ContactEmail)
    .subscribe(
    data => {
      this.result = data;
      if(this.result.UserId>0&&this.result.CustomerId>0)
      {  
        this.show = true;    
      }
    })
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


export class JobInterviewStatus
{
    public FullName :string
    public AppLink :string
    public JobStatus :string
    public ToEmailID :string
    public InterviewType :string
    public InterviewDetails :string
    public JobLocation :string
    public Date :string
    public  FromEmail :string
    public JobTitle :string
}


export class Notes{
  public ProfileId :Number
  public JobId :Number
  public customerUserId:Number
  public statusId :Number
  public toUserId :string
  public isCandidate:boolean
  public Comments :string
  public Doc: string
  public OtherInfo: string
}