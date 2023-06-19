import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-find-a-candidate-filter',
  templateUrl: './find-a-candidate-filter.component.html',
  styleUrls: ['./find-a-candidate-filter.component.scss']
})
export class FindACandidateFilterComponent implements OnInit {
  advanceFilter:boolean = false;
  quickSearch:boolean = false;
  saveSearch = false;

  @Input() filterTerm: any ='';
  @Input() Jobs: any ='';
  @Input() viewLayout = ''; // decorate the property with @Input();
  @Output() layoutView = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
    this.layoutView.emit('grid');
  }

  filterHandler() {
    this.advanceFilter = !this.advanceFilter;
  }

  filterHideHandler() {
    this.advanceFilter = false;
  }

  quickHandler() {
    this.quickSearch = !this.quickSearch;
  }

  quickHideHandler() {
    this.quickSearch = false;
  }

  layoutSwitch(name: string){
    this.layoutView.emit(name);
  }

}
