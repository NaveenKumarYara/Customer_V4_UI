import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import  { SharedModule } from './../../shared/shared.module'
import  { PostAJobComponent  } from  './post-a-job.component';
import { PostAJobInformationComponent } from './post-a-job-information/post-a-job-information.component';
import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common'
import { CKEditorModule } from 'ckeditor4-angular';
import { PostAJobClientInformationComponent } from './post-a-job-client-information/post-a-job-client-information.component';
import { PostAJobAdditionalComponent } from './post-a-job-additional/post-a-job-additional.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { PostAJobSkillsComponent } from './post-a-job-skills/post-a-job-skills.component';

@NgModule({
	declarations: [
    PostAJobComponent,
    PostAJobInformationComponent,
    PostAJobClientInformationComponent,
    PostAJobAdditionalComponent,
    PostAJobSkillsComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		NgbAlertModule,
		NgbDatepickerModule,
		FormsModule,
		JsonPipe,
		CKEditorModule,
		NgxSliderModule
	],
	exports: [
    PostAJobComponent
	]
})

export class PostAJobModule{
}