import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/components/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [ApiService]
})

export class DashboardComponent implements OnInit {
  customer:any;
  AdminStats:any=[];
  constructor(private _service : ApiService) { 
    this.customer = JSON.parse(localStorage.getItem('customer')||'');
    this.GetCustomerStats(this.customer.CustomerId);
  }
  
  ngOnInit(): void {
    
  }
 

  GetCustomerStats(CustomerId: any)
  {
    this._service.GetEmployerService("/api/GetAdminCompanyStats?CustomerId=", CustomerId).subscribe((response:any) => { 
      this.AdminStats =  response[0];
    });
  }


}
