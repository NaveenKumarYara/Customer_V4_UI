import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-users',
  templateUrl: './dashboard-users.component.html',
  styleUrls: ['./dashboard-users.component.scss']
})
export class DashboardUsersComponent implements OnInit {
  cardMatching: boolean = false;
  @Input() UserStats: any ='';
  cardID: boolean = false;
  cardExp: boolean = false;
  cardMatchingTitle: any = '';
  cardClosed: boolean = false;
  cardAssigned: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
