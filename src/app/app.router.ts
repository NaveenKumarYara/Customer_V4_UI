import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent} from './components/signup/signup.component';
import { AboutComponent } from './components/about/about.component';
import { FeaturesComponent } from './components/features/features.component';
import { LayoutComponent} from './components/layout/layout.component';
import { PostajobComponent } from './components/Postajob/postajob.component';
import { StepsComponent } from './components/Postajob/Createajob/steps.component';
import { CreateajobComponent } from './components/Postajob/Createajob/createajob.component';
import { Step1Component } from './components/Postajob/Createajob/Step1/step1.component';
import { Step2Component } from './components/Postajob/Createajob//Step2/step2.component';
import { Step3Component } from './components/Postajob/Createajob/Step3/step3.component';
import { Step4Component } from './components/Postajob/Createajob/Step4/step4.component';
import { JobcategoryComponent } from './components/Postajob/Createajob/Step1/Jobcategory.component';
import { JobdetailsComponent } from './components/Postajob/Createajob/Step1/Jobdetails.component';
import { JobprofileComponent } from './components/Postajob/Createajob/Step1/Jobprofile.component';
import { JobskillsetComponent } from './components/Postajob/Createajob/Step1/Jobskillset.component';
import { JobResponsibilitiesComponent } from './components/Postajob/Createajob/Step1/Jobresponsibilities.component';
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
import { SearchresultsComponent } from './components/Postajob/Createajob/searchresults.component';
import { NoofopeningsComponent } from './components/Postajob/Createajob/Step2/noofopenings.component';
import { ManageJobsComponent } from './components/managejobs/manage-jobs/manage-jobs.component';
import { ViewjobsComponent } from './components/managejobs/manage-jobs/viewjobs/viewjobs.component';
import { SearchjobsComponent } from './components/managejobs/manage-jobs/searchjobs/searchjobs.component';
import { FilterjobsComponent } from './components/managejobs/manage-jobs/filterjobs/filterjobs.component';
import { JoblistGridlayoutComponent } from './components/managejobs/manage-jobs/joblist-gridlayout/joblist-gridlayout.component';
import { JoblistTablelayoutComponent } from './components/managejobs/manage-jobs/joblist-tablelayout/joblist-tablelayout.component';
import { LoadJoblistComponent } from './components/managejobs/manage-jobs/load-joblist/load-joblist.component';
import { AdvanceSearchComponent } from './components/managejobs/manage-jobs/advance-search/advance-search.component';

import { ViewJobdetailsComponent } from './components/jobdetails/view-jobdetails/view-jobdetails.component';
import { FilterViewJobsComponent } from './components/jobdetails/view-jobdetails/filter-view-jobs/filter-view-jobs.component';

import {CandidateProfileComponent} from './components/company-profile/candidateprofile/cprofile.component';
import { JobdetailsAdvanceSearchComponent } from '../app/components/jobdetails/view-jobdetails/jobdetails-advance-search/jobdetails-advance-search.component';
import { ViewjobdetailsmodelComponent } from '../app/components/jobdetails/view-jobdetails/viewjobdetailsmodel/viewjobdetailsmodel.component';
import { UploadProfilesComponent } from '../app/components/jobdetails/view-jobdetails/upload-profiles/upload-profiles.component';

import { ViewjobdetailsScComponent } from '../app/components/jobdetails/view-jobdetails/viewjobdetails-sc/viewjobdetails-sc.component';
import { ViewjobdetailsCandidateProfileComponent } from '../app/components/jobdetails/view-jobdetails/viewjobdetails-candidate-profile/viewjobdetails-candidate-profile.component';

import { ChatboxdialogComponent } from '../app/components/jobdetails/view-jobdetails/viewjobdetails-candidate-profile/chatboxdialog/chatboxdialog.component';
import { SharedialogComponent } from '../app/components/jobdetails/view-jobdetails/viewjobdetails-candidate-profile/sharedialog/sharedialog.component';
import { RejectdialogComponent } from '../app/components/jobdetails/view-jobdetails/viewjobdetails-candidate-profile/rejectdialog/rejectdialog.component';

import { CompanyprofileComponent } from '../app/components/company-profile/companyprofile/companyprofile.component';
import { AboutcompanyComponent } from '../app/components/company-profile/aboutcompany/aboutcompany.component';
import { AchievementsandawardsComponent } from '../app/components/company-profile/achievementsandawards/achievementsandawards.component';
import { BasicinfoComponent } from '../app/components/company-profile/basicinfo/basicinfo.component';
import { BenefitsComponent } from '../app/components/company-profile/benefits/benefits.component';
import { CultureComponent } from '../app/components/company-profile/culture/culture.component';
import { LocationsComponent } from '../app/components/company-profile/locations/locations.component';
import { OtherinfoComponent } from '../app/components/company-profile/otherinfo/otherinfo.component';
import { QuestionsComponent } from '../app/components/company-profile/questions/questions.component';
import { SpecialitiesComponent } from '../app/components/company-profile/specialities/specialities.component';
import { WhitepaperComponent } from '../app/components/company-profile/whitepaper/whitepaper.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import {EditCandidateProfileComponent} from '../app/components/company-profile/editcandidateprofile/editcandidateprofile.component';
import { DashboardviewComponent } from './components/dashboard/dashboardview/dashboardview.component';
import { DashboardActivejobsComponent } from './components/dashboard/dashboard-activejobs/dashboard-activejobs.component';
import { DashboardScheduledInterviewComponent } from './components/dashboard/dashboard-scheduled-interview/dashboard-scheduled-interview.component';
import { DashboardJobsviewComponent } from './components/dashboard/dashboard-jobsview/dashboard-jobsview.component';
import { DashboardContentComponent } from './components/dashboard/dashboard-content/dashboard-content.component';
import { DashboardRecentApplicationsComponent } from './components/dashboard/dashboard-recent-applications/dashboard-recent-applications.component';
import { DashboardRecentjobsComponent } from './components/dashboard/dashboard-recentjobs/dashboard-recentjobs.component';
import {AuthGuard} from './shared/guard/auth.guard';

import { AccountsettingsComponent } from './components/accountsettings/accountsettings/accountsettings.component';
import { AccountsettingdetailsComponent } from './components/accountsettings/accountsettingdetails/accountsettingdetails.component';
import { NavigationcomponentComponent } from './components/accountsettings/navigationcomponent/navigationcomponent.component';
import { UsersComponent } from './components/accountsettings/users/users.component';
import { aboutcompany } from './components/company-profile/aboutcompany/aboutcompany';

const appRoutes: Routes =
[
  { path: '', redirectTo: 'layout', pathMatch: 'full' , canActivate: [AuthGuard]},
    { path: 'home', component:HomeComponent },
    { path: 'signup', component:SignUpComponent },
    { path: 'about', component:AboutComponent},
    { path: 'features', component:FeaturesComponent },
    { path: 'app-postajob', component: PostajobComponent },
    // { path: 'app-createajob', component: CreateajobComponent ,
    //   children: [
    //     { path: '', redirectTo: 'app-steps-step1', pathMatch: 'full' },
    //    // need to enable this or add jobid to create job { path: '', redirectTo: 'app-steps-step1/:jobId', pathMatch: 'full' },
    //     //  {path: 'app-steps-step1/:jobId', component: Step1Component},
    //       {path: 'app-steps-step1', component: Step1Component},
    //       {path: 'app-steps-step2', component: Step2Component},
    //       {path: 'app-steps-step3', component: Step3Component},
    //       {path: 'app-steps-step4', component: Step4Component},
    //     ]
    // },
    { path: 'app-createajob', component: CreateajobComponent ,
    children: [
      { path: '', redirectTo: 'app-steps-step1', pathMatch: 'full' },
       // {path: 'app-steps-step1/', component: Step1Component},
       {path: 'app-steps-step1', component: Step1Component},
        {path: 'app-steps-step2', component: Step2Component},
        {path: 'app-steps-step3', component: Step3Component},
        {path: 'app-steps-step4', component: Step4Component},
      ]
  },
    { path: 'app-createajob/:jobId', component: CreateajobComponent ,
      children: [
        { path: '', redirectTo: 'app-steps-step1', pathMatch: 'full' },
         // {path: 'app-steps-step1/', component: Step1Component},
         {path: 'app-steps-step1', component: Step1Component},
          {path: 'app-steps-step2', component: Step2Component},
          {path: 'app-steps-step3', component: Step3Component},
          {path: 'app-steps-step4', component: Step4Component},
        ]
    },
    { path: 'app-searchresults', component: SearchresultsComponent },
    { path: 'app-steps-step1-jobcategory', component: JobcategoryComponent },
    { path: 'app-steps-step1-jobdetails', component: JobdetailsComponent },
    { path: 'app-steps-step1-jobprofile', component: JobprofileComponent },
    { path: 'app-steps-step1-jobskillset', component: JobskillsetComponent },
    { path: 'app-steps-step1-jobresponsibilities', component: JobResponsibilitiesComponent },
    { path: 'app-steps-step2-locationwisejobs', component: LocationwiseJobsComponent },
    { path: 'app-steps-step2-qualifications', component: QualificationsComponent },
    { path: 'app-steps-step2-domainexpertise', component: DomainExpertiseComponent },
    { path: 'app-steps-step2-noofopenings', component: NoofopeningsComponent },
    { path: 'app-steps-step2-personalityType', component: PersonalityTypeComponent },
    { path: 'app-steps-step3-employmenttype', component: EmploymentTypeComponent },
    { path: 'app-steps-step3-contractduration', component: ContractDurationComponent },
    { path: 'app-steps-step3-contractextension', component: ContractExtensionComponent },
    { path: 'app-steps-step3-interviewtype', component: InterviewTypeComponent },
    { path: 'app-steps-step3-reportingmanager', component: ReportingManagerComponent },
    { path: 'app-steps-step3-teammembers', component: TeammembersComponent },
    { path: 'app-steps-step4-step1summary', component: Step1SummaryComponent },
    { path: 'app-steps-step4-step2summary', component: Step2SummaryComponent },
    { path: 'app-steps-step4-step3summary', component: Step3SummaryComponent },
    { path: 'app-manage-viewjobs', component: ViewjobsComponent },
    { path: 'app-manage-searchjobs', component: SearchjobsComponent },
    { path: 'app-manage-filterjobs', component: FilterjobsComponent },
    { path: 'app-manage-advance-search', component: AdvanceSearchComponent },
    { path: 'app-manage-joblist-gridlayout', component: JoblistGridlayoutComponent },
    { path: 'app-manage-joblist-tablelayout', component: JoblistTablelayoutComponent },
    {
      path: 'app-manage-jobs', component: ManageJobsComponent,
      children: [
        { path: '', redirectTo: 'app-manage-load-joblist/1', pathMatch: 'full' },
        { path: 'app-manage-load-joblist/:id', component: LoadJoblistComponent },
      ]
    },
    { path: 'app-view-jobdetails', component: ViewJobdetailsComponent },
    { path: 'app-filter-view-jobs', component: FilterViewJobsComponent },
    { path: 'app-jobdetails-advance-search', component: JobdetailsAdvanceSearchComponent },
    { path: 'app-viewjobdetailsmodel', component: ViewjobdetailsmodelComponent },
      { path: 'app-UploadProfiles', component: UploadProfilesComponent },
    { path: 'app-viewjobdetails-candidate-profile', component: ViewjobdetailsCandidateProfileComponent },

    { path: 'app-chatboxdialog', component: ChatboxdialogComponent },
    { path: 'app-sharedialog', component: SharedialogComponent },
    { path: 'app-rejectdialog', component: RejectdialogComponent },

    { path: 'app-companyprofile', component: CompanyprofileComponent },
    { path: 'app-aboutcompany', component: AboutcompanyComponent },
    { path: 'app-achievementsandawards', component: AchievementsandawardsComponent },
    {path: 'app-cprofile', component: CandidateProfileComponent},
    { path: 'app-basicinfo', component: BasicinfoComponent },
    { path: 'app-editcprofile', component: EditCandidateProfileComponent },
    { path: 'app-benefits', component: BenefitsComponent },
    { path: 'app-culture', component: CultureComponent },
    { path: 'app-locations', component: LocationsComponent },
    { path: 'app-otherinfo', component: OtherinfoComponent },
    { path: 'app-questions', component: QuestionsComponent },
    { path: 'app-specialities', component: SpecialitiesComponent },
    { path: 'app-whitepaper', component: WhitepaperComponent },
    { path: 'app-notifications', component: NotificationsComponent },

    { path: 'app-dashboardview', component: DashboardviewComponent },
    { path: 'app-dashboard-activejobs', component: DashboardActivejobsComponent },
    { path: 'app-dashboard-scheduled-interview', component: DashboardScheduledInterviewComponent },
    { path: 'app-dashboard-jobsview', component: DashboardJobsviewComponent },
    { path: 'app-dashboard-content', component: DashboardContentComponent },
    { path: 'app-dashboard-recent-applications', component: DashboardRecentApplicationsComponent },
    { path: 'app-dashboard-recentjobs', component: DashboardRecentjobsComponent },

    // { path: 'app-accountsettings', component: AccountsettingsComponent },
    { path: 'app-navigationcomponent', component: NavigationcomponentComponent },
    // { path: 'app-accountsettingdetails', component: AccountsettingdetailsComponent },
    // { path: 'app-users', component: UsersComponent },

    {
      path: 'app-accountsettings', component: AccountsettingsComponent,
      children: [
        { path: '', redirectTo: 'app-accountsettingdetails', pathMatch: 'full' },
        { path: 'app-accountsettingdetails', component: AccountsettingdetailsComponent },
        { path: 'app-users', component: UsersComponent },
      ]
    },

    { path: '', redirectTo: '/layout', pathMatch: 'full' , canActivate: [AuthGuard] },
    { path: '**', component: LayoutComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: false});
