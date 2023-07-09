import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import  { SharedModule } from './../../shared/shared.module';
import { DashboardKpisComponent } from './dashboard-kpis/dashboard-kpis.component';
import { DashboardStatsComponent } from './dashboard-stats/dashboard-stats.component';
import { DashboardTotalJobsComponent } from './dashboard-total-jobs/dashboard-total-jobs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { DashboardTopPerformingJobsComponent } from './dashboard-top-performing-jobs/dashboard-top-performing-jobs.component';
import { NgChartsModule } from 'ng2-charts';
import { DashboardJobCardComponent } from './dashboard-job-card/dashboard-job-card.component';
import { DashboardCandidateCardComponent } from './dashboard-candidate-card/dashboard-candidate-card.component';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { DashboardApplicantsComponent } from './dashboard-applicants/dashboard-applicants.component';
import { DashboardUsersComponent } from './dashboard-users/dashboard-users.component';
import { DashboardClientsComponent } from './dashboard-clients/dashboard-clients.component';
import { DashboardVendorsComponent } from './dashboard-vendors/dashboard-vendors.component';
import { DashboardJobSharesComponent } from './dashboard-job-shares/dashboard-job-shares.component';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
	declarations: [
	DashboardComponent,
	DashboardKpisComponent,
	DashboardStatsComponent,
	DashboardTotalJobsComponent,
 	DashboardTopPerformingJobsComponent,
  DashboardJobCardComponent,
  DashboardCandidateCardComponent,
  DashboardApplicantsComponent,
  DashboardUsersComponent,
  DashboardClientsComponent,
  DashboardVendorsComponent,
  DashboardJobSharesComponent,
	],
	imports: [
	 CommonModule,
	 SharedModule,
	 BrowserAnimationsModule,
	 CarouselModule,
	 NgChartsModule,
	 MalihuScrollbarModule.forRoot(),
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
	],
	exports: [
	 DashboardComponent
	]
})

export class DashboardModule{
}