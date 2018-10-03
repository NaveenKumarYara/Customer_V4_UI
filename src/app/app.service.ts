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
import { Qualifications, AddQualification } from '../models/qualifications.model';
import { Notification } from '../models/notifications';
import { InterviewType } from '../models/interviewtype.model';
import { retry } from 'rxjs/operator/retry';
import { EmploymentType } from '../models/employmenttype.model';
import { Postajob } from '../models/postajob.model';
import { PjDomain, GetDomain, CustomerUsers, PjTechnicalTeam } from './components/Postajob/models/jobPostInfo';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class AppService {

  private opportunities: Dashboard[] = [];
  private apiUrl = 'api/CustomerPortal';


  private domain: GetDomain[] = [];
 domainChanged = new Subject<GetDomain[]>();
 private adddomain: PjDomain[] = [];
 adddomainChanged = new Subject<PjDomain[]>();
  private qualifications: Qualifications[] = [];
  qualificationsChanged = new Subject<Qualifications[]>();
  private addqualifications: AddQualification[] = [];
  addqualificationsChanged = new Subject<AddQualification[]>();

  private customerUsers: PjTechnicalTeam[] = [];
  customerUserChanged = new Subject<PjTechnicalTeam[]>();

  private interviewtype: InterviewType[] = [];

  private notifications: Notification[] = [];

  private contractduration: string[] = [
    '3 months', '6 months', '1 year', 'more than 1 year'
  ];

  private contractextension: string[] = [
    'Corp-Corp',
    'W2',
    'Contract to Hire',
    '1099'
  ];


  jobtitle = new BehaviorSubject('');
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
  private reportingManager = new BehaviorSubject('');
  currentManager = this.reportingManager.asObservable();

  updateManager(reportingManager: string) {
    this.reportingManager.next(reportingManager);
  }

  jobcategory = new BehaviorSubject('');
  currentcategorytitle = this.jobcategory.asObservable();

  updateJobCategory(jobcategory: string) {
    this.jobcategory.next(jobcategory);
  }

  searchJobCategory(categoryterm: string = null): Observable<string[]> {
    const url = environment.jobCategoryEndpoint + '?jobCategory=' + categoryterm;
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

   primaryjobskills: Jobskills[] = [];
  jobprimaryskillsChanged = new Subject<Jobskills[]>();

   secondaryjobskills: Jobskills[] = [];
  jobsecondaryskillsChanged = new Subject<Jobskills[]>();

  getPrimaryAddedJobSkills() {
    return this.primaryjobskills.slice();
  }

  getSecondaryAddedJobSkills() {
    return this.secondaryjobskills.slice();
  }
  addJobSkill(jobskills: Jobskills) {
    if (jobskills.SkillType === true) {
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

  saveRoles(body) {
    return this.http.post(environment.addRoles, body)
    .map((res: Response) => res.json())
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
  }

  getRoles(body)  {
  return this.http.post(environment.getRoles, body)
  .map((res: Response) => res)
  .catch(this.handleError);
  }

  private teammembers: string[] = [];
  teammembersChanged = new Subject<string[]>();

  private addedteammembers: PjTechnicalTeam[] = [];
  addedteammembersChanged = new Subject<PjTechnicalTeam[]>();

  getTeammembers() {
    return this.teammembers.slice();
  }
  getaddedTeammembers() {
    return this.addedteammembers.slice();
  }
  addTeammember(teammember: string) {
    this.teammembers.push(teammember);
    this.teammembersChanged.next(this.teammembers.slice());
    const team = new PjTechnicalTeam();
    team.UserId = parseInt(teammember, 10);
    this.addedteammembers.push(team);
    this.addedteammembersChanged.next(this.addedteammembers.slice());
  }

  deleteTeammember(index: number) {
    this.teammembers.splice(index, 1);
    this.teammembersChanged.next(this.teammembers.slice());
  }


  // private reportingManager: string[] = [];
  // reportingManagerChanged = new Subject<string[]>();


  // getreportingManager() {
  //   return this.reportingManager.slice();
  // }

  // addreportingManager(teammember: string) {
  //   this.reportingManager.push(teammember);
  //   this.reportingManagerChanged.next(this.reportingManager.slice());
  // }

  // deletereportingManager(index: number) {
  //   this.reportingManager.splice(index, 1);
  //   this.reportingManagerChanged.next(this.reportingManager.slice());
  // }


  getDomainlist() {
    return this.domain.slice();
  }
  getAddedDomainlist() {
    return this.adddomain.slice();
  }
  addDomain(domain: GetDomain) {
    this.domain.push(domain);
    this.domainChanged.next(this.domain.slice());
    const domainVal = new PjDomain;
    domainVal.MinimumExperience = 1;
    domainVal.MaximumExperience = 2;
    domainVal.ExperienceRequired = true;
    domainVal.Description = 'abcde';
    domainVal.DomainId = parseInt(domain.DomainName, 10);
    this.adddomain.push(domainVal);
    this.adddomainChanged.next(this.adddomain.slice());
    // const addQlfcn = new AddQualification();
    // addQlfcn.QualificationId = qualification.QualificationId;
    //   addQlfcn.IsActive = true;
    // this.addqualifications.push(addQlfcn);
    // this.addqualificationsChanged.next(this.addqualifications.slice());
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
getCustomerUsers(): Observable<CustomerUsers[]> {
  const url = environment.getCustomerUsersendpoint;
  return this.http.get<string[]>(url)
    .catch(
      this.handleError
    );
}
addCustomerUsers(technicalTeam: PjTechnicalTeam) {
  this.customerUsers.push(technicalTeam);
  this.customerUserChanged.next(this.customerUsers.slice());
}
  getDomainDetails(): Observable<GetDomain[]> {
    const url = environment.domaincriteriaendpoint;
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
  getaddaddedQualifications() {
    return this.addqualifications.slice();
  }
  addQualifications(qualification: Qualifications) {
    this.qualifications.push(qualification);
    this.qualificationsChanged.next(this.qualifications.slice());
    const addQlfcn = new AddQualification();
    addQlfcn.QualificationId = qualification.QualificationId;
      addQlfcn.IsActive = true;
    this.addqualifications.push(addQlfcn);
    this.addqualificationsChanged.next(this.addqualifications.slice());
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

postjob(body) {
  return this.http.post(environment.postjob, body)
  .map((res: Response) => res)
  .catch((error: any) => {
    return Observable.throw(error.json());
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
    const url = environment.customerPreferredLocationendpoint;
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
