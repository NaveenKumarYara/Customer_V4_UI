import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.css']
})
export class DashboardContentComponent implements OnInit {

 
  constructor( private router: Router) {

  }

  ngOnInit() {
  }
  exploremore()
  {
    this.router.navigateByUrl('app-manage-jobs');
  }

}
