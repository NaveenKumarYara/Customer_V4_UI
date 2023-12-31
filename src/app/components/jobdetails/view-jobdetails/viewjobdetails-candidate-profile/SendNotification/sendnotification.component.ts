import { distinctUntilChanged, debounceTime, switchMap, tap, catchError} from 'rxjs/operators';
import { concat } from 'rxjs/observable/concat';
import { Component, Inject,ViewContainerRef,EventEmitter,ChangeDetectorRef } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { CustomerUsers, PjTechnicalTeam } from '../../../../Postajob/models/jobPostInfo';
import { AppService } from '../../../../../app.service';
import { JobdetailsService } from '../../../jobdetails.service';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import {CustomerContacts} from '../../../../../../models/customercontacts';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { of } from 'rxjs/observable/of';
import { SettingsService } from '../../../../../../settings/settings.service';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { ApiService } from '../../../../../shared/services/api.service';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { Http } from '@angular/http';
import { async } from '@angular/core/testing';


const URL = 'http://localhost:4300/fileupload/';
declare var $: any;
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-sendnotification',
  templateUrl: './sendnotification.component.html',
  styleUrls: ['./sendnotification.component.css'],
  providers: [ApiService]
})
export class sendnotificationdialogComponent {
 managersList: Observable<CustomerUsers[]>;
 teammembers: '';
 loading = false;
 loginstyle(): void {
   this.loading = true;
 }
 isShown1: boolean = true ;
 isShown2: boolean = false ;
 isShown3: boolean = false ;
 GetContactsList : contactInfo[];
 customercontacts : CustomerContacts[];
  teammemberslist: CustomerUsers[];
  savenote = new Notes();
  NId : any=[];
  getTeammember: CustomerUsers;
  profileSharing= new ProfileShare();
  customer: any;
  fileUploadForm: FormGroup;
  AddUser:boolean= false;
  customerId: number;
  UserId:any;
  checkemail:any;
  matching:any;
  SaveInfo = new contactInfo();
  info:number;
  EmailId:any = null;
  Name:any = null;
  PStatus:any;
  usersloading: boolean;
  customerUser: number;
  selectedUserName :number;
  selectedComments:any;
  userId:number;
  filedata=new FormData();
PUpload: File;
docFile:string;
edit:any;
emailNote = new SendNoteEmail();
cemailNote = new SendNoteEmailCandidatev1();
job = new SendNoteEmail();
public file_srcs: string[] = [];
public debug_size_before: string[] = [];
public debug_size_after: string[] = [];
selectedFileNames: string[] = [];
  private subscription: Subscription;
  selectedUserInput = new Subject<string>();


  uploader:FileUploader;

  constructor( public dialogRef: MatDialogRef<sendnotificationdialogComponent>,private _http: Http,private fb: FormBuilder,private _service: ApiService,private detector: ChangeDetectorRef,@Inject(MAT_DIALOG_DATA) public data: any,private jobdetailsservice: JobdetailsService,private appService: AppService, private _vcr: ViewContainerRef, private toastr: ToastsManager, private settingsService: SettingsService) { 
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId = this.customer.CustomerId;
    this.customerUser = this.customer.UserId;
    this.matching= this.data.Matching;
    this.checkemail=this.data.Email;
    if(this.data.StatusId===4)
    {
      this.PStatus = 'Applied';
    }
    if(this.data.StatusId===5)
    {
      this.PStatus = 'ShortListed';
    }
    if(this.data.StatusId==6)
    {
      this.PStatus = 'Rejected';
    }
    if(this.data.StatusId===7)
    {
      this.PStatus = 'Scheduled Interview';
    }
    if(this.data.StatusId===8)
    {
      this.PStatus = 'Screening';
    }
    if(this.data.StatusId===9)
    {
      this.PStatus = 'WithDrawn';
    }
    if(this.data.StatusId===11)
    {
      this.PStatus = 'Hire';
    }
    if(this.data.StatusId===13)
    {
      this.PStatus = 'Uploaded';
    }
    if(this.data.StatusId===14)
    {
      this.PStatus = 'Waiting for response';
    }

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


  toggleShow1() {

    this.isShown1 = ! this.isShown1;
    
    }

    toggleShow2() {

      this.isShown2 = ! this.isShown2;
      
      }

      toggleShow3() {

        this.isShown3 = ! this.isShown3;
        
        }

  
  

  ngOnInit() {
    this.GetContacts();
    this.clearTeamMemebers();
    this.getcustomerusers();
    this.AddUser = false;
    this.info = 0;
    this.checkemail=this.data.Email;
    //this.GetInterView();
    //this.GetType();
    if(this.data.StatusId===4)
    {
      this.PStatus = 'Applied';
    }
    if(this.data.StatusId===5)
    {
      this.PStatus = 'ShortListed';
    }
    if(this.data.StatusId==6)
    {
      this.PStatus = 'Rejected';
    }
    if(this.data.StatusId===7)
    {
      this.PStatus = 'Scheduled Interview';
    }
    if(this.data.StatusId===8)
    {
      this.PStatus = 'Screening';
    }
    if(this.data.StatusId===9)
    {
      this.PStatus = 'WithDrawn';
    }
    if(this.data.StatusId===11)
    {
      this.PStatus = 'Hire';
    }
    if(this.data.StatusId===13)
    {
      this.PStatus = 'Uploaded';
    }
    if(this.data.StatusId===14)
    {
      this.PStatus = 'Waiting for response';
    }
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

  AddContacts()
  {
    if((this.Name == undefined && this.EmailId == undefined)|| (this.Name == '' && this.EmailId == ''))
    {
      this.toastr.error('Please provide the valid details!', 'Oops!');
        setTimeout(() => {
            this.toastr.dismissToast;
        }, 3000);
    }
    else
    {
    this.SaveInfo.Infoid = 0;
    this.SaveInfo.CustomerId = this.customerId;
    this.SaveInfo.UserId = this.userId;
    this.SaveInfo.Fullname = this.Name;
    this.SaveInfo.EmailId = this.EmailId;
    this.appService.AddContactInfo(this.SaveInfo).subscribe(res => {
        this.toastr.success('Added successfully', 'Success');
        setTimeout(() => {
         this.toastr.dismissToast;
         this.Name = '';
         this.EmailId= '';
         this.GetContacts();
        }, 3000);  
      
    })
  }
  }

  teamchange(val,inf)
  {
  this.AddUser= val;
  this.info = inf;
  }

  //  getcustomerusers() {
  //         this.managersList = concat(
  //           of([]), // default items
  //           this.selectedUserInput.pipe(
  //             debounceTime(200),
  //             distinctUntilChanged(),
  //             tap(() => this.usersloading = true),
  //             switchMap(term => this.appService.getCustomerUsers(this.customerId,  this.customerUser , false, term).pipe(
  //               catchError(() => of([])), // empty list on error
  //               tap(() => this.usersloading = false)
  //             ))
  //           )
  //         );
  //       }

        


getcustomerusers()
 {
   return this.appService.getCustomerContacts(this.customerId).subscribe(res => {
     //this.customercontacts = res;
       this.customercontacts =  res.filter((i) => { 

          if(i.FirstName !="Invited"  && i.FirstName != this.customer.FirstName && i.IsRemove!=true)
          {
            return i.FirstName=i.FirstName + ' ' + i.LastName + ' - ' + i.RoleName; 
          }                      
         })
      });
 }

 SaveNotes()
{
 this.savenote.ProfileId=this.data.ProfileId;
 this.savenote.JobId = this.data.jobId;
 this.savenote.customerUserId = this.customerUser;

 if(this.isShown1==true&&this.isShown2==false)
 {
  this.savenote.toUserId = this.teammemberslist.map(x => x.UserId).toString() +','+this.customerUser.toString();
  this.savenote.isCandidate=false;
  this.savenote.OtherInfo = this.savenote.OtherInfo;
  this.savenote.Doc = '';
  this.SendEmail();
 }

 if(this.isShown2==true&&this.isShown1==false)
 {
  this.savenote.toUserId=this.data.CUserId.toString()+','+this.customerUser.toString(); 
  this.savenote.isCandidate=true;
  this.savenote.Doc = this.data.CUserId.toString()+','+this.customerUser.toString();
  this.savenote.OtherInfo = this.savenote.OtherInfo;
  this.SendCandidateEmail();
 }

 if(this.isShown1==true&&this.isShown2==true)
 {
  this.savenote.toUserId = this.teammemberslist.map(x => x.UserId).toString()+','+this.data.CUserId.toString() +','+this.customerUser.toString();
  this.savenote.isCandidate=true;
  this.savenote.OtherInfo = this.savenote.OtherInfo;
  this.savenote.Doc =  this.teammemberslist.map(x => x.UserId).toString()+','+this.data.CUserId.toString() +','+this.customerUser.toString();
  this.SendEmail();
  this.SendCandidateEmail();
}

 this.savenote.Comments=this.selectedComments;
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
   
    this.NId.push(status);
 
  
     //this.SaveNotes(this.selectedComments);
     if (index === array.length -1)
     {
      
        resolve();
        this.upload();
      }  
  
  }
   }                
   );
   
 }) 
      });
	  


  
}


  changeTeam(val) {
    this.getTeammember = val;
    //this.GetJobAssigned(val.UserId,val.Email);
  }

 async upload()
 {
  this.NId.forEach(async element => {
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
       await this.uploadFile(data);
      }      
    }


  });


  this.uploader.clearQueue();
 
   this.toastr.success('Sent successfully', 'Success');
   setTimeout(() => {
    this.toastr.dismissToast;
    this.selectedComments = "";
    //this.savenote = new Notes();
    this.dialogRef.close();
  }, 3000);
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



 uploadMultiple(status){
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
      this.fileUploadForm.value.toUserId = this.customer.UserId;
      this.fileUploadForm.value.NoteId=status;
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
//  uploadMultiple() {
//    let request = '';
//    const formData = new FormData();
//    this.uploader.queue.forEach(element => {
//      if (this.fileUploadForm.value !== '') {
//       this.fileUploadForm.value.Title = element._file.name;
//       this.fileUploadForm.value.DocUrl = '';
//       this.fileUploadForm.value.FileExtension =element._file.type;
//        request = JSON.stringify(this.fileUploadForm.value);
//        }     
//       formData.append('Attachment', element._file);
//       formData.append('Model', request);
//       this.filedata= formData;
//       this._service.byteStorage(this.filedata, 'ProfileAPI/api/InsertProfileAttachments').subscribe(data => {
//         this.dialogRef.close();   
//         }); 
//       }); 
   
     
      
    
//  }

SendCandidateEmail()
{
  this.cemailNote.Body = this.selectedComments;
  this.cemailNote.FullName = this.data.FullName;
  this.cemailNote.ToEmailID = this.data.Email;
  this.cemailNote.Subject = 'Arytic - ' + this.customer.FirstName +' '+ this.customer.LastName +' ' +'added note- #' + ' '+this.data.jobId + ' ' +  this.data.JobTitle  ;
  this.cemailNote.Body = this.selectedComments;
  this.cemailNote.FromID = this.customer.Email;
  this.cemailNote.Docs = [];
  this.cemailNote.JobTitle = this.data.JobTitle;
  this.cemailNote.JobId = this.data.jobId;
  this.cemailNote.ApplicationName = 'Arytic';
  this.cemailNote.SenderName = this.customer.FirstName;
  this.cemailNote.TouserId = this.customer.UserId;
  this.cemailNote.NotesId = 0;
  this._service.PostService(this.cemailNote,'EmailV1API/api/EmailForNotesNewU').subscribe(
    check=>
    {
  
         
            this.cemailNote = new SendNoteEmailCandidatev1();
       
    }
  )
}

// SendEmailold()
// {
//     this.teammemberslist.forEach(x=>
//       {
//         if(x.UserId != this.customer.UserId)
//         {

//           this.cemailNote.Body = this.selectedComments;
//           this.cemailNote.FullName = x.FirstName.split('-')[0];
//           this.cemailNote.ToEmailID = x.Email;
//           this.cemailNote.Subject = 'Arytic - ' + this.customer.FirstName +' '+ this.customer.LastName +' ' +'added note- #' + ' '+this.data.jobId + ' ' +  this.data.JobTitle  ;
//             this._service.PostService(this.cemailNote,'EmailApi/api/EmailForNotes').subscribe(
//               check=>
//               {
            
                   
//                       this.cemailNote = new SendNoteEmailCandidate();
                 
//               }
//             )
//         }
  
  
//       }
      
//       );
  
   
  

// }

SendEmail() {
  this.teammemberslist.forEach((x: any) => {
    if (x.UserId != this.customer.UserId) {

      this.cemailNote.Body = this.selectedComments;
      this.cemailNote.FullName = x.FirstName.split('-')[0];
      this.cemailNote.ToEmailID = x.Email;
      this.cemailNote.FromID = "donotreply@arytic.com";
      this.cemailNote.Docs = [];
      this.cemailNote.JobTitle = this.data.JobTitle;
      this.cemailNote.JobId = this.data.jobId;
      this.cemailNote.ApplicationName = 'Arytic';
      this.cemailNote.SenderName = this.customer.FirstName;
      this.cemailNote.TouserId = this.customer.UserId;
      this.cemailNote.NotesId = 0;
      this.cemailNote.Subject = 'Arytic - ' + this.customer.FirstName +' '+ this.customer.LastName +' ' +'added note- #' + ' '+this.data.jobId + ' ' +  this.data.JobTitle  ;
      debugger
      this._service.PostService(this.cemailNote,'EmailV1API/api/EmailForNotesNewU').subscribe(
        check => {

          this.cemailNote = new SendNoteEmailCandidatev1();

        }
      )
    }
  });
}







 ShareProfile() {
   if(this.info = 0)
  {
      this.profileSharing.InviteFriendId = 0;
      this.profileSharing.FromuserId = this.customerUser;
      this.profileSharing.ToUserId = this.teammemberslist.map(x => x.UserId).toString();
      this.profileSharing.ToEmailId = this.teammemberslist.map(x => x.Email).toString();
      this.profileSharing.ApplicationName = 'Arytic';
      this.profileSharing.AppLink = this.settingsService.settings.CustomerAppLogin+';Preid='+this.data.ProfileId+';Id='+this.data.jobId+';Cid='+ this.customerId;
      this.profileSharing.Comments=this.selectedComments;
   }
   if(this.info = 1)
   {
    this.profileSharing.InviteFriendId = 0;
    this.profileSharing.FromuserId = this.customerUser;
    this.profileSharing.ToUserId = this.data.CUserId;
    this.profileSharing.ToEmailId = this.data.Email;
    this.profileSharing.ApplicationName = 'Arytic';
    this.profileSharing.AppLink = this.settingsService.settings.CandidateAppLogin;
    this.profileSharing.Comments=this.selectedComments;
   }
   if(this.profileSharing.ToEmailId == "" && this.profileSharing.Comments == undefined)
   {
     this.toastr.error('Please provide the valid details!', 'Oops!');
       setTimeout(() => {
           this.toastr.dismissToast;
       }, 3000);
   }
   else if(this.profileSharing.Comments == undefined)
   {
     this.toastr.error('Please provide Comments!', 'Oops!');
       setTimeout(() => {
           this.toastr.dismissToast;
       }, 3000);
   }
   if(this.profileSharing.ToEmailId != "" && this.profileSharing.Comments != "")
    {
   this.jobdetailsservice.ProfileShareInvite(this.profileSharing).subscribe(data => {
   if (data >=0) {
    //this.inviteform.reset();
    this.teammemberslist = [];
    $('#teamMbr').val('');
    //this.selectedUserName = ''
    
    this.getTeammember = new CustomerUsers();
    this.profileSharing= new ProfileShare();
    this.clearTeamMemebers();
    this.selectedComments = "";
    this.EmailId = " ";
    this.toastr.success('Sent successfully', 'Success');
    setTimeout(() => {
     this.toastr.dismissToast;
     //this.SaveNotes(this.selectedComments);
    
    }, 3000);      
     }
   }, error => {
        console.log('error:', JSON.stringify(error));
       });
    }
  }
 }
  
 


export class ProfileShare {
  InviteFriendId : number;
  FromuserId: number;
  ToUserId: string;
  Comments:string;
  AppLink: string;
  ToEmailId: string;
  FromEmailId:string;
  ApplicationName:string;
  readonly modules: ReadonlyArray<{}> = []
}

export class contactInfo
{
  Infoid :number;
  CustomerId: number;
  UserId: number;
  Fullname: string;
  EmailId: string;
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

export class SendNoteEmail
{
  public FullName :string
  public Body :string
  public ToEmailID :string
  public NotesId:number
  public ToUserId:number
  public Subject:string
}

export class SendNoteEmailCandidatev1 {
  public FullName: string
  public Body: string
  public ToEmailID: string
  public Subject: string
  public FromID: string
  public Docs:any
  public JobTitle: string
  public ApplicationName: string
  public SenderName: string
  public TouserId: number
  public NotesId: number
  public JobId: number
}


export class SendNoteEmailCandidate
{
  public FullName :string
  public Body :string
  public ToEmailID :string
  public Subject:string
}