import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { retry } from 'rxjs/operator/retry';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { JobDetails } from './models/jobdetails';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';
import { Jobs } from './models/jobs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ManageJobService {

  constructor(private http: HttpClient) {
  }


  private jobdetals: JobDetails[] = [];
  jobdetailsChanged = new Subject<JobDetails[]>();

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.log(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  private advanceSearch = new BehaviorSubject(false);
  ShowadvanceSearch = this.advanceSearch.asObservable();

  updateAdvanceSearch(showadvancesearch: boolean) {
    this.advanceSearch.next(showadvancesearch);
  }

  private joblistcount = new BehaviorSubject(5);
  currentjoblistcount = this.joblistcount.asObservable();

  getJobDetails(count: number): Observable<JobDetails[]> {
    const url = environment.listofJobsEndpoint + count;
    return this.http.get<JobDetails[]>(url)
      .debounceTime(1000)     
      .catch(
        this.handleError
    );
  }

  
  updateJobListCount(updatedtotal: number) {
    this.joblistcount.next(updatedtotal);
  }
  
}
