import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { Subscription } from 'rxjs/Subscription';
import { Subject, Observable } from 'rxjs';
import { EmploymentType } from '../../../../../models/employmenttype.model';
import { WorkAuthorization } from '../../../../../models/workAuthorization';

@Component({
  selector: 'app-steps-step1-contractextension',
  templateUrl: './contractextension.component.html'
})

export class StepContractExtensionComponent implements OnInit, OnDestroy {
  contractextensionlist: any; // WorkAuthorization[] = [];
 contractExtension :any=[];
 Corp:string;
 W2:string;
 Contract:string;
 last:string;
  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {
  }

  // populateContractExtension() {
  //   this.contractextensionlist = this.appService.getContractExtension();
  // }
  populateContractExtension() {
    this.appService.getContractExtension().subscribe(res => {
      this.contractextensionlist = res.filter(x => x.WorkAuthorizationType);
      this.appService.WorkauthorizeNames.forEach(
        e=>
        {
          if(e.WorkAuthorizationId == 1)
          {
            this.Corp = "1";
          }
          else if(e.WorkAuthorizationId == 2)
          {
            this.W2 = "2";
          }
          else if(e.WorkAuthorizationId == 3)
          {
            this.Contract = "3";
          }
          else if(e.WorkAuthorizationId == 4)
          {
            this.last = "4";
          }
          this.contractExtension.push(e.WorkAuthorizationId);
        }
      )
    });
  }
  setExtension(val) {
    debugger

    if(val == "1")
    {
      this.Corp = "1";
    }
    else if(val == "2")
    {
      this.W2 = "2";
    }
    else if(val == "3")
    {
      this.Contract = "3";
    }
    else if(val == "4")
    {
      this.last = "4";
    }
    this.contractExtension.push(val);
    this.appService.Workauthorize = this.contractExtension;
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
