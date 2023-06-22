import { Component, OnInit, ViewChild } from "@angular/core";
import { Chart } from "chart.js";

@Component({
  selector: "app-line-chart",
  templateUrl: "./line-chart.component.html",
  styleUrls: ["./line-chart.component.css"],
})
export class LineChartComponent implements OnInit {
  data: any;
  options: any;
  @ViewChild("lineChart") private chartRef;
  chart: any;

  constructor() {
    this.data = {
      // labels: ["Job Fit", "Skill Fit", "Personality Fit", "Culture Fit", "Team Fit"],
      labels: ["2017", "2018", "2019", "2020", "2021", "2022", "2023"],
      datasets: [
        {
          label: "Good Team Player",
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: "pink",
          tension: 0.1,
        },
        {
          label: "Best Practices",
          data: [60, 49, 90, 81, 50, 35, 20],
          fill: false,
          borderColor: "lightgreen",
          tension: 0.1,
        },
        {
          label: "Informatica",
          data: [45, 69, 70, 91, 76, 65, 30],
          fill: false,
          borderColor: "lightblue",
          tension: 0.1,
        },
        {
          label: "Performed Unit Testing",
          data: [40, 45, 60, 80, 75, 60, 75],
          fill: false,
          borderColor: "#6A7E9C",
          tension: 0.1,
        },
        {
          label: "Business Requirements",
          data: [80, 65, 70, 40, 25, 10, 55],
          fill: false,
          borderColor: "#FFB415",
          tension: 0.1,
        },
      ],
    };
  }

  ngOnInit() {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: "line",
      data: this.data,
      options: {
        legend: {
          display: true,
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
  }
}
