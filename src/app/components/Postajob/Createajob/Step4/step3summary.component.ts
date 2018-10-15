import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../../../../app.service';

@Component({
  selector: 'app-steps-step4-step3summary',
  templateUrl: './step3summary.component.html',
})
export class Step3SummaryComponent implements OnInit {
employmentType: any;
employmentTypeId: any;
  contractDuration: string;
contactExtension: string;
interviewTypeId: number;
interviewType: string;
reportinManagerId: number;
reportinManager: string;
teamMembers: any;
contractExtension: boolean;


  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService ) {
      this.appService.currentEmploymentType.subscribe((data) => {
        this.employmentTypeId = data.EmploymentTypeId; // And he have data here too!
        this.employmentType = data.EmploymentType;
      });
      this.appService.currentContractDuration.subscribe((data) => {
        this.contractDuration = data; // And he have data here too!
      });
      this.appService.currentInterviewType.subscribe((data) => {
        this.interviewTypeId = data.InterviewTypeId; // And he have data here too!
        this.interviewType = data.InterviewType;
      });
      this.appService.currentcustomerUsers.subscribe((data) => {
        this.reportinManagerId = data.UserId; // And he have data here too!
        this.reportinManager = data.FirstName;
      });
      // this.appService.addedteammembersChanged.subscribe((data) => {
      //   this.teamMembers = data; // And he have data here too!
      // });
  }


  ngOnInit() {
    // this.employmentType = '';
    // this.contractDuration = '';
    // this.contactExtension = '';
    // this.interviewType = '';
    // this.reportinManager = '';
    // this.teamMembers = '';

    // this.employmentTypeId = this.appService.employmentType.value.EmploymentTypeId;
    // this.employmentType = this.appService.employmentType.value.EmploymentType;
    if (this.employmentTypeId === 2) {
    this.contractExtension = true;
    }
    // this.contractDuration = this.appService.contractDuration.value;
    // this.interviewTypeId = this.appService.interviewType.value.InterviewTypeId;
    // this.interviewType = this.appService.interviewType.value.InterviewType;
    // this.reportinManagerId = this.appService.reportingManager.value.UserId;
    // this.reportinManager = this.appService.reportingManager.value.FirstName;
   this.teamMembers = this.appService.teammembers;
  }






}
