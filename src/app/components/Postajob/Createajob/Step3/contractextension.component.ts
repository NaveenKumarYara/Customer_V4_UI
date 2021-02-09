import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { Subscription } from 'rxjs/Subscription';
import { Subject, Observable } from 'rxjs';
import { EmploymentType } from '../../../../../models/employmenttype.model';
import { WorkAuthorization } from '../../../../../models/workAuthorization';

@Component({
  selector: 'app-steps-step3-contractextension',
  templateUrl: './contractextension.component.html'
})

export class ContractExtensionComponent implements OnInit, OnDestroy {
  contractextensionlist: any; // WorkAuthorization[] = [];
 contractExtension :any=[];
  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {
  }

  // populateContractExtension() {
  //   this.contractextensionlist = this.appService.getContractExtension();
  // }
  populateContractExtension() {
    this.appService.getContractExtension().subscribe(res => {
      this.contractextensionlist = res.filter(x => x.WorkAuthorizationType);
    });
  }
  setExtension(val) {
    debugger
    this.contractExtension.push(val);
    this.appService.Workauthorize = this.contractExtension.map(x=>x.WorkAuthorizationId).join(",").toString();
    //this.appService.updatecExtension(this.contractExtension);
  }



  ngOnInit() {
    this.populateContractExtension();
  //  if (localStorage.getItem('jobId') != null) {
    //this.appService.currentContractExtension.subscribe(x => this.contractExtension = x);
 //   }
  }

  ngOnDestroy() {
  }
}
