import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-steps-step1-jobprofile',
  templateUrl: './jobprofile.component.html',
  styleUrls: ['./jobprofile.component.css']
})
export class JobprofileComponent implements OnInit {



  constructor(private route: ActivatedRoute,
    private router: Router) {

  }


  ngOnInit() {
  }






}
