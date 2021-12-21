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
import { SearchPipe } from "./search.pipe";
import { TooltipModule } from "ng2-tooltip-directive";
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { LoadActiveProjectsComponent } from './load-active-projects/load-active-projects.component';

import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [CommonModule, SharedModule, CmRoutingModule, NgCircleProgressModule,ToastModule, RatingModule,TooltipModule, ReactiveFormsModule,FormsModule, NgSelectModule],
  declarations: [CandidatemanagerComponent, DetailsComponent,SearchPipe, LoadActiveProjectsComponent],
  providers: [AppService, ApiService],
  entryComponents:[LoadActiveProjectsComponent]
})
export class CmModule { }
