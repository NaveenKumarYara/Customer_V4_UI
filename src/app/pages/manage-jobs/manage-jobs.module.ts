import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageJobsComponent } from './manage-jobs.component';
import  { SharedModule } from './../../shared/shared.module'
import  { PaginationComponent } from './../common/pagination/pagination.component';
import { ManageJobFiltersComponent } from './manage-job-filters/manage-job-filters.component';
import { ManageJobcardComponent } from './manage-jobcard/manage-jobcard.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ManageAdvanceFilterComponent } from './manage-job-filters/manage-advance-filter/manage-advance-filter.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ManageQuickSearchComponent } from './manage-job-filters/manage-quick-search/manage-quick-search.component';
import { ManageFilterSearchResultComponent } from './manage-job-filters/manage-filter-search-result/manage-filter-search-result.component';

@NgModule({
	declarations: [
		ManageJobsComponent,
		PaginationComponent,
		ManageJobFiltersComponent,
		ManageJobcardComponent,
  	ManageAdvanceFilterComponent,
   ManageQuickSearchComponent,
   ManageFilterSearchResultComponent
	],
	imports: [
	 CommonModule,
	 SharedModule,
	 NgxSliderModule,
	 NgCircleProgressModule.forRoot({
		radius: 100,
		outerStrokeWidth: 16,
		innerStrokeWidth: 8,
		outerStrokeColor: "#78C000",
		innerStrokeColor: "#C7E596",
		animationDuration: 300
	  })
	],
	exports: [
    ManageJobsComponent
	]
})

export class ManageJobModule{
}