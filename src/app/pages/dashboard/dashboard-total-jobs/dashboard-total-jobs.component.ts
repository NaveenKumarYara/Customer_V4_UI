import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-total-jobs',
  templateUrl: './dashboard-total-jobs.component.html',
  styleUrls: ['./dashboard-total-jobs.component.scss']
})
export class DashboardTotalJobsComponent implements OnInit {
  @Input() AdminStats: any ='';
  constructor() { }

  ngOnInit(): void {
  }

}
