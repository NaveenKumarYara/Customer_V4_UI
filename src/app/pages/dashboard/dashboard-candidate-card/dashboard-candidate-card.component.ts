import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-candidate-card',
  templateUrl: './dashboard-candidate-card.component.html',
  styleUrls: ['./dashboard-candidate-card.component.scss']
})
export class DashboardCandidateCardComponent implements OnInit {
  @Input() cardMatching: boolean = false;
  @Input() cardID: boolean = false;
  @Input() cardExp: boolean = false;
  @Input() cardMatchingTitle: any = '';
  @Input() cardAssigned: boolean = false;
  @Input() cardClosed: boolean = false;
  @Input() cardStatus: boolean = true;
  @Input() cardPriority: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
