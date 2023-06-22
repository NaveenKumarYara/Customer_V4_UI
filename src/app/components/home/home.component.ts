import { Component,OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AppService } from '../../app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SettingsService } from '../../../settings/settings.service';

declare var $: any; 
@Component({
  
  selector: 'home',
  templateUrl: './home.component.html',
  providers:[AppService,NgxSpinnerService]
})
export class HomeComponent implements OnInit {
         
  loginform: any;
  customerId:any;
  companyLogo:any;
  tkey= new token();
  show : any = false;
  result :any;
  Uid:any;
  Plan:any;
  tkeyres :any;
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$"; 
  password:any;
  userId:any;
  constructor(  private spinner: NgxSpinnerService,private route: ActivatedRoute,
      private fb: FormBuilder, private router: Router,private appService: AppService, private settingsService: SettingsService) {
        this.route.params.subscribe(params => {
          if (params['tk']!=null) {
            if (params["pId"] != null) {
              sessionStorage.setItem("PlanId", params["pId"]);
            }
            this.GetLogin(params['tk']);
          }        
          else
          {
            this.router.navigateByUrl('/login' , { replaceUrl: true });
          }
        });
        this.spinner.show();
  }




  GetLogin(res)
  {
    this.tkey.UserToken = res;
    this.appService.GetCustomerToken(this.tkey).subscribe(
      data => {
        if(data.UserId>0&&data.IsActive==true)
        {
        this.spinner.hide();
        sessionStorage.setItem('isLoggedin', JSON.stringify('true'));
        sessionStorage.setItem('userData', JSON.stringify(data));
        this.Plan = sessionStorage.getItem("PlanId")
        if(this.Plan != null || this.Plan > 0)
        {
          this.router.navigateByUrl('app-accountsettings/app-billing-and-payments');
          
        }
        else 
        {
          this.router.navigateByUrl('app-dashboardview');
        }
      
        }
        else
        {
          window.location.href = this.settingsService.settings.customerLogin;
          //this.router.navigateByUrl('login');
        }
      })
  }





  ngOnInit() {
    this.router.navigateByUrl('/login' , { replaceUrl: true });
    this.spinner.show();
  }
}

export class token
{
 public UserToken : string;
}

