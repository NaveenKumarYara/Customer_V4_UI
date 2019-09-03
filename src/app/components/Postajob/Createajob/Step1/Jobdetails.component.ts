import { Component, OnInit, Inject, ViewChild, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AppService } from '../../../../app.service';
// tslint:disable-next-line:import-blacklist
import { Subject, Observable } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';
import { Options, LabelType, ChangeContext, PointerType  } from 'ng5-slider';
declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-steps-step1-jobdetails',
  templateUrl: './Jobdetails.component.html',
  // template: '<div class="ng-select-container form-control"></div>',
  styleUrls: ['./Jobdetails.component.css'],
})

export class JobdetailsComponent implements OnInit, AfterViewChecked {
  @ViewChild('detailForm') detailForm: any;
  jobtitlelist: Observable<string[]>;
  selectedTitle = '';
  expYears: any = [];
  jobtitleloading = false;
  jobtitleinput = new Subject<string>();
  minExperience = 36;
  maxExperience = 60;
  minYears: number;
  maxYears: number;
suggestedTitle: string[];
customerId: any;
  //
  // minValue = 100;
  // maxValue = 400;
  options: Options = {
    floor: 1,
    ceil: 240,
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

  // updateMinExp() {
  //   this.appService.updateMinExp(this.minExperience);
  // }

  // updateMaxExp() {
  //   this.appService.updateMaxExp(this.maxExperience);
  // }

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
    this.appService.currentjobtitle.subscribe(x => this.selectedTitle = x);
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


