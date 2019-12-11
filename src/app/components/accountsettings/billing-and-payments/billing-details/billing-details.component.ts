import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CompanyProfile } from '../../../../../models/companyprofile';
import { AppService } from '../../../../app.service';

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
  }

  populateCompanyProfile() {
    return this.appService.getCompanyProfile(this.customer.CustomerId).subscribe(res => {
        this.companyprofile = res;
    });
  }

}
