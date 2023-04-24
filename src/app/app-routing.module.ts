import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import  { ManageJobsComponent } from './pages/manage-jobs/manage-jobs.component';

const routes: Routes = [
  // -------------------- Auth Routes --------------------
  {
    path:'',
    loadChildren: ()=> import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'login',
    redirectTo:'login'
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
    path:'manage-jobs',
    component: ManageJobsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
