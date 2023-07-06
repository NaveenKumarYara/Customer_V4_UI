import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-manage-quick-search',
  templateUrl: './manage-quick-search.component.html',
  styleUrls: ['./manage-quick-search.component.scss']
})
export class ManageQuickSearchComponent implements OnInit {
  @Input() quickSearch = false; // decorate the property with @Input();
  @Output("quickHideHandler") quickHideHandler: EventEmitter<any> = new EventEmitter();
  otherOption: boolean = false;
  selectedItem = 0;
  
  items = [
    { value: 'All Jobs'},
    { value: 'Inactive Jobs'},
    { value: 'Filled Jobs'},
    { value: 'Shortlisted Jobs'},
    { value: 'Interviewing Jobs'},
    { value: 'Active Jobs'}
  ]
  constructor() { }

  ngOnInit(): void {
  }

  dropHandler() {
    this.otherOption = !this.otherOption
  }
}
