import { Component, OnInit, Inject, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { Subscription } from 'rxjs/Subscription';
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { CustomerUsers, PjTechnicalTeam } from '../../models/jobPostInfo';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-steps-step3-teammembers',
  templateUrl: './teammembers.component.html'
})

export class TeammembersComponent implements OnInit, OnDestroy {
@ViewChild('teamForm') teamForm: any;
  private subscription: Subscription;
  teammembers: '';
  teammemberslist: CustomerUsers[];
  customer: any;
  customerId: any;
  userId: any;
  addedteammembers: '';
  addedteammemberslist: PjTechnicalTeam[];

  selectedUserInput = new Subject<string>();
  usersloading: boolean;
  selectedUserName = '';
  managersList: Observable<CustomerUsers[]>;
  // completeMembersList: CustomerUsers[];
  getTeammember: CustomerUsers;
  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {
      this.customer = JSON.parse(sessionStorage.getItem('userData'));
      this.customerId = this.customer.CustomerId;
      this.userId = this.customer.UserId;
  }
  changeTeam(val) {
    this.getTeammember = val;
  }
  private addTeammembers() {
    // const newDomain = new CustomerUsers();
    // newDomain.FirstName = this.selectedUserName;
if (this.teamForm.valid) {
    const check = this.teamExists(this.getTeammember, this.teammemberslist);
      if (check === false) {
        this.appService.addTeammember(this.getTeammember);
      }

    this.selectedUserName = '';
    }
  }
  teamExists(team, list) {​
    return list.some(function(elem) {
         return elem.UserId === team.UserId;
    });
 }
  private deleteTeammember(index: number) {
    this.appService.deleteTeammember(index);
  }
  getcustomerusers() {
    this.managersList = concat(
      of([]), // default items
      this.selectedUserInput.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => this.usersloading = true),
        switchMap(term => this.appService.getCustomerUsers(this.customerId, this.userId, false, term).pipe(
          catchError(() => of([])), // empty list on error
          tap(() => this.usersloading = false)
        ))
      )
    );
  }
  ngOnInit() {
    this.getcustomerusers();
    // this.managersList.subscribe(countries => {
    //   this.completeMembersList = countries as CustomerUsers[];
    // });
  //  if (localStorage.getItem('jobId') != null) {
    this.teammemberslist = this.appService.getTeammembers();
    this.subscription = this.appService.teammembersChanged
      .subscribe(
      (teammemberlist: CustomerUsers[]) => {
        this.teammemberslist = teammemberlist;
        }
      );

      this.addedteammemberslist = this.appService.getaddedTeammembers();
      this.subscription = this.appService.addedteammembersChanged
        .subscribe(
        (teammemberlist: PjTechnicalTeam[]) => {
          this.addedteammemberslist = teammemberlist;
          }
        );
   //     }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
