import { Component, OnInit, Input } from '@angular/core';
import { RecentJobs } from '../../../../models/recentjobs';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashboardService } from '../dashboard.service';
@Component({
  selector: 'app-dashboard-recentjobs',
  templateUrl: './dashboard-recentjobs.component.html',
  styleUrls: ['./dashboard-recentjobs.component.css'],
  providers: [NgxSpinnerService]
})
export class DashboardRecentjobsComponent implements OnInit {
    //@Input() recentjoblist: RecentJobs;
    recentjoblist: RecentJobs[] = [];
   jobLoader =false;
   customerId:any;
   userId:any;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    
    // progressValue = 60;
    // isDeterminate = true;
  
    // step(val: number) {
    //   this.progressValue = Math.max(0, Math.min(100, val + this.progressValue));
    // }
    constructor(private spinner: NgxSpinnerService, private dashboardservice: DashboardService) { }


    

    ngOnInit() {
      this.jobLoader=true;
      this.populateRecentJoblist(5,this.customerId,this.userId);
     // this.spinner.show();
    //  let ldg = $('#domainLoader');
    //  ldg.find('> div > span').text('Please wait as jobs are loading')
    //    .end().show();
    //   setTimeout(() => {
    //     /** spinner ends after 5 seconds */
    //     ldg.hide();
    //   }, 4000);
  }
  populateRecentJoblist(count: number,customerId,userId) {
    return this.dashboardservice.getRecentJobs(count,customerId,userId).subscribe(res => {
        this.recentjoblist = res;
        this.jobLoader=false;
    });
}

}
