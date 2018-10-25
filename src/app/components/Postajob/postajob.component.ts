import { Component, OnInit, Inject, NgZone  } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../../app.service';
import {Location } from '@angular/common';
import { Subject } from 'rxjs';
import { Jobskills } from '../../../models/jobskills.model';
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
