import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Chart } from "chart.js";

@Component({
  selector: "app-radar-chart-large",
  templateUrl: "./radar-chart-large.component.html",
  styleUrls: ["./radar-chart-large.component.css"],
})
export class RadarChartLargeComponent implements OnInit {
  @Input() radarChartData: any;
  @ViewChild("radarChart") private chartRef;
  chart: any;

  constructor() {}

  ngOnChanges() {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: "radar",
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
            stepSize: 20,
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
    this.chart.data = this.radarChartData;
    this.chart.update();
  }

  ngOnInit() {
    setInterval(() => {
      this.chart.update();
  }, 1000);
  }
}
