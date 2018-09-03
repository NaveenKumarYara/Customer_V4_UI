import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-steps-step1-jobresponsibilities',
  templateUrl: './jobresponsibilities.component.html'
})

export class JobResponsibilitiesComponent implements OnInit, OnDestroy {  

  private subscription: Subscription;
  responsibilities: '';
  responsibilitieslist: string[];

  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {
  }

  private addResponsibilities() {
    this.appService.addResponsibilities(this.responsibilities);
  }

  private deleteResponsibility(index: number) {
    this.appService.deleteResponsibilities(index);
  }

  ngOnInit() {
    this.responsibilitieslist = this.appService.getResponsibilities();
    this.subscription = this.appService.responsibilitesChanged
      .subscribe(
        (responselist: string[]) => {
          this.responsibilitieslist = responselist;
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
