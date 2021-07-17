import { Component, Input, OnChanges, OnInit, ViewChild } from "@angular/core";
import { Chart } from "chart.js";

@Component({
  selector: "app-doughnut-chart",
  templateUrl: "./doughnut-chart.component.html",
  styleUrls: ["./doughnut-chart.component.css"],
})
export class DoughnutChartComponent implements OnInit, OnChanges {
  data: any;
  options: any;
  @ViewChild("donutChart") private chartRef;
  chart: any;
  @Input() doughnutChartData: any;

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: "doughnut",
      options: {
        legend: {
          display: false,
          position: "bottom",
          labels: {
            boxWidth: 10,
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
    this.chart.data = this.doughnutChartData;
    this.chart.update();
  }
}
