import { Component, OnInit, Inject, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, NgForm } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { Subscription } from 'rxjs/Subscription';
import { concat } from 'rxjs/observable/concat';
import { PjEducationDetails, GetDomain, PjDomain } from '../../models/jobPostInfo';
// tslint:disable-next-line:import-blacklist
import { Subject, Observable } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ChangeContext, LabelType, Options } from 'ng5-slider';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
@Component({
  selector: 'app-steps-step2-domainexpertise',
  templateUrl: './domainexpertise.component.html',
  styleUrls: ["./domainexpertise.component.css"]
})

export class DomainExpertiseComponent implements OnInit, OnDestroy {
@ViewChild('domainForm') domainForm: NgForm;
  private subscription: Subscription;
  private subscriptions: Subscription;
  domain;
  domainlist: GetDomain[];
  // getDomainList: GetDomain[];
  domains: Observable<GetDomain[]>;
  domainsnew : GetDomain[]=[];
  getDomain = new GetDomain ();
  domminval:any;
  dommaxval:any;
  MinimumExperience :number;
  MaximumExperience :number;
  addDomainList: PjDomain[];
  domainId: number;
  domaintitleloading = false;
  selecteddomaininput = new Subject<string>();
  selecteddomainname;
   expYears: any = [];
  options: Options = {
    floor: 0,
    ceil: 40,
    step : 0.1,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return (value).toFixed(1)   + 'Years';
        case LabelType.High:
          return (value).toFixed(1)   + 'Years' ;
          default:
          return ' ';
      }
    }
  };
  constructor(private route: ActivatedRoute,private toastr: ToastsManager, private _vcr: ViewContainerRef,
    private router: Router, private appService: AppService) {
      this.getDomain = new GetDomain();

  }

  domainminCalculation(exp)
 {
   var m=exp.toString();
   if(m!=null)
   {
     var e = m.split('.');
     if(e.length > 1)
      {
       let s = (e[0] * 12) + +e[1];
       this.domminval= s;
       return s;
      }
      else
      {
        let s = e[0] * 12
        this.domminval= s;
        return s;
      }
   }
 }

 domainmaxCalculation(exp)
 {
   var m=exp.toString();
   if(m!=null)
   {
     var e = m.split('.');
      if(e.length > 1)
      {
       let s = (e[0] * 12) + +e[1];
       this.dommaxval= s;
       return s;
      }
      else
      {
        let s = e[0] * 12
        this.dommaxval= s;
        return s;
      }
   }
 }
  // private addDomain() {
  //   // this.appService.addDomain(this.domain);
  // }

  public addDomain() {
  if (this.domainForm.valid) {
    if (Number(this.MaximumExperience) < Number(this.MinimumExperience)) {
      this.toastr.info('Please provide valid Experience','Oh no!!!');
      return false;
  }
    // const newDomain = new GetDomain();
    // // newDomain.DomainName = this.selecteddomainname;
    //   newDomain.MaximumExperience = this.maxExperience;
    //   newDomain.MinimumExperience = this.minExperience;
    //   newDomain.DomainId = this.getDomain.DomainId;
    //   newDomain.DomainName = this.getDomain.DomainName;
    this.domainmaxCalculation(this.MaximumExperience);
    this.MaximumExperience= this.dommaxval;
    this.domainminCalculation(this.MinimumExperience);
    this.MinimumExperience = this.domminval;
    this.getDomain.MaximumExperience = this.MaximumExperience;  // parseFloat((this.MaximumExperience / 12).toFixed(1));
    this.getDomain.MinimumExperience = this.MinimumExperience; //  parseFloat((this.MinimumExperience / 12).toFixed(1)) ;
    const check = this.domainExists(this.getDomain, this.domainlist);
      if (check === false) {
        this.appService.addDomain(this.getDomain);
      }
    // this.getDomain = new GetDomain();
    // this.selecteddomainname = '';
    this.domainForm.resetForm();
    this.MaximumExperience = undefined;
    this.MinimumExperience = undefined;
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
//   public getExpYears() {
//     this.expYears = [];
//     for (let i = 1; i <= 50; i++) {
//         this.expYears.push(i);
//     }
//     return this.expYears;
// }

numberOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)&& charCode !=46 ) {
    return false;
  }
  return true;

}
  ngOnInit() {
  this.getDomains();
  this.getalldomain();
   //this.getExpYears() ;
    this.domainlist = this.appService.getDomainlist();
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

  getalldomain()
  {
    this.appService.getDomainDetails().subscribe(data=>
      {
        this.domainsnew = data;
    })
  }
  minExperienceChangeStart(changeContext: ChangeContext): void {
     this.appService.updateMinExp(this.domminval);
 }
 onExperienceChange(changeContext: ChangeContext): void {
    this.appService.updateMinExp(this.domminval);
    this.appService.updateMaxExp(this.dommaxval);
 }
 maxExperienceChangeEnd(changeContext: ChangeContext): void {
    this.appService.updateMaxExp(this.dommaxval);
 }
  ngOnDestroy() {
    this.subscription.unsubscribe();
     this.subscriptions.unsubscribe();
  }
}
