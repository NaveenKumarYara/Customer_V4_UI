import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { EmploymentType } from '../../../../../models/employmenttype.model';
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { PjTechnicalTeam, CustomerUsers } from '../../models/jobPostInfo';
import { Qualifications } from '../../../../../models/qualifications.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-steps-step3-reportingmanager',
  templateUrl: './reportingmanager.component.html'
})

export class ReportingManagerComponent implements OnInit, OnDestroy {

  selectedManager: CustomerUsers;
  reportingmanagersList: Observable<CustomerUsers[]>;
  customer:any;
  customerId:any;
  userId:any;
  selectedInput = new Subject<string> ();
  usersload: boolean;
  // managersAdd: PjTechnicalTeam[] = [];
  // selectedItem: any;
 // private subscription: Subscription;


  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {
      this.customer = JSON.parse(sessionStorage.getItem('userData'));
      this.customerId = this.customer.CustomerId;
      this.userId = this.customer.UserId;
  }
  updateManager(val) {
   // this.appService.updateManager(this.selectedItem.toString());
    this.appService.updateManager(val);
  }

  // getjobaccessto1000042
    getcustomerusers() {
    this.reportingmanagersList = concat(
      of([]), // default items
      this.selectedInput.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => this.usersload = true),
        switchMap(term => this.appService.getCustomerUsers(this.customerId,this.userId).pipe(
          catchError(() => of([])), // empty list on error
          tap(() => this.usersload = false)
        ))
      )
    );
  }

  ngOnInit() {
     this.getcustomerusers();
   //  if (localStorage.getItem('jobId') != null) {
      this.appService.currentcustomerUsers.subscribe(x => this.selectedManager = x);
  //   }
    }
     // this.appService.currentManager.subscribe(x => this.selectedInput = x);
    // this.getcustomerusers();
    // this.teammemberslist = this.appService.getTeammembers();
    // this.subscription = this.appService.teammembersChanged
    //   .subscribe(
    //   (teammemberlist: string[]) => {
    //     this.teammemberslist = teammemberlist;
    //     }
    //   );



  ngOnDestroy() {
   // this.subscription.unsubscribe();
  }
}
