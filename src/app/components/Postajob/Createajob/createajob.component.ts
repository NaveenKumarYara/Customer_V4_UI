import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-createajob',
  templateUrl: './createajob.component.html'  
})
export class CreateajobComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
  }

}
