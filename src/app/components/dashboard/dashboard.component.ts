import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {



  constructor(private route: ActivatedRoute,
    private router: Router) {

  }


  ngOnInit() {
  }



  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }



}
