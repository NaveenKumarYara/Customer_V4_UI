import { Injectable } from '@angular/core';
import { Http, ResponseContentType, URLSearchParams, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { retry } from 'rxjs/operator/retry';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { JobDetails } from '../managejobs/models/jobdetails';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';
import { Jobs } from '../managejobs/models/jobs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import './models/jobdetailsbasicinfo';
import { JobdetailsBasicInfo } from './models/jobdetailsbasicinfo';
import { Jobstatistics } from './models/jobstatistics';
import { JobdetailsProfile } from './models/jobdetailsprofile';
import { GetJobDetailCustomer } from '../../../models/GetJobDetailCustomer';
import { JobComments } from './models/JobComments';
import { MatchingDetails } from './models/matchingDetails';

@Injectable()
export class JobdetailsService {
  baseUrll = 'http://api.tenendus.com:1090/';
  baseUrll1 = 'http://localhost:61297/';
  constructor(private _http: Http, private http: HttpClient) {
  }

  private detailsAdvanceSearch = new BehaviorSubject(false);
  ShowDetailsadvanceSearch = this.detailsAdvanceSearch.asObservable();

  updateDetailsAdvanceSearch(showdetailadvancesearch: boolean) {
    this.detailsAdvanceSearch.next(showdetailadvancesearch);
  }

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.log(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  getJobDetailsBasicInfo(): Observable<JobdetailsBasicInfo> {
    const url = environment.JobdetailsBasicInfoEndpoint;
    return this.http.get<JobdetailsBasicInfo>(url)
      .debounceTime(1000)
      .catch(
        this.handleError
      );
  }

  getJobDetailCustomer(): Observable<GetJobDetailCustomer> {
    const url = environment.JobDetailsofCustomer;
    return this.http.get<GetJobDetailCustomer>(url)
      .debounceTime(1000)
      .catch(
        this.handleError
      );
  }

  getJobDetailsStatisticsInfo(): Observable<Jobstatistics> {
    const url = environment.JobdetailsStatisticsEndpoint;
    return this.http.get<Jobstatistics>(url)
      .debounceTime(1000)
      .catch(
        this.handleError
      );
  }

  getJobDetailsComments(): Observable<JobComments[]> {
    const url = environment.GetJobDetialCustomerComments;
    return this.http.get<JobComments[]>(url)
      .debounceTime(1000)
      .catch(
        this.handleError
      );
  }
getMatchingDetails(profileId: number, jobId:number): Observable<MatchingDetails> {
    const url = environment.MatchingDetailEndPoint +
     '?userId='+ profileId + '&jobId=' + jobId;
    return this.http.get<MatchingDetails>(url)
      .debounceTime(1000)
      .catch(
        this.handleError
      );
  }

  getJobDetailsProfileInfo(jobid: number, statusid: number): Observable<JobdetailsProfile[]> {
    const url = environment.JobdetailsProfileEndpoint +
      '&jobId=' + jobid + '&statusId=' + statusid + '&sortBy=0&pageNumber=1&noOfRows=6';
    return this.http.get<JobdetailsProfile[]>(url)
      .debounceTime(1000)
      .catch(
        this.handleError
      );
  }
  getJobDetailsSuggestedProfileInfo(jobid: number): Observable<JobdetailsProfile[]> {
    const url = environment.JobdetailsSuggestedProfileEndpoint +
      '&jobId=' + jobid + '&sortBy=0&pageNumber=1&noOfRows=6';
    return this.http.get<JobdetailsProfile[]>(url)
      .debounceTime(1000)
      .catch(
        this.handleError
      );
  }
  byteStorage(body, url: string): Observable<HttpEvent<{}>> {
    const headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('x-access-token', sessionStorage.getItem('token')); 
    return this._http.post(this.baseUrll + url, body, { headers: headers })
      .map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }
}
