import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ManageJobService } from '../../managejobs.service';
import { Observable, Subject } from 'rxjs';
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
  ngOnInit() {
    this.managejobservice.currentjoblistcount.subscribe(x => this.joblistcount = x);
   }
   
}
