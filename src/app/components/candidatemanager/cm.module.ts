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
import { RatingModule, StarRatingComponent } from 'ng-starrating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from "./search.pipe";
import { TooltipModule } from "ng2-tooltip-directive";
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { LoadActiveProjectsComponent } from './load-active-projects/load-active-projects.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { NgSelectModule } from '@ng-select/ng-select';
import { MatDialogModule, MatDialogRef } from "@angular/material";
import { StorageService } from "../../shared/services";
import { NgxSpinnerService } from "ngx-spinner";


@NgModule({
  imports: [CommonModule, SharedModule, CmRoutingModule, NgCircleProgressModule,ToastModule,
    RatingModule,TooltipModule, ReactiveFormsModule,FormsModule, NgSelectModule, MatDialogModule,ChartsModule],
  declarations: [CandidatemanagerComponent, DetailsComponent,SearchPipe, LoadActiveProjectsComponent],
  providers: [NgxSpinnerService, AppService, ApiService, StorageService,{
    provide: MatDialogRef,
    useValue: {}
  },],
  entryComponents:[LoadActiveProjectsComponent]
})
export class CmModule { }
