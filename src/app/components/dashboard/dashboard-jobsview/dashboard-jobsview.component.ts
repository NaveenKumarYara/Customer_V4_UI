import { Component, OnInit, Input } from '@angular/core';
import { DashboardStatistics } from '../../../../models/dashboardstatistics';
import {  ApplicantStatistics } from '../../../../models/applicantstatistics';

@Component({
  selector: 'app-dashboard-jobsview',
  templateUrl: './dashboard-jobsview.component.html',
  styleUrls: ['./dashboard-jobsview.component.css']
})
export class DashboardJobsviewComponent implements OnInit {
    @Input() dashboardstatistics: DashboardStatistics;applicantstatistics: ApplicantStatistics;
  constructor() { }

  ngOnInit() {
  }

}
