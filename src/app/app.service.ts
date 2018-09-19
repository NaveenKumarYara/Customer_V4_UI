import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable  } from 'rxjs/Rx';
import { Dashboard } from '../models/dashboard.model';
import { Offer } from '../models/offer.model';
import { environment } from '../environments/environment';
import { Jobskills } from '../models/jobskills.model';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs';
import { Qualifications } from '../models/qualifications.model';
import { Notification } from '../models/notifications';
import { InterviewType } from '../models/interviewtype.model';
import { retry } from 'rxjs/operator/retry';
import { EmploymentType } from '../models/employmenttype.model';
import { Postajob } from '../models/postajob.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class AppService {

  private opportunities: Dashboard[] = [];
  private apiUrl = 'api/CustomerPortal';

 
  private domain: string[] = [];
 domainChanged = new Subject<string[]>();

  private qualifications: Qualifications[] = [];
  qualificationsChanged = new Subject<Qualifications[]>();

  private interviewtype: InterviewType[] = [];  

  private notifications: Notification[] = []; 

  private contractduration: string[] = [
    "3 months", "6 months", "1 year", "more than 1 year"
  ];

  private contractextension: string[] = [
    "Corp-Corp",
    "W2",
    "Contract to Hire",
    "1099"
  ];


  private jobtitle = new BehaviorSubject('');
  currentjobtitle = this.jobtitle.asObservable();

  updateJobtitle(jobtitle: string) {
    this.jobtitle.next(jobtitle);
  }
  searchJobTitle(term: string = null): Observable<string[]> {
    const url = environment.jobTitleEndpoint + '?jobtitle=' + term;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }
  
  private jobcategory = new BehaviorSubject('');
  currentcategorytitle = this.jobcategory.asObservable();

  updateJobCategory(jobcategory: string) {
    this.jobcategory.next(jobcategory);
  }

  searchJobCategory(categoryterm: string = null): Observable<string[]> {
    const url = environment.jobTitleEndpoint + '?jobtitle=' + categoryterm;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }


  private selectedskilltype = new BehaviorSubject('Primary');
  selectedskilltypechanges = this.selectedskilltype.asObservable();

  updateSkillType(skilltype: string) {
    this.selectedskilltype.next(skilltype);
  }

  private primaryjobskills: Jobskills[] = [];
  jobprimaryskillsChanged = new Subject<Jobskills[]>();

  private secondaryjobskills: Jobskills[] = [];
  jobsecondaryskillsChanged = new Subject<Jobskills[]>();

  getPrimaryAddedJobSkills() {
    return this.primaryjobskills.slice();
  }

  getSecondaryAddedJobSkills() {
    return this.secondaryjobskills.slice();
  }
  addJobSkill(jobskills: Jobskills) {
    if (jobskills.skilltype.toLowerCase() === "primary") {
      this.primaryjobskills.push(jobskills);
      this.jobprimaryskillsChanged.next(this.primaryjobskills.slice());
    } else {
      this.secondaryjobskills.push(jobskills);
      this.jobsecondaryskillsChanged.next(this.secondaryjobskills.slice());
    }
  }


  deletePrimarySkills(index: number) {
    this.primaryjobskills.splice(index, 1);
    this.jobprimaryskillsChanged.next(this.primaryjobskills.slice());
  }

  deleteSecondarySkills(index: number) {
    this.secondaryjobskills.splice(index, 1);
    this.jobsecondaryskillsChanged.next(this.secondaryjobskills.slice());
  }


  private responsibilities: string[] = [];
  responsibilitesChanged = new Subject<string[]>();

  getResponsibilities() {
    return this.responsibilities.slice();
  }

  addResponsibilities(responsibility: string) {
    this.responsibilities.push(responsibility);
    this.responsibilitesChanged.next(this.responsibilities.slice());
  }

  deleteResponsibilities(index: number) {
    this.responsibilities.splice(index, 1);
    this.responsibilitesChanged.next(this.responsibilities.slice());
  }




  private teammembers: string[] = [];
  teammembersChanged = new Subject<string[]>();


  getTeammembers() {
    return this.teammembers.slice();
  }

  addTeammember(teammember: string) {
    this.teammembers.push(teammember);
    this.teammembersChanged.next(this.teammembers.slice());
  }

  deleteTeammember(index: number) {
    this.teammembers.splice(index, 1);
    this.teammembersChanged.next(this.teammembers.slice());
  }


  getDomainlist() {
    return this.domain.slice();
  }

  addDomain(domain: string) {
    this.domain.push(domain);
    this.domainChanged.next(this.domain.slice());
  }

  deleteDomain(index: number) {
    this.domain.splice(index, 1);
    this.domainChanged.next(this.domain.slice());
  }


  getQualificationDetails(): Observable<Qualifications[]> {
    const url = environment.educationcriteriaendpoint;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }

  getNotifications(): Observable<Notification[]> {
    const url = environment.NotificationEndPoint;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }
  getaddedQualifications() {
    return this.qualifications.slice();
  }
  addQualifications(qualification: Qualifications) {
    this.qualifications.push(qualification);
    this.qualificationsChanged.next(this.qualifications.slice());
  }

  deleteQualifications(index: number) {
    this.qualifications.splice(index, 1);
    this.qualificationsChanged.next(this.qualifications.slice());
  }



  constructor(private http: HttpClient) {
  }
  getDashboarddata() {
    return this.http.get(this.apiUrl)
      .map((res: Response) => {
        return res.json();
      });
  }


  postOppurtunities(opportunity: Dashboard) {
    // this.opportunities.push(opportunity);
    return this.http.post(this.apiUrl, opportunity)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }
 

  getSkills(): Observable<string[]> {
    const url = environment.getskillsEndpoint;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }


  getLocationwisejobs() {
    const url = environment.locationwisejobtitlesendpoint;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }

  getContractduration() {
    return this.contractduration;
  }

  getContractExtension() {
    return this.contractextension;
  }

  getInterviewType(): Observable<InterviewType[]> {
    const url = environment.interviewtypeendpoint;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }



  getEmploymentType(): Observable<EmploymentType[]> {
    const url = environment.employmentTypeendpoint;
    return this.http.get<string[]>(url)
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
} 
