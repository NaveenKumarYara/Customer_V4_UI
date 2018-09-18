import { Component, OnInit, Input } from '@angular/core';
import { DashboardStatistics } from '../../../../models/dashboardstatistics';

@Component({
  selector: 'app-dashboard-scheduled-interview',
  templateUrl: './dashboard-scheduled-interview.component.html',
  styleUrls: ['./dashboard-scheduled-interview.component.css']
})
export class DashboardScheduledInterviewComponent implements OnInit {
    @Input() dashboardstatistics: DashboardStatistics;

  constructor() { }

  ngOnInit() {
  }

}
