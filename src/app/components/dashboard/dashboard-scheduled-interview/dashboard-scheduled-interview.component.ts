import { Component, OnInit, Input } from '@angular/core';
import { DashboardStatistics } from '../../../../models/dashboardstatistics';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-scheduled-interview',
  templateUrl: './dashboard-scheduled-interview.component.html',
  styleUrls: ['./dashboard-scheduled-interview.component.css']
})
export class DashboardScheduledInterviewComponent implements OnInit {
    @Input() dashboardstatistics: DashboardStatistics;

  constructor( private router: Router) {

   }

  ngOnInit() {
  }

  InterViewScheduledClick(sort) {
    let sortBy;
    if (sort > 0) {
      sortBy = sort;
    } else {
      sortBy = 0;
    }
    localStorage.setItem('sortBy', JSON.stringify(sortBy));
    this.router.navigateByUrl('app-manage-jobs');
  }
  Schedule()
  {
    this.router.navigateByUrl('app-interviewList');
  }
}
