import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardviewComponent } from './dashboardview/dashboardview.component';
import { DashboardJobsviewComponent } from './dashboard-jobsview/dashboard-jobsview.component';
import { DashboardActivejobsComponent } from './dashboard-activejobs/dashboard-activejobs.component';
import { DashboardScheduledInterviewComponent } from './dashboard-scheduled-interview/dashboard-scheduled-interview.component';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';
import { DashboardRecentjobsComponent } from './dashboard-recentjobs/dashboard-recentjobs.component';
import { DashboardRecentApplicationsComponent } from './dashboard-recent-applications/dashboard-recent-applications.component';
import { DashboardService } from './dashboard.service';


@NgModule({
  imports: [
    CommonModule
    ],
    providers: [DashboardService],
  declarations: [DashboardviewComponent, DashboardJobsviewComponent, DashboardActivejobsComponent, DashboardScheduledInterviewComponent, DashboardContentComponent, DashboardRecentjobsComponent, DashboardRecentApplicationsComponent]
})
export class DashboardModule { }
