import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageJobsComponent } from './manage-jobs.component';
import  { SharedModule } from './../../shared/shared.module'

@NgModule({
	declarations: [
    ManageJobsComponent
	],
	imports: [
	 CommonModule,
	 SharedModule
	],
	exports: [
    ManageJobsComponent
	]
})

export class ManageJobModule{
}