import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CompanyProfile } from '../../../../../models/companyprofile';
import { AppService } from '../../../../app.service';
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
  constructor( private appService: AppService, private router: Router,private fb: FormBuilder) { 
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
  }

  ngOnInit() {
    this.populateCompanyProfile(); 
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

  populateCompanyProfile() {
    return this.appService.getCompanyProfile(this.customer.CustomerId).subscribe(res => {
        this.companyprofile = res;
    });
  }

}
