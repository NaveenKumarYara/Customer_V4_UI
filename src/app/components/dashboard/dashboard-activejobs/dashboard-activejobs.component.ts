import { Component, OnInit,Input } from '@angular/core';
import { DashboardStatistics } from '../../../../models/dashboardstatistics';

@Component({
  selector: 'app-dashboard-activejobs',
  templateUrl: './dashboard-activejobs.component.html',
  styleUrls: ['./dashboard-activejobs.component.css']
})
export class DashboardActivejobsComponent implements OnInit {
   @Input() dashboardstatistics: DashboardStatistics;

  constructor() { }

  ngOnInit() {
  }

}
