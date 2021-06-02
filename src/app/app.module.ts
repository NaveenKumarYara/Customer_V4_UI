import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppService } from './app.service';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { routing } from './app.router';
import { NgSelectModule } from '@ng-select/ng-select';
import { MyFilterPipe } from './filter/MyFilterPipe';
import { DashboardComponent } from './components/dashboard/dashboard.component';
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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { SharedModule } from './shared/shared.module';
import { FlickityModule } from 'ngx-flickity';
import { Ng5SliderModule } from 'ng5-slider';
import { NgxMaskModule } from 'ngx-mask';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditDraftComponent } from './components/Postajob/Createajob/EditDraft/draft.component';
import { SalarysliderComponent } from './components/Postajob/Createajob/Step3/salaryslider.component';
import { ResponsibilitiesDialogComponent } from './components/Postajob/Createajob/Step2/responsibilities-dialog/responsibilities-dialog.component';
import { ProgressBarModule } from 'angular-progress-bar';
import { GetCandidateprofileComponent } from './components/GetProfileDetails/GetProfile.component';
import { TagCloudModule } from 'angular-tag-cloud-module';
import { SettingsHttpService } from '../settings/settings.http.service';
import { SettingsService } from '../settings/settings.service';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { ChargebeeJsAngularWrapperModule } from '@chargebee/chargebee-js-angular-wrapper';
import { DragulaModule } from 'ng2-dragula';
import { RatingModule } from 'ng-starrating';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { QRCodeModule } from 'angularx-qrcode';
import { CKEditorModule } from 'ckeditor4-angular';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxImgModule } from 'ngx-img';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { FileUploadModule } from 'ng2-file-upload';
import { PostajobModule } from './components/Postajob/postajob.module';
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
import { MatAutocompleteModule, MatCardModule, MatDialogModule, MatExpansionModule, MatInputModule, MatSelectModule } from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { JobPostingComponent } from './components/job-posting/job-posting.component';
import { Step1Component } from './components/job-posting/create-job/step1/step1.component';
import { Step2Component } from './components/job-posting/create-job/step2/step2.component';
import { Step3Component } from './components/job-posting/create-job/step3/step3.component';
import { Step4Component } from './components/job-posting/create-job/step4/step4.component';
import { Step5Component } from './components/job-posting/create-job/step5/step5.component';
import { Step6Component } from './components/job-posting/create-job/step6/step6.component';


export function app_Init(settingsHttpService: SettingsHttpService) {
  return () => settingsHttpService.initializeApp();
}
@NgModule({
  declarations: [
    AppComponent,
    MyFilterPipe,
    LayoutComponent,
    AboutComponent,
    SignUpComponent,
    GuestComponent,
    FeaturesComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PostajobComponent,
    ForgotComponent,
    ResetComponent,
    JobTemplateComponent,
    dLoginComponent,
    EditDraftComponent,
    DashboardComponent,
    NotificationsComponent,
    SalarysliderComponent,
    ResponsibilitiesDialogComponent,
    GetCandidateprofileComponent,
    JobPostingComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    Step5Component,
    Step6Component,
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
    MatExpansionModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatAutocompleteModule,
    NgxMatSelectSearchModule,
    MatInputModule,
    FileUploadModule,
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
export class AppModule { }
