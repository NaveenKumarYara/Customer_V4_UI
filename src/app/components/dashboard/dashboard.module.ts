import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardviewComponent } from './dashboardview/dashboardview.component';
import { DashboardJobsviewComponent } from './dashboard-jobsview/dashboard-jobsview.component';
import { DashboardActivejobsComponent } from './dashboard-activejobs/dashboard-activejobs.component';
import { DashboardScheduledInterviewComponent } from './dashboard-scheduled-interview/dashboard-scheduled-interview.component';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';
import { DashboardRecentjobsComponent } from './dashboard-recentjobs/dashboard-recentjobs.component';
import {InviteFriendContentComponent} from './invite-friend/invite.component';
import { DashboardRecentApplicationsComponent } from './dashboard-recent-applications/dashboard-recent-applications.component';
import {RecentjobsCountComponent} from './dashboard-recentjobs/recentjobscount/recentjobscount.component';
import { DashboardService } from './dashboard.service';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import {NgxSpinnerModule} from 'ngx-spinner';
import {MatCardModule, MatProgressSpinnerModule} from '@angular/material';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {ProgressBarModule} from 'angular-progress-bar';
import {SharedModule} from '../../shared/shared.module';
import{MonthToYearPipe} from './dashboard-recent-applications/Exp.pipe';
import { RatingModule } from 'ng-starrating';

@NgModule({
  imports: [
    ChartsModule, CommonModule,RatingModule, NgxSpinnerModule, MatCardModule, SharedModule,MatProgressSpinnerModule, ProgressBarModule,   NgCircleProgressModule
    ],
    providers: [DashboardService],
  declarations: [DashboardviewComponent, DashboardJobsviewComponent,InviteFriendContentComponent, DashboardActivejobsComponent, DashboardScheduledInterviewComponent, DashboardContentComponent,DashboardRecentjobsComponent, DashboardRecentApplicationsComponent,RecentjobsCountComponent,MonthToYearPipe]
})
export class DashboardModule { }
