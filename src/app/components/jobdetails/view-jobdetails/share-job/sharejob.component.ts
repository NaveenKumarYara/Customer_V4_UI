import { Component, Inject, Input, OnInit, ViewContainerRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Subject } from 'rxjs/Subject';
import { CustomerUsers } from '../../../Postajob/models/jobPostInfo';
import { AppService } from '../../../../app.service';
import { JobdetailsService } from '../../jobdetails.service';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { CustomerContacts } from '../../../../../models/customercontacts';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { SettingsService } from '../../../../../settings/settings.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../../shared/services';
declare var $: any;
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { GetJobDetailCustomer } from '../../../../../models/GetJobDetailCustomer';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
// import { copyImageToClipboard } from 'copy-image-clipboard'
const URL = 'http://localhost:4800/fileupload/';
export interface mailtoAsset {

  Id: string;
  Title: string;
  Location: string;
  Link: string;
}
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-sharejob',
  templateUrl: './sharejob.component.html',
  styleUrls: ['./sharejob.component.css', './sharejob-new.component.css']
})
export class ShareJobComponent implements OnInit {
  managersList: Observable<CustomerUsers[]>;
  mailtoHeader = "mailto:?";
  subjectProp = "subject=";
  do = new doc();
  bodyProp = "body=";
  amp = "&amp;";
  breakStr = "%0D%0A";
  jobSignature: any;
  footer = "Powered by Arytic!"
  demoSubject = "";
  private base64textString: String = "";
  removable = true;
  cremovable = true;
  bcremovable = true;
  fromId: any;
  public emailList = [];
  public ccemailList = [];
  public bccemailList = [];
  rulesForm: FormGroup;
  ccrulesForm: FormGroup;
  bccrulesForm: FormGroup;
  public separatorKeysCodes = [ENTER, COMMA];
  public ccseparatorKeysCodes = [ENTER, COMMA];
  public bccseparatorKeysCodes = [ENTER, COMMA];
  chipLists: any;

  demoAssets: mailtoAsset[] = [
    {
      Id: "",
      Title: "",
      Location: "",
      Link: ""
    }
  ];

  teammembers: '';
  referLink: any;
  whatsapp: any;
  subject: string;
  public Editor = ClassicEditor;
  whatsappform: FormGroup;
  customercontacts: CustomerContacts[];
  teammemberslist: CustomerUsers[];
  getTeammember: CustomerUsers;
  userIds: any;
  emaiIds: any;
  inviteform: FormGroup;
  Sharing = new JobShare();
  customer: any;
  uploader: FileUploader = new FileUploader({}); //Empty options to avoid having a target URL
  reader: FileReader = new FileReader();
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$";
  //emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"; 
  Emailinvite: any;
  inviteinfo = new InviteInfo();
  inviteEmail: any;
  AddUser: boolean = false;
  customerId: number;
  UserId: any;
  info: number;
  changeval: boolean = false;
  EmailId: any = null;
  Name: any = null;
  dos: any = [];
  usersloading: boolean;
  customerUser: number;
  selectedUserName: number;
  selectedComments: any;
  userId: number;
  fileUploadForm: FormGroup;
  private subscription: Subscription;
  selectedUserInput = new Subject<string>();
  isSharingStarted: boolean;
  showThis: any;
  showSubThis: any;
  arr: any = [];
  type: string;
  @Input() shareUrl: string;
  navUrl: string;
  CompanyName: any;
  Title: any;
  Image: any;
  jobDescription: any;
  NImage: any;
  showCC: boolean = false;
  showBCC: boolean = false;
  dropdownSettings = {};
  dropdownList = [];
  selectedItems = [];
  shareOptionVia: string;
  isChecked: boolean = false;
  shareOptions: boolean = false;
  activeAny: string;
  defaultComments: any;
  jobdetailscustomer = new GetJobDetailCustomer();

  constructor(public dialogRef: MatDialogRef<ShareJobComponent>, private sanitizer: DomSanitizer, private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any, private _service: ApiService, private fb: FormBuilder, 
    private jobdetailsservice: JobdetailsService, private appService: AppService, private _vcr: ViewContainerRef, 
    private toastr: ToastsManager, private settingsService: SettingsService) 
  {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId = this.customer.CustomerId;
    const swal = require('sweetalert2');
    this.customerUser = this.customer.UserId;
    this.toastr.setRootViewContainerRef(_vcr);
    this.GetLink();
    this.GetjobCard();
    this.PopulateJobdetail();
    this.uploader = new FileUploader({
      url: URL,
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      allowedFileType: ['image', 'pdf', 'doc', 'docx'],

      formatDataFunction: async (item) => {
        return new Promise((resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date()
          });
        });
      }
    });

  }

  showClickCC() {
    this.showCC = !this.showCC;
  }

  showClickBCC() {
    this.showBCC = !this.showBCC;
  }

  Contact() {
    this.dialogRef.close();
    swal(
      {
        title: 'Customer Support team',
        showConfirmButton: true,
        showCancelButton: true,
        html: 'Contact us using below options' + '<br>' +
          '<i class=" fa fa-envelope"></i> ' + '<a href="mailto: info@arytic.com" target="_blank"> Mail</a>' + '<br>' + '<i class="fa fa-phone"></i> ' + '<a href="tel: +1 855-427-9842" target="_blank"> Call</a>',
        type: "info",
        confirmButtonColor: '#66dab5',
        cancelButtonColor: '#FF0000',
        confirmButtonText: 'OK',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value === true) {
          swal(
            {
              title: 'Thank you for showing your Interest!',
              showConfirmButton: true,
              timer: 3000,
              type: "success"
            });
        }
      }
      )
  }

  checkValue(x) {
    if (x === 'A') {
      this.selectedComments = this.selectedComments + '<br/>' + this.jobSignature;
    } else {
      this.selectedComments = this.defaultComments;
    }
  }

  private validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  private ccvalidateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  private bccvalidateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  add(event): void {
    console.log(event.value)
    if (event.value) {
      if (this.validateEmail(event.value.trim())) {

        this.emailList.push({ value: event.value.trim(), invalid: false });
        if (this.emailList.length > 1) {
          this.activeAny = 'Mass Mail';
        }
        else {
          this.activeAny = 'Normal';
        }
      } else {
        this.emailList.push({ value: event.value, invalid: true });
        this.rulesForm.controls['emails'].setErrors({ 'incorrectEmail': true });
      }
    }
    if (event.input) {
      event.input.value = '';
    }
  }

  addcc(event): void {
    console.log(event.value)
    if (event.value) {
      if (this.ccvalidateEmail(event.value.trim())) {
        this.ccemailList.push({ value: event.value.trim(), invalid: false });
      } else {
        this.ccemailList.push({ value: event.value, invalid: true });
        this.ccrulesForm.controls['CCemails'].setErrors({ 'incorrectEmail': true });
      }
    }
    if (event.input) {
      event.input.value = '';
    }
  }

  addbcc(event): void {
    console.log(event.value)
    if (event.value) {
      if (this.bccvalidateEmail(event.value.trim())) {
        this.bccemailList.push({ value: event.value.trim(), invalid: false });
      } else {
        this.bccemailList.push({ value: event.value, invalid: true });
        this.bccrulesForm.controls['BCCemails'].setErrors({ 'incorrectEmail': true });
      }
    }
    if (event.input) {
      event.input.value = '';
    }
  }

  removeEmail(data: any): void {
    console.log('Removing ' + data)
    if (this.emailList.indexOf(data) >= 0) {
      this.emailList.splice(this.emailList.indexOf(data), 1);
      if (this.emailList.length > 1) {
        this.activeAny = 'Mass Mail';
      }
      else {
        this.activeAny = 'Normal';
      }
    }
    this.rulesForm.controls['emails'].setErrors({ 'incorrectEmail': false });
  }

  removeEmailc(data: any): void {
    console.log('Removing ' + data)
    if (this.ccemailList.indexOf(data) >= 0) {
      this.ccemailList.splice(this.ccemailList.indexOf(data), 1);
    }
    this.ccrulesForm.controls['CCemails'].setErrors({ 'incorrectEmail': false });
  }

  removeEmailbc(data: any): void {
    console.log('Removing ' + data)
    if (this.bccemailList.indexOf(data) >= 0) {
      this.bccemailList.splice(this.bccemailList.indexOf(data), 1);
    }
    this.bccrulesForm.controls['BCCemails'].setErrors({ 'incorrectEmail': false })
  }

  clearEmail() {
    this.emailList = [];
  }

  showClear() {
    this.bccemailList = [];
    this.bccemailList = [];
  }

  private validateArrayNotEmpty(c: FormControl) {
    if (c.value && c.value.length === 0) {
      return {
        validateArrayNotEmpty: { valid: false }
      };
    }
    return null;
  }

  onSelectAll(s) { }

  PopulateJobdetail() {
    return this.jobdetailsservice.getJobDetailCustomer(this.customerId, this.data.JobId).subscribe(res => {
      this.jobdetailscustomer = res;
    });
  }



// Function to encode the image URL as base64


// Usage:

openMailWithImage() {
  const imageSrc = this.Image; // Replace with the path to your image
  const attachmentName = 'image.png';

  // Convert the image source to a base64 data URL
  const reader = new FileReader();
  reader.onloadend = () => {
    const base64data = reader.result as string;
    const safeImageUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(base64data);

    // Generate the mailto link
    
    const mailto = `mailto:''?subject=Email with Image&body=Please see the attached image.%0D%0A%0D%0A`;
    const attachment = `data:image/png;base64,${encodeURIComponent(base64data)}`;

    // Open the mail client with the mailto link
    window.location.href = `${mailto}attachment=${attachmentName};name=${attachment}`;
  };

  // Read the image file
  const xhr = new XMLHttpRequest();
  xhr.open('GET', imageSrc);
  xhr.responseType = 'blob';
  xhr.onload = () => {
    reader.readAsDataURL(xhr.response);
  };
  xhr.send();
}


getStringifiedAssets(assets: mailtoAsset[]) {
  let subject = this.Title + '  had shared the job to you';

  let str = "";
  assets.forEach(asset => {
    asset.Id = 'JobId: #' + this.data.JobId;
    asset.Title = 'Job Title: ' + this.jobdetailscustomer.JobInfo.JobTitle;
    asset.Location = 'Job Location: ' + this.jobdetailscustomer.JobLocation[0].CityName;
    asset.Link = 'Job Link: ' + this.referLink;
    str = str + this.breakStr + this.joinLines(asset.Id) + this.breakStr + this.joinLines(asset.Title) + this.breakStr + this.joinLines(asset.Location) + this.breakStr + this.joinLines(asset.Link) + this.breakStr;
  })

  const url = `${this.mailtoHeader}${this.subjectProp}${subject}&${this.bodyProp}${str}${this.footer}`;
  //return this.sanitizer.bypassSecurityTrustUrl(url)
  window.location.href = url;
}

  joinLines(lines: string) {
    return lines + this.breakStr;
  }

  GetLink() {
    let body = <HTMLDivElement>document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = '../assets/js/oneall_script.js';
    script.async = true;
    script.defer = true;
    // script.append("val", "abcbcbc");
    body.appendChild(script);
  }

  getBase64FromUrl(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  copyToClipboard() {
    let element = $('#nbtnCpy');
    let inputGroup = element.closest('.input-group');
    let input = inputGroup.find('.text-to-copy');
    let inputValue = inputGroup.find('.text-to-copy').val();

    let msg = inputGroup.next('.copied');

    if (inputValue.length > 0 && inputValue !== 'undefined') {
      input.select();
      document.execCommand('copy');
      element.find('span').text('Copied!');
      msg.addClass('show');
    }

    if (msg.hasClass('show')) {
      setTimeout(function () {
        msg.removeClass('show');
      }, 1500);
    }
  }

  private createNavigationUrl() {
    let searchParams = new URLSearchParams();
    this.shareUrl = this.referLink;
    switch (this.type) {
      case 'facebook':
        searchParams.set('u', this.shareUrl);
        this.navUrl = 'https://www.facebook.com/sharer/sharer.php?' + searchParams;
        break;
      case 'linkedin':
        searchParams.set('url', this.shareUrl);
        this.navUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=' + searchParams;
        break;
      case 'twitter':
        searchParams.set('url', this.shareUrl);
        this.navUrl = 'https://twitter.com/share?' + searchParams;
        break;
    }
  }

  public share(val) {
    this.type = val;
    this.createNavigationUrl();
    return window.open(this.navUrl, "_blank");
  }

  titleCase(str) {
    return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
  }

  ngOnInit() {
   
    this.fromId = this.customer.Email;
    this.defaultComments = "Please review the job shared to you.";
    this.selectedComments = this.defaultComments;
    this.subject = 'A Job has been shared to you - Check it out ' + ' ' + (this.data.JobTitle != undefined ? this.data.JobTitle : ' ') + ' ' + ' #' + this.data.JobId + ' ' + '-Arytic';
    this.inviteform = this.fb.group({
      'inviteEmail': ['', Validators.compose([Validators.required, this.commaSepEmail])],
    });
    this.whatsappform = this.fb.group({
      'mobilenumber': ['', Validators.compose([Validators.required, Validators.minLength(10)])],
    });
    this.fileUploadForm = this.fb.group({
      'NoteId': [0, Validators.required],
      'ProfileId': [0, Validators.nullValidator],
      'JobId': [0, Validators.nullValidator],
      'customerUserId': [this.customerUser, Validators.required],
      'toUserId': [0, Validators.required],
      'Title': ['', Validators.nullValidator],
      'Attachment': [null, Validators.nullValidator],
      'FileExtension': ['', Validators.nullValidator],
      'DocUrl': ['', Validators.nullValidator]
    });
    this.clearTeamMemebers();
    this.getcustomerusers();
    this.isSharingStarted = false;
    this.teammemberslist = this.appService.getTeammembers();
    this.showThis = 'mainNav';
    this.Title = this.titleCase(this.customer.FirstName) + '  ' + this.titleCase(this.customer.LastName);
    this.subscription = this.appService.teammembersChanged
      .subscribe(
        (teammemberlist: CustomerUsers[]) => {
          this.teammemberslist = teammemberlist;
        }
      );
    this.referLink = this.settingsService.settings.NewJobDetailsRedirect + this.data.JobId;

    this.dropdownList = [
      { item_id: 1, item_text: 'Shaik Mohammed', isDisabled: false },
      { item_id: 2, item_text: 'D’Mani Dave', isDisabled: false },
      { item_id: 3, item_text: 'Pawan Bothra', isDisabled: false },
      { item_id: 4, item_text: 'Kinjal Mehta', isDisabled: false }
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };

    this.activeAny = 'Normal';
    this.rulesForm = this.fb.group({
      emails: this.fb.array([], this.validateArrayNotEmpty)
    });
    this.ccrulesForm = this.fb.group({
      CCemails: this.fb.array([], this.validateArrayNotEmpty)
    });
    this.bccrulesForm = this.fb.group({
      BCCemails: this.fb.array([], this.validateArrayNotEmpty)
    });

    //this.emailList.push({ value: this.data.EmailId, invalid: false });
  }

  getcustomerusers() {
    return this.appService.getCustomerContacts(this.customerId).subscribe(res => {
      this.customercontacts = res;
      this.customercontacts = res.filter((i) => {
        if (i.FirstName != "Invited" && i.FirstName != this.customer.FirstName && i.IsRemove != true) {
          return (i.FirstName = i.FirstName + " " + i.LastName + " - " + i.RoleName);
        }
      })
    })
  }

  teamchange(val) {
    this.changeval = val;
  }

  Whatsapp() {
    this.whatsapp = undefined;
    this.whatsappform.reset();
  }

  async writeClipImg() {
    try {
      const res = this.Image;
      if (res != 'No data') {
        // res.split('=')[0]
        // let url = 'https://identityapiv1-dev001.arytic.com/home/EsolvitImages?id=';
        // url = (url + res.split('=')[1]);
        // this.Image = url;
        fetch(res, {
          headers: {
            mode: 'cors',
          },
        }).then((res) => {
          res.blob().then((blob) => {
            console.log(blob);
            let data = [new ClipboardItem({ [blob.type]: blob })];
            window.navigator['clipboard'].write(data).then(
              () => {
                console.log('copied to clipboard');
                let element = $('#cnbtnCpy');
                let inputGroup = element.closest('.input-group');
                // let input = inputGroup.find('.text-to-copy');
                // let inputValue = inputGroup.find('.text-to-copy').val();
            
                let msg = inputGroup.next('.copied');
           
                  element.find('span').text('Copied!');
                  msg.addClass('show');

            
               
              },
              (e) => {
                console.log(e);
                console.log('error');
              }
            );
          });
        });
      } 
      console.log("Fetched image copied.");
    } catch (err) {
      console.error(err.name, err.message);
    }
  }

  GetjobCard() {
    this._service.GetService('IdentityAPI/api/GetJobCard?jobId=', this.data.JobId)
      .subscribe(res => {
        if (res != 'No data') {
          // res.split('=')[0]
          // let url = 'https://identityapiv1-dev001.arytic.com/home/EsolvitImages?id=';
          // url = (url + res.split('=')[1]);
          this.Image = res;
          // fetch(url, {
          //   headers: {
          //     mode: 'cors',
          //   },
          // }).then((res) => {
          //   res.blob().then((blob) => {
          //     console.log(blob);
          //     let data = [new ClipboardItem({ [blob.type]: blob })];
          //     window.navigator['clipboard'].write(data).then(
          //       () => {
          //         alert('copied to clipboard');
          //       },
          //       (e) => {
          //         console.log(e);
          //         alert('error');
          //       }
          //     );
          //   });
        
          //});
        } else {
          this.Image = " ";
        }
        this.CompanyName = 'Job Details Preview';
      });
  }

  WhatsappShare() {
    let url = 'https://wa.me/' + this.whatsappform.value.mobilenumber + '?text=' + this.referLink;
    window.open(url, '_blank');
    this.toastr.success('Successfully shared', 'Success!!');
    this.whatsapp = undefined;
    //$("#Whatsapp").Modal('hide');
    this.whatsappform.reset();
  }

  commaSepEmail = (control: AbstractControl): { [key: string]: any } | null => {
    const emails = control.value.split(',');
    const forbidden = emails.some(email => Validators.email(new FormControl(email)));
    console.log(forbidden);
    return forbidden ? { 'inviteEmail': { value: control.value } } : null;
  };

  changeTeam(val) {
    this.getTeammember = val;
  }

  SaveInvite() {
    this.isSharingStarted = true;
    this.inviteinfo.customerId = this.customerId;
    this.inviteinfo.userId = this.userId;
    this.inviteinfo.jobId = this.data.JobId;
    this.inviteinfo.userName = this.customer.FirstName;
    this.inviteinfo.fullName = this.customer.FirstName;
    this.inviteinfo.statusId = 0;
    this.inviteinfo.ToEmailId = this.inviteform.value.inviteEmail;
    this.inviteinfo.ApplicationName = 'Arytic';
    this.inviteinfo.CandFullName = 'New User';
    this.inviteinfo.CustFullName = this.customer.FirstName;
    this.inviteinfo.ClientLogo = '';
    this.inviteinfo.AppLink = this.settingsService.settings.NewJobDetailsRedirect + this.data.JobId;
    if (this.inviteinfo.ToEmailId == "") {
      this.isSharingStarted = false;
      this.toastr.error('Please provide the valid details!', 'Oops!');
      setTimeout(() => {
        this.toastr.dismissToast;
      }, 3000);
    } else if (this.inviteinfo.ToEmailId != "") {
      this.arr = this.inviteform.value.inviteEmail.split(',');
      this.arr.forEach(element => {
        this.inviteinfo.ToEmailId = element;
        this.jobdetailsservice.InviteContact(this.inviteinfo).subscribe(data => {
          if (data === 0) {
            this.toastr.success('Mail sent successfully', 'Success');
            setTimeout(() => {
              this.dialogRef.close();
              this.toastr.dismissToast;
              this.arr = [];
              this.inviteform.reset();
            }, 3000);
          }
        }, error => {
          //alert('error ');
          console.log('error:', JSON.stringify(error));
        });
      });
    }
  }

  clearTeamMemebers() {
    for (let i = 0; i <= 10; i++) {
      const index = i;
      this.appService.deleteTeammember(index);
    }
    this.deleteTeammember(0);
  }
  
  public addTeammembers() {
    if (this.getTeammember !== undefined) {
      const check = this.teamExists(this.getTeammember, this.teammemberslist);
      if (check === false) {
        this.appService.addTeammember(this.getTeammember);
      }
      $('#teamMbr').val('');
    }
  }

  private deleteTeammember(index: number) {
    this.appService.deleteTeammember(index);
  }

  teamExists(team, list) {
    return list.some(function (elem) {
      return elem.UserId === team.UserId;
    });
  }

  uploadMultiple() {
    if (this.emailList.length > 0) {
      for (let i = 0; i < this.uploader.queue.length; i++) {
        let fileItem = this.uploader.queue[i]._file;
        if (fileItem.size > 2 * 1024 * 1024) {
          this.toastr.error("Each File should be less than 2 MB of size.", "!Oh no");
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
          this.fileUploadForm.value.NoteId = 0;
          this.fileUploadForm.value.FileExtension = fileItem.type;
          request = JSON.stringify(this.fileUploadForm.value);
        }
        data.append('Attachment', fileItem);
        data.append('fileSeq', 'seq' + j);
        data.append('Model', request);
        this.uploadFile(data, fileItem.name);
      }
    }
    else {
      this.toastr.error('Please provide the valid details!', 'Oops!');
    }

  }

  uploadFile(data: FormData, fileName) {
    this._service.byteStorage(data, 'ProfileAPI/api/ProfileAttachmentsNew').subscribe(data => {
      this.do = new doc();
      let re = /\#/gi;
      this.do.DocUrl = data;
      this.do.DocName = fileName;
      this.do.JobId = 0;
      this.do.DocUrl = this.do.DocUrl.replaceAll(re, "%23");
      this.do.ProfileId = 0;
      this.dos.push(this.do);

      if (this.uploader.queue.length === this.dos.length) {
        this.ShareJob();
      }
    });
  }

  ShareJob() {
    if (this.emailList.length > 0) {
      this.isSharingStarted = true;
      // let emails = this.emailList.map(x => x.value);
      // var ctr = 0;
      // emails.forEach(element => {
      this.Sharing.CCEmailAddress = this.ccemailList.map(x => x.value).toString();
      this.Sharing.ToEmailID = this.emailList.map(x => x.value).toString();
      this.Sharing.BCCEmailAddress = this.bccemailList.map(x => x.value).toString();
      this.Sharing.ShareId = 0;
      this.Sharing.FromuserId = this.customerUser;
      this.Sharing.CustomerId = this.customerId;
      this.Sharing.ToUserId = "";
      // this.Sharing.ToEmailID = this.teammemberslist.map(x => x.Email).toString();
      this.Sharing.JobId = this.data.JobId;
      this.Sharing.FromEmail = this.customer.Email;
      this.Sharing.ToUserName = this.customer.FirstName + ' ' + this.customer.LastName;
      this.Sharing.AppLink = this.settingsService.settings.NewJobDetailsRedirect + this.data.JobId;
      this.Sharing.Comments = this.selectedComments;
      this.Sharing.Subject = this.subject;
      this.Sharing.Docs = this.dos;
      this.jobdetailsservice.JobShareInvite(this.Sharing).subscribe(data => {
        if (data === 0) {
          // ctr++; 
          // if (ctr === emails.length) {
          this.uploader.clearQueue();
          //this.inviteform.reset();
          this.teammemberslist = [];
          $('#teamMbr').val('');
          //this.selectedUserName = ''
          this.getTeammember = new CustomerUsers();
          this.Sharing = new JobShare();
          this.clearTeamMemebers();
          this.selectedComments = "";
          this.toastr.success('Mail sent successfully', 'Success');

          setTimeout(() => {
            this.isSharingStarted = false;
            this.toastr.dismissToast;
            this.dialogRef.close();

          }, 1000);
        }

      }, error => {
        console.log('error:', JSON.stringify(error));
      });

    }

    else {
      this.toastr.error('Please provide the valid details!', 'Oops!');
    }

  }

}

export class JobShare {
  ShareId: number;
  FromuserId: number;
  CustomerId: number;
  ToUserId: string;
  ToEmailID: string;
  JobId: number;
  AppLink: string;
  Comments: string;
  ToUserName: string;
  FromEmail: string;
  CCEmailAddress: string;
  BCCEmailAddress: string;
  Subject: string;
  Docs: any;
  readonly modules: ReadonlyArray<{}> = []
}

export class doc {
  DocUrl: any;
  ProfileId: number;
  JobId: number;
  DocName: any;
}

export class InviteInfo {
  customerId: number;
  userId: number;
  jobId: number;
  fullName: string;
  userName: string;
  statusId: number;
  CustFullName: string;
  CandFullName: string;
  AppLink: string;
  ToEmailId: string;
  ApplicationName: string;
  ClientLogo: string;
  readonly modules: ReadonlyArray<{}> = [];
}

interface ClipboardItem {
  readonly types: string[];
  readonly presentationStyle: "unspecified" | "inline" | "attachment";
  getType(): Promise<Blob>;
}

interface ClipboardItemData {
  [mimeType: string]: Blob | string | Promise<Blob | string>;
}

declare var ClipboardItem: {
  prototype: ClipboardItem;
  new(itemData: ClipboardItemData): ClipboardItem;
};
