import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-job-activities-quick-search',
  templateUrl: './job-activities-quick-search.component.html',
  styleUrls: ['./job-activities-quick-search.component.scss']
})
export class QuickSearchComponent implements OnInit {
  @Input() quickSearch = false; // decorate the property with @Input();
  @Output("quickHideHandler") quickHideHandler: EventEmitter<any> = new EventEmitter();
  otherOption: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  dropHandler() {
    this.otherOption = !this.otherOption
  }
}
