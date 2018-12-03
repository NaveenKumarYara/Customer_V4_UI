import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AppService } from '../../app.service';
import { AlertService } from '../../shared/alerts/alerts.service';
declare var $: any; 
@Component({
  
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers:[AppService,AlertService]
})
export class SignUpComponent {
  
  loginform: any;
  customerId:any;
  companyLogo:any;
  password:any;
  userId:any;
  constructor( private fb: FormBuilder, private router: Router,private appService: AppService,private alertService : AlertService) {

  }
 
 

  SignUp() {
   
  }
  MissClear() {
    this.alertService.clear();
  }

  ngOnInit() {
    this.loginform = this.fb.group({
      'UserName': ['', Validators.compose([Validators.required])],
      'Password': ['', Validators.compose([Validators.required])],
    });
    $(".glyphicon-eye-open").on("click", function () {
      $(this).toggleClass("glyphicon-eye-close");
      var type = $("#password").attr("type");
      if (type == "text") {
        $("#password").prop('type', 'password');
      }
      else {
        $("#password").prop('type', 'text');
      }
    });

  }
}

