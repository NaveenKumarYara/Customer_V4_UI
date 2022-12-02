import { Component, OnInit } from '@angular/core';
import * as Chart from "chart.js";

@Component({
  selector: 'app-recruitment-dashboard',
  templateUrl: './recruitment-dashboard.component.html',
  styleUrls: ['./recruitment-dashboard.component.css','./../../../assets/styles/css/icons.css']
})
export class RecruitmentDashboardComponent implements OnInit {
  fullSearch:boolean = false;
  viewType: string;
  constructor() { }

  ngOnInit() {
    var chartMixTwo = new Chart(document.getElementById("mixed-chart-02"), {
      type: 'bar',
      data: {
        labels: ["Forward", "Received", "Closed", "WIP", "Submit","Inverview","Closuer"],
        datasets: [
          {
            label: "",
            backgroundColor: ["#136482", "#47b2c4","#66dab5","#f1b84d","#de3c63"],
            data: [10, 20 , 30 , 40 , 50, 60, 70],
            barThickness: 0.5
          }
        ]
      },
      options: {
        scales: {
          xAxes: [{
            barThickness: 10,
            ticks: {
              fontSize: 8
            }
          }]
        },
        legend: { 
          display: false
        },
        tooltips: {
          enabled: false,
        },
        title: {
          display: false,
          text: 'Predicted world population (millions) in 2050'
        }
      }
    });

    this.viewType = 'weekly-chart';

    var chartMixOne = new Chart(document.getElementById("mixed-chart-01"), {
      type: 'bar',
      data: {
        labels: ["Forward", "Received", "Closed", "WIP", "Submit","Inverview","Closuer"],
        datasets: [
          {
            label: "",
            backgroundColor: ["#136482", "#47b2c4","#66dab5","#f1b84d","#de3c63"],
            data: [10, 20 , 30 , 40 , 50, 60, 70],
            barThickness: 0.5
          }
        ]
      },
      options: {
        scales: {
          xAxes: [{
            barThickness: 10,
            ticks: {
              fontSize: 8
            }
          }]
        },
        legend: { 
          display: false
        },
        tooltips: {
          enabled: false,
        },
        title: {
          display: false,
          text: 'Predicted world population (millions) in 2050'
        }
      }
    });

  }

  searchClickHandler() {
    this.fullSearch  = !this.fullSearch;
  }

  searchCloseClickHandler() {
    this.fullSearch = false;
  }
}
