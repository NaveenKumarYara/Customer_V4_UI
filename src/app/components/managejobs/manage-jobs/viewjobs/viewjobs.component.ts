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
  joblist: JobDetails[] = [];
  joblistcount: number;
  jobs: any;
  loaddata = false;
  constructor(private route: ActivatedRoute,
    private router: Router, private managejobservice: ManageJobService) { }
    filterManageJobs(sortBy: any) {
        this.sortBy = sortBy;
        return this.managejobservice.getJobDetails(this.joblistcount, this.sortBy).subscribe(res => {
          this.joblist = res;
          this.loaddata = true;
        });
    }
  ngOnInit() {
    this.managejobservice.ShowadvanceSearch.subscribe(x => this.showadvancesearch = x);
    this.managejobservice.currentjoblistcount.subscribe(x => this.joblistcount = x);
    this.filterManageJobs(this.sortBy);
  }
   
}
