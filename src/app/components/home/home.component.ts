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
        this.customerId = data.customerId;
        this.userId =data.userId;
        sessionStorage.setItem('customerId', JSON.stringify(this.customerId));
        sessionStorage.setItem('userId', JSON.stringify(this.userId));
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

  }
}

