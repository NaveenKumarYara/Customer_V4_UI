import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { ApiService } from 'src/app/shared/components/services/api.service';

@Component({
  selector: 'app-dashboard-total-jobs',
  templateUrl: './dashboard-total-jobs.component.html',
  styleUrls: ['./dashboard-total-jobs.component.scss']
})

export class DashboardTotalJobsComponent implements OnInit {
  
  @Input() AdminStats: any ='';
  cardExp: boolean = false;
  cardJobId: boolean = false;
  cardAryticId: boolean = false;
  topJobsCLients:any=[];
  cardNav: boolean = false;
  cardInterviewStatus: boolean = false;
  cardLocation: boolean = false;
  cardDate: boolean = false;
  cardJobPositions: boolean = false;

  jobsData: any = [];

  public barChartLegend = false;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      { 
        data: [], 
        label: 'Series A',
        barPercentage: 1,
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
    responsive: true
  }
  public barChartType = 'bar';
  customer: any;
  


  constructor(private apiService:ApiService) { 
    this.customer = JSON.parse(localStorage.getItem('customer')||'');
  }

  ngOnInit(): void {
   console.log("Res",this.customer.CustomerId);
   this.GetCustomerTopJobsByClients();
   this.getJobsChartData();
   this.getUserStatsChartData();
  }

  GetCustomerTopJobsByClients()
  {
    let params = new HttpParams();
		params = params.append("CustomerId", this.customer.CustomerId);
    this.apiService.GetEmployerService("/api/GetAdminJobStatsForClients?", params).subscribe((response:any) => { 
      this.topJobsCLients =  response;
    });
  }

  getJobsChartData(){
    return this.apiService.GetEmployerService('/api/GetAdminJobStatsByWeek?CustomerId=',this.customer.CustomerId).subscribe(v=>{
      console.log("jobs",v)
      this.jobsData = v;
      if (this.jobsData.length == 0) return;
      this.barChartData = {
        labels: Object.keys(this.jobsData[0]),
        datasets: [
          { 
            data: Object.values(this.jobsData[0]), 
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

  getUserStatsChartData(){
    return this.apiService.GetEmployerService('/api/GetAdminUsersStatsByWeek?CustomerId=',this.customer.CustomerId).subscribe(v=>{
      console.log("usersCharts",v)
    })
  }



}
