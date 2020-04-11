import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../../../../app.service';

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
noOfopenings:number;
location=[];
locations=[];
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
  constructor(private route: ActivatedRoute,
    private router: Router,  private appService: AppService) {
     this.appService.currentcategorytitle.subscribe((data) => {
          this.jobCategoryId = data.JobCategoryId; // And he have data here too!
          this.jobCategory = data.Category;
      });
      this.appService.currentClient.subscribe((data) => {
        // this.jobCategoryId = data.ClientId; // And he have data here too!
        this.client = data.ClientName; // localStorage.getItem('clientName'); //
    });
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
        this.locations =this.appService.JobLocationsMulti;
        this.noOfopening=this.appService.OpeningsList;
    // this.appService.departmentsChanged.subscribe(x =>  = x);
    // this.client = localStorage.getItem('client');
    // this.insertJob.JobDescription = '';
    // this.insertJob.SalaryTypeId = 1;
    // this.insertJob.MinimumSalary = '1';
    // this.insertJob.MaximumSalary = '200';
  }






}
