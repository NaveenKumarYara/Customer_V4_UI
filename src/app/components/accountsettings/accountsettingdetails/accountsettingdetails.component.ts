import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../../../app.service';
import {FormsValidationService} from '../../../shared/validation/validation.service';
declare var $: any;
@Component({
  selector: 'app-accountsettingdetails',
  templateUrl: './accountsettingdetails.component.html',
  styleUrls: ['./accountsettingdetails.component.css'],
  providers: [AppService]
})
export class AccountsettingdetailsComponent implements OnInit {
  @ViewChild(NgForm) myForm: NgForm;
  customer:any;  
  iseditPwd: any = false;
  emailForm: FormGroup;
  passForm: FormGroup;
  oldstatus: boolean = false;
  newstatus: boolean = false;
  confirmstatus: boolean = false;
  missMatchPwd: any = 0;
  iseditEmail: any = false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"; 
  constructor( private appService: AppService, private router: Router,private fb: FormBuilder) { 
    this.FillData(); 
    this.createPasswordform();  
  }
  FillData() {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.emailForm = this.fb.group({
      'UserId': [this.customer.UserId, Validators.compose([Validators.required])],
      'Email': [this.customer.Email, Validators.compose([Validators.required, Validators.email])]
    });
  }
  createPasswordform() {
    this.passForm = this.fb.group({
      'UserId': [this.customer.UserId, Validators.compose([Validators.required])],
      'OldPassword': ['', Validators.required],
      'NewPassword': ['', [Validators.required, FormsValidationService.password]],
      'ConfirmPassword': ['', [Validators.required, FormsValidationService.password, FormsValidationService.matchOtherValidator('NewPassword')]]
    },
      { validator: matchingPasswords('NewPassword', 'ConfirmPassword') });
  }
  updateEmail()
  {

    this.appService.updateemail(this.emailForm.value)
    .subscribe(
    data => {
      let userStorage: any = this.customer;
      userStorage.email = this.emailForm.value.Email;
      $('#updateemail').text(userStorage.email);
      this.customer.Email = userStorage.email;
      sessionStorage.setItem('userData', JSON.stringify(userStorage));
      this.iseditEmail= false;
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
    debugger
    $('#oldPassword').css('border-color', '');
    console.log(this.passForm.value);
    this.appService.updatepassword(this.passForm.value)
      .subscribe(data => {
        if (data == 1) {
          this.missMatchPwd = 1;     
        }
        else {
          $('#showPassword').removeClass('editmode');
          this.missMatchPwd = 0;
          this.iseditPwd= false;
          this.createPasswordform();
        }
      },
        error => console.log(error));
  }
  MissClear() {
    $('#missmatchOld').hide();
  }
  clear() {
    this.createPasswordform();
    $('#missmatchOld').hide();
    this.myForm.resetForm(this.passForm);
  }
  ngOnInit() {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
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
