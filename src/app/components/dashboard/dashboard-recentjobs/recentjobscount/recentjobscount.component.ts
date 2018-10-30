import { Component, OnInit, Input } from '@angular/core';
import { RecentJobs } from '../../../../../models/recentjobs';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashboardService } from '../../dashboard.service';
import { Router } from '@angular/router';
import { Jobs } from '../../../../../models/jobs';
@Component({
  selector: 'app-recentjobscount',
  templateUrl: './recentjobscount.component.html',
  styleUrls: ['./recentjobscount.component.css'],
})
export class RecentjobsCountComponent implements OnInit {
  @Input() job: Jobs;
  @Input() joblist: RecentJobs[];
  customer:any;
   jobLoader =false;
   jobId:any;
   jobS:any;
   customerId:any;
   userId:any;

    
    // progressValue = 60;
    // isDeterminate = true;
  
    // step(val: number) {
    //   this.progressValue = Math.max(0, Math.min(100, val + this.progressValue));
    // }
    constructor(private spinner: NgxSpinnerService, private dashboardservice: DashboardService, private router: Router) {
      this.customer = JSON.parse(sessionStorage.getItem('userData'));
      this.customerId =this.customer.CustomerId;
      this.userId=this.customer.UserId;
     }


    

    ngOnInit() {
       this.GetProfileCount();       
  }

  GetProfileCount()
  {
  this.jobId = this.job.JobId;
    return this.dashboardservice.getJobCount(this.jobId,this.customerId).subscribe(res => {
    this.jobS = res;
   });
  }
 
 

}
