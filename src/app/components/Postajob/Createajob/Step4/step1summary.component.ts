import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../../../../app.service';

@Component({
  selector: 'app-steps-step4-step1summary',
  templateUrl: './step1summary.component.html',
})
export class Step1SummaryComponent implements OnInit {

jobCategory :any;
jobTitle:any;
minExp:number;
maxExp:number;
hasDescription:boolean;
completeDescription:string;
primarySkills:any;
secondarySkills:any;
roles:any;

  constructor(private route: ActivatedRoute,
    private router: Router,  private appService: AppService) {

  }


  ngOnInit() {
  }






}
