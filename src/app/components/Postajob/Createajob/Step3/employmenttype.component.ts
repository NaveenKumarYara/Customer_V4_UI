import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { Subscription } from 'rxjs/Subscription';
import { Subject, Observable } from 'rxjs';
import { EmploymentType } from '../../../../../models/employmenttype.model';

@Component({
  selector: 'app-steps-step3-employmenttype',
  templateUrl: './employmenttype.component.html'
})

export class EmploymentTypeComponent implements OnInit, OnDestroy {
 employmenttypelist: any;
  employmentTypeId: number;
  employmentType: EmploymentType;
  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {
  }

  populateEmploymentType() {
    this.appService.getEmploymentType().subscribe(res => {
      this.employmenttypelist = res.filter(x => x.EmploymentType);
    });

  }
  selectEmpType(val) {
    // this.employmentTypeId = val.employmentTypeId;
    this.appService.updateEmploymentType(val);
  }

  ngOnInit() {
    this.populateEmploymentType();
  //  if (localStorage.getItem('jobId') != null) {
    this.appService.currentEmploymentType.subscribe(x => this.employmentType = x);
   // }
  }

  ngOnDestroy() {
  }
}
