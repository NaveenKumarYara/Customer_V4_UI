import { Injectable } from '@angular/core';
import { Http, ResponseContentType, URLSearchParams, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { retry } from 'rxjs/operator/retry';
import { BehaviorSubject } from 'rxjs';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { RecentJobs } from '../../../models/recentjobs';
import { RecentApplicants } from '../../../models/recentapplicants';
import { DashboardStatistics } from '../../../models/dashboardstatistics';
import { ApplicantStatistics } from '../../../models/applicantstatistics';
import { StatsDasboard,Stats} from '../../../models/StatsDasboard';
import {JobCount} from '../../components/managejobs/models/JobCount';
import { SettingsService } from '../../../settings/settings.service';

@Injectable()
export class DashboardService {
    //baseUrll = 'http://v1.tenendus.com:1020/';
    constructor(private http: HttpClient,private _http: Http, private settingsService: SettingsService) {
    }



    
    private handleError(error: any) {
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.log(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    getRecentJobs(customerId: number, userId:number,count: number): Observable<RecentJobs> {
        const url = this.settingsService.settings.RecentJobs +
        'customerId=' +customerId +'&userId='+ userId + '&sortBy=0&searchString=&status=0&pageNumber=1&numberOfRows=5';
        return this.http.get<RecentJobs>(url)
            .debounceTime(1000)
            .catch(
                this.handleError
            );
    }

    getRecentApplicants(customerId:number,userId:number,count: number): Observable<RecentApplicants[]> {
       const url = this.settingsService.settings.RecentApplicants +
       'customerId=' + customerId + '&userId=' + userId + '&page=1&numberOfRows=5';
       return this.http.get<RecentApplicants[]>(url)
           .debounceTime(1000)
           .catch(
               this.handleError
           );
    }
    getJobCount(jobId: number, customerId: number): Observable<JobCount> {
        const url = this.settingsService.settings.JobsProfileCount +
        'jobId=' + jobId + '&customerId=' + customerId;
        return this.http.get<JobCount>(url)
          .debounceTime(1000)
          .catch(
            this.handleError
        );
      }

    getDashboardStatistics(customerId: number, userId: number,filter:number): Observable<DashboardStatistics> {
        const url = this.settingsService.settings.DashboardStatistics +
        'customerId=' + customerId + '&userId=' + userId + '&filter=' +filter;

        return this.http.get<DashboardStatistics>(url)
            .debounceTime(500)
            .catch(
                this.handleError
            );
        // return this.dashboardstatistics;
    }
    getApplicantsStatistics(customerId: number, userId: number,filter:number): Observable<ApplicantStatistics> {
        const url = this.settingsService.settings.ApplicantStatistics +
        'customerId=' + customerId + '&userId=' + userId + '&filter=' +filter;
        return this.http.get<ApplicantStatistics>(url)
            .debounceTime(500)
            .catch(
                this.handleError
            );
        // return this.dashboardstatistics;
    }
    GetDashboardStatisticsWeek(userId: number, filter: number): Observable<Stats[]> {
        const url = this.settingsService.settings.GetCustomerWeekReport+
        '?userId=' + userId + '&filter='+filter;
        return this.http.get<Stats[]>(url)
            .debounceTime(500)
            .catch(
                this.handleError
            );
        // return this.dashboardstatistics;
    }
    GetDashboardStatisticsMonth(userId: number, filter: number): Observable<Stats[]> {
        const url = this.settingsService.settings.GetCustomerMonthReport+
        '?userId=' + userId + '&filter='+filter;
        return this.http.get<Stats[]>(url)
            .debounceTime(500)
            .catch(
                this.handleError
            );
        // return this.dashboardstatistics;
    }
    GetDashboardStatisticsYear(userId: number, filter: number): Observable<Stats[]> {
        const url = this.settingsService.settings.GetCustomerYearReport+
        '?userId=' + userId + '&filter='+filter;
        return this.http.get<Stats[]>(url)
            .debounceTime(500)
            .catch(
                this.handleError
            );
        // return this.dashboardstatistics;
    }
    GetDashboardStatisticsForJobsPosted(customerId: number, filter: number): Observable<StatsDasboard[]> {
        const url = this.settingsService.settings.GetDashboardStatisticsForJobsPosted+
        '?customerId=' + customerId + '&filter='+filter;
        return this.http.get<StatsDasboard[]>(url)
            .debounceTime(500)
            .catch(
                this.handleError
            );
        // return this.dashboardstatistics;
    }

    GetDashboardStatisticsForJobsFilled(customerId: number, filter: number): Observable<StatsDasboard[]> {
        const url = this.settingsService.settings.GetDashboardStatisticsForJobsFilled+
        '?customerId=' + customerId + '&filter='+filter;
        return this.http.get<StatsDasboard[]>(url)
            .debounceTime(500)
            .catch(
                this.handleError
            );
        // return this.dashboardstatistics;
    }

    GetDashboardStatisticsForJobsCancelled(customerId: number, filter: number): Observable<StatsDasboard[]> {
        const url = this.settingsService.settings. GetDashboardStatisticsForJobsCancelled+
        '?customerId=' + customerId + '&filter='+filter;
        return this.http.get<StatsDasboard[]>(url)
            .debounceTime(500)
            .catch(
                this.handleError
            );
        // return this.dashboardstatistics;
    }

    GetCustomerApplicantsStatistics(customerId: number, filter: number): Observable<StatsDasboard[]> {
        const url = this.settingsService.settings.GetCustomerApplicantsStatistics+
        '?customerId=' + customerId + '&filter='+filter;
        return this.http.get<StatsDasboard[]>(url)
            .debounceTime(500)
            .catch(
                this.handleError
            );
    }
    GetCustomerShortListedStatistics(customerId: number, filter: number): Observable<StatsDasboard[]> {
        const url = this.settingsService.settings.GetCustomerShortListedStatistics+
        '?customerId=' + customerId + '&filter='+filter;
        return this.http.get<StatsDasboard[]>(url)
            .debounceTime(500)
            .catch(
                this.handleError
            );
    }
    GetCustomerInterviewStatistics(customerId: number, filter: number): Observable<StatsDasboard[]> {
        const url = this.settingsService.settings.GetCustomerInterviewStatistics+
        '?customerId=' + customerId + '&filter='+filter;
        return this.http.get<StatsDasboard[]>(url)
            .debounceTime(500)
            .catch(
                this.handleError
            );
    }
    GetCustomerHiredStatistics(customerId: number, filter: number): Observable<StatsDasboard[]> {
        const url = this.settingsService.settings.GetCustomerHiredStatistics+
        '?customerId=' + customerId + '&filter='+filter;
        return this.http.get<StatsDasboard[]>(url)
            .debounceTime(500)
            .catch(
                this.handleError
            );
    }


}
