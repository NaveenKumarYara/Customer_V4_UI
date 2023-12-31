import { Component ,OnInit,ViewContainerRef} from '@angular/core';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { AppService } from '../../app.service';
import { environment } from '../../../environments/environment.prod';
import { billEstimates } from '../../../models/billEstimates';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import { CustomerSubscription } from '../../../models/CustomerSubscription';
import { GetSubscriptionDetails } from '../../../models/GetSubscriptionDetails';
import { ApiService } from '../../shared/services/api.service/api.service';
import { NotificationsComponent } from '../../components/notifications/notifications.component';
import { MatDialog } from '@angular/material';
declare var $: any; 
@Component({
    selector: 'app-Logoheader',
    templateUrl: './logoheader.component.html',
    styleUrls: ['./logoheader.component.css'],
})
export class LogoHeaderComponent implements OnInit {  
  customer:any;
  companyLogo:any;
  bill:billEstimates; 
  notificationsCount: any;
  active:boolean=false;
  jobsactive:boolean=false;
  showAction:boolean = false;
  daysRemaining:any;
  postactive:boolean=false;
  addPricing = new payment();
  subdetails:CustomerSubscription;
  sdetails:GetSubscriptionDetails;
  menuFixed:boolean = false;
  constructor( private appService: AppService, private dialog: MatDialog , private _service: ApiService,private router: Router,private toastr:ToastsManager, private _vcr: ViewContainerRef, location: Location) {
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
    localStorage.removeItem('jobactive');
    localStorage.removeItem('jobId');
    this.notificationsCount = 0;
    const dialogRef = this.dialog.open(NotificationsComponent, {
      width: '1100px',
      position: { right: '0'}
    });
    dialogRef.afterClosed().subscribe(result => {

 
    });
    // this.router.navigateByUrl('/app-notifications');
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
    localStorage.clear();
    this.router.navigateByUrl('/login' , { replaceUrl: true });
    //window.location.href = environment.customerLogin;
}

expandMenu() {
  this.menuFixed = !this.menuFixed;
  console.log('hi');
}

ngOnInit() {
    if (location.pathname === '/app-view-jobdetails' || this.router.routerState.snapshot.url === '/app-view-jobdetails') {
       this.showAction = true;
    }
    $(document).on('click touchend', function(e){
      if (!$(".mainmenu-fixed").is(e.target) && $(".mainmenu-fixed").has(e.target).length==0)
        {
        $('.mainmenu-fixed').removeClass('open');
        $('#nav-icon1').removeClass('open');
      }
    });
  
    if(localStorage.getItem('jobactive')!=null&&localStorage.getItem('jobactive')!=undefined)
    {
      this.changetheactive(1);
    }
    if(localStorage.getItem('activepostjob')!=null&&localStorage.getItem('activepostjob')!=undefined)
    {
      this.changetheactive(2);
    }
    this.GetNotificationCount();
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