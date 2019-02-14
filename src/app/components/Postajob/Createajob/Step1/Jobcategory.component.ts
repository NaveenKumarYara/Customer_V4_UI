import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { Subject, Observable } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';
import { CategoryList } from '../../models/jobPostInfo';
import { Subscription } from 'rxjs/Subscription';
// import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-steps-step1-jobcategory',
  templateUrl: './jobcategory.component.html'
})

export class JobcategoryComponent implements OnInit {
  @ViewChild('categoryForm') categoryForm: any;
 // @ViewChild(NgSelectComponent)
  jobcategorylist: Observable<CategoryList[]>;
  selectedCategory: CategoryList;
  selectCategory: string;
  // ngSelect: NgSelectComponent;
  jobtitleloading = false;
  jobcategoryinput = new Subject<string>();
  suggestedCategory: string[];
  customerId: any;
  // getJobCategories: CategoryList[];
  // getJobCategory: CategoryList;

  private subscription: Subscription;
  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {
      this.customerId = parseInt(JSON.parse(sessionStorage.getItem('userData')).CustomerId, 10);
      // this.selectCategory = this.selectedCategory.Category;
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
  suggestedJobCategory() {
    this.appService.suggestJobCategory(this.customerId).subscribe(res => {
      this.suggestedCategory = res;
      // this.discResult.forEach(cc => cc.checked = false);
    });
  }
  updateJobCategory(val) {
   // this.selectedCategory.Category = val.JobCategory !== undefined ? val.JobCategory : val.Category;
   // if (this.selectedCategory.JobCategoryId === undefined) {
    this.selectCategory = val.Category;
   this.selectedCategory  = val; // .JobCategoryId;
   // this.jobcategorylist = val;
  //  const item = this.ngSelect.itemsList.findByLabel(val.Category);
  //  this.ngSelect.select(item);
   // }
   this.appService.updateJobCategory(this.selectedCategory);
  } // this.getJobCategory =  this.getJobCategories.find(s => s.Category === val);
   // this.appService.updateJobCategory(this.getJobCategory);

  ngOnInit() {
    this.searchJobCategory();
    this.suggestedJobCategory();
   // if (localStorage.getItem('jobId') != null) {
    this.appService.currentcategorytitle.subscribe(x => this.selectedCategory = x);
    this.selectCategory = this.selectedCategory.Category;
    if (this.selectCategory === undefined && localStorage.getItem('jobId') != null) {
      this.appService.getDraftCategory(parseInt(localStorage.getItem('jobId'), 10)).subscribe(
        x => this.selectCategory = x.Category);
    }
   // }
  }
  // this.jobcategorylist.subscribe(categoryLst => {
    //   this.getJobCategories = categoryLst as CategoryList[];
    // });
    // this.subscription = this.appService.currentcategorytitle
    //   .subscribe(
    //   (domain: CategoryList) => {
    //     this.domainlist = domain;
    //     }
    //   );

}
