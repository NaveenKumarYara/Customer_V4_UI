import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard-clients',
  templateUrl: './dashboard-clients.component.html',
  styleUrls: ['./dashboard-clients.component.scss']
})
export class DashboardClientsComponent implements OnInit {
  cardExp: boolean = false;
  cardJobId: boolean = false;
  cardAryticId: boolean = false;
  cardNav: boolean = false;
  cardInterviewStatus: boolean = false;
  cardLocation: boolean = false;
  cardDate: boolean = false;
  cardJobPositions: boolean = false;
  cardStatus: boolean = true;
  cardPriority: boolean = true;
  
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
