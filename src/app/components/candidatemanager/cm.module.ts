import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CandidatemanagerComponent } from "./candidatemanager.component";
import { DetailsComponent } from "./details/details.component";
import { SharedModule } from "../../shared/shared.module";
import { CmRoutingModule } from "./cm-routing.module";
import { NgCircleProgressModule } from 'ng-circle-progress';
import { RatingModule } from 'ng-starrating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from "./search.pipe";
import { TooltipModule } from "ng2-tooltip-directive";
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { LoadActiveProjectsComponent } from './load-active-projects/load-active-projects.component';

import { NgSelectModule } from '@ng-select/ng-select';
// import { DxButtonModule, DxFilterBuilderModule } from "devextreme-angular";
import { FitlerComponent } from "../../shared";
import { ApiService, StorageService } from "../../shared/services";
import { AppService } from "../../app.service";
import { ModalDialogModule } from "ngx-modal-dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { MatDialogModule , MatCardModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatPaginatorModule,
  MatSortModule,
  MatRadioModule,
  MatSnackBarModule,
  MatSelectModule,
  MatInputModule,
  MatAutocompleteModule} from '@angular/material';
import { InternationalPhoneModule } from "ng4-intl-phone";

@NgModule({
  imports: [CommonModule, SharedModule, CmRoutingModule, NgCircleProgressModule,ToastModule, RatingModule,TooltipModule, 
    ReactiveFormsModule,FormsModule, NgSelectModule, ModalDialogModule.forRoot(),
    //DxFilterBuilderModule,
    //DxButtonModule,
    MatDialogModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatSortModule,
    MatRadioModule,
    MatSnackBarModule,
    MatSelectModule,
    MatInputModule,
    MatAutocompleteModule,
    InternationalPhoneModule],
  declarations: [CandidatemanagerComponent, DetailsComponent,SearchPipe, LoadActiveProjectsComponent, FitlerComponent],
  providers: [AppService, ApiService, StorageService,{
    provide: MatDialogRef,
    useValue: {}
  }],
  entryComponents:[LoadActiveProjectsComponent]
})
export class CmModule { }
