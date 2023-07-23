import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import  { SharedModule } from './../../shared/shared.module'
import { CandidateProfileComponent } from './candidate-profile.component';
import { CandidateProfileSummaryComponent } from './candidate-profile-summary/candidate-profile-summary.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgbAlertModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';  
import { NgIf } from '@angular/common';
import { CandidateProfileDetailComponent } from './candidate-profile-detail/candidate-profile-detail.component';
import { CandidateJobHistoryComponent } from './candidate-job-history/candidate-job-history.component';
import { CandidateDocumentsComponent } from './candidate-documents/candidate-documents.component';

@NgModule({	
	declarations: [
    CandidateProfileComponent,
    CandidateProfileSummaryComponent,
    CandidateProfileDetailComponent,
    CandidateJobHistoryComponent,
    CandidateDocumentsComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		NgbNavModule,
		NgIf,
		NgbAlertModule,
		NgCircleProgressModule.forRoot({
			radius: 100,
			outerStrokeWidth: 16,
			innerStrokeWidth: 8,
			outerStrokeColor: "#78C000",
			innerStrokeColor: "#C7E596",
			animationDuration: 300,
			titleFontSize: '16'
		}),
	],
	exports: [
    CandidateProfileComponent
	]
})

export class CandidateProfileModule{
}