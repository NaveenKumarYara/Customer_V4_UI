import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import  { SharedModule } from './../../shared/shared.module'
import { CandidateProfileComponent } from './candidate-profile.component';
import { CandidateProfileSummaryComponent } from './candidate-profile-summary/candidate-profile-summary.component';

@NgModule({	
	declarations: [
    CandidateProfileComponent,
    CandidateProfileSummaryComponent
	],
	imports: [
		CommonModule,
		SharedModule
	],
	exports: [
    CandidateProfileComponent
	]
})

export class CandidateProfileModule{
}