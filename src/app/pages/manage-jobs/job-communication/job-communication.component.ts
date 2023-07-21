import { Component, OnInit, Input, EventEmitter} from '@angular/core';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap'; 
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/shared/components/services/api.service';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-job-communication',
  templateUrl: './job-communication.component.html',
  styleUrls: ['./job-communication.component.scss']
})
export class JobCommunicationComponent implements OnInit {
  _job: any = null;
  _profile: any = null
  selectedComments: any
  savenote = new Notes();
  isShown1: boolean = true ;
 isShown2: boolean = false ;
  selectedUserInput = new Subject<string>();
  @Input() isChecked: boolean = false;
  @Input() showNoteForm: boolean = false;
  @Input() showFeedbackForm: boolean = false;
  Swal = require('sweetalert2');
  options!: UploaderOptions;
  formData!: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver!: boolean;
  showJobForm = 'false';
  NId : any=[];
  fileUploadForm!: FormGroup;
  customer: any;
  candidateMailSelected = false;
  checkemail: any;
  cemailNote = new SendNoteEmailCandidate();
  profileNotesList: any;
  get job(): any {
    return this._job

  }

  @Input() set job(value: any) {
    this._job = value;
    if (value) {
      this.getcustomerusers();
      // this.grtProfileNotes();

      // this.GetJobNotes()
      console.log("ckeditor", this.selectedComments)
    }
  }
  get profile() {
    return this._profile;
  }
  @Input() set profile(val: any) {
    this._profile = val;
    this.checkemail=this.profile?.Email;
    this.grtProfileNotes();


  }

  selectedUserName: any | undefined
  usersloading?: boolean;
  // getTeammember?: CustomerUsers;
  teammemberslist: any = [];
  customercontacts: any = []
  constructor(config: NgbAccordionConfig, private apiService: ApiService, private fb: FormBuilder,) {
		// customize default values of accordions used by this component tree
    this.customer = JSON.parse(localStorage.getItem('customer')||'');
		config.closeOthers = true;
		config.type = 'info';
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
    const Swal = require('sweetalert2');
    this.fileUploadForm = this.fb.group({ 
      'NoteId': [0, Validators.required],
      'ProfileId': [0, Validators.nullValidator],
      'JobId': [this.job?.jobId, Validators.nullValidator],
      'customerUserId': [this.job?.CustomerId, Validators.required],
      'toUserId': [0, Validators.required],
      'Title':['', Validators.nullValidator],
      'Attachment': [null, Validators.nullValidator],
      'FileExtension': ['', Validators.nullValidator],
      'DocUrl': ['', Validators.nullValidator],
      'Comments': ['', Validators.nullValidator],
      'OtherInfo': ['', Validators.nullValidator],
      'Doc': ['', Validators.nullValidator],
      'StatusId': ['', Validators.nullValidator]
	});
}

  config = {
    uiColor: '#F0F3F4',
    height: '100%',
    toolbarGroups: [{
      "name": "basicstyles",
      "groups": ["basicstyles"]
    },
    {
      "name": "links",
      "groups": ["links"]
    },
    {
      "name": "paragraph",
      "groups": ["list", "blocks"]
    },
    {
      "name": "document",
      "groups": ["mode"]
    },
    {
      "name": "insert",
      "groups": ["insert"]
    },
    {
      "name": "styles",
      "groups": ["styles"]
    },
    {
      "name": "about",
      "groups": ["about"]
    }
  ],
  // Remove the redundant buttons from toolbar groups defined above.
  removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
  };
  
  ngOnInit(): void {
    console.log("customer",this.customer)
    console.log("gob", this.job)
    console.log("profile",this.profile)
    console.log("selectedComments", this.selectedComments)
    this.savenote.OtherInfo = 'General';

  }
  showNoteFormHandler() {
    this.showNoteForm = true;
  }

  hideNoteFormhandler() {
    this.showNoteForm = false;
    this.notesSaveClicked()

  }

  showFeedbackFormHandler() {
    this.showFeedbackForm = true;
  }

  hideFeedbackFormhandler() {
    this.showFeedbackForm = false;
  }
  

  titleCase(str: any) {
    return str.toLowerCase().split(' ').map(function (word: any) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
  }

  addTeammembers() {
    if (this.teammemberslist.filter((v: any) => v.UserId == this.selectedUserName).length == 0)
      this.teammemberslist.push(...this.customercontacts.filter((v: any) => v.UserId === this.selectedUserName))
    this.selectedUserName = null
  }

  deleteTeammember(x: any) {
    console.log("x", x)
    this.teammemberslist.splice(x, 1);
  }

  onEditorChange(event: any) {
    // Access the changed content
    const changedContent = event.editor.getData();
    console.log('Changed content:', changedContent);
  }
  getcustomerusers() {
    console.log("gobwwwww2", this.job)
    return this.apiService.GetProfileService("/api/GetCustomerUsers?CustomerId=", this.job.CustomerId).subscribe((res: any) => {
      console.log("customerName", res)
      this.customercontacts = res
      this.customercontacts = res.filter((i: any) => {
        return i.FirstName = this.titleCase(i.FirstName) + ' ' + this.titleCase(i.LastName) + ' - ' + this.titleCase(i.RoleName);
      })
    });
  }
  notesSaveClicked(){
    console.log('save', this.job);
    this.savenote.ProfileId = this.profile.ProfileId, 
    this.savenote.JobId = this.job.JobId, 
    this.savenote.customerUserId = this.customer.UserId, 
    // this.savenote.toUserId =  this.teammemberslist.map((x: any) => x.UserId).toString() +','+this.customer.UserId.toString(), 
    this.savenote.isCandidate = this.candidateMailSelected, 
    this.savenote.Doc = this.teammemberslist.map((x: any) => x.UserId).toString() +','+this.customer.UserId.toString(), 
    this.savenote.Comments = this.selectedComments, 
    this.savenote.statusId = this.job.StatusId 

    if(this.isShown1==true&&this.isShown2==false)
    {
      this.savenote.toUserId =  this.teammemberslist.map((x: any) => x.UserId).toString() +','+this.customer.UserId.toString(), 
     this.savenote.isCandidate=false;
     this.savenote.OtherInfo = this.savenote.OtherInfo;
     this.savenote.Doc = '';
     this.SendEmail();
    }
   
    if(this.isShown2==true&&this.isShown1==false)
    {
      this.savenote.toUserId =  this.teammemberslist.map((x: any) => x.UserId).toString() +','+this.customer.UserId.toString(), 
     this.savenote.isCandidate=true;
     this.savenote.Doc = this.customer.UserId.toString();
     this.savenote.OtherInfo = this.savenote.OtherInfo;
     this.SendCandidateEmail();
    }
   
    if(this.isShown1==true&&this.isShown2==true)
    {
     this.savenote.toUserId = this.teammemberslist.map((x:any) => x.UserId).toString()+','+this.customer.UserId.toString() +','+this.customer.UserId.toString();
     this.savenote.isCandidate=true;
     this.savenote.OtherInfo = this.savenote.OtherInfo;
     this.savenote.Doc =  this.teammemberslist.map((x:any) => x.UserId).toString()+','+this.customer.UserId.toString() +','+this.customer.UserId.toString();
     this.SendEmail();
     this.SendCandidateEmail();
   }

   let Ids = Array.from(new Set(Array.from(this.savenote.toUserId.split(','))));
   var res = new Promise<void>((resolve, reject) => { 
   Ids.forEach((value, index, array)=>
   {
     this.savenote.toUserId = value;
     this.apiService.SaveProfileNote('/api/InsertProfileNotesCustomer',this.savenote)
     .subscribe(
     (status:any) => {
       if(status>0)
       {
      
      this.teammemberslist = [];
      $('#teamMbr').val('');
      // this.get = new CustomerUsers();
      // this.clearTeamMemebers();
     
      this.NId.push(status);
   
    
       //this.SaveNotes(this.selectedComments);
       if (index === array.length -1)
       {
        
          resolve();
          // this.upload();
        }  
    
    }
     }                
     );
     
   }) 
        });
  }

  toggleShow1() {

    this.isShown1 = ! this.isShown1;
    
    }

    toggleShow2() {

      this.isShown2 = ! this.isShown2;
      
      }

SendCandidateEmail()
{
  this.cemailNote.Body = this.selectedComments;
  this.cemailNote.FullName = this.profile.FirstName;
  this.cemailNote.ToEmailID = this.profile.Email;
  this.cemailNote.FromID = "donotreply@arytic.com";
  this.cemailNote.Docs = []
  this.cemailNote.JobTitle = this.job.JobTitle
  this.cemailNote.JobId = this.job.JobId
  this.cemailNote.ApplicationName = 'Arytic'
  this.cemailNote.SenderName =  this.job.FirstName
  this.cemailNote.TouserId = this.customer.UserId
  this.cemailNote.NotesId =  0
  this.cemailNote.Subject = 'Arytic - ' + this.job.FirstName +' '+ this.job.LastName +' ' +'added note- #' + ' '+this.profile.JobId + ' ' +  this.profile.JobTitle  ;
  console.log("ceoii",this.cemailNote)

  this.apiService.postEmailService('/api/EmailForNotesNewU',this.cemailNote).subscribe(
    check=>
    {
      this.Swal(
        {
          title: 'Notes Added Successfully',
          showConfirmButton: true,
          timer: 3000,
          type: "success"
        });
        this.selectedComments = ''
        // this.teammemberslist = []
        this.savenote.OtherInfo = 'General'
        this.cemailNote = new SendNoteEmailCandidate();
        this.grtProfileNotes()
    }
  )
}

changeView() {
  this.isChecked =  ! this.isChecked;
}

SendEmail()
{
    this.teammemberslist.forEach((x:any)=>
      {
        if(x.UserId != this.customer.UserId)
        {

          this.cemailNote.Body = this.selectedComments;
          this.cemailNote.FullName = x.FirstName.split('-')[0];
          this.cemailNote.ToEmailID = x.Email;
          this.cemailNote.FromID = "donotreply@arytic.com"
          this.cemailNote.Docs = []
          this.cemailNote.JobTitle = this.job.JobTitle
          this.cemailNote.JobId = this.job.JobId
          this.cemailNote.ApplicationName = 'Arytic'
          this.cemailNote.SenderName =  this.job.FirstName
          this.cemailNote.TouserId = this.customer.UserId
          this.cemailNote.NotesId =  0
          this.cemailNote.Subject = 'Arytic - ' + this.profile.FirstName +' '+ this.profile.LastName +' ' +'added note- #' + ' '+this.profile.jobId + ' ' +  this.profile.JobTitle  ;
            this.apiService.postEmailService('/api/EmailForNotesNewU',this.cemailNote).subscribe(
              check=>
              {
              
                      this.cemailNote = new SendNoteEmailCandidate();
                 
              }
            )
        }
  
  
      }
      
      );
  
   
  

}

grtProfileNotes(){
  console.log("gobdwefgdkjprofile", this.profile)
  this.apiService.GetProfileService('/api/GetProfileNotes?profileId=',this.profile?.ProfileId+'&jobId=' + this.job?.JobId + '&cid=' +this.customer.UserId).subscribe((res)=>{
    console.log("grtProfileNotes",res)
    this.profileNotesList = res
  
  })
 
}


deleteNotes(id: any) {
  console.log("id",id)
  this.apiService.DeleteService('/api/DeleteNotes?Id=',id).subscribe((res:any)=>{
    this.Swal(
      {
        title: 'Notes deleted Successfully',
        showConfirmButton: true,
        timer: 3000,
        type: "success"
      });
      this.grtProfileNotes()
  })
}

//   saveClicked() {
//     this.savenote.ProfileId=this.job.ProfileId;
//     this.savenote.JobId = this.job.JobId;
//     this.savenote.customerUserId = this.job.UserId;
//     this.fileUploadForm.value.JobId = this.job.JobId;
//     this.fileUploadForm.value.customerUserId = this.job.UserId;
//     this.fileUploadForm.value.CustomerUserId = this.job.UserId;

//     if(this.teammemberslist.length>0)
//     {
//       this.savenote.toUserId = this.teammemberslist.map((x: any) => x.UserId).toString() +','+this.job.UserId.toString();
//       this.savenote.isCandidate=false;
//       this.savenote.Doc = '';
//     }
//     else
//     {
//       this.savenote.toUserId = this.job.UserId.toString();
//       this.savenote.isCandidate=false;
//       this.savenote.Doc = '';
//     }

//     this.savenote.Comments = this.selectedComments;
//     // this.savenote.statusId = this.data.StatusId;
//     if(this.files.length > 0)
//     {
//       this.upload();
//     }
//     else
//     {
//       this.sendNotes();
//     }
//  }
//  uploadFile(data: FormData) {
//   this.apiService.byteStorage(data).subscribe(data => {
//     this.NId.push(data);
//     if (this.files.length == this.NId.length) {

//       this.fileUploadForm.value.DocUrl = this.NId.map((x:any) => x).toString();
//       this.apiService.InsertProfileNotesNew(this.fileUploadForm.value)
//         .subscribe(
//           status => {
//             console.log('data', status)
//             // if (status > 0) {   
//             Swal(
//               {
//                 title: 'Notes Added Successfully',
//                 showConfirmButton: true,
//                 timer: 3000,
//                 type: "success"
//               });
//               this.showJobForm = 'false';
//               //this.uploader.clearQueue();
//               this.selectedComments = "";
//               // this.fileUploadForm.reset();
//               this.savenote = new Notes();
//               this.files=[];
//               this.teammemberslist=[];
//               this.selectedUserName = null;
//               // this.GetJobNotes();
//               this.showJobForm = 'false';
    
//               //this.toastr.success('Sent successfully', 'Success');
             
//               setTimeout(() => {
//                 //this.toastr.dismissToast;
//                 this.selectedComments = "";
//                 this.fileUploadForm.reset();
//                 this.savenote = new Notes();
//                 // clear files array
//               }, 3000);
//             // }
//           })

//     }
//   })
// }
//  async upload() {
//   if (this.files.length > 0) {
//     for (let i = 0; i < this.files.length; i++) {
//       let fileItem = this.files[i];
//       if (fileItem.size > 10000000) {
//         // this.toastr.error("Each File should be less than 10 MB of size.","!Oh no");
//         Swal(
//           {
//             title: 'Each File should be less than 10 MB of size.","!Oh no"',
//             showConfirmButton: true,
//             timer: 3000,
//             type: "error"
//           });
      
//         console.log("Each File should be less than 10 MB of size.");
//         return;
//       }
//     }
//     for (let j = 0; j < this.files.length; j++) {
//       let data = new FormData();
//       let request = '';
//       let fileItem = this.files[j];
//       if (this.fileUploadForm.value !== '') {
//         this.fileUploadForm.value.Title = fileItem.name;
//         this.fileUploadForm.value.DocUrl = '';
//         this.fileUploadForm.value.toUserId = this.savenote.toUserId;
//         this.fileUploadForm.value.CustomerUserId = this.savenote.customerUserId;
//         this.fileUploadForm.value.Comments = this.savenote.Comments;
//         this.fileUploadForm.value.OtherInfo = this.savenote.OtherInfo;
//         this.fileUploadForm.value.StatusId = this.savenote.statusId;
//         this.fileUploadForm.value.Doc = this.savenote.Doc;
//         this.fileUploadForm.value.NoteId = 0;
//         this.fileUploadForm.value.FileExtension = fileItem.type;
//         request = JSON.stringify(this.fileUploadForm.value);
//       }
//       data.append('Attachment', fileItem.nativeFile!);
//       data.append('fileSeq', 'seq' + j);
//       data.append('Model', request);
//       await this.uploadFile(data);
//     }
//   }
// }
// sendNotes() {
//   // let request = '';
//   this.fileUploadForm.value.Title = '';
//   this.fileUploadForm.value.DocUrl = '';
//   this.fileUploadForm.value.toUserId = this.savenote.toUserId;
//   this.fileUploadForm.value.CustomerUserId = this.savenote.customerUserId;
//   this.fileUploadForm.value.Comments = this.savenote.Comments;
//   this.fileUploadForm.value.OtherInfo = this.savenote.OtherInfo;
//   this.fileUploadForm.value.StatusId = this.savenote.statusId;
//   this.fileUploadForm.value.Doc = this.savenote.Doc;
//   this.fileUploadForm.value.NoteId=0;
//   this.fileUploadForm.value.FileExtension ='';
//   this.fileUploadForm.value.DocUrl = 'No Attachements';
//   //  request = JSON.stringify(this.fileUploadForm.value);
//    this.apiService.InsertProfileNotesNew(this.fileUploadForm.value)
//    .subscribe(
//      (res: any) => {
//       if (res <= 0) {
//         Swal(
//           {
//             title: 'Error occured while saving notes',
//             showConfirmButton: true,
//             timer: 3000,
//             type: "error"
//           });
//         return;
//       }
//      console.log('res without att', res);
//       Swal(
//         {
//           title: 'Notes Added Successfully',
//           showConfirmButton: true,
//           timer: 3000,
//           type: "success"
//         });
//         // this.GetJobNotes();
//       // this.uploader.clearQueue();
//       this.selectedComments = "";
//       // this.fileUploadForm.reset();
//       this.savenote = new Notes();
//       this.files=[];
//       this.savenote.OtherInfo = 'General';
//       this.teammemberslist=[];
//       this.selectedUserName = null;
    
//     //   this.toastr.success('Sent successfully', 'Success');
//     //   setTimeout(() => {
//     //   //  this.toastr.dismissToast;
//     //    this.selectedComments = "";
//     //    this.fileUploadForm.reset();
//     //    this.savenote = new Notes();
//     //   //  this.dialogRef.close();
//     //  }, 3000);
     
//     })
// }

  // onUploadOutput(output: UploadOutput): void {
  //   if (output.type === 'allAddedToQueue') { // when all files added in queue
  //     // uncomment this if you want to auto upload files when added
  //     // const event: UploadInput = {
  //     //   type: 'uploadAll',
  //     //   url: '/upload',
  //     //   method: 'POST',
  //     //   data: { foo: 'bar' }
  //     // };
  //     // this.uploadInput.emit(event);
  //   } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') { // add file to array when added
  //     console.log("ext",output.file.name.split('.').pop())
  //     // DocName.split('.').pop()
  //     const ext = output.file.name.split('.').pop()
  //     if(ext === 'doc' ||ext === 'docx' || ext === 'pdf'||ext === 'txt'){
  //       this.files.push(output.file);
  //     }
  //   } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
  //     // update current data in files array for uploading file
  //     const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
  //     this.files[index] = output.file;
  //   } else if (output.type === 'removed') {
  //     // remove file from array when removed
  //     this.files = this.files.filter((file: UploadFile) => file !== output.file);
  //   } else if (output.type === 'dragOver') {
  //     this.dragOver = true;
  //   } else if (output.type === 'dragOut') {
  //     this.dragOver = false;
  //   } else if (output.type === 'drop') {
  //     this.dragOver = false;
  //   }
  // }
}


export class Notes {
  public ProfileId!: Number
  public JobId!: Number;
  public customerUserId!: Number
  public statusId!: Number
  public toUserId!: string
  public isCandidate!: boolean
  public Comments!: string
  public Doc!: string
  public OtherInfo!: string
}
export class SendNoteEmailCandidate
{
  public FullName! :string
  public Body! :string
  public ToEmailID! :string
  public Subject!:string
  public FromID! :string
  public Docs! :[]
  public JobTitle! :string
  public ApplicationName! :string
  public SenderName! :string
  public TouserId! :number
  public NotesId! :number
  public JobId! :number
}



