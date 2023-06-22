import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CandidatemanagerComponent } from "./candidatemanager.component";
import { DetailsComponent } from "./details/details.component";

const routes: Routes = [
  {
    path: "",
    component: CandidatemanagerComponent,
    children: [
      { path: "", redirectTo: "details", pathMatch: "full" },
      { path: "details", component: DetailsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CmRoutingModule {}
