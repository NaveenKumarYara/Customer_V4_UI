import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { FileUploadModule } from 'ng2-file-upload';
import {
  MatDialogModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatSelectModule,
  MatInputModule,
  MatAutocompleteModule,
} from "@angular/material";
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastModule } from "ng2-toastr/ng2-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModal, NgbModule, NgbPopoverModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
import { RouterModule } from "@angular/router";
import { ManagejobsRoutingModule } from "./managejobs-routing.module";
import { SharedModule } from "../../../shared/shared.module";
import { ManageJobService } from "../managejobs.service";
import { ManageJobsComponent } from "./manage-jobs.component";
import { ValueArrayPipe } from "./ValueArrayPipe.pipe";
import { UpdateInterviewComponent } from "./GetInterviewJobsList/UpdateScheduleInterview/updateInterview.component";
import { InterviewListComponent } from "./GetInterviewJobsList/interviewList.component";
import { ViewjobsComponent } from "./viewjobs/viewjobs.component";
import { FilterjobsComponent } from "./filterjobs/filterjobs.component";
import { JoblistGridlayoutComponent } from "./joblist-gridlayout/joblist-gridlayout.component";
import { JoblistTablelayoutComponent } from "./joblist-tablelayout/joblist-tablelayout.component";
import { SearchjobsComponent } from "./searchjobs/searchjobs.component";
import { AdvanceSearchComponent } from "./advance-search/advance-search.component";
import { LoadJoblistComponent } from "./load-joblist/load-joblist.component";
import { TooltipModule } from 'ng2-tooltip-directive';

import { DxSchedulerModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    // BrowserModule,
    // routing,
    // HttpModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatDialogModule,
    DxSchedulerModule,
    SharedModule,
    // HttpClientModule,
    RouterModule,
    ToastModule.forRoot(),
    // BrowserAnimationsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    NgxSpinnerModule,
    NgbModule.forRoot(),
    MatExpansionModule,
    MatSelectModule,
    TooltipModule,
    NgbPopoverModule,
    MatAutocompleteModule,
    NgxMatSelectSearchModule,
    MatInputModule,
    
    AngularMultiSelectModule,
    ManagejobsRoutingModule,
    FileUploadModule 
  ],
  providers: [ManageJobService],
  declarations: [
    ManageJobsComponent,
    ValueArrayPipe,
    UpdateInterviewComponent,
    InterviewListComponent,
    ViewjobsComponent,
    FilterjobsComponent,
    JoblistGridlayoutComponent,
    JoblistTablelayoutComponent,
    SearchjobsComponent,
    AdvanceSearchComponent,
    LoadJoblistComponent,
  ],
  exports: [
    LoadJoblistComponent,
    ManageJobsComponent,
    ValueArrayPipe,
    UpdateInterviewComponent,
    InterviewListComponent,
    ViewjobsComponent,
    FilterjobsComponent,
    JoblistGridlayoutComponent,
    JoblistTablelayoutComponent,
    SearchjobsComponent,
    AdvanceSearchComponent
  ],
  entryComponents: [UpdateInterviewComponent],
})
export class ManagejobsModule {}
