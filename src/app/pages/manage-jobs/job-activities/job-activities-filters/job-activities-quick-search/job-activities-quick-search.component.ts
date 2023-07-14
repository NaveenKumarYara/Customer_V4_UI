import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-job-activities-quick-search',
  templateUrl: './job-activities-quick-search.component.html',
  styleUrls: ['./job-activities-quick-search.component.scss']
})
export class QuickSearchComponent implements OnInit {
  @Input() quickSearch = false; // decorate the property with @Input();
  @Input() items:any;
  @Output("quickHideHandler") quickHideHandler: EventEmitter<any> = new EventEmitter();
  @Output("quicksort") quicksort: EventEmitter<any> = new EventEmitter();
  otherOption: boolean = false;
  selectedItem = 0;
  constructor() { }

  ngOnInit(): void {
  }

  changeStatus(val: any)
  {
    this.quicksort.emit(val);
  }

  clear(val: any)
  {
    this.selectedItem = 0;
    this.quicksort.emit(val);
  }


  dropHandler() {
    this.otherOption = !this.otherOption
  }
}
