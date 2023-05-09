import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageJobsComponent } from './manage-jobs.component';


const routes: Routes = [
  {
    path: '',
    component: ManageJobsComponent,
    children: [{ path: 'manage-jobs', component: ManageJobsComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageJobRoutingModule {}