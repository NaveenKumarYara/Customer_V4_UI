import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import  { SharedModule } from './../../shared/shared.module';
import { DashboardKpisComponent } from './dashboard-kpis/dashboard-kpis.component';
import { DashboardStatsComponent } from './dashboard-stats/dashboard-stats.component';
import { DashboardTotalJobsComponent } from './dashboard-total-jobs/dashboard-total-jobs.component';

@NgModule({
	declarations: [
	DashboardComponent,
	DashboardKpisComponent,
	DashboardStatsComponent,
	DashboardTotalJobsComponent
	],
	imports: [
	 CommonModule,
	 SharedModule
	],
	exports: [
	 DashboardComponent
	]
})

export class DashboardModule{
}