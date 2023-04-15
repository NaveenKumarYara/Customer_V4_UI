import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { CmModule } from './components/candidatemanager/cm.module';
import { VmModule } from './components/vendor-manager/vm.module';

import { FileUploadModule } from 'ng2-file-upload';
import { RecaptchaModule } from 'angular5-google-recaptcha';
import { PostajobModule } from './components/Postajob/postajob.module';
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
import { MatAutocompleteModule, MatCardModule, MatDialogModule, MatExpansionModule, MatInputModule, MatSelectModule } from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgDatepickerModule } from 'ng2-datepicker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TooltipModule } from 'ng2-tooltip-directive';
import { CandidatedetailviewComponent } from './components/CandidateProfile-details/candidatedetailview/candidatedetailview.component';
import { SafeHtmlNewPipe } from './components/CandidateProfile-details/safenewhtml.pipe';
import { SpinnerInterceptor } from './shared/interceptors/spinner-interceptor';
import { VendorManagerComponent } from './components/vendor-manager/vendor-manager.component';import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { DocumentManagerComponent } from './components/Postajob/document-manager/document-manager.component';
import { LeftSidebarComponent } from './components/Postajob/document-manager/left-sidebar/left-sidebar.component';
import { FilterDocumentComponent } from './components/Postajob/document-manager/filter-document/filter-document.component';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { DxTreeListModule } from 'devextreme-angular';
import { CustomsearchComponent } from './components/customsearch/customsearch.component';
import { RecruitmentDashboardComponent } from './components/recruitment-dashboard/recruitment-dashboard.component';
import { OwlModule } from 'ng2-owl-carousel';
import { CdocumentManagerComponent } from './components/Postajob/document-manager/Candidatedocuments/cdocument-manager/cdocument-manager.component';
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
    CandidatedetailviewComponent,
    SafeHtmlNewPipe,
    VendorManagerComponent,
    DocumentManagerComponent,
    CdocumentManagerComponent,
    LeftSidebarComponent,
    FilterDocumentComponent,
    CustomerDashboardComponent,
    CustomsearchComponent,
    RecruitmentDashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    QRCodeModule,
    ReactiveFormsModule,
    ImageCropperModule,
    NgSelectModule,
    DxTreeListModule,
    HttpClientModule,
    NgxDocViewerModule,
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
    CmModule,
    VmModule,
    routing,
    OwlModule
  ],
  providers: [
    SettingsHttpService,
    SettingsService,
    HttpClient,
    { provide: APP_INITIALIZER, useFactory: app_Init, deps: [SettingsHttpService], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    AppService,
    ApiService,
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
