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
import { CustomerSubscription } from '../../../../models/CustomerSubscription';
import { GetSubscriptionDetails } from '../../../../models/GetSubscriptionDetails';
import { AuthService } from '../../../shared/guard/auth.service';
import * as introJs from 'intro.js/intro.js';
import { OnDestroy } from '@angular/core/public_api';

@Component({
  selector: 'app-dashboardview',
  templateUrl: './dashboardview.component.html',
  styleUrls: ['./dashboardview.component.css']
})
export class DashboardviewComponent implements OnInit,OnDestroy {
    // recentjoblist: RecentJobs[] = [];
    customer:any;
    customerId:any;
    userId:any;
    subdetails:CustomerSubscription;
    sdetails:GetSubscriptionDetails;
    recentapplicantlist: RecentApplicants[] = [];
    dashboardstatistics: DashboardStatistics;
    applicantStatistics: ApplicantStatistics;
    jobLoader : boolean;
    introJS = introJs();
    daysRemaining:any;
    bill:billEstimates; 
    constructor(private appService: AppService,private route: ActivatedRoute,private router: Router, private dashboardservice: DashboardService, private authService: AuthService) { 
      if (!sessionStorage.getItem('isLoggedin')) {
        this.router.navigate(["/login"]);
      }
      this.customer = JSON.parse(sessionStorage.getItem('userData'));
        this.customerId =this.customer.CustomerId;
        this.userId=this.customer.UserId;
    }

    start()
    {
      this.introJS.start();
    }

    tClose()
    {
      this.introJS.exit();
    }
  
    ngOnDestroy() {
      this.tClose();
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

    GetCustomerSubscription()
    {
      return this.appService.GetCustomerSubscription(this.customer.UserId).subscribe(res => {
        this.subdetails = res;
        if(res!=null)
        {
            this.GetSubscriptionDetails(res.subscriptionId);
        }
        // this.GetInvoiceEstimates();
        // this.GetUnbilledChargeDetails();
    });
    }
    
    GetSubscriptionDetails(sid)
    {
      return this.appService.GetSubscriptionDetails(sid).subscribe(res => {
        this.sdetails = res;
        let date = new Date();  
        let val = new Date(date.setDate(date.getDate()));
        var diff = Math.abs(new Date(this.sdetails.nextBillingAt) .getTime() - new Date(date.setDate(date.getDate())).getTime());
        var diffDays = Math.ceil(diff / (1000 * 3600 * 24));  
        this.daysRemaining = diffDays;
        if(this.daysRemaining < 0 ||  this.sdetails.nextBillingAt==null)
        {
            this.router.navigateByUrl('app-accountsettings/app-billing-and-payments');
        }
      });
    }

    populateDashboardStatistics(customerId,userId) {
        return this.dashboardservice.getDashboardStatistics(customerId,userId,0).subscribe(res => {
            this.dashboardstatistics = res;
        });

        //this.dashboardservice.getDashboardStatistics().subscribe((res: any) => {
        //    console.log(res);
        //    this.dashboardstatistics = res;
        //});   
    }
    populateApplicantsStatistics(customerId,userId) {
        return this.dashboardservice.getApplicantsStatistics(customerId,userId,0).subscribe(res => {
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
        //this.GetBillingDuration();
        this.GetCustomerSubscription();
        this.populateRecentApplicants(this.customerId,this.userId,5); 
        this.populateDashboardStatistics(this.customerId,this.userId);
        this.populateApplicantsStatistics(this.customerId,this.userId);       
  }

}
