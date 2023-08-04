import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import  { SharedModule } from './../../shared/shared.module'
import  { PostAJobComponent  } from  './post-a-job.component';
import { PostAJobInformationComponent } from './post-a-job-information/post-a-job-information.component';
import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct,NgbDropdownModule,NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common'
import { CKEditorModule } from 'ckeditor4-angular';
import { PostAJobClientInformationComponent } from './post-a-job-client-information/post-a-job-client-information.component';
import { PostAJobAdditionalComponent } from './post-a-job-additional/post-a-job-additional.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { PostAJobSkillsComponent } from './post-a-job-skills/post-a-job-skills.component';
import { PostAJobSalaryLocationComponent } from './post-a-job-salary-location/post-a-job-salary-location.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { SpyDirective, SpyTargetDirective, SpyTargetContainerDirective } from '@thejlifex/ngx-scroll-spy';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({	
	declarations: [
    PostAJobComponent,
    PostAJobInformationComponent,
    PostAJobClientInformationComponent,
    PostAJobAdditionalComponent,
    PostAJobSkillsComponent,
    PostAJobSalaryLocationComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
		NgbAlertModule,
		NgbDropdownModule,
		NgSelectModule,
		NgbDatepickerModule,
		FormsModule,
		JsonPipe,
		CKEditorModule,
		NgxSliderModule,
		NgbRatingModule,
		NgMultiSelectDropDownModule.forRoot(),
		SpyDirective,
    SpyTargetDirective,
    SpyTargetContainerDirective,
		NgCircleProgressModule.forRoot({
			radius: 100,
			outerStrokeWidth: 16,
			innerStrokeWidth: 8,
			outerStrokeColor: "#78C000",
			innerStrokeColor: "#C7E596",
			animationDuration: 300,
			titleFontSize: '16',
			space: -5
		})
	],
	exports: [
    PostAJobComponent
	]
})

export class PostAJobModule{
}