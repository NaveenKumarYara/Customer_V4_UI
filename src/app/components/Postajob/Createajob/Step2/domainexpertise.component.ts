import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
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

  private subscription: Subscription;
  private subscriptions: Subscription;
  domain: '';
  domainlist: GetDomain[];
  // getDomainList: GetDomain[];
  domains: Observable<GetDomain[]>;
  getDomain: GetDomain;

  addDomainList: PjDomain[];
  domainId: number;
  domaintitleloading = false;
  selecteddomaininput = new Subject<string>();
  selecteddomainname = '';
  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {
  }

  // private addDomain() {
  //   // this.appService.addDomain(this.domain);
  // }

  private addDomain() {
    // const newDomain = new GetDomain();
    // newDomain.DomainName = this.selecteddomainname;
    this.appService.addDomain(this.getDomain);
    // this.getDomain = new GetDomain();
    this.selecteddomainname = '';

  }
  changeValue(val) {
    this.getDomain = val; // this.getDomainList.find(s => s.DomainId === val);
   // this.domainId = val;
  }
  private deleteDomain(index: number) {
    this.appService.deleteDomain(index);
  }

  ngOnInit() {
  this.getDomains();
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
