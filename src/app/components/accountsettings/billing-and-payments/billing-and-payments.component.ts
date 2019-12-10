import { Component, OnInit,ViewContainerRef } from '@angular/core';
import {CustomerContacts} from '../../../../models/customercontacts';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../../../app.service';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
declare var $: any; 
@Component({
  selector: 'app-billing-and-payments',
  templateUrl: './billing-and-payments.component.html',
  styleUrls: ['./billing-and-payments.component.css']
})
export class BillingAndPaymentsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
