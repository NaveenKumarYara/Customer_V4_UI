import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartEvent } from 'chart.js';

@Component({
  selector: 'app-candidate-profile-detail',
  templateUrl: './candidate-profile-detail.component.html',
  styleUrls: ['./candidate-profile-detail.component.scss']
})
export class CandidateProfileDetailComponent implements OnInit {
  currentRate = 3;
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
  
  constructor() { }

  ngOnInit(): void {
    
  }

}
