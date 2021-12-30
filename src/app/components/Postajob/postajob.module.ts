import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";
import { SearchresultsComponent } from "./Createajob/searchresults.component";
import { StepsComponent } from "./Createajob/steps.component";
import { EditDraftComponent } from "./Createajob/EditDraft/draft.component";
import { JobTemplateComponent } from "./Createajob/GetJobsTemplate/getTemplate.component";
import { Step1Component } from "./Createajob/Step1/step1.component";
import { Step2Component } from "./Createajob/Step2/step2.component";
import { Step3Component } from "./Createajob/Step3/step3.component";
import { Step4Component } from "./Createajob/Step4/step4.component";
import { JobprofileComponent } from "./Createajob/Step1/Jobprofile.component";
import { StepEmploymentTypeComponent } from "./Createajob/Step1/employment.component";
import { JobdetailsComponent } from "./Createajob/Step1/Jobdetails.component";
import { StepContractExtensionComponent } from "./Createajob/Step1/contractextension.component";
import { StepContractDurationComponent } from "./Createajob/Step1/contractduration.component";
import { AppModule } from "../../app.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CreateajobComponent } from "./Createajob/createajob.component";
import { RouterModule } from "@angular/router";
import { JobcategoryComponent } from "./Createajob/Step1/Jobcategory.component";
import { StepSalarysliderComponent } from "./Createajob/Step1/salaryslider.component";
import { ImmigrationManagerComponent } from "./Createajob/Step1/immigration.component";
import { ClientsComponent } from "./Createajob/Step1/clients.component";
import { DepartmentsComponent } from "./Createajob/Step1/departments.component";
import { JobskillsetComponent } from "./Createajob/Step2/Jobskillset.component";
import { JobResponsibilitiesComponent } from "./Createajob/Step2/Jobresponsibilities.component";
import { LocationwiseJobsComponent } from "./Createajob/Step1/locationwisejobs.component";
import { QualificationsComponent } from "./Createajob/Step2/qualifications.component";
import { DomainExpertiseComponent } from "./Createajob/Step2/domainexpertise.component";
import { NoofopeningsComponent } from "./Createajob/Step1/noofopenings.component";
import { PersonalityTypeComponent } from "./Createajob/Step2/PersonalityType.component";
import { EmploymentTypeComponent } from "./Createajob/Step3/employmenttype.component";
import { UploadvideoprofileComponent } from "./Createajob/Step3/uploadvideoprofile.component";
import { Step1SummaryComponent } from "./Createajob/Step4/step1summary.component";
import { Step2SummaryComponent } from "./Createajob/Step4/step2summary.component";
import { Step3SummaryComponent } from "./Createajob/Step4/step3summary.component";
import { ContractDurationComponent } from "./Createajob/Step3/contractduration.component";
import { ContractExtensionComponent } from "./Createajob/Step3/contractextension.component";
import { InterviewTypeComponent } from "./Createajob/Step3/interviewtype.component";
import { ReportingManagerComponent } from "./Createajob/Step3/reportingmanager.component";
import { recriuterComponent } from "./Createajob/Step3/recriuter.component";
import { TeammembersComponent } from "./Createajob/Step3/teammembers.component";
import { CKEditorModule } from "ckeditor4-angular";
import { ConvertMonthPipe } from "./Createajob/convertskillsmonth.pipe";
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { NgDatepickerModule } from 'ng2-datepicker';
import { ImmigrationComponent } from "./Createajob/Step2/immi.component";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { JobdescriptionComponent } from './Createajob/Step1/jobdescription/jobdescription.component';
import { JobcardComponent } from './Createajob/Step4/jobcard/jobcard.component';
import { MatDialogModule } from "@angular/material";
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    MatDialogModule,
    AngularDateTimePickerModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgSelectModule,
    NgDatepickerModule,
    RouterModule.forChild([
      {
        path: "",
        component: CreateajobComponent,
        children: [
          { path: "", redirectTo: "app-steps-step1", pathMatch: "full" },
          { path: "app-steps-step1", component: Step1Component },
          { path: "app-steps-step2", component: Step2Component },
          { path: "app-steps-step3", component: Step3Component },
          { path: "app-steps-step4", component: Step4Component },
        ],
      }, 
    ]),
  ],
  declarations: [
    ConvertMonthPipe,
    SearchresultsComponent,
    // StepsComponent,
    // EditDraftComponent,
    // JobTemplateComponent,
    // JobprofileComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,

    StepsComponent,
    ImmigrationComponent,
    CreateajobComponent,
    JobcategoryComponent,
    JobdetailsComponent,
    JobprofileComponent,
    StepSalarysliderComponent,
    StepEmploymentTypeComponent,
    StepContractExtensionComponent,
    StepContractDurationComponent,
    ImmigrationManagerComponent,
    ClientsComponent,
    DepartmentsComponent,
    JobskillsetComponent,
    JobResponsibilitiesComponent,
    LocationwiseJobsComponent,
    QualificationsComponent,
    DomainExpertiseComponent,
    NoofopeningsComponent,
    PersonalityTypeComponent,
    EmploymentTypeComponent,
    ContractDurationComponent,
    ContractExtensionComponent,
    InterviewTypeComponent,
    ReportingManagerComponent,
    recriuterComponent,
    TeammembersComponent,
    UploadvideoprofileComponent,
    Step1SummaryComponent,
    Step2SummaryComponent,
    Step3SummaryComponent,
    JobdescriptionComponent,
    JobcardComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [CreateajobComponent, StepsComponent],
  entryComponents: [JobcardComponent]
})
export class PostajobModule {}
