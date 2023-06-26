import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/components/services/api.service';

@Component({
  selector: 'app-jobs-activities-nav',
  templateUrl: './jobs-activities-nav.component.html',
  styleUrls: ['./jobs-activities-nav.component.scss'],
  providers:[ApiService]
})
export class JobsActivitiesNavComponent implements OnInit {
  Percentweightage: any;
  @Input() JobId:any;
  constructor(private _service : ApiService) {
  }

  ngOnInit(): void {
     this.GetJobMatching();
  }

  GetJobMatching()
  {       
      this._service.GetJobMatching(Number(this.JobId)).subscribe((response:any) => { 
        this.Percentweightage =  response;
      });


  }

}
