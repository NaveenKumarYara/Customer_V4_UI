import { Component, OnInit, Input } from '@angular/core';
import { RecentJobs } from '../../../../../models/recentjobs';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashboardService } from '../../dashboard.service';
import { Router } from '@angular/router';
import { Jobs } from '../../../../../models/jobs';
declare var $: any;
@Component({
  selector: 'app-recentjobscount',
  templateUrl: './recentjobscount.component.html',
  styleUrls: ['./recentjobscount.component.css'],
})
export class RecentjobsCountComponent implements OnInit {
  @Input() job: Jobs;
  @Input() joblist: RecentJobs[];
  customer: any;
   jobLoader = false;
   jobId: any;
   jobS: any;
   statusId:any;
   customerId: any;
   userId: any;


    // progressValue = 60;
    // isDeterminate = true;

    // step(val: number) {
    //   this.progressValue = Math.max(0, Math.min(100, val + this.progressValue));
    // }
    constructor(private spinner: NgxSpinnerService, private dashboardservice: DashboardService, private router: Router) {
      this.customer = JSON.parse(sessionStorage.getItem('userData'));
      this.customerId = this.customer.CustomerId;
      this.userId = this.customer.UserId;
     }




    ngOnInit() {
       this.GetProfileCount();
  }

  GetProfileCount()
  {
  this.jobId = this.job.JobId;
    return this.dashboardservice.getSuggestedCount(this.jobId).subscribe(res => {
      setInterval(() => {
        this.jobS = res;
      }, 1000);
    //this.jobS = res;
   });
  }

  GetJobsRedirect(val,userId,jobId)  {
    if(val>0){
    this.statusId=val;
    }
    else{
     this.statusId=0;
   }
   sessionStorage.setItem('customerId', JSON.stringify(this.customerId));
   sessionStorage.setItem('userId', JSON.stringify(userId));
   sessionStorage.setItem('jobId', JSON.stringify(jobId));
   sessionStorage.setItem('statusid', JSON.stringify(this.statusId));
   $("#activeMyjob").addClass('active');
   let jobactive= true;
   localStorage.setItem('jobactive', JSON.stringify(jobactive));
   this.router.navigateByUrl('app-view-jobdetails');
     }
 
 }



