import { Component, OnInit } from '@angular/core';
import { Options, LabelType, ChangeContext, PointerType  } from 'ng5-slider';
import { Salary } from '../../models/jobPostInfo';
import { AppService } from '../../../../app.service';
@Component({
  selector: 'app-salaryslider',
  templateUrl: './salaryslider.component.html'
})
export class SalarysliderComponent implements OnInit {
  salaryTypelist: any;
  // salaryType = 1;
  salaryTypeSelected: Salary;
  minAnnualRate = 1000;
  maxAnnualRate = 10000;
  minHourRate = 20;
  maxHourRate = 100;
  // salaryTypeSelected: any;
  annual: Options = {
    floor: 0,
    step: 500,
    ceil: 400000,
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
    step: 5,
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
  constructor( private appService: AppService) { }

  ngOnInit() {
    this.populateSalaryTypes();
    this.appService.currentSalaryTYpe.subscribe(x => this.salaryTypeSelected = x);
    this.appService.currentMinRate.subscribe(x => this.minAnnualRate = x);
      this.appService.currentMaxRate.subscribe(x => this.maxAnnualRate = x);
      this.appService.currentMinHourlyRate.subscribe(x => this.minHourRate = x);
      this.appService.currentMaxHourlyRate.subscribe(x => this.maxHourRate = x);
  }
  populateSalaryTypes() {
    this.appService.getSalaryType().subscribe(res => {
      this.salaryTypelist = res.filter(x => x.SalaryType);
    });
    // this.salaryTypelist = this.appService.getSalaryType();
  }
  selectSalaryType(val) {
    // this.employmentTypeId = val.employmentTypeId;
   // this.appService.updateEmploymentType(val);
     // this.salaryType = val === 'Annual' ? 2 : 1;
     this.salaryTypeSelected = val;
     this.appService.updatetSalaryType(this.salaryTypeSelected);
  }
  minAnnualChangeStart(changeContext: ChangeContext): void {
    // this.logText += `minAnnualChangeStart(${this.getChangeContextString(changeContext)})\n`;
    this.minHourRate = this.minAnnualRate / 2000;
     this.appService.updateSalaryRange(this.minAnnualRate, this.maxAnnualRate,  this.salaryTypeSelected.SalaryTypeId  );
 }
 onAnnualChange(changeContext: ChangeContext): void {
   // this.logText += `onAnnualChange(${this.getChangeContextString(changeContext)})\n`;
   this.minHourRate = this.minAnnualRate / 2000;
   this.maxHourRate = this.maxAnnualRate / 2000;
   this.appService.updateSalaryRange(this.minAnnualRate, this.maxAnnualRate,  this.salaryTypeSelected.SalaryTypeId  );
 }
 maxAnnualChangeEnd(changeContext: ChangeContext): void {
  // this.logText += `maxAnnualChangeEnd(${this.getChangeContextString(changeContext)})\n`;
  this.maxHourRate = this.maxAnnualRate / 2000;
 this.appService.updateSalaryRange(this.minAnnualRate, this.maxAnnualRate , this.salaryTypeSelected.SalaryTypeId  );
 }
 minHourlyChangeStart(changeContext: ChangeContext): void {
  // this.logText += `minAnnualChangeStart(${this.getChangeContextString(changeContext)})\n`;
  this.minAnnualRate = this.minHourRate * 2000;
   this.appService.updateSalaryRange(this.minHourRate, this.maxHourRate, this.salaryTypeSelected.SalaryTypeId  );
}

onHourlyChange(changeContext: ChangeContext): void {
 // this.logText += `onAnnualChange(${this.getChangeContextString(changeContext)})\n`;
 this.minAnnualRate = this.minHourRate * 2000;
 this.maxAnnualRate = this.maxHourRate * 2000;
 this.appService.updateSalaryRange(this.minHourRate, this.maxHourRate, this.salaryTypeSelected.SalaryTypeId  );
}

maxHourlyChangeEnd(changeContext: ChangeContext): void {
// this.logText += `maxAnnualChangeEnd(${this.getChangeContextString(changeContext)})\n`;
this.maxAnnualRate = this.maxHourRate * 2000;
this.appService.updateSalaryRange(this.minHourRate, this.maxHourRate , this.salaryTypeSelected.SalaryTypeId  );
}
}
