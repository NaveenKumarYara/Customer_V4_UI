import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { Subject, Observable } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';


@Component({
  selector: 'app-steps-step1-jobcategory',
  templateUrl: './jobcategory.component.html'
})

export class JobcategoryComponent implements OnInit {

  jobcategorylist: Observable<string[]>;
  selectedCategory: any;

  jobtitleloading = false;
  jobcategoryinput = new Subject<string>();

  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {
  }

  private searchJobCategory() {
    this.jobcategorylist = concat(
      of([]), // default items
      this.jobcategoryinput.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => this.jobtitleloading = true),
        switchMap(term => this.appService.searchJobCategory(term).pipe(
          catchError(() => of([])), // empty list on error
          tap(() => this.jobtitleloading = false)
        ))
      )
    );
  }

  updateJobCategory() {
    this.appService.updateJobCategory(this.selectedCategory);
  }

  ngOnInit() {
    this.searchJobCategory();
    this.appService.currentcategorytitle.subscribe(x => this.selectedCategory = x);
  }

}
