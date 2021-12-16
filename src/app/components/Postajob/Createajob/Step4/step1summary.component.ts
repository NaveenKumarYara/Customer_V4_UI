import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../../../../app.service';
import { jobImmigrationData } from '../../models/jobPostInfo';
@Component({
  selector: 'app-steps-step4-step1summary',
  templateUrl: './step1summary.component.html',
})
export class Step1SummaryComponent implements OnInit {

jobCategoryId: number;
jobCategory: string;
jobTitle = '';
minExp: number;
maxExp: number;
minExperience:number;
maxExperience:number;
Industry:string;
Department:string;
Category:string;
noOfopenings:number;
location=[];
locations=[];
immigrationsList=[];
noOfopening=[];
hasDescription: boolean;
completeDescription: string;
jobPositionId: string;
jobPriority:number;
PriorityName:string;
departments: any;
ExpiryDate:Date;
roles = [];
client: any;
employmentType: any;
employmentTypeId: any;
contractDuration: string;
contractExtension: any=[];
Remotework:boolean;
empType: number;
contractExtended: boolean;
salaryType: any;
salaryTypeId: any;
open:boolean;
publish:boolean;
minAnnualRate = 1000;
maxAnnualRate = 10000;
minHourRate = 20;
maxHourRate = 100;
minRate: number;
maxRate: number;
  constructor(private route: ActivatedRoute,
    private router: Router,  public appService: AppService) {
     this.appService.currentcategorytitle.subscribe((data) => {
          this.jobCategoryId = data.JobCategoryId; // And he have data here too!
          this.jobCategory = data.Category;
      });
      this.appService.currentClient.subscribe((data) => {
        // this.jobCategoryId = data.ClientId; // And he have data here too!
        this.client = data.ClientName; // localStorage.getItem('clientName'); //
    });

    this.appService.currentjobIndustry.subscribe(x=>this.Industry=x);
    this.appService.currentjobtypePosition.subscribe(x=>this.Department=x);
    this.appService.currentcategorytitlenew.subscribe(x=>this.Category=x);
    this.appService.currentminExp.subscribe(x => {
      let val = x/12;
      this.minExperience = Number(val.toFixed(2));
    });
   this.appService.currentmaxExp.subscribe(y => {
      let value = y/12;
      this.maxExperience = Number(value.toFixed(2));
   } );

   if (this.employmentTypeId === 2) {
    this.contractExtended = true;
    }
    this.salaryTypeId=localStorage.getItem('SalaryTypeId');
    this.salaryType = this.empType;
    if (this.salaryTypeId == "2") {
      this.appService.currentMinRate.subscribe(x => this.minAnnualRate = x);
      this.appService.currentMaxRate.subscribe(x => this.maxAnnualRate = x);
    } else if (this.salaryTypeId == "1") {
      this.appService.currentMinHourlyRate.subscribe(x => this.minHourRate = x);
      this.appService.currentMaxHourlyRate.subscribe(x => this.maxHourRate = x);
    }
    this.immigrationsList = this.appService.ImmigrationforJobs;
    // this.appService.currentClient.subscribe((data) => {
    //   this.client = data; // And he have data here too!
    // });
      this.appService.currentjobtitle.subscribe((data) => {
        this.jobTitle = data; // And he have data here too!
      });
      this.appService.currentminExp.subscribe((data) => {
        this.minExp = data; // And he have data here too!
      });
      this.appService.currentmaxExp.subscribe((data) => {
        this.maxExp = data; // And he have data here too!
      });

      this.appService.currentEmploymentType.subscribe((data) => {
        this.employmentTypeId = data.EmploymentTypeId; // And he have data here too!
        this.employmentType = data.EmploymentType;
      });
      this.appService.currentContractDuration.subscribe((data) => {
        this.contractDuration = data; // And he have data here too!
      });
      // this.appService.currentContractExtension.subscribe((data) => {
      //   this.contractExtension = data.WorkAuthorizationType; // And he have data here too!
      // });
     
      //debugger
      this.Remotework= this.appService.RemoteWork;

      this.open = this.appService.BonusOffered;

      this.publish = this.appService.HideSalary;

      this.appService.currentjobImp.subscribe((data)=>
      {
        this.jobPriority=data;
        if(data==1)
        {
         this.PriorityName = 'High';   
        }
        else if(data==2)
        {
         this.PriorityName = 'Medium';   
        }
        else if(data==3)
        {
         this.PriorityName = 'Low';   
        }
        })

      this.appService.currentjobDueDate.subscribe(
        (data)=>
        
        {this.ExpiryDate=data}
        );
      // this.appService.addedresponsibilitiesChanged.subscribe((data) => {
      //   this.roles = data; // And he have data here too!
      // });
      this.appService.currentDescriptionChecked.subscribe((data) => {
        this.hasDescription = data; // And he have data here too!
      });
      this.appService.currentDescription.subscribe((data) => {
        this.completeDescription = data; // And he have data here too!
      });
      this.appService.currentjobPosition.subscribe((data) => {
        this.jobPositionId = data; // And he have data here too!
      });
      // this.appService.currentlocation.subscribe((data) => {
      //   this.location = data.location; // And he have data here too!
      // });
      this.appService.currentOpenings.subscribe((data) => {
        this.noOfopenings = data; // And he have data here too!
      });
      // this.appService.departmentsChanged.subscribe(x =>  {
      //   this.departments = x;
      // } );
      // this.appService.jobprimaryskillsChanged.subscribe((data) => {
      //   this.primarySkills = data; // And he have data here too!
      // });
      // this.appService.jobsecondaryskillsChanged.subscribe((data) => {
      //   this.secondarySkills = data; // And he have data here too!
      // });
  }


  ngOnInit() {
    // this.jobCategoryId = this.appService.jobcategory.value.JobCategoryId;
    // this.jobCategory = this.appService.jobcategory.value.Category;
    // this.jobTitle = this.appService.jobtitle.value;
    // this.minExp = this.appService.minExperience.value;
    // this.maxExp = this.appService.maxExperience.value;
    // this.hasDescription = this.appService.hasDescription.value;
    // this.completeDescription = this.appService.description.value;
      this.departments = this.appService.departments;
        this.location = this.appService.JobLocations;
        this.locations =this.appService.Locationswithpositions;
        if(this.appService.Workauthorize.length>0)
        {
          this.contractExtension = this.appService.Workauthorize;
        }
        if(this.appService.Workauthorize.length===0)
        {
          this.contractExtension = this.appService.WorkauthorizeNames.map(x=>x.WorkAuthorizationId);
        }
       
        //this.noOfopening=this.appService.noofOpenings;
    // this.appService.departmentsChanged.subscribe(x =>  = x);
    // this.client = localStorage.getItem('client');
    // this.insertJob.JobDescription = '';
    // this.insertJob.SalaryTypeId = 1;
    // this.insertJob.MinimumSalary = '1';
    // this.insertJob.MaximumSalary = '200';
  }






}
