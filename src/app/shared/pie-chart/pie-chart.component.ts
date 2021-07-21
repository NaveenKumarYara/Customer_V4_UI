import { Component, Input, OnChanges, OnInit, ViewChild } from "@angular/core";
import { Chart } from "chart.js";

@Component({
  selector: "app-pie-chart",
  templateUrl: "./pie-chart.component.html",
  styleUrls: ["./pie-chart.component.css"],
})
export class PieChartComponent implements OnInit, OnChanges {
  data: any;
  options: any;
  @ViewChild("pieChart") private chartRef;
  chart: any;
  @Input() pieChartData: any;

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: "pie",
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
    this.chart.data = this.pieChartData;
    this.chart.update();
  }
}
