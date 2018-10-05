import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { Subscription } from 'rxjs/Subscription';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-steps-step3-contractduration',
  templateUrl: './contractduration.component.html'
})

export class ContractDurationComponent implements OnInit, OnDestroy {
  contractdurationlist: string[];
contractDuration: string;
  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {
  }

  populateContractduration() {
    this.contractdurationlist = this.appService.getContractduration();
  }

  setDuration(val) {
    this.contractDuration = val;
    this.appService.updatecDuration(this.contractDuration);
  }

  ngOnInit() {
  this.populateContractduration();
  this.appService.currentContractDuration.subscribe(x => this.contractDuration = x);
  }

  ngOnDestroy() {
  }
}
