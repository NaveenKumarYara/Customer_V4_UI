import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { retry } from 'rxjs/operator/retry';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { RecentJobs } from '../../../models/recentjobs';
import { RecentApplicants } from '../../../models/recentapplicants';
import { DashboardStatistics } from '../../../models/dashboardstatistics';
import { ApplicantStatistics } from '../../../models/applicantstatistics';

@Injectable()
export class DashboardService {
    baseUrll = 'http://api.tenendus.com:1090/';
    constructor(private http: HttpClient) {
    }



    
    private handleError(error: any) {
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.log(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    getRecentJobs(customerId:number,userId:number,count: number): Observable<RecentJobs[]> {
        const url = environment.RecentJobs +
        'customerId=' +customerId +'&userId='+userId+ '&sortBy=0&status=0&pageNumber=1&numberOfRows=5';
        return this.http.get<RecentJobs[]>(url)
            .debounceTime(1000)
            .catch(
                this.handleError
            );
    }

    getRecentApplicants(customerId:number,userId:number,count: number): Observable<RecentApplicants[]> {
       const url = environment.RecentApplicants +
       'customerId=' +customerId+'&userId='+userId+ '&page=1&numberOfRows=5';
       return this.http.get<RecentApplicants[]>(url)
           .debounceTime(1000)
           .catch(
               this.handleError
           );
    }

    getDashboardStatistics(customerId:number,userId:number): Observable<DashboardStatistics>{
        const url = environment.DashboardStatistics+
        'customerId=' +customerId +'&userId='+userId+'&filter=0';

        return this.http.get<DashboardStatistics>(url)
            .debounceTime(500)
            .catch(
                this.handleError
            );
        //return this.dashboardstatistics;
    }
    getApplicantsStatistics(customerId:number,userId:number): Observable<ApplicantStatistics>{
        const url = environment.ApplicantStatistics+
        'customerId=' +customerId +'&userId='+userId+'&filter=0';
        return this.http.get<ApplicantStatistics>(url)
            .debounceTime(500)
            .catch(
                this.handleError
            );
        //return this.dashboardstatistics;
    }
}