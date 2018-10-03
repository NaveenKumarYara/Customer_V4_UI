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
        '&customerId=' +customerId+ +'&userId='+userId+ '&sortBy=0&status=0&pageNumber=1&numberOfRows=5';
        return this.http.get<RecentJobs[]>(url)
            .debounceTime(1000)
            .catch(
                this.handleError
            );
    }

    getRecentApplicants(count: number): Observable<RecentApplicants[]> {
       const url = environment.RecentApplicants;
       return this.http.get<RecentApplicants[]>(url)
           .debounceTime(1000)
           .catch(
               this.handleError
           );
    }

    getDashboardStatistics(): Observable<DashboardStatistics>{
        const url = environment.DashboardStatistics;
        return this.http.get<DashboardStatistics>(url)
            .debounceTime(500)
            .catch(
                this.handleError
            );
        //return this.dashboardstatistics;
    }
    getApplicantsStatistics(): Observable<ApplicantStatistics>{
        const url = environment.ApplicantStatistics;
        return this.http.get<ApplicantStatistics>(url)
            .debounceTime(500)
            .catch(
                this.handleError
            );
        //return this.dashboardstatistics;
    }
}