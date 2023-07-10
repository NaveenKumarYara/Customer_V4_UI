import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-job-card',
  templateUrl: './dashboard-job-card.component.html',
  styleUrls: ['./dashboard-job-card.component.scss']
})
export class DashboardJobCardComponent implements OnInit {
  @Input() cardProfileSummary: boolean = false;
  @Input() cardJobId: boolean = false;
  @Input() cardAryticId: boolean = false;
  @Input() cardNav: boolean = false
  @Input() cardInterviewStatus: boolean = false
  @Input() cardLocation: boolean = false;
  @Input() cardDate: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
