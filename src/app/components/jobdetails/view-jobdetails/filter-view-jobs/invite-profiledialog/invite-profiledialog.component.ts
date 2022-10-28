import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Validators, ValidatorFn, AbstractControl, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { JobdetailsService } from '../../../jobdetails.service';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { GetInviteList } from '../../../../../../models/GetCompanyBenefit';
import { AnimationStyleMetadata } from '@angular/core/src/animation/dsl';
import { SettingsService } from '../../../../../../settings/settings.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-invite-profiledialog',
  templateUrl: './invite-profiledialog.component.html',
  styleUrls: ['./invite-profiledialog.component.css','./invite-profiledialog-new.component.css']
})

export class InviteProfiledialogComponent implements OnInit {
  inviteinfo = new InviteInfo();
  inviteform: FormGroup;
  customer: any;
  loading = false;
  startedInvite: boolean;
  loginstyle(): void {
    this.loading = true;
  }
  activeAny: string;
  customerId: any;
  userId: any;
  jobId: any;
  jobData: GetInviteList[];
  emailPattern = "^(([a-zA-Z\-0-9\.]+@)([a-zA-Z\-0-9\.]+)[,]*)+$";
  Emailinvite: any;
  inviteEmail: any;
  removable = true;
  cremovable = true;
  bcremovable = true;
  public emailList = [];
  public ccemailList = [];
  public bccemailList = [];
  showCC: boolean = false;
  showBCC: boolean = false;
  rulesForm: FormGroup;
  ccrulesForm: FormGroup;
  bccrulesForm: FormGroup;
  public separatorKeysCodes = [ENTER, COMMA];
  public ccseparatorKeysCodes = [ENTER, COMMA];
  public bccseparatorKeysCodes = [ENTER, COMMA];
  chipLists:any;

  constructor(public dialogRef: MatDialogRef<InviteProfiledialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private jobdetailsservice: JobdetailsService, private toastr: ToastsManager, private _vcr: ViewContainerRef, private fb: FormBuilder, private router: Router, private settingsService: SettingsService) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId = this.customer.CustomerId;
    this.userId = this.customer.UserId;

  }

  ngOnInit() {
    this.startedInvite = false;
    this.inviteform = this.fb.group({
      'inviteEmail': ['', Validators.compose([Validators.required, this.commaSepEmail])],
    });
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



  GetInviteList() {
    return this.jobdetailsservice.getInviteList(this.customerId, this.data.jobId).subscribe(res => {
      this.jobData = res;
    });
  }

  commaSepEmail = (control: AbstractControl): { [key: string]: any } | null => {
    const emails = control.value.split(',');
    const forbidden = emails.some(email => Validators.email(new FormControl(email.replace(/\s/g, ""))));
    console.log(forbidden);
    return forbidden ? { 'inviteEmail': { value: control.value } } : null;
  };

  SaveInvite() {

    this.startedInvite = true;

    this.inviteinfo.customerId = this.customerId;
    this.inviteinfo.userId = this.userId;
    this.inviteinfo.jobId = this.data.jobId;
    this.inviteinfo.userName = this.customer.FirstName;
    this.inviteinfo.fullName = this.customer.FirstName +' '+this.customer.LastName ;
    this.inviteinfo.statusId = 0;
    this.inviteinfo.ToEmailId = this.inviteform.value.inviteEmail;
    this.inviteinfo.ApplicationName = 'Arytic';
    this.inviteinfo.CandFullName = 'New User';
    this.inviteinfo.CustFullName = this.customer.FirstName;
    this.inviteinfo.ClientLogo = '';
    this.inviteinfo.AppLink = this.settingsService.settings.NewJobDetailsRedirect + this.data.jobId;
    if (this.inviteinfo.ToEmailId == "") {

      this.toastr.error('Please provide the valid details!', 'Oops!');
      setTimeout(() => {
        this.toastr.dismissToast;
      }, 3000);
    }
    else if (this.inviteinfo.ToEmailId != "") {

      this.jobdetailsservice.InviteContact(this.inviteinfo).subscribe(data => {
        if (data === 0) {
          this.startedInvite = false;
          this.dialogRef.close();
          this.toastr.success('Mail sent successfully', 'Success');
          setTimeout(() => {
            this.toastr.dismissToast;
            this.loading = false;
            this.inviteform.reset();
          }, 3000);
        }
      }, error => {
        this.startedInvite = false;
        console.log('error:', JSON.stringify(error));
      });
    }
  }


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