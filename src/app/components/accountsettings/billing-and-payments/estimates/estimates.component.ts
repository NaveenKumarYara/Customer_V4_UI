import { Component, OnInit ,ViewChild,ViewContainerRef} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { billEstimates } from '../../../../../models/billEstimates';
import {invoiceEstimates}from '../../../../../models/GetBillingEstimates';
import { AppService } from '../../../../app.service';
import { PlanFeature } from "../../../../../models/PlanFeature";
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { GetUnbilledChargeDetails } from '../../../../../models/GetUnbilledChargeDetails';
import { CustomerSubscription } from '../../../../../models/CustomerSubscription';
import { GetSubscriptionDetails } from '../../../../../models/GetSubscriptionDetails';
@Component({
  selector: 'app-estimates',
  templateUrl: './estimates.component.html',
  styleUrls: ['./estimates.component.css']
})
export class EstimatesComponent implements OnInit {
  Plans:PlanFeature[]=[];
  customer:any;  
  billDetails:billEstimates;
  bill:invoiceEstimates[];
  unbilled:GetUnbilledChargeDetails[];
  cid:any;
  sdetails:GetSubscriptionDetails;
  subdetails:CustomerSubscription;
  constructor( private appService: AppService, private router: Router,private fb: FormBuilder,private toastr:ToastsManager, private _vcr: ViewContainerRef) { 
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
  }

  ngOnInit() {
    // this.GetPlans();
    // this.GetBillExpiryDetails();
    this.GetCustomerSubscription();
  }

  GetCustomerSubscription()
  {
    return this.appService.GetCustomerSubscription(this.customer.UserId).subscribe(res => {
      this.subdetails = res;
      this.cid=res.customerId;
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

  GetBillExpiryDetails()
  {
    return this.appService.getBillEstimates(this.customer.UserId).subscribe(res => {
    this.billDetails= res;
    });
  }

  // GetUnbilledChargeDetails()
  // {
  //   return this.appService.GetUnbilledChargeDetails(this.cid).subscribe(res => {
  //   this.unbilled = res;
  //  });
  // }

  // GetInvoiceEstimates()
  // {
  //     return this.appService.GetBillingEstimateDetails(this.cid).subscribe(res => {
  //     this.bill = res;
  // });
  // }

  GetPlans()
  {
    return this.appService.getPricingPlans().subscribe(res => {
      this.Plans = res;
  });
  }

 

}
