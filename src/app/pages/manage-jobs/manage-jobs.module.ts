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
import  { SidepanelCardsComponent } from './../common/sidepanel-cards/sidepanel-cards.component';
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
import { NgbCollapseModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { GenericListFilterModule } from 'generic-list-filter';
import { NgSelectModule } from '@ng-select/ng-select';
import { JobStatusComponent } from './job-status/job-status.component';
import { JobReviewComponent } from './job-review/job-review.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { JobNotesComponent } from './job-notes/job-notes.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { ScheduleInterviewComponent } from './schedule-interview/schedule-interview.component';
import { JobDocumentsComponent } from './job-documents/job-documents.component';
import { ScheduleInterviewExternalComponent } from './schedule-interview-external/schedule-interview-external.component';
import { JobCommunicationComponent } from './job-communication/job-communication.component';
import { NgChartsModule } from 'ng2-charts';
import { CandidateDocumentComponent } from './candidate-document/candidate-document.component';
import { JobShareComponent } from './job-share/job-share.component';
import { ViewEditJobsComponent } from './view-edit-jobs/view-edit-jobs.component';
import { FilterSearchResultComponent } from './job-activities/job-activities-filters/job-activities-filter-search-result/job-activities-filter-search-result.component';
import { QuickSearchComponent } from './job-activities/job-activities-filters/job-activities-quick-search/job-activities-quick-search.component';
import { JobFiltersComponent } from './job-activities/job-activities-filters/job-activities-filters.component';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { JobShareProfileComponent } from './job-share-profile/job-share-profile.component';
import { FormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import  { JobStatusChangeComponent } from './job-status-change/job-status-change.component';
import { UploadResumeComponent } from './upload-resume/upload-resume.component';
import { JobProfileMatchComponent } from './job-profile-match/job-profile-match.component';
import { AdvanceFilterComponent } from './job-activities/job-activities-filters/job-activities-advance-filter/job-activities-advance-filter.component';
import { UploadFormComponent } from './upload-resume/upload-form/upload-form.component';
import { UploadArtyticScanComponent } from './upload-resume/upload-artytic-scan/upload-artytic-scan.component';
import { UploadPreviewComponent } from './upload-resume/upload-preview/upload-preview.component';
import { SpyDirective, SpyTargetDirective, SpyTargetContainerDirective } from '@thejlifex/ngx-scroll-spy';

@NgModule({
	declarations: [
	ManageJobsComponent,
	PaginationComponent,
	ManageJobFiltersComponent,
	ManageJobcardComponent,
	SlidepanelComponent,
	ManageAdvanceFilterComponent,
	ManageQuickSearchComponent,
	FilterSearchResultComponent,
	QuickSearchComponent,
	JobFiltersComponent,
	ManageFilterSearchResultComponent,
	JobActivitiesComponent,
	JobActivitesStatsComponent,
	ManageLoadJobsComponent,
	JobsActivitiesNavComponent,
	JobCardComponent,
	JobActivitiesSummaryComponent,
	JobListComponent,
	JobStatusComponent,
	JobReviewComponent,
	SidepanelCardsComponent,
	JobNotesComponent,
	ScheduleInterviewComponent,
	JobDocumentsComponent,
	JobCommunicationComponent,
	ScheduleInterviewExternalComponent,
	CandidateDocumentComponent,
	JobShareComponent,
	ViewEditJobsComponent,
  JobShareProfileComponent,
  JobStatusChangeComponent,
  UploadResumeComponent,
  JobProfileMatchComponent,
	AdvanceFilterComponent,
 UploadFormComponent,
 UploadArtyticScanComponent,
 UploadPreviewComponent
	],
	imports: [
	 CommonModule,
	 SharedModule,
	 NgxSliderModule,
	 NgSelectModule,
	 GenericListFilterModule,
	 ManageJobListComponent,
	 ManageJobRoutingModule,
	 NgbTooltipModule,
	 Ng2SearchPipeModule,
	 NgbDropdownModule,
	 NgbRatingModule,
	 CarouselModule,
	 NgbCollapseModule,
	 CKEditorModule,
	 NgChartsModule,
	 NgMultiSelectDropDownModule.forRoot(),
	 FormsModule,
	 NgxUploaderModule,
	 NgbDatepickerModule,
	 SpyDirective,
	 SpyTargetDirective,
	 SpyTargetContainerDirective,
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
	  NgxPaginationModule,
		NgbAccordionModule,
	],
	providers:[SettingsHttpService,SettingsService],
	exports: [
    ManageJobsComponent
	]
})

export class ManageJobModule{
}