import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageJobsComponent } from './manage-jobs.component';
import  { SharedModule } from './../../shared/shared.module'
import  { PaginationComponent } from './../common/pagination/pagination.component';
import { ManageJobFiltersComponent } from './manage-job-filters/manage-job-filters.component';
import { ManageJobcardComponent } from './manage-jobcard/manage-jobcard.component';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
	declarations: [
		ManageJobsComponent,
		PaginationComponent,
		ManageJobFiltersComponent,
		ManageJobcardComponent
	],
	imports: [
	 CommonModule,
	 SharedModule,
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