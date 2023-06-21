import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/components/services/api.service';

@Component({
  selector: 'app-dashboard-top-performing-jobs',
  templateUrl: './dashboard-top-performing-jobs.component.html',
  styleUrls: ['./dashboard-top-performing-jobs.component.scss'],
  providers: [ApiService]
  
})
export class DashboardTopPerformingJobsComponent implements OnInit {
  customer:any;
  topJobs:any=[];
  Jobs:any=[];
  constructor(private _service : ApiService) {
    this.customer = JSON.parse(localStorage.getItem('customer')||'');
    this.GetCustomerTopJobs(0);
    this.GetCustomerJobs();
   }

  ngOnInit(): void {
  }

  GetCustomerTopJobs(sort:any)
  {
    let params = new HttpParams();
		params = params.append("CustomerId", this.customer.CustomerId);
		params = params.append("SortBy", sort);
    this._service.GetEmployerService("/api/GetTopJobs?", params).subscribe((response:any) => { 
      this.topJobs =  response;
    });
  }

  GetCustomerJobs()
  {
    let params = new HttpParams();
		params = params.append("CustomerId",this.customer.CustomerId);
		params = params.append("UserId", 0);
    this._service.GetEmployerService("/api/GetCustomerJobs?", params).subscribe((response1) => { 

      this.Jobs = response1;
		});
  }

}
