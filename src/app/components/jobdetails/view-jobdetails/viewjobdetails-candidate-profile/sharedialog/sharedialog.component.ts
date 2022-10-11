import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { concat } from 'rxjs/observable/concat';
import { AfterViewInit, Component, ElementRef, Inject, Input, OnInit, ViewContainerRef } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Subject } from 'rxjs/Subject';
import { CustomerUsers, PjTechnicalTeam } from '../../../../Postajob/models/jobPostInfo';
import { AppService } from '../../../../../app.service';
import { JobdetailsService } from '../../../jobdetails.service';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { CustomerContacts } from '../../../../../../models/customercontacts';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { of } from 'rxjs/observable/of';
import { SettingsService } from '../../../../../../settings/settings.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';

import { ApiService } from '../../../../../shared/services';
import { Item } from 'angular2-multiselect-dropdown';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

declare var $: any;
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-sharedialog',
  templateUrl: './sharedialog.component.html',
  styleUrls: ['./sharedialog.component.css','./sharedialog-new.component.css']
})
export class SharedialogComponent implements OnInit{
  managersList: Observable<CustomerUsers[]>;
  teammembers: '';
  dropdownList = [];
  selectedItems = [];
  GetContactsList: contactInfo[];
  customercontacts: CustomerContacts[];
  teammemberslist: CustomerUsers[];
  removable = true;
  cremovable = true;
  bcremovable = true;
  whatsapp: any;
  whatsappform: FormGroup;
  inviteform: FormGroup;
  getTeammember: CustomerUsers;
  profileSharing = new ProfileShare();
  customer: any;
  jobDescription:any;
  AddUser: boolean = false;
  activeAny: string;
  showCC: boolean = false;
  showBCC: boolean = false;
  customerId: number;
  UserId: any;
  SaveInfo = new contactInfo();
  info: number;
  public emailList = [];
  public ccemailList = [];
  public bccemailList = [];
  rulesForm: FormGroup;
  ccrulesForm: FormGroup;
  bccrulesForm: FormGroup;
  public separatorKeysCodes = [ENTER, COMMA];
  public ccseparatorKeysCodes = [ENTER, COMMA];
  public bccseparatorKeysCodes = [ENTER, COMMA];
  EmailId: any = null;
  Name: any = null;
  ccEmailAddress: string;
  ToEmailID: string;
  usersloading: boolean;
  customerUser: number;
  @Input() shareUrl: string;
  navUrl: string;
  selectedUserName: number;
  selectedComments: any;
  userId: number;
  type:string;
  CompanyName: any;
  Title: any;
  chipLists:any;
  Image:any;
  private subscription: Subscription;
  selectedUserInput = new Subject<string>();
  isSharingStarted: boolean;
  dropdownSettings = {};
  arr: any=[];
  constructor(public dialogRef: MatDialogRef<SharedialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private elementRef:ElementRef,private _service: ApiService,private fb: FormBuilder,private jobdetailsservice: JobdetailsService, private appService: AppService, private _vcr: ViewContainerRef, private toastr: ToastsManager, private settingsService: SettingsService) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId = this.customer.CustomerId;
    this.customerUser = this.customer.UserId;
    this.teamchange(false,0);
    this.GetProfileCard();
    this.GetLink();
    this.ToEmailID = this.data.EmailId;
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

  

  // ngAfterViewInit() {
  //   this.CompanyName=this.customer.FirstName;
  //   this.Title=this.data.Title;
  //   let body = <HTMLDivElement>document.body;
  //   let script = document.createElement('script');
  //   script.innerHTML = '';
  //   script.src = '../assets/js/oneall_script.js';
  //   script.async = true;
  //   script.defer = true;
  //   // script.append("val", "abcbcbc");
  //   body.appendChild(script);

  // }


  ngOnInit() {
   
    this.GetContacts();
    this.clearTeamMemebers();
    this.getcustomerusers();
    this.teamchange(false,0);
    this.shareUrl=this.settingsService.settings.CustomerAppprofile + ';Preid=' + this.data.ProfileId + ';Id=' + this.data.jobId + ';Cid=' + this.customerId;
    //this.GetInterView();
    //this.GetType();
    this.whatsappform = this.fb.group({
      'mobilenumber': ['', Validators.compose([Validators.required, Validators.minLength(10)])],
    });
    this.inviteform = this.fb.group({
      'inviteEmail'   : ['', Validators.compose([Validators.required, this.commaSepEmail])],
    });
    this.teammemberslist = this.appService.getTeammembers();
    this.subscription = this.appService.teammembersChanged
      .subscribe(
        (teammemberlist: CustomerUsers[]) => {
          this.teammemberslist = teammemberlist;
        }
      );

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


  onItemSelect(item: any) {
    this.selectedItems.push(Item);
   }
   onSelectAll(items: any) {
     this.selectedItems.push(Item);
   }

 GetProfileCard()
 {
  
  return this._service.GetService('IdentityAPI/api/GetSmartCard?jobId='+  this.data.jobId + '&profileId=',this.data.ProfileId)
  .subscribe(res => {
         this.profileSharing.Image = res;
         this.Image=res;
         this.CompanyName='Profile Details Preview';
         this.Title=this.data.Title.toUpperCase();
         //this.GetLink();
  });
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

  onItemDeleted(index) {
    this.GetContactsList.splice(index, 1);
  }

  public share(val) {
    this.type = val;
    this.createNavigationUrl();
    this.dialogRef.close();
    return window.open(this.navUrl, "_blank");

  }

  WhatsappShare() {
    let url = 'https://wa.me/' + this.whatsappform.value.mobilenumber + '?text=' +    this.settingsService.settings.CustomerAppprofile + ';Preid=' + this.data.ProfileId + ';Id=' + this.data.jobId + ';Cid=' + this.customerId;
    window.open(url, '_blank');
    this.toastr.success('Successfully shared', 'Success!!');
    this.whatsapp = undefined;
    $("#Whatsapp").Modal('hide');
    this.whatsappform.reset();
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

  GetContacts() {
    return this.appService.GetContactInfo(this.customerId, 0).subscribe(res => {
      this.GetContactsList = res;
    });
  }

  AddContacts() {
    if ((this.Name == undefined && this.EmailId == undefined) || (this.Name == '' && this.EmailId == '')) {
      this.toastr.error('Please provide the valid details!', 'Oops!');
      setTimeout(() => {
        this.toastr.dismissToast;
      }, 3000);
    }
    else {
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
          this.EmailId = '';
          this.GetContacts();
        }, 3000);

      })
    }
  }

  teamchange(val, inf) {
    this.AddUser = val;
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

  private createNavigationUrl() {
    let searchParams = new URLSearchParams();
    this.shareUrl=this.settingsService.settings.CustomerAppprofile + ';Preid=' + this.data.ProfileId + ';Id=' + this.data.jobId + ';Cid=' + this.customerId;
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
  teamExists(team, list) {
    return list.some(function (elem) {
      return elem.UserId === team.UserId;
    });
  }

  Whatsapp() {
    this.whatsapp = undefined;
    this.whatsappform.reset();
  }

  commaSepEmail = (control: AbstractControl): { [key: string]: any } | null => {
    const emails = control.value.split(',');
    const forbidden = emails.some(email => Validators.email(new FormControl(email)));
    console.log(forbidden);
    return forbidden ? { 'inviteEmail': { value: control.value } } : null;
  };

  

  titleCase(str) {
    return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
  }
  
  ShareProfile() {
    this.isSharingStarted = true;
    this.profileSharing.FromUser = this.titleCase(this.customer.FirstName) +'  '+ this.titleCase(this.customer.LastName);
    if (this.info == 0) {
      this.profileSharing.InviteFriendId = 0;
      this.profileSharing.FromuserId = this.customerUser;
      this.profileSharing.ToUserId = this.teammemberslist.map(x => x.UserId).toString();
      this.profileSharing.ToEmailId = this.teammemberslist.map(x => x.Email).toString();
      this.profileSharing.ApplicationName = (this.data.JobTitle != undefined ? this.data.JobTitle: ' ')+' '+ ' #' +this.data.jobId + ' ' + '-Arytic';
      this.profileSharing.AppLink = this.settingsService.settings.CustomerAppLogin + ';Preid=' + this.data.ProfileId + ';Id=' + this.data.jobId + ';Cid=' + this.customerId;
      this.profileSharing.Comments = this.selectedComments;
    }
    if (this.info == 1) {
      this.profileSharing.InviteFriendId = 0;
      this.profileSharing.FromuserId = this.customerUser;
      this.profileSharing.ToUserId = "0";
      this.profileSharing.ToEmailId = this.EmailId;
      this.profileSharing.ApplicationName = (this.data.JobTitle != undefined ? this.data.JobTitle: ' ')+' '+ ' #' +this.data.jobId + ' ' + '-Arytic';
      this.profileSharing.AppLink = this.settingsService.settings.CustomerAppprofile + ';Preid=' + this.data.ProfileId + ';Id=' + this.data.jobId + ';Cid=' + this.customerId;
      this.profileSharing.Comments = this.selectedComments!=null?this.selectedComments:'Please review the profile shared to you';
    }
    if (this.profileSharing.ToEmailId == "" && this.profileSharing.Comments == undefined) {
      this.toastr.error('Please provide the valid details!', 'Oops!');
      setTimeout(() => {
        this.toastr.dismissToast;
      }, 3000);
    }
    else if (this.profileSharing.Comments == undefined) {
      this.toastr.error('Please provide Comments!', 'Oops!');
      setTimeout(() => {
        this.toastr.dismissToast;
      }, 3000);
    }
    if (this.profileSharing.ToEmailId != "" && this.profileSharing.Comments != "") {
      if(this.info == 1 )
      {
        this.arr =this.inviteform.value.inviteEmail.split(',');
        this.arr.forEach(element => {
          this.profileSharing.ToEmailId = element;
        this.jobdetailsservice.ProfileShareInvite(this.profileSharing).subscribe(data => {
          if (data === 0) {
            //this.inviteform.reset();
            this.teammemberslist = [];
            $('#teamMbr').val('');
            //this.selectedUserName = ''
            this.getTeammember = new CustomerUsers();
            this.profileSharing = new ProfileShare();
            this.clearTeamMemebers();
            this.selectedComments = "";
            this.EmailId = " ";
            this.isSharingStarted = false;
            this.dialogRef.close();
            this.toastr.success('Mail sent successfully', 'Success');
            setTimeout(() => {
              this.toastr.dismissToast;
            }, 3000);
          }
        }, error => {
          this.isSharingStarted = false;
          console.log('error:', JSON.stringify(error));
        });
      });
      }
      else
      {
        this.jobdetailsservice.ProfileShareInvite(this.profileSharing).subscribe(data => {
          if (data === 0) {
            //this.inviteform.reset();
            this.teammemberslist = [];
            $('#teamMbr').val('');
            //this.selectedUserName = ''
            this.getTeammember = new CustomerUsers();
            this.profileSharing = new ProfileShare();
            this.clearTeamMemebers();
            this.selectedComments = "";
            this.EmailId = " ";
            this.isSharingStarted = false;
            this.dialogRef.close();
            this.toastr.success('Mail sent successfully', 'Success');
            setTimeout(() => {
              this.toastr.dismissToast;
            }, 3000);
          }
        }, error => {
          this.isSharingStarted = false;
          console.log('error:', JSON.stringify(error));
        });

      }
 
    }
  }
}





export class ProfileShare {
  InviteFriendId: number;
  FromuserId: number;
  ToUserId: string;
  Comments: string;
  AppLink: string;
  ToEmailId: string;
  FromEmailId: string;
  FromUser:string;
  Image:string;
  ApplicationName: string;
  readonly modules: ReadonlyArray<{}> = []
}

export class contactInfo {
  Infoid: number;
  CustomerId: number;
  UserId: number;
  Fullname: string;
  EmailId: string;
}