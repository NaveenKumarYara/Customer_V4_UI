import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { Subscription } from 'rxjs/Subscription';
import { PrefLocation } from '../../models/jobPostInfo';

@Component({
  selector: 'app-steps-step2-locationwisejobs',
  templateUrl: './locationwisejobs.component.html'
})

export class LocationwiseJobsComponent implements OnInit, OnDestroy {

  locationwisejobs: string[];
location: string;
customer:any;
customerId:any;
userId:any;
prfLoc = new PrefLocation();
  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {
      this.customer = JSON.parse(sessionStorage.getItem('userData'));
      this.customerId = this.customer.CustomerId;
      this.userId = this.customer.UserId;
  }

  selectLocation(loc) {
  this.location = loc;
  this.prfLoc.locationId = loc.PreferredLocationId;
  this.prfLoc.location = loc.CityName;
  this.appService.updateLocation(this.prfLoc);
    console.log(loc);
  }

  populateLocationwiseJobs() {
    this.appService.getLocationwisejobs(this.customerId,this.userId).subscribe(res => {
      this.locationwisejobs = res;
    });
  }

  ngOnInit() {
    this.populateLocationwiseJobs();
    //if (localStorage.getItem('jobId') != null) {
    this.appService.currentlocation.subscribe(x => this.prfLoc = x);
   // }
  }

  ngOnDestroy() {
  }
}
