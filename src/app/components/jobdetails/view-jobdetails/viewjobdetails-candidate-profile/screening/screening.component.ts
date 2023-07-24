import { Component, Inject, Input, Output, EventEmitter,ViewContainerRef, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import { CustomerUsers, PjTechnicalTeam } from '../../../../Postajob/models/jobPostInfo';
import { ScheduleInterview } from '../schedule-interview/schedule-interview.component';
import { JobdetailsService } from '../../../jobdetails.service';
import { AppService } from '../../../../../app.service';
import { SettingsService } from '../../../../../../settings/settings.service';
import { GetJobDetailCustomer } from '../../../../../../models/GetJobDetailCustomer';
import {CustomerContacts} from '../../../../../../models/customercontacts';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { ApiService } from '../../../../../shared/services/api.service';
const URL = 'http://localhost:4300/fileupload/';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-screendialog',
  templateUrl: './screening.component.html',
  styleUrls: ['./screening.component.css'],
  providers: [ApiService]
})
export class screeningdialogComponent implements OnInit {
  public file_srcs: string[] = [];
public debug_size_before: string[] = [];
public debug_size_after: string[] = [];
selectedFileNames: string[] = [];
  fileUploadForm: FormGroup;
 isShown1: boolean = true ;
 isShown2: boolean = false ;
 isShown3: boolean = false ;
  uploader:FileUploader;
  customerId: any;
  userId: any;
  NId : any=[];
  Comment: string;
  customer: any;
  loading = false;
  loginstyle(): void {
    this.loading = true;
  }
  checkemail:any;
  matching:any;
  managersList: Observable<CustomerUsers[]>;
  teammembers: '';
  GetContactsList : contactInfo[];
  customercontacts : CustomerContacts[];
   teammemberslist: CustomerUsers[];
   getTeammember: CustomerUsers;
   AddUser:boolean= true;
  status= new JobStatus();
  savenote = new Notes();
  schIntw = new ScheduleInterview();
  jobdetailscustomer = new  GetJobDetailCustomer();
 @Input() jobid: number;
 @Input() statusid: number;
 @Output() eventStat = new EventEmitter();
 info:number;
 EmailId:any = null;
 Name:any = null;
 usersloading: boolean;
 customerUser: number;
 selectedUserName :number;
 selectedComments:any;
 private subscription: Subscription;
 selectedUserInput = new Subject<string>();
  constructor(public dialogRef: MatDialogRef<screeningdialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder,private _service: ApiService, private jobdetailsservice: JobdetailsService,private appService: AppService,private settingsService: SettingsService,private toastr: ToastsManager, private _vcr: ViewContainerRef) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId = this.customer.CustomerId;
      this.userId = this.customer.UserId;
      this.checkemail=this.data.Email;
      this.matching= this.data.Matching;
      this.jobid = JSON.parse(sessionStorage.getItem('jobId'));
      this.toastr.setRootViewContainerRef(_vcr);
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
   
      this.savenote.OtherInfo = "General";
   }

   PopulateJobdetail () {
    return this.jobdetailsservice.getJobDetailCustomer(this.customerId, this.data.jobId).subscribe(res => {
      this.jobdetailscustomer = res;
      this.eventStat.emit(null);
        //this.SaveNotes();
      this.SendStatusEmail();
    });
  
  }

  toggleShow1() {

    this.isShown1 = ! this.isShown1;
    
    }

    toggleShow2() {

      this.isShown2 = ! this.isShown2;
      
      }

  ngOnInit() {
    this.GetContacts();
    this.clearTeamMemebers();
    this.getcustomerusers();
    this.matching= this.data.Matching;
    this.AddUser = true;
    this.info = 1;
    this.checkemail=this.data.Email;
    //this.GetInterView();
    //this.GetType();
    this.teammemberslist = this.appService.getTeammembers();
    this.subscription = this.appService.teammembersChanged
      .subscribe(
      (teammemberlist: CustomerUsers[]) => {
        this.teammemberslist = teammemberlist;
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

      if(i.FirstName !="Invited"  && i.FirstName != this.customer.FirstName && i.IsRemove!=true)
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

   SendStatusEmail()
   {
       //this.status.ToEmailID = this.data.Email;
    
       this.status.appLink = this.settingsService.settings.CandidateLogin;
       this.status.jobStatus = 'Screening';
       this.status.fromEmail = this.customer.Email;
       this.status.toEmailId = this.data.Email;
       this.status.fullName = this.data.FullName;
       this.status.jobTitle = this.jobdetailscustomer.JobInfo.JobTitle;
       this.status.jobLocation = this.jobdetailscustomer.JobLocation[0].CityName;
       this.status.jobId = this.data.jobId.toString();
       this.status.applicationName = 'Arytic';
       this.status.updatedBy = this.customer.FirstName + ' ' + this.customer.LastName;
       this.status.companyName = this.jobdetailscustomer.JobInfo.CompanyName;
     this.appService.SendJobStatus(this.status)
     .subscribe(
     status => {
      this.eventStat.emit(null);
        this.SaveNotes();
        // this.toastr.success('Email Sent','Success');
        //    setTimeout(() => {          
        //        this.toastr.dismissToast; 
        //        //this.eventStat.emit(null);
        //        this.SaveNotes();
        //        //this.dialogRef.close();   
        //      }, 3000);
            
          } 
                     
     );
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
     this.savenote.OtherInfo = 'Screening';
     this.savenote.Doc = this.customer.UserId.toString();
    }

    this.savenote.Comments=this.selectedComments;
    this.savenote.statusId = 8;
    //this.savenote.Doc = '';
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
       this.selectedComments = "";
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
     }); 
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
    this.schIntw.Comments = this.selectedComments;
    this.schIntw.ResponseStatusId =8; // what stage it is..hired...
    this.schIntw.IsActive = null;
    this.schIntw.Rating = null;
    this.schIntw.RequiredFurtherInterview = null;
    this.schIntw.StatusChangedByUserId = this.userId;
    this.schIntw.InterviewingPerson = null;
    this.jobdetailsservice.interviewProcess(this.schIntw).subscribe(res => {
        this.PopulateJobdetail();      
        //this.SaveNotes();
      console.log(res);
      }) ;
    }
}


export class JobStatus
{
  fullName: string
  appLink: string
  jobStatus: string
  toEmailId: string
  jobLocation: string
  companyName: string
  applicationName: string
  fromEmail: string
  jobId: string
  jobTitle: string
  updatedBy: string
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

export class contactInfo
{
  Infoid :number;
  CustomerId: number;
  UserId: number;
  Fullname: string;
  EmailId: string;
}
