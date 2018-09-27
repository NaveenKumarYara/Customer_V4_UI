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
    // (function ($) {
    //   var minYear = 0,
    //       maxYear = 0;
    //   var $maxYearSpinner = $('.re-group #re_year');
    //   var $minYearSpinner = $('.re-group #re_month');
    //   var $parentDiv = $maxYearSpinner.closest('.form-group');
    //   var $outputDiv = $parentDiv.find('.experience-output');
    //   var $timePicker = $parentDiv.find('.time-picker');

    //   var options = {
    //     min: 1,
    //     max: 12,
    //     step: 1
    //   };

    //   $maxYearSpinner.spinner(options);
    //   $minYearSpinner.spinner(options);

    //   function changeHandlerMinYear(e, ui) {
    //     minYear = ui.value;
    //     $outputDiv.text(minYear + " - " + maxYear + "Years");
    //   }

    //   function changeHandlerMaxYear(e, ui) {
    //     maxYear = ui.value;
    //     $outputDiv.text(minYear + " - " + maxYear + "Years");
    //   }

    //   $maxYearSpinner.on('spin', changeHandlerMaxYear);
    //   $minYearSpinner.on('spin', changeHandlerMinYear);

    //   //slide toggle time picker
    //   $outputDiv.on('click', function () {
    //     $timePicker.slideToggle('fast');
    //   });
    // })(jQuery);
    this.getExpYears();
    this.searchJobTitle();
    this.appService.currentjobtitle.subscribe(x => this.selectedTitle = x);
  }

}
