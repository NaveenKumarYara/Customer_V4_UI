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

  InterViewScheduledClick(){
    this.router.navigateByUrl('app-manage-jobs');
  }

}
