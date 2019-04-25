import { Component, OnInit } from '@angular/core';
import {CustomerContacts} from '../../../../models/customercontacts';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../../../app.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [AppService]
})
export class UsersComponent implements OnInit {
  customer:any; 
  customerId:any;
  userId:any;
  customercontacts : CustomerContacts[]=[];
  constructor(private appService: AppService, private router: Router) 
  { 
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId =this.customer.CustomerId;
    this.userId = this.customer.UserId;
  }


  GetCustomerContacts()
  {
    return this.appService.getCustomerContacts(this.customerId).subscribe(res => {
      this.customercontacts = res;
  });
  }
  ngOnInit() {
    this.GetCustomerContacts();
  }

}
