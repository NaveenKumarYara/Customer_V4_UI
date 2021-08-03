import { HttpParams } from "@angular/common/http";
import { Component, Input, OnChanges, OnInit, ViewChild } from "@angular/core";
import { Chart } from "chart.js";
import { ApiService } from "../services/api.service/api.service";

@Component({
  selector: 'app-radar-smart-chart',
  templateUrl: './radar-smart-chart.component.html',
  styleUrls: ['./radar-smart-chart.component.css']
})
export class RadarSmartChartComponent implements OnInit, OnChanges {
  smallRadarChartData = {
    labels: ["Job Fit", "Skill Fit",  "Culture Fit", "Personality Fit","Team Fit"],
    datasets: [
      {
        fill: true,
        backgroundColor: "rgb(54, 162, 235, 0.2)",
        borderColor: "#448afa",
        pointBackgroundColor: "#448afa",
        pointBorderColor: "#448afa",
        pointHoverBackgroundColor: "#448afa",
        borderWidth: 1,
        pointBorderWidth: 1,
        data: []        
      },
    ],
   
  };
  @Input() ProfileId:any;
  @Input() JobId:any;
  @Input() showLegend: boolean = true;
  @Input() height: string = "260";
  matchingParameterData:any;
  @Input() width: string = "230";
  @ViewChild("radarChart") private chartRef;
  chart: any;
 

  constructor( private _service: ApiService) {}

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
    this.chart.data = this.smallRadarChartData;
    this.chart.update();
  }

  GetMatchingPercentage(): any {
    let params = new HttpParams();
    params = params.append('jobId',  this.JobId);
    params = params.append('profileId', this.ProfileId);
   this._service.GetService('JobsAPI/api/GetJobMatchingCriteriaPercentage?', params).subscribe(res=>
     {
      this.matchingParameterData = res;
      this.smallRadarChartData.datasets[0].data=[this.matchingParameterData.JobFit,this.matchingParameterData.SkillFit,this.matchingParameterData.CultureFit,this.matchingParameterData.Personalityfit,0];
      //this.chart.Data=[this.matchingParameterData.JobFit,this.matchingParameterData.SkillFit,this.matchingParameterData.CultureFit,this.matchingParameterData.Personalityfit,0]
    });
  }

  ngOnInit() {
      this.GetMatchingPercentage();
  }
}
