import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/components/services/api.service';
import { ChartConfiguration, ChartOptions } from 'chart.js';
@Component({
  selector: 'app-job-activities-summary',
  templateUrl: './job-activities-summary.component.html',
  styleUrls: ['./job-activities-summary.component.scss'],
  providers: [ApiService]
})
export class JobActivitiesSummaryComponent implements OnInit {
  isChecked: boolean = false;
  JobDetail: any;
  @Input() JobId:any;
  public barChartLegend = false;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { 
        data: [ 65, 59, 80, 81, 56, 55, 40 ], 
        label: 'Series A',
        barPercentage: 0.5,
        barThickness: 20,
        maxBarThickness: 15,
        minBarLength: 2,
        backgroundColor:['#CFC8EA','#F6DEA7','#CFC8EA','#F6DEA7','#CFC8EA','#F6DEA7','#CFC8EA'],
        hoverBackgroundColor: '#fbc849',
        borderRadius: 20
      }
    ]
  };

  public barChartOptions: any = {
    scaleShowVerticalLines: true,
    responsive: true,
  }
  public barChartType = 'bar';
  constructor(private _service : ApiService,private _location: Location) {

   }

  ngOnInit(): void {
    if(this.JobId!=null)
    {
      this.GetJobDetail();
    }
   
  }

  backClicked() {
    this._location.back();
  }

  GetJobDetail() {       
    this._service.GetEmployerService("/api/GetCustomerJobDetailsInfo?JobId=", Number(this.JobId)).subscribe((response:any) => { 
      this.JobDetail =  response[0];
    });
  }

  changeView() {
    this.isChecked =  ! this.isChecked;
  }

}
