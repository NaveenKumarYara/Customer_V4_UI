import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { Subscription } from 'rxjs/Subscription';
import { Subject, Observable } from 'rxjs';
import { EmploymentType } from '../../../../../models/employmenttype.model';
// import { SalarysliderComponent } from './salaryslider.component';
import { Options, LabelType, ChangeContext, PointerType  } from 'ng5-slider';
import { MatDialog } from '@angular/material';
import { UploadvideoprofileComponent } from './uploadvideoprofile.component';
@Component({
  selector: 'app-steps-step3-employmenttype',
  templateUrl: './employmenttype.component.html'
})

export class EmploymentTypeComponent implements OnInit, OnDestroy {
 employmenttypelist: any;
  employmentTypeId: number;
  employmentType: EmploymentType;
  salaryTypelist: string[];
  salaryType = 1;
  minAnnualRate = 1000;
  maxAnnualRate = 10000;
  minHourRate = 20;
  maxHourRate = 100;
  salaryTypeSelected: any;
  annual: Options = {
    floor: 0,
    step: 500,
    ceil: 100500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min pay:</b> $' + value;
        case LabelType.High:
          return '<b>Max pay:</b> $' + value;
        default:
          return '$' + value;
      }
    }
  };
  hourly: Options = {
    floor: 0,
    step: 10,
    ceil: 200,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min pay:</b> $' + value;
        case LabelType.High:
          return '<b>Max pay:</b> $' + value;
        default:
          return '$' + value;
      }
    }
  };
  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService, private dialog: MatDialog) {// , private salaryRate: SalarysliderComponent
      this.employmentType = new EmploymentType();
  }

  populateEmploymentType() {
    this.appService.getEmploymentType().subscribe(res => {
      this.employmenttypelist = res.filter(x => x.EmploymentType);
    });
  }
  selectSalaryType(val) {
    // this.employmentTypeId = val.employmentTypeId;
   // this.appService.updateEmploymentType(val);
      this.salaryType = val === 'Annual' ? 2 : 1;
  }
  selectEmpType(val) {
    // this.employmentTypeId = val.employmentTypeId;
    this.appService.updateEmploymentType(val);
      // this.salaryType = val.EmploymentTypeId;
  }
  OpenScheduleInterviewDialog() {
    // var candidateUserId = $("#candidateUserId").val();
    // var candidateId = +candidateUserId;
    const scheduleIntwdialogRef = this.dialog.open(UploadvideoprofileComponent,
      {
        width: '750',
        position: {right : '0px'},
        height : '750px',
        data: {
          // jobResponseId: jobResponseId,
          jobId:  parseInt(localStorage.getItem('jobId'), 10),
         // userId: userId
         // status : this.statusid
        }
      }
    );
    scheduleIntwdialogRef.afterClosed().subscribe(result => {
     // this.jobDetails.populateJobsStaticInfo(this.jobid);
      // this.myEvent.emit(null);
      console.log('Chatbox Dialog result: ${result}');
    });
  }
  populateSalaryTypes() {
    this.salaryTypelist = this.appService.getSalaryType();
  }
  ngOnInit() {
    this.populateEmploymentType();
    this.populateSalaryTypes();
  //  if (localStorage.getItem('jobId') != null) {
    this.appService.currentEmploymentType.subscribe(x => this.employmentType = x);
    this.salaryType = this.employmentType.EmploymentTypeId === ( null || undefined) ? 1 : this.employmentType.EmploymentTypeId;
    this.appService.currentMinRate.subscribe(x => this.minAnnualRate = x);
    this.appService.currentMaxRate.subscribe(x => this.maxAnnualRate = x);
    this.appService.currentMinHourlyRate.subscribe(x => this.minHourRate = x);
    this.appService.currentMaxHourlyRate.subscribe(x => this.maxHourRate = x);
   // }
  }
  minAnnualChangeStart(changeContext: ChangeContext): void {
    // this.logText += `minAnnualChangeStart(${this.getChangeContextString(changeContext)})\n`;
     this.appService.updateSalaryRange(this.minAnnualRate, this.maxAnnualRate, this.salaryType );
 }

 onAnnualChange(changeContext: ChangeContext): void {
   // this.logText += `onAnnualChange(${this.getChangeContextString(changeContext)})\n`;
 }

 maxAnnualChangeEnd(changeContext: ChangeContext): void {
  // this.logText += `maxAnnualChangeEnd(${this.getChangeContextString(changeContext)})\n`;
 this.appService.updateSalaryRange(this.minAnnualRate, this.maxAnnualRate, this.salaryType );
 }

 minHourlyChangeStart(changeContext: ChangeContext): void {
  // this.logText += `minAnnualChangeStart(${this.getChangeContextString(changeContext)})\n`;
   this.appService.updateSalaryRange(this.minHourRate, this.maxHourRate, this.salaryType );
}

onHourlyChange(changeContext: ChangeContext): void {
 // this.logText += `onAnnualChange(${this.getChangeContextString(changeContext)})\n`;
}

maxHourlyChangeEnd(changeContext: ChangeContext): void {
// this.logText += `maxAnnualChangeEnd(${this.getChangeContextString(changeContext)})\n`;
this.appService.updateSalaryRange(this.minHourRate, this.maxHourRate, this.salaryType );
}

//  getChangeContextString(changeContext: ChangeContext): string {
//    return `{pointerType: ${changeContext.pointerType === PointerType.Min ? 'Min' : 'Max'}, ` +
//           `value: ${changeContext.value}, ` +
//           `highValue: ${changeContext.highValue}}`;
//  }
  ngOnDestroy() {
  }
}
