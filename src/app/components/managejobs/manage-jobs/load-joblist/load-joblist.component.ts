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
import { stat } from 'fs';
import { AppService } from '../../../../app.service';
declare var $: any;
import * as introJs from 'intro.js/intro.js';
import { OnDestroy } from '@angular/core/public_api';
import { deactivate } from '../../models/deactivate';
@Component({
  selector: 'app-manage-load-joblist',
  templateUrl: './load-joblist.component.html',
  styleUrls: ['./load-joblist.component.css'],
  providers: [NgxSpinnerService, FilterjobsComponent]
})
export class LoadJoblistComponent implements OnInit,OnDestroy {
  id: any;
  sub: any;
  customer: any;
  customerId: any;
  deactivate = new deactivate();
  userId: any;
  searchString:string='';
  viewBy:any;
  employmentTypeId:any;
  showadvancesearch = false;
  experience:any;
  cityId:any;
  joblist= new JobDetails();
  joblistcount: number=6;
  defaultValue:any=0;
  jobs: any;
  values:any;
  clientId:any;
  departmentId:any;
  loaddata = false;
  sortBy: any;
  nsortBy:any=0;
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
   paging:any;
   status:any=0;
   newSortBy:any=0;
   post:any;
  processed = false;
  FilterId: string;
  introJS = introJs();
  constructor(private spinner: NgxSpinnerService, private route: ActivatedRoute, private appService: AppService,private router: Router,
    private managejobservice: ManageJobService, private filter: FilterjobsComponent) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId = this.customer.CustomerId;
    this.userId = this.customer.UserId;
    this.sortBy= JSON.parse(localStorage.getItem('sortBy'));
    let sort = JSON.parse(localStorage.getItem('NsortBy'));
    let sval = localStorage.getItem('lsearch');
    let paging = JSON.parse(localStorage.getItem('paging'));
      if(sval!=undefined && sval!=null && sval!= "null")
      {
          this.searchString = sval;
          if(sort!=null)
          {
            this.PopulateSort(sort);
          }
        
      }
      if(sval === null||sval=== undefined)
      {
        this.searchString = "";
      }
    
    // if(localStorage.getItem('lsearch')!=null && localStorage.getItem('lsearch')!=undefined)
    // {
    //   this.searchString = localStorage.getItem('lsearch');
    // }
    if(this.sortBy!=null&&this.sortBy!=undefined)
    {
      this.UpdatePopulateSort(this.sortBy);
    }

    if(sort!=null&&sort!=undefined)
    {
      this.nsortBy=sort;
      this.PopulateSort(sort);
    }

    if(paging!=null&&paging!=undefined)
    {
      this.jobLoader=true;
      this.paging=paging;
      this.populateJoblist(this.customerId, this.userId,this.searchString,this.sortBy,this.status,this.newSortBy);
    }
    // if(this.searchString!=undefined&&this.searchString!=null)
    // {
    //   this.getParentApi().callSearchMethod(this.searchString);
    // }
  
    this.defaultValue ='0';
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
    this.status = localStorage.getItem('orderDate')!=null?localStorage.getItem('orderDate'):0;
    this.values = localStorage.getItem('dashboard');
    this.post = localStorage.getItem('post');
   
    localStorage.removeItem('post');
    localStorage.removeItem('dashboard');   
    this.managejobservice.ShowadvanceSearch.subscribe(x => this.showadvancesearch = x);
    // this.populateJoblistByFilter(this.customerId, this.userId,this.employmentTypeId,this.experience,this.cityId,this.sortBy);
    localStorage.removeItem('sortBy');
    localStorage.removeItem('orderDate');
   // this.spinner.hide();

   //----------------------------------------Oninit Data call end-------------------------------
  }
    // if(this.newSortBy == null || this.sortBy == undefined)
    // {
    //   this.defaultValue ='0';
    // }
    // else
    // {
    // this.defaultValue = this.sortBy;
    // } 
  }

  private data: Observable<any>;
  private fruits: Array<JobDetails> = [];
  private anyErrors: boolean;
  private finished: boolean;

  start()
  {
    this.introJS.start();
  }

  tClose()
  {
    this.introJS.exit();
  }

  ngOnDestroy() {
    localStorage.removeItem('sortBy');
    this.sortBy = 0;
    this.searchString = undefined;
    this.tClose();
  }



  MyJobsExport()
  {
    
    let Name = this.customer.FirstName + ' ' + 'Jobs';
    this.downloadFile(this.joblist.Jobs,Name);

  }

  downloadFile(data: any, filename) {
    debugger
    let csvData = this.ConvertToCSV(data, [ 'JobTitle', 'JobId', 'ClientName','PostedOn', 'JobStatus', 'TotalApplicants',  'HiringLeaderName']);
    console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  ConvertToCSV(objArray: any, headerList: any) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'S.No,';

    for (let index in headerList) {
      row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = (i + 1) + '';
      for (let index in headerList) {
        let head = headerList[index];

        line += ',' + array[i][head];
      }
      str += line + '\r\n';
    }
    return str;
  }

  populateJoblist(customerId, userId,searchString='',sortBy=0,status=0,newSortBy=0) { 

     this.sortBy=this.sortBy!=null?sortBy:0;
     this.status=this.status!=null?status:0;
      this.searchString= searchString;
      this.newSortBy=this.newSortBy!=null?newSortBy:0;
      if(this.paging!=null&&this.paging!=undefined)
      {
        this.joblistcount = this.paging;
      }
    return this.managejobservice.getJobDetails(this.customerId,this.userId,this.sortBy,this.searchString,this.status,this.newSortBy,this.joblistcount).subscribe(res => {
      this.loaddata = true;
      this.joblist = res;
      this.jobLoader = false;
      this.spinner.hide();
      localStorage.removeItem('sortBy');
      localStorage.removeItem('NsortBy');
    }); 
  }

  Reset()
  {
  
    $('#searchStr').val('');
    localStorage.removeItem('lsearch');
    localStorage.removeItem('sortBy');
    localStorage.removeItem('NsortBy');
    localStorage.removeItem('paging');
    this.joblistcount=6;
    this.searchString=''; 
    this.isfiltered=0;
    this.sortBy=0;
    //this.paging=null;
    this.UpdatePopulateSort(0);
    this.PopulateSort(0);
    //this.updateJobListCount();
    this.getParentApi().callSearchMethod(this.searchString);
     
  }

  DeleteFilter(Id) {
    if (Id > 0) {
      return this.appService.DeleteSaveFilter(Id).subscribe((data) => {
        if (data == 0) {
            this.GetSavedJobFilter(1);
          // let currentUrl = this.router.url;
          // this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          //   this.router.navigate([currentUrl]);
          //   console.log(currentUrl);
        }
        });
         // this.GetSavedJobFilter(1);

      }
    }

  GetSavedJobFilter(val)
  {
    //debugger
    if(val==0)
    {
      return this.managejobservice.getSavedJobsFilter(this.customerId, this.userId).subscribe(res => {
        if(res!=null)
        {
          this.FilterId = res.JobFilterId;
          this.sortBy=0;       
          this.DeleteFilter(res.JobFilterId);
          this.populateJoblist(this.customerId, this.userId, this.searchString,this.sortBy,0,this.newSortBy);
        }    
      else
      {
        this.populateJoblist(this.customerId, this.userId, this.searchString,this.sortBy,0,this.newSortBy);
      } 
      });  
    }
    else
    {
      this.isfiltered=0;
      this.populateJoblist(this.customerId, this.userId, this.searchString,this.sortBy,this.status,this.newSortBy);
    }
    
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

  // change()
  // {
  //   localStorage.setItem('paging', JSON.stringify(this.joblistcount));
  // }

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
          //debugger
          this.populateJoblist(this.customerId, this.userId,this.searchString,this.sortBy,this.status,this.newSortBy);
        }
  }
  }


  PopulateSort(sort)
  { 
      this.spinner.show();
     
      this.nsortBy=sort;
      this.isfiltered=0;
      if(sort > 3)
      {
        this.status = this.nsortBy;
        this.newSortBy = 0;
        localStorage.setItem('NsortBy', JSON.stringify(sort));
        this.populateJoblist(this.customerId, this.userId,this.searchString,this.sortBy,this.status,this.newSortBy);     
      }
      else
      {
        this.newSortBy = sort;
        localStorage.setItem('NsortBy', JSON.stringify(sort));
        this.populateJoblist(this.customerId, this.userId,this.searchString,this.sortBy,this.status,this.newSortBy);     
      }
    
  }

  UpdatePopulateSort(filter)
  { 
      
      this.spinner.show();
      this.sortBy = filter;
      this.isfiltered=0;
      localStorage.setItem('sortBy', JSON.stringify(filter));
      this.populateJoblist(this.customerId, this.userId,this.searchString,this.sortBy,this.status,this.newSortBy);     
  }

  clearAll()
  {
    this.sortBy = 0;
    this.viewBy = 0 ;
    this.status=0;
    this.newSortBy=0;
    this.employmentTypeId =0;
    this.experience = 0;
    this.cityId = 0;
    this.clientId = 0;
    this.departmentId = 0;
    this.defaultValue = 0;

  }
  getParentApi(): ParentComponentApi {
    return {
      callMethod : (val) => {
        this.spinner.show();
       // this.parentMethod(name);
        this.cityId = 0;
        this.experience = 0;
        this.employmentTypeId = 0;
        //this.sortBy = 0;
        //this.defaultValue = '0';
      this.populateJoblist(this.customerId, this.userId, this.searchString,this.sortBy,0,this.newSortBy);
      },
      callchangeJobStatus:(job, val)=> {
        this.deactivate.jobId = job.JobId;
        this.deactivate.customerId = this.customerId;
        this.deactivate.isActive = val;
          this.appService.deactivateJob(this.deactivate)
          .subscribe(
          data => {
            this.populateJoblist(this.customerId, this.userId, this.searchString,this.sortBy,0,this.newSortBy);
        },
          error => console.log(error));
      },
      callSearchMethod : (searchString) => {
        this.spinner.show();
       // this.parentMethod(name);
        this.searchString = searchString;
        localStorage.setItem("search", searchString);
        this.cityId = 0;
        this.experience = 0;
        this.employmentTypeId = 0;
        //this.sortBy = 0;
        //this.defaultValue = '0';
      this.populateJoblist(this.customerId, this.userId, this.searchString,this.sortBy,0,this.newSortBy);
      },
      callFilterMethod : (employmentTypeId, experience, cityId, clientId, departmentId) => {
        if (employmentTypeId > 0 || experience > 0 || cityId > 0 || clientId > 0 || departmentId > 0) {
          this.searchString = '';
          //this.sortBy = 0;
          //this.defaultValue = '0';
        }
        this.clearAll();
         this.populateJoblistByFilter(this.customerId, this.userId, employmentTypeId, experience, cityId, clientId, departmentId);
    },
    Filterjobs : (locations,minExp, MaxExp,minSal,maxSal,clients,domain,immigrations,lastWeek,lastTwoWeek,last30days,last90days,lastyear,today,category,empType,profileStatus,skills,departments,titles,education,isfiltered,Users) => {
      if (1) {
        this.searchString = '';
        //this.sortBy = 0;
        //this.defaultValue = '0';
      }
      this.clearAll();
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
      //debugger
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
    if((this.status!=null && this.values == '1') || this.post == '1')
    {
      this.GetSavedJobFilter(1);
    }
    else
    {
      this.GetSavedJobFilter(0);
    }
   this.spinner.show();
  }
}

export interface ParentComponentApi {
  callMethod: (val) => void;
  callchangeJobStatus:(job, val) => void;
  callSearchMethod: (string) => void;
  callFilterMethod: (employmentTypeId, experience, cityId, clientId, departmentId) => void;
  Filterjobs: (locations,minExp, MaxExp,minSal,maxSal,clients,domain,immigrations,lastWeek,lastTwoWeek,last30days,last90days,lastyear,today,category,empType,profileStatus,skills,departments,titles,education,isfiltered,Users) => void;
}
