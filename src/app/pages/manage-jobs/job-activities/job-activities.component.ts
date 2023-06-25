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
  jobCard: boolean = false;
  isChecked: boolean = false;
  showNoteForm: boolean = false;
  showFeedbackForm: boolean = false;

  constructor(private _service : ApiService, private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(
      (queryParams: Params) => {
          this.JobId = queryParams['JobId'];
      }
      );
  }

  ngOnInit(): void {
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
