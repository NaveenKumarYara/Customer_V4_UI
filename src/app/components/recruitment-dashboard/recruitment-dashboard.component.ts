import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as Chart from "chart.js";
declare var $: any;

@Component({
  selector: 'app-recruitment-dashboard',
  templateUrl: './recruitment-dashboard.component.html',
  styleUrls: ['./recruitment-dashboard.component.css','./../../../assets/styles/css/icons.css']
})

export class RecruitmentDashboardComponent implements OnInit {

  fullSearch:boolean = false;
  viewType: string = 'weeklyChart';
  constructor() { }
  options = {
    items: 5, 
    dots: false, 
    nav: true,
    loop:true,
    responsive : {
      // breakpoint from 0 up
      0 : {
          option1 : 1,
          option2 : 1,
      },
      // breakpoint from 480 up
      480 : {
          option1 : 2,
          option2 : 1,
      },
      // breakpoint from 768 up
      768 : {
          option1 : 3,
          option2 : 1,
      }
    }
  }
  images = [
    {name:'CPA', count:'5'},
    {name:'TE', count:'5'},
    {name:'AFS', count:'5'},
    {name:'DIR', count:'5'},
    {name:'THECB', count:'5'},
    {name:'CPA', count:'5'}
  ]; 
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

   
  }

  ngAfterViewInit() {
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
    $(window).trigger('resize');
    chartMixOne.resize();
    chartMixOne.render();
  }

  weeklyChartHandle() {
    this.viewType = 'weeklyChart';
    
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
    chartMixOne.clear();
    $(window).trigger('resize');
    chartMixOne.resize();
    chartMixOne.render();
  }

  searchClickHandler() {
    this.fullSearch  = !this.fullSearch;
  }

  searchCloseClickHandler() {
    this.fullSearch = false;
  }
}
