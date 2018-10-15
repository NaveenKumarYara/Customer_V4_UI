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

      // this.appService.adddomainChanged.subscribe((data) => {
      //   this.domain = data; // And he have data here too!
      // });
      this.appService.currentlocation.subscribe((data) => {
        this.location = data.location; // And he have data here too!
      });
      this.appService.currentOpenings.subscribe((data) => {
        this.noOfopenings = data; // And he have data here too!
      });
      // this.appService.personTypeSingleChanged.subscribe((data) => {
      //   this.personType = data; // And he have data here too!
      // });
      // this.appService.addqualificationsChanged.subscribe((data) => {
      //   this.education = data; // And he have data here too!
      // });
  }


  ngOnInit() {
    // this.noOfopenings = this.appService.noofOpenings.value;
    // this.location = this.appService.location.value.location;
     this.education = this.appService.qualifications;
    this.domain = this.appService.domain;
     this.personType = this.appService.personTypes;

  }






}
