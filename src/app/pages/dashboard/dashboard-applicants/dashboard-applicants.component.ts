import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { ApiService } from 'src/app/shared/components/services/api.service';


@Component({
  selector: 'app-dashboard-applicants',
  templateUrl: './dashboard-applicants.component.html',
  styleUrls: ['./dashboard-applicants.component.scss',
  '../dashboard-total-jobs/dashboard-total-jobs.component.scss'
],
  providers: [ApiService]
})
export class DashboardApplicantsComponent implements OnInit {
  cardMatching: boolean = false;
  cardID: boolean = false;
  cardExp: boolean = false;
  cardMatchingTitle: any = '';
  customer:any;
  topApplicants:any=[];
  AppliedJobs:any=[];
  @Input() ProfileStats: any = ' ';
  public barChartLegend = false;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
  labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
  datasets: [
    { 
      data: [ 65, 59, 80, 81, 56, 55, 40 ], 
      label: 'Series A',
      barPercentage: 0.5,
      barThickness: 20,
      maxBarThickness: 15,
      minBarLength: 2,
      backgroundColor:['#CFC8EA','#F6DEA7','#CFC8EA','#F6DEA7','#CFC8EA','#F6DEA7','#CFC8EA'],
      hoverBackgroundColor: '#fbc849',
      borderRadius: 20
    }
  ]
  };

  public barChartOptions: any = {
    scaleShowVerticalLines: true,
    responsive: true,
  }
  public barChartType = 'bar';

  constructor(private _service : ApiService) {
    this.customer = JSON.parse(localStorage.getItem('customer')||'');
    this.GetCustomerTopProfiles();
  }

  ngOnInit(): void {
  }

  GetCustomerTopProfiles()
  {
    let params = new HttpParams();
		params = params.append("CustomerId", this.customer.CustomerId);
    this._service.GetEmployerService("/api/GetAdminProfileHotList?", params).subscribe((response:any) => { 
      this.topApplicants =  response;
 
    });
  }

  GetCustomerJobsForApplied(ProfileId:any)
  {
    let params = new HttpParams();
		params = params.append("CustomerId",this.customer.CustomerId);
		params = params.append("ProfileId", ProfileId);
    this._service.GetEmployerService("/api/GetCustomerJobs?", params).subscribe((response1) => { 

      this.AppliedJobs = response1;
		});
  }

}
