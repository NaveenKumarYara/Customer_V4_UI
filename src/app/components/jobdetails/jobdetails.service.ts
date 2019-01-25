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
import { GetCompanyBenefit } from '../../../models/GetCompanyBenefit';
import { DiscResult } from '../Postajob/models/jobPostInfo';

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
  private profilecount = new BehaviorSubject(6);
  currentProfilecount = this.profilecount.asObservable();

  updateprofileCount(updatedtotal: number) {
    this.profilecount.next(updatedtotal);
  }

  getCompanyBenfits(customerId: number): Observable<GetCompanyBenefit[]> {
    const url = environment.GetCompanyBenfits + 'customerId=' + customerId + '&companyBenefitId=0';
    return this.http.get<GetCompanyBenefit[]>(url)
        .catch(
            this.handleError
        );
}
  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.log(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  getJobDetailsBasicInfo(customerId: number, jobId: number): Observable<JobdetailsBasicInfo> {
    const url = environment.JobdetailsBasicInfoEndpoint +
    'customerId=' + customerId + '&jobId=' + jobId;
    return this.http.get<JobdetailsBasicInfo>(url)
      .debounceTime(1000)
      .catch(
        this.handleError
      );
  }
  getPersonType(jobId: number): Observable<DiscResult[]> {
    const url = environment.GetPersonTypeEndPoint + 'jobId=' + jobId;
    return this.http.get<DiscResult[]>(url)
    .debounceTime(1000)
    .catch(
      this.handleError
    );
  }

  GetSearch(city: string = null): Observable<string[]> {
    const url = environment.GetCitySearch + '?cityName=' + city;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }
  getUserId(email:string,customerId:number): Observable<DiscResult[]> {
    const url = environment.GetUserId + 'email=' + email+ '&customerId=' + customerId ;
    return this.http.get<GetJobDetailCustomer>(url)
      .debounceTime(1000)
      .catch(
        this.handleError
      );

  }
  getJobDetailCustomer(customerId: number, jobId: number): Observable<GetJobDetailCustomer> {
    const url = environment.JobDetailsofCustomer + 'customerId=' + customerId + '&jobId=' + jobId;
    return this.http.get<GetJobDetailCustomer>(url)
      .debounceTime(1000)
      .catch(
        this.handleError
      );
  }

  getJobDetailsStatisticsInfo(jobId: number): Observable<Jobstatistics> {
    const url = environment.JobdetailsStatisticsEndpoint + 'jobId=' + jobId;
    return this.http.get<Jobstatistics>(url)
      .debounceTime(1000)
      .catch(
        this.handleError
      );
  }

  getJobDetailsComments(jobId: number): Observable<JobComments[]> {
    const url = environment.GetJobDetialCustomerComments + 'jobId=' + jobId;
    return this.http.get<JobComments[]>(url)
      .debounceTime(1000)
      .catch(
        this.handleError
      );
  }
getMatchingDetails(profileId: number, jobId: number): Observable<MatchingDetails> {
    const url = environment.MatchingDetailEndPoint +
     '?userId=' + profileId + '&jobId=' + jobId;
    return this.http.get<MatchingDetails>(url)
      .debounceTime(1000)
      .catch(
        this.handleError
      );
  }

  GetAutoSearch(term: string = null): Observable<string[]> {
    const url = environment.GetProfileAutoSearch+ '?searchText=' + term;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }

  getJobDetailsProfileInfo(customerId: number, userId: number, jobid: number, statusid: number,sortBy: number= 1, searchString: string, experience: number,location: string,domainName: string,noOfRows: number= 6):
  Observable<JobdetailsProfile> {
   const url = environment.JobdetailsProfileEndpoint + 'customerId=' + customerId + '&userId=' + userId +
     '&jobId=' + jobid + '&statusId=' + statusid + '&sortBy=' + sortBy + '&searchString=' +searchString+'&experience='+experience+'&location='+location+'&domainName='+domainName+'&pageNumber=1&noOfRows=' + noOfRows;
   debugger
     return this.http.get<JobdetailsProfile>(url)
     .debounceTime(1000)
     .catch(
       this.handleError
     );
 }
  getJobDetailsSuggestedProfileInfo(customerId: number, userId: number, jobid: number, statusid: number, sortBy: number= 1, searchString: string, experience: number,location: string,domainName: string,
    noOfRows: number= 6): Observable<JobdetailsProfile> {
    const url = environment.JobdetailsSuggestedProfileEndpoint + 'customerId=' + customerId + '&userId=' + userId +
      '&jobId=' + jobid + '&statusId=' + statusid + '&sortBy=' + sortBy + '&searchString=' +searchString+'&experience='+experience+'&location='+location+'&domainName='+domainName+ '&pageNumber=1&noOfRows=' + noOfRows;
    debugger
      return this.http.get<JobdetailsProfile>(url)
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

  interviewProcess(body) {
    return this.http.post(environment.scheduleInterview, body)
    .map((res: Response) => res)
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
  }

  InviteContact(body) {
    return this.http.post(environment.InviteContact, body)
    .map((res: Response) => res)
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
  }

  SearchProfile(body) {
    return this.http.post(environment.SearchProfile, body)
    .map((res: Response) => res)
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
  }

}
