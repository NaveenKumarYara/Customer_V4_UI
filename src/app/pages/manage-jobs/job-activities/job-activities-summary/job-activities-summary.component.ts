import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-activities-summary',
  templateUrl: './job-activities-summary.component.html',
  styleUrls: ['./job-activities-summary.component.scss']
})
export class JobActivitiesSummaryComponent implements OnInit {
  isChecked: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  changeView() {
    this.isChecked =  ! this.isChecked;
  }

}
