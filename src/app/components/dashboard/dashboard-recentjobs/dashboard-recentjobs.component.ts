import { Component, OnInit, Input } from '@angular/core';
import { RecentJobs } from '../../../../models/recentjobs';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashboardService } from '../dashboard.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-dashboard-recentjobs',
  templateUrl: './dashboard-recentjobs.component.html',
  styleUrls: ['./dashboard-recentjobs.component.css'],
  providers: [NgxSpinnerService]
})
export class DashboardRecentjobsComponent implements OnInit {
    // @Input() recentjoblist: RecentJobs;
    customer: any;
    joblist = new RecentJobs();
   jobLoader = false;
   jobId: any;
   customerId: any;
   userId: any;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    statusId:any
    // progressValue = 60;
    // isDeterminate = true;

    // step(val: number) {
    //   this.progressValue = Math.max(0, Math.min(100, val + this.progressValue));
    // }
    constructor(private spinner: NgxSpinnerService, private dashboardservice: DashboardService, private router: Router) {
      this.customer = JSON.parse(sessionStorage.getItem('userData'));
      if(this.customer!=null)
      {
        this.customerId =this.customer.CustomerId;
        this.userId=this.customer.UserId;
      }
     }
    ngOnInit() {
      this.jobLoader = true;
      this.populateRecentJoblist(this.customerId, this.userId, 5);
      // this.ViewJobdetails(this.customerId,this.userId,this.jobId)
     // this.spinner.show();
    //  let ldg = $('#domainLoader');
    //  ldg.find('> div > span').text('Please wait as jobs are loading')
    //    .end().show();
    //   setTimeout(() => {
    //     /** spinner ends after 5 seconds */
    //     ldg.hide();
    //   }, 4000);
  }
  ViewJobdetails(customerId, userId, jobId) {
    this.statusId=4;
    sessionStorage.setItem('customerId', JSON.stringify(customerId));
    sessionStorage.setItem('userId', JSON.stringify(userId));
    sessionStorage.setItem('jobId', JSON.stringify(jobId));
    sessionStorage.setItem('statusid', JSON.stringify(this.statusId));
    $("#activeMyjob").addClass('active');
    let jobactive= true;
    localStorage.setItem('jobactive', JSON.stringify(jobactive));
    this.router.navigateByUrl('app-view-jobdetails');
  }
  populateRecentJoblist(customerId, userId, count: number) {
    return this.dashboardservice.getRecentJobs(customerId, userId, count).subscribe(res => {
        this.joblist = res;
        this.jobLoader = false;
    });
}


GetJobsRedirect(val,customerId,userId,jobId)  {
   if(val>0){
   this.statusId=val;
   }
   else{
    this.statusId=4;
  }
  sessionStorage.setItem('customerId', JSON.stringify(customerId));
  sessionStorage.setItem('userId', JSON.stringify(userId));
  sessionStorage.setItem('jobId', JSON.stringify(jobId));
  sessionStorage.setItem('statusid', JSON.stringify(this.statusId));
  $("#activeMyjob").addClass('active');
  let jobactive= true;
  localStorage.setItem('jobactive', JSON.stringify(jobactive));
  this.router.navigateByUrl('app-view-jobdetails');
    }

}
