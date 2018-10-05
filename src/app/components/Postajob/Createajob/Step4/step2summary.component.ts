import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../../../../app.service';

@Component({
  selector: 'app-steps-step4-step2summary',
  templateUrl: './step2summary.component.html',
})
export class Step2SummaryComponent implements OnInit {

noOfopenings: number;
location: any;
education: any;
domain: any;
personType: any;
  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {

  }


  ngOnInit() {
    this.noOfopenings = this.appService.noofOpenings.value;
    // this.location =this.locations.location;
    this.education = this.appService.addqualifications;
    this.domain = this.appService.adddomain;
    this.personType = this.appService.personTypes;

  }






}
