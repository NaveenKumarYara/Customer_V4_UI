import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ManageJobService } from '../../managejobs.service';
import {  Observable, Subject } from 'rxjs';
import { JobDetails } from '../../models/jobdetails';

@Component({
  selector: 'app-manage-viewjobs',
  templateUrl: './viewjobs.component.html',
  styleUrls: ['./viewjobs.component.css']
})
export class ViewjobsComponent implements OnInit {
  showadvancesearch = false;
  sortBy:any;
  customer:any;
  customerId:any;
  userId:any;
  joblist: JobDetails[] = [];
  joblistcount: number;
  jobs: any;
  loaddata = false;
  constructor(private route: ActivatedRoute,
    private router: Router, private managejobservice: ManageJobService) {
      this.customer = JSON.parse(sessionStorage.getItem('userData'));
      this.customerId =this.customer.CustomerId;
      this.userId=this.customer.UserId;
     }
    filterManageJobs(customerId,userId,sortBy) {
      if(sortBy==undefined||sortBy==null)
      {
        this.sortBy=0;
      }
      else
      {
        this.sortBy=sortBy;
      }
        return this.managejobservice.getJobDetails(customerId,userId,this.sortBy,this.joblistcount).subscribe(res => {
          this.joblist = res;
          this.loaddata = true;
        });
    }
  ngOnInit() {
    this.managejobservice.ShowadvanceSearch.subscribe(x => this.showadvancesearch = x);
    this.managejobservice.currentjoblistcount.subscribe(x => this.joblistcount = x);
    this.filterManageJobs(this.customerId,this.userId,this.sortBy);
  }
   
}
