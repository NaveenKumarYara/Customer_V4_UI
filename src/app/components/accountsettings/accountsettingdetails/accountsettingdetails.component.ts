import { Component, OnInit ,ViewChild,ViewContainerRef} from '@angular/core';
import { FormGroup, FormBuilder, Validators, MinLengthValidator } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../../../app.service';
import {FormsValidationService} from '../../../shared/validation/validation.service';
import { AlertService } from '../../../shared/alerts/alerts.service';
declare var $: any;
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import * as introJs from 'intro.js/intro.js';
import { OnDestroy } from '@angular/core/public_api';
@Component({
  selector: 'app-accountsettingdetails',
  templateUrl: './accountsettingdetails.component.html',
  styleUrls: ['./accountsettingdetails.component.css'],
  providers: [AppService,AlertService]
})
export class AccountsettingdetailsComponent implements OnInit,OnDestroy {
  @ViewChild(NgForm) myForm: NgForm;
  customer:any;  
  introJS = introJs();
  iseditPwd: any = false;
  iseditname: any = false;
  emailForm: FormGroup;
  nameForm: FormGroup;
  passForm: FormGroup;
  sent = new SendEmail();
  password:any;
  oldstatus: boolean = false;
  newstatus: boolean = false;
  confirmstatus: boolean = false;
  missMatchPwd: any = 0;
  iseditEmail: any = false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"; 
  constructor( private toastr:ToastsManager,private _vcr: ViewContainerRef,private appService: AppService, private router: Router,private fb: FormBuilder,private alertService : AlertService) { 
    this.FillData(); 
    this.createPasswordform();
    this.toastr.setRootViewContainerRef(_vcr);  
  }
  FillData() {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.emailForm = this.fb.group({
      'UserId': [this.customer.UserId, Validators.compose([Validators.required])],
      'Email': [this.customer.Email, Validators.compose([Validators.required, Validators.email])]
    });

    this.nameForm = this.fb.group({
      'UserId': [this.customer.UserId, Validators.compose([Validators.required])],
      'FirstName': [this.customer.FirstName, Validators.compose([Validators.required,Validators.min(3)])],
      'LastName': [this.customer.LastName, Validators.compose([Validators.required,Validators.min(3)])]
    });

  }
  createPasswordform() {
    this.passForm = this.fb.group({
      'UserId': [this.customer.UserId, Validators.compose([Validators.required])],
      'OldPassword': ['',Validators.compose([Validators.required])],
      'NewPassword': ['', [Validators.required, FormsValidationService.password]],
      'ConfirmPassword': ['', [Validators.required, FormsValidationService.password, FormsValidationService.matchOtherValidator('NewPassword')]]
    },
      { validator: matchingPasswords('NewPassword', 'ConfirmPassword') });
  }

  start()
  {
    this.introJS.start();
  }

  tClose()
  {
    this.introJS.exit();
  }

  ngOnDestroy() {
    this.tClose();
  }

  
  updateEmail()
  {
    this.tClose();
    this.appService.updateemail(this.emailForm.value)
    .subscribe(
    data => {
      this.SentEmail();
      let userStorage: any = this.customer;
      userStorage.email = this.emailForm.value.Email;
      $('#updateemail').text(userStorage.email);
      this.customer.Email = userStorage.email;
      sessionStorage.setItem('userData', JSON.stringify(userStorage));
      this.iseditEmail= false;
      this.FillData();
      this.toastr.success('Email had updated successfully','Success');
      setTimeout(() => { 
      this.toastr.dismissToast; 
      sessionStorage.removeItem('userData');
      sessionStorage.clear();
      this.router.navigateByUrl('/login' , { replaceUrl: true });
    }, 2000);
  },
    error => console.log(error));
  }

  SentEmail()
  {
    this.sent.AppLink = "https://arytic.com";
    this.sent.CustFromEmail = this.customer.Email;
    this.sent.ToEmailId = this.emailForm.value.Email;
    this.sent.CustToEmail = this.emailForm.value.Email;
    this.appService.SendAdminEditEmail(this.sent).subscribe(email=>
      {
       this.sent = new SendEmail();
      })
  }

  updateName()
  {
    this.tClose();
    this.appService.UpdateFullName(this.nameForm.value)
    .subscribe(
    data => {
      let userStorage: any = this.customer;
      userStorage.FirstName = this.nameForm.value.FirstName;
      userStorage.LastName = this.nameForm.value.LastName;
      $('#updateFirstName').text(userStorage.FirstName);
      $('#updateLastName').text(userStorage.LastName);
      this.customer.FirstName = userStorage.FirstName;
      this.customer.LastName = userStorage.LastName;
      sessionStorage.setItem('userData', JSON.stringify(userStorage));
      this.iseditname= false;
      this.FillData();
  },
    error => console.log(error));
  }
  oldPassword() {
    this.oldstatus = !this.oldstatus;
    var type = $("#oldPassword").attr("type");
    if (type == "text") {
      $("#oldPassword").prop('type', 'password');
    }
    else {
      $("#oldPassword").prop('type', 'text');
    }
  }
  newPassword() {
    this.newstatus = !this.newstatus;
    var type = $("#password").attr("type");
    if (type == "text") {
      $("#password").prop('type', 'password');
    }
    else {
      $("#password").prop('type', 'text');
    }
  }

  confirmPassword() {
    this.confirmstatus = !this.confirmstatus;
    var type = $("#confirmPassword").attr("type");
    if (type == "text") {
      $("#confirmPassword").prop('type', 'password');
    }
    else {
      $("#confirmPassword").prop('type', 'text');
    }
  }
  UpdatePass() {
    $('#oldPassword').css('border-color', '');
    if(this.passForm.value.OldPassword!= this.password)
    {
      this.alertService.error("Password given Doesn't match with Old Password");
    }
    else{
    this.appService.updatepassword(this.passForm.value)
      .subscribe(data => {
          $('#showPassword').removeClass('editmode');
          this.iseditPwd= false;
          this.createPasswordform();       
      },
        error => console.log(error));
    }
  }
  MissClear() {
    this.alertService.clear();
    $('#missmatchOld').hide();
  }
  clear() {
    this.createPasswordform();
    $('#missmatchOld').hide();
    this.myForm.resetForm(this.passForm);
  }
  ngOnInit() {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.password = JSON.parse(sessionStorage.getItem('oldPassword'));
    $("[data-toggle=tooltip]").tooltip();
  }

}

function matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
  return (group: FormGroup): { [key: string]: any } => {
    let NewPassword = group.controls[passwordKey];
    let ConfirmPassword = group.controls[confirmPasswordKey];

    if (NewPassword.value !== ConfirmPassword.value) {
      return {
        mismatchedPasswords: true
      };
    }
  }
}

export class SendEmail
{
  CustFromEmail:  string;
  CustToEmail:  string;
  AppLink:  string;
  ToEmailId: string;
}
