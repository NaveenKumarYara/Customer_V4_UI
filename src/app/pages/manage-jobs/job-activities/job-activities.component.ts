import { HttpParams } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/components/services/api.service';

@Component({
  selector: 'app-job-activities',
  templateUrl: './job-activities.component.html',
  styleUrls: ['./job-activities.component.scss'],
  providers: [ApiService]
})
export class JobActivitiesComponent implements OnInit {
  viewLayout = 'grid';
  JobDetail: any;
  panelTitle:any = '';
  panelShow: any = '';
  JobId: any;
  Profiles:any=[];
  jobCard: boolean = false;
  isChecked: boolean = false;
  showNoteForm: boolean = false;
  showFeedbackForm: boolean = false;
  customer:any;
  constructor(private _service : ApiService, private route: ActivatedRoute) { 
    this.customer = JSON.parse(localStorage.getItem('customer')||'');
    this.route.queryParams.subscribe(
      (queryParams: Params) => {
          this.JobId = queryParams['JobId'];
      }
      );
  }

  ngOnInit(): void {
    this.GetJobAppliedProfilesDetail(0,'');
    if(this.JobId!=null)
    {
      this.GetJobDetail();
    }
  }

  GetJobDetail() {       
    this._service.GetEmployerService("/api/GetCustomerJobDetailsInfo?JobId=", Number(this.JobId)).subscribe((response:any) => { 
      this.JobDetail =  response[0];
    });
  }
  
  GetJobAppliedProfilesDetail(FilterStatus: string | number | boolean,Search: string)
  {       
    let params = new HttpParams();
		params = params.append("CustomerId", this.customer.CustomerId);
		params = params.append("JobId",  Number(this.JobId));
    params = params.append("FilterStatus",FilterStatus );
    params = params.append("SearchString",Search);
    this._service.GetEmployerService("/api/GetCustomerApplicantJobProfiles?",params).subscribe((response:any) => { 
      this.Profiles =  response;
      console.log(response);
    });
  }

  panelHandler(name: string) {
    this.panelShow = name;
  }

  layoutView(name:string){
    this.viewLayout = name;
  }

  changeView() {
    this.isChecked =  ! this.isChecked;
  }

  panelCloseHandler() {
    this.panelShow = '';
  }

  showNoteFormHandler() {
    this.showNoteForm = true;
  }

  hideNoteFormhandler() {
    this.showNoteForm = false;
  }

  showFeedbackFormHandler() {
    this.showFeedbackForm = true;
  }

  hideFeedbackFormhandler() {
    this.showFeedbackForm = false;
  }
}
