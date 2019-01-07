import { Component, OnInit, Inject, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { Subscription } from 'rxjs/Subscription';
import { concat } from 'rxjs/observable/concat';
import { PjEducationDetails, GetDomain, PjDomain } from '../../models/jobPostInfo';
// tslint:disable-next-line:import-blacklist
import { Subject, Observable } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
@Component({
  selector: 'app-steps-step2-domainexpertise',
  templateUrl: './domainexpertise.component.html'
})

export class DomainExpertiseComponent implements OnInit, OnDestroy {
@ViewChild('domainForm') domainForm: any;
  private subscription: Subscription;
  private subscriptions: Subscription;
  domain: '';
  domainlist: GetDomain[];
  // getDomainList: GetDomain[];
  domains: Observable<GetDomain[]>;
  getDomain = new GetDomain ();
  MinimumExperience: number;
  MaximumExperience: number;
  addDomainList: PjDomain[];
  domainId: number;
  domaintitleloading = false;
  selecteddomaininput = new Subject<string>();
  selecteddomainname = '';
  expYears: any = [];
  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {
      this.getDomain = new GetDomain();

  }

  // private addDomain() {
  //   // this.appService.addDomain(this.domain);
  // }

  private addDomain() {
if (this.domainForm.valid) {
  if (this.MaximumExperience < this.MinimumExperience) {
    return false;
  }
    // const newDomain = new GetDomain();
    // // newDomain.DomainName = this.selecteddomainname;
    //   newDomain.MaximumExperience = this.maxExperience;
    //   newDomain.MinimumExperience = this.minExperience;
    //   newDomain.DomainId = this.getDomain.DomainId;
    //   newDomain.DomainName = this.getDomain.DomainName;
    this.getDomain.MaximumExperience = this.MaximumExperience;
    this.getDomain.MinimumExperience = this.MinimumExperience;
    const check = this.domainExists(this.getDomain, this.domainlist);
      if (check === false) {
        this.appService.addDomain(this.getDomain);
      }
    // this.getDomain = new GetDomain();
    this.selecteddomainname = '';
    this.MaximumExperience = 1;
      this.MinimumExperience = 1;
    this.getDomain = new GetDomain();
}
  }
  domainExists(domain, list) {​
    return list.some(function(elem) {
         return elem.DomainName === domain.DomainName;
    });
 }
  changeValue(val) {
  this.getDomain.DomainId = val.DomainId;
    this.getDomain.DomainName = val.DomainName;
    // this.getDomain.MaximumExperience = this.minExperience;
    // this.getDomain.MinimumExperience = this.maxExperience;
      // this.getDomainList.find(s => s.DomainId === val);
   // this.domainId = val;
  }
  private deleteDomain(index: number) {
    this.appService.deleteDomain(index);
  }
  public getExpYears() {
    this.expYears = [];
    for (let i = 1; i <= 50; i++) {
        this.expYears.push(i);
    }
    return this.expYears;
}
  ngOnInit() {
  this.getDomains();
  this.getExpYears() ;
  // if (localStorage.getItem('jobId') != null) {
    this.domainlist = this.appService.getDomainlist();
    // this.domains.subscribe(domainsList => {
    //   this.getDomainList = domainsList as GetDomain[];
    // });
    this.subscription = this.appService.domainChanged
      .subscribe(
      (domain: GetDomain[]) => {
        this.domainlist = domain;
        }
      );


    this.addDomainList = this.appService.getAddedDomainlist();
    this.subscriptions = this.appService.adddomainChanged
      .subscribe(
      (domain: PjDomain[]) => {
        this.addDomainList = domain;
        }
      );
     // }
  }

  private getDomains() {
    this.domains = concat(
      of([]), // default items
      this.selecteddomaininput.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => this.domaintitleloading = true),
        switchMap(term => this.appService.getDomainDetails().pipe(
          catchError(() => of([])), // empty list on error
          tap(() => this.domaintitleloading = false)
        ))
      )
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
     this.subscriptions.unsubscribe();
  }
}
