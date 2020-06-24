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
import { getBillingContactDetails } from '../../../../../models/getBillingContactDetails';

@Component({
  selector: 'app-billing-history',
  templateUrl: './billing-history.component.html',
  styleUrls: ['./billing-history.component.css']
})
export class BillingHistoryComponent implements OnInit {

  customer:any;  
  billDetails:billEstimates;
  bill:invoiceEstimates[];
  contactdetails:getBillingContactDetails;
  cid:any;
  amount:number;
  InvoicesPdf:any;
  InvoicesList=[];
  sdetails:GetSubscriptionDetails;
  subdetails:CustomerSubscription;
  constructor( private appService: AppService, private router: Router,private fb: FormBuilder,private toastr:ToastsManager, private _vcr: ViewContainerRef) { 
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    window['Chargebee'].init({
       //site: 'arytic-test',
      //publishableKey: 'test_LA9gcddwXA2XIgAkHzgs2FuQsewoId4we',
      site: 'arytic',
      publishableKey: 'live_NMr0XTWcusb8hdRcdvF1Du9shtmawgjvyA'
    });
  }

  ngOnInit() {
    this.GetCustomerSubscription();
  }

  GetCustomerSubscription()
  {
    return this.appService.GetCustomerSubscription(this.customer.UserId).subscribe(re => {
      this.subdetails = re;
      this.GetSubscriptionInvoices(re.customerId);
      this.GetSubscriptionDetails(re.subscriptionId);
      this.GetBillingContactDetails(re.customerId);
  });
  }

  GetSubscriptionDetails(sid)
  {
    return this.appService.GetSubscriptionDetails(sid).subscribe(res => {
      this.sdetails = res;
    });
  }

  GetBillingContactDetails(id)
  {
    return this.appService.GetBillingContactDetails(id).subscribe(res => {
    this.contactdetails = res;
     });
  }

  GetSubscriptionInvoices(id)
  {
    return this.appService.GetCustomerInvoices(id).subscribe(res1 => {
      this.InvoicesList = res1;
    });
  }

  GetInvoicePdfDownLoad(Iid)
  {
    return this.appService.GetInvoicePdf(Iid).subscribe(res2 => {
      this.InvoicesPdf= res2;
      window.open(res2.downloadUrl, '_blank');
    });
  }

}
