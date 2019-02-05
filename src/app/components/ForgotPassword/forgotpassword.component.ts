import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AppService } from '../../app.service';
import { AlertService } from '../../shared/alerts/alerts.service';
declare var $: any; 
@Component({
  
  selector: 'forgotPassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
  providers:[AppService,AlertService]
})
export class ForgotComponent {
  
  Forgotform: any;
  customerId:any;
  companyLogo:any;
  password:any;
  email:any;
  result :any;
  userId:any;
  constructor( private route: ActivatedRoute,
      private fb: FormBuilder, private router: Router,private appService: AppService,private alertService : AlertService) {

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
Login()
{
  this.router.navigateByUrl('home'); 
}
  SignUp()
  {
    this.router.navigateByUrl('signup'); 
  }
  
  GetEmailValidate()
  {
    this.appService.validateemail(this.Forgotform.value.EmailId)
    .subscribe(
    data => {
      this.result = data;
      debugger
      if(this.result.UserId>0&&this.result.CustomerId>0)
      {
        this.Send();
      }
      else
      {
        this.alertService.error('email not registered');
        setTimeout(() => {
          this.alertService.clear();  
          this.Forgotform.reset();       
        }, 2000);    
      }
    })
  }
  Send() {
    this.appService.ForgotPassword(this.Forgotform.value)
      .subscribe(
      data => {
            this.alertService.success('Please check your email to reset the password');
            setTimeout(() => {
                this.alertService.clear();
                this.Forgotform.reset();
                this.Login();    
              }, 3000);
             
           } 
          
      );
  }


  ngOnInit() {
    this.Forgotform = this.fb.group({
      'EmailId': ['', Validators.compose([Validators.required])],  
    });
   
  }
}

