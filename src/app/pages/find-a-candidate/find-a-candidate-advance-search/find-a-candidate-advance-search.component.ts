import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-find-a-candidate-advance-search',
  templateUrl: './find-a-candidate-advance-search.component.html',
  styleUrls: ['./find-a-candidate-advance-search.component.scss']
})
export class FindACandidateAdvanceSearchComponent implements OnInit {
  @Input() advanceFilter = false; // decorate the property with @Input();
  @Output("filterHideHandler") filterHideHandler: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
