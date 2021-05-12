import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CandidatemanagerComponent } from "./candidatemanager.component";
import { routing } from "./../../app.router";
import { DetailsComponent } from "./details/details.component";
import { SharedModule } from "../../shared/shared.module";
import { CmRoutingModule } from "./cm-routing.module";

@NgModule({
  imports: [CommonModule, SharedModule, CmRoutingModule],
  declarations: [CandidatemanagerComponent, DetailsComponent],
})
export class CmModule {}
