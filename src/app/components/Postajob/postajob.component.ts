import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-postajob',
  templateUrl: './postajob.component.html',
  styleUrls: ['./postajob.component.css']
})
export class PostajobComponent implements OnInit {



  constructor(private route: ActivatedRoute,
    private router: Router) {

  }


  ngOnInit() {
  }



  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }



}
