import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { Subject, Observable } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';
declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-steps-step1-jobdetails',
  templateUrl: './jobdetails.component.html',
  // template: '<div class="ng-select-container form-control"></div>',
  styleUrls: ['./jobdetails.component.css'],
})

export class JobdetailsComponent implements OnInit {

  jobtitlelist: Observable<string[]>;
  selectedTitle = '';
  expYears: any = [];
  jobtitleloading = false;
  jobtitleinput = new Subject<string>();
  minExperience: number;
  maxExperience: number;


  //


  // companies: any[] = [];
  // loading = false;
  // companiesNames = ['Miškas', 'Žalias', 'Flexigen'];


  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {
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

  updateMinExp() {
    this.appService.updateMinExp(this.minExperience);
  }

  updateMaxExp() {
    this.appService.updateMaxExp(this.maxExperience);
  }

  updateJobTitle() {
    this.appService.updateJobtitle(this.selectedTitle);
  }
  public getExpYears() {
    this.expYears = [];
    for (let i = 0; i <= 50; i++) {
        this.expYears.push(i);
    }
    return this.expYears;
}
  ngOnInit() {
    this.getExpYears();
    this.searchJobTitle();
   // if (localStorage.getItem('jobId') != null) {
    this.appService.currentjobtitle.subscribe(x => this.selectedTitle = x);
    this.appService.currentminExp.subscribe(x => this.minExperience = x);
    this.appService.currentmaxExp.subscribe(x => this.maxExperience = x);
   // }
//    this.companiesNames.forEach((c, i) => {
//     this.companies.push({ id: i, name: c });
// });
   }

    addTitle(name) {
      this.selectedTitle = name;
        return { name: this.selectedTitle , tag: true };
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


