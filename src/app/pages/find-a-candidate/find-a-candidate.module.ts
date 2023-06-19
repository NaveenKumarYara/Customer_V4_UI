import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import  { SharedModule } from './../../shared/shared.module'
import { FindACandidateComponent } from './find-a-candidate.component';
import { FindACandidateFilterComponent } from './find-a-candidate-filter/find-a-candidate-filter.component';
import { FindACandidateAdvanceSearchComponent } from './find-a-candidate-advance-search/find-a-candidate-advance-search.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FindACandidateGridComponent } from './find-a-candidate-grid/find-a-candidate-grid.component';

@NgModule({
	declarations: [
    FindACandidateComponent,
    FindACandidateFilterComponent,
    FindACandidateAdvanceSearchComponent,
		FindACandidateGridComponent
	],
	imports: [
	 CommonModule,
	 SharedModule,
	 NgxPaginationModule
	],
	exports: [
    FindACandidateComponent
	]
})

export class FindACandidateModule{
}