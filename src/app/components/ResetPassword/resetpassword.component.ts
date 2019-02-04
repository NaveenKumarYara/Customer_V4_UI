import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AppService } from '../../app.service';
import { AlertService } from '../../shared/alerts/alerts.service';
import {FormsValidationService} from '../../shared/validation/validation.service';
declare var $: any; 
@Component({
  
  selector: 'resetPassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css'],
  providers:[AppService,AlertService]
})
export class ResetComponent {
  
  Resetform: any;
  customerId:any;
  companyLogo:any;
  password:any;
  userId:any;
  pid:any;
  Id:any;
  constructor( private route: ActivatedRoute,
      private fb: FormBuilder, private router: Router,private appService: AppService,private alertService : AlertService) {
        this.route.params.subscribe(params => {
            console.log(params);
            if (params['pid'] !==null) {
              sessionStorage.setItem('Pid', params['pid']);
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
Login()
{
  this.router.navigateByUrl('home'); 
}  
  
ResetNo()
{
  this.alertService.error('Please provide the valid details');
  setTimeout(() => {
    this.alertService.clear();
    this.Login();    
  }, 3000);
}
  Send() {
    this.appService.ResetPassword(this.Resetform.value)
      .subscribe(
      data => {
            this.alertService.success('Password changed successfully');
            this.Resetform.reset();
            sessionStorage.removeItem('Pid');
            setTimeout(() => {
                this.alertService.clear();
                this.Login();    
              }, 3000);
           }     
      );
  }


  ngOnInit() {
    this.pid =  sessionStorage.getItem('Pid');
    this.Resetform = this.fb.group({
      'Email': [this.pid, Validators.compose([Validators.nullValidator])],
      'Password': ['', [Validators.required, FormsValidationService.password]],
      'ConfirmPassword': ['', [Validators.required, FormsValidationService.password, FormsValidationService.matchOtherValidator('NewPassword')]]
    },
      { validator: matchingPasswords('Password', 'ConfirmPassword') });
   
  }
}

function matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let Password = group.controls[passwordKey];
      let ConfirmPassword = group.controls[confirmPasswordKey];
  
      if (Password.value !== ConfirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

