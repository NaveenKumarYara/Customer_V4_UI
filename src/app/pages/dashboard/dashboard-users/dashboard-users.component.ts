import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/components/services/api.service';
import { ChartConfiguration, ChartOptions } from 'chart.js';

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
    responsive: true
  }
  public barChartType = 'bar';


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
