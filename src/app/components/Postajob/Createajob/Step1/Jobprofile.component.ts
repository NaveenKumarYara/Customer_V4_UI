import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
declare var  $: any ;
@Component({
  selector: 'app-steps-step1-jobprofile',
  templateUrl: './jobprofile.component.html',
  styleUrls: ['./jobprofile.component.css']
})
export class JobprofileComponent implements OnInit {
declare;
hasDescription = true;
completeDescription: string;

  constructor(private route: ActivatedRoute,
    private router: Router) {

  }

  setValue(val) {
    if (!val) {
      $('#completeDescription').attr('disable', true);
    } else {
      $('#completeDescription').attr('disable', false);
    }
  }
  ngOnInit() {
  }






}
