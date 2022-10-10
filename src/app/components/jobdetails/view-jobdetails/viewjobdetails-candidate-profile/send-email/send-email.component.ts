
import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { ApiService } from '../../../../../shared/services/api.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { JobdetailsService } from '../../../jobdetails.service';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { SettingsService } from '../../../../../../settings/settings.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from '../../../../../app.service';
import { CustomerSubscription } from '../../../../../../models/CustomerSubscription';
import { GetSubscriptionDetails } from '../../../../../../models/GetSubscriptionDetails';
import { FormGroup, AbstractControl, Validators, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css','./send-email-new.component.css'],
  providers: [ApiService]
})
export class SendEmailComponent implements OnInit {
  conversation = new StartConversation();
  emailUpdate = new EmailUpdateStatus();
  subject: string;
  ccEmailAddress: string;
  ToEmailID: string;
  customerName = null;
  chipList:any;
  fromId:any;
  mailbox: any = false;
  subdetails = new CustomerSubscription();
  sdetails = new GetSubscriptionDetails();
  isPublicAvailable: any;
  checkvalue: any;
  UserId: any;
  UserRoleId: any;
  body: string;
  isSendingEmail: boolean;
  public separatorKeysCodes = [ENTER, COMMA];
  public ccseparatorKeysCodes = [ENTER, COMMA];
  public bccseparatorKeysCodes = [ENTER, COMMA];
  public emailList = [];
  public ccemailList = [];
  public bccemailList = [];
  removable = true;
  cremovable = true;
  bcremovable = true;
  rulesForm: FormGroup;
  ccrulesForm: FormGroup;
  bccrulesForm: FormGroup;
  activeAny: string;
  showCC: boolean = false;
  showBCC: boolean = false;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  fb: FormBuilder = new FormBuilder();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private appService: AppService, private _service: ApiService, public dialogRef: MatDialogRef<SendEmailComponent>, private toastr: ToastsManager, private _vcr: ViewContainerRef, private jobdetailsservice: JobdetailsService, private settingsService: SettingsService) {
    this.toastr.setRootViewContainerRef(_vcr);
    this.customerName = JSON.parse(sessionStorage.getItem('userData'));
    this.fromId = this.customerName.Email;
    this.emailUpdate.JobId = data.jobId;
    this.emailUpdate.JobResponseId = data.jobResponseId;
    this.emailUpdate.ProfileId = data.profileId;
    this.emailUpdate.ResponseStatusId = data.responseStatusId;
    this.mailbox = false;
    this.body = 'Join hands with us and make your goals achieved!.';
    this.subject = 'Please submit the consent';
    this.ToEmailID = this.data.EmailId;
    this.Check();
    this.UserCheck(this.data.ProfileId);
    this.GetCustomerSubscription();
  }

  ngOnInit() {
    this.mailbox = true;
    this.rulesForm = this.fb.group({
      emails: this.fb.array([], this.validateArrayNotEmpty)
    });
    this.ccrulesForm = this.fb.group({
      CCemails: this.fb.array([], this.validateArrayNotEmpty)
    });
    this.bccrulesForm = this.fb.group({
      BCCemails: this.fb.array([], this.validateArrayNotEmpty)
    });

    this.emailList.push({ value: this.data.EmailId, invalid: false });
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
  }

  showClickCC() {
    this.showCC = !this.showCC;
  }

  showClickBCC() {
    this.showBCC = !this.showBCC;
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

  GetCustomerSubscription() {
    return this.appService.GetCustomerSubscription(this.customerName.UserId).subscribe(res => {
      if (res != null) {
        this.subdetails = res;
        this.GetSubscriptionDetails(res.subscriptionId);
        // this.GetInvoiceEstimates();
        // this.GetUnbilledChargeDetails();
      }

    });
  }

  GetSubscriptionDetails(sid) {
    return this.appService.GetSubscriptionDetails(sid).subscribe(res1 => {
      if (res1 != null) {
        this.sdetails = res1;
      }
      else {
        this.sdetails.planId = '0';
      }
    });
  }

  UserCheck(ProfileId) {
    this._service.GetService('IdentityAPI/api/GetCandidateUserRoleByProfileId?profileId=', this.data.profileId).subscribe(
      res => {
        this.UserRoleId = res.UserRoleId;
        this.UserId = res.UserId;
      });
  }

  sendEmail() {

    this.isSendingEmail = true;
    //this.spinner.show();
    this.conversation.FullName = this.data.firstname + this.data.lastname;
    this.conversation.Subject = this.subject;
    this.conversation.CCEmailAddress = this.ccemailList.map(x => x.value).toString();
    this.conversation.ToEmailID = this.emailList.map(x => x.value).toString();
    this.conversation.BCCEmailAddress = this.bccemailList.map(x => x.value).toString();
    this.conversation.Body = this.body;
    // if(){
    if (this.data.profileUpload === false || this.data.profileUpload === undefined) {
      if (this.UserId > 0) {
        this.conversation.AppLink = this.settingsService.settings.CandidateLogin + ';lid=' + this.data.ccpid;
      }
      else {
        if (this.sdetails.planId != "enterprise" || this.sdetails.planId === undefined) {
          this.conversation.AppLink = this.settingsService.settings.NewCandidateSignUp + ';sid=' + this.data.ccpid + ';jId=' + this.data.jobId;
        }
        else
        {
          this.conversation.AppLink = this.settingsService.settings.CandidateSignUp + ';Cid=' + this.data.CustomerId + ';sid=' + this.data.ccpid;
        }
      }
    }
    if (this.data.profileUpload === true) {
      if (this.sdetails.planId != "enterprise" || this.sdetails.planId === undefined) {
        if (this.UserId > 0) {
          this.conversation.AppLink = this.settingsService.settings.CandidateLogin + ';lid=' + this.data.ccpid;
        }
        else {
          this.conversation.AppLink = this.settingsService.settings.NewCandidateSignUp + ';sid=' + this.data.ccpid + ';jId=' + this.data.jobId;
        }

      }
      if (this.sdetails.planId === "enterprise") {
        if (this.UserId > 0) {
          this.conversation.AppLink = this.settingsService.settings.CandidateLogin + ';lid=' + this.data.ccpid;
        }
        else {
          this.conversation.AppLink = this.settingsService.settings.CandidateSignUp + ';Cid=' + this.data.CustomerId + ';sid=' + this.data.ccpid;
        }
      }



    }
    this.conversation.UserCheck = this.data.userId > 0 ? 'Login' : 'Yes I will Join';
    // }

    this.jobdetailsservice.StartConversation(this.conversation).subscribe(data => {

      if (data === 0) {
        this.jobdetailsservice.UpdateStatusOnEmailConversation(this.emailUpdate).subscribe(data1 => {
        });

        //this.spinner.hide();
        this.isSendingEmail = false;
        this.dialogRef.close();
        this.emailList=[];
        this.toastr.success('Mail Sent', 'Success');
        setTimeout(() => {
          this.toastr.dismissToast;
        }, 3000);
        this.conversation.FullName = '';
        this.conversation.Subject = '';
        this.conversation.Body = '';
        this.conversation.ToEmailID = '';
        this.mailbox = false;
      }
    },
      error => {
        this.isSendingEmail = false;
      },
      () => {
        this.isSendingEmail = false;
      });
  }

  Check() {
    this._service.GetService('ProfileAPI/api/GetProfileStatus?profileId=', this.data.profileId).subscribe(
      data => {
        let apiData = data;
        this.isPublicAvailable = apiData.isPublicAvailable;
      });
  }

  EditMail() {
    this.ToEmailID = this.data.EmailId;

  }
}

export class StartConversation {
  FullName: string;
  Subject: string;
  Body: string;
  ToEmailID: string;
  FromID: string;
  ApplicationName: string;
  AppLink: string;
  UserCheck: string;
  CCEmailAddress: string;
  BCCEmailAddress: string;
}
export class EmailUpdateStatus {
  JobResponseId: number;
  ProfileId: number;
  JobId: number;
  ResumeId: number;
  ResponseStatusId: number;
}
