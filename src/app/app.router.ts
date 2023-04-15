import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { SignUpComponent } from "./components/signup/signup.component";
import { AboutComponent } from "./components/about/about.component";
import { FeaturesComponent } from "./components/features/features.component";
import { PostajobComponent } from "./components/Postajob/postajob.component";
import { CreateajobComponent } from "./components/Postajob/Createajob/createajob.component";
import { Step1Component } from "./components/Postajob/Createajob/Step1/step1.component";
import { Step2Component } from "./components/Postajob/Createajob//Step2/step2.component";
import { Step3Component } from "./components/Postajob/Createajob/Step3/step3.component";
import { Step4Component } from "./components/Postajob/Createajob/Step4/step4.component";
import { UploadvideoprofileComponent } from "./components/Postajob/Createajob/Step3/uploadvideoprofile.component";
import { ViewJobdetailsComponent } from "./components/jobdetails/view-jobdetails/view-jobdetails.component";
import { FilterViewJobsComponent } from "./components/jobdetails/view-jobdetails/filter-view-jobs/filter-view-jobs.component";
import { CandidateProfileComponent } from "./components/company-profile/candidateprofile/cprofile.component";
import { JobdetailsAdvanceSearchComponent } from "../app/components/jobdetails/view-jobdetails/jobdetails-advance-search/jobdetails-advance-search.component";
import { ViewjobdetailsmodelComponent } from "../app/components/jobdetails/view-jobdetails/viewjobdetailsmodel/viewjobdetailsmodel.component";
import { UploadProfilesComponent } from "../app/components/jobdetails/view-jobdetails/upload-profiles/upload-profiles.component";
import { dLoginComponent } from "../app/components/Login/dlogin.component";
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
import { AuthGuard } from "./shared/guard/auth.guard";
import { EditDraftComponent } from "./components/Postajob/Createajob/EditDraft/draft.component";
import { ForgotComponent } from "./components/ForgotPassword/forgotpassword.component";
import { AccountsettingsComponent } from "./components/accountsettings/accountsettings/accountsettings.component";
import { AccountsettingdetailsComponent } from "./components/accountsettings/accountsettingdetails/accountsettingdetails.component";
import { NavigationcomponentComponent } from "./components/accountsettings/navigationcomponent/navigationcomponent.component";
import { UsersComponent } from "./components/accountsettings/users/users.component";
import { CertificationComponent } from "../app/components/company-profile/achievementsandawards/CompanyCertification/certification.component";
import { JobTemplateComponent } from "./components/Postajob/Createajob/GetJobsTemplate/getTemplate.component";
import { GetCandidateprofileComponent } from "./components/GetProfileDetails/GetProfile.component";
import { ViewCandidateprofileDetailComponent } from "./components/jobdetails/view-jobdetails/viewjobdetails-candidate-profile/view-candidateprofile-detail/view-candidateprofile-detail.component";
import { ViewCandidateprofileComponent } from "./components/jobdetails/view-jobdetails/viewjobdetails-candidate-profile/view-candidateprofile/view-candidateprofile.component";
import { InviteProfiledialogComponent } from "../app/components/jobdetails/view-jobdetails/filter-view-jobs/invite-profiledialog/invite-profiledialog.component";
import { SendEmailComponent } from "./components/jobdetails/view-jobdetails/viewjobdetails-candidate-profile/send-email/send-email.component";
import { ResponsibilitiesDialogComponent } from "./components/Postajob/Createajob/Step2/responsibilities-dialog/responsibilities-dialog.component";
import { InviteFriendContentComponent } from "./components/dashboard/invite-friend/invite.component";
import { CandidateViewComponent } from "./components/company-profile/candidateview/candidate-view.component";
import { CultureTestComponent } from "./components/company-profile/culturetest/culturetest.component";
import { HiredialogComponent } from "./components/jobdetails/view-jobdetails/viewjobdetails-candidate-profile/Hiringdialog/hire.component";
import { AchivementdialogComponent } from "./components/jobdetails/view-jobdetails/viewjobdetails-candidate-profile/Achivements/achivement.component";
import { ReferencedialogComponent } from "./components/jobdetails/view-jobdetails/viewjobdetails-candidate-profile/ManageReferences/manageref.component";
import { RequestdialogComponent } from "./components/jobdetails/view-jobdetails/viewjobdetails-candidate-profile/ManageReferences/RequestInfo/requestInfo.component";
import { backgrounddialogComponent } from "./components/jobdetails/view-jobdetails/viewjobdetails-candidate-profile/BackgroundVerification/bg.component";
import { screeningdialogComponent } from "./components/jobdetails/view-jobdetails/viewjobdetails-candidate-profile/screening/screening.component";
import { shortlisteddialogComponent } from "./components/jobdetails/view-jobdetails/viewjobdetails-candidate-profile/ShortListed/shortlisted.component";
import { WithDrawndialogComponent } from "./components/jobdetails/view-jobdetails/viewjobdetails-candidate-profile/Withdrawn/withdrawn.component";
import { sendnotificationdialogComponent } from "./components/jobdetails/view-jobdetails/viewjobdetails-candidate-profile/SendNotification/sendnotification.component";
import { VendorManagerComponent } from './components/vendor-manager/vendor-manager.component';
import { CandidatedetailviewComponent } from "./components/CandidateProfile-details/candidatedetailview/candidatedetailview.component";
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
    loadChildren: () => import("./components/vendor-manager/vm.module").then(m => m.VmModule),
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
    children: [
      { path: "", redirectTo: "app-steps-step1", pathMatch: "full" },
      { path: "app-steps-step1", component: Step1Component },
      { path: "app-steps-step2", component: Step2Component },
      { path: "app-steps-step3", component: Step3Component },
      { path: "app-steps-step4", component: Step4Component },
    ],
  },
  {
    path: "app-createajob/:jobId",
     component: CreateajobComponent,
    children: [
      { path: "", redirectTo: "app-steps-step1", pathMatch: "full" },
      { path: "app-steps-step1", component: Step1Component },
      { path: "app-steps-step2", component: Step2Component },
      { path: "app-steps-step3", component: Step3Component },
      { path: "app-steps-step4", component: Step4Component },
    ],
  },
   { path: "app-steps-step3-uploadvideoprofile", component: UploadvideoprofileComponent },
  {
    path: "app-manage-jobs",
    loadChildren: () => import("./components/managejobs/manage-jobs/managejobs.module").then(m => m.ManagejobsModule),
  },
  {
    path: "search",
    loadChildren: () => import("./components/candidatemanager/cm.module").then(m => m.CmModule),
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
    loadChildren: () => import("./components/dashboard/dashboard.module").then(m => m.DashboardModule),
  },
  { path: "app-invite-friend", component: InviteFriendContentComponent },

  { path: 'app-accountsettings', component: AccountsettingsComponent },
  { path: "app-navigationcomponent", component: NavigationcomponentComponent },
  { path: 'app-accountsettingdetails', component: AccountsettingdetailsComponent },
  { path: 'app-users', component: UsersComponent },
  { path: 'profileview', component: CandidatedetailviewComponent },

  {
    path: "app-accountsettings",
    loadChildren: () => import("./components/accountsettings/accountsettings.module").then(m => m.AccountsettingsModule),
  },
  { path: "", redirectTo: "/home", pathMatch: "full", canActivate: [AuthGuard] },
  { path: "**", component: HomeComponent },

];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes, { useHash: false });
