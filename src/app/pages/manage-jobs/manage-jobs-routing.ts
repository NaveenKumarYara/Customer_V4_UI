import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageJobsComponent } from './manage-jobs.component';
import { ManageLoadJobsComponent } from './manage-load-jobs/manage-load-jobs.component';
import  { JobActivitiesComponent } from './job-activities/job-activities.component';

const routes: Routes = [
  {
    path: '',
    component: ManageJobsComponent,
    children: [
      { 
        path: '', 
        component: ManageLoadJobsComponent 
      },
      {
        path: 'job-activites',
        component: JobActivitiesComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageJobRoutingModule {}