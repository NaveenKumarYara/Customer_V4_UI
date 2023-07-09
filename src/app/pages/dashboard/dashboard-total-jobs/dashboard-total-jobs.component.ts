import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard-total-jobs',
  templateUrl: './dashboard-total-jobs.component.html',
  styleUrls: ['./dashboard-total-jobs.component.scss']
})

export class DashboardTotalJobsComponent implements OnInit {
  @Input() AdminStats: any ='';
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


  constructor() { }

  ngOnInit(): void {
   
  }

}
