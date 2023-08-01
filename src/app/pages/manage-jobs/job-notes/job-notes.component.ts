import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subject, VirtualTimeScheduler } from 'rxjs';
import { ApiService } from 'src/app/shared/components/services/api.service';
import { CustomerUsers } from '../models/manageJobsInfo'
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from 'src/settings/settings.service';
import * as FileSaver from "file-saver";
import swal from 'sweetalert2';
import Swal from 'sweetalert2';
// import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';


declare var $: any;
@Component({
  selector: 'app-job-notes',
  templateUrl: './job-notes.component.html',
  styleUrls: ['./job-notes.component.scss']
})
export class JobNotesComponent implements OnInit {
  // @Input() showJobForm = ''; // decorate the property with @Input();
  _job: any = null;
  customercontacts: any = []
  selectedUserName: any | undefined
  usersloading?: boolean;
  getTeammember?: CustomerUsers;
  teammemberslist: any = [];
  selectedComments: any
  JobNotes: any
  savenote = new Notes();
  selectedUserInput = new Subject<string>();

  options!: UploaderOptions;
  formData!: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver!: boolean;
  showJobForm = 'false';
  fileUploadForm!: FormGroup;
  NId : any=[];

  showJobFormHandler() {
    this.showJobForm = 'true';
  }

  showJobFormHideHandler() {
    this.showJobForm = 'false';
    // this.fileUploadForm.value.reset()
    // this.savenote.OtherInfo ='';
    this.selectedComments = "";
    // this.fileUploadForm.reset();
    this.savenote = new Notes();
    this.savenote.OtherInfo = 'General';
    this.files=[];
    this.teammemberslist=[];
    this.selectedUserName = null;

  }

  get job(): any {
    return this._job
  }

  @Input() set job(value: any) {
    this._job = value;
    if (value) {
      this.getcustomerusers();
      this.GetJobNotes()
      console.log("ckeditor", this.selectedComments)
    }
  }


  panels = ['First', 'Second', 'Third'];
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

  notesDocViewerUrl = 'https://docs.google.com/viewerng/viewer?url='+this.settingsService.settings.IdentitybaseUrl+'/home/EsolvitResumes?id=';

  constructor(config: NgbAccordionConfig, private apiService: ApiService, private fb: FormBuilder, private settingsService: SettingsService) {
    // customize default values of accordions used by this component tree
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

  ngOnInit(): void {
    console.log("gob", this.job)
    console.log("selectedComments", this.selectedComments)
    this.savenote.OtherInfo = 'General';
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
  onEditorChange(event: any) {
    // Access the changed content
    const changedContent = event.editor.getData();
    console.log('Changed content:', changedContent);
  }


  changeTeam(val: any) {
    // this.getTeammember = val;
    //this.GetJobAssigned(val.UserId,val.Email);
  }
  getcustomerusers() {
    console.log("gob2", this.job)
    return this.apiService.GetProfileService("/api/GetCustomerUsers?CustomerId=", this.job.CustomerId).subscribe((res: any) => {
      console.log("customerName", res)
      this.customercontacts = res
      this.customercontacts = res.filter((i: any) => {
        return i.FirstName = this.titleCase(i.FirstName) + ' ' + this.titleCase(i.LastName) + ' - ' + this.titleCase(i.RoleName);
      })
    });
  }

  GetJobNotes() {
    this.apiService.GetProfileNotesNew(this.job.JobId, this.job.UserId).subscribe((res) => {
      this.JobNotes = res;
      console.log("res", res)
    });
  }

  deleteTeammember(x: any) {
    console.log("x", x)
    this.teammemberslist.splice(x, 1);
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

  DownloadDocument(d:any){
    console.log("data",d)
    console.log("JobNotes",this.JobNotes)
 
    let fileDat = this.JobNotes.find((x:any)=>(x.attachmentsNew[0].Attaches) && (x.attachmentsNew[0].Attaches[0].aDocName === d));
    let fileExt:any;
    console.log("dddddddd",fileDat)

    
    this.apiService.GetProfileService("/api/GetNoteFilesDownload?url=", fileDat.attachmentsNew[0].Attaches[0].aDocUrl).subscribe((fileData) => {
      
      let exp = d.split("aryticDP")[0];
      console.log("fileDta",fileDat)
      fileExt = exp.split(".").pop();
      let Name = exp.split(".")[0];
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
        FileSaver.saveAs(blob, exp);
      }
    });
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
    } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') { // add file to array when added
      console.log("ext",output.file.name.split('.').pop())
      // DocName.split('.').pop()
      const ext = output.file.name.split('.').pop()
      if(ext === 'doc' ||ext === 'docx' || ext === 'pdf'||ext === 'txt'){
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

  saveClicked() {
    this.savenote.ProfileId=this.job.ProfileId;
    this.savenote.JobId = this.job.JobId;
    this.savenote.customerUserId = this.job.UserId;
    this.fileUploadForm.value.JobId = this.job.JobId;
    this.fileUploadForm.value.customerUserId = this.job.UserId;
    this.fileUploadForm.value.CustomerUserId = this.job.UserId;

    if(this.teammemberslist.length>0)
    {
      this.savenote.toUserId = this.teammemberslist.map((x: any) => x.UserId).toString() +','+this.job.UserId.toString();
      this.savenote.isCandidate=false;
      this.savenote.Doc = '';
    }
    else
    {
      this.savenote.toUserId = this.job.UserId.toString();
      this.savenote.isCandidate=false;
      this.savenote.Doc = '';
    }

    this.savenote.Comments = this.selectedComments;
    // this.savenote.statusId = this.data.StatusId;
    if(this.files.length > 0)
    {
      this.upload();
    }
    else
    {
      this.sendNotes();
    }
 }

  uploadFile(data: FormData) {
    this.apiService.byteStorage(data).subscribe(data => {
      this.NId.push(data);
      if (this.files.length == this.NId.length) {

        this.fileUploadForm.value.DocUrl = this.NId.map((x:any) => x).toString();
        this.apiService.InsertProfileNotesNew(this.fileUploadForm.value)
          .subscribe(
            status => {
              console.log('data', status)
              // if (status > 0) {   
              Swal(
                {
                  title: 'Notes Added Successfully',
                  showConfirmButton: true,
                  timer: 3000,
                  type: "success"
                });
                this.showJobForm = 'false';
                //this.uploader.clearQueue();
                this.selectedComments = "";
                // this.fileUploadForm.reset();
                this.savenote = new Notes();
                this.files=[];
                this.teammemberslist=[];
                this.selectedUserName = null;
                this.GetJobNotes();
                this.showJobForm = 'false';
      
                //this.toastr.success('Sent successfully', 'Success');
               
                setTimeout(() => {
                  //this.toastr.dismissToast;
                  this.selectedComments = "";
                  this.fileUploadForm.reset();
                  this.savenote = new Notes();
                  // clear files array
                }, 3000);
              // }
            })

      }
    })
  }

  async upload() {
    if (this.files.length > 0) {
      for (let i = 0; i < this.files.length; i++) {
        let fileItem = this.files[i];
        if (fileItem.size > 10000000) {
          // this.toastr.error("Each File should be less than 10 MB of size.","!Oh no");
          Swal(
            {
              title: 'Each File should be less than 10 MB of size.","!Oh no"',
              showConfirmButton: true,
              timer: 3000,
              type: "error"
            });
        
          console.log("Each File should be less than 10 MB of size.");
          return;
        }
      }
      for (let j = 0; j < this.files.length; j++) {
        let data = new FormData();
        let request = '';
        let fileItem = this.files[j];
        if (this.fileUploadForm.value !== '') {
          this.fileUploadForm.value.Title = fileItem.name;
          this.fileUploadForm.value.DocUrl = '';
          this.fileUploadForm.value.toUserId = this.savenote.toUserId;
          this.fileUploadForm.value.CustomerUserId = this.savenote.customerUserId;
          this.fileUploadForm.value.Comments = this.savenote.Comments;
          this.fileUploadForm.value.OtherInfo = this.savenote.OtherInfo;
          this.fileUploadForm.value.StatusId = this.savenote.statusId;
          this.fileUploadForm.value.Doc = this.savenote.Doc;
          this.fileUploadForm.value.NoteId = 0;
          this.fileUploadForm.value.FileExtension = fileItem.type;
          request = JSON.stringify(this.fileUploadForm.value);
        }
        data.append('Attachment', fileItem.nativeFile!);
        data.append('fileSeq', 'seq' + j);
        data.append('Model', request);
        await this.uploadFile(data);
      }
    }
  }

  sendNotes() {
    // let request = '';
    this.fileUploadForm.value.Title = '';
    this.fileUploadForm.value.DocUrl = '';
    this.fileUploadForm.value.toUserId = this.savenote.toUserId;
    this.fileUploadForm.value.CustomerUserId = this.savenote.customerUserId;
    this.fileUploadForm.value.Comments = this.savenote.Comments;
    this.fileUploadForm.value.OtherInfo = this.savenote.OtherInfo;
    this.fileUploadForm.value.StatusId = this.savenote.statusId;
    this.fileUploadForm.value.Doc = this.savenote.Doc;
    this.fileUploadForm.value.NoteId=0;
    this.fileUploadForm.value.FileExtension ='';
    this.fileUploadForm.value.DocUrl = 'No Attachements';
    //  request = JSON.stringify(this.fileUploadForm.value);
     this.apiService.InsertProfileNotesNew(this.fileUploadForm.value)
     .subscribe(
       (res: any) => {
        if (res <= 0) {
          Swal(
            {
              title: 'Error occured while saving notes',
              showConfirmButton: true,
              timer: 3000,
              type: "error"
            });
          return;
        }
       console.log('res without att', res);
        Swal(
          {
            title: 'Notes Added Successfully',
            showConfirmButton: true,
            timer: 3000,
            type: "success"
          });
          this.GetJobNotes();
        // this.uploader.clearQueue();
        this.selectedComments = "";
        // this.fileUploadForm.reset();
        this.savenote = new Notes();
        this.files=[];
        this.savenote.OtherInfo = 'General';
        this.teammemberslist=[];
        this.selectedUserName = null;
      
      //   this.toastr.success('Sent successfully', 'Success');
      //   setTimeout(() => {
      //   //  this.toastr.dismissToast;
      //    this.selectedComments = "";
      //    this.fileUploadForm.reset();
      //    this.savenote = new Notes();
      //   //  this.dialogRef.close();
      //  }, 3000);
       
      })
}
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

