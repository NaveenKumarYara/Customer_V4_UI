import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AppService } from '../../app.service';
import { AlertService } from '../../shared/alerts/alerts.service';
declare var $: any; 
@Component({
  
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[AppService,AlertService]
})
export class HomeComponent {
  
  loginform: any;
  customerId:any;
  companyLogo:any;
  password:any;
  userId:any;
  constructor( private fb: FormBuilder, private router: Router,private appService: AppService,private alertService : AlertService) {

  }
 
  SignUp()
  {
    this.router.navigateByUrl('signup'); 
  }
  login() {
    this.appService.Login(this.loginform.value)
      .subscribe(
      data => {
        this.password = $("#password").val();
        sessionStorage.setItem('oldPassword',JSON.stringify(this.password));
        sessionStorage.setItem('isLoggedin', JSON.stringify('true'));
        sessionStorage.setItem('userData', JSON.stringify(data));
        this.customerId = data.customerId;
        this.userId =data.userId;
            this.router.navigateByUrl('app-dashboardview');
      },

      error => {
        this.alertService.error('Please provide the valid details');
        this.loginform.reset();
      },
      () => console.log('Call Sucessfull')
      );
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

