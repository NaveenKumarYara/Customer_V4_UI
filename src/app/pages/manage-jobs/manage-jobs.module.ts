import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageJobsComponent } from './manage-jobs.component';
import  { SharedModule } from './../../shared/shared.module'
import  { PaginationComponent } from './../common/pagination/pagination.component';
import { ManageJobFiltersComponent } from './manage-job-filters/manage-job-filters.component';
import { ManageJobcardComponent } from './manage-jobcard/manage-jobcard.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ManageAdvanceFilterComponent } from './manage-job-filters/manage-advance-filter/manage-advance-filter.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ManageQuickSearchComponent } from './manage-job-filters/manage-quick-search/manage-quick-search.component';
import { ManageFilterSearchResultComponent } from './manage-job-filters/manage-filter-search-result/manage-filter-search-result.component';
import { ManageJobListComponent } from './manage-job-list/manage-job-list.component';
import { SlidepanelComponent } from './../common/slidepanel/slidepanel.component';
import { ManageJobRoutingModule } from './manage-jobs-routing';
import { SettingsHttpService } from 'src/settings/settings.http.service';
import { SettingsService } from 'src/settings/settings.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { JobActivitiesComponent } from './job-activities/job-activities.component';
import { JobActivitesStatsComponent } from './job-activities/job-activites-stats/job-activites-stats.component';
import { ManageLoadJobsComponent } from './manage-load-jobs/manage-load-jobs.component';
import { JobsActivitiesNavComponent } from './job-activities/jobs-activities-nav/jobs-activities-nav.component';
import { JobCardComponent } from './job-activities/job-card/job-card.component';
import { JobActivitiesSummaryComponent } from './job-activities/job-activities-summary/job-activities-summary.component';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { JobListComponent } from './job-activities/job-list/job-list.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { GenericListFilterModule } from 'generic-list-filter';
import { JobStatusComponent } from './job-status/job-status.component';
import { JobReviewComponent } from './job-review/job-review.component';

@NgModule({
	declarations: [
	ManageJobsComponent,
	PaginationComponent,
	ManageJobFiltersComponent,
	ManageJobcardComponent,
	SlidepanelComponent,
	ManageAdvanceFilterComponent,
	ManageQuickSearchComponent,
	ManageFilterSearchResultComponent,
	JobActivitiesComponent,
	JobActivitesStatsComponent,
	ManageLoadJobsComponent,
	JobsActivitiesNavComponent,
	JobCardComponent,
	JobActivitiesSummaryComponent,
  JobListComponent,
  JobStatusComponent,
  JobReviewComponent
	],
	imports: [
	 CommonModule,
	 SharedModule,
	 NgxSliderModule,
	 GenericListFilterModule,
	 ManageJobListComponent,
	 ManageJobRoutingModule,
	 NgbTooltipModule,
	 Ng2SearchPipeModule,
	 NgbDropdownModule,
	 NgbRatingModule,
	 CarouselModule,
	 NgbCollapseModule,
	 NgCircleProgressModule.forRoot({
		radius: 100,
		outerStrokeWidth: 16,
		innerStrokeWidth: 8,
		outerStrokeColor: "#78C000",
		innerStrokeColor: "#C7E596",
		animationDuration: 300,
		titleFontSize: '16',
		space: -5
		
	  }),
	  NgxPaginationModule
	],
	providers:[SettingsHttpService,SettingsService],
	exports: [
    ManageJobsComponent
	]
})

export class ManageJobModule{
}