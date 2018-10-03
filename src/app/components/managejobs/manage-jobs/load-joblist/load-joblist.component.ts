import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {  Observable, Subject } from 'rxjs';
import { ManageJobService } from '../../managejobs.service';
import { JobDetails } from '../../models/jobdetails';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-manage-load-joblist',
  templateUrl: './load-joblist.component.html',
  styleUrls: ['./load-joblist.component.css']
})
export class LoadJoblistComponent implements OnInit {
  id: any;
  sub: any;
  customer:any;
  customerId:any;
  userId:any;
  joblist: JobDetails[] = [];
  joblistcount: number;
  jobs: any;
  loaddata = false;
  sortBy:any;



  processed = false;
  constructor(private route: ActivatedRoute, private managejobservice: ManageJobService) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId =this.customer.CustomerId;
    this.userId=this.customer.UserId;
  }

  private data: Observable<any>;
  private fruits: Array<JobDetails> = [];
  private anyErrors: boolean;
  private finished: boolean;



  populateJoblist(customerId,userId) {
    this.sortBy=0;
    return this.managejobservice.getJobDetails(customerId,userId,this.sortBy,this.joblistcount).subscribe(res => {
      this.joblist = res;
      this.loaddata = true;
    });
  }

  updateJobListCount() {
    this.joblistcount += 6;
    this.managejobservice.updateJobListCount(this.joblistcount);
  }
  

  ngOnInit() {
    this.sub =
      this.route.params.subscribe(params => {
      this.id = params['id'];     
      })
    this.managejobservice.currentjoblistcount.subscribe(x => this.joblistcount = x);
    this.populateJoblist(this.customerId,this.userId);    
   
  }
}
