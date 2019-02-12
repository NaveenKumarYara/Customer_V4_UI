import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
  show : any = false;
  result :any;
  Uid:any;
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$"; 
  password:any;
  userId:any;
  constructor( private route: ActivatedRoute,
      private fb: FormBuilder, private router: Router,private appService: AppService,private alertService : AlertService) {
        this.route.params.subscribe(params => {
          if (params['Uid'] !==null) {
            this.ActivatetheUser(params['Uid']);
          }
        });
      
      
  }

//   login1(username: string, password: string) {
//     return this.http.post<any>('/api/authenticate', { username: username, password: password })
//         .map(user => {
//             // login successful if there's a jwt token in the response
//             if (user && user.token) {
//                 // store user details and jwt token in local storage to keep user logged in between page refreshes
//                 localStorage.setItem('currentUser', JSON.stringify(user));
//             }

//             return user;
//         });
// }
  SignUp()
  {
    this.router.navigateByUrl('signup'); 
  }
  forgot()
  {
    this.router.navigateByUrl('ForgotPassword'); 
  }

  GetEmailValidate()
  {

    this.appService.validateemail(this.loginform.value.UserName)
    .subscribe(
    data => {
      
      this.result = data;
      if(this.result.UserId>0&&this.result.CustomerId>0)
      {  
        this.login();    
      }
      else
      {   
        this.show= true;   
       setTimeout(() => {
        this.show= false;
        this.loginform.reset();
      }, 3000);
      }
    })
  }

  login() {
    this.show= false;
    if(!this.loginform.valid)
    {
      this.alertService.error('Please provide the valid details');
      setTimeout(() => {
        this.alertService.clear();
      }, 2000);
      this.loginform.reset();
    }
    else
    {
    this.appService.Login(this.loginform.value)
      .subscribe(
      data => {
        if (data.IsActive == false) {
          this.alertService.error('Please activate the link to login');
          setTimeout(() => {
            this.alertService.clear();
          }, 2000);
          this.loginform.reset();
        } 
        else {
        this.password = $("#password").val();
        sessionStorage.setItem('oldPassword',JSON.stringify(this.password));
        sessionStorage.setItem('isLoggedin', JSON.stringify('true'));
        sessionStorage.setItem('userData', JSON.stringify(data));
        this.customerId = data.customerId;
        this.userId =data.userId;
            this.router.navigateByUrl('app-dashboardview');
        }
          },

      error => {
        this.alertService.error('Please provide the valid details');
        setTimeout(() => {
          this.alertService.clear();
        }, 2000);
        this.loginform.reset();
      },
      () => console.log('Call Sucessfull')
      );          
    }
  }
  MissClear() {
    this.show= false;
    this.alertService.clear();
  }

  ActivatetheUser(Uid)
  {
    this.appService.ActivateUser(Uid).subscribe(
      data => {
      this.alertService.success('Customer is activated. Please login to continue');
      setTimeout(() => {
        this.alertService.clear();
      }, 3000);
      })
  }

  ngOnInit() {
    this.show= false;
    this.loginform = this.fb.group({
      'UserName': ['', Validators.compose([Validators.required])],
      'Password': ['', Validators.compose([Validators.required])],
    });
    $(".glyphicon-eye-open").on("click", function () {
      $(this).toggleClass("glyphicon-eye-close");
      var type = $("#password").attr("type");
      if (type === 'text') {
        $('#password').prop('type', 'password');
      } else {
        $('#password').prop('type', 'text');
      }
    });

  }
}

