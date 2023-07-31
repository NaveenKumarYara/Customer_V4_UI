import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js'

@Component({
  selector: 'app-upload-preview',
  templateUrl: './upload-preview.component.html',
  styleUrls: ['./upload-preview.component.scss']
})
export class UploadPreviewComponent implements OnInit {
  currentRate: number = 3;
  public chart = {
    "datasets": [
      { 
        "data": [15, 50, 60], 
        "label": "Line", 
        "type": "radar",
        borderColor: '#fbc849',
        pointBackgroundColor: '#fbc849',
        backgroundColor:'#fbc849',
        pointBorderColor:'#fbc849'
      }
    ],
    "labels": ["", "", ""],
    "options": {
      "legend": {
        "text": "You awesome chart with average line",
        "display": false,
      },
      plugins: {
        legend: {
          display: false
        }
      }

    }
  };  

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    center:false,
    margin: 0,
    navText: ['<span class="mdi mdi-chevron-left"></span>', '<span class="mdi mdi-chevron-right"></span>'],
    responsive: {
      400: {
        items: 2
      },
      740: {
        items: 2
      },
      940: {
        items: 3
      },
      1240: {
        items: 3
      }
    },
    nav: true
  }

  constructor() { }

  ngOnInit(): void {
  }

}
