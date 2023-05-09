import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-manage-job-filters',
  templateUrl: './manage-job-filters.component.html',
  styleUrls: ['./manage-job-filters.component.scss']
})
export class ManageJobFiltersComponent implements OnInit {
  advanceFilter:boolean = false;
  quickSearch:boolean = false;
  saveSearch = false;
  @Input() filterTerm: any ='';
  @Input() viewLayout = ''; // decorate the property with @Input();
  @Output() layoutView = new EventEmitter<string>();

  constructor() { }
  ngOnInit(): void {
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
  
  saveClick() {
    this.saveSearch = !this.saveSearch;
  }
}
