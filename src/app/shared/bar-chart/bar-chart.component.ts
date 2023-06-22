import { Component, Input, OnChanges, OnInit, ViewChild } from "@angular/core";
import { Chart } from "chart.js";

@Component({
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.css"],
})
export class BarChartComponent implements OnInit, OnChanges {
  data: any;
  options: any;
  @ViewChild("barChart") private chartRef;
  chart: any;
  @Input() barChartData: any;

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: "bar",
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
    this.chart.data = this.barChartData;
    this.chart.update();
  }
}
