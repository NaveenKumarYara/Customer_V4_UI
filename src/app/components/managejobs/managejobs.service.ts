import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { retry } from 'rxjs/operator/retry';
import { BehaviorSubject } from 'rxjs';

import {JobCount} from './models/JobCount';
import { JobDetails } from './models/jobdetails';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';
import { Jobs } from './models/jobs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {getDetails} from './models/getDetails';
import {GetInterviewSortList} from '../../../models/GetInterviewSortList';
import { DiscResult } from '../Postajob/models/jobPostInfo';
import { SettingsService } from '../../../settings/settings.service';
@Injectable()
export class ManageJobService {

  constructor(private http: HttpClient, private settingsService: SettingsService) {
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

  private joblistcount = new BehaviorSubject(6);
  currentjoblistcount = this.joblistcount.asObservable();

  private listcount = new BehaviorSubject(6);
  currentlistcount = this.listcount.asObservable();

  

  getJobDetails(customerId: number, userId: number, sortBy: number, searchString: string, count: number): Observable<JobDetails> {
    const url = this.settingsService.settings.listofJobsEndpoint +
    'customerId=' + customerId + '&userId=' + userId + '&sortBy=' + sortBy + '&searchString=' + searchString + '&status=0&pageNumber=1' + '&numberOfRows=' + count;
    return this.http.get<JobDetails>(url)
      .debounceTime(1000)
      .catch(
        this.handleError
    );
  }
  
  getFilteredJobDetails(customerId: number, userId: number, sortBy: number, searchString: string, count: number): Observable<JobDetails> {
    const url = this.settingsService.settings.listofFilteredJobs +
    'customerId=' + customerId + '&userId=' + userId + '&sortBy=' + sortBy + '&searchString=' + searchString + '&status=0&pageNumber=1' + '&numberOfRows=' + count;
    return this.http.get<JobDetails>(url)
      .debounceTime(1000)
      .catch(
        this.handleError
    );
  }
  GetInterViewAcceptance(userId:number,jobId:number): Observable<JobCount> {
    const url = this.settingsService.settings.GetInterviewAccept + 'userId=' + userId +
    '&jobId=' + jobId;
    return this.http.get<JobCount>(url)
      .debounceTime(1000)
      .catch(
        this.handleError
    );
  }

  GetInterViewDetails(jobId:number,profileId:number): Observable<getDetails> {
    const url = this.settingsService.settings.GetInterviewDetails + '&jobId=' + jobId +'&profileId=' +profileId;
    return this.http.get<getDetails>(url)
      .debounceTime(1000)
      .catch(
        this.handleError
    );
  }

  GetInterviewList(customerId: number,sortBy: number,ListSort:number,search:string,count: number)
  {

    const url = this.settingsService.settings.GetInterViewList +
    'customerId=' + customerId +'&sortBy='+sortBy +'&listSort='+ListSort+ '&searchString='+search+'&pageNumber=1' +'&numberOfRows=' +count;
    return this.http.get<GetInterviewSortList>(url)
      .debounceTime(1000)
      .catch(
        this.handleError
    );
  }

  GetSearch(city: string = null): Observable<string[]> {
    const url = this.settingsService.settings.GetCitySearch + '?cityName=' + city;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }

  getJobDetailsByFilter(customerId: number, userId: number, employmentTypeId: number, experience: number, cityId: number, viewBy: number, clientId: number, departmentId: number, count: number): Observable<JobDetails> {
    const url = this.settingsService.settings.GetJobsFilterBy +
    'customerId=' + customerId + '&userId=' + userId + '&employmentTypeId=' + employmentTypeId + '&experience=' + experience + '&cityId=' + cityId + '&viewBy=' + viewBy +  '&clientId=' + clientId +  '&departmentId=' + departmentId + '&pageNumber=1' + '&numberOfRows=' + count;
    return this.http.get<JobDetails>(url)
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

  GetAutoSearch(term: string = null, customerId: number): Observable<string[]> {
    const url = this.settingsService.settings.GetAutoSearch + '?searchText=' + term + '&customerId=' + customerId;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }

  InterviewAccept(body) {
    return this.http.post(this.settingsService.settings.CustomerInterviewAccept, body)
    .map((res: Response) => res)
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
  }

  UpdateinterviewProcess(body) {
    return this.http.post(this.settingsService.settings.UpdateScheduleInterview, body)
    .map((res: Response) => res)
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
  }

  GetInterviewAutoSearch(term: string = null, customerId: number): Observable<string[]> {
    const url = this.settingsService.settings.GetInterviewAutoSearch + '?searchText=' + term + '&customerId=' + customerId;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }

  getPersonType(jobId: number): Observable<DiscResult[]> {
    const url = this.settingsService.settings.GetPersonTypeEndPoint + 'jobId=' + jobId;
    return this.http.get<DiscResult[]>(url)
    .debounceTime(1000)
    .catch(
      this.handleError
    );
  }

  updateJobListCount(updatedtotal: number) {
    this.joblistcount.next(updatedtotal);
  }

  updateListCount(total: number) {
    this.listcount.next(total);
  }

 

}
