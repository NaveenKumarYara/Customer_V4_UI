import { Component , ViewContainerRef} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AppService } from '../../app.service';
import { AlertService } from '../../shared/alerts/alerts.service';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
declare var $: any; 
@Component({
  
  selector: 'ForgotPassword',
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
  constructor( private route: ActivatedRoute, private toastr:ToastsManager,private _vcr: ViewContainerRef,
      private fb: FormBuilder, private router: Router,private appService: AppService,private alertService : AlertService) {
        this.toastr.setRootViewContainerRef(_vcr);
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
  

  Send() {
    if(!this.Forgotform.valid)
    {
      this.toastr.error('Please provide the valid details!', 'Oops!');
      setTimeout(() => {
          this.toastr.dismissToast;
      }, 3000);
    }
    else
    {
      this.appService.validateemail(this.Forgotform.value.EmailId)
      .subscribe(
      data => {
        this.result = data;
        if(this.result.UserId>0&&this.result.CustomerId>0)
        {
          this.appService.ForgotPassword(this.Forgotform.value)
          .subscribe(
          data => {
             this.toastr.success('Please check your email to reset the password');
                setTimeout(() => {
                    this.alertService.clear();
                    this.toastr.dismissToast;
                    this.Login();    
                  }, 3000);
                 
               } 
              
          );
        }
        else
        {
   
            this.toastr.error('Email Not Registered!', 'Oops!');
            setTimeout(() => {
                this.toastr.dismissToast;
                this.Forgotform.reset();
            }, 3000);
          }
              

        })
    }


  }


  ngOnInit() {
    this.Forgotform = this.fb.group({
      'EmailId': ['', Validators.compose([Validators.required])],  
    });
   
  }
}

