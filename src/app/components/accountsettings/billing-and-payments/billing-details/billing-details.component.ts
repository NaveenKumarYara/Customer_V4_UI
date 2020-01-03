import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CompanyProfile } from '../../../../../models/companyprofile';
import { AppService } from '../../../../app.service';
import { getBillingContactDetails } from '../../../../../models/getBillingContactDetails';
import { GetBillingCardDetails } from '../../../../../models/GetBillingCardDetails';
import { CustomerSubscription } from '../../../../../models/CustomerSubscription';
declare var jQuery:any;
declare var $:any;
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
  cid:any;
  subdetails:CustomerSubscription;
  constructor( private appService: AppService, private router: Router,private fb: FormBuilder) { 
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
  }

  ngOnInit() {
    this.populateCompanyProfile(); 
    this.GetCustomerSubscription();
    (function ($) {

      var $editBtn = $('.edit-btn');
    
      $.each($editBtn, function (index, element) {
        var $element = $(element);
        $element.on('click', function (e) {
          e.preventDefault();
          var $editGroup = $element.closest('.edit-group');
          var $editForm = $editGroup.find('.edit-form');
          var $data = $editGroup.find('.data');
          var $cancelBtn = $editForm.find('.btn-border');
    
          $data.hide();
          $editForm.show();
    
          $cancelBtn.on('click', function (e) {
            e.preventDefault();
            $data.show();
            $editForm.hide();
          });
        });
      });
    })(jQuery);

  }

  GetCustomerSubscription()
  {
    return this.appService.GetCustomerSubscription(this.customer.UserId).subscribe(res => {
      this.subdetails = res;
      this.cid=res.customerId;
      this.GetBillingContactDetails();
      this.GetBilledCardDetails();
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
    debugger
    this.carddetails = res;
   });
  }

  populateCompanyProfile() {
    return this.appService.getCompanyProfile(this.customer.CustomerId).subscribe(res => {
        this.companyprofile = res;
    });
  }

}
