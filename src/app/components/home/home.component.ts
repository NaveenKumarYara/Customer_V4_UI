import { Component,OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AppService } from '../../app.service';
import { CookieService } from 'angular2-cookie';
import { NgxSpinnerService } from 'ngx-spinner';

declare var $: any; 
@Component({
  
  selector: 'home',
  templateUrl: './home.component.html',
  providers:[AppService,CookieService,NgxSpinnerService]
})
export class HomeComponent implements OnInit {
         
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
  constructor(  private spinner: NgxSpinnerService,private route: ActivatedRoute,private _cookieService: CookieService,
      private fb: FormBuilder, private router: Router,private appService: AppService) {
        this.spinner.show();
        this.tkeyres  = this._cookieService.get('token');
        if(this.tkeyres !=null)
        {         
          this.GetLogin(this.tkeyres);
        }
        else
        {
          this.router.navigateByUrl('login');
        }
  }




  GetLogin(res)
  {
    this.tkey.UserToken = res;
    this.appService.GetCustomerToken(this.tkey).subscribe(
      data => {
        if(data.UserId>0 && data.IsActive == true)
        {
        this.spinner.hide();
        sessionStorage.setItem('isLoggedin', JSON.stringify('true'));
        sessionStorage.setItem('userData', JSON.stringify(data));
        this.router.navigateByUrl('app-dashboardview');
        this.tkeyres = null;
        this.tkey.UserToken= null;
        this._cookieService.remove('token'); 
        }
        else
        {
          this.router.navigateByUrl('login');
        }
      })
  }





  ngOnInit() {
    this.spinner.show();
  }
}

export class token
{
 public UserToken : string;
}

