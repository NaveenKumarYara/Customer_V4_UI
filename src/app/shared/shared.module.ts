import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoHeaderComponent } from './logoheader/logoheader.component';
import { AgmCoreModule } from '@agm/core';
import { routing } from '../app.router';
import {AlertComponent} from './alerts/alerts.component';
import { AppService } from '../app.service';
import { AlertService} from './alerts/alerts.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    routing,
   FormsModule, ReactiveFormsModule
  ],
  providers: [AppService, AlertService],
  declarations: [LogoHeaderComponent, AlertComponent],
  exports: [LogoHeaderComponent, AlertComponent]
})
export class SharedModule { }
