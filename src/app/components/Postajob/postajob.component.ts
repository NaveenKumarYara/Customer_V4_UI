import { Component, OnInit, Inject, NgZone  } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../../app.service';
import {Location } from '@angular/common';
import { Subject } from 'rxjs';
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
  this.appService.domain =[];
  this.appService.domainChanged = new Subject<GetDomain[]>();
  this.appService.adddomain = [];
  this.appService.adddomainChanged = new Subject<PjDomain[]>();

  this.appService.responsibilities =[];
  this.appService.responsibilitesChanged = new Subject<Roles[]>();
  this.appService.qualifications=[];
  this.appService.qualificationsChanged= new Subject<Qualifications[]>();
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
