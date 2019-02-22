import { Component , ViewContainerRef} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AppService } from '../../app.service';
import { AlertService } from '../../shared/alerts/alerts.service';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import { CookieService } from 'angular2-cookie';

declare var $: any; 
@Component({
  
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[AppService,AlertService,CookieService]
})
export class HomeComponent {
         
  loginform: any;
  customerId:any;
  companyLogo:any;
  tkey= new token();
  show : any = false;
  result :any;
  Uid:any;
  tkeyres :any;
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$"; 
  password:any;
  userId:any;
  constructor(  private toastr:ToastsManager,private _vcr: ViewContainerRef,private route: ActivatedRoute,private _cookieService: CookieService,
      private fb: FormBuilder, private router: Router,private appService: AppService,private alertService : AlertService) {
        this.route.params.subscribe(params => {
       
          // else if (params['Uid']>0) {
          //   this.ActivatetheUser(params['Uid']);
          // }
        });
        //this.toastr.setRootViewContainerRef(_vcr);
        this.tkeyres  = this._cookieService.get('token');
        if(this.tkeyres !=null)
        {
          this.GetLogin(this.tkeyres);
        }
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


  GetLogin(res)
  {
    this.tkey.UserToken = res;
    this.appService.GetCustomerToken(this.tkey).subscribe(
      data => {
        sessionStorage.setItem('isLoggedin', JSON.stringify('true'));
        sessionStorage.setItem('userData', JSON.stringify(data));
        this.router.navigateByUrl('app-dashboardview');
        this._cookieService.remove('token'); 
      })
  }





  ngOnInit() {
  
  }
}

export class token
{
 public UserToken : string;
}

