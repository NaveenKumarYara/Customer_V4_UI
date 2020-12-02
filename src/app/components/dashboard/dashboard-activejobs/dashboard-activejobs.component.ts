import { Component, OnInit, Input } from '@angular/core';
import { DashboardStatistics } from '../../../../models/dashboardstatistics';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard-activejobs',
  templateUrl: './dashboard-activejobs.component.html',
  styleUrls: ['./dashboard-activejobs.component.css']
})
export class DashboardActivejobsComponent implements OnInit {
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


  ActiveJobsClick(sort) {
    let sortBy;
    if (sort > 0) {
      sortBy = sort;
    } else {
      sortBy = 0;
    }
    localStorage.setItem('sortBy', JSON.stringify(sortBy));
    localStorage.setItem('dashboard','1');
    this.router.navigateByUrl('app-manage-jobs');
  }
}
