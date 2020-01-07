import { Component ,OnInit,ViewContainerRef} from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { environment } from '../../../environments/environment.prod';
import { billEstimates } from '../../../models/billEstimates';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import { CustomerSubscription } from '../../../models/CustomerSubscription';
import { GetSubscriptionDetails } from '../../../models/GetSubscriptionDetails';
@Component({
    selector: 'app-Logoheader',
    templateUrl: './logoheader.component.html'   
})
export class LogoHeaderComponent implements OnInit {  
  customer:any;
  companyLogo:any;
  bill:billEstimates; 
  active:boolean=false;
  addPricing = new payment();
  subdetails:CustomerSubscription;
  sdetails:GetSubscriptionDetails;
  constructor( private appService: AppService,private router: Router,private toastr:ToastsManager, private _vcr: ViewContainerRef) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.toastr.setRootViewContainerRef(_vcr);
    if (this.customer == null) {
        this.Logout();
    }
    // sessionStorage.setItem('ProfileThumbnail', this.candidateDetails.UserProfilePictureUrl);
    else {
        let pic = sessionStorage.getItem('ProfileThumbnail');
        if (pic) {
            if (pic.length > 55) {
                this.customer.UserProfilePictureUrl = pic;
            }
        }
    }
    
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
    if(new Date(this.sdetails.nextBillingAt) < new Date())
    {
      this.active=true;
    }
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



  

  Logout() {
    sessionStorage.removeItem('userData');
    sessionStorage.clear();
    this.router.navigateByUrl('/login' , { replaceUrl: true });
    //window.location.href = environment.customerLogin;
}

ngOnInit()
{
    this.GetCustomerSubscription();
    this.active=false;
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