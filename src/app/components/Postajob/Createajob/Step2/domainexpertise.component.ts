import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-steps-step2-domainexpertise',
  templateUrl: './domainexpertise.component.html'
})

export class DomainExpertiseComponent implements OnInit, OnDestroy {  

  private subscription: Subscription;
  domain: '';
  domainlist: string[];

  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {
  }

  private addDomain() {
    this.appService.addDomain(this.domain);
  }

  private deleteDomain(index: number) {
    this.appService.deleteDomain(index);
  }

  ngOnInit() {
    this.domainlist = this.appService.getDomainlist();
    this.subscription = this.appService.domainChanged
      .subscribe(
      (domain: string[]) => {
        this.domainlist = domain;
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
