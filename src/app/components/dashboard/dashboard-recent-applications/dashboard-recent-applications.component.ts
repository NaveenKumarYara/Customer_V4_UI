import { Component, OnInit, Input } from '@angular/core';
import { RecentApplicants } from '../../../../models/recentapplicants';

@Component({
  selector: 'app-dashboard-recent-applications',
  templateUrl: './dashboard-recent-applications.component.html',
  styleUrls: ['./dashboard-recent-applications.component.css']
})
export class DashboardRecentApplicationsComponent implements OnInit {
    @Input() recentapplicantlist: any;

  constructor() { }
  add3Dots(string, limit) {
    const dots = '...';
    if (string.length > limit) {
      string = string.substring(0, limit) + dots;
    }
      return string;
  }

  ngOnInit() {
  }

}
