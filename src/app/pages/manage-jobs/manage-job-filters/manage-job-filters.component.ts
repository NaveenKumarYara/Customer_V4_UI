import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-job-filters',
  templateUrl: './manage-job-filters.component.html',
  styleUrls: ['./manage-job-filters.component.scss']
})
export class ManageJobFiltersComponent implements OnInit {
  advanceFilter:boolean = false;
  quickSearch:boolean = false;
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
}
