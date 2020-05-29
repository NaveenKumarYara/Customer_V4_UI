import { Component, OnInit ,ViewChild,AfterViewInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CompanyProfile } from '../../../../../models/companyprofile';
import { AppService } from '../../../../app.service';
import { getBillingContactDetails } from '../../../../../models/getBillingContactDetails';
import { GetBillingCardDetails } from '../../../../../models/GetBillingCardDetails';
import { CustomerSubscription } from '../../../../../models/CustomerSubscription';
import { GetBillingAddressCustomer } from '../../../../../models/GetBillingAddressCustomer';
declare var jQuery:any;
declare var $:any;
declare const Chargebee: any;
@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.css']
})
export class BillingDetailsComponent implements OnInit {
  customer:any;  
  companyprofile: CompanyProfile;
  contactdetails:getBillingContactDetails;
  carddetails:GetBillingCardDetails;
  billingaddressDetails:GetBillingAddressCustomer;
  cid:any;
  sid:any;
  subdetails:CustomerSubscription;
  constructor( private appService: AppService, private router: Router,private fb: FormBuilder) { 
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
  }

  ngOnInit() {
    this.populateCompanyProfile(); 
    this.GetCustomerSubscription();
    window['Chargebee'].init({
       site: 'arytic-test',
       publishableKey: 'test_LA9gcddwXA2XIgAkHzgs2FuQsewoId4we'
      // site: 'arytic',
      // publishableKey: 'live_NMr0XTWcusb8hdRcdvF1Du9shtmawgjvyA'
    });
  }

  ngAfterViewInit(): void {
    Chargebee.registerAgain();
  }

  GetCustomerSubscription()
  {
    return this.appService.GetCustomerSubscription(this.customer.UserId).subscribe(res => {
      this.subdetails = res;
      this.cid=res.customerId;
      //this.sid=res.subscriptionId;
      this.GetBillingContactDetails();
      this.GetBilledCardDetails();
      this.GetBillingAddress();
  });
}

GetBillingAddress()
{
  return this.appService.GetBillingAddressforCustomer(this.cid).subscribe(res => {
    this.billingaddressDetails = res;
     });
}

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

  populateCompanyProfile() {
    return this.appService.getCompanyProfile(this.customer.CustomerId).subscribe(res => {
        this.companyprofile = res;
    });
  }

}


