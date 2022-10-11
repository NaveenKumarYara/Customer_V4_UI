import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { concat } from 'rxjs/observable/concat';
import { Component, Inject, Input, OnInit, ViewContainerRef } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Subject } from 'rxjs/Subject';
import { CustomerUsers, PjTechnicalTeam } from '../../../Postajob/models/jobPostInfo';
import { AppService } from '../../../../app.service';
import { JobdetailsService } from '../../jobdetails.service';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { CustomerContacts } from '../../../../../models/customercontacts';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { of } from 'rxjs/observable/of';
import { forEach } from '@angular/router/src/utils/collection';
import { SettingsService } from '../../../../../settings/settings.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ApiService } from '../../../../shared/services';
declare var $: any;
import { DomSanitizer } from "@angular/platform-browser";
import { GetJobDetailCustomer } from '../../../../../models/GetJobDetailCustomer';
import { assert } from 'console';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

export interface mailtoAsset {
  
  Id: string;
  Title: string;
  Location:string;
  Link:string;
}
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-sharejob',
  templateUrl: './sharejob.component.html',
  styleUrls: ['./sharejob.component.css','./sharejob-new.component.css']
})
export class ShareJobComponent implements OnInit {
  managersList: Observable<CustomerUsers[]>;
  mailtoHeader = "mailto:?";
  subjectProp = "subject=";
  bodyProp = "body=";
  amp = "&amp;";
  breakStr = "%0D%0A";
  footer = "Powered by Arytic!"
  demoSubject = ""
  removable = true;
  cremovable = true;
  bcremovable = true;
  public emailList = [];
  public ccemailList = [];
  public bccemailList = [];
  rulesForm: FormGroup;
  ccrulesForm: FormGroup;
  bccrulesForm: FormGroup;
  public separatorKeysCodes = [ENTER, COMMA];
  public ccseparatorKeysCodes = [ENTER, COMMA];
  public bccseparatorKeysCodes = [ENTER, COMMA];
  chipLists:any;

  demoAssets: mailtoAsset[] = [
    {
      Id: "",
      Title:"",
      Location:"",
      Link:""
    }
  ];

  teammembers: '';
  referLink:any;
  whatsapp: any;
  whatsappform: FormGroup;
  customercontacts: CustomerContacts[];
  teammemberslist: CustomerUsers[];
  getTeammember: CustomerUsers;
  userIds: any;
  emaiIds: any;
  inviteform: FormGroup;
  Sharing = new JobShare();
  customer: any;
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"; 
  //emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"; 
  Emailinvite:any;
  inviteinfo = new InviteInfo();
  inviteEmail:any;
  AddUser: boolean = false;
  customerId: number;
  UserId: any;
  info: number;
  changeval:boolean=false;
  EmailId: any = null;
  Name: any = null;
  usersloading: boolean;
  customerUser: number;
  selectedUserName: number;
  selectedComments: any;
  userId: number;
  private subscription: Subscription;
  selectedUserInput = new Subject<string>();
  isSharingStarted: boolean;
  showThis: any;
  showSubThis:any;
  arr:any=[];
  type:string;
  @Input() shareUrl: string;
  navUrl: string;
  CompanyName: any;
  Title: any;
  Image:any;
  jobDescription:any;
  NImage:any;
  showCC: boolean = false;
  showBCC: boolean = false;
  dropdownSettings = {};
  dropdownList = [];
  selectedItems = [];
  activeAny: string;
  jobdetailscustomer = new  GetJobDetailCustomer();
  constructor(public dialogRef: MatDialogRef<ShareJobComponent>, private sanitizer: DomSanitizer ,@Inject(MAT_DIALOG_DATA) public data: any,private _service: ApiService, private fb: FormBuilder,private jobdetailsservice: JobdetailsService, private appService: AppService, private _vcr: ViewContainerRef, private toastr: ToastsManager, private settingsService: SettingsService) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId = this.customer.CustomerId;
    this.customerUser = this.customer.UserId;
    this.toastr.setRootViewContainerRef(_vcr);
    this.GetLink();
    this.GetjobCard();
    this.PopulateJobdetail();
  }

  showClickCC() {
    this.showCC = !this.showCC;
  }

  showClickBCC() {
    this.showBCC = !this.showBCC;
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
      if (this.validateEmail(event.value)) {
        this.emailList.push({ value: event.value, invalid: false });
      } else {
        this.emailList.push({ value: event.value, invalid: true });
        this.rulesForm.controls['emails'].setErrors({'incorrectEmail': true});
      }
    }
    if (event.input) {
      event.input.value = '';
    }
  }

  addcc(event): void {
    console.log(event.value)
    if (event.value) {
      if (this.ccvalidateEmail(event.value)) {
        this.ccemailList.push({ value: event.value, invalid: false });
      } else {
        this.ccemailList.push({ value: event.value, invalid: true });
        this.ccrulesForm.controls['CCemails'].setErrors({'incorrectEmail': true});
      }
    }
    if (event.input) {
      event.input.value = '';
    }
  }

  addbcc(event): void {
    console.log(event.value)
    if (event.value) {
      if (this.bccvalidateEmail(event.value)) {
        this.bccemailList.push({ value: event.value, invalid: false });
      } else {
        this.bccemailList.push({ value: event.value, invalid: true });
        this.bccrulesForm.controls['BCCemails'].setErrors({'incorrectEmail': true});
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
    }
    this.rulesForm.controls['emails'].setErrors({'incorrectEmail': false});
  }

  removeEmailc(data: any): void {
    console.log('Removing ' + data)
    if (this.ccemailList.indexOf(data) >= 0) {
      this.ccemailList.splice(this.ccemailList.indexOf(data), 1);
    }
    this.ccrulesForm.controls['CCemails'].setErrors({'incorrectEmail': false});
  }

  removeEmailbc(data: any): void {
    console.log('Removing ' + data)
    if (this.bccemailList.indexOf(data) >= 0) {
      this.bccemailList.splice(this.bccemailList.indexOf(data), 1);
    }
    this.bccrulesForm.controls['BCCemails'].setErrors({'incorrectEmail': false})
  }

  showClear()
  {
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

  onSelectAll(s)
  {}

  PopulateJobdetail() {
    return this.jobdetailsservice.getJobDetailCustomer(this.customerId, this.data.JobId).subscribe(res => {
      this.jobdetailscustomer = res;
    });
  }
  getStringifiedAssets(assets: mailtoAsset[]) {
    let subject = this.Title + '  had shared the job to you';

    let str = "";
    assets.forEach(asset=>{
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

  GetLink()
  {
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
    // var copyText = <HTMLInputElement>document.querySelector('.rjobLink');
    // copyText.select();
    // document.execCommand('Copy');
    // alert('copied');
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
  switch(this.type) {
    case 'facebook':
      searchParams.set('u', this.shareUrl);
      this.navUrl = 'https://www.facebook.com/sharer/sharer.php?' + searchParams;
      break;
    case 'linkedin':
        searchParams.set('url', this.shareUrl);
        this.navUrl =  'https://www.linkedin.com/sharing/share-offsite/?url=' + searchParams;
        break;
    case 'twitter':
      searchParams.set('url', this.shareUrl);
      this.navUrl =  'https://twitter.com/share?' + searchParams;
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
    this.inviteform = this.fb.group({
      'inviteEmail'   : ['', Validators.compose([Validators.required, this.commaSepEmail])],
    });
    this.whatsappform = this.fb.group({
      'mobilenumber': ['', Validators.compose([Validators.required, Validators.minLength(10)])],
    });
    this.clearTeamMemebers();
    this.getcustomerusers();
    this.isSharingStarted = false;
    this.teammemberslist = this.appService.getTeammembers();
    this.showThis = 'mainNav';
    this.Title=  this.titleCase(this.customer.FirstName) + '  '+ this.titleCase(this.customer.LastName);
    this.subscription = this.appService.teammembersChanged
      .subscribe(
        (teammemberlist: CustomerUsers[]) => {
          this.teammemberslist = teammemberlist;
        }
      );
      this.referLink = this.settingsService.settings.NewJobDetailsRedirect + this.data.JobId;

      this.dropdownList = [
        { item_id: 1, item_text: 'Shaik Mohammed' ,isDisabled: false},
        { item_id: 2, item_text: 'D’Mani Dave',isDisabled: false },
        { item_id: 3, item_text: 'Pawan Bothra',isDisabled: false },
        { item_id: 4, item_text: 'Kinjal Mehta' ,isDisabled: false}
      ];
  
      this.dropdownSettings  = {
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
        if (i.FirstName != "Invited" && i.FirstName != this.customer.FirstName && i.IsRemove!=true) {
          return (i.FirstName = i.FirstName + " " + i.LastName + " - " + i.RoleName);
        }
      })
    })
  }

  teamchange(val)
  {
  this.changeval= val;
  }
  Whatsapp() {
    this.whatsapp = undefined;
    this.whatsappform.reset();
  }

  GetjobCard()
  {
    this._service.GetService('IdentityAPI/api/GetJobCard?jobId=', this.data.JobId)
    .subscribe(res => {
      if (res != 'No data') {
        this.Image = res;
      }
      else {
        this.Image = " ";
      }
      this.Image=res;
      this.CompanyName= 'Job Details Preview';


    });
  }

  WhatsappShare() {
    let url = 'https://wa.me/' + this.whatsappform.value.mobilenumber + '?text=' + this.referLink;
    window.open(url, '_blank');
    this.toastr.success('Successfully shared', 'Success!!');
    this.whatsapp = undefined;
    $("#Whatsapp").Modal('hide');
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
    this.inviteinfo.userName =   this.customer.FirstName;
    this.inviteinfo.fullName = this.customer.FirstName;
    this.inviteinfo.statusId = 0;
    this.inviteinfo.ToEmailId = this.inviteform.value.inviteEmail;
    this.inviteinfo.ApplicationName = 'Arytic';
    this.inviteinfo.CandFullName = 'New User';
    this.inviteinfo.CustFullName = this.customer.FirstName;
    this.inviteinfo.ClientLogo = '';
    this.inviteinfo.AppLink = this.settingsService.settings.NewJobDetailsRedirect + this.data.JobId;
    if(this.inviteinfo.ToEmailId == "")
    {
      this.isSharingStarted = false;
      this.toastr.error('Please provide the valid details!', 'Oops!');
        setTimeout(() => {
            this.toastr.dismissToast;
        }, 3000);
    }
    else if(this.inviteinfo.ToEmailId != "")
    {
      this.arr =this.inviteform.value.inviteEmail.split(',');
      this.arr.forEach(element => {
        this.inviteinfo.ToEmailId = element;
        this.jobdetailsservice.InviteContact(this.inviteinfo).subscribe(data => {
       if (data === 0) {  
        this.toastr.success('Mail sent successfully', 'Success');
        setTimeout(() => {
         this.toastr.dismissToast;    
         this.arr =[];  
         this.inviteform.reset();
      
     }, 3000);
     this.dialogRef.close();
    
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
  ShareJob() {
    this.isSharingStarted = true;

    this.Sharing.ShareId = 0;
    this.Sharing.FromuserId = this.customerUser;
    this.Sharing.CustomerId = this.customerId;
    this.Sharing.ToUserId = this.teammemberslist.map(x => x.UserId).toString();
    this.Sharing.ToEmailID = this.teammemberslist.map(x => x.Email).toString();
    this.Sharing.JobId = this.data.JobId;
    this.Sharing.FromEmail = this.customer.Email;
    this.Sharing.ToUserName = this.customer.FirstName +' ' + this.customer.LastName;
    this.Sharing.AppLink = this.settingsService.settings.CustomerAppLogin + ';JobId=' + this.data.JobId + ';CId=' + this.customerId;
    this.Sharing.Comments = this.selectedComments;
    if (this.Sharing.ToEmailID == "" && this.Sharing.Comments == undefined) {
      this.isSharingStarted = false;
      this.toastr.error('Please provide the valid details!', 'Oops!');
      setTimeout(() => {
        this.toastr.dismissToast;
      }, 3000);
    }
    else if (this.teammemberslist.length === 0) {
      this.isSharingStarted = false;
      this.toastr.error('Please Select and Add Team Member!', 'Oops!');
      setTimeout(() => {
        this.toastr.dismissToast;
      }, 3000);
    }
    else if (this.Sharing.Comments == undefined) {
      this.isSharingStarted = false;
      this.toastr.error('Please provide Comments!', 'Oops!');
      setTimeout(() => {
        this.toastr.dismissToast;
      }, 3000);
    }
    else if (this.Sharing.ToEmailID != "" && this.Sharing.Comments != undefined) {
        this.jobdetailsservice.JobShareInvite(this.Sharing).subscribe(data => {
          if (data === 0) {
            //this.inviteform.reset();
            this.teammemberslist = [];
            $('#teamMbr').val('');
            //this.selectedUserName = ''
            this.getTeammember = new CustomerUsers();
            this.Sharing = new JobShare();
            this.clearTeamMemebers();
            this.selectedComments = "";
            this.toastr.success('Mail sent successfully', 'Success');
            this.isSharingStarted = false;
            setTimeout(() => {
              this.toastr.dismissToast;
              this.dialogRef.close();
            }, 1000);
          }
        }, error => {
          console.log('error:', JSON.stringify(error));
        });

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
  readonly modules: ReadonlyArray<{}> = []
}


export class InviteInfo {
  customerId:number;
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
