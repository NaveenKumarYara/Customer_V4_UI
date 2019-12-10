import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../../../app.service';
declare var $: any; 
@Component({
  selector: 'app-billing-and-payments',
  templateUrl: './billing-and-payments.component.html',
  styleUrls: ['./billing-and-payments.component.css']
})
export class BillingAndPaymentsComponent implements OnInit {
  customer:any;  
  constructor( private appService: AppService, private router: Router,private fb: FormBuilder) { 
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
  }

  ngOnInit() {
  }

}
