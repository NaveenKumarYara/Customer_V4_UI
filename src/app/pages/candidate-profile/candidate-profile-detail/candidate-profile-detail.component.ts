import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartEvent, Chart } from 'chart.js';
import { SlickCarouselComponent } from "ngx-slick-carousel";
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-candidate-profile-detail',
  templateUrl: './candidate-profile-detail.component.html',
  styleUrls: ['./candidate-profile-detail.component.scss']
})
export class CandidateProfileDetailComponent implements OnInit {
  currentRate = 3;

  /*Radar Chart -----------*/
  public radarChartData: ChartConfiguration<'radar'>['data'] = {
    labels: [
      'Job Fit',
    'Background Fit',
    'WFH',
    'Personlity Fit',
    'Skill Fit',
    'Team Fit'
    ],
    datasets:  [{
      label: 'My First Dataset',
      data: [65, 59, 90, 81, 56, 55],
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(255, 99, 132)',
      pointBackgroundColor: 'rgb(255, 99, 132)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 99, 132)'
    }, {
      label: 'My Second Dataset',
      data: [28, 48, 40, 19, 96, 27],
      fill: true,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgb(54, 162, 235)',
      pointBackgroundColor: 'rgb(54, 162, 235)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(54, 162, 235)'
    }]
  };
  public radarChartOptions: ChartOptions<'radar'> = {
    responsive: true,
    maintainAspectRatio: false,
   
  };
  public radarChartLegend = false;
  /*Line Chart
  ---------------------------------------------------*/
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April'
    ],
    datasets: [
      {
        data: [ 0, 35, 30, 60 ],
        label: 'Series A',
        fill: true,
        tension: 0.35,
        borderColor: '#2FC495',
        backgroundColor: '#E1F7EF',
        pointBackgroundColor: '#2FC495'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
    maintainAspectRatio: true,
    aspectRatio: 1|2
  };
  public lineChartLegend = false;
  

  slideConfig = {
    rows: 2,
		dots: true,
		arrows: false,
		infinite: true,
		speed: 300,
		slidesToShow: 4,
		slidesToScroll: 4
  };
  
  constructor() { 
    
  }

  ngOnInit(): void {
  
  }
}
