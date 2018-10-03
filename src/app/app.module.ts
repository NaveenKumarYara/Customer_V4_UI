import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from './app.service';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PostajobComponent } from './components/Postajob/postajob.component';
import { StepsComponent } from './components/Postajob/Createajob/steps.component';
import { CreateajobComponent } from './components/Postajob/Createajob/createajob.component';
import { NoofopeningsComponent } from './components/Postajob/Createajob/Step2/noofopenings.component';
import { SearchresultsComponent } from './components/Postajob/Createajob/searchresults.component';
import { Step1Component } from './components/Postajob/Createajob/Step1/step1.component';
import { Step2Component } from './components/Postajob/Createajob//Step2/step2.component';
import { Step3Component } from './components/Postajob/Createajob/Step3/step3.component';
import { Step4Component } from './components/Postajob/Createajob/Step4/step4.component';
import { JobdetailsComponent } from './components/Postajob/Createajob/Step1/Jobdetails.component';
import { JobcategoryComponent } from './components/Postajob/Createajob/Step1/Jobcategory.component';
import { JobprofileComponent } from './components/Postajob/Createajob/Step1/Jobprofile.component';
import { JobskillsetComponent } from './components/Postajob/Createajob/Step1/Jobskillset.component';
import { JobResponsibilitiesComponent } from './components/Postajob/Createajob/Step1/Jobresponsibilities.component';
import { routing } from './app.router';
import { NgSelectModule } from '@ng-select/ng-select';
import { MyFilterPipe } from './filter/MyFilterPipe';  

import { LocationwiseJobsComponent } from './components/Postajob/Createajob/Step2/locationwisejobs.component';
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
import { ManagejobsModule } from './components/managejobs/managejobs.module';
import { JobdetailsModule } from './components/jobdetails/jobdetails.module';
import { CompanyProfileModule } from './components/company-profile/company-profile.module';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { AccountsettingsModule } from './components/accountsettings/accountsettings.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import {ApiService} from './shared/services/api.service/api.service';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,   
    PostajobComponent,
    StepsComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    JobdetailsComponent,
    JobcategoryComponent,
    JobprofileComponent,
    JobskillsetComponent,
    CreateajobComponent,
    JobResponsibilitiesComponent,
    LocationwiseJobsComponent,
    QualificationsComponent,
    DomainExpertiseComponent,
    PersonalityTypeComponent,
    EmploymentTypeComponent,
    ContractDurationComponent,
    ContractExtensionComponent,
    InterviewTypeComponent,
    ReportingManagerComponent,
    TeammembersComponent,
    Step1SummaryComponent,
    Step2SummaryComponent,
    SearchresultsComponent,
    Step3SummaryComponent,
    NotificationsComponent,
    NoofopeningsComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpModule,   
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    HttpClientModule,
    ManagejobsModule,
    JobdetailsModule,
    CompanyProfileModule,
    DashboardModule,
    AccountsettingsModule,
  NgxSpinnerModule,
  ChartsModule     
  ],
  providers: [AppService,ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
