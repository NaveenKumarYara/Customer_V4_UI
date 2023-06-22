import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { Subscription } from 'rxjs/Subscription';
import { Subject, Observable } from 'rxjs';
import { EmploymentType } from '../../../../../models/employmenttype.model';
import { InterviewType } from '../../../../../models/interviewtype.model';

@Component({
  selector: 'app-steps-step3-interviewtype',
  templateUrl: './interviewtype.component.html',
  styleUrls: ["./interviewtype.component.css"]
})

export class InterviewTypeComponent implements OnInit, OnDestroy {
  interviewtypelist: any;
  interviewType: InterviewType;
  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {
  }

  populateInterviewType() {
    this.appService.getInterviewType().subscribe(res => {
      this.interviewtypelist = res;
    });

  }
  setInterviewType(type) {
    // this.interviewType = type;
    this.appService.updateInterviewType(type);
  }

  ngOnInit() {
    this.populateInterviewType();
    this.appService.currentInterviewType.subscribe(x => this.interviewType = x);
  if (this.interviewType == null) {
    this.interviewType = new InterviewType();
    // this.interviewType.InterviewType = 'Full Time';
    this.interviewType.InterviewTypeId = 1;
  }
  }

  ngOnDestroy() {
  }
}
