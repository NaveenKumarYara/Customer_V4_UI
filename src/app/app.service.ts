import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GetCompanyLogo } from '../models/GetCompanyLogo';
import { Observable  } from 'rxjs/Rx';
import { Dashboard } from '../models/dashboard.model';
import { Offer } from '../models/offer.model';

import { Jobskills } from '../models/jobskills.model';
import { Subject } from 'rxjs/Subject';
import { RecentJobs } from '../models/recentjobs';
import { BehaviorSubject } from 'rxjs';
import { Qualifications } from '../models/qualifications.model';
import { Notification } from '../models/notifications';
import { InterviewType } from '../models/interviewtype.model';
import { retry } from 'rxjs/operator/retry';
import { EmploymentType } from '../models/employmenttype.model';
import { Postajob } from '../models/postajob.model';
import {CustomerContacts} from '../models/customercontacts';
import {draftDetails} from '../models/draftDetails';
import {GetEmailValidate} from '../models/GetEmailValidate';
import {GetCustomerDepartments} from '../models/GetCustomerDepartments';
import { PlanFeature } from "../models/PlanFeature";
import { GetCustomerClients } from '../models/GetCustomerClients';
import { PjDomain, GetDomain, CustomerUsers, PjTechnicalTeam, CategoryList,MultipleJobIds,jobImps,jobImmigration,jobDues,
        PjEducationDetails, PjRole, PjDisc, Roles, DiscResult, PrefLocation, Cities, Salary,JobLocationsDetails,
        ClientModel, AutoSearchClient, AutoSearchDepartment, DepartmentModel,JobReporting, AddResp,jobImmigrationData,
        PjDepartments } from './components/Postajob/models/jobPostInfo';
import { CDuration, WorkAuthorization } from '../models/workAuthorization';
import { Profile } from './components/jobdetails/models/SearchProfileDeatils';
import { XmlJobResponse } from './components/jobdetails/view-jobdetails/upload-profiles/bulkApply';
import { ParseResponsibilities } from './components/Postajob/Createajob/Step2/responsibilities-dialog/responsibilities-dialog.component';
import { SkillDetails, SkillData,SkillPostData } from '../models/skill.model';
import { SettingsService } from '../settings/settings.service';
import { CompanyProfile } from '../models/companyprofile';
import {billEstimates} from '../models/billEstimates';
import {invoiceEstimates} from '../models/GetBillingEstimates';
import {getBillingContactDetails} from '../models/getBillingContactDetails';
import {GetUnbilledChargeDetails} from '../models/GetUnbilledChargeDetails';
import { GetBillingCardDetails } from '../models/GetBillingCardDetails';
import {CustomerSubscription} from '../models/CustomerSubscription';
import {GetSubscriptionDetails} from '../models/GetSubscriptionDetails';
import { GetBillingAddressCustomer } from '../models/GetBillingAddressCustomer';
import { ReportingTeam } from '../models/GetJobDetailCustomer';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class AppService {

  private opportunities: Dashboard[] = [];
  private apiUrl = 'api/CustomerPortal';

  constructor(private http: HttpClient, private settingsService: SettingsService) {
  }

  locationselect:boolean=false;
  RemoteWork:boolean=false;

  domain: GetDomain[] = [];
  domainChanged = new Subject<GetDomain[]>();
  adddomain: PjDomain[] = [];
  adddomainChanged = new Subject<PjDomain[]>();

  qualifications: Qualifications[] = [];
  qualificationsChanged = new Subject<Qualifications[]>();

  addqualifications: PjEducationDetails[] = [];
  addqualificationsChanged = new Subject<PjEducationDetails[]>();

  addSkillslist: SkillData[] = [];
  skillPostData: SkillPostData[] = [];
  skillPostDataChanged=new Subject<SkillPostData[]>();

  customerUsers: PjTechnicalTeam[] = [];
  customerUserChanged = new Subject<PjTechnicalTeam[]>();

  skillDataList: SkillPostData[] =[];
  skillDataListChanged=new Subject<SkillPostData[]>();


  private interviewtype: InterviewType[] = [];

  private notifications: Notification[] = [];

  private customercontacts: CustomerContacts[] = [];

  private contractduration: CDuration[] = [];
  //   '3 months', '6 months', '1 year', 'more than 1 year'
  // ];
  private contractextension: WorkAuthorization[] = [];
  //   'Corp-Corp',
  //   'W2',
  //   'Contract to Hire',
  //   '1099'
  // ];
  private noOfOpeningsList: number[] = [
    1, 2, 3
  ];

  private completeDescriptionList: boolean[] = [
    true, false
  ];


  // private salaryType: string[] = [
  //   'Hourly', 'Annual'
  // ];

  ResponseList:AddResp[]=[];
   

  contractDuration = new BehaviorSubject('');
  currentContractDuration = this.contractDuration.asObservable();

  workAuthorization: WorkAuthorization;
  contractExtension = new BehaviorSubject(this.workAuthorization);
  currentContractExtension = this.contractExtension.asObservable();

  myInterviewType = new InterviewType();
  interviewType = new BehaviorSubject(this.myInterviewType);
  currentInterviewType = this.interviewType.asObservable();

  myEmploymentType = new EmploymentType();
  employmentType = new BehaviorSubject(this.myEmploymentType);
  currentEmploymentType = this.employmentType.asObservable();

  jobtitle = new BehaviorSubject('');
  currentjobtitle = this.jobtitle.asObservable();

 

  jobImp: number;
  JobImp = new BehaviorSubject(this.jobImp);
  currentjobImp = this.JobImp.asObservable();

  PriorityName: String;
  JobPriorityName = new BehaviorSubject(this.PriorityName);
  CurrentPriorityName = this.JobPriorityName.asObservable();


  jobDue: number;
  JobDue = new BehaviorSubject(this.jobDue);
  currentjobDue = this.JobDue.asObservable();

  jobDueDate: Date;
  JobDueDate = new BehaviorSubject(this.jobDueDate);
  currentjobDueDate = this.JobDueDate.asObservable();

  videoProfile = new BehaviorSubject('');
  currentVideo = this.videoProfile.asObservable();

  stepNumber = new BehaviorSubject('');
  currentStepNumber = this.stepNumber.asObservable();

  myDraft: boolean;
  isDrafted = new BehaviorSubject(this.myDraft);
  currentDraft = this.isDrafted.asObservable();

  salType = new Salary(1, 'Hourly');
  salaryType = new BehaviorSubject(this.salType);
  currentSalaryTYpe = this.salaryType.asObservable();

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

  jobPosition = new BehaviorSubject('');
  currentjobPosition = this.jobPosition.asObservable();

  // textOPening = new BehaviorSubject('');
  // currenttextOPening = this.textOPening.asObservable();

  myopenings: number;
  noofOpenings = new BehaviorSubject(this.myopenings);
  currentOpenings = this.noofOpenings.asObservable();

  //myLocation = new PrefLocation();
  location :PrefLocation[]=[];
  currentlocation = new Subject<PrefLocation[]>();

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

  myreportingManager = new CustomerUsers();
  reportingManager = new BehaviorSubject(this.myreportingManager);
  currentcustomerUsers = this.reportingManager.asObservable();
  
  reportingList:ReportingTeam[]=[];
  reportingListChanged = new Subject<ReportingTeam[]>();

  immigrations:jobImmigration[]=[];
  immigrationsChanged = new Subject<jobImmigration[]>();

  ImmigrationforJobs:jobImmigrationData[]=[];
  ImmigrationforJobChanged = new Subject<jobImmigrationData[]>();


  myjobcategory = new CategoryList();
  jobcategory = new BehaviorSubject(this.myjobcategory);
  currentcategorytitle = this.jobcategory.asObservable();

  myClient = new ClientModel();
  clientModel = new BehaviorSubject(this.myClient);
  currentClient = this.clientModel.asObservable();

 selectedskilltype = new BehaviorSubject('Primary');
 selectedskilltypechanges = this.selectedskilltype.asObservable();

  personTypes: DiscResult[] = [];
  personTypeChanged = new Subject<DiscResult[]>();

  JobIds:MultipleJobIds[]=[];
  JobLocations:Cities[]=[];
  JobLocationsChanged = new Subject<Cities[]>();
  JobLocationsMulti:Cities[]=[];

  OpeningsList=[];

  Locationswithpositions=[];

  personTypeSingle: PjDisc[] = [];
  personTypeSingleChanged = new Subject<PjDisc[]>();

  primaryjobskills: Jobskills[] = [];
  jobprimaryskillsChanged = new Subject<Jobskills[]>();

  secondaryjobskills: Jobskills[] = [];
  jobsecondaryskillsChanged = new Subject<Jobskills[]>();

  responsibilities: Roles[] = [];
  responsibilitesChanged = new Subject<Roles[]>();



  addedresponsibilities: PjRole[] = [];
  addedresponsibilitiesChanged = new Subject<PjRole[]>();

  teammembers: CustomerUsers[] = [];
  teammembersChanged = new Subject<CustomerUsers[]>();

  addedteammembers: PjTechnicalTeam[] = [];
  addedteammembersChanged = new Subject<PjTechnicalTeam[]>();

  departments: DepartmentModel[] = [];
  departmentsChanged = new Subject<DepartmentModel[]>();

  addeddepartments: PjDepartments[] = [];
  addeddepartmentsChanged = new Subject<PjDepartments[]>();

  xmlResponse: XmlJobResponse[] = [];
  xmlResponseChanged = new Subject<XmlJobResponse[]>();

  updatecDuration(cDuration: string) {
    this.contractDuration.next(cDuration);
  }

  updatecExtension(cExtension: WorkAuthorization) {
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
  updateJobPosition(jobpositionId: string) {
    this.jobPosition.next(jobpositionId);
  }
  updatehaddescription(isdescription: boolean) {
    this.hasDescription.next(isdescription);
  }
  updatedescription(isdescription: string) {
    this.description.next(isdescription);
  }
  updateLocation(loc: any) {
    this.location = loc;
  }
  updateJobtitle(jobtitle: string) {
    this.jobtitle.next(jobtitle);
  }

  updateJobImp(jobImp: number) {
    this.JobImp.next(jobImp);
  }

  updateJobPrority(jobPri: string) {
    this.JobPriorityName.next(jobPri);
  }

  updateJobDue(jobDue: number) {
    this.JobDue.next(jobDue);
  }

  updateJobDueDate(jobDueDate: Date) {
    this.JobDueDate.next(jobDueDate);
  }

  updateVideoProfile(videoUrl: string) {
    this.videoProfile.next(videoUrl);
  }
  updateStepNumber(step: string) {
      this.stepNumber.next(step);
  }
  updateJobDraft(draft?: boolean) {
      this.isDrafted.next(draft);
  }
  getDraftStatus() {
    return this.isDrafted.value;
  }
  getStepNumber() {
    return this.stepNumber.value;
  }
  // getSalaryType() {
  //   return this.salaryType;
  // }
  updatetSalaryType(type) {
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
    const url = this.settingsService.settings.jobTitleEndpoint + '?jobtitle=' + term;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }
  // searchClient(term: string = null): Observable<string[]> {
  //   const url = this.settingsService.settings.searchclientsendpoint + '?clientName=' + term;
  //   return this.http.get<string[]>(url)
  //     .catch(
  //       this.handleError
  //     );
  // }
  searchClient(customerId: number, val: boolean, term?: any): any {
    // const url = this.settingsService.settings.searchclientsendpoint + '?clientName=' + term;
    // return this.http.get<string[]>(url)
    //   .catch(
    //     this.handleError
    //   );
    const client = new AutoSearchClient();
    client.CustomerId = customerId;
    client.ClientName = term;
    client.IsSuggested = val;
    // if(val==false)
    return this.http.post(this.settingsService.settings.searchclientsendpoint, client)
    .map((res: Response) => res)
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
  }
  searchDepartment(term, val: boolean, customerId: number) {

    const department = new AutoSearchDepartment();
    department.CustomerId = customerId;
    department.DepartmentName = term;
    department.IsSuggested = val;
    return this.http.post(this.settingsService.settings.searchdepartmentendpoint, department)
    .map((res: Response) => res)
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
  }
  getDepartment() {
    return this.departments.slice();
  }

  getSkillDetails(): Observable<SkillDetails[]> {
    const url = this.settingsService.settings.JobMatchingParameter;
    var skilllist = this.http.get<string[]>(url)
        .catch(
            this.handleError
    );
    return skilllist;
}


getPricingPlans(): Observable<PlanFeature[]> {
  const url = this.settingsService.settings.GetPlans;
  return this.http.get<PlanFeature[]>(url)
  .catch(
    this.handleError
  );
}

GetJobPriority(): Observable<jobImps[]> {
  const url = this.settingsService.settings.GetjobImps;
  return this.http.get<jobImps[]>(url)
  .catch(
    this.handleError
  );
}

GetImmigrationStatus(): Observable<jobImmigration[]> {
  const url = this.settingsService.settings.GetImmigrationList;
  return this.http.get<jobImmigration[]>(url)
  .catch(
    this.handleError
  );
}

GetJobDueIn(): Observable<jobDues[]> {
  const url = this.settingsService.settings.GetDueDateList;
  return this.http.get<jobDues[]>(url)
  .catch(
    this.handleError
  );
}


getBillEstimates(UserId:number): Observable<billEstimates> {
  const url = this.settingsService.settings.GetPlanDuration+ '?UserId='+UserId ;
  return this.http.get<billEstimates>(url)
      .catch(
          this.handleError
      );
}


GetBillingEstimateDetails(customerId:number): Observable<invoiceEstimates[]>
{
  const url = this.settingsService.settings.BillingEstimateDetails+ '?customerId=' + customerId ;
  return this.http.get<invoiceEstimates[]>(url)
      .catch(
          this.handleError
      );
}


GetBillingContactDetails(customerId:number): Observable<getBillingContactDetails>
{
  const url = this.settingsService.settings.BillingContactDetails+ '?customerId=' + customerId ;
  return this.http.get<getBillingContactDetails>(url)
      .catch(
          this.handleError
      );
}

GetUnbilledChargeDetails(customerId:number): Observable<GetUnbilledChargeDetails[]>
{
  const url = this.settingsService.settings.UnbillingChargeDetails+ '?customerId=' + customerId ;
  return this.http.get<GetUnbilledChargeDetails[]>(url)
      .catch(
          this.handleError
      ); 
}


GetBilledCardDetails(customerId:number): Observable<GetBillingCardDetails>
{
  const url = this.settingsService.settings.BillingCardDetails+ '?customerId=' +customerId ;
  return this.http.get<GetBillingCardDetails>(url)
      .catch(
          this.handleError
      ); 
}

GetCustomerSubscription(userId :number): Observable<CustomerSubscription>
{
  const url = this.settingsService.settings.GetCustomerSubscription+ '?userId=' +userId ;
  return this.http.get<CustomerSubscription>(url)
      .catch(
          this.handleError
      ); 
}

GetSubscriptionDetails(subscriptionId:number):Observable<GetSubscriptionDetails>
{
  const url = this.settingsService.settings.GetSubscriptionDetails+ '?subscriptionId=' +subscriptionId ;
  return this.http.get<GetSubscriptionDetails>(url)
      .catch(
          this.handleError
      ); 
}

GetBillingAddressforCustomer(customerId:number):Observable<GetBillingAddressCustomer>
{
  const url = this.settingsService.settings.GetBillingAddressCustomer+ '?customerId=' +customerId ;
  return this.http.get<GetBillingAddressCustomer>(url)
      .catch(
          this.handleError
      ); 
}

 AddPlanDetails(body) :any {
    return this.http.post(this.settingsService.settings.AddPlan, body)
      .map((res: Response) => res)
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }


 SaveJobImmigration(body) :any {
    return this.http.post(this.settingsService.settings.SaveJobImmigration, body)
      .map((res: Response) => res)
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  SaveJobRoleResponse(body) :any {
    return this.http.post(this.settingsService.settings.SaveJobResponseRoles, body)
      .map((res: Response) => res)
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  UpdatePlanDetails(body) :any {
    return this.http.post(this.settingsService.settings.PlanUpdate, body)
      .map((res: Response) => res)
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  
getCompanyProfile(customerId:number): Observable<CompanyProfile> {
  const url = this.settingsService.settings.CompanyProfileBasicInfo+ 'customerId='+customerId ;
  return this.http.get<CompanyProfile>(url)
      .catch(
          this.handleError
      );
}

  getaddedDepartments() {
    return this.addeddepartments.slice();
  }
  addDepartment(department: any) {
    this.departments.push(department);
    this.departmentsChanged.next(this.departments.slice());
    const dept = new PjDepartments();
    dept.DepartmentId = department.DepartmentId;
    this.addeddepartments.push(dept);
    this.addeddepartmentsChanged.next(this.addeddepartments.slice());
  }
  deleteDepartment(index: number) {
    this.departments.splice(index, 1);
    this.departmentsChanged.next(this.departments.slice());
    this.addeddepartments.splice(index, 1);
    this.addeddepartmentsChanged.next(this.addeddepartments.slice());
  }
  getDraftCategory(jobId: number): Observable<CategoryList> {
    const url = this.settingsService.settings.draftCategory + '?jobId=' + jobId;
    return this.http.get<string>(url)
      .catch(
        this.handleError
      );
  }
   getDraftClient(jobId: number): Observable<ClientModel> {
    const url = this.settingsService.settings.getDraftClient + '?jobId=' + jobId;
    return this.http.get<string>(url)
      .catch(
        this.handleError
      );
  }
  // private reportingManager = new BehaviorSubject('');
  // currentManager = this.reportingManager.asObservable();

  // updateManager(reportingManager: string) {
  //   this.reportingManager.next(reportingManager);
  // }



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

  updateJobCategory(jobcategories: CategoryList) {
    // this.jobcategory.push(jobcategories);
    this.jobcategory.next(jobcategories);
  }
  updateClient(clients: ClientModel) {
    this.clientModel.next(clients);
  }
  searchJobCategory(categoryterm: string = null): Observable<CategoryList[]> {
    const url = this.settingsService.settings.jobCategoryEndpoint + '?jobCategory=' + categoryterm;
   return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }

  updateSkillType(skilltype: string) {
    this.selectedskilltype.next(skilltype);
  }

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

  AddContactInfo(body)
  {
    return this.http.post(this.settingsService.settings.AddContactShareInfo, body)
    .map((res: Response) => res)
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
  }


 

  getPersonTypes() {
    return this.personTypes.slice();
  }
  getaddedPersonTypes() {
    return this.personTypeSingle.slice();
  }

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
    return this.http.post(this.settingsService.settings.addSkillsEndpoint, body)
    .map((res: Response) => res)
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
  }

  AddDepartment(body) {
    return this.http.post(this.settingsService.settings.AddDepartment, body)
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

  getJobResponsibilities(jobid: number) {
    // return this.responsibilities.slice();
    const url = this.settingsService.settings.getJobResponsibilities + '?jobId=' + jobid;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }
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

  addBulkResponsibilities(responsibility: ParseResponsibilities) {
    return this.http.post(this.settingsService.settings.bulkResponsibilities, responsibility)
    .map((res: Response) => res)
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
  }
  deleteResponsibilities(index: number) {
    this.responsibilities.splice(index, 1);
    this.responsibilitesChanged.next(this.responsibilities.slice());
    this.addedresponsibilities.splice(index, 1);
    this.addedresponsibilitiesChanged.next(this.addedresponsibilities.slice());
  }

  saveRoles(body) {
    return this.http.post(this.settingsService.settings.addRoles, body)
    .map((res: Response) => res)
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
  }

  getRoles(body)  {
  return this.http.post(this.settingsService.settings.getRoles, body)
  .map((res: Response) => res)
  .catch(this.handleError);
  }

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

  DeleteShareContactInfo(infoId: number)
  {
    const url = this.settingsService.settings.DeleteShareContactInfo + 'infoid=' + infoId;
    return this.http.delete<string[]>(url)
      .catch(
        this.handleError
      );
  }


  DeleteResponsibility(jobId: number)
  {
    const url = this.settingsService.settings.DeleteJobResponsibility + '?jobId=' + jobId;
    return this.http.delete<string[]>(url)
      .catch(
        this.handleError
      );
  }

 addResponses(response: XmlJobResponse, val) {
    //  this.xmlResponse = responseList; // ush(personType);
    // this.xmlResponseChanged.next(this.xmlResponse.slice());
    // ?if (val === false) {
      // this.xmlResponse.filter((el, i, a) => i === a.indexOf(el))
     const chk = this.checkDuplciate(response, this.xmlResponse);
     if (chk === false) {
      this.xmlResponse.push(response);
     }      // for (let i = 0 ; i < this.xmlResponse.length; i++) {
        for (const xmlResp of this.xmlResponse) {
          // if (this.xmlResponse[i].ProfileId === response.ProfileId && val === false ) {
            if (xmlResp.ProfileId === response.ProfileId && val === false ) {
            // this.xmlResponse = this.xmlResponse.filter(resp => resp.ProfileId !== resp.ProfileId);
            // this.orders.indexOf(order), 1
            // this.xmlResponseChanged.next(this.xmlResponse.splice(i, 1));
            this.xmlResponse.splice(this.xmlResponse.indexOf(xmlResp), 1);
            this.xmlResponseChanged.next(this.xmlResponse.slice());
          } else {
            // this.xmlResponse.push(response);
            this.xmlResponseChanged.next(this.xmlResponse.slice());
          }
        }
    // } else {
    // this.xmlResponse.push(response);
    // this.xmlResponseChanged.next(this.xmlResponse.slice());
    // }
}
checkDuplciate(response, list) {​
  return list.some(function(elem) {
       return elem.ProfileId === response.ProfileId;
  });
}
bulkApply(body) {
  return this.http.post(this.settingsService.settings.bulkApply, body)
  .map((res: Response) => res)
  .catch((error: any) => {
    return Observable.throw(error);
    });
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
    const url = this.settingsService.settings.educationcriteriaendpoint;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }
  getCustomerUsers(customerId: number, userId: number, isSuggest: boolean, SearchString: string): Observable<CustomerUsers[]> {
    const url = this.settingsService.settings.getCustomerUsersendpoint + 'customerId=' + customerId + '&userId=' + userId + '&IsSuggest=' + isSuggest + '&SearchString=' + SearchString;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }

  GetContactInfo(customerId: number, infoid: number)
  {
    const url = this.settingsService.settings.GetCustomerContactsShareInfo + 'customerId=' + customerId + '&infoid=' + infoid;
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
    const url = this.settingsService.settings.domaincriteriaendpoint;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }
  getNotifications(userId: number): Observable<Notification[]> {
    const url = this.settingsService.settings.NotificationEndPoint + 'userId=' + userId;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }
  getCustomerContacts(customerId: number): Observable<CustomerContacts[]> {

    const url = this.settingsService.settings.GetCustomerUsers + 'customerId=' + customerId;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }
  getCustomerallContacts(customerId: number): Observable<CustomerUsers[]> {

    const url = this.settingsService.settings.GetCustomerUsers + 'customerId=' + customerId;
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

  addSkill(skill : SkillPostData,skillDisplay : SkillData){
      this.addSkillslist.push(skillDisplay);
      
      if (this.skillDataList.length > 0) {
          this.skillPostData = this.skillDataList;
      }
this.skillPostData.push(skill);
  }

  deleteSkill(index : number){
    this.addSkillslist.splice(index,1);
    this.skillPostData.splice(index,1);
}

  deleteQualifications(index: number) {
    this.qualifications.splice(index, 1);
    this.qualificationsChanged.next(this.qualifications.slice());
    this.addqualifications.splice(index, 1);
    this.addqualificationsChanged.next(this.addqualifications.slice());
  }

  getDashboarddata() {
    return this.http.get(this.apiUrl)
      .map((res: Response) => {
        return res.json();
      });
  }

  GetEditDrafts(customerId: number, userId: number) {
    const url = this.settingsService.settings.EditDraft + 'customerId=' + customerId + '&userId=' + userId;
    return this.http.get<draftDetails[]>(url)
        .catch(
            this.handleError
        );
  }

  GetJobTemplates(customerId: number) {
    const url = this.settingsService.settings.GetJobTemplates + 'customerId=' + customerId;
    return this.http.get<RecentJobs[]>(url)
        .catch(
            this.handleError
        );
  }

  postjob(body) {
    return this.http.post(this.settingsService.settings.postjob, body)
    .map((res: Response) => res)
    .catch((error: any) => {
      return Observable.throw(error);
      });
  }
  getCompanyLogo(customerId: number): Observable<GetCompanyLogo> {
  const url = this.settingsService.settings.GetCompanyLogo + 'customerId=' + customerId;
  return this.http.get<GetCompanyLogo>(url)
      .catch(
          this.handleError
      );
  }
  Login(body) {
    return this.http.post(this.settingsService.settings.Login, body)
    .map((res: Response) => res)
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
  }

  ReportingTeam(body) {
    return this.http.post(this.settingsService.settings.ReportingTeam, body)
    .map((res: Response) => res)
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
  }

  ForgotPassword(body) {
    return this.http.post(this.settingsService.settings.ForgotPassword, body)
    .map((res: Response) => res)
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
  }

  ActivateCustomerUser(body) {
    return this.http.post(this.settingsService.settings.ActivateCustomerUser, body)
    .map((res: Response) => res)
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
  }

  ResetPassword(body) {
    return this.http.post(this.settingsService.settings.ResetPassword, body)
    .map((res: Response) => res)
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
  }

  signUp(body) {
    return this.http.post(this.settingsService.settings.signUp, body)
    .map((res: Response) => res)
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
  }
  deactivateJob(body) {
    return this.http.post(this.settingsService.settings.deactivatejobEndpoint, body)
    .map((res: Response) => res)
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
  }

  validateemail(email: string): Observable<GetEmailValidate> {
    const url = this.settingsService.settings.EmailVaild + 'email=' + email;
    return this.http.get<GetEmailValidate>(url)
    .debounceTime(1000)
    .catch(
      this.handleError
    );
  }
  updateemail(body) {
    return this.http.post(this.settingsService.settings.updateemail, body)
    .map((res: Response) => res)
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
  }
  updatepassword(body) {
    return this.http.put(this.settingsService.settings.updatepassword, body)
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
    const url = this.settingsService.settings.getskillsEndpoint + '?skillName=' + skill;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }

  getDisc() {
    const url = this.settingsService.settings.discTestEndpoint;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }

  getLocationwisejobs(customerId: number) { // , userId: number
    const url = this.settingsService.settings.customerPreferredLocationendpoint + 'customerId=' + customerId + '&isPostajob=true'; // + '&userId=' + userId;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }

  ActivateUser(userId: number) {
    const url = this.settingsService.settings.ActivateUser +  'userId=' + userId;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }

  Deletedraft(jobId: number) {
    const url = this.settingsService.settings.Deletedraft +  'jobId=' + jobId;
    return this.http.delete<string[]>(url)
      .catch(
        this.handleError
      );
  }

  DeleteClients(customerClientId: number) {
    const url = this.settingsService.settings.DeleteCustomerClients + 'customerClientId=' + customerClientId;
    return this.http.delete<string[]>(url)
      .catch(
        this.handleError
      );
  }

  DeleteDepartments(customerDeptId: number) {
    const url = this.settingsService.settings.DeleteCustomerDepartments + 'customerDeptId=' + customerDeptId;
    return this.http.delete<string[]>(url)
      .catch(
        this.handleError
      );
  }


  getCities(cityName: string): Observable<Cities[]> {
    const url = this.settingsService.settings.getCitiesendpoint + 'cityName=' + cityName;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }
  getContractduration(): Observable<CDuration[]> {
    const url = this.settingsService.settings.contractDurationendpoint;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
    // return this.contractduration;
  }
  getHasDescription() {
    return this.completeDescriptionList;
  }
  getnoofopenings() {
    return this.noOfOpeningsList;
  }
  getContractExtension(): Observable<WorkAuthorization[]> {
    const url = this.settingsService.settings.workAuthorizationendpoint;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
    // return this.contractextension;
  }
  getInterviewType(): Observable<InterviewType[]> {
    const url = this.settingsService.settings.interviewtypeendpoint;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }
  addNewQualification(body)  {
    return this.http.post(this.settingsService.settings.addneweducationEndpoint, body)
    .map((res: Response) => res)
    .catch(this.handleError);
    }

    addCustomerUser(body)  {
      return this.http.post(this.settingsService.settings.InsertCustomerUser, body)
      .map((res: Response) => res)
      .catch(this.handleError);
      }

    suggestJobTitle(customerId: number) {
    const url = this.settingsService.settings.SuggestJobTitleEndPoint + 'customerId=' + customerId;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }
  suggestJobCategory(customerId: number) {
    const url = this.settingsService.settings.SuggestJobCategoryEndPoint + 'customerId=' + customerId;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }

  SearchClients(body) {
    return this.http.post(this.settingsService.settings.searchclientsendpoint, body)
    .map((res: Response) => res)
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
  }

  SearchDepartments(body) {
    return this.http.post(this.settingsService.settings.searchdepartmentendpoint, body)
    .map((res: Response) => res)
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
  }

  GetCustomerClients(customerId: number, clientId: number): Observable<GetCustomerClients[]> {
    const url = this.settingsService.settings.GetCustomerClients + '?clientId=' + clientId + '&customerId=' + customerId;
    return this.http.get<GetCustomerClients[]>(url)
      .catch(
        this.handleError
      );
  }

  GetCustomerDepartments(customerId: number, departmentId: number): Observable<GetCustomerDepartments[]> {
    const url = this.settingsService.settings.GetCustomerDepartments + '?departmentId=' + departmentId + '&customerId=' + customerId;
    return this.http.get<GetCustomerDepartments[]>(url)
      .catch(
        this.handleError
      );
  }
 GetJobDepartments(jobId: number): Observable<DepartmentModel[]> {
    const url = this.settingsService.settings.GetJobDepartment + '?jobId=' + jobId;
    return this.http.get<DepartmentModel[]>(url)
      .catch(
        this.handleError
      );
  }

  GetJobLocationbyJobId(jobId: number): Observable<JobLocationsDetails[]> {
    const url = this.settingsService.settings.GetJobLocationbyJobId + 'jobId=' + jobId;
    return this.http.get<JobLocationsDetails[]>(url)
      .catch(
        this.handleError
      );
  }

  SignUpEmail(body) {
    return this.http.post(this.settingsService.settings.EmailInvite, body)
    .map((res: Response) => res)
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
  }

  GetCustomerToken(body) {
    return this.http.post(this.settingsService.settings.CustomerTokenLogin, body)
    .map((res: Response) => res)
    .catch(this.handleError);
  }
  getEmploymentType(): Observable<EmploymentType[]> {
    const url = this.settingsService.settings.employmentTypeendpoint;
    return this.http.get<string[]>(url)
      .catch(
        this.handleError
      );
  }
  getSalaryType(): Observable<Salary[]> {
    const url = this.settingsService.settings.salaryTypeendpoint;
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
