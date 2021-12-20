import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppService } from './app.service';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/signup/signup.component';
import { GuestComponent } from './components/GuestSignUp/guest.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { FeaturesComponent } from './components/features/features.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { ForgotComponent } from './components/ForgotPassword/forgotpassword.component';
import { ResetComponent } from './components/ResetPassword/resetpassword.component';
import { FooterComponent } from './components/footer/footer.component';
import { PostajobComponent } from './components/Postajob/postajob.component';
import { StepsComponent } from './components/Postajob/Createajob/steps.component';
import { CreateajobComponent } from './components/Postajob/Createajob/createajob.component';
import { NoofopeningsComponent } from './components/Postajob/Createajob/Step1/noofopenings.component';
import { SearchresultsComponent } from './components/Postajob/Createajob/searchresults.component';
import { Step1Component } from './components/Postajob/Createajob/Step1/step1.component';
import { Step2Component } from './components/Postajob/Createajob//Step2/step2.component';
import { Step3Component } from './components/Postajob/Createajob/Step3/step3.component';
import { Step4Component } from './components/Postajob/Createajob/Step4/step4.component';
import { JobdetailsComponent } from './components/Postajob/Createajob/Step1/Jobdetails.component';
import { JobcategoryComponent } from './components/Postajob/Createajob/Step1/Jobcategory.component';
import { JobprofileComponent } from './components/Postajob/Createajob/Step1/Jobprofile.component';
import { JobskillsetComponent } from './components/Postajob/Createajob/Step2/Jobskillset.component';
import { JobResponsibilitiesComponent } from './components/Postajob/Createajob/Step2/Jobresponsibilities.component';
import { routing } from './app.router';
import { NgSelectModule } from '@ng-select/ng-select';
import { MyFilterPipe } from './filter/MyFilterPipe';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LocationwiseJobsComponent } from './components/Postajob/Createajob/Step1/locationwisejobs.component';
import { QualificationsComponent } from './components/Postajob/Createajob/Step2/qualifications.component';
import { DomainExpertiseComponent } from './components/Postajob/Createajob/Step2/domainexpertise.component';
import { PersonalityTypeComponent } from './components/Postajob/Createajob/Step2/PersonalityType.component';
import { EmploymentTypeComponent } from './components/Postajob/Createajob/Step3/employmenttype.component';
import { ContractDurationComponent } from './components/Postajob/Createajob/Step3/contractduration.component';
import { ContractExtensionComponent } from './components/Postajob/Createajob/Step3/contractextension.component';
import { InterviewTypeComponent } from './components/Postajob/Createajob/Step3/interviewtype.component';
import { ReportingManagerComponent } from './components/Postajob/Createajob/Step3/reportingmanager.component';
import { TeammembersComponent } from './components/Postajob/Createajob/Step3/teammembers.component';
import { Step1SummaryComponent } from './components/Postajob/Createajob/Step4/step1summary.component';
import { Step2SummaryComponent } from './components/Postajob/Createajob/Step4/step2summary.component';
import { Step3SummaryComponent } from './components/Postajob/Createajob/Step4/step3summary.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { JobdetailsModule } from './components/jobdetails/jobdetails.module';
import { JobTemplateComponent } from './components/Postajob/Createajob/GetJobsTemplate/getTemplate.component';
import { CompanyProfileModule } from './components/company-profile/company-profile.module';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { dLoginComponent } from '../app/components/Login/dlogin.component';
import { AccountsettingsModule } from './components/accountsettings/accountsettings.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ApiService } from './shared/services/api.service/api.service';
import { AuthService } from './shared/guard/auth.service';
// import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { SharedModule } from './shared/shared.module';
import { FlickityModule } from 'ngx-flickity';
import { Ng5SliderModule } from 'ng5-slider';
import { NgxMaskModule } from 'ngx-mask';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditDraftComponent } from './components/Postajob/Createajob/EditDraft/draft.component';
import { UploadvideoprofileComponent } from './components/Postajob/Createajob/Step3/uploadvideoprofile.component';
import { SalarysliderComponent } from './components/Postajob/Createajob/Step3/salaryslider.component';
import { DepartmentsComponent } from './components/Postajob/Createajob/Step1/departments.component';
import { ClientsComponent } from './components/Postajob/Createajob/Step1/clients.component';
import { ResponsibilitiesDialogComponent } from './components/Postajob/Createajob/Step2/responsibilities-dialog/responsibilities-dialog.component';
// import { SalarysliderComponent } from './components/Postajob/Createajob/Step3/salaryslider.component';
import { ProgressBarModule } from 'angular-progress-bar';
import { GetCandidateprofileComponent } from './components/GetProfileDetails/GetProfile.component';
import { TagCloudModule } from 'angular-tag-cloud-module';
import { SettingsHttpService } from '../settings/settings.http.service';
import { SettingsService } from '../settings/settings.service';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { ChargebeeJsAngularWrapperModule } from '@chargebee/chargebee-js-angular-wrapper';
import { ConvertMonthPipe } from './components/Postajob/Createajob/convertskillsmonth.pipe';
import { DragulaModule } from 'ng2-dragula';
import { RatingModule } from 'ng-starrating';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { QRCodeModule } from 'angularx-qrcode';
import { recriuterComponent } from './components/Postajob/Createajob/Step3/recriuter.component';
import { StepContractDurationComponent } from './components/Postajob/Createajob/Step1/contractduration.component';
import { StepContractExtensionComponent } from './components/Postajob/Createajob/Step1/contractextension.component';
import { StepEmploymentTypeComponent } from './components/Postajob/Createajob/Step1/employment.component';
import { StepSalarysliderComponent } from './components/Postajob/Createajob/Step1/salaryslider.component';
import { ImmigrationManagerComponent } from './components/Postajob/Createajob/Step1/immigration.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxImgModule } from 'ngx-img';
import { Ng2ImgMaxModule } from 'ng2-img-max';
// import { CmModule } from './components/candidatemanager/cm.module';
import { FileUploadModule } from 'ng2-file-upload';
import { RecaptchaModule } from 'angular5-google-recaptcha';
// import { ManagejobsModule } from './components/managejobs/manage-jobs/managejobs.module';
import { PostajobModule } from './components/Postajob/postajob.module';
import { AdvanceSearchComponent } from './components/managejobs/manage-jobs/advance-search/advance-search.component';
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
import { MatAutocompleteModule, MatCardModule, MatDialogModule, MatExpansionModule, MatInputModule, MatSelectModule } from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgDatepickerModule } from 'ng2-datepicker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TooltipModule } from 'ng2-tooltip-directive';
import { CandidatedetailviewComponent } from './components/CandidateProfile-details/candidatedetailview/candidatedetailview.component';
import { SafeHtmlNewPipe } from './components/CandidateProfile-details/safenewhtml.pipe';
export function app_Init(settingsHttpService: SettingsHttpService) {
    return () => settingsHttpService.initializeApp();
}
@NgModule({
  declarations: [
    AppComponent,
    MyFilterPipe,
    // ConvertMonthPipe,
    LayoutComponent,
    AboutComponent,
    SignUpComponent,
    GuestComponent,
    FeaturesComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PostajobComponent,
    // StepsComponent,
    // Step1Component,
    // Step2Component,
    // Step3Component,
    // Step4Component,
    ForgotComponent,
    ResetComponent,
    JobTemplateComponent,
    dLoginComponent,
    EditDraftComponent,
    DashboardComponent,
    // JobdetailsComponent,
    // JobcategoryComponent,
    // JobprofileComponent,
    // JobskillsetComponent,
    // CreateajobComponent,
    // JobResponsibilitiesComponent,
    // LocationwiseJobsComponent,
    // QualificationsComponent,
    // DomainExpertiseComponent,
    // PersonalityTypeComponent,
    // EmploymentTypeComponent,
    // ContractDurationComponent,
    // ContractExtensionComponent,
    // InterviewTypeComponent,
    // ReportingManagerComponent,
    // recriuterComponent,
    // TeammembersComponent,
    // Step1SummaryComponent,
    // Step2SummaryComponent,
    // SearchresultsComponent,
    // Step3SummaryComponent,
    NotificationsComponent,
    // NoofopeningsComponent,
    // UploadvideoprofileComponent,
    SalarysliderComponent,
    // DepartmentsComponent,
    // ClientsComponent,
    ResponsibilitiesDialogComponent,
    GetCandidateprofileComponent,
    CandidatedetailviewComponent,
    SafeHtmlNewPipe,
    //AdvanceSearchComponent,
    // StepContractDurationComponent,
    // StepContractExtensionComponent,
    // StepEmploymentTypeComponent,
    // StepSalarysliderComponent,
    // ImmigrationManagerComponent
    // SalarysliderComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    QRCodeModule,
    ReactiveFormsModule,
    ImageCropperModule,
    NgSelectModule,
    HttpClientModule,
    AngularMultiSelectModule,
    RecaptchaModule.forRoot({
      siteKey: '6Ld6CWobAAAAAGUdYvl8v1vRb0g6PGzCuaVp8jWB',
  }),
    MatExpansionModule,
    MatCardModule,
    TooltipModule,
    MatDialogModule,
    MatSelectModule,
    MatAutocompleteModule,
    NgMultiSelectDropDownModule,
    NgxMatSelectSearchModule,
    NgDatepickerModule,
    MatInputModule,
    // ManagejobsModule,
    FileUploadModule,
    // CmModule,
    RatingModule,
    JobdetailsModule,
    DragulaModule.forRoot(),
    AngularDateTimePickerModule,
    Ng2ImgMaxModule,
    SharedModule,
    CompanyProfileModule,
    DashboardModule,
    TagCloudModule,
    PostajobModule,
    ChargebeeJsAngularWrapperModule,
    NgIdleKeepaliveModule.forRoot(),
    ToastModule.forRoot(),
    BrowserAnimationsModule,
    AccountsettingsModule,
    NgxSpinnerModule,
    ChartsModule,
    NgbModule.forRoot(),
    NgxMaskModule.forRoot(),
    FlickityModule,
    Ng5SliderModule,
    ProgressBarModule,
    NgCircleProgressModule.forRoot({}),
    CKEditorModule,
    NgxImgModule.forRoot(),
    routing,
  ],
  providers: [
    SettingsHttpService,
    SettingsService,
    HttpClient,
    { provide: APP_INITIALIZER, useFactory: app_Init, deps: [SettingsHttpService], multi: true },
    AppService,
    ApiService,
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
