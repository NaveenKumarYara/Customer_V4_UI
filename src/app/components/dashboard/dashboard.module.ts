import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardviewComponent } from './dashboardview/dashboardview.component';
import { DashboardJobsviewComponent } from './dashboard-jobsview/dashboard-jobsview.component';
import { DashboardApplicantsviewComponent} from './dashboard-applicantsview/dashboard-applicantsview.component';
import { DashboardActivejobsComponent } from './dashboard-activejobs/dashboard-activejobs.component';
import { DashboardScheduledInterviewComponent } from './dashboard-scheduled-interview/dashboard-scheduled-interview.component';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';
import { DashboardRecentjobsComponent } from './dashboard-recentjobs/dashboard-recentjobs.component';
import { DashboardRecentApplicationsComponent } from './dashboard-recent-applications/dashboard-recent-applications.component';
import { DashboardService } from './dashboard.service';

import { ChartsModule } from 'ng2-charts/ng2-charts';

import { ChartsModule } from 'ng2-charts/ng2-charts';


@NgModule({
  imports: [
    ChartsModule,CommonModule
    ],
    providers: [DashboardService],
  declarations: [DashboardviewComponent, DashboardJobsviewComponent, DashboardActivejobsComponent, DashboardScheduledInterviewComponent, DashboardContentComponent, DashboardApplicantsviewComponent ,DashboardRecentjobsComponent, DashboardRecentApplicationsComponent]
})
export class DashboardModule { }
