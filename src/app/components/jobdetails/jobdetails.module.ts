import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewJobdetailsComponent } from './view-jobdetails/view-jobdetails.component';
import { FilterViewJobsComponent } from './view-jobdetails/filter-view-jobs/filter-view-jobs.component';
import { JobdetailsAdvanceSearchComponent } from './view-jobdetails/jobdetails-advance-search/jobdetails-advance-search.component';
import { JobdetailsService } from './jobdetails.service';
import { ViewjobdetailsmodelComponent } from './view-jobdetails/viewjobdetailsmodel/viewjobdetailsmodel.component';
 import { UploadProfilesComponent } from './view-jobdetails/upload-profiles/upload-profiles.component';
import { MatDialogModule } from '@angular/material';
//import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewjobdetailsScComponent } from './view-jobdetails/viewjobdetails-sc/viewjobdetails-sc.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './../../app.router';
import { NgSelectModule } from '@ng-select/ng-select';
import { ViewjobdetailsCandidateProfileComponent } from './view-jobdetails/viewjobdetails-candidate-profile/viewjobdetails-candidate-profile.component';
import { ChatboxdialogComponent } from './view-jobdetails/viewjobdetails-candidate-profile/chatboxdialog/chatboxdialog.component';
import { SharedialogComponent } from './view-jobdetails/viewjobdetails-candidate-profile/sharedialog/sharedialog.component';
import { RejectdialogComponent } from './view-jobdetails/viewjobdetails-candidate-profile/rejectdialog/rejectdialog.component';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    BrowserModule,
    routing,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    HttpClientModule,
    NgxSpinnerModule
    //,
    //ModalDialogModule.forRoot()
  ],
  providers: [JobdetailsService],
  declarations: [ViewJobdetailsComponent, FilterViewJobsComponent, JobdetailsAdvanceSearchComponent, ViewjobdetailsmodelComponent,UploadProfilesComponent, ViewjobdetailsScComponent, ViewjobdetailsCandidateProfileComponent, ChatboxdialogComponent, SharedialogComponent, RejectdialogComponent, UploadProfilesComponent]
})
export class JobdetailsModule { }
