import { Component, OnInit, Input } from '@angular/core';
import { DashboardStatistics } from '../../../../models/dashboardstatistics';
import {  ApplicantStatistics } from '../../../../models/applicantstatistics';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { DashboardService } from '../dashboard.service';
@Component({
  selector: 'app-dashboard-jobsview',
  templateUrl: './dashboard-jobsview.component.html',
  styleUrls: ['./dashboard-jobsview.component.css']
})
export class DashboardJobsviewComponent implements OnInit {
    @Input() dashboardstatistics: DashboardStatistics;
    @Input() applicantStatistics: ApplicantStatistics;


    constructor(private route: ActivatedRoute, private dashboardservice: DashboardService, private router: Router) {

    }
  public lineChartData: Array<any> = [
    {data: [10, 20, 30, 40, 45, 50, 55], label: 'Series A'},
    {data: [0, 0, 0, 2, 0, 0, 0], label: 'Series B'},
    {data: [0, 0, 0, 1, 0, 0, 0], label: 'Series C'}
  ];
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { //  job posted
      backgroundColor: 'rgba(172,154,249,0.2)',
      borderColor: 'rgba(172,154,249,1)',
      pointBackgroundColor: 'rgba(172,154,249,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(172,154,249,0.8)'
    },
    { // job filled
      backgroundColor: 'rgba(132,222,203,0.2)',
      borderColor: 'rgba(132,222,203,1)',
      pointBackgroundColor: 'rgba(132,222,203,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(132,222,203,1)'
    },
    { //  jobs cancelled
      backgroundColor: 'rgba(167,217,217,0.2)',
      borderColor: 'rgba(167,217,217,1)',
      pointBackgroundColor: 'rgba(167,217,217,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(167,217,217,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';


  ngOnInit() {
  }
  public randomize(): void {
    const _lineChartData: Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  Jobs(sortBy) {
    localStorage.setItem('sortBy', JSON.stringify(sortBy));
    this.router.navigateByUrl('app-manage-jobs');
  }


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }



  public chartHovered(e: any): void {
    console.log(e);
  }
  // events

}
