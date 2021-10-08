import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { concat } from 'rxjs/observable/concat';
import { Component, Inject, ViewContainerRef } from '@angular/core';
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
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
declare var $: any;
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-sharejob',
  templateUrl: './sharejob.component.html',
  styleUrls: ['./sharejob.component.css']
})
export class ShareJobComponent {
  managersList: Observable<CustomerUsers[]>;
  teammembers: '';
  referLink:any;
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


  constructor(public dialogRef: MatDialogRef<ShareJobComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,private jobdetailsservice: JobdetailsService, private appService: AppService, private _vcr: ViewContainerRef, private toastr: ToastsManager, private settingsService: SettingsService) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId = this.customer.CustomerId;
    this.customerUser = this.customer.UserId;
    this.toastr.setRootViewContainerRef(_vcr);
  
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

  ngOnInit() {
    this.inviteform = this.fb.group({
      'inviteEmail'   : ['', Validators.compose([Validators.required, this.commaSepEmail])],
    });
    this.clearTeamMemebers();
    this.getcustomerusers();
    this.isSharingStarted = false;
    this.teammemberslist = this.appService.getTeammembers();
    this.subscription = this.appService.teammembersChanged
      .subscribe(
        (teammemberlist: CustomerUsers[]) => {
          this.teammemberslist = teammemberlist;
        }
      );
      this.referLink = this.settingsService.settings.NewJobDetailsRedirect + this.data.JobId;
  }

  getcustomerusers() {
    return this.appService.getCustomerContacts(this.customerId).subscribe(res => {
      this.customercontacts = res;
      this.customercontacts = this.customercontacts.filter(
        name => name.FirstName != "Invited");
    });
  }

  teamchange(val)
  {
  this.changeval= val;
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
      
      this.toastr.error('Please provide the valid details!', 'Oops!');
        setTimeout(() => {
            this.toastr.dismissToast;
        }, 3000);
    }
    else if(this.inviteinfo.ToEmailId != "")
    {
      
    this.jobdetailsservice.InviteContact(this.inviteinfo).subscribe(data => {
       if (data === 0) {  
        this.toastr.success('Mail sent successfully', 'Success');
        setTimeout(() => {
         this.toastr.dismissToast;      
         this.inviteform.reset();
      
     }, 3000);
     this.dialogRef.close();
    
       }
     }, error => {
       //alert('error ');
            console.log('error:', JSON.stringify(error));
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
    this.Sharing.ToUserName = this.teammemberslist.map(x => x.FirstName).toString();
    this.Sharing.AppLink = this.settingsService.settings.CustomerAppLogin + ';JobId=' + this.data.JobId + ';CId=' + this.customerId;
    this.Sharing.Comments = this.selectedComments;
    if (this.Sharing.ToEmailID == "" && this.Sharing.Comments == undefined) {
      this.toastr.error('Please provide the valid details!', 'Oops!');
      setTimeout(() => {
        this.toastr.dismissToast;
      }, 3000);
    }
    else if (this.teammemberslist.length === 0) {
      this.toastr.error('Please Select and Add Team Member!', 'Oops!');
      setTimeout(() => {
        this.toastr.dismissToast;
      }, 3000);
    }
    else if (this.Sharing.Comments == undefined) {
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
