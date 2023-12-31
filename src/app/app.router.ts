import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { SignUpComponent } from "./components/signup/signup.component";
import { AboutComponent } from "./components/about/about.component";
import { FeaturesComponent } from "./components/features/features.component";
import { LayoutComponent } from "./components/layout/layout.component";
import { PostajobComponent } from "./components/Postajob/postajob.component";
import { StepsComponent } from "./components/Postajob/Createajob/steps.component";
import { CreateajobComponent } from "./components/Postajob/Createajob/createajob.component";
import { Step1Component } from "./components/Postajob/Createajob/Step1/step1.component";
import { Step2Component } from "./components/Postajob/Createajob//Step2/step2.component";
import { Step3Component } from "./components/Postajob/Createajob/Step3/step3.component";
import { Step4Component } from "./components/Postajob/Createajob/Step4/step4.component";
import { JobcategoryComponent } from "./components/Postajob/Createajob/Step1/Jobcategory.component";
import { JobdetailsComponent } from "./components/Postajob/Createajob/Step1/Jobdetails.component";
import { JobprofileComponent } from "./components/Postajob/Createajob/Step1/Jobprofile.component";
import { JobskillsetComponent } from "./components/Postajob/Createajob/Step2/Jobskillset.component";
import { JobResponsibilitiesComponent } from "./components/Postajob/Createajob/Step2/Jobresponsibilities.component";
import { LocationwiseJobsComponent } from "./components/Postajob/Createajob/Step1/locationwisejobs.component";
import { QualificationsComponent } from "./components/Postajob/Createajob/Step2/qualifications.component";
import { DomainExpertiseComponent } from "./components/Postajob/Createajob/Step2/domainexpertise.component";
import { PersonalityTypeComponent } from "./components/Postajob/Createajob/Step2/PersonalityType.component";
import { EmploymentTypeComponent } from "./components/Postajob/Createajob/Step3/employmenttype.component";
import { ContractDurationComponent } from "./components/Postajob/Createajob/Step3/contractduration.component";
import { ContractExtensionComponent } from "./components/Postajob/Createajob/Step3/contractextension.component";
import { InterviewTypeComponent } from "./components/Postajob/Createajob/Step3/interviewtype.component";
import { ReportingManagerComponent } from "./components/Postajob/Createajob/Step3/reportingmanager.component";
import { UploadvideoprofileComponent } from "./components/Postajob/Createajob/Step3/uploadvideoprofile.component";
import { TeammembersComponent } from "./components/Postajob/Createajob/Step3/teammembers.component";
import { Step1SummaryComponent } from "./components/Postajob/Createajob/Step4/step1summary.component";
import { Step2SummaryComponent } from "./components/Postajob/Createajob/Step4/step2summary.component";
import { Step3SummaryComponent } from "./components/Postajob/Createajob/Step4/step3summary.component";
import { SearchresultsComponent } from "./components/Postajob/Createajob/searchresults.component";
import { NoofopeningsComponent } from "./components/Postajob/Createajob/Step1/noofopenings.component";
import { ManageJobsComponent } from "./components/managejobs/manage-jobs/manage-jobs.component";
import { ViewjobsComponent } from "./components/managejobs/manage-jobs/viewjobs/viewjobs.component";
import { SearchjobsComponent } from "./components/managejobs/manage-jobs/searchjobs/searchjobs.component";
import { FilterjobsComponent } from "./components/managejobs/manage-jobs/filterjobs/filterjobs.component";
import { InterviewListComponent } from "./components/managejobs/manage-jobs/GetInterviewJobsList/interviewList.component";
import { JoblistGridlayoutComponent } from "./components/managejobs/manage-jobs/joblist-gridlayout/joblist-gridlayout.component";
import { JoblistTablelayoutComponent } from "./components/managejobs/manage-jobs/joblist-tablelayout/joblist-tablelayout.component";
import { LoadJoblistComponent } from "./components/managejobs/manage-jobs/load-joblist/load-joblist.component";
import { AdvanceSearchComponent } from "./components/managejobs/manage-jobs/advance-search/advance-search.component";
import { BillingAndPaymentsComponent } from "./components/accountsettings/billing-and-payments/billing-and-payments.component";
import { ViewJobdetailsComponent } from "./components/jobdetails/view-jobdetails/view-jobdetails.component";
import { FilterViewJobsComponent } from "./components/jobdetails/view-jobdetails/filter-view-jobs/filter-view-jobs.component";

import { CandidateProfileComponent } from "./components/company-profile/candidateprofile/cprofile.component";
import { JobdetailsAdvanceSearchComponent } from "../app/components/jobdetails/view-jobdetails/jobdetails-advance-search/jobdetails-advance-search.component";
import { ViewjobdetailsmodelComponent } from "../app/components/jobdetails/view-jobdetails/viewjobdetailsmodel/viewjobdetailsmodel.component";
import { UploadProfilesComponent } from "../app/components/jobdetails/view-jobdetails/upload-profiles/upload-profiles.component";
import { dLoginComponent } from "../app/components/Login/dlogin.component";
import { ViewjobdetailsScComponent } from "../app/components/jobdetails/view-jobdetails/viewjobdetails-sc/viewjobdetails-sc.component";
import { ViewjobdetailsCandidateProfileComponent } from "../app/components/jobdetails/view-jobdetails/viewjobdetails-candidate-profile/viewjobdetails-candidate-profile.component";
import { GuestComponent } from "./components/GuestSignUp/guest.component";
import { ShareJobComponent } from "../app/components/jobdetails/view-jobdetails/share-job/sharejob.component";
import { ChatboxdialogComponent } from "../app/components/jobdetails/view-jobdetails/viewjobdetails-candidate-profile/chatboxdialog/chatboxdialog.component";
import { SharedialogComponent } from "../app/components/jobdetails/view-jobdetails/viewjobdetails-candidate-profile/sharedialog/sharedialog.component";
import { RejectdialogComponent } from "../app/components/jobdetails/view-jobdetails/viewjobdetails-candidate-profile/rejectdialog/rejectdialog.component";
import { ConversationComponent } from "../app/components/jobdetails/view-jobdetails/viewjobdetails-candidate-profile/conversations/conversation.component";
import { CompanyprofileComponent } from "../app/components/company-profile/companyprofile/companyprofile.component";
import { AboutcompanyComponent } from "../app/components/company-profile/aboutcompany/aboutcompany.component";
import { AchievementsandawardsComponent } from "../app/components/company-profile/achievementsandawards/achievementsandawards.component";
import { BasicinfoComponent } from "../app/components/company-profile/basicinfo/basicinfo.component";
import { BenefitsComponent } from "../app/components/company-profile/benefits/benefits.component";
import { ResetComponent } from "./components/ResetPassword/resetpassword.component";
import { AchievementsComponent } from "../app/components/company-profile/achievementsandawards/Achievements/achieve.component";
import { PartnerComponent } from "../app/components/company-profile/achievementsandawards/Companypartner/partner.component";
import { CultureComponent } from "../app/components/company-profile/culture/culture.component";
import { LocationsComponent } from "../app/components/company-profile/locations/locations.component";
import { OtherinfoComponent } from "../app/components/company-profile/otherinfo/otherinfo.component";
import { QuestionsComponent } from "../app/components/company-profile/questions/questions.component";
import { SpecialitiesComponent } from "../app/components/company-profile/specialities/specialities.component";
import { WhitepaperComponent } from "../app/components/company-profile/whitepaper/whitepaper.component";
import { NotificationsComponent } from "./components/notifications/notifications.component";
import { EditCandidateProfileComponent } from "../app/components/company-profile/editcandidateprofile/editcandidateprofile.component";
import { DashboardviewComponent } from "./components/dashboard/dashboardview/dashboardview.component";
import { DashboardActivejobsComponent } from "./components/dashboard/dashboard-activejobs/dashboard-activejobs.component";
import { DashboardScheduledInterviewComponent } from "./components/dashboard/dashboard-scheduled-interview/dashboard-scheduled-interview.component";
import { DashboardJobsviewComponent } from "./components/dashboard/dashboard-jobsview/dashboard-jobsview.component";
import { DashboardContentComponent } from "./components/dashboard/dashboard-content/dashboard-content.component";
import { DashboardRecentApplicationsComponent } from "./components/dashboard/dashboard-recent-applications/dashboard-recent-applications.component";
import { DashboardRecentjobsComponent } from "./components/dashboard/dashboard-recentjobs/dashboard-recentjobs.component";
import { AuthGuard } from "./shared/guard/auth.guard";
import { EditDraftComponent } from "./components/Postajob/Createajob/EditDraft/draft.component";
import { ForgotComponent } from "./components/ForgotPassword/forgotpassword.component";
import { AccountsettingsComponent } from "./components/accountsettings/accountsettings/accountsettings.component";
import { AccountsettingdetailsComponent } from "./components/accountsettings/accountsettingdetails/accountsettingdetails.component";
import { NavigationcomponentComponent } from "./components/accountsettings/navigationcomponent/navigationcomponent.component";
import { UsersComponent } from "./components/accountsettings/users/users.component";
import { InviteUsersComponent } from "./components/accountsettings/InviteUsers/invite.component";
import { aboutcompany } from "./components/company-profile/aboutcompany/aboutcompany";
import { CertificationComponent } from "../app/components/company-profile/achievementsandawards/CompanyCertification/certification.component";
import { JobTemplateComponent } from "./components/Postajob/Createajob/GetJobsTemplate/getTemplate.component";
import { DepartmentsComponent } from "./components/Postajob/Createajob/Step1/departments.component";
import { ClientsComponent } from "./components/Postajob/Createajob/Step1/clients.component";
import { GetCandidateprofileComponent } from "./components/GetProfileDetails/GetProfile.component";
import { ViewCandidateprofileDetailComponent } from "./components/jobdetails/view-jobdetails/viewjobdetails-candidate-profile/view-candidateprofile-detail/view-candidateprofile-detail.component";
import { ViewCandidateprofileComponent } from "./components/jobdetails/view-jobdetails/viewjobdetails-candidate-profile/view-candidateprofile/view-candidateprofile.component";
import { InviteProfiledialogComponent } from "../app/components/jobdetails/view-jobdetails/filter-view-jobs/invite-profiledialog/invite-profiledialog.component";
import { SendEmailComponent } from "./components/jobdetails/view-jobdetails/viewjobdetails-candidate-profile/send-email/send-email.component";
import { ResponsibilitiesDialogComponent } from "./components/Postajob/Createajob/Step2/responsibilities-dialog/responsibilities-dialog.component";
import { InviteFriendContentComponent } from "./components/dashboard/invite-friend/invite.component";
import { CandidateViewComponent } from "./components/company-profile/candidateview/candidate-view.component";
import { billEstimates } from "../models/billEstimates";
import { CultureTestComponent } from "./components/company-profile/culturetest/culturetest.component";
import { HiredialogComponent } from "./components/jobdetails/view-jobdetails/viewjobdetails-candidate-profile/Hiringdialog/hire.component";
import { AchivementdialogComponent } from "./components/jobdetails/view-jobdetails/viewjobdetails-candidate-profile/Achivements/achivement.component";
import { ReferencedialogComponent } from "./components/jobdetails/view-jobdetails/viewjobdetails-candidate-profile/ManageReferences/manageref.component";
import { RequestdialogComponent } from "./components/jobdetails/view-jobdetails/viewjobdetails-candidate-profile/ManageReferences/RequestInfo/requestInfo.component";
import { recriuterComponent } from "./components/Postajob/Createajob/Step3/recriuter.component";
import { backgrounddialogComponent } from "./components/jobdetails/view-jobdetails/viewjobdetails-candidate-profile/BackgroundVerification/bg.component";
import { StepSalarysliderComponent } from "./components/Postajob/Createajob/Step1/salaryslider.component";
import { StepContractExtensionComponent } from "./components/Postajob/Createajob/Step1/contractextension.component";
import { StepContractDurationComponent } from "./components/Postajob/Createajob/Step1/contractduration.component";
import { StepEmploymentTypeComponent } from "./components/Postajob/Createajob/Step1/employment.component";
import { ImmigrationManagerComponent } from "./components/Postajob/Createajob/Step1/immigration.component";
import { screeningdialogComponent } from "./components/jobdetails/view-jobdetails/viewjobdetails-candidate-profile/screening/screening.component";
import { shortlisteddialogComponent } from "./components/jobdetails/view-jobdetails/viewjobdetails-candidate-profile/ShortListed/shortlisted.component";
import { WithDrawndialogComponent } from "./components/jobdetails/view-jobdetails/viewjobdetails-candidate-profile/Withdrawn/withdrawn.component";
import { sendnotificationdialogComponent } from "./components/jobdetails/view-jobdetails/viewjobdetails-candidate-profile/SendNotification/sendnotification.component";
import { CandidatemanagerComponent } from "./components/candidatemanager/candidatemanager.component";
import { DetailsComponent } from "./components/candidatemanager/details/details.component";
import { CmModule } from "../app/components/candidatemanager/cm.module";
import { VendorManagerComponent } from './components/vendor-manager/vendor-manager.component';
import { VmModule } from "./components/vendor-manager/vm.module";
import { VendorDetailComponent } from "./components/vendor-manager/vendor-detail/vendor-detail.component";
import { CandidatedetailviewComponent } from "./components/CandidateProfile-details/candidatedetailview/candidatedetailview.component";
// import { SendEmailComponent } from '../app/components/jobetails/view-jobdetails/viewjobdetails-candidate-profile/send-email/send-email.component';
import { DocumentManagerComponent } from "./components/Postajob/document-manager/document-manager.component";
import { CustomerDashboardComponent } from "./components/customer-dashboard/customer-dashboard.component";
import { CustomsearchComponent } from "./components/customsearch/customsearch.component";
import { EditprofileComponent } from "./components/jobdetails/view-jobdetails/edit-profiles/editprofile/editprofile.component";
import { RecruitmentDashboardComponent } from "./components/recruitment-dashboard/recruitment-dashboard.component";
import { EditprofileCmComponent } from "./components/jobdetails/view-jobdetails/editprofile-cm/editprofile-cm.component";
import { CdocumentManagerComponent } from "./components/Postajob/document-manager/Candidatedocuments/cdocument-manager/cdocument-manager.component";

const appRoutes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full", canActivate: [AuthGuard] },
  {
    path: "vendor-manager",
    component: VendorManagerComponent,
    loadChildren: "./components/vendor-manager/vm.module#VmModule",
    // loadChildren: () => import("./components/dashboard/dashboard.module").then((m) => m.DashboardModule),
  },
  { path: "home", component: HomeComponent },
  { path: "signup", component: SignUpComponent },
  { path: "login", component: dLoginComponent },
  { path: "guest", component: GuestComponent },
  { path: "ForgotPassword", component: ForgotComponent },
  { path: "ResetPassword", component: ResetComponent },
  { path: "app-customsearch", component: CustomsearchComponent },
  { path: "ActivateAndResetPassword", component: AboutComponent },
  { path: "features", component: FeaturesComponent },
  { path: "app-postajob", component: PostajobComponent },
  { path: "app-document-manager", component:  DocumentManagerComponent },
  { path: "app-cdocument-manager", component:  CdocumentManagerComponent },
  { path: "app-editdraft", component: EditDraftComponent },
  { path: "app-jobtemplate", component: JobTemplateComponent },
  { path: "app-Getcandidateprofile", component: GetCandidateprofileComponent },
  { path: "app-candidateview", component: CandidateViewComponent },
  { path: "dashboard", component: CustomerDashboardComponent },
  { path: "customer-dashboard", component: RecruitmentDashboardComponent },
  {
    path: "app-createajob",
    component: CreateajobComponent,
    //loadChildren: "./components/Postajob/postajob.module#PostajobModule",
    // loadChildren: () => import("./components/Postajob/postajob.module").then((m) => m.PostajobModule),
    children: [
      { path: "", redirectTo: "app-steps-step1", pathMatch: "full" },
      // {path: 'app-steps-step1/', component: Step1Component},
      { path: "app-steps-step1", component: Step1Component },
      { path: "app-steps-step2", component: Step2Component },
      { path: "app-steps-step3", component: Step3Component },
      { path: "app-steps-step4", component: Step4Component },
    ],
  },
  {
    path: "app-createajob/:jobId",
     component: CreateajobComponent,
    //loadChildren: "./components/Postajob/postajob.module#PostajobModule",
    // loadChildren: () => import("./components/Postajob/postajob.module").then((m) => m.PostajobModule),
    children: [
      { path: "", redirectTo: "app-steps-step1", pathMatch: "full" },
      // {path: 'app-steps-step1/', component: Step1Component},
      { path: "app-steps-step1", component: Step1Component },
      { path: "app-steps-step2", component: Step2Component },
      { path: "app-steps-step3", component: Step3Component },
      { path: "app-steps-step4", component: Step4Component },
    ],
  },
  // { path: "app-searchresults", component: SearchresultsComponent },
  // { path: "app-steps-step1-jobcategory", component: JobcategoryComponent },
  // { path: "app-steps-step1-jobdetails", component: JobdetailsComponent },
  // { path: "app-steps-step1-jobprofile", component: JobprofileComponent },
  // { path: "app-stepsalaryslider", component: StepSalarysliderComponent },
  // { path: "app-steps-step1-employmenttype", component: StepEmploymentTypeComponent },
  // { path: "app-steps-step1-contractextension", component: StepContractExtensionComponent },
  // { path: "app-steps-step1-contractduration", component: StepContractDurationComponent },
  // { path: "app-steps-step1-immigrationmanager", component: ImmigrationManagerComponent },
  // { path: "app-steps-step1-clients", component: ClientsComponent },
  // { path: "app-steps-step1-departments", component: DepartmentsComponent },
  // { path: "app-steps-step1-jobskillset", component: JobskillsetComponent },
  // { path: "app-steps-step1-jobresponsibilities", component: JobResponsibilitiesComponent },
  // { path: "app-steps-step2-locationwisejobs", component: LocationwiseJobsComponent },
  // { path: "app-steps-step2-qualifications", component: QualificationsComponent },
  // { path: "app-steps-step2-domainexpertise", component: DomainExpertiseComponent },
  // { path: "app-steps-step2-noofopenings", component: NoofopeningsComponent },
  // { path: "app-steps-step2-personalityType", component: PersonalityTypeComponent },
  // { path: "app-steps-step3-employmenttype", component: EmploymentTypeComponent },
  // { path: "app-steps-step3-contractduration", component: ContractDurationComponent },
  // { path: "app-steps-step3-contractextension", component: ContractExtensionComponent },
  // { path: "app-steps-step3-interviewtype", component: InterviewTypeComponent },
  // { path: "app-steps-step3-reportingmanager", component: ReportingManagerComponent },
  // { path: "app-steps-step3-recriuter", component: recriuterComponent },
  // { path: "app-steps-step3-teammembers", component: TeammembersComponent },
   { path: "app-steps-step3-uploadvideoprofile", component: UploadvideoprofileComponent },
  // { path: "app-steps-step4-step1summary", component: Step1SummaryComponent },
  // { path: "app-steps-step4-step2summary", component: Step2SummaryComponent },
  // { path: "app-steps-step4-step3summary", component: Step3SummaryComponent },
  // { path: "app-manage-viewjobs", component: ViewjobsComponent },
  // { path: "app-manage-searchjobs", component: SearchjobsComponent },
  // { path: "app-manage-filterjobs", component: FilterjobsComponent },
  // { path: "app-manage-advance-search", component: AdvanceSearchComponent },
  // { path: "app-manage-joblist-gridlayout", component: JoblistGridlayoutComponent },
  // { path: "app-manage-joblist-tablelayout", component: JoblistTablelayoutComponent },
  // { path: "app-interviewList", component: InterviewListComponent },
  {
    path: "app-manage-jobs",
    loadChildren: "./components/managejobs/manage-jobs/managejobs.module#ManagejobsModule",
    // loadChildren: () =>
    //   import("../app/components/managejobs/manage-jobs/managejobs.module").then((m) => m.ManagejobsModule),
    // component: ManageJobsComponent,
    // children: [
    //   { path: "", redirectTo: "app-manage-load-joblist/1", pathMatch: "full" },
    //   { path: "app-manage-load-joblist/:id", component: LoadJoblistComponent },
    // ],
  },
  {
    path: "search",
    loadChildren: "./components/candidatemanager/cm.module#CmModule",
    // loadChildren: () => import("../app/components/candidatemanager/cm.module").then((m) => CmModule),
    // component: CandidatemanagerComponent,
    // children: [
    //   { path: "", redirectTo: "details", pathMatch: "full" },
    //   { path: "details", component: DetailsComponent },
    // ],
  },
  { path: "app-view-jobdetails", component: ViewJobdetailsComponent },
  { path: "app-filter-view-jobs", component: FilterViewJobsComponent },
  { path: "app-jobdetails-advance-search", component: JobdetailsAdvanceSearchComponent },
  { path: "app-viewjobdetailsmodel", component: ViewjobdetailsmodelComponent },
  { path: "app-UploadProfiles", component: UploadProfilesComponent },
  { path: "app-editprofile", component: EditprofileComponent },
  { path: "app-cmeditprofile", component: EditprofileCmComponent },
  { path: "app-viewjobdetails-candidate-profile", component: ViewjobdetailsCandidateProfileComponent },
  { path: "app-view-candidateprofile-detail", component: ViewCandidateprofileDetailComponent },
  // dialog
  { path: "app-chatboxdialog", component: ChatboxdialogComponent },
  { path: "app-sharedialog", component: SharedialogComponent },
  { path: "app-conversation", component: ConversationComponent },
  { path: "app-rejectdialog", component: RejectdialogComponent },
  { path: "app-screendialog", component: screeningdialogComponent },
  { path: "app-shortlisteddialog", component: shortlisteddialogComponent },
  { path: "app-WithDrawndialog", component: WithDrawndialogComponent },
  { path: "app-sendnotification", component: sendnotificationdialogComponent },
  { path: "app-hiredialog", component: HiredialogComponent },
  { path: "app-achivementdialog", component: AchivementdialogComponent },
  { path: "app-bgdialog", component: backgrounddialogComponent },
  { path: "app-refdialog", component: ReferencedialogComponent },
  { path: "app-requestdialog", component: RequestdialogComponent },
  { path: "app-sharejob", component: ShareJobComponent },
  { path: "app-view-candidateprofile", component: ViewCandidateprofileComponent },
  { path: "app-invite-profiledialog", component: InviteProfiledialogComponent },
  { path: "app-send-email", component: SendEmailComponent },
  { path: "app-responsibilities-dialog", component: ResponsibilitiesDialogComponent },

  { path: "app-companyprofile", component: CompanyprofileComponent },
  { path: "app-aboutcompany", component: AboutcompanyComponent },
  { path: "app-achievementsandawards", component: AchievementsandawardsComponent },
  { path: "app-cprofile", component: CandidateProfileComponent },
  { path: "app-partner", component: PartnerComponent },
  { path: "app-basicinfo", component: BasicinfoComponent },
  { path: "app-editcprofile", component: EditCandidateProfileComponent },
  { path: "app-achievements", component: AchievementsComponent },
  { path: "app-certification", component: CertificationComponent },
  { path: "app-benefits", component: BenefitsComponent },
  { path: "app-culture", component: CultureComponent },
  { path: "app-locations", component: LocationsComponent },
  { path: "app-otherinfo", component: OtherinfoComponent },
  { path: "app-questions", component: QuestionsComponent },
  { path: "app-specialities", component: SpecialitiesComponent },
  { path: "app-whitepaper", component: WhitepaperComponent },
  { path: "app-notifications", component: NotificationsComponent },
  { path: "app-culturetest", component: CultureTestComponent },

  {
    path: "app-dashboardview",
    loadChildren: "./components/dashboard/dashboard.module#DashboardModule",
    // loadChildren: () => import("./components/dashboard/dashboard.module").then((m) => m.DashboardModule),
  },
  { path: "app-invite-friend", component: InviteFriendContentComponent },

  { path: 'app-accountsettings', component: AccountsettingsComponent },
  { path: "app-navigationcomponent", component: NavigationcomponentComponent },
  { path: 'app-accountsettingdetails', component: AccountsettingdetailsComponent },
  { path: 'app-users', component: UsersComponent },
  { path: 'profileview', component: CandidatedetailviewComponent },

  {
    path: "app-accountsettings",
    loadChildren: "./components/accountsettings/accountsettings.module#AccountsettingsModule",
    // loadChildren: () =>
    //   import("../app/components/accountsettings/accountsettings.module").then((m) => m.AccountsettingsModule),
    // component: AccountsettingsComponent,
    // children: [
    //   { path: "", redirectTo: "app-accountsettingdetails", pathMatch: "full" },
    //   { path: "app-accountsettingdetails", component: AccountsettingdetailsComponent },
    //   { path: "app-users", component: UsersComponent },
    //   { path: "app-billing-and-payments", component: BillingAndPaymentsComponent },
    //   { path: "app-billing-and-payments/:id", component: BillingAndPaymentsComponent },
    //   { path: "app-inviteusers", component: InviteUsersComponent },
    // ],
  },
  { path: "", redirectTo: "/home", pathMatch: "full", canActivate: [AuthGuard] },
  { path: "**", component: HomeComponent },

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: false });
