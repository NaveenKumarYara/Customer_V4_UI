import { Component, OnInit ,ViewChild,ViewContainerRef,AfterViewInit} from '@angular/core';
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
declare const Chargebee: any;
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
  amount:number;
  sdetails:GetSubscriptionDetails;
  subdetails:CustomerSubscription;
  constructor( private appService: AppService, private router: Router,private fb: FormBuilder,private toastr:ToastsManager, private _vcr: ViewContainerRef) { 
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    window['Chargebee'].init({
          //site: 'arytic-test',
       //publishableKey: 'test_LA9gcddwXA2XIgAkHzgs2FuQsewoId4we'
       site: 'arytic',
       publishableKey: 'live_NMr0XTWcusb8hdRcdvF1Du9shtmawgjvyA'
    });
  }

  ngOnInit() {
    // this.GetPlans();
    // this.GetBillExpiryDetails();
    this.GetCustomerSubscription();
  }

  ngAfterViewInit(): void {
    Chargebee.registerAgain();
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
      this.amount=this.sdetails.planAmount/100;
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
