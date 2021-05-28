import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InterviewListComponent } from "./GetInterviewJobsList/interviewList.component";
import { LoadJoblistComponent } from "./load-joblist/load-joblist.component";
import { ManageJobsComponent } from "./manage-jobs.component";

const routes: Routes = [
  {
    path: "",
    component: ManageJobsComponent,
    children: [
      { path: "", redirectTo: "app-manage-load-joblist/1", pathMatch: "full" },
      { path: "app-manage-load-joblist/:id", component: LoadJoblistComponent },
      { path: "app-interviewList", component: InterviewListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagejobsRoutingModule {}
