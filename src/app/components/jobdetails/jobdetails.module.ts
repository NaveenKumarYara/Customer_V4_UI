import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewJobdetailsComponent } from './view-jobdetails/view-jobdetails.component';
import { FilterViewJobsComponent } from './view-jobdetails/filter-view-jobs/filter-view-jobs.component';
import { JobdetailsAdvanceSearchComponent } from './view-jobdetails/jobdetails-advance-search/jobdetails-advance-search.component';
import { JobdetailsService } from './jobdetails.service';
import { ViewjobdetailsmodelComponent } from './view-jobdetails/viewjobdetailsmodel/viewjobdetailsmodel.component';
 import { UploadProfilesComponent } from './view-jobdetails/upload-profiles/upload-profiles.component';
import { MatDialogModule, MatCardModule, MatProgressSpinnerModule} from '@angular/material';
// import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewjobdetailsScComponent } from './view-jobdetails/viewjobdetails-sc/viewjobdetails-sc.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './../../app.router';
import {ProfileLinkComponent} from '../jobdetails/view-jobdetails/viewjobdetails-candidate-profile/profilelinks/profilelinks.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ViewjobdetailsCandidateProfileComponent } from './view-jobdetails/viewjobdetails-candidate-profile/viewjobdetails-candidate-profile.component';
import { ChatboxdialogComponent } from './view-jobdetails/viewjobdetails-candidate-profile/chatboxdialog/chatboxdialog.component';
import { SharedialogComponent } from './view-jobdetails/viewjobdetails-candidate-profile/sharedialog/sharedialog.component';
import { RejectdialogComponent } from './view-jobdetails/viewjobdetails-candidate-profile/rejectdialog/rejectdialog.component';
import { ConversationComponent} from './view-jobdetails/viewjobdetails-candidate-profile/conversations/conversation.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import {SharedModule} from '../../shared/shared.module';
import { ScheduleInterviewComponent } from './view-jobdetails/viewjobdetails-candidate-profile/schedule-interview/schedule-interview.component';
// import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlickityModule } from 'ngx-flickity';
import { ViewCandidateprofileComponent } from './view-jobdetails/viewjobdetails-candidate-profile/view-candidateprofile/view-candidateprofile.component';
import { SendEmailComponent } from './view-jobdetails/viewjobdetails-candidate-profile/send-email/send-email.component';
import { InviteProfiledialogComponent } from './view-jobdetails/filter-view-jobs/invite-profiledialog/invite-profiledialog.component';
import {ProgressBarModule} from 'angular-progress-bar';
import {ShareJobComponent} from './view-jobdetails/share-job/sharejob.component';
import {UniqueMonthYearPipe} from './view-jobdetails/months.pipe';
@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    BrowserModule,
    routing,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    SharedModule,
    HttpClientModule,
    NgxSpinnerModule,
    MatCardModule, MatProgressSpinnerModule, NgbModule.forRoot(),
    FlickityModule, ProgressBarModule
    // ,
    // ModalDialogModule.forRoot()
  ],
  providers: [JobdetailsService],
  declarations: [ViewJobdetailsComponent,UniqueMonthYearPipe, FilterViewJobsComponent, JobdetailsAdvanceSearchComponent,ShareJobComponent,
                  ProfileLinkComponent, ViewjobdetailsmodelComponent, UploadProfilesComponent, ViewjobdetailsScComponent,
                  ViewjobdetailsCandidateProfileComponent, ChatboxdialogComponent, SharedialogComponent, RejectdialogComponent,
                  UploadProfilesComponent, ScheduleInterviewComponent, ConversationComponent,  ViewCandidateprofileComponent, SendEmailComponent, InviteProfiledialogComponent],
  entryComponents: [
    ScheduleInterviewComponent]
})
export class JobdetailsModule { }
