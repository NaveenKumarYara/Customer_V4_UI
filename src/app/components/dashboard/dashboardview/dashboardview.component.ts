import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { DashboardService } from '../dashboard.service';
import { AppService } from '../../../app.service';
import { RecentJobs } from '../../../../models/recentjobs';
import { RecentApplicants } from '../../../../models/recentapplicants';
import { DashboardStatistics } from '../../../../models/dashboardstatistics';
import {  ApplicantStatistics } from '../../../../models/applicantstatistics';
import { billEstimates } from '../../../../models/billEstimates';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-dashboardview',
  templateUrl: './dashboardview.component.html',
  styleUrls: ['./dashboardview.component.css']
})
export class DashboardviewComponent implements OnInit {
    // recentjoblist: RecentJobs[] = [];
    customer:any;
    customerId:any;
    userId:any;
    recentapplicantlist: RecentApplicants[] = [];
    dashboardstatistics: DashboardStatistics;
    applicantStatistics: ApplicantStatistics;
    jobLoader : boolean;
    bill:billEstimates; 
    constructor(private appService: AppService,private route: ActivatedRoute,private router: Router, private dashboardservice: DashboardService) { 
        this.customer = JSON.parse(sessionStorage.getItem('userData'));
        this.customerId =this.customer.CustomerId;
        this.userId=this.customer.UserId;
    }

    // populateRecentJoblist(count: number) {
    //     return this.dashboardservice.getRecentJobs(count).subscribe(res => {
    //         this.recentjoblist = res;
    //     });
    // }

    populateRecentApplicants(customerId,userId,count: number,) {
       return this.dashboardservice.getRecentApplicants(customerId,userId,count).subscribe(res => {
           this.recentapplicantlist = res;
       });
    }

    populateDashboardStatistics(customerId,userId) {
        return this.dashboardservice.getDashboardStatistics(customerId,userId).subscribe(res => {
            this.dashboardstatistics = res;
        });

        //this.dashboardservice.getDashboardStatistics().subscribe((res: any) => {
        //    console.log(res);
        //    this.dashboardstatistics = res;
        //});   
    }
    populateApplicantsStatistics(customerId,userId) {
        return this.dashboardservice.getApplicantsStatistics(customerId,userId).subscribe(res => {
            this.applicantStatistics = res;
        }); 
    }

    GetBillingDuration()
    {
     return this.appService.getBillEstimates(this.userId).subscribe(res => {
       this.bill = res;
       if(new Date(this.bill.endDate) < new Date())
       {
        this.router.navigateByUrl('app-accountsettings/app-billing-and-payments');
      }
    });
}

    ngOnInit() {
        // this.populateRecentJoblist(5); 
        this.GetBillingDuration();
        this.populateRecentApplicants(this.customerId,this.userId,5); 
        this.populateDashboardStatistics(this.customerId,this.userId);
        this.populateApplicantsStatistics(this.customerId,this.userId);       
  }

}
