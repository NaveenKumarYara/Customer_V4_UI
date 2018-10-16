import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService} from '../../shared/services/api.service/api.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
declare var $: any; 
@Component({
  
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  
  loginform: any;
  customerId:any;
  userId:any;
  constructor( private fb: FormBuilder, private _service: ApiService, private router: Router) {

  }
 

  login() {
    this._service.PostService(this.loginform.value, 'IdentityAPI/api/CustomerLogin')
      .subscribe(
      data => {
        sessionStorage.setItem('isLoggedin', JSON.stringify('true'));
        sessionStorage.setItem('userData', JSON.stringify(data));
        this.customerId = data.customerId;
        this.userId =data.userId;
            this.router.navigateByUrl('app-dashboardview');
            $("#header").show();
      },

      error => {
       // $('#loginInfo').modal('show');
        this.loginform.reset();
      },
      () => console.log('Call Sucessfull')
      );
    // if (this.loginform.value.UserName === 'admin' && this.loginform.value.Password === '121212') {
    //   sessionStorage.setItem('isLoggedin', JSON.stringify('true'));
    //   this.router.navigateByUrl('dashboard');
    // }
  }

  ngOnInit() {
    $("#header").hide();
    $("#footer").hide();
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

