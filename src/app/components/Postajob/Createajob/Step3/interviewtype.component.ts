import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { Subscription } from 'rxjs/Subscription';
import { Subject, Observable } from 'rxjs';
import { EmploymentType } from '../../../../../models/employmenttype.model';

@Component({
  selector: 'app-steps-step3-interviewtype',
  templateUrl: './interviewtype.component.html'
})

export class InterviewTypeComponent implements OnInit, OnDestroy {  
 interviewtypelist: any;

  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {
  }

  populateInterviewType() {
    this.appService.getInterviewType().subscribe(res => {
      this.interviewtypelist = res
    });
   
  }


  ngOnInit() {
    this.populateInterviewType();
  }

  ngOnDestroy() {
  }
}
