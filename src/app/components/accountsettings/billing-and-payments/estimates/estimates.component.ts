import { Component, OnInit ,ViewChild,ViewContainerRef,AfterViewInit} from '@angular/core';
import {ElementRef, HostListener, Input } from '@angular/core';
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
declare var $: any;
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
  InvoicesList=[];
  amount=[];
  sdetails:GetSubscriptionDetails;
  chargebeeInstance:any;
  subdetails:CustomerSubscription;
  cbportal:any;
  constructor( private eRef: ElementRef,private appService: AppService, private router: Router,private fb: FormBuilder,public toastr:ToastsManager, private _vcr: ViewContainerRef) { 
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.chargebeeInstance = Chargebee.init(
      {
       //site: 'arytic-test',
      //publishableKey: 'test_LA9gcddwXA2XIgAkHzgs2FuQsewoId4we',
      site: 'arytic',
      publishableKey: 'live_NMr0XTWcusb8hdRcdvF1Du9shtmawgjvyA'
    )
    this.cbportal=this.chargebeeInstance.createChargebeePortal();  
    this.toastr.setRootViewContainerRef(_vcr);
  }


  openPortal()
  {
    this.cbportal.open({
      close: function() {
        location.reload();
      }
    })
  
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
      this.GetSubscriptionInvoicesPending(res.customerId);
      // this.GetInvoiceEstimates();
      // this.GetUnbilledChargeDetails();
  });
  }

  GetSubscriptionInvoicesPending(id)
  {
    return this.appService.GetCustomerInvoicesPending(id).subscribe(res1 => {
      this.InvoicesList = res1;
      const total = this.InvoicesList.reduce((sum, item) => sum + item.amountDue/100, 0);
      this.amount = total.toFixed(2);
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
