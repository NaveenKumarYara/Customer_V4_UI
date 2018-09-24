import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { DashboardService } from '../dashboard.service';
import { RecentJobs } from '../../../../models/recentjobs';
import { RecentApplicants } from '../../../../models/recentapplicants';
import { DashboardStatistics } from '../../../../models/dashboardstatistics';
import {  ApplicantStatistics } from '../../../../models/applicantstatistics';
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
    recentapplicantlist: RecentApplicants[] = [];
    dashboardstatistics: DashboardStatistics;
    applicantStatistics: ApplicantStatistics;
    jobLoader : boolean;
    constructor(private route: ActivatedRoute, private dashboardservice: DashboardService) { }

    // populateRecentJoblist(count: number) {
    //     return this.dashboardservice.getRecentJobs(count).subscribe(res => {
    //         this.recentjoblist = res;
    //     });
    // }

    populateRecentApplicants(count: number) {
       return this.dashboardservice.getRecentApplicants(count).subscribe(res => {
           this.recentapplicantlist = res;
       });
    }

    populateDashboardStatistics() {
        return this.dashboardservice.getDashboardStatistics().subscribe(res => {
            this.dashboardstatistics = res;
        });

        //this.dashboardservice.getDashboardStatistics().subscribe((res: any) => {
        //    console.log(res);
        //    this.dashboardstatistics = res;
        //});   
    }
    populateApplicantsStatistics() {
        return this.dashboardservice.getApplicantsStatistics().subscribe(res => {
            this.applicantStatistics = res;
        }); 
    }

    ngOnInit() {
        // this.populateRecentJoblist(5); 
        this.populateRecentApplicants(5); 
        this.populateDashboardStatistics();
        this.populateApplicantsStatistics();
        
  }

}
