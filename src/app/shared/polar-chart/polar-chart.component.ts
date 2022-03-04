import { Component, Input, OnChanges, OnInit, ViewChild } from "@angular/core";
import { Chart } from "chart.js";

@Component({
  selector: "app-polar-chart",
  templateUrl: "./polar-chart.component.html",
  styleUrls: ["./polar-chart.component.css"],
})
export class PolarChartComponent implements OnInit, OnChanges {
  data: any;
  options: any;
  @ViewChild("polarChart") private chartRef;
  chart: any;
  @Input() polarChartData: any;

  constructor() {}

  ngOnChanges() {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: "polarArea",
      options: {
        legend: {
          display: false,
          position: "bottom",
          labels: {
            boxWidth: 10,
          },
        },
        scale: {
          ticks: {
            beginAtZero: true,
            max: 100,
            min: 0,
            stepSize: 10,
          },
        },
        maintainAspectRatio: false,
        responsive: true,
        hover: {
          onHover: function (e: any) {
            var point = this.getElementAtEvent(e);
            if (point.length) e.target.style.cursor = "pointer";
            else e.target.style.cursor = "default";
          },
        },
      },
    });
 
    setInterval(()=>{
      this.chart.data = this.polarChartData;
      this.chart.update();
    },1000)
 
  }

  ngOnInit() {}
}
