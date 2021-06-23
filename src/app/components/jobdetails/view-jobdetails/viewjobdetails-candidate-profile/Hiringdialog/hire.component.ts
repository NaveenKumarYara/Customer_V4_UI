import { Component, Inject, Input, Output, EventEmitter,ViewContainerRef} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ScheduleInterview } from '../schedule-interview/schedule-interview.component';
import { JobdetailsService } from '../../../jobdetails.service';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import { AppService } from '../../../../../app.service';
import {  NgbModal, NgbModule, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../../../shared/services/api.service/api.service';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SettingsService } from '../../../../../../settings/settings.service';
import { GetJobDetailCustomer } from '../../../../../../models/GetJobDetailCustomer';
import {CustomerContacts} from '../../../../../../models/customercontacts';
import { CustomerUsers, PjTechnicalTeam } from '../../../../Postajob/models/jobPostInfo';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
declare var $: any;
const URL = 'http://localhost:4300/fileupload/';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-hiredialog',
  templateUrl: './hire.component.html',
  styleUrls: ['./hire.component.css'],
  providers: [ApiService]
})
export class HiredialogComponent {
  customerId: any;
  userId: any;
  loading = false;
  loginstyle(): void {
    this.loading = true;
  }
  employmenttypelist: any;
  employmentTypeId: number;
  contractdurationlist:any;
  savenote = new Notes();
  NId : any=[];
  Comment: string;
  customer: any;
  salaryDetails:any;
  addon = new addon();
  valueSal:number;
  status= new JobStatus();
  IDate:any;
  info:number;
  managersList: Observable<CustomerUsers[]>;
  teammembers: '';
  GetContactsList : contactInfo[];
  customercontacts : CustomerContacts[];
   teammemberslist: CustomerUsers[];
   getTeammember: CustomerUsers;
   AddUser:boolean= true;
  jobdetailscustomer = new  GetJobDetailCustomer();
  contract:string;
  TypeId:any;
  checkemail:any;
  matching:any;
  selectedUserInput = new Subject<string>();
  private subscription: Subscription;
  fileUploadForm: FormGroup;
  schIntw = new ScheduleInterview();
  public file_srcs: string[] = [];
public debug_size_before: string[] = [];
public debug_size_after: string[] = [];
selectedFileNames: string[] = [];
 isShown1: boolean = true ;
 isShown2: boolean = false ;
 isShown3: boolean = false ;
 @Input() jobid: number;
 @Input() statusid: number;
 uploader:FileUploader;
 @Output() eventStat = new EventEmitter();
  constructor(public dialogRef: MatDialogRef<HiredialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder,private _service: ApiService,private appService: AppService,private jobdetailsservice: JobdetailsService,private toastr: ToastsManager, private _vcr: ViewContainerRef,private settingsService: SettingsService) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId = this.customer.CustomerId;
      this.userId = this.customer.UserId;
      this.jobid = JSON.parse(sessionStorage.getItem('jobId'));
      this.toastr.setRootViewContainerRef(_vcr);
      this.GetSalarayDetails();
      this.populateEmploymentType();
      this.populateContractduration();
      this.GetContacts();
      this.clearTeamMemebers();
      this.getcustomerusers();
      this.matching= this.data.Matching;
      this.AddUser = true;
      this.info = 1;
      this.checkemail=this.data.Email;
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
        'customerUserId': [this.customer.UserId, Validators.required],
        'toUserId': [0, Validators.required],
        'Title':['', Validators.nullValidator],
        'Attachment': [null, Validators.nullValidator],
        'FileExtension': ['', Validators.nullValidator],
        'DocUrl': ['', Validators.nullValidator]
      });
   
      this.savenote.OtherInfo = "General";
   }

   ngOnInit()
   {

 
    //this.GetInterView();
    //this.GetType();
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
     
 
     
   }

   toggleShow1() {

    this.isShown1 = ! this.isShown1;
    
    }

    toggleShow2() {

      this.isShown2 = ! this.isShown2;
      
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
  //debugger
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

   
   onItemDeleted(index){ 
    this.GetContactsList.splice(index, 1); 
}

  // DeleteContactInfo(Id)
  // {
  //   return this.appService.DeleteShareContactInfo(Id).subscribe(res => {
  //     if(res == 0)
  //     {
  //       this.GetContacts();
  //     }    
  //   });
  // }

  GetContacts()
  {
    return this.appService.GetContactInfo(this.customerId,0).subscribe(res => {
      this.GetContactsList = res;
    });
  }

  teamchange(val,inf)
  {
  this.AddUser= val;
  this.info = inf;
  }

  getcustomerusers()
 {
  return this.appService.getCustomerContacts(this.customerId).subscribe(res => {
    this.customercontacts = res;
    this.customercontacts =  res.filter((i) => { 

     if(i.FirstName !="Invited" && i.FirstName != this.customer.FirstName)
     {
       return i.FirstName=i.FirstName + ' ' + i.LastName + ' - ' + i.RoleName; 
     }                      
    })
 });
 }

  
  changeTeam(val) {
    this.getTeammember = val;
  }

  clearTeamMemebers() {
    for (let i = 0; i <= 10; i++) {
      const index = i;
      this.appService.deleteTeammember(index);
    }
    this.deleteTeammember(0);
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
  private deleteTeammember(index: number) {
    this.appService.deleteTeammember(index);
  }
  teamExists(team, list)
   {
    return list.some(function(elem) {
         return elem.UserId === team.UserId;
    });
 }

 
   

 SaveNotes()
{
 this.savenote.ProfileId=this.data.ProfileId;
 this.savenote.JobId = this.data.jobId;
 this.savenote.customerUserId = this.customer.UserId;
 if(this.isShown1==true&&this.isShown2==false)
 {
  this.savenote.toUserId = this.teammemberslist.map(x => x.UserId).toString() +','+this.customer.UserId.toString();
  this.savenote.isCandidate=false;
  this.savenote.OtherInfo = this.savenote.OtherInfo;
  this.savenote.Doc = '';
 }
 if(this.isShown2==true&&this.isShown1==false)
 {
  this.savenote.toUserId=this.data.CUserId.toString()+','+this.customer.UserId.toString(); 
  this.savenote.isCandidate=true;
  this.savenote.OtherInfo = ' ';
  this.savenote.Doc = this.data.CUserId.toString()+','+this.customer.UserId.toString(); 
 }
 if(this.isShown1==true&&this.isShown2==true)
 {
  this.savenote.toUserId = this.teammemberslist.map(x => x.UserId).toString()+','+this.data.CUserId.toString() +','+this.customer.UserId.toString();
  this.savenote.isCandidate=true;
  this.savenote.OtherInfo = this.savenote.OtherInfo;
  this.savenote.Doc = this.teammemberslist.map(x => x.UserId).toString()+','+this.data.CUserId.toString() +','+this.customer.UserId.toString();
 }
 if(this.isShown1==false&&this.isShown2==false)
 {
   this.savenote.toUserId = this.customer.UserId.toString();
  this.savenote.isCandidate= false;
  this.savenote.OtherInfo = 'Hired';
  this.savenote.Doc = this.customer.UserId.toString();
 }
 this.savenote.Comments=this.Comment;
 this.savenote.statusId = this.data.StatusId;

 let Ids = Array.from(this.savenote.toUserId.split(','));
 var res = new Promise<void>((resolve, reject) => { 
 Ids.forEach((value, index, array)=>
 {
    this.savenote.toUserId = value;
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
  this.dialogRef.close();   
  }); 
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
    this.schIntw.Comments = this.Comment;
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
      this.SaveNotes();
      this.toastr.success('Email Sent','Success');
      setTimeout(() => {          
          this.toastr.dismissToast; 
        }, 3000);
      this.eventStat.emit(null);
      //this.dialogRef.close();
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

export class contactInfo
{
  Infoid :number;
  CustomerId: number;
  UserId: number;
  Fullname: string;
  EmailId: string;
}


