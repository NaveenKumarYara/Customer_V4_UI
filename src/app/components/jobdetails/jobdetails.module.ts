import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewJobdetailsComponent } from './view-jobdetails/view-jobdetails.component';
import { FilterViewJobsComponent } from './view-jobdetails/filter-view-jobs/filter-view-jobs.component';
import { JobdetailsAdvanceSearchComponent } from './view-jobdetails/jobdetails-advance-search/jobdetails-advance-search.component';
import { JobdetailsService } from './jobdetails.service';
import { ViewjobdetailsmodelComponent } from './view-jobdetails/viewjobdetailsmodel/viewjobdetailsmodel.component';
 import { UploadProfilesComponent } from './view-jobdetails/upload-profiles/upload-profiles.component';
 import { DefaultModelsComponent } from './view-jobdetails/default-models/default-models.component';
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
import { FlickityModule } from 'ngx-flickity';
import { ViewCandidateprofileComponent } from './view-jobdetails/viewjobdetails-candidate-profile/view-candidateprofile/view-candidateprofile.component';
import { SendEmailComponent } from './view-jobdetails/viewjobdetails-candidate-profile/send-email/send-email.component';
import { InviteProfiledialogComponent } from './view-jobdetails/filter-view-jobs/invite-profiledialog/invite-profiledialog.component';
import {ProgressBarModule} from 'angular-progress-bar';
import {ShareJobComponent} from './view-jobdetails/share-job/sharejob.component';
import {UniqueMonthYearPipe} from './view-jobdetails/months.pipe';
import {ViewCandidateprofileDetailComponent} from './view-jobdetails/viewjobdetails-candidate-profile/view-candidateprofile-detail/view-candidateprofile-detail.component'
import {ConverttoMonthPipe} from './convertmonths.pipe';
import {RemovePipe} from './view-jobdetails/viewjobdetails-candidate-profile/RemovePipe.pipe';
import { TagCloudModule } from 'angular-tag-cloud-module';
import { RatingModule } from 'ng-starrating';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxMaskModule } from 'ngx-mask';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { MatDialogModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatPaginatorModule,
  MatSortModule,
  MatRadioModule,
  MatSnackBarModule,
  MatSelectModule,
  MatInputModule,
  MatAutocompleteModule,
  MatChipsModule,
  MatIconModule,
  MatError} from '@angular/material';
  import { QRCodeModule } from 'angularx-qrcode';
import {backgrounddialogComponent} from './view-jobdetails/viewjobdetails-candidate-profile/BackgroundVerification/bg.component';
import { HiredialogComponent } from './view-jobdetails/viewjobdetails-candidate-profile/Hiringdialog/hire.component';
import { AchivementdialogComponent } from './view-jobdetails/viewjobdetails-candidate-profile/Achivements/achivement.component';
import { ReferencedialogComponent } from './view-jobdetails/viewjobdetails-candidate-profile/ManageReferences/manageref.component';
import {RequestdialogComponent} from './view-jobdetails/viewjobdetails-candidate-profile/ManageReferences/RequestInfo/requestInfo.component';
import { SortByPipe } from './view-jobdetails/viewjobdetails-candidate-profile/ManageReferences/sortby.pipe';
import { screeningdialogComponent } from './view-jobdetails/viewjobdetails-candidate-profile/screening/screening.component';
import { shortlisteddialogComponent } from './view-jobdetails/viewjobdetails-candidate-profile/ShortListed/shortlisted.component';
import { WithDrawndialogComponent } from './view-jobdetails/viewjobdetails-candidate-profile/Withdrawn/withdrawn.component';
import { sendnotificationdialogComponent } from './view-jobdetails/viewjobdetails-candidate-profile/SendNotification/sendnotification.component';
import { RouterModule } from '@angular/router';
import { SafeHtmlPipe } from './view-jobdetails/viewjobdetails-candidate-profile/view-candidateprofile-detail/SafeHtmlPipe.pipe';
import { TooltipModule } from 'ng2-tooltip-directive';
import { InternationalPhoneModule } from 'ng4-intl-phone';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { setTheme } from 'ngx-bootstrap/utils';
import { SendnotificationdialogNcomponentComponent } from './view-jobdetails/viewjobdetails-candidate-profile/JobNotes/sendnotificationdialog-ncomponent/sendnotificationdialog-ncomponent.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TagInputModule } from 'ngx-chips';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { EditprofileComponent } from './view-jobdetails/edit-profiles/editprofile/editprofile.component';
import { AshareJobComponentComponent } from './view-jobdetails/Assign-Job/ashare-job-component/ashare-job-component.component';
import { EditprofileCmComponent } from './view-jobdetails/editprofile-cm/editprofile-cm.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ConfirmationDialog } from './view-jobdetails/viewjobdetails-candidate-profile/view-candidateprofile/ConfirmationDialog.component';
setTheme('bs3');
@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    InfiniteScrollModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    NgbTooltipModule,
    BrowserModule,
    // routing,
    RouterModule,
    TagInputModule,
    MatChipsModule,
    MatIconModule,
 MatSelectModule,
    HttpModule,
    FormsModule,
    NgxMaskModule,
    RatingModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    NgSelectModule,
    SharedModule,
    HttpClientModule,
    NgxSpinnerModule,
    QRCodeModule,
    TagCloudModule,
    ChartsModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSortModule,
    InternationalPhoneModule,
    MatSnackBarModule,FileUploadModule,
    MatCardModule, MatProgressSpinnerModule, NgbModule.forRoot(),
    FlickityModule, ProgressBarModule,
    NgCircleProgressModule.forRoot({}),
    TooltipModule,
    NgxSliderModule,
    CKEditorModule,
    NgMultiSelectDropDownModule,
    // ,
    // ModalDialogModule.forRoot()
  ],
  providers: [JobdetailsService],
  declarations: [ViewJobdetailsComponent,SafeHtmlPipe,RequestdialogComponent,SortByPipe,UniqueMonthYearPipe,ViewCandidateprofileDetailComponent,ConverttoMonthPipe, RemovePipe,  FilterViewJobsComponent, JobdetailsAdvanceSearchComponent,ShareJobComponent,
                  HiredialogComponent,ProfileLinkComponent, ViewjobdetailsmodelComponent, UploadProfilesComponent, DefaultModelsComponent, ViewjobdetailsScComponent,WithDrawndialogComponent,
                  ViewjobdetailsCandidateProfileComponent,ConfirmationDialog, ChatboxdialogComponent,sendnotificationdialogComponent,SharedialogComponent, RejectdialogComponent,shortlisteddialogComponent,AchivementdialogComponent,backgrounddialogComponent,screeningdialogComponent,
                  UploadProfilesComponent,ScheduleInterviewComponent,EditprofileCmComponent,EditprofileComponent,ConversationComponent,  ViewCandidateprofileComponent, SendEmailComponent, InviteProfiledialogComponent,ReferencedialogComponent, SendnotificationdialogNcomponentComponent, EditprofileComponent, AshareJobComponentComponent],
  entryComponents: [
    ScheduleInterviewComponent,SendnotificationdialogNcomponentComponent, DefaultModelsComponent,AshareJobComponentComponent,ConfirmationDialog]
})
export class JobdetailsModule { }
