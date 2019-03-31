import { Component,OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AppService } from '../../app.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
  tkeyres :any;
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$"; 
  password:any;
  userId:any;
  constructor(  private spinner: NgxSpinnerService,private route: ActivatedRoute,
      private fb: FormBuilder, private router: Router,private appService: AppService) {
        
        this.route.params.subscribe(params => {
          if (params['tk']!=null) {
            this.GetLogin(params['tk']);
          }
          else
          {
            this.router.navigateByUrl('login');
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
        this.router.navigateByUrl('app-dashboardview');
        }
        else
        {
          window.location.href = environment.customerLogin;
          //this.router.navigateByUrl('login');
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

