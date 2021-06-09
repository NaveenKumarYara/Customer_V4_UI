import { Component ,OnInit,ViewContainerRef} from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../../app.service';
import { environment } from '../../../../environments/environment.prod';
import { billEstimates } from '../../../../models/billEstimates';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import { CustomerSubscription } from '../../../../models/CustomerSubscription';
import { GetSubscriptionDetails } from '../../../../models/GetSubscriptionDetails';
import { ApiService } from '../../../shared/services/api.service/api.service';
declare var $: any; 
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {  
  customer:any;
  companyLogo:any;
  bill:billEstimates; 
  notificationsCount: any;
  active:boolean=false;
  jobsactive:boolean=false;
  daysRemaining:any;
  postactive:boolean=false;
  addPricing = new payment();
  subdetails:CustomerSubscription;
  sdetails:GetSubscriptionDetails;
  constructor( private appService: AppService,  private _service: ApiService,private router: Router,private toastr:ToastsManager, private _vcr: ViewContainerRef) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.toastr.setRootViewContainerRef(_vcr);
    if (this.customer == null) {
        this.Logout();
    }
    if(this.customer!=null)
    {
      this.GetCustomerSubscription();
    }
 
    // sessionStorage.setItem('ProfileThumbnail', this.candidateDetails.UserProfilePictureUrl);
    // else {
    //     let pic = sessionStorage.getItem('ProfileThumbnail');
    //     if (pic) {
    //         if (pic.length > 55) {
    //             this.customer.UserProfilePictureUrl = pic;
    //         }
    //     }
    // }
    
  }

  GetCustomerSubscription()
{
  return this.appService.GetCustomerSubscription(this.customer.UserId).subscribe(res => {
    this.subdetails = res;
    if(res!=null)
    {
        this.GetSubscriptionDetails(res.subscriptionId);
    }
    // this.GetInvoiceEstimates();
    // this.GetUnbilledChargeDetails();
});
}

GetSubscriptionDetails(sid)
{
  return this.appService.GetSubscriptionDetails(sid).subscribe(res => {
    this.sdetails = res;
    let date = new Date();  
    let val = new Date(date.setDate(date.getDate()));
    var diff = Math.abs(new Date(this.sdetails.nextBillingAt) .getTime() - new Date(date.setDate(date.getDate())).getTime());
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24));  
    this.daysRemaining = diffDays;
    if(this.daysRemaining < 0 ||  this.sdetails.nextBillingAt==null)
    {
      this.active=true;
      this.daysRemaining=0;
      this.changetheactive(3);
    }
    // if(new Date(this.sdetails.nextBillingAt) < val && this.sdetails.nextBillingAt!=null)
    // {     
    //   this.active=true;
    //   this.changetheactive(3);
    // }
    // if(this.sdetails.nextBillingAt==null)
    // {
    //   this.active=true;
    //   this.daysRemaining=0;
    // }
    else 
    {
      this.active=false;
    }
  });
}


    GetBillingDuration()
   {
    return this.appService.getBillEstimates(this.customer.UserId).subscribe(res => {
      this.bill = res;
      if(new Date(this.bill.endDate) < new Date())
      {
      this.active=true;
      }
   });
  }

  changetheactive(res)
  {
    if(res == 1)
    {  
      if(this.active==false)  
      {
        this.jobsactive = true;
      }
      else
      {
        this.jobsactive = false;
      } 
     
    }
    if(res == 2)
    { 
      if(this.active==false)  
      {
        this.postactive = true;
      }
      else
      {
        this.postactive = false;
      }
     
    }
    if(res==3 && this.active==true)
    {
      this.jobsactive = false;
      this.postactive = false;
    }
    localStorage.removeItem('jobactive');
    localStorage.removeItem('activepostjob');
  }



  ChangeCount() {
    this.notificationsCount = 0;
    this.router.navigateByUrl('/app-notifications');
  }

  GetNotificationCount() {
    this._service.GetService('IdentityAPI/api/GetNotificationCount?userId=',  this.customer.UserId)
      .subscribe(
        data2 => {

          this.notificationsCount = data2;
        });
  }

  Logout() {
    sessionStorage.removeItem('userData');
    sessionStorage.clear();
    this.router.navigateByUrl('/login' , { replaceUrl: true });
    //window.location.href = environment.customerLogin;
}

ngOnInit()
{
  
    if(localStorage.getItem('jobactive')!=null&&localStorage.getItem('jobactive')!=undefined)
    {
      this.changetheactive(1);
    }
    if(localStorage.getItem('activepostjob')!=null&&localStorage.getItem('activepostjob')!=undefined)
    {
      this.changetheactive(2);
    }
   //this.appService.resetJob();
    //this.active=false;
    //this.jobsactive=false;
}
}


export class payment
   {
    public Id:number;
    public UserId:number;
    public PlanId:number;
    public StartDate:Date;
    public EndDate:Date;
    public IsActive:boolean;
   }
