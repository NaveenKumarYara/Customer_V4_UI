import { Component, OnInit, Input } from '@angular/core';
import { RecentJobs } from '../../../../models/recentjobs';

@Component({
  selector: 'app-dashboard-recentjobs',
  templateUrl: './dashboard-recentjobs.component.html',
  styleUrls: ['./dashboard-recentjobs.component.css']
})
export class DashboardRecentjobsComponent implements OnInit {
    @Input() recentjoblist: RecentJobs;

    constructor() { }


    

    ngOnInit() {
  }

}
