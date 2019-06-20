import { Component, OnInit, Inject,ViewContainerRef  } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Validators, ValidatorFn, AbstractControl, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { JobdetailsService } from '../../../jobdetails.service';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import { environment } from '../../../../../../environments/environment.prod';
import { AnimationStyleMetadata } from '@angular/core/src/animation/dsl';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-invite-profiledialog',
  templateUrl: './invite-profiledialog.component.html',
  styleUrls: ['./invite-profiledialog.component.css']
})

  export class InviteProfiledialogComponent implements OnInit {
    inviteinfo = new InviteInfo();
    inviteform: FormGroup;
    customer:any;
    customerId: any;
    userId: any;
    emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"; 
    //emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"; 
    Emailinvite:any;
    inviteEmail:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private jobdetailsservice: JobdetailsService, private toastr: ToastsManager, private _vcr: ViewContainerRef,private fb: FormBuilder, private router: Router) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId = this.customer.CustomerId;
    this.userId =  this.customer.UserId;

   }

  ngOnInit() {
    this.inviteform = this.fb.group({
      'inviteEmail'   : ['', Validators.compose([Validators.required, this.commaSepEmail])],
    });
  }

  commaSepEmail = (control: AbstractControl): { [key: string]: any } | null => {
    const emails = control.value.split(',');
    const forbidden = emails.some(email => Validators.email(new FormControl(email)));
    console.log(forbidden);
    return forbidden ? { 'inviteEmail': { value: control.value } } : null;
  };

  SaveInvite() {
    this.inviteinfo.userId = this.userId;
    this.inviteinfo.jobId = JSON.parse(sessionStorage.getItem('jobId'));
    this.inviteinfo.userName =  'Arytic User';
    this.inviteinfo.fullName = 'Arytic User';
    this.inviteinfo.statusId = 0;
    this.inviteinfo.ToEmailId = this.inviteform.value.inviteEmail;;
    this.inviteinfo.ApplicationName = 'Arytic';
    this.inviteinfo.CandFullName = 'Arytic User';
    this.inviteinfo.CustFullName = 'Arytic';
    this.inviteinfo.ClientLogo = '';
    this.inviteinfo.AppLink = environment.CandidateSignUp;
    if(this.inviteinfo.ToEmailId == "")
    {
      debugger
      this.toastr.error('Please provide the valid details!', 'Oops!');
        setTimeout(() => {
            this.toastr.dismissToast;
        }, 3000);
    }
    else if(this.inviteinfo.ToEmailId != "")
    {
    this.jobdetailsservice.InviteContact(this.inviteinfo).subscribe(data => {
       if (data === 0) {
        this.inviteform.reset();
        this.toastr.success('Mail sent successfully', 'Success');
        setTimeout(() => {
         this.toastr.dismissToast;
     }, 3000);
       }
     }, error => {
       alert('error ');
            console.log('error:', JSON.stringify(error));
           });
   }
  }
  

}

export class InviteInfo {
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