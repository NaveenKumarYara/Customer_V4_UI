import { Component, OnInit, Input } from '@angular/core';
import { DashboardStatistics } from '../../../../models/dashboardstatistics';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard-scheduled-interview',
  templateUrl: './dashboard-scheduled-interview.component.html',
  styleUrls: ['./dashboard-scheduled-interview.component.css']
})
export class DashboardScheduledInterviewComponent implements OnInit {
  dashboardstatistics: DashboardStatistics;
    customer:any;
    customerId:any;
    userId:any;
    constructor(private route: ActivatedRoute,private router: Router, private dashboardservice: DashboardService) { 
      this.customer = JSON.parse(sessionStorage.getItem('userData'));
      this.customerId =this.customer.CustomerId;
      this.userId=this.customer.UserId;
  }
  ngOnInit() {
    this.populateDashboardallStatistics();
  }

  populateDashboardallStatistics() {
    return this.dashboardservice.getDashboardStatistics(this.customerId,this.userId,0).subscribe(res => {
        this.dashboardstatistics = res;
    });
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
