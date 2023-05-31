import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/components/services/api.service';

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
  constructor(private _service : ApiService) {

   }

  ngOnInit(): void {
    if(this.JobId!=null)
    {
      this.GetJobDetail();
    }
   
  }

  GetJobDetail()
  {       
      this._service.GetEmployerService("/api/GetCustomerJobDetailsInfo?JobId=", Number(this.JobId)).subscribe((response:any) => { 
        this.JobDetail =  response[0];
      });


  }

  changeView() {
    this.isChecked =  ! this.isChecked;
  }

}
