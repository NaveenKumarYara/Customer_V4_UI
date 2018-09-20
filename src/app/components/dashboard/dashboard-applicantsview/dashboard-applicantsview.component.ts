import { Component, OnInit, Input } from '@angular/core';
import {  ApplicantStatistics } from '../../../../models/applicantstatistics';

@Component({
  selector: 'app-dashboard-applicantsview',
  templateUrl: './dashboard-applicantsview.component.html',
  styleUrls: ['./dashboard-applicantsview.component.css']
})
export class DashboardApplicantsviewComponent implements OnInit {
    @Input() applicantStatistics: ApplicantStatistics;
  constructor() { }

  ngOnInit() {
  }

}
