import { Component, OnInit, Inject, NgZone  } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../../app.service';
import {Location } from '@angular/common';
import { Subject, Observable } from 'rxjs';
import {EmploymentType} from '../../../models/employmenttype.model';
import{InterviewType} from '../../../models/interviewtype.model';
import { Jobskills } from '../../../models/jobskills.model';
import { Qualifications } from '../../../models/qualifications.model';
import { PjDomain, GetDomain, CustomerUsers, PjTechnicalTeam, CategoryList, PjEducationDetails, PjRole, PjDisc, Roles, DiscResult, PrefLocation } from '../../components/Postajob/models/jobPostInfo';
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
  localStorage.removeItem('jobId');
    localStorage.removeItem('EditMode');
  this.appService.personTypes = [];
  this.appService.personTypeChanged = new Subject<DiscResult[]>();
  this.appService.customerUsers = [];
  this.appService.customerUserChanged = new Subject<PjTechnicalTeam[]>();
  this.appService.addedresponsibilities = [];
  this.appService.addedresponsibilitiesChanged = new Subject<PjRole[]>();
  this.appService.domain = [];
  this.appService.domainChanged = new Subject<GetDomain[]>();
  this.appService.personTypeSingle = [];
  this.appService.personTypeSingleChanged = new Subject<PjDisc[]>();
  this.appService.adddomain = [];
  this.appService.adddomainChanged = new Subject<PjDomain[]>();
  this.appService.jobtitle.next('');
  this.appService.jobcategory.next(new CategoryList());
  this.appService.minExperience.next(0);
  this.appService.maxExperience.next(0);
  this.appService.hasDescription.next(false);
  this.appService.description.next('');
  this.appService.noofOpenings.next(0);
  this.appService.minAnnualRate.next(1000);
  this.appService.maxAnnualRate.next(10000);
  this.appService.minHourlyRate.next(20);
  this.appService.maxHourlyRate.next(100);
  this.appService.location.next(new PrefLocation());
  this.appService.reportingManager.next(new CustomerUsers());
  this.appService.selectedskilltype.next('');
  this.appService.employmentType.next(new EmploymentType());
  this.appService.interviewType.next(new InterviewType());
  this.appService.contractDuration.next('');
  this.appService.contractExtension.next('');
  this.appService.addedteammembers = [];
  this.appService.addedteammembersChanged = new Subject<PjTechnicalTeam[]>();
  this.appService.teammembers = [];
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
  // this._setOption.next(null);
  // setTimeout(() => {
  //   this._setOption.next(null);
  // }, 100);
  }

createJob() {
  this.router.navigateByUrl('/app-createajob');
  // this.location.go('/app-createajob');
  // this.reload();
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
