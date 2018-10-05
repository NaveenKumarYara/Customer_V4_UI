import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../../../../app.service';

@Component({
  selector: 'app-steps-step4-step3summary',
  templateUrl: './step3summary.component.html',
})
export class Step3SummaryComponent implements OnInit {
employmentType: any;
  contractDuration: string;
contactExtension: string;
interviewType: any;
reportinManager: any;
teamMembers: any;



  constructor(private route: ActivatedRoute,
    private router: Router, private appservice: AppService ) {

  }


  ngOnInit() {
  }






}
