import { Component, OnInit } from '@angular/core';
import * as Chart from "chart.js";

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    /*Chart One
    ---------------------------------------*/
    var ctx = document.getElementById("card-chart1");
    var chart = new Chart(ctx, {
      type: 'line',
      options: {
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false,
            min: 30, 
            max: 89
          }],
        }
      },
      data: {
        labels: ['Item 1', 'Item 2', 'Item 3','Item 4', 'Item 5', 'Item 6','Item 7'],
        datasets: [{
          fill: false,
          borderWidth: 1,
          pointBackgroundColor:'#136482',
          data: [65, 59, 84, 84, 51, 55, 40],
          borderColor:'#136482'
        }]
      }
    });

    /*Chart Two
    ---------------------------------------*/
    var ctxTwo = document.getElementById("card-chart2");
    var chartTwo = new Chart(ctxTwo, {
      type: 'line',
      options: {
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false,
            min: 30, 
            max: 89
          }],
        }
      },
      data: {
        labels: ['Item 1', 'Item 2', 'Item 3','Item 4', 'Item 5', 'Item 6','Item 7'],
        datasets: [{
          fill: false,
          borderWidth: 1,
          pointBackgroundColor:'#028cba',
          data: [1, 18, 9, 17, 34, 22, 11],
          borderColor:'#028cba'
        }]
      }
    });

    /*Chart Three
    ---------------------------------------*/
    var ctxThree = document.getElementById("card-chart3");
    var chartThree= new Chart(ctxThree, {
      type: 'line',
      options: {
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false,
            min: 30, 
            max: 89
          }],
        }
      },
      data: {
        labels: ['Item 1', 'Item 2', 'Item 3','Item 4', 'Item 5', 'Item 6','Item 7'],
        datasets: [{
          fill: true,
          borderWidth: 5,
          backgroundColor: "#47b2c4", 
          borderColor: "rgba(163,216,225,.55)",
          data: [78, 81, 80, 45, 34, 12, 40],
          pointBackgroundColor:"transparent"
        }]
      }
    });

    /*Chart Four
    ---------------------------------------*/
    var ctxFour = document.getElementById("card-chart4");
    var chartFour = new Chart(ctxFour, {
      type: 'bar',
      options: {
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false,
            min: 30, 
            max: 89
          }],
        }
      },
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "January", "February", "March", "April"],
        maintainAspectRatio: false,
        datasets: [{
          backgroundColor: "#66dab5", 
          barPercentage: 0.6,
          data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82]
        }]
      }
    });

    /*Chart Five
    ---------------------------------------*/
    var ctxFive = document.getElementById("card-chart5");
    var chartFive= new Chart(ctxFive, {
      type: 'line',
      options: {
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false,
            min: 30, 
            max: 89
          }],
        }
      },
      data: {
        labels: ['Item 1', 'Item 2', 'Item 3','Item 4', 'Item 5', 'Item 6','Item 7'],
        datasets: [{
          fill: true,
          borderWidth: 5,
          backgroundColor: "#f1b84d", 
          borderColor: "rgba(238,166,32,.20)",
          data: [78, 81, 80, 45, 34, 12, 40],
          pointBackgroundColor:"transparent"
        }]
      }
    });

     /*Chart Six
    ---------------------------------------*/
    var ctxSix = document.getElementById("card-chart6");
    var chartSix = new Chart(ctxSix, {
      type: 'bar',
      options: {
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false,
            min: 30, 
            max: 89
          }],
        }
      },
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "January", "February", "March", "April"],
        maintainAspectRatio: false,
        datasets: [{
          backgroundColor: "#de3c63", 
          barPercentage: 0.6,
          data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82]
        }]
      }
    });

     /*Chart Seven
    ---------------------------------------*/
    var ctxSeven = document.getElementById("card-chart7");
    var chartSeven = new Chart(ctxSeven, {
      type: 'line',
      options: {
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false,
            min: 30, 
            max: 89
          }],
        }
      },
      data: {
        labels: ['Item 1', 'Item 2', 'Item 3','Item 4', 'Item 5', 'Item 6','Item 7'],
        datasets: [{
          fill: false,
          borderWidth: 1,
          pointBackgroundColor:'#6e819e',
          data: [65, 59, 84, 84, 51, 55, 40],
          borderColor:'#6e819e'
        }]
      }
    });

    /*Chart Eight
    ---------------------------------------*/
    var ctxEight = document.getElementById("card-chart8");
    var chartEight = new Chart(ctxEight, {
      type: 'line',
      options: {
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false,
            min: 30, 
            max: 89
          }],
        }
      },
      data: {
        labels: ['Item 1', 'Item 2', 'Item 3','Item 4', 'Item 5', 'Item 6','Item 7'],
        datasets: [{
          fill: false,
          borderWidth: 1,
          pointBackgroundColor:'#90a4ad',
          data: [1, 18, 9, 17, 34, 22, 11],
          borderColor:'#90a4ad'
        }]
      }
    });

    var mixedChart = new Chart(document.getElementById("mixed-chart"), {
      type: 'bar',
      data: {
        labels: ["1900", "1950", "1999", "2050"],
        datasets: [{
            label: "Europe",
            type: "line",
            borderColor: "#f8977e",
            data: [408,547,675,734],
            fill: false
          }, {
            label: "Africa",
            type: "line",
            borderColor: "#f8977e",
            data: [133,221,783,2478],
            fill: false
          }, {
            label: "Europe",
            type: "bar",
            backgroundColor: "#52459f",
            data: [408,547,675,734],
          }, {
            label: "Africa",
            type: "bar",
            backgroundColor: "#52459f",
            backgroundColorHover: "#52459f",
            data: [133,221,783,2478]
          }
        ]
      },
      options: {
        title: {
          display: false,
          text: 'Population growth (millions): Europe & Africa'
        },
        legend: { 
          labels: {
            boxWidth: 10,
            boxHeight: 10,
            borderWidth: 1,
            borderRadius: 20
          }
        }
      }
    });

    var mixedChartOne = document.getElementById("mixed-chart-01");

    var chartMixOne = new Chart(mixedChartOne, {
      type: 'line',
      data: {
          labels: ["Tokyo",	"Mumbai",	"Mexico City",	"Shanghai",	"Sao Paulo"],
          datasets: [{
            label: 'Series 1', // Name the series
            data: [10,	60,	50,	40,	30], // Specify the data values array
            fill: true,
            borderColor: '#c98c1c', // Add custom color border (Line)
            backgroundColor: '#F1B84D', // Add custom color background (Points and Fill)
            borderWidth: 1 // Specify bar border width
          },
          {
            label: 'Series 2', // Name the series
            data: [	90,	100,	85,	65, 75], // Specify the data values array
            fill: true,
            borderColor: '#2196f3', // Add custom color border (Line)
            backgroundColor: '#2CF6B6', // Add custom color background (Points and Fill)
            borderWidth: 1 // Specify bar border width
          }]
      },
      options: {
        legend: { 
          labels: {
            boxWidth: 10,
            boxHeight: 10,
            borderWidth: 1
          }
        }
      }
    });

    var chartMixTwo = new Chart(document.getElementById("mixed-chart-02"), {
      type: 'horizontalBar',
      data: {
        labels: ["20", "40", "80", "100", "120"],
        datasets: [
          {
            label: "Population (millions)",
            backgroundColor: ["#136482", "#47b2c4","#66dab5","#f1b84d","#de3c63"],
            data: [20, 40 , 60 , 80 , 120]
          }
        ]
      },
      options: {
        legend: { 
          labels: {
            boxWidth: 10,
            boxHeight: 10,
            borderWidth: 1,
            borderRadius: 20
          }
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

    var chartMixThree = new Chart(document.getElementById("mixed-chart-03"), {
      type: 'bubble',
      data: {
        labels: "Africa",
        datasets: [
          {
            label: ["China"],
            backgroundColor: "rgba(255,221,50,0.2)",
            borderColor: "rgba(255,221,50,1)",
            data: [{
              x: 21269017,
              y: 5.245,
              r: 15
            }]
          }, {
            label: ["Denmark"],
            backgroundColor: "rgba(60,186,159,0.2)",
            borderColor: "rgba(60,186,159,1)",
            data: [{
              x: 258702,
              y: 7.526,
              r: 10
            }]
          }, {
            label: ["Germany"],
            backgroundColor: "rgba(0,0,0,0.2)",
            borderColor: "#000",
            data: [{
              x: 3979083,
              y: 6.994,
              r: 15
            }]
          }, {
            label: ["Japan"],
            backgroundColor: "rgba(193,46,12,0.2)",
            borderColor: "rgba(193,46,12,1)",
            data: [{
              x: 4931877,
              y: 5.921,
              r: 15
            }]
          }
        ]
      },
      options: {
        legend: { 
          labels: {
            boxWidth: 10,
            boxHeight: 10,
            borderWidth: 1,
            borderRadius: 20
          }
        },
        title: {
          display: false,
          text: 'Predicted world population (millions) in 2050'
        }, 
        scales: {
          yAxes: [{ 
            scaleLabel: {
              display: true,
              labelString: "Happiness"
            }
          }],
          xAxes: [{ 
            scaleLabel: {
              display: true,
              labelString: "GDP (PPP)"
            }
          }]
        }
      }
    });
  }

}
