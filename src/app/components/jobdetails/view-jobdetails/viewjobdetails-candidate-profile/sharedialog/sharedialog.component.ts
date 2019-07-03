import { Component, OnInit, Inject,Input,ViewContainerRef  } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Validators, ValidatorFn, AbstractControl, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { JobdetailsService } from '../../../jobdetails.service';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import { environment } from '../../../../../../environments/environment.prod';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-sharedialog',
  templateUrl: './sharedialog.component.html',
  styleUrls: ['./sharedialog.component.css']
})
export class SharedialogComponent implements OnInit {
  inviteinfo = new InviteInfo();
  inviteform: FormGroup;
  customer:any;
  @Input() jobid: number;
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
    this.toastr.setRootViewContainerRef(_vcr);

   }

  ngOnInit() {
    this.inviteform = this.fb.group({
      'inviteEmail'   : ['', Validators.compose([Validators.required, this.commaSepEmail])],
      'inviteComment'   : ['', Validators.compose([Validators.nullValidator])],
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
      this.inviteinfo.jobId = this.data.jobId;
      this.inviteinfo.userName =  'Arytic User';
      this.inviteinfo.fullName = 'Arytic User';
      this.inviteinfo.statusId = 0;
      this.inviteinfo.ToEmailId = this.inviteform.value.inviteEmail;;
      this.inviteinfo.ApplicationName = 'Arytic';
      this.inviteinfo.CandFullName = this.data.Title;
      this.inviteinfo.CustFullName = this.inviteform.value.inviteComment;
      this.inviteinfo.ClientLogo = '';
      this.inviteinfo.AppLink = environment.CandidateSignUp+';Pid='+this.data.ProfileId;
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
