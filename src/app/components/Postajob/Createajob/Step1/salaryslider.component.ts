import { Component, OnInit,AfterViewChecked, ViewContainerRef } from '@angular/core';
import { Options, LabelType, ChangeContext, PointerType  } from 'ng5-slider';
import { Salary } from '../../models/jobPostInfo';
import { AppService } from '../../../../app.service';
import { ToastsManager } from 'ng2-toastr';
@Component({
  selector: 'app-stepsalaryslider',
  templateUrl: './salaryslider.component.html',
  styleUrls: ["./salaryslider.component.css"]
})
export class StepSalarysliderComponent implements OnInit, AfterViewChecked {
  salaryTypelist: any;
  // salaryType = 1;
  salaryTypeSelected: Salary;
  minAnnualRate = 1000;
  maxAnnualRate = 10000;
  minHourRate = 20;
  maxHourRate = 100;
  show:boolean;
  flag:boolean = false;
  flag1:boolean = true;
  minsal:any;
  maxsal:any;
  // salaryTypeSelected: any;
  annual: Options = {
    floor: 0,
    step: 100,
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
    step: 1,
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
  constructor( private appService: AppService ,private toastr: ToastsManager, private _vcr: ViewContainerRef) {  this.toastr.setRootViewContainerRef(_vcr); }

  ngOnInit() {
    this.populateSalaryTypes();
    this.appService.currentSalaryTYpe.subscribe(x => this.salaryTypeSelected = x);
    this.appService.currentMinRate.subscribe(x => this.minAnnualRate = x);
      this.appService.currentMaxRate.subscribe(x => this.maxAnnualRate = x);
      this.appService.currentMinHourlyRate.subscribe(x => this.minHourRate = x);
      this.appService.currentMaxHourlyRate.subscribe(x => this.maxHourRate = x);
      this.flag = this.appService.BonusOffered!=null?this.appService.BonusOffered:false;
      this.flag1 = this.appService.HideSalary !=null?this.appService.HideSalary:true;
      // if(this.maxHourRate>200)
      // {
      //   this.show=true;      
      // }
      // else
      // {
      //   this.show=false;
      // }
  }

  ngAfterViewChecked() {
    this.flag = this.appService.BonusOffered!=null?this.appService.BonusOffered:false;
    this.flag1 = this.appService.HideSalary !=null?this.appService.HideSalary:true;
  }

  checkValue(event: any){
    //debugger
    this.flag = event;
    this.appService.BonusOffered = event;
 }

 checkValue1(event: any){
   //debugger
   this.flag1 = event;
  this.appService.HideSalary = event;
}

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)&& charCode !=46 ) {
      return false;
    }
    return true;

  }

  onMinChange(value)
  {
    if (Number(this.maxHourRate) < Number(this.minHourRate)) {
      this.toastr.info('Please provide valid Salary','Oh no!!!');
      return false;
 
    }
    else
    {
    this.minHourRate=value;
    this.appService.updateSalaryRange(this.minHourRate, this.maxHourRate,  this.salaryTypeSelected.SalaryTypeId);
    }
  }


  onMaxChange(value)
  {
    if (Number(this.maxHourRate) < Number(this.minHourRate)) {
      this.toastr.info('Please provide valid Salary','Oh no!!!');
      return false;
 
    }
    else
    {
      this.maxHourRate=value;
      this.appService.updateSalaryRange(this.minHourRate, this.maxHourRate,  this.salaryTypeSelected.SalaryTypeId);
    }
 
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
     if(val.SalaryTypeId === 2 )
     {
       this.minAnnualRate = this.minHourRate*2000;
       this.maxAnnualRate = this.maxHourRate*2000;
       this.appService.updateSalaryRange(this.minAnnualRate, this.maxAnnualRate,  this.salaryTypeSelected.SalaryTypeId  );
     }
     else
     {
       this.minAnnualRate=0;
       this.maxAnnualRate=0;
       this.appService.updateSalaryRange(this.minHourRate, this.maxHourRate, this.salaryTypeSelected.SalaryTypeId  );
     }
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
