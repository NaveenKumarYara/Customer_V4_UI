import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html'  
})
export class SearchresultsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
  }

}
