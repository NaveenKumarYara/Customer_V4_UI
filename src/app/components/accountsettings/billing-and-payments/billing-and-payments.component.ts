import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../../../app.service';
import { PlanFeature } from "../../../../models/PlanFeature";
import { billEstimates } from '../../../../models/billEstimates';
import {invoiceEstimates} from '../../../../models/GetBillingEstimates';
import { getBillingContactDetails } from '../../../../models/getBillingContactDetails';
import { GetUnbilledChargeDetails } from '../../../../models/GetUnbilledChargeDetails';
import { GetBillingCardDetails } from '../../../../models/GetBillingCardDetails';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { CustomerSubscription } from '../../../../models/CustomerSubscription';
import {GetSubscriptionDetails} from '../../../../models/GetSubscriptionDetails';
import * as introJs from 'intro.js/intro.js';
declare var $: any; 
@Component({
  selector: 'app-billing-and-payments',
  templateUrl: './billing-and-payments.component.html',
  styleUrls: ['./billing-and-payments.component.css']
})
export class BillingAndPaymentsComponent implements OnInit {
  Plans:PlanFeature[]=[];
  customer:any;  
  bill:billEstimates; 
  cid:any;
  amount:number;
  InvoicesList=[];
  Invoices=[];
  introJS = introJs();
  subdetails:CustomerSubscription;
  sdetails:GetSubscriptionDetails;
  invoice:invoiceEstimates[];
  contactdetails:getBillingContactDetails;
  unbilled:GetUnbilledChargeDetails[];
  carddetails:GetBillingCardDetails;
  constructor( private appService: AppService, private router: Router,private fb: FormBuilder) { 
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
  }
  ngOnInit() {
    this.GetPlans();
    this.GetBillingEstimates();
    this.GetCustomerSubscription();
  }

  start()
  {
    this.introJS.start();
  }


  removeactive()
  {
   $("#ov").removeClass('active');
   $("#be").addClass('active');
  }

  removeactives()
  {
   $("#ov").removeClass('active');
   $("#bd").addClass('active');
  }

  removeactiveh()
  {
   $("#ov").removeClass('active');
   $("#bh").addClass('active');
  }

 
  
  GetBillingEstimates()
  {
    return this.appService.getBillEstimates(this.customer.UserId).subscribe(res => {
      this.bill = res;
  });
  }

  GetCustomerSubscription()
  {
    return this.appService.GetCustomerSubscription(this.customer.UserId).subscribe(res => {
      this.subdetails = res;
      this.cid=res.customerId;
      this.GetSubscriptionDetails(res.subscriptionId);
      this.GetSubscriptionInvoices(res.customerId);
      this.GetSubscriptionInvoicesPending(res.customerId);
      //this.GetInvoiceEstimates();
      this.GetBillingContactDetails();
      //this.GetUnbilledChargeDetails();
      this.GetBilledCardDetails();
  });
  }

  GetSubscriptionInvoices(id)
  {
    return this.appService.GetCustomerInvoices(id).subscribe(res1 => {
      this.InvoicesList = res1;
    });
  }

  GetSubscriptionDetails(sid)
  {
    return this.appService.GetSubscriptionDetails(sid).subscribe(res => {
      this.sdetails = res;
      //this.amount=this.sdetails.planAmount/100;
    });
  }

  GetSubscriptionInvoicesPending(id)
  {
    return this.appService.GetCustomerInvoicesPending(id).subscribe(res => {
      this.Invoices = res;
      const total = this.Invoices.reduce((sum, item) => sum + item.amountDue/100, 0);
      this.amount = total.toFixed(2);
    });
  }

  // GetUnbilledChargeDetails()
  // {
  //   return this.appService.GetUnbilledChargeDetails(this.cid).subscribe(res => {
  //   this.unbilled = res;
  //  });
  // }

  GetBillingContactDetails()
  {
    return this.appService.GetBillingContactDetails(this.cid).subscribe(res => {
    this.contactdetails = res;
   });
  }

  GetBilledCardDetails()
  {
    return this.appService.GetBilledCardDetails(this.cid).subscribe(res => {
    this.carddetails = res;
   });
  }

  // GetInvoiceEstimates()
  // {
  //     return this.appService.GetBillingEstimateDetails(this.cid).subscribe(res => {
  //     this.invoice = res;
  // });
  // }

  GetPlans()
  {
    return this.appService.getPricingPlans().subscribe(res => {
      this.Plans = res;
  });
  }

}
