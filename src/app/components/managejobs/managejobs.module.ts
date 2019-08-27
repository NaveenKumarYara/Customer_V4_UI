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
import { MatDialogModule, MatCardModule, MatProgressSpinnerModule} from '@angular/material';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ValueArrayPipe} from './manage-jobs/ValueArrayPipe.pipe';
import {InterviewListComponent} from './manage-jobs/GetInterviewJobsList/interviewList.component';
import {UpdateInterviewComponent} from './manage-jobs/GetInterviewJobsList/UpdateScheduleInterview/updateInterview.component';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from '../../shared/shared.module';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    routing,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatDialogModule,
    SharedModule,
    HttpClientModule,
    ToastModule.forRoot(), BrowserAnimationsModule,
    MatCardModule, MatProgressSpinnerModule, NgxSpinnerModule, NgbModule.forRoot()
  ],
  providers: [ManageJobService],
  declarations: [ManageJobsComponent,ValueArrayPipe,UpdateInterviewComponent,InterviewListComponent, ViewjobsComponent, FilterjobsComponent, JoblistGridlayoutComponent, JoblistTablelayoutComponent, SearchjobsComponent, AdvanceSearchComponent, LoadJoblistComponent],
  exports: [ManageJobsComponent,ValueArrayPipe,UpdateInterviewComponent,InterviewListComponent, ViewjobsComponent, FilterjobsComponent, JoblistGridlayoutComponent, JoblistTablelayoutComponent, SearchjobsComponent],
  entryComponents: [
    UpdateInterviewComponent]
})
export class ManagejobsModule {


}
