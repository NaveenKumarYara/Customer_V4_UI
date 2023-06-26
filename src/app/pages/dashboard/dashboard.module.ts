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
import { DashboardChartTableComponent } from './dashboard-chart-table/dashboard-chart-table.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
	declarations: [
	DashboardComponent,
	DashboardKpisComponent,
	DashboardStatsComponent,
	DashboardTotalJobsComponent,
 	DashboardTopPerformingJobsComponent,
 	DashboardChartTableComponent,
	],
	imports: [
	 CommonModule,
	 SharedModule,
	 BrowserAnimationsModule,
	 CarouselModule,
	 NgChartsModule
	],
	exports: [
	 DashboardComponent
	]
})

export class DashboardModule{
}