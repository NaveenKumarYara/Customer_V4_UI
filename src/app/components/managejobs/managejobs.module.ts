import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageJobsComponent } from './manage-jobs/manage-jobs.component';
import { ViewjobsComponent } from './manage-jobs/viewjobs/viewjobs.component';
import { FilterjobsComponent } from './manage-jobs/filterjobs/filterjobs.component';
import { JoblistGridlayoutComponent } from './manage-jobs/joblist-gridlayout/joblist-gridlayout.component';
import { JoblistTablelayoutComponent } from './manage-jobs/joblist-tablelayout/joblist-tablelayout.component';
import { SearchjobsComponent } from './manage-jobs/searchjobs/searchjobs.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './../../app.router';
import { NgSelectModule } from '@ng-select/ng-select';
import { AdvanceSearchComponent } from './manage-jobs/advance-search/advance-search.component';
import { ManageJobService } from './managejobs.service';
import { LoadJoblistComponent } from './manage-jobs/load-joblist/load-joblist.component';
import {MatCardModule, MatProgressSpinnerModule} from '@angular/material';
import {NgxSpinnerModule} from 'ngx-spinner';
import {InterviewListComponent} from './manage-jobs/GetInterviewJobsList/interviewList.component';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from '../../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    routing,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    SharedModule,
    HttpClientModule,
    ToastModule.forRoot(), BrowserAnimationsModule,
    MatCardModule, MatProgressSpinnerModule, NgxSpinnerModule
  ],
  providers: [ManageJobService],
  declarations: [ManageJobsComponent,InterviewListComponent, ViewjobsComponent, FilterjobsComponent, JoblistGridlayoutComponent, JoblistTablelayoutComponent, SearchjobsComponent, AdvanceSearchComponent, LoadJoblistComponent],
  exports: [ManageJobsComponent,InterviewListComponent, ViewjobsComponent, FilterjobsComponent, JoblistGridlayoutComponent, JoblistTablelayoutComponent, SearchjobsComponent]
})
export class ManagejobsModule {


}
