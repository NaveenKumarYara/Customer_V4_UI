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
  searchString:any
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


  processed = false;
  constructor(private spinner: NgxSpinnerService, private route: ActivatedRoute,
    private managejobservice: ManageJobService, private filter: FilterjobsComponent) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.sortBy= JSON.parse(localStorage.getItem('sortBy'));
    this.customerId = this.customer.CustomerId;
    this.userId = this.customer.UserId;
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



  populateJoblist(customerId, userId,searchString='') { 
    if(this.sortBy==undefined)
    {
      this.sortBy=0;
    }
    this.searchString= searchString;
    return this.managejobservice.getJobDetails(customerId, userId,this.sortBy,this.searchString,this.joblistcount).subscribe(res => {
      this.loaddata = true;
      this.joblist = res;
      this.jobLoader = false;
      this.spinner.hide();
    }); 
  }

  populateJoblistByFilter(customerId, userId,employmentTypeId=0,experience=0,cityId=0,clientId=0,departmentId=0) { 
    $('#searchStr').val('');
    this.employmentTypeId = employmentTypeId;
    this.experience = experience;
    this.viewBy=this.sortBy;
    this.clientId = clientId;
    this.departmentId = departmentId;
    this.cityId = cityId;
    return this.managejobservice.getJobDetailsByFilter(customerId, userId,this.employmentTypeId,this.experience,this.cityId,this.viewBy,clientId,departmentId,this.joblistcount).subscribe(res => {
      this.loaddata = true;
      this.joblist = res;
      this.jobLoader = false;
      this.spinner.hide();
      this.clearAll();
    }); 
  }

  updateJobListCount() {
    this.joblistcount += 6;
    this.managejobservice.updateJobListCount(this.joblistcount);
    this.jobLoader = true;
    if(this.employmentTypeId>0 || this.experience>0 || this.cityId>0 || this.clientId>0 || this.departmentId>0)
    {
      this.populateJoblistByFilter(this.customerId, this.userId,this.employmentTypeId,this.experience,this.cityId,this.clientId,this.departmentId);
    }
    else
    {
      this.populateJoblist(this.customerId, this.userId,this.searchString);
    }
   
  }


  PopulateSort(sort)
  {
    this.sortBy = sort;
    this.spinner.show();
    if(this.employmentTypeId>0 || this.experience>0 || this.cityId>0 || this.clientId>0 || this.departmentId>0)
    {
      this.populateJoblistByFilter(this.customerId, this.userId,this.employmentTypeId,this.experience,this.cityId,this.clientId,this.departmentId);
    }
    else
    {
      this.populateJoblist(this.customerId, this.userId,this.searchString);
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
        this.sortBy = 0;
        this.defaultValue = '0';
      this.populateJoblist(this.customerId, this.userId, this.searchString);
      },
      callFilterMethod : (employmentTypeId, experience, cityId, clientId, departmentId) => {
        if (employmentTypeId > 0 || experience > 0 || cityId > 0 || clientId > 0 || departmentId > 0) {
          this.searchString = '';
          this.sortBy = 0;
          this.defaultValue = '0';
        }
         this.populateJoblistByFilter(this.customerId, this.userId, employmentTypeId, experience, cityId, clientId, departmentId);
    }
  };
  }

  ngOnInit() {
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
    this.populateJoblist(this.customerId, this.userId, this.searchString);
    this.managejobservice.ShowadvanceSearch.subscribe(x => this.showadvancesearch = x);
    // this.populateJoblistByFilter(this.customerId, this.userId,this.employmentTypeId,this.experience,this.cityId,this.sortBy);
    localStorage.removeItem('sortBy');
   // this.spinner.hide();
  }
}

export interface ParentComponentApi {
  callSearchMethod: (string) => void;
  callFilterMethod: (employmentTypeId, experience, cityId, clientId, departmentId) => void;
}
