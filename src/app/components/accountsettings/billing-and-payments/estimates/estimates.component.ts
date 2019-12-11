import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { billEstimates } from '../../../../../models/billEstimates';
import { AppService } from '../../../../app.service';
import { PlanFeature } from "../../../../../models/PlanFeature";
@Component({
  selector: 'app-estimates',
  templateUrl: './estimates.component.html',
  styleUrls: ['./estimates.component.css']
})
export class EstimatesComponent implements OnInit {
  Plans:PlanFeature[]=[];
  customer:any;  
  bill:billEstimates;
  constructor( private appService: AppService, private router: Router,private fb: FormBuilder) { 
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
  }

  ngOnInit() {
    this.GetPlans();
    this.GetBillingEstimates();
  }

  GetPlans()
  {
    return this.appService.getPricingPlans().subscribe(res => {
      this.Plans = res;
  });
  }

  GetBillingEstimates()
  {
    return this.appService.getBillEstimates(this.customer.UserId).subscribe(res => {
      this.bill = res;
  });
  }

}
