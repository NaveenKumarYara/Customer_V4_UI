import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/components/services/api.service';
@Component({
  selector: 'app-dashboard-users',
  templateUrl: './dashboard-users.component.html',
  styleUrls: ['./dashboard-users.component.scss'],
  providers:[ApiService]
})
export class DashboardUsersComponent implements OnInit {
  cardMatching: boolean = false;
  @Input() UserStats: any ='';
  customer:any;
  topUsers:any=[];
  topUsersStats:any=[];
  cardID: boolean = false;
  cardExp: boolean = false;
  cardMatchingTitle: any = '';
  cardClosed: boolean = false;
  cardAssigned: boolean = false;

  constructor(private _service : ApiService) {
    this.customer = JSON.parse(localStorage.getItem('customer')||'');
    this.GetCustomerTopUsers();
    this.GetUsersStats();
    this.GetCustomerTopUserStats();

  }

  ngOnInit(): void {
  }
  GetCustomerTopUsers()
  {
    let params = new HttpParams();
		params = params.append("CustomerId", this.customer.CustomerId);
    this._service.GetEmployerService("/api/GetAdminUsersLists?", params).subscribe((response:any) => { 
      this.topUsers =  response;
 
    });
  }

  GetCustomerTopUserStats()
  {
    let params = new HttpParams();
		params = params.append("CustomerId", this.customer.CustomerId);
    this._service.GetEmployerService("/api/GetUsersRolesAppliedStats?", params).subscribe((response:any) => { 
      this.topUsersStats =  response;
    });
  }

  GetUsersStats()
  {
    this._service.GetEmployerService("/api/GetAdminUsersStats?CustomerId=", this.customer.CustomerId).subscribe((response:any) => { 
      this.UserStats =  response[0];
    });
  }
}
