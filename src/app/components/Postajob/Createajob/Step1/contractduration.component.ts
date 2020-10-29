import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { Subscription } from 'rxjs/Subscription';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-steps-step1-contractduration',
  templateUrl: './contractduration.component.html'
})

export class StepContractDurationComponent implements OnInit, OnDestroy {
  contractdurationlist: any; // string[];
contractDuration: string;
  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {
  }

  // populateContractduration() {
  //   this.contractdurationlist = this.appService.getContractduration();
  // }
  populateContractduration() {
    this.appService.getContractduration().subscribe(res => {
      this.contractdurationlist = res.filter(x => x.ContractDuration);
    });
  }
  setDuration(val) {
    this.contractDuration = val.ContractDuration;
    this.appService.updatecDuration(this.contractDuration);
  }

  ngOnInit() {
  this.populateContractduration();
 // if (localStorage.getItem('jobId') != null) {
  this.appService.currentContractDuration.subscribe(x => this.contractDuration = x);
//  }
  }

  ngOnDestroy() {
  }
}
