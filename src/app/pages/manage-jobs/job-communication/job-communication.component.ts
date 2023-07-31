import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/shared/components/services/api.service';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import * as FileSaver from "file-saver";



@Component({
  selector: 'app-job-communication',
  templateUrl: './job-communication.component.html',
  styleUrls: ['./job-communication.component.scss']
})
export class JobCommunicationComponent implements OnInit {
  _job: any = null;
  _profile: any = null
  selectedComments: any
  selectedFeedBackComments: any
  savenote = new Notes();
  feedback = new feedback();
  emailNote = new SendNoteEmail();
  isShown1: boolean = true;
  isShown2: boolean = false;
  isShown3: boolean = true;
  isShown4: boolean = false;
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
  NId: any = [];
  fileUploadForm!: FormGroup;
  customer: any;
  candidateMailSelected = false;
  checkemail: any;
  cemailNote = new SendNoteEmailCandidate();
  profileNotesList: any;
  getTeammember!: CustomerUsers;
  feedbackOptions: any = [];
  feedbackList: any;

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
    this.checkemail = this.profile?.Email;
    this.grtProfileNotes();
    this.getFeedBack()


  }

  selectedUserName: any | undefined
  selectedFeedbackUserName: any
  usersloading?: boolean;
  // getTeammember?: CustomerUsers;
  teammemberslist: any = [];
  feedBackTeammemberslist: any = []
  customercontacts: any = []
  constructor(config: NgbAccordionConfig, private apiService: ApiService, private fb: FormBuilder,) {
    // customize default values of accordions used by this component tree
    this.customer = JSON.parse(localStorage.getItem('customer') || '');
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
      'Title': ['', Validators.nullValidator],
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
    console.log("customer", this.customer)
    console.log("gob", this.job)
    console.log("profile", this.profile)
    console.log("selectedComments", this.selectedComments)
    this.savenote.OtherInfo = 'General';
    this.feedback.FeedbackOption = 'Selected';

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
    this.sentFeedback()
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

  addFeedbackTeammembers() {
    if (this.feedBackTeammemberslist.filter((v: any) => v.UserId == this.selectedFeedbackUserName).length == 0)
      this.feedBackTeammemberslist.push(...this.customercontacts.filter((v: any) => v.UserId === this.selectedFeedbackUserName))
    console.log("addFeedbackTeammembers", this.feedBackTeammemberslist)
    this.selectedFeedbackUserName = null
  }

  deleteTeammember(x: any) {
    console.log("x", x)
    this.teammemberslist.splice(x, 1);
  }
  deletefeedBackTeammember(x: any) {
    console.log("x", x)
    this.feedBackTeammemberslist.splice(x, 1);
  }
  onEditorChange(event: any) {
    // Access the changed content
    const changedContent = event.editor.getData();
    console.log('Changed content:', changedContent);
  }

  onFeedbackEditorChange(event: any) {
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

  notesSaveClicked() {
    console.log('save', this.job);
    this.savenote.ProfileId = this.profile.ProfileId,
      this.savenote.JobId = this.job.JobId,
      this.savenote.customerUserId = this.customer.UserId,
      // this.savenote.toUserId =  this.teammemberslist.map((x: any) => x.UserId).toString() +','+this.customer.UserId.toString(), 
      this.savenote.isCandidate = this.candidateMailSelected,
      this.savenote.Doc = this.teammemberslist.map((x: any) => x.UserId).toString() + ',' + this.customer.UserId.toString(),
      this.savenote.Comments = this.selectedComments,
      this.savenote.statusId = this.job.StatusId

    if (this.isShown1 == true && this.isShown2 == false) {
      this.savenote.toUserId = this.teammemberslist.map((x: any) => x.UserId).toString() + ',' + this.customer.UserId.toString(),
        this.savenote.isCandidate = false;
      this.savenote.OtherInfo = this.savenote.OtherInfo;
      this.savenote.Doc = '';
      this.SendEmail();
    }

    if (this.isShown2 == true && this.isShown1 == false) {
      this.savenote.toUserId = this.teammemberslist.map((x: any) => x.UserId).toString() + ',' + this.customer.UserId.toString(),
        this.savenote.isCandidate = true;
      this.savenote.Doc = this.customer.UserId.toString();
      this.savenote.OtherInfo = this.savenote.OtherInfo;
      this.SendCandidateEmail();
    }

    if (this.isShown1 == true && this.isShown2 == true) {
      this.savenote.toUserId = this.teammemberslist.map((x: any) => x.UserId).toString() + ',' + this.customer.UserId.toString() + ',' + this.customer.UserId.toString();
      this.savenote.isCandidate = true;
      this.savenote.OtherInfo = this.savenote.OtherInfo;
      this.savenote.Doc = this.teammemberslist.map((x: any) => x.UserId).toString() + ',' + this.customer.UserId.toString() + ',' + this.customer.UserId.toString();
      this.SendEmail();
      this.SendCandidateEmail();
    }

    let Ids = Array.from(new Set(Array.from(this.savenote.toUserId.split(','))));
    var res = new Promise<void>((resolve, reject) => {
      Ids.forEach((value, index, array) => {
        this.savenote.toUserId = value;
        this.apiService.SaveProfileNote('/api/InsertProfileNotesCustomer', this.savenote)
          .subscribe(
            (status: any) => {
              if (status > 0) {
                this.teammemberslist = [];
                $('#teamMbr').val('');
                // this.get = new CustomerUsers();
                // this.clearTeamMemebers();
                this.NId.push(status);
                //this.SaveNotes(this.selectedComments);
                if (index === array.length - 1) {

                  resolve();
                  // this.upload();
                }

              }
            }
          );

      })
    });
  }

  
  DownloadDocument(d:any){
    console.log("data",d)
    console.log("JobNotes",this.feedbackList)
  
    let fileDat = this.feedbackList.find((x:any)=>x.attachments.DocName === d);
    let fileExt:any;
    console.log("dddddddd",fileDat)
  
    
    this.apiService.GetProfileService("/api/GetNoteFilesDownload?url=", d.DocUrl).subscribe((fileData) => {
      
      // let exp = d.split("aryticDP")[0];
      console.log("fileDta",fileData)
      // 
      let Name = d.DocName.split(".")[0];
      fileExt = d.DocName.split(".").pop();
        // this.toastr.success("Downloading!", "Success!");
        // setTimeout(() => {
        //   this.toastr.dismissToast;
        // }, 3000);
  
      
  
      if (fileExt == "pdf") {
        let byteArr = this.base64ToArrayBuffer(fileData);
        let blob = new Blob([byteArr], { type: "application/pdf" });
        FileSaver.saveAs(blob, Name);
      }
      if (fileExt == "png" || fileExt == "jpeg") {
        let byteArr = this.base64ToArrayBuffer(fileData);
        let blob = new Blob([byteArr], { type: "application/image" });
        FileSaver.saveAs(blob, Name);
      } else if (fileExt == "doc" || fileExt == "docx" || fileExt == "txt") {
        let byteArr = this.base64ToArrayBuffer(fileData);
        let blob = new Blob([byteArr], { type: "application/pdf" });
        FileSaver.saveAs(blob, Name);
      }
    });
  }

  base64ToArrayBuffer(base64:any) {
    const binary_string = window.atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  toggleShow1() {

    this.isShown1 = !this.isShown1;

  }

  toggleShow2() {

    this.isShown2 = !this.isShown2;

  }
  toggleShow3() {

    this.isShown3 = !this.isShown3;

  }

  toggleShow4() {

    this.isShown4 = !this.isShown4;

  }

  SendCandidateEmail() {
    this.cemailNote.Body = this.selectedComments;
    this.cemailNote.FullName = this.profile.FirstName;
    this.cemailNote.ToEmailID = this.profile.Email;
    this.cemailNote.FromID = "donotreply@arytic.com";
    this.cemailNote.Docs = []
    this.cemailNote.JobTitle = this.job.JobTitle
    this.cemailNote.JobId = this.job.JobId
    this.cemailNote.ApplicationName = 'Arytic'
    this.cemailNote.SenderName = this.job.FirstName
    this.cemailNote.TouserId = this.customer.UserId
    this.cemailNote.NotesId = 0
    this.cemailNote.Subject = 'Arytic - ' + this.job.FirstName + ' ' + this.job.LastName + ' ' + 'added note- #' + ' ' + this.profile.JobId + ' ' + this.profile.JobTitle;
    console.log("ceoii", this.cemailNote)

    this.apiService.postEmailService('/api/EmailForNotesNewU', this.cemailNote).subscribe(
      check => {
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
    this.isChecked = !this.isChecked;
    this.isShown3 = true
    this.isShown4 = false
  }

  SendEmail() {
    this.teammemberslist.forEach((x: any) => {
      if (x.UserId != this.customer.UserId) {

        this.cemailNote.Body = this.selectedComments;
        this.cemailNote.FullName = x.FirstName.split('-')[0];
        this.cemailNote.ToEmailID = x.Email;
        this.cemailNote.FromID = "donotreply@arytic.com"
        this.cemailNote.Docs = []
        this.cemailNote.JobTitle = this.job.JobTitle
        this.cemailNote.JobId = this.job.JobId
        this.cemailNote.ApplicationName = 'Arytic'
        this.cemailNote.SenderName = this.job.FirstName
        this.cemailNote.TouserId = this.customer.UserId
        this.cemailNote.NotesId = 0
        this.cemailNote.Subject = 'Arytic - ' + this.profile.FirstName + ' ' + this.profile.LastName + ' ' + 'added note- #' + ' ' + this.profile.jobId + ' ' + this.profile.JobTitle;
        this.apiService.postEmailService('/api/EmailForNotesNewU', this.cemailNote).subscribe(
          check => {

            this.cemailNote = new SendNoteEmailCandidate();

          }
        )
      }
    });
  }

  grtProfileNotes() {
    console.log("gobdwefgdkjprofile", this.profile)
    this.apiService.GetProfileService('/api/GetProfileNotes?profileId=', this.profile?.ProfileId + '&jobId=' + this.job?.JobId + '&cid=' + this.customer.UserId).subscribe((res) => {
      console.log("grtProfileNotes", res)
      this.profileNotesList = res
    })
  }


  deleteNotes(id: any) {
    console.log("id", id)
    this.apiService.DeleteService('/api/DeleteNotes?Id=', id).subscribe((res: any) => {
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

  sentFeedback() {
    console.log("check1", this.job)
    this.feedback.ProfileId = this.profile.ProfileId;
    this.feedback.JobId = this.job.JobId;
    this.feedback.customerUserId = this.customer.UserId;
    if (this.isShown3 == true && this.isShown4 == false) {
      this.feedback.toUserId =
        this.feedBackTeammemberslist.map((x: any) => x.UserId).toString() + "," + this.customer.UserId.toString();
      this.feedback.isCandidate = false;
      this.feedback.OtherInfo = this.feedback.OtherInfo;
      this.feedback.Doc = "";
    }

    if (this.isShown4 == true && this.isShown3 == false) {
      this.feedback.toUserId = this.feedBackTeammemberslist.map((x:any) => x.UserId).toString() + "," + this.customer.UserId.toString();
      this.feedback.isCandidate = true;
      this.feedback.OtherInfo = " ";
      this.feedback.Doc = this.feedBackTeammemberslist.map((x:any) => x.UserId).toString() +"," + this.customer.UserId.toString();
      this.SendFeedbackEmail();
      this.selectedComments = "";
      // this.EmailId = " ";
    }

    if (this.isShown3 == true && this.isShown4 == true) {
      this.feedback.toUserId = this.feedBackTeammemberslist.map((x: any) => x.UserId).toString() + "," + this.customer.UserId.toString() + "," + this.customer.UserId.toString();
      this.feedback.isCandidate = true;
      this.feedback.OtherInfo = this.savenote.OtherInfo;
      this.feedback.Doc = this.feedBackTeammemberslist.map((x: any) => x.UserId).toString() + "," + this.customer.UserId.toString() + "," + this.customer.UserId.toString();
      this.SendFeedbackEmail();
      this.selectedComments = "";
      // this.EmailId = " ";
    }
    if (this.isShown3 == false && this.isShown4 == false) {
      this.feedback.toUserId = this.customer.UserId.toString();
      this.feedback.isCandidate = false;
      this.feedback.Doc = this.customer.UserId.toString();
    }

    this.feedback.Comments = this.selectedFeedBackComments;
    //this.savenote.statusId = 6;
    this.feedback.FeedbackTitle = "Feedback";
    // let Ids = Array.from(this.feedback.toUserId.split(','));
    let Ids = Array.from(new Set(Array.from(this.feedback.toUserId.split(','))));

    var res = new Promise<void>((resolve, reject) => {
      Ids.forEach((value, index, array) => {
        this.feedback.toUserId = value;
        this.apiService.PostService(this.feedback, "IdentityAPI/api/InsertProfileFeedback").subscribe((status: any) => {
          if (status > 0) {
            this.feedBackTeammemberslist = [];
            $('#teamMbr').val('');
            this.getTeammember = new CustomerUsers();
            this.clearTeamMemebers();
            this.Swal(
              {
                title: 'Feedback Added Successfully',
                showConfirmButton: true,
                timer: 3000,
                type: "success"
              })
              // this.feedback.FeedbackOption = ""
            this.getFeedBack();
            //this.selectedComments = "";
            //this.EmailId = " ";
            this.NId.push(status);


            //this.SaveNotes(this.selectedComments);
            if (index === array.length - 1) {

              resolve();
            }

          }
        }
        );

      })
    });

    res.then(() => {

      this.NId.forEach((element: any) => {
        if (this.files.length > 0) {
          for (let i = 0; i < this.files.length; i++) {
            let fileItem = this.files[i].nativeFile!;
            if (fileItem.size > 10000000) {
              //  this.toastr.error("Each File should be less than 10 MB of size.","!Oh no");
              console.log("Each File should be less than 10 MB of size.", "!Oh no");
              return;
            }
          }
          for (let j = 0; j < this.files.length; j++) {
            let data = new FormData();
            let request = '';
            let fileItem = this.files[j].nativeFile!;
            if (this.fileUploadForm.value !== '') {
              this.fileUploadForm.value.Title = fileItem.name;
              this.fileUploadForm.value.DocUrl = '';
              this.fileUploadForm.value.toUserId = this.customer.UserId.toString();
              this.fileUploadForm.value.NoteId = element;
              this.fileUploadForm.value.FileExtension = fileItem.type;
              request = JSON.stringify(this.fileUploadForm.value);
            }
            data.append('Attachment', fileItem);
            data.append('fileSeq', 'seq' + j);
            data.append('Model', request);
            this.uploadFile(data);
          }

        }
      });
      this.files = [];
      // this.toastr.success('Sent successfully', 'Success');
      console.log('Sent successfully', 'Success');
      setTimeout(() => {
        //  this.toastr.dismissToast;
        //  this.eventStat.emit(null);
        //  this.dialogRef.close();
      }, 3000);


    });

  }

  uploadFile(data: FormData) {
    this.apiService.byteStorage2(data).subscribe((data) => {
      this.savenote = new Notes();
      this.getFeedBack()
      //this.dialogRef.close();
    });
  }

  clearTeamMemebers() {
    this.teammemberslist = [];
  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') { // when all files added in queue
      // uncomment this if you want to auto upload files when added
      // const event: UploadInput = {
      //   type: 'uploadAll',
      //   url: '/upload',
      //   method: 'POST',
      //   data: { foo: 'bar' }
      // };
      // this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') { // add file to array when added
      console.log("ext", output.file.name.split('.').pop())
      // DocName.split('.').pop()
      const ext = output.file.name.split('.').pop()
      if (ext === 'doc' || ext === 'docx' || ext === 'pdf' || ext === 'txt') {
        this.files.push(output.file);
      }
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    }
  }
  SendFeedbackEmail() {
    this.emailNote.fullName = this.job.FirstName + " " + this.job.LastName;
    this.emailNote.body =this.selectedFeedBackComments
    this.emailNote.toEmailId = "pridhvi.esolvit@gmail.com";
    this.emailNote.customerName = "A & T"
    this.emailNote.jobId = this.job.JobId
    this.emailNote.jobTitle = this.job.JobTitle
    this.emailNote.applicationName = "Arytic"
    // this.emailNote.body ="Arytic" 
    this.emailNote.fromID = "info@arytic.com"
    this.emailNote.signature = this.job.FirstName + " " + this.job.LastName
    this.apiService.postEmailService('/api/FeedbackEmail', this.emailNote).subscribe(
      check => {
        // this.toastr.success('Email sent successfully','Success');
        // setTimeout(() => {
        //   this.toastr.dismissToast;
        this.emailNote = new SendNoteEmail();
        //  }, 3000);
        this.getFeedBack();

      }
    )
  }


  getFeedBack(){
    // this.apiService.getProfileApi('api/GetProfileFeedback?profileId=33674&jobId=1004087&cid=22620)
    console.log("gobdwefgdkjprofile", this.profile)
    this.apiService.GetProfileService('/api/GetProfileFeedback?profileId=', this.profile?.ProfileId + '&jobId=' + this.job?.JobId + '&cid=' + this.customer.UserId).subscribe((res) => {
      console.log("GetProfileFeedback", res)
      this.feedbackList = res
    })
  }
}

export class CustomerUsers {
  public UserId!: number;
  public FirstName!: string;
  public Email!: string;
  public LastName!: string;
  public RoleName!: string;
  public IsRemove!: boolean;
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
  public schedule!: string
  public feedback!: string

}
export class SendNoteEmailCandidate {
  public FullName!: string
  public Body!: string
  public ToEmailID!: string
  public Subject!: string
  public FromID!: string
  public Docs!: []
  public JobTitle!: string
  public ApplicationName!: string
  public SenderName!: string
  public TouserId!: number
  public NotesId!: number
  public JobId!: number
}

export class feedback {
  public ProfileId!: Number;
  public JobId!: Number;
  public customerUserId!: Number;
  public toUserId!: string;
  public isCandidate!: boolean;
  public Comments!: string;
  public Doc!: string;
  public OtherInfo!: string;
  public FeedbackTitle!: string;
  public FeedbackOption!: string;
  public InterviewMode!: string;
}

export class SendNoteEmail {
  public fullName!: string
  public customerName!: string
  public jobId!: string
  public jobTitle!: string
  public applicationName!: string
  public body!: string
  public signature!: string
  public toEmailId!: string
  public fromID!: string
}



