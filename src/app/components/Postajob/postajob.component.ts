import { Component, OnInit, Inject, NgZone  } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../../app.service';
import {Location } from '@angular/common';
import { Subject, Observable } from 'rxjs';
import {EmploymentType} from '../../../models/employmenttype.model';
import{InterviewType} from '../../../models/interviewtype.model';
import { Jobskills } from '../../../models/jobskills.model';
import { Qualifications } from '../../../models/qualifications.model';
import { PjDomain, GetDomain, CustomerUsers, KeyRole,PjTechnicalTeam,Cities,jobImmigrationData, CategoryList, PjEducationDetails, PjRole, PjDisc, Roles, DiscResult, PrefLocation, ClientModel, PjDepartments, DepartmentModel, SkillPostData, GetKeyRole } from '../../components/Postajob/models/jobPostInfo';
import { WorkAuthorization } from '../../../models/workAuthorization';
declare var $: any;
@Component({
  selector: 'app-postajob',
  templateUrl: './postajob.component.html',
  styleUrls: ['./postajob.component.css']
})
export class PostajobComponent implements OnInit {



  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService, private location: Location, private zone: NgZone) {

  }


  ngOnInit() {
   // this.appService.;
  // this.reload();
  localStorage.removeItem('completed');
  localStorage.removeItem('jobId');
  localStorage.removeItem('JobId');
  localStorage.removeItem('EditMode');
  localStorage.removeItem('hide');
  localStorage.removeItem('EditViewJob');
  localStorage.removeItem('draftItem');
  localStorage.removeItem('Item');
  this.appService.personTypes = [];
  this.appService.Locationswithpositions=[];
  this.appService.personTypeChanged = new Subject<DiscResult[]>();
  this.appService.customerUsers = [];
  this.appService.customerUserChanged = new Subject<PjTechnicalTeam[]>();
  this.appService.skillDataList = [];
  this.appService.skillDataListChanged = new Subject<SkillPostData[]>();
  this.appService.skillPostData = [];
  this.appService.skillPostDataChanged = new Subject<SkillPostData[]>();
  this.appService.addedresponsibilities = [];
  this.appService.addedresponsibilitiesChanged = new Subject<PjRole[]>();
  this.appService.domain = [];
  this.appService.domainChanged = new Subject<GetDomain[]>();
  this.appService.personTypeSingle = [];
  this.appService.personTypeSingleChanged = new Subject<PjDisc[]>();
  this.appService.adddomain = [];
  this.appService.adddomainChanged = new Subject<PjDomain[]>();
  this.appService.JobIds=[];
  this.appService.JobLocations=[];
  this.appService.reportingList=[];
  this.appService.recrutingList=[];
  this.appService.JobLocationsMulti=[];
  this.appService.jobtitle.next('');
  this.appService.JobDue.next(5);
  this.appService.JobImp.next(3);
  //this.appService.JobDueDate.next(new Date());
  this.appService.ImmigrationforJobs=[];
  this.appService.ImmigrationforJobChanged = new Subject<jobImmigrationData[]>();
  this.appService.stepNumber.next('1');
  this.appService.OpeningsList=[];
  this.appService.locationselect=false;
  this.appService.JobLocationsMulti=[];
  this.appService.RemoteWork= false;
  this.appService.HideSalary = true;
  this.appService.BonusOffered = false;
  this.appService.JobLocationsChanged=  new Subject<Cities[]>();
  this.appService.jobcategory.next(new CategoryList());
  // this.appService.minExperience.next(1);
  // this.appService.maxExperience.next(1);
  this.appService.hasDescription.next(false);
  this.appService.description.next('');
  this.appService.jobPosition.next('');
  this.appService.IndustryId.next('');
  this.appService.jobcategorynew.next('');
  this.appService.jobcategorynewId.next('');
  this.appService.jobtypePosition.next('');
  this.appService.jobtypePositionId.next('');
  this.appService.jobtitleId.next('');
  this.appService.jobIndustry.next('');
  this.appService.clientModel.next(new ClientModel());
  this.appService.departments = [];
  this.appService.departmentsChanged = new Subject<DepartmentModel[]>();
  this.appService.addeddepartments = [];
  this.appService.addeddepartmentsChanged = new Subject<PjDepartments[]>();
  this.appService.keyrole = [];
  this.appService.keyroleChanged = new Subject<GetKeyRole[]>();
  this.appService.addkeyrole = [];
  this.appService.addkeyroleChanged = new Subject<KeyRole[]>();
  this.appService.ResponseList=[];
  this.appService.noofOpenings.next(2);
  this.appService.minAnnualRate.next(1000);
  this.appService.maxAnnualRate.next(10000);
  this.appService.minHourlyRate.next(20);
  this.appService.maxHourlyRate.next(100);
  this.appService.minExperience.next(36);
  this.appService.maxExperience.next(60);
  this.appService.location=[];
  this.appService.reportingManager.next(new CustomerUsers());
  this.appService.selectedskilltype.next('');
  this.appService.employmentType.next(new EmploymentType());
  this.appService.interviewType.next(new InterviewType());
  this.appService.contractDuration.next('');
  this.appService.contractExtension.next(new WorkAuthorization());
  this.appService.addedteammembers = [];
  this.appService.addedteammembersChanged = new Subject<PjTechnicalTeam[]>();
  this.appService.teammembers = [];
  let date = new Date();  
  let val = new Date(date.setDate(date.getDate() + 30 )) ;
  this.appService.JobDueDate.next(val);
  this.appService.teammembersChanged = new Subject<CustomerUsers[]>();
  // this.appService.currentcustomerUsers = new Observable();
  // this.appService.selectedskilltypechanges = new Observable();
  // this.appService.currentContractDuration =  new Observable();
  // this.appService.currentContractExtension = new Observable();
  // this.appService.currentInterviewType = new Observable();
  // this.appService.currentEmploymentType =  new Observable();
  // this.appService.currentjobtitle =  new Observable();
  // this.appService.currentminExp = new Observable();
  // this.appService.currentmaxExp = new Observable();
  // this.appService.currentcustomerUsers = new Observable();
  // this.appService.currentDescriptionChecked = new Observable();
  // this.appService.currentDescription = new Observable();
  // this.appService.currentOpenings = new Observable();
  // this.appService.currentlocation = new Observable();
  this.appService.responsibilities = [];
  this.appService.responsibilitesChanged = new Subject<Roles[]>();
  this.appService.qualifications = [];
  this.appService.qualificationsChanged = new Subject<Qualifications[]>();
  this.appService.primaryjobskills = [];
  this.appService.secondaryjobskills = [];
  this.appService.jobsecondaryskillsChanged = new Subject<Jobskills[]>(); // .closed();
  this.appService.jobprimaryskillsChanged = new Subject<Jobskills[]>();
  this.appService.videoProfile.next('');
  // this._setOption.next(null);
  // setTimeout(() => {
  //   this._setOption.next(null);
  // }, 100);

  // leave page
  // window.addEventListener('beforeunload', function (e) {
  //   const confirmationMessage = '\o/';
  // console.log('cond');
  //   e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
  //   return confirmationMessage;
  // });
}
createJob() {
  $("#activepostjob").addClass('active');
  let activepostjob= true;
  localStorage.setItem('activepostjob', JSON.stringify(activepostjob));
  this.router.navigateByUrl('/app-createajob');
  // this.location.go('/app-createajob');
  // this.reload();
}

editTemplate()
{
  $("#activepostjob").addClass('active');
  let activepostjob= true;
  localStorage.setItem('activepostjob', JSON.stringify(activepostjob));
  this.router.navigateByUrl('/app-jobtemplate'); 
}

editDraft() {
  $("#activepostjob").addClass('active');
  let activepostjob= true;
  localStorage.setItem('activepostjob', JSON.stringify(activepostjob));
  this.router.navigateByUrl('/app-editdraft');
}
public reload(): any {
  return this.zone.runOutsideAngular(() => {
      location.reload();
  });
}
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }



}
