import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import  { SharedModule } from './../../shared/shared.module'
import { FindACandidateComponent } from './find-a-candidate.component';
import { FindACandidateFilterComponent } from './find-a-candidate-filter/find-a-candidate-filter.component';
import { FindACandidateAdvanceSearchComponent } from './find-a-candidate-advance-search/find-a-candidate-advance-search.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FindACandidateGridComponent } from './find-a-candidate-grid/find-a-candidate-grid.component';
import { FindACandidateTableComponent } from './find-a-candidate-table/find-a-candidate-table.component';
import { FindACandidateCardComponent } from './find-a-candidate-card/find-a-candidate-card.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
	declarations: [
		FindACandidateComponent,
		FindACandidateFilterComponent,
		FindACandidateAdvanceSearchComponent,
		FindACandidateGridComponent,
		FindACandidateTableComponent,
		FindACandidateCardComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		NgxPaginationModule,
		CarouselModule,
		NgCircleProgressModule.forRoot({
			radius: 100,
			outerStrokeWidth: 16,
			innerStrokeWidth: 8,
			outerStrokeColor: "#78C000",
			innerStrokeColor: "#C7E596",
			animationDuration: 300,
			titleFontSize: '16',
			space: -5	
		}),
	],
	exports: [
    FindACandidateComponent
	]
})

export class FindACandidateModule{
}