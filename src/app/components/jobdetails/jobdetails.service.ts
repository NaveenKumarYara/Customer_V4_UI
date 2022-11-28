import { Injectable } from '@angular/core';
import { Http, ResponseContentType, URLSearchParams, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { retry } from 'rxjs/operator/retry';
import { BehaviorSubject } from 'rxjs';

import { JobDetails } from '../managejobs/models/jobdetails';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';
import { Jobs } from '../managejobs/models/jobs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import './models/jobdetailsbasicinfo';
import { JobdetailsBasicInfo,JobCompletenessInfo } from './models/jobdetailsbasicinfo';
import { Jobstatistics } from './models/jobstatistics';
import { JobdetailsProfile, MatchingParameterDetails } from './models/jobdetailsprofile';
import { GetJobDetailCustomer } from '../../../models/GetJobDetailCustomer';
import { JobComments } from './models/JobComments';
import { MatchingDetails } from './models/matchingDetails';
import { GetCompanyBenefit ,GetInviteList} from '../../../models/GetCompanyBenefit';
import {ProfileLinks} from './models/ProfileLinks';
import {CustStatusRes, ScheduleType} from './models/ScheduleType';
import { DiscResult } from '../Postajob/models/jobPostInfo';
import { SortbyInProfiles } from './models/SortbyInProfiles';
import {Router,ActivatedRoute,NavigationEnd} from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';
import {WishlistCount,LegendList} from './models/WishlistCount';
import { SettingsService } from '../../../settings/settings.service';
import { RecentApplicants } from '../../../models/recentapplicants';
import { CompanyProfile } from '../../../models/companyprofile';
import { debounceTime } from 'rxjs/operators';

@Injectable()
export class JobdetailsService {
  // baseUrll = 'http://api.tenendus.com:1090/';
  baseUrll1 = 'http://localhost:61297/';
  constructor(private _http: Http, private route: ActivatedRoute, private router: Router,private spinner: NgxSpinnerService,private http: HttpClient, private settingsService: SettingsService) {
  }

  private detailsAdvanceSearch = new BehaviorSubject(false);
  ShowDetailsadvanceSearch = this.detailsAdvanceSearch.asObservable();

  private profilecount = new BehaviorSubject(6);
  currentProfilecount = this.profilecount.asObservable();

  updateDetailsAdvanceSearch(showdetailadvancesearch: boolean) {
    this.detailsAdvanceSearch.next(showdetailadvancesearch);
  }

  updateprofileCount(updatedtotal: number) {
    this.profilecount.next(updatedtotal);
  }

  getCompanyBenfits(customerId: number): Observable<GetCompanyBenefit[]> {
    const url = this.settingsService.settings.GetCompanyBenfits + 'customerId=' + customerId + '&companyBenefitId=0';
    return this.http.get<GetCompanyBenefit[]>(url)
        .catch(
            this.handleError
        );
  }


  getPersonalityTest(email:string): Observable<LegendList[]> {
    const url = this.settingsService.settings.QuestionResult + 'mail=' + email;
    return this.http.get<LegendList[]>(url)
    .debounceTime(1000)
    .catch(
      this.handleError
    );
  }

  getCompanyProfile(customerId:number): Observable<CompanyProfile> {
    const url = this.settingsService.settings.CompanyProfileBasicInfo+ 'customerId='+customerId ;
    return this.http.get<CompanyProfile>(url)
        .catch(
            this.handleError
        );
}

  getInviteList(customerId: number,jobId:number): Observable<GetInviteList[]> {
    const url = this.settingsService.settings.GetInviteList + 'customerId=' + customerId + '&jobId=' +jobId;
    return this.http.get<GetInviteList[]>(url)
        .catch(
            this.handleError
        );
  }

  DeleteNote(Id: number) {
    const url = this.settingsService.settings.DeleteNote +
    'Id=' + Id ;
    return this.http.delete<string[]>(url)
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

  getProfileLinks(userId: number) {
    const url = this.settingsService.settings.profileLink + 'userId=' + userId;
    return this.http.get<ProfileLinks[]>(url)
        .catch(
            this.handleError
        );
  }

  getInterviewtype(jobId: number) {
    const url = this.settingsService.settings.InterviewScheduleType + 'jobId=' + jobId;
    return this.http.get<ScheduleType>(url)
        .catch(
            this.handleError
        );
   }

  getSortByOption() {
    const url = this.settingsService.settings.profilesSortBy;
    // return this.http.post(url, null).map((res: Response) => res)
    return this.http.get<string[]>(url)
        .catch(
            this.handleError
        );
   }
   getInterViewTypes(): Observable<ScheduleType[]> {
    const url = this.settingsService.settings.interviewtypeendpoint;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
    }

    getJobDetailsBasicInfo(customerId: number, jobId: number): Observable<JobdetailsBasicInfo> {
    const url = this.settingsService.settings.JobdetailsBasicInfoEndpoint +
    'customerId=' + customerId + '&jobId=' + jobId;
    return this.http.get<JobdetailsBasicInfo>(url)
      .debounceTime(1000)
      .catch(
        this.handleError
      );
  }

  GetJobCompleteness(jobId: number): Observable<JobCompletenessInfo> {
    const url = this.settingsService.settings.GetJobCompleteness + 'jobId=' + jobId;
    return this.http.get<JobCompletenessInfo>(url)
      .debounceTime(1000)
      .catch(
        this.handleError
      );
  }

  GetProfileNotes(profileId: number, jobId: number,cid:number): Observable<string[]> {
    const url = this.settingsService.settings.GetProfileNotes +
    '?profileId=' + profileId + '&jobId=' + jobId + '&cid=' + cid;
    return this.http.get<string[]>(url)
      .debounceTime(1000)
      .catch(
        this.handleError
      );
  }

  GetProfileNotesNew(profileId: number, jobId: number,cid:number): Observable<string[]> {
    const url = this.settingsService.settings.MyNotes +
    '?profileId=' + profileId + '&jobId=' + jobId + '&cid=' + cid;
    return this.http.get<string[]>(url)
      .debounceTime(1000)
      .catch(
        this.handleError
      );
  }

  GetCustomerStatus(mail: string, jobId: number,customerId:number,IsPublic:boolean): Observable<CustStatusRes> {
    const url = this.settingsService.settings.CheckCustProfile +
    'mail=' + mail + '&jobId=' + jobId + '&customerId=' + customerId + '&ispublic=' + IsPublic;
    return this.http.get<CustStatusRes>(url)
      .debounceTime(1000)
      .catch(
        this.handleError
      );
  }

  GetProfileFeedback(profileId: number, jobId: number,cid:number): Observable<string[]> {
    const url = this.settingsService.settings.GetProfileFeedback +
    '?profileId=' + profileId + '&jobId=' + jobId + '&cid=' + cid;
    return this.http.get<string[]>(url)
      .debounceTime(1000)
      .catch(
        this.handleError
      );
  }

  GetJobStatsForManage(customerId: number, jobId: number,UId:number) {
    const url = this.settingsService.settings.GetJobStatsForManage +
    'customerId=' + customerId + '&jobId=' + jobId + '&userId=' + UId;
    return this.http.get<string>(url)
      .debounceTime(1000)
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

  GetSearch(city: string = null): Observable<string[]> {
    const url = this.settingsService.settings.GetCitySearch + '?cityName=' + city;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }

  getUserId(email: string, customerId: number): Observable<DiscResult[]> {
    const url = this.settingsService.settings.GetUserId + 'email=' + email + '&customerId=' + customerId ;
    return this.http.get<GetJobDetailCustomer>(url)
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

  getJobDetailCustomer(customerId: number, jobId: number): Observable<GetJobDetailCustomer> {
    const url = this.settingsService.settings.JobDetailsofCustomer + 'customerId=' + customerId + '&jobId=' + jobId;
    return this.http.get<GetJobDetailCustomer>(url)
      .debounceTime(1000)
      .catch(
        this.handleError
      );
  //  // const promise = new Promise((resolve, reject) => {
  //     const url = this.settingsService.settings.JobDetailsofCustomer + 'customerId=' + customerId + '&jobId=' + jobId;
  //    return this.http.get<GetJobDetailCustomer>(url)
  //       .toPromise();
  //   // });
  //   // return promise;
  }

  getJobDetailsStatisticsInfo(customerId: number, jobId: number): Observable<Jobstatistics> {
    const url = this.settingsService.settings.JobdetailsStatisticsEndpoint + 'customerId=' + customerId + '&jobId=' + jobId;
    return this.http.get<Jobstatistics>(url)
      .debounceTime(1000)
      .catch(
        this.handleError
      );
  }

  getWishListCount(customerId: number, jobId: number, statusId: number): Observable<WishlistCount> {
    const url = this.settingsService.settings.WishlistCount + 'customerId=' + customerId + '&jobId=' + jobId + '&statusId=' + statusId;
    return this.http.get<WishlistCount>(url)
      .debounceTime(1000)
      .catch(
        this.handleError
      );
  }

  getJobDetailsComments(jobId: number): Observable<JobComments[]> {
    const url = this.settingsService.settings.GetJobDetialCustomerComments + 'jobId=' + jobId;
    return this.http.get<JobComments[]>(url)
      .debounceTime(1000)
      .catch(
        this.handleError
      );
  }

  getMatchingDetails(profileId: number, jobId: number): Observable<MatchingDetails> {
    const url = this.settingsService.settings.MatchingDetailEndPoint +
     '?userId=' + profileId + '&jobId=' + jobId;
    return this.http.get<MatchingDetails>(url)
      .debounceTime(1000)
      .catch(
        this.handleError
      );
  }

  getMatchingCriteriaDetails(profileId: number, jobId: number): Observable<MatchingDetails> {
    const url = this.settingsService.settings.GetJobMatchingCriteriaEndPoint +
     'profileId=' + profileId + '&jobId=' + jobId;
    return this.http.get<MatchingDetails>(url)
      .debounceTime(1000)
      .catch(
        this.handleError
      );
  }


  getVideoProfile(customerId: number, profileId: number) {
    const url = this.settingsService.settings.VideoProfileEndPoint +
     '?customerId=' + customerId + '&userId=' +  profileId;
    return this.http.get<string>(url)
      .debounceTime(1000)
      .catch(
        this.handleError
      );
  }
  GetAutoSearch(term: string = null, customerId: number): Observable<string[]> {
    const url = this.settingsService.settings.GetProfileAutoSearch + '?searchText=' + term + '&customerId=' + customerId;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }

  getJobDetailsProfileInfo(customerId: number, userId: number, jobid: number, statusid: number, sortBy: number= 1, searchString: string, experience: number, location: string, domainName: string, uploaded: number, suggested: number, wishlist: number, invited:number,arytic:number,noOfRows: number= 6,FStatus:number):
  Observable<JobdetailsProfile> {
   const url = this.settingsService.settings.JobdetailsProfileEndpoint + 'customerId=' + customerId + '&userId=' + userId +
     '&jobId=' + jobid + '&statusId=' + statusid + '&sortBy=' + sortBy + '&searchString=' + searchString + '&experience=' + experience + '&location=' + location + '&domainName=' + domainName + '&uploaded=' + uploaded  + '&suggested=' + suggested + '&wishlist=' + wishlist +  '&invited=' + invited + '&arytic='+ arytic+ '&pageNumber=1&noOfRows=' + noOfRows +'&Fstatus='+FStatus
     
     
     
     ;
     return this.http.get<JobdetailsProfile>(url)
     .debounceTime(1000)
     .catch(
       this.handleError
     );
 }
  getJobDetailsSuggestedProfileInfo(customerId: number, userId: number, jobid: number, statusid: number, sortBy: number= 1, searchString: string, experience: number, location: string, domainName: string,
    noOfRows: number= 6): Observable<JobdetailsProfile> {
    const url = this.settingsService.settings.JobdetailsSuggestedProfileEndpoint + 'customerId=' + customerId + '&userId=' + userId +
      '&jobId=' + jobid + '&statusId=' + statusid + '&sortBy=' + sortBy + '&searchString=' + searchString + '&experience=' + experience + '&location=' + location + '&domainName=' + domainName + '&pageNumber=1&noOfRows=' + noOfRows;
      return this.http.get<JobdetailsProfile>(url)
      .debounceTime(1000)
      .catch(
        this.handleError
      );
  }
  GetJobMatchingCriteriaEndPoint(profileId: number, jobid: number): Observable<MatchingParameterDetails> {
    const url = this.settingsService.settings.GetJobMatchingCriteriaEndPoint + 'profileId=' + profileId +
      '&jobId=' + jobid;
      return this.http.get<MatchingParameterDetails>(url)
      .debounceTime(1000)
      .catch(
        this.handleError
      );
  }
  
  reload() {
    window.location.reload();
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
   }

   this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
         // trick the Router into believing it's last link wasn't previously loaded
         this.router.navigated = false;
         // if you need to scroll back to top, here is the right place
         window.scrollTo(0, 0);
      }
  });
  }
  
  byteStoragePrivate(body, url: string): Observable<any[]> {
    const headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('x-access-token', sessionStorage.getItem('token'));
    return this._http.post(url
      .replace(
        new RegExp("ProfileAPI", "gi"),
        this.settingsService.settings.ProfilebaseUrl
      ), body, { headers: headers })
      .map((res: Response) => res.json())
      .catch((error: any) => {
        this.reload();
        return Observable.throw(error.json());
      });
  }

  byteStorage(body, url: string): Observable<any[]> {
    const headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('x-access-token', sessionStorage.getItem('token'));
    return this._http.post(url
      .replace(
        new RegExp("ProfileAPI", "gi"),
        this.settingsService.settings.ProfilebaseUrl
      ), body, { headers: headers })
      .map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  GetCertificationName(provider:number,cert: string = null): Observable<string[]> {
    const url = this.settingsService.settings.GetCertificationName  + '?providerId=' + provider +'&certificationName=' + cert;
    return this.http.get<string[]>(url).map(res => res);
  }

  GetCertificationProvider(cert: string): Observable<string[]> {
    const url = this.settingsService.settings.GetCertificationProvider + '?providerName=' + cert;
    return this.http.get<string[]>(url).map(res => res);
  }

  byteStorage1(body, url: string): Observable<any[]> {
    const headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('x-access-token', sessionStorage.getItem('token'));
    return this._http.post(this.baseUrll1+url, body, { headers: headers })
    .map((res: Response) => res.json())
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
  }


  interviewProcess(body) {
    return this.http.post(this.settingsService.settings.scheduleInterview, body)
    .map((res: Response) => res)
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
  }


  UploadSovren(body) {
    const url = 'https://rest.resumeparsing.com/v10/parser/resume';
    const headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Sovren-AccountId', '25863506');
    headers.append('Sovren-ServiceKey','WmukTR4CElDGRQQa717FE3Lc1crg9Xxrc2YjifGT');
    return this._http.post(url, body, { headers: headers } )
      .map((res: Response) => res.json())
      .catch((error: any) => {
        //this.reload();
        return Observable.throw(error.json());
      });
  }


  updateWishlist(body) {
    return this.http.post(this.settingsService.settings.UpdateWishlist, body)
    .map((res: Response) => res)
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
  }
  InviteContact(body) {
    return this.http.post(this.settingsService.settings.InviteContact, body)
    .map((res: Response) => res)
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
  }

  ProfileShareInvite(body) {
    return this.http.post(this.settingsService.settings.ProfileShareInvite, body)
    .map((res: Response) => res)
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
  }

  ShareProfile(body) {
    return this.http.post(this.settingsService.settings.ShareProfile, body)
    .map((res: Response) => res)
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
  }

  SaveProfileNote(body) {
    return this.http.post(this.settingsService.settings.InsertProfileNotesCustomer, body)
    .map((res: Response) => res)
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
  }

  JobShareInvite(body) {
    return this.http.post(this.settingsService.settings.JobShareInvite, body)
    .map((res: Response) => res)
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
  }

  AddonHirefee(body) {
    return this.http.post(this.settingsService.settings.CustomerAddonCharge, body)
    .map((res: Response) => res)
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
  }
  z

  parseSovren(formData: FormData) {
    const apiUrl = this.settingsService.settings.ParseSovren;
    return this.http.post<any>(apiUrl, formData).pipe();
}

  RequestRefernce(body) {
    return this.http.post(this.settingsService.settings.CustomerRequestRefernce, body)
    .map((res: Response) => res)
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
  }

  StartConversation(body) {
    return this.http.post(this.settingsService.settings.StartConversation, body)
    .map((res: Response) => res)
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
  }
  UpdateStatusOnEmailConversation(body) {
    return this.http.post(this.settingsService.settings.UpdateStatusOnEmailConversation, body)
    .map((res: Response) => res)
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
  }

  searchCandidateProfiles(body) {
    return this.http.post(this.settingsService.settings.SearchCandidateProfiles, body)
    .map((res: Response) => res)
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
  }

  SearchProfile(body) {
    return this.http.post(this.settingsService.settings.SearchProfile, body)
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
       .debounceTime(2000)
       .catch(
         this.handleError
     );
  }

}
