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
import { ManageJobListComponent } from './manage-job-list/manage-job-list.component';
import { SlidepanelComponent } from './../common/slidepanel/slidepanel.component';
import { ManageJobRoutingModule } from './manage-jobs-routing';
import { SettingsHttpService } from 'src/settings/settings.http.service';
import { SettingsService } from 'src/settings/settings.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
	declarations: [
	ManageJobsComponent,
	PaginationComponent,
	ManageJobFiltersComponent,
	ManageJobcardComponent,
	SlidepanelComponent,
	ManageAdvanceFilterComponent,
	ManageQuickSearchComponent,
	ManageFilterSearchResultComponent

	],
	imports: [
	 CommonModule,
	 SharedModule,
	 NgxSliderModule,
	 ManageJobListComponent,
	 ManageJobRoutingModule,
	 Ng2SearchPipeModule,
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