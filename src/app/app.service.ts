import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GetCompanyLogo } from '../models/GetCompanyLogo';
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
import {CustomerContacts} from '../models/customercontacts';
import {GetEmailValidate} from '../models/GetEmailValidate';
import { PjDomain, GetDomain, CustomerUsers, PjTechnicalTeam, CategoryList, PjEducationDetails, PjRole, PjDisc, Roles, DiscResult, PrefLocation, Cities } from './components/Postajob/models/jobPostInfo';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class AppService {

  private opportunities: Dashboard[] = [];
  private apiUrl = 'api/CustomerPortal';


     domain: GetDomain[] = [];
  domainChanged = new Subject<GetDomain[]>();
     adddomain: PjDomain[] = [];
  adddomainChanged = new Subject<PjDomain[]>();

   qualifications: Qualifications[] = [];
  qualificationsChanged = new Subject<Qualifications[]>();

   addqualifications: PjEducationDetails[] = [];
  addqualificationsChanged = new Subject<PjEducationDetails[]>();

   customerUsers: PjTechnicalTeam[] = [];
  customerUserChanged = new Subject<PjTechnicalTeam[]>();

  private interviewtype: InterviewType[] = [];

  private notifications: Notification[] = [];

  private customercontacts: CustomerContacts[] = [];

  private contractduration: string[] = [
    '3 months', '6 months', '1 year', 'more than 1 year'
  ];

  private noOfOpeningsList: number[] = [
    1, 2, 3
  ];

  private completeDescriptionList: boolean[] = [
    true, false
  ];

  private contractextension: string[] = [
    'Corp-Corp',
    'W2',
    'Contract to Hire',
    '1099'
  ];
  private salaryType: string[] = [
    'Hourly', 'Annual'
  ]; 
 
  contractDuration = new BehaviorSubject('');
  currentContractDuration = this.contractDuration.asObservable();

  contractExtension = new BehaviorSubject('');
  currentContractExtension = this.contractExtension.asObservable();

  myInterviewType = new InterviewType();
   interviewType = new BehaviorSubject(this.myInterviewType);
  currentInterviewType = this.interviewType.asObservable();

  myEmploymentType = new EmploymentType();
   employmentType = new BehaviorSubject(this.myEmploymentType);
  currentEmploymentType = this.employmentType.asObservable();

 jobtitle = new BehaviorSubject('');
  currentjobtitle = this.jobtitle.asObservable();

  stepNumber = new BehaviorSubject('');
  currentStepNumber = this.stepNumber.asObservable();

   myDraft: boolean;
  isDrafted = new BehaviorSubject(this.myDraft);
  currentDraft = this.isDrafted.asObservable();



  pMinexp: number;
   minExperience = new BehaviorSubject(this.pMinexp);
  currentminExp = this.minExperience.asObservable();

  pMaxexp: number;
   maxExperience = new BehaviorSubject(this.pMaxexp);
  currentmaxExp = this.maxExperience.asObservable();

  myDescription: boolean;
  hasDescription = new BehaviorSubject(this.myDescription);
  currentDescriptionChecked = this.hasDescription.asObservable();

  description = new BehaviorSubject('');
  currentDescription = this.description.asObservable();

  // textOPening = new BehaviorSubject('');
  // currenttextOPening = this.textOPening.asObservable();

  myopenings: number;
  noofOpenings = new BehaviorSubject(this.myopenings);
  currentOpenings = this.noofOpenings.asObservable();

  myLocation = new PrefLocation();
  location = new BehaviorSubject(this.myLocation);
  currentlocation = this.location.asObservable();

 myMinAnnualRate = 1000;
 myMaxAnnualRate = 10000;
 minAnnualRate = new BehaviorSubject(this.myMinAnnualRate);
 currentMinRate =  this.minAnnualRate.asObservable();

 maxAnnualRate = new BehaviorSubject(this.myMaxAnnualRate);
 currentMaxRate =  this.maxAnnualRate.asObservable();

 myMinHourlyRate = 20;
 myMaxHourlyRate = 100;
 minHourlyRate = new BehaviorSubject(this.myMinHourlyRate);
 currentMinHourlyRate =  this.minHourlyRate.asObservable();

 maxHourlyRate = new BehaviorSubject(this.myMaxHourlyRate);
 currentMaxHourlyRate =  this.maxHourlyRate.asObservable();

  updatecDuration(cDuration: string) {
    this.contractDuration.next(cDuration);
  }

  updatecExtension(cExtension: string) {
    this.contractExtension.next(cExtension);
  }

  updateInterviewType(iType: InterviewType) {
    this.interviewType.next(iType);
  }

  updateEmploymentType(eType: EmploymentType) {
    this.employmentType.next(eType);
  }
  updateMinExp(minexp: number) {
    this.minExperience.next(minexp);
  }
  updateMaxExp(maxexp: number) {
    this.maxExperience.next(maxexp);
  }
  updateOpenings(openings: number) {
    this.noofOpenings.next(openings);
  }
  updatehaddescription(isdescription: boolean) {
    this.hasDescription.next(isdescription);
  }
  updatedescription(isdescription: string) {
    this.description.next(isdescription);
  }
  updateLocation(loc: PrefLocation) {
    this.location.next(loc);
  }
  updateJobtitle(jobtitle: string) {
    this.jobtitle.next(jobtitle);
  }
  updateStepNumber(step: string) {
    this.stepNumber.next(step);
  }
  getSalaryType() {
    return this.salaryType;
  }
  updateSalaryRange(min: number, max: number, salaryType) {
    if (salaryType === 2) {
    this.minAnnualRate.next(min);
    this.maxAnnualRate.next(max);
    } else {
      this.minHourlyRate.next(min);
      this.maxHourlyRate.next(max);
    }
  }
  searchJobTitle(term: string = null): Observable<string[]> {
    const url = environment.jobTitleEndpoint + '?jobtitle=' + term;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }
  // private reportingManager = new BehaviorSubject('');
  // currentManager = this.reportingManager.asObservable();

  // updateManager(reportingManager: string) {
  //   this.reportingManager.next(reportingManager);
  // }

  myreportingManager = new CustomerUsers();
   reportingManager = new BehaviorSubject(this.myreportingManager);
  currentcustomerUsers = this.reportingManager.asObservable();


  updateManager(customerUser: CustomerUsers) {
    // this.jobcategory.push(jobcategories);
    this.reportingManager.next(customerUser);
  }

  // jobcategory = new BehaviorSubject('');
  // currentcategorytitle = this.jobcategory.asObservable();
  // jobcategoriesList: CategoryList[] = [];
  // jobcategory  = new BehaviorSubject<CategoryList[]>(undefined); // = new CategoryList();
  // currentcategorytitle = this.jobcategory.asObservable(); // .distinctUntilChanged(); // new Subject<CategoryList>();

  //  jobcategory: CategoryList[] = [];
  // currentcategorytitle = new Subject<CategoryList[]>();
  myjobcategory = new CategoryList();
   jobcategory = new BehaviorSubject(this.myjobcategory);
  currentcategorytitle = this.jobcategory.asObservable();


  updateJobCategory(jobcategories: CategoryList) {
    // this.jobcategory.push(jobcategories);
    this.jobcategory.next(jobcategories);
  }

  searchJobCategory(categoryterm: string = null): Observable<CategoryList[]> {
    const url = environment.jobCategoryEndpoint + '?jobCategory=' + categoryterm;
   return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }


  selectedskilltype = new BehaviorSubject('Primary');
  selectedskilltypechanges = this.selectedskilltype.asObservable();

  updateSkillType(skilltype: string) {
    this.selectedskilltype.next(skilltype);
  }

   personTypes: DiscResult[] = [];
  personTypeChanged = new Subject<DiscResult[]>();

   personTypeSingle: PjDisc[] = [];
  personTypeSingleChanged = new Subject<PjDisc[]>();

  addPersonType(personTypeList: DiscResult[], personType: PjDisc, val?) {
      this.personTypes = personTypeList; // ush(personType);
      this.personTypeChanged.next(this.personTypes.slice());
      // let pType = new PjDisc;
      // pType.DiscTestId = personType.DISCTestId;
      if (val === false) {
        for (let i = 0 ; i < this.personTypeSingle.length; i++) {
            if (this.personTypeSingle[i].DiscTestId === personType.DiscTestId) {
              this.personTypeSingleChanged.next(this.personTypeSingle.splice(i, 1));
            }
          }
      } else {
      this.personTypeSingle.push(personType);
      this.personTypeSingleChanged.next(this.personTypeSingle.slice());
      }
  }
  getPersonTypes() {
    return this.personTypes.slice();
  }
getaddedPersonTypes() {
    return this.personTypeSingle.slice();
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
  addSkills(body) {
    return this.http.post(environment.addSkillsEndpoint, body)
    .map((res: Response) => res)
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
  }

  deletePrimarySkills(index: number) {
    this.primaryjobskills.splice(index, 1);
    this.jobprimaryskillsChanged.next(this.primaryjobskills.slice());
  }

  deleteSecondarySkills(index: number) {
    this.secondaryjobskills.splice(index, 1);
    this.jobsecondaryskillsChanged.next(this.secondaryjobskills.slice());
  }


   responsibilities: Roles[] = [];
  responsibilitesChanged = new Subject<Roles[]>();


   addedresponsibilities: PjRole[] = [];
  addedresponsibilitiesChanged = new Subject<PjRole[]>();

  getResponsibilities() {
    return this.responsibilities.slice();
  }
  getAddedResponsibilities() {
    return this.addedresponsibilities.slice();
  }
  addResponsibilities(responsibility: Roles) {
    this.responsibilities.push(responsibility);
    this.responsibilitesChanged.next(this.responsibilities.slice());
    const role = new PjRole();
    role.RoleId = responsibility.RoleId;
    this.addedresponsibilities.push(role);
    this.addedresponsibilitiesChanged.next(this.addedresponsibilities.slice());
  }

  deleteResponsibilities(index: number) {
    this.responsibilities.splice(index, 1);
    this.responsibilitesChanged.next(this.responsibilities.slice());
    this.addedresponsibilities.splice(index, 1);
    this.addedresponsibilitiesChanged.next(this.addedresponsibilities.slice());
  }

  saveRoles(body) {
    return this.http.post(environment.addRoles, body)
    .map((res: Response) => res)
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
  }

  getRoles(body)  {
  return this.http.post(environment.getRoles, body)
  .map((res: Response) => res)
  .catch(this.handleError);
  }

   teammembers: CustomerUsers[] = [];
  teammembersChanged = new Subject<CustomerUsers[]>();

    addedteammembers: PjTechnicalTeam[] = [];
  addedteammembersChanged = new Subject<PjTechnicalTeam[]>();

  getTeammembers() {
    return this.teammembers.slice();
  }
  getaddedTeammembers() {
    return this.addedteammembers.slice();
  }
  addTeammember(teammember: CustomerUsers) {
    this.teammembers.push(teammember);
    this.teammembersChanged.next(this.teammembers.slice());
    const team = new PjTechnicalTeam();
    team.UserId = teammember.UserId;
    this.addedteammembers.push(team);
    this.addedteammembersChanged.next(this.addedteammembers.slice());
  }

  deleteTeammember(index: number) {
    this.teammembers.splice(index, 1);
    this.teammembersChanged.next(this.teammembers.slice());
    this.addedteammembers.splice(index, 1);
    this.addedteammembersChanged.next(this.addedteammembers.slice());
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
    domainVal.MinimumExperience =  domain.MinimumExperience;
    domainVal.MaximumExperience = domain.MaximumExperience;
    domainVal.ExperienceRequired = true;
    domainVal.Description = 'abcde';
    domainVal.DomainId = domain.DomainId;
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
    this.adddomain.splice(index, 1);
    this.adddomainChanged.next(this.adddomain.slice());
  }
  getQualificationDetails(): Observable<Qualifications[]> {
    const url = environment.educationcriteriaendpoint;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }
getCustomerUsers(customerId: number, userId: number): Observable<CustomerUsers[]> {
  const url = environment.getCustomerUsersendpoint + 'customerId=' + customerId + '&userId=' + userId;
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
  getNotifications(userId: number): Observable<Notification[]> {
    const url = environment.NotificationEndPoint + 'userId=' + userId;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }
  getCustomerContacts(customerId: number, userId: number): Observable<CustomerContacts[]> {

    const url = environment.GetCustomerContacts + 'customerId=' + customerId + '&userId=' + userId;
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
    const addQlfcn = new PjEducationDetails();
    addQlfcn.QualificationId = qualification.QualificationId;
      addQlfcn.IsActive = true;
    this.addqualifications.push(addQlfcn);
    this.addqualificationsChanged.next(this.addqualifications.slice());
  }

  deleteQualifications(index: number) {
    this.qualifications.splice(index, 1);
    this.qualificationsChanged.next(this.qualifications.slice());
    this.addqualifications.splice(index, 1);
    this.addqualificationsChanged.next(this.addqualifications.slice());
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
getCompanyLogo(customerId: number): Observable<GetCompanyLogo> {
  const url = environment.GetCompanyLogo + 'customerId=' + customerId;
  return this.http.get<GetCompanyLogo>(url)
      .catch(
          this.handleError
      );
}
Login(body) {
  return this.http.post(environment.Login, body)
  .map((res: Response) => res)
  .catch((error: any) => {
    return Observable.throw(error.json());
  });
}

ForgotPassword(body) {
  return this.http.post(environment.ForgotPassword, body)
  .map((res: Response) => res)
  .catch((error: any) => {
    return Observable.throw(error.json());
  });
}

ResetPassword(body) {
  return this.http.post(environment.ResetPassword, body)
  .map((res: Response) => res)
  .catch((error: any) => {
    return Observable.throw(error.json());
  });
}

signUp(body) {
  return this.http.post(environment.signUp, body)
  .map((res: Response) => res)
  .catch((error: any) => {
    return Observable.throw(error.json());
  });
}
deactivateJob(body) {
  return this.http.post(environment.deactivatejobEndpoint, body)
  .map((res: Response) => res)
  .catch((error: any) => {
    return Observable.throw(error.json());
  });
}

validateemail(email:string): Observable<GetEmailValidate> {
  const url = environment.EmailVaild + 'email=' + email;
  return this.http.get<GetEmailValidate>(url)
    .debounceTime(1000)
    .catch(
      this.handleError
    );
}
updateemail(body) {
  return this.http.post(environment.updateemail, body)
  .map((res: Response) => res)
  .catch((error: any) => {
    return Observable.throw(error.json());
  });
}
updatepassword(body) {
  return this.http.put(environment.updatepassword, body)
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


  getSkills(skill: string = null): Observable<string[]> {
    const url = environment.getskillsEndpoint + '?skillName=' + skill;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }

  getDisc() {
    const url = environment.discTestEndpoint;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }

  getLocationwisejobs(customerId: number, userId: number) {
    const url = environment.customerPreferredLocationendpoint + 'customerId=' + customerId + '&userId=' + userId;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }

  ActivateUser(userId: number) {
    const url = environment.ActivateUser+  'userId=' + userId;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }

  getCities(cityName: string): Observable<Cities[]> {
    const url = environment.getCitiesendpoint + 'cityName=' + cityName;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }
  getContractduration() {
    return this.contractduration;
  }
  getHasDescription() {
    return this.completeDescriptionList;
  }
  getnoofopenings() {
    return this.noOfOpeningsList;
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



  addNewQualification(body)  {
    return this.http.post(environment.addneweducationEndpoint, body)
    .map((res: Response) => res)
    .catch(this.handleError);
  }




 suggestJobTitle(customerId: number) {
    const url = environment.SuggestJobTitleEndPoint + 'customerId=' + customerId;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }
  suggestJobCategory(customerId: number) {
    const url = environment.SuggestJobCategoryEndPoint + 'customerId=' + customerId;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }

  SignUpEmail(body) {
    return this.http.post(environment.EmailInvite, body)
    .map((res: Response) => res)
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
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
