import { Component, Input, OnChanges, OnInit, ViewChild } from "@angular/core";
import { Chart } from "chart.js";

@Component({
  selector: "app-radar-chart",
  templateUrl: "./radar-chart.component.html",
  styleUrls: ["./radar-chart.component.css"],
})
export class RadarChartComponent implements OnInit, OnChanges {
  @Input() radarChartData: any;
  @Input() showLegend: boolean = true;
  @Input() height: string = "260";
  @Input() width: string = "230";
  @ViewChild("radarChart") private chartRef;
  chart: any;

  constructor() {}

  ngOnChanges() {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: "radar",
      options: {
        legend: {
          display: this.showLegend,
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

  ngOnInit() {}
}
