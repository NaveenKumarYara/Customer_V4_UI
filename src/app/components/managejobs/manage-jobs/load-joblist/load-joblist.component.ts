import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {  Observable, Subject } from 'rxjs';
import { ManageJobService } from '../../managejobs.service';
import { JobDetails } from '../../models/jobdetails';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';
import { Subscription } from 'rxjs/Subscription';
import {FilterjobsComponent} from '../filterjobs/filterjobs.component';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;

@Component({
  selector: 'app-manage-load-joblist',
  templateUrl: './load-joblist.component.html',
  styleUrls: ['./load-joblist.component.css'],
  providers: [NgxSpinnerService, FilterjobsComponent]
})
export class LoadJoblistComponent implements OnInit {
  id: any;
  sub: any;
  customer: any;
  customerId: any;
  userId: any;
  searchString:string;
  viewBy:any;
  employmentTypeId:any;
  showadvancesearch = false;
  experience:any;
  cityId:any;
  joblist= new JobDetails();
  joblistcount: number;
  defaultValue:any;
  jobs: any;
  clientId:any;
  departmentId:any;
  loaddata = false;
  sortBy: any;
   jobLoader = false;
   color = 'primary';
   mode = 'indeterminate';
   value = 50;
   locations:any;  minExp:any; 
   MaxExp:any;minSal:any;maxSal:any;
   clients:any;domain:any;immigrations:any;
   lastWeek:any;lastTwoWeek:any;last30days:any;Users:any;
   last90days:any;lastyear:any;today:any;category:any;
   empType:any;jobStatus:any;skills:any;departments:any;titles:any;
   education:any;
   isfiltered :any;
   status:any=0;

  processed = false;
  constructor(private spinner: NgxSpinnerService, private route: ActivatedRoute,
    private managejobservice: ManageJobService, private filter: FilterjobsComponent) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.sortBy= JSON.parse(localStorage.getItem('sortBy'));
    this.customerId = this.customer.CustomerId;
    this.userId = this.customer.UserId;
    if(this.customer!=null){
   //---------------------------------------Oninit Data call-------------------------------
       // this.jobLoader = false;
    // this.spinner.show();
    this.sub =
      this.route.params.subscribe(params => {
      this.id = params['id'];
      });
      if (this.id === 2) {
        this.filter.toggleTableLayout();
      }
    this.managejobservice.currentjoblistcount.subscribe(x => this.joblistcount = x);
    this.spinner.show();
    this.status = localStorage.getItem('orderDate');
    if(this.status!=null||this.status!=undefined)
    {
      this.populateJoblist(this.customerId, this.userId, this.searchString,this.sortBy,this.status);
    }
    else 
    {
      this.populateJoblist(this.customerId, this.userId, this.searchString,this.sortBy,0);
    }
    
   
    this.managejobservice.ShowadvanceSearch.subscribe(x => this.showadvancesearch = x);
    // this.populateJoblistByFilter(this.customerId, this.userId,this.employmentTypeId,this.experience,this.cityId,this.sortBy);
    localStorage.removeItem('sortBy');
    localStorage.removeItem('orderDate');
   // this.spinner.hide();

   //----------------------------------------Oninit Data call end-------------------------------
  }
    if(this.sortBy == null || this.sortBy == undefined)
    {
      this.defaultValue ='0';
    }
    else
    {
    this.defaultValue = this.sortBy;
    } 
  }

  private data: Observable<any>;
  private fruits: Array<JobDetails> = [];
  private anyErrors: boolean;
  private finished: boolean;



  populateJoblist(customerId, userId,searchString='',sortBy=0,status=0) { 
    if(this.sortBy==undefined)
    {
      this.sortBy=0;
    }
    else
    {
      this.sortBy=sortBy;
    }
    this.searchString= searchString;
    return this.managejobservice.getJobDetails(customerId, userId,this.sortBy,this.searchString,status,this.joblistcount).subscribe(res => {
      this.loaddata = true;
      this.joblist = res;
      this.jobLoader = false;
      this.spinner.hide();
    }); 
  }

  populateJoblistByFilter(customerId, userId,employmentTypeId=0,experience=0,cityId=0,clientId=0,viewby=0,departmentId=0) { 
    $('#searchStr').val('');
    this.employmentTypeId = employmentTypeId;
    this.experience = experience;
    if(this.viewBy==undefined)
    {
      this.viewBy=0;
    }
    else
    {
      this.viewBy=viewby;
    }
    
    this.clientId = clientId;
    this.departmentId = departmentId;
    this.cityId = cityId;
    return this.managejobservice.getJobDetailsByFilter(customerId, userId,this.employmentTypeId,this.experience,this.cityId,this.viewBy,clientId,departmentId,this.joblistcount).subscribe(res => {
      this.loaddata = true;
      this.joblist = res;
      this.jobLoader = false;
      this.spinner.hide();
      this.employmentTypeId =0;
      this.experience = 0;
      this.cityId = 0;
      this.clientId = 0;
      this.departmentId = 0;
      //this.viewBy=0;
      //this.defaultValue = 0;
      //this.clearAll();
    }); 
  }

  updateJobListCount() {
    this.joblistcount += 6;
    this.managejobservice.updateJobListCount(this.joblistcount);
    this.jobLoader = true;
    if(this.isfiltered==1){
      this.spinner.show();
      this.managejobservice.getFilteredJobDetails(this.customerId, this.userId,this.sortBy,this.searchString,this.joblistcount,this.minExp, this.MaxExp,this.minSal,this.maxSal,this.jobStatus,this.locations,this.skills,this.clients,this.departments,this.titles,this.domain,this.immigrations,this.lastWeek,this.lastTwoWeek,this.last30days,this.last90days,this.lastyear,this.today,this.category,this.empType,this.education,this.Users).subscribe(res => {
        this.loaddata = true;
        this.joblist = res;
        this.jobLoader = false;
        this.spinner.hide();
      }); 
    }else{
        if(this.employmentTypeId>0 || this.experience>0 || this.cityId>0 || this.clientId>0 || this.departmentId>0)
        {
          this.populateJoblistByFilter(this.customerId, this.userId,this.employmentTypeId,this.experience,this.cityId,this.viewBy,this.clientId,this.departmentId);
        }
        else
        {
          this.populateJoblist(this.customerId, this.userId,this.searchString,this.sortBy,0);
        }
  }
  }


  PopulateSort(sort)
  { 
      this.spinner.show();
      this.sortBy = sort;
      if(this.employmentTypeId>0 || this.experience>0 || this.cityId>0 || this.clientId>0 || this.departmentId>0)
      {
        this.populateJoblistByFilter(this.customerId, this.userId,this.employmentTypeId,this.experience,this.cityId,sort,this.clientId,this.departmentId);
      }
      else
      {
        this.populateJoblist(this.customerId, this.userId,this.searchString,this.sortBy,0);
      }
  } 
  clearAll()
  {
    this.sortBy = 0;
    this.viewBy = 0 ;
    this.employmentTypeId =0;
    this.experience = 0;
    this.cityId = 0;
    this.clientId = 0;
    this.departmentId = 0;
    this.defaultValue = 0;

  }
  getParentApi(): ParentComponentApi {
    return {
      callSearchMethod : (searchString) => {
        this.spinner.show();
       // this.parentMethod(name);
        this.searchString = searchString;
        this.cityId = 0;
        this.experience = 0;
        this.employmentTypeId = 0;
        //this.sortBy = 0;
        //this.defaultValue = '0';
      this.populateJoblist(this.customerId, this.userId, this.searchString,this.sortBy,0);
      },
      callFilterMethod : (employmentTypeId, experience, cityId, clientId, departmentId) => {
        if (employmentTypeId > 0 || experience > 0 || cityId > 0 || clientId > 0 || departmentId > 0) {
          this.searchString = '';
          //this.sortBy = 0;
          //this.defaultValue = '0';
        }
         this.populateJoblistByFilter(this.customerId, this.userId, employmentTypeId, experience, cityId, clientId, departmentId);
    },
    Filterjobs : (locations,minExp, MaxExp,minSal,maxSal,clients,domain,immigrations,lastWeek,lastTwoWeek,last30days,last90days,lastyear,today,category,empType,profileStatus,skills,departments,titles,education,isfiltered,Users) => {
      if (1) {
        this.searchString = '';
        //this.sortBy = 0;
        //this.defaultValue = '0';
      }
      this.locations =locations;this.minExp=minExp;this.MaxExp= MaxExp;
      this.minSal=minSal;
      this.maxSal=maxSal;this.clients=clients;
      this.domain=domain;this.immigrations=immigrations;
      this.lastWeek=lastWeek;this.lastTwoWeek=lastTwoWeek;
      this.last30days=last30days;this.last90days=last90days;
      this.lastyear=lastyear;
      this.today =today;
      this.category=category;this.Users = Users;
      this.empType=empType;
      this.jobStatus=profileStatus;this.skills=skills;this.departments=departments;this.titles=titles;this.education=education;
      this.isfiltered=isfiltered;
      this.spinner.show();
      this.managejobservice.getFilteredJobDetails(this.customerId, this.userId,this.sortBy,this.searchString,this.joblistcount,minExp, MaxExp,minSal,maxSal,profileStatus,locations,skills,clients,departments,titles,domain,immigrations,lastWeek,lastTwoWeek,last30days,last90days,lastyear,today,category,empType,education,Users).subscribe(res => {
        this.loaddata = true;
        this.joblist = res;
        this.jobLoader = false;
        this.spinner.hide();
      }); 
      //  this.populateJoblistByFilter(this.customerId, this.userId, employmentTypeId, experience, cityId, clientId, departmentId);
  }
  };
  }

  ngOnInit() {
   this.spinner.show();
  }
}

export interface ParentComponentApi {
  callSearchMethod: (string) => void;
  callFilterMethod: (employmentTypeId, experience, cityId, clientId, departmentId) => void;
  Filterjobs: (locations,minExp, MaxExp,minSal,maxSal,clients,domain,immigrations,lastWeek,lastTwoWeek,last30days,last90days,lastyear,today,category,empType,profileStatus,skills,departments,titles,education,isfiltered,Users) => void;
}
