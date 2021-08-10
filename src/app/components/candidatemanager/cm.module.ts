import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CandidatemanagerComponent } from "./candidatemanager.component";
import { routing } from "./../../app.router";
import { DetailsComponent } from "./details/details.component";
import { SharedModule } from "../../shared/shared.module";
import { CmRoutingModule } from "./cm-routing.module";
import { NgCircleProgressModule } from 'ng-circle-progress';
import { AppService } from "../../app.service";
import { ApiService } from "../../shared/services/api.service/api.service";
import { RatingModule } from 'ng-starrating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [CommonModule, SharedModule, CmRoutingModule, NgCircleProgressModule, RatingModule, ReactiveFormsModule,FormsModule],
  declarations: [CandidatemanagerComponent, DetailsComponent],
  providers: [AppService, ApiService],
})
export class CmModule { }
