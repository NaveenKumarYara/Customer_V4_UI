import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-navigationcomponent',
  templateUrl: './navigationcomponent.component.html',
  styleUrls: ['./navigationcomponent.component.css']
})
export class NavigationcomponentComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

}
