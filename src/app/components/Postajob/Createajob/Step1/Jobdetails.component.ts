import { Component, OnInit, Inject, ViewChild, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AppService } from '../../../../app.service';
// tslint:disable-next-line:import-blacklist
import { Subject, Observable } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { ClientModel, DepartmentModel, PjDepartments, jobDues } from '../../models/jobPostInfo';
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';
import { Options, LabelType, ChangeContext, PointerType  } from 'ng5-slider';
import { jobImps } from '../../models/jobPostInfo';
declare var $: any;
declare var jQuery: any;
import { DatepickerOptions } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';
import { getYear } from 'date-fns';
@Component({
  selector: 'app-steps-step1-jobdetails',
  templateUrl: './Jobdetails.component.html',
  // template: '<div class="ng-select-container form-control"></div>',
  styleUrls: ['./Jobdetails.component.css'],
})

export class JobdetailsComponent implements OnInit, AfterViewChecked {
  @ViewChild('detailForm') detailForm: any;
  jobtitlelist: Observable<string[]>;
  showDate:boolean=false;
  Expiry:number=3;
  Options: DatepickerOptions = {
    minYear: 2021,
    minDate: new Date(Date.now())
  };
  //ExpiryDate:Date;
  ExpiryDate: Date;
    settings = {
        bigBanner: true,
        timePicker: false,
        format: 'MM-dd-yyyy',
        defaultOpen: false
    }
  jobDuelist:jobDues[]=[];
  selectedTitle;
  newtitle;
  expYears: any = [];
  jobPositionId:string;
  jobtitleloading = false;
  jobtitleinput = new Subject<string>();
  minExperience = 36;
  maxExperience = 60;
  minYears: number;
  maxYears: number;
  jobPriority:number=3;
suggestedTitle: string[];
customerId: any;
jobimplist:jobImps[]=[];
  //
  // minValue = 100;
  // maxValue = 400;
  options: Options = {
    floor: 1,
    ceil: 480,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return  (value / 12).toFixed(1)   + 'Years';
        case LabelType.High:
          return (value / 12).toFixed(1)   + 'Years' ;
          default:
          return ' ';
      }
    }
  };

  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {
      this.customerId = parseInt(JSON.parse(sessionStorage.getItem('userData')).CustomerId, 10);
      this.GetJobPriority();
      this.GetJobDueIn();
  }

  private searchJobTitle() {
    this.jobtitlelist = concat(
      of([]), // default items
      this.jobtitleinput.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => this.jobtitleloading = true),
        switchMap(term => this.appService.searchJobTitle(term).pipe(
          catchError(() => of([])), // empty list on error
          tap(() => this.jobtitleloading = false)
        ))
      )
    );
  }

  updateJobDue() {
    if(this.Expiry == 5)
    {
      this.showDate=true;
    }
    else 
    {
      this.showDate=false;
    }

    if(this.Expiry==1)
    {
      this.showDate=false;
      let date = new Date();  
      let val = new Date(date.setDate(date.getDate() + 7 )) ;
      this.ExpiryDate = val;
    }
    else if(this.Expiry==2)
    {
      this.showDate=false;
      let date = new Date();  
      let val = new Date(date.setDate(date.getDate() + 14 )) ;
      this.ExpiryDate = val;
    }
    else if(this.Expiry==3)
    {
      this.showDate=false;
      let date = new Date();  
      let val = new Date(date.setDate(date.getDate() + 30 )) ;
      this.ExpiryDate = val;
    }
    else if(this.Expiry==4)
    {
      this.showDate=false;
      let date = new Date();  
      let val = new Date(date.setDate(date.getDate() + 60 )) ;
      this.ExpiryDate = val;
    }
      else if(this.Expiry==5)
      {
        this.showDate=true;
      }
      this.appService.updateJobDueDate(this.ExpiryDate);    
      this.appService.updateJobDue(this.Expiry);
    }
  
    changeMethod(val)
    {
      debugger
      if(val!=null)
      this.ExpiryDate=val;
      this.appService.updateJobDueDate(this.ExpiryDate);   
    }

  GetJobDueIn() {
     this.appService.GetJobDueIn().subscribe(res => {
      this.jobDuelist = res;
  });
  }

  // updateMinExp() {
  //   this.appService.updateMinExp(this.minExperience);
  // }

  // updateMaxExp() {
  //   this.appService.updateMaxExp(this.maxExperience);
  // }

  GetJobPriority() {
    this.appService.GetJobPriority().subscribe(res => {
     this.jobimplist = res;
 });
 }

  changeJobPosition(val) {
    this.jobPositionId = val;
    this.appService.updateJobPosition(this.jobPositionId);
  }

  updateJobImp() {
    this.appService.updateJobImp(this.jobPriority);
  }

  updateJobTitle(val?: any) {
    if (val != null) {
    this.selectedTitle = val.JobTitle;
  }
    this.appService.updateJobtitle(this.selectedTitle);
  }
//   public getExpYears() {
//     this.expYears = [];
//     for (let i = 1; i <= 50; i++) {
//         this.expYears.push(i);
//     }
//     return this.expYears;
// }
// valdiateExperience(min, max): boolean {
// const maximum = parseInt(max, 10);
// const minium = parseInt(min, 10);
// if (maximum < minium) {
//   return true;
// }
// return false;
// }
suggestedJobTitle() {
  this.appService.suggestJobTitle(this.customerId).subscribe(res => {
    this.suggestedTitle = res;
  });
}
  ngOnInit() {
    // this.getExpYears();
    this.searchJobTitle();
    this.suggestedJobTitle();
    this.appService.currentjobDue.subscribe(
      (data)=>
      {
        this.Expiry=data;
        if(data==5)
        {
          this.showDate=true;
        }
        else
        {
          this.showDate=false;
        }
      }
    
      );
    this.appService.currentjobDueDate.subscribe(y=>this.ExpiryDate=y);
    this.appService.currentjobPosition.subscribe(x => this.jobPositionId = x);
    this.appService.currentjobImp.subscribe(k=>this.jobPriority=k);
    this.appService.currentjobtitle.subscribe(x => this.selectedTitle = x);
    
    if(this.selectedTitle=='')
    {
      this.selectedTitle= this.newtitle;
    }
    // this.appService.currentminExp.subscribe(x => {
    //     this.minExperience = x;
    //     this.minYears = this.minExperience / 12;
    //   });
    // this.appService.currentmaxExp.subscribe(x => {
    //   this.maxExperience = x;
    //   this.maxYears = this.maxExperience / 12;
    // } );

   }
   ngAfterViewChecked() {
    this.appService.currentminExp.subscribe(x => {
      this.minExperience = x;
      this.minYears = this.minExperience / 12;
    });
  this.appService.currentmaxExp.subscribe(x => {
    this.maxExperience = x;
    this.maxYears = this.maxExperience / 12;
  } );
  }
    addTitle(name) {
      this.selectedTitle = name;
        return { name: this.selectedTitle , tag: true };
    }
    minExperienceChangeStart(changeContext: ChangeContext): void {
      // this.logText += `minAnnualChangeStart(${this.getChangeContextString(changeContext)})\n`;
      // this.minYears = this.minExperience / 12;
       this.appService.updateMinExp(this.minExperience);
   }
   onExperienceChange(changeContext: ChangeContext): void {
    // this.minYears = this.minExperience / 12;
    // this.maxYears = this.maxExperience / 12;
      this.appService.updateMinExp(this.minExperience);
      this.appService.updateMaxExp(this.maxExperience);
   }
   maxExperienceChangeEnd(changeContext: ChangeContext): void {
      // this.maxYears = this.maxExperience / 12;
      this.appService.updateMaxExp(this.maxExperience);
   }
    // addTagPromise(name) {
    //     return new Promise((resolve) => {
    //         this.loading = true;
    //         setTimeout(() => {
    //             resolve({ id: 5, name: name, valid: true });
    //             this.loading = false;
    //         }, 1000);
    //     });
    }


