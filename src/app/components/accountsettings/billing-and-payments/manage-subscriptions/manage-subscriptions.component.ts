import { Component, OnInit,ViewContainerRef  } from '@angular/core';
import { AppService } from '../../../../app.service';
import { PlanFeature } from "../../../../../models/PlanFeature";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import { billEstimates } from '../../../../../models/billEstimates';
import { CustomerSubscription } from '../../../../../models/CustomerSubscription';
import { GetSubscriptionDetails } from '../../../../../models/GetSubscriptionDetails';
@Component({
  selector: 'app-manage-subscriptions',
  templateUrl: './manage-subscriptions.component.html',
  styleUrls: ['./manage-subscriptions.component.css'],
  providers: [AppService]
})
export class ManageSubscriptionsComponent implements OnInit {
  Plans:PlanFeature[]=[];
  customer:any; 
  addPricing = new payment();
  date: Date; 
  bill:billEstimates;
  subdetails:CustomerSubscription;
  sdetails:GetSubscriptionDetails;
  constructor( private appService: AppService, private router: Router,private fb: FormBuilder,private toastr:ToastsManager, private _vcr: ViewContainerRef) { 
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.toastr.setRootViewContainerRef(_vcr);
  }

  ngOnInit() {
    this.GetBillingDuration();
    this.GetPlans();
    this.GetCustomerSubscription();
  }

//  buyPlan(id)
//  {
//   this.router.navigate(['/app-accountsettings/app-billing-and-payments/', {id} ]);
//  }



//  buyNewPlan(id)
//  {
//   this.addPricing.UserId = this.customer.UserId;
//   this.addPricing.PlanId = id;
//   this.addPricing.StartDate = new Date();
//   this.date = new Date();  
//   this.addPricing.EndDate = new Date(this.date.setDate( this.date.getDate() + 7 )) ;
//   this.addPricing.IsActive = true;
//    if(id>0)
//   {  

//   this.appService.AddPlanDetails(this.addPricing).subscribe(data => {
//     if(data == true)
//     {
//       this.toastr.success('Thank you for Subscribing to Arytic', 'Success!');
//       setTimeout(() => {
//              this.toastr.dismissToast;
//              }, 3000);            
//     }
//     this.GetPlans();
//     this.GetBillingDuration();
//     this.addPricing= new payment();
//   });
//   }
// }


GetCustomerSubscription()
{
  return this.appService.GetCustomerSubscription(this.customer.UserId).subscribe(res => {
    this.subdetails = res;
    this.GetSubscriptionDetails(res.subscriptionId);
    // this.GetInvoiceEstimates();
    // this.GetUnbilledChargeDetails();
});
}

GetSubscriptionDetails(sid)
{
  return this.appService.GetSubscriptionDetails(sid).subscribe(res => {
    this.sdetails = res;
  });
}

GetPlans()
{
  return this.appService.getPricingPlans().subscribe(res => {
    this.Plans = res;
});
}

  GetBillingDuration()
  {
    return this.appService.getBillEstimates(this.customer.UserId).subscribe(res => {
      this.bill = res;
  });
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