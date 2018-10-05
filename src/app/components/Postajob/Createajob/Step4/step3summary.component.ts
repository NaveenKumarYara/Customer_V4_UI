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
interviewType: number;
reportinManager: number;
teamMembers: any;
contractExtension: boolean;


  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService ) {

  }


  ngOnInit() {
    // this.employmentType = '';
    // this.contractDuration = '';
    // this.contactExtension = '';
    // this.interviewType = '';
    // this.reportinManager = '';
    // this.teamMembers = '';

    this.employmentType = this.appService.employmentType.value.EmploymentTypeId;
    if (this.employmentType === 2) {
    this.contractExtension = true;
    }
    this.contractDuration = this.appService.contractDuration.value;
    this.interviewType = this.appService.interviewType.value.InterviewTypeId;
    this.reportinManager = this.appService.reportingManager.value.UserId;
    this.teamMembers = this.appService.addedteammembers;
  }






}
