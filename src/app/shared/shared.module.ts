import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoHeaderComponent } from './logoheader/logoheader.component';
import { AgmCoreModule } from '@agm/core';
import { routing } from '../app.router';
import { AppService } from '../app.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    routing,
   FormsModule, ReactiveFormsModule
  ],
  providers: [AppService],
  declarations: [ LogoHeaderComponent],
  exports: [LogoHeaderComponent]
})
export class SharedModule { }
