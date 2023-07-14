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
  topApplicantsSource:any=[];
  AppliedJobs:any=[];
  @Input() ProfileStats: any = ' ';
  public barChartLegend = false;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
  labels: [],
  datasets: [
    { 
      data: [], 
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
  profileStats:any = [];

  constructor(private _service : ApiService) {
    this.customer = JSON.parse(localStorage.getItem('customer')||'');
    this.GetCustomerTopProfiles();
    this.getProfileStatsChartData();
    this. GetCustomerTopJobsBySource();
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

  GetCustomerTopJobsBySource()
  {
    let params = new HttpParams();
		params = params.append("CustomerId", this.customer.CustomerId);
    this._service.GetEmployerService("/api/GetCustomerAdminApplicantsStatsBySource?", params).subscribe((response:any) => { 
      this.topApplicantsSource =  response;
    });
  }


  getProfileStatsChartData(){
    return this._service.GetEmployerService('/api/GetAdminProfileStatsByWeek?CustomerId=',this.customer.CustomerId).subscribe(v=>{
      console.log("profileStats",v)
      this.profileStats = v;
      if (this.profileStats.length == 0) return;
      this.barChartData = {
        labels: Object.keys(this.profileStats[0]),
        datasets: [
          { 
            data: Object.values(this.profileStats[0]), 
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
    })
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
