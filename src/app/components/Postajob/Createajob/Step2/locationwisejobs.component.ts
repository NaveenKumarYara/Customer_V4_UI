import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-steps-step2-locationwisejobs',
  templateUrl: './locationwisejobs.component.html'
})

export class LocationwiseJobsComponent implements OnInit, OnDestroy {  

  locationwisejobs: string[];

  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {
  }



  populateLocationwiseJobs() {
    this.appService.getLocationwisejobs().subscribe(res => {
      this.locationwisejobs = res;
    })
  }  

  ngOnInit() {
    this.populateLocationwiseJobs();
  }

  ngOnDestroy() {
  }
}
