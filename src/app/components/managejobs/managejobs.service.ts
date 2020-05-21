import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { retry } from 'rxjs/operator/retry';
import { BehaviorSubject } from 'rxjs';

import {JobCount} from './models/JobCount';
import {Savefilter} from './models/Savefilter';
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

  

  getJobDetails(customerId: number, userId: number, sortBy: number, searchString: string,status:number,newSortBy:number, count: number): Observable<JobDetails> {
    const url = this.settingsService.settings.listofJobsEndpoint +
    'customerId=' + customerId + '&userId=' + userId + '&sortBy=' + sortBy + '&searchString=' + searchString + '&status='+status+ '&newSortBy='+newSortBy+'&pageNumber=1' + '&numberOfRows=' + count;
    return this.http.get<JobDetails>(url)
      .debounceTime(1000)
      .catch(
        this.handleError
    );
  }
  // http://localhost:8982/api/GetCustomerFilteredJobs?customerId=122&userId=775&sortBy=0&searchString=&status=0&pageNumber=1&numberOfRows=6&minSal=0&maxSal=200&minExp=0&maxExp=60&jobStatus=1&locations=13,23,4,55,119,254,1,6,140&skills=1,1640,1875,17509,2544,75&clients=12,17,229,222&departments=&titles=28,10
  getFilteredJobDetails(customerId: number, userId: number, sortBy: number, searchString: string, count: number,minExp: number,maxExp: number,minSal: number, maxSal: number,jobStatus: string,locations:string,skills:string,clients:string,departments:string,titles:string,domain:string,immigration:string,lastWeek:string,lastTwoWeek:string,last30days:string,last90days:string,lastyear:string,today:string,category:string,empType:string,education:string,Users:string): Observable<JobDetails> {
    const url = this.settingsService.settings.listofFilteredJobs +'customerId=' + customerId + '&userId=' + userId + '&sortBy=' + sortBy + '&searchString=' + searchString + '&status=0&pageNumber=1' + '&numberOfRows=' + count+'&minSal=' +minSal+'&maxSal='+maxSal+'&minExp='+minExp+'&maxExp='+maxExp+'&jobStatus='+jobStatus+'&locations='+locations+'&skills='+skills+'&clients='+clients+'&departments='+ departments+'&titles='+titles+'&domain='+domain+'&immigration='+immigration+'&lastWeek='+lastWeek+'&lastTwoWeek='+lastTwoWeek+'&last30days='+last30days+'&last90days='+last90days+'&lastyear='+lastyear+'&today='+today+'&category='+category+'&empType='+empType+'&education='+education+'&Users='+Users;
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

  getSavedJobsFilter(customerId: number,userId:number): Observable<Savefilter> {
    const url = this.settingsService.settings.GetSavedJobFilter +
    'customerId=' + customerId + '&userId=' + userId;
    return this.http.get<Savefilter>(url)
      .debounceTime(1000)
      .catch(
        this.handleError
    );
  }

  DeleteSavedJobsFilter(JobFilterId: number) {
    const url = this.settingsService.settings.DeleteJobFilter +
    'jobFilterId=' + JobFilterId ;
    return this.http.delete<string[]>(url)
    .catch(
      this.handleError
    );
  }


  SaveJobFilter(body) {
    return this.http.post(this.settingsService.settings.SaveJobFilter, body)
    .map((res: Response) => res)
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
  }

  getSuggestedCount(jobId:number)
  {
     const url = this.settingsService.settings.SuggestedCount +
     'jobId=' + jobId;
     return this.http.get<string>(url)
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
