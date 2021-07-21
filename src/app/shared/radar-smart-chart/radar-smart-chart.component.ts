import { Component, Input, OnChanges, OnInit, ViewChild } from "@angular/core";
import { Chart } from "chart.js";

@Component({
  selector: 'app-radar-smart-chart',
  templateUrl: './radar-smart-chart.component.html',
  styleUrls: ['./radar-smart-chart.component.css']
})
export class RadarSmartChartComponent implements OnInit, OnChanges {
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
          display: false,
          labels: {
            display: false,
          },
        },
        scale: {
          ticks: {
            stepSize: 20,
            callback: function() {return ""}
          },
          pointLabels:{
            fontSize: 0       
          },
        },
        tooltips: {
          enabled: false
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
