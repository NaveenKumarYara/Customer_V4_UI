import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../../../../app.service';
import { InsertJob, PjDepartments } from '../../models/jobPostInfo';
import { Location } from '@angular/common';
import { StepsComponent } from '../steps.component';
@Component({
  selector: 'app-steps-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.css']
})
export class Step4Component implements OnInit {
// step1
  insertJob = new InsertJob();
  jobCategory: number;
  jobMinExp: number;
  jobMaxExp: number;
  jobTitle: string;
  jobDescription: string;
  jobHasDescription: boolean;
  jobResponsibility: any;
  jobSkillsPrimary: any;
  jobSkillsSecondary: any;
  departments: any;
  client: any;
  pjDepartments:  PjDepartments[] = [];
// step2
  domain: any;
  locations: any;
  openings: any;
  personalityType: any;
  qualification: any;
// step3
  contractDuration: any;
  contractExtension: any;
  empType: any;
  complete: any;
  salaryType: any;
  intwType: any;
  reporting: any;
  customer: any;
  userId: any;
  customerId: any;
  team: any;
  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService, private location: Location, private steps: StepsComponent) {
      this.customer = JSON.parse(sessionStorage.getItem('userData'));
      this.customerId = this.customer.CustomerId;
      this.complete = JSON.parse(localStorage.getItem('completed'));
      this.userId = this.customer.UserId;
      this.appService.currentcategorytitle.subscribe((data) => {
        this.jobCategory = data.JobCategoryId; // And he have data here too!
    });
    this.appService.currentjobtitle.subscribe((data) => {
      this.jobTitle = data; // And he have data here too!
    });
    this.appService.currentminExp.subscribe((data) => {
      this.jobMinExp = data; // And he have data here too!
    });
    this.appService.currentmaxExp.subscribe((data) => {
      this.jobMaxExp = data; // And he have data here too!
    });
    this.appService.addedresponsibilitiesChanged.subscribe((data) => {
      this.jobResponsibility = data; // And he have data here too!
    });
    this.appService.currentDescriptionChecked.subscribe((data) => {
      this.jobHasDescription = data; // And he have data here too!
    });
    this.appService.currentDescription.subscribe((data) => {
      this.jobDescription = data; // And he have data here too!
    });
    this.appService.jobprimaryskillsChanged.subscribe((data) => {
      this.jobSkillsPrimary = data; // And he have data here too!
    });
    this.appService.jobsecondaryskillsChanged.subscribe((data) => {
      this.jobSkillsSecondary = data; // And he have data here too!
    });
    this.appService.currentClient.subscribe((data) => {
      this.client = data; // And he have data here too!
    });
    this.appService.addeddepartmentsChanged.subscribe((data) => {
      this.departments = data; // And he have data here too!
    });
    // step2:

    this.appService.adddomainChanged.subscribe((data) => {
      this.domain = data; // And he have data here too!
    });
    this.appService.currentlocation.subscribe((data) => {
      this.locations = data.CityId; // And he have data here too!
    });
    this.appService.currentOpenings.subscribe((data) => {
      this.openings = data; // And he have data here too!
    });
    this.appService.personTypeSingleChanged.subscribe((data) => {
      this.personalityType = data; // And he have data here too!
    });
    this.appService.addqualificationsChanged.subscribe((data) => {
      this.qualification = data; // And he have data here too!
    });

    // step3:

    this.appService.currentEmploymentType.subscribe((data) => {
      this.empType = data.EmploymentTypeId; // And he have data here too!
    });
    this.appService.currentSalaryTYpe.subscribe((data) => {
      this.salaryType = data.SalaryTypeId; // And he have data here too!
    });
    this.appService.currentContractDuration.subscribe((data) => {
      this.contractDuration = data; // And he have data here too!
    });
    this.appService.currentInterviewType.subscribe((data) => {
      this.intwType = data.InterviewTypeId; // And he have data here too!
    });
    this.appService.currentcustomerUsers.subscribe((data) => {
      this.reporting = data.UserId; // And he have data here too!
    });
    this.appService.addedteammembersChanged.subscribe((data) => {
      this.team = data; // And he have data here too!
    });
  }


  ngOnInit() {
  }

  postJob(step) {
    const res = localStorage.getItem('jobId');
    this.insertJob.JobId = parseInt(res, 10);
    this.insertJob.CustomerId = this.customerId;
    this.insertJob.UserId = this.userId;
    this.insertJob.JobPositionId = '';

    this.insertJob.JobCategoryId = this.jobCategory; // this.appService.jobcategory.value.JobCategoryId;
    this.insertJob.JobTitle = this.jobTitle; // this.appService.jobtitle.value;
    this.insertJob.MinExperienceId = this.jobMinExp; // this.appService.minExperience.value;
    this.insertJob.MaxExperienceId = this.jobMaxExp;  // this.appService.maxExperience.value;
    this.insertJob.XmlRoleId =  this.appService.addedresponsibilities; // this.jobResponsibility ;
    this.insertJob.CompleteDescription = this.jobHasDescription; // this.appService.hasDescription.value;
    this.insertJob.JobDescription = this.jobDescription; // this.appService.description.value;
    this.insertJob.XmlSkills =  this.appService.primaryjobskills.concat( this.appService.secondaryjobskills);
    // this.jobSkillsPrimary.concat(this.jobSkillsSecondary);
    this.insertJob.ClientId = this.client.ClientId;
    this.insertJob.ClientName = this.insertJob.ClientId > 0 ? '' : this.client.ClientName ;
    // this.insertJob.ClientId = parseInt(localStorage.getItem('clientId'), 10);
    // this.insertJob.ClientName = localStorage.getItem('clientName');
    this.insertJob.XmlDepartment = this.appService.addeddepartments; // this.pjDepartments; //  this.departments;
    // step2

    this.insertJob.NumberOfVacancies = this.openings; // this.appService.noofOpenings.value;
    this.insertJob.PreferredLocationId = this.locations ; // this.appService.location.value.locationId.toString();
    this.insertJob.XmlQualifications = this.appService.addqualifications; //  this.qualification;
    this.insertJob.XmlDomains = this.appService.adddomain; // this.domain;
     this.insertJob.XmlPersonType = this.appService.personTypeSingle; //  this.personalityType;



    // this.insertJob.JobCategoryId = this.appService.jobcategory.value.JobCategoryId;
    // this.insertJob.JobTitle = this.appService.jobtitle.value;
    // this.insertJob.XmlSkills = this.appService.primaryjobskills.concat(this.appService.secondaryjobskills);

    // this.insertJob.MinExperienceId = this.appService.minExperience.value;
    // this.insertJob.MaxExperienceId = this.appService.maxExperience.value;
    // this.insertJob.XmlRoleId = this.appService.addedresponsibilities;
    // this.insertJob.CompleteDescription = this.appService.hasDescription.value;
    // this.insertJob.JobDescription = this.appService.description.value;
    // this.insertJob.SalaryTypeId = 1;
    // this.insertJob.MinimumSalary = '1';
    // this.insertJob.MaximumSalary = '200';

    // this.insertJob.NumberOfVacancies = this.appService.noofOpenings.value;
    // this.insertJob.PreferredLocationId = this.appService.location.value.locationId.toString();
    // this.insertJob.XmlQualifications = this.appService.addqualifications;
    // this.insertJob.XmlDomains = this.appService.adddomain;
    //  this.insertJob.XmlPersonType = this.appService.personTypeSingle;



    this.insertJob.EmploymentTypeId = this.empType; // this.appService.employmentType.value.EmploymentTypeId;
   // if (localStorage.getItem('EditMode') != null && this.insertJob.JobId > 0) {
      // this.appService.currentEmploymentType.subscribe((data) => {
      //   this.insertJob.EmploymentTypeId = data.EmploymentTypeId; // And he have data here too!
      // });
    if (this.insertJob.EmploymentTypeId === 2) {
      this.appService.currentContractExtension.subscribe((data) => {
        this.insertJob.WorkAuthorizationId = data.WorkAuthorizationId; // And he have data here too!
      });
      this.appService.currentContractDuration.subscribe((data) => {
        this.insertJob.ContractDuration = data; // And he have data here too!
      });
    }
    this.insertJob.SalaryTypeId = this.salaryType;
    if (this.insertJob.EmploymentTypeId === 2) {
      this.appService.currentMinRate.subscribe(x => this.insertJob.MinimumSalary = x.toString());
      this.appService.currentMaxRate.subscribe(x => this.insertJob.MaximumSalary = x.toString());
    } else if (this.insertJob.EmploymentTypeId === 1) {
      this.appService.currentMinHourlyRate.subscribe(x => this.insertJob.MinimumSalary = x.toString());
      this.appService.currentMaxHourlyRate.subscribe(x => this.insertJob.MaximumSalary = x.toString());
      // this.insertJob.ContractExtended = true;
      // this.insertJob.ContractDuration = this.contractDuration;
     }
    // this.insertJob.MinimumSalary = this.insertJob.SalaryTypeId==1?this.appService.currentMinRate.subscribe(x => this.insertJob.MinimumSalary = x) :this.appService.currentMinHourlyRate.subscribe(x => this.insertJob.MinimumSalary= x);
    // this.insertJob.MaximumSalary =  this.insertJob.SalaryTypeId==1?this.appService.currentMaxRate.subscribe(x => this.maxAnnualRate = x):    this.appService.currentMaxHourlyRate.subscribe(x => this.maxHourRate = x);
    this.insertJob.IsDrafted = false;
    this.insertJob.StepNumber = 4;
    // }
  //   else {
  //   this.insertJob.EmploymentTypeId = 1;
  //   this.insertJob.SalaryTypeId = 1;
  //   this.insertJob.MinimumSalary = '1';
  //   this.insertJob.MaximumSalary = '200';
  //   this.insertJob.IsDrafted = false;
  //   this.insertJob.StepNumber = 4;
  // }
  //   if (this.insertJob.EmploymentTypeId === 2) {
  //   this.insertJob.ContractExtended = true;
  //   this.insertJob.ContractDuration = this.contractDuration;
  // } // this.appService.contractDuration.value;
    this.insertJob.HiringProcessId = this.intwType; // this.appService.interviewType.value.InterviewTypeId;
    this.insertJob.HiringManagerId = this.reporting; // this.appService.reportingManager.value.UserId;
    this.insertJob.XmlTechnicalTeam = this.appService.addedteammembers; // this.team;
    this.appService.postjob(this.insertJob).subscribe(data => {
      if (data) {
        // this.insertJob.JobId = data;
        // window.location.href = '/app-manage-jobs/app-manage-load-joblist/1';
        // this.location.go('/app-manage-jobs/app-manage-load-joblist/1');
         this.router.navigate(['/app-manage-jobs/app-manage-load-joblist/1']);
      }
    });
  }

  backtoStep3() {
    if (this.complete > 0) {
      this.steps.step3toggleClass(this.complete);
    } else {
      this.steps.step3toggleClass(2);
    }
  }


}
