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

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    routing,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    HttpClientModule
  ],
  providers: [ManageJobService],
  declarations: [ManageJobsComponent, ViewjobsComponent, FilterjobsComponent, JoblistGridlayoutComponent, JoblistTablelayoutComponent, SearchjobsComponent, AdvanceSearchComponent, LoadJoblistComponent],
  exports: [ManageJobsComponent, ViewjobsComponent, FilterjobsComponent, JoblistGridlayoutComponent, JoblistTablelayoutComponent, SearchjobsComponent]
})
export class ManagejobsModule {


}
