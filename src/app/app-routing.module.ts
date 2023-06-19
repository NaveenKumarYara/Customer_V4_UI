import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import  { ManageJobsComponent } from './pages/manage-jobs/manage-jobs.component';
import { FindACandidateComponent } from './pages/find-a-candidate/find-a-candidate.component';

const routes: Routes = [
  // -------------------- Auth Routes --------------------
  {
    path:'',
    loadChildren: ()=> import('./pages/auth/auth.module').then(m => m.AuthModule)
  },

  {
    path:'login',
    redirectTo:'/'
    , pathMatch: 'full' 
  },
  {
    path:'register',
    redirectTo:'register'
  },
  {
    path: 'home',
    component: DashboardComponent
  },
  {
    path: 'manage-jobs',
    loadChildren: () =>
      import(`./pages/manage-jobs/manage-jobs.module`).then((m) => m.ManageJobModule),
  },
  {
    path: 'manage-jobs/job-activites',
    redirectTo:'manage-jobs/job-activites'
  },
  {
    path: 'find-a-candidates',
    component: FindACandidateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
