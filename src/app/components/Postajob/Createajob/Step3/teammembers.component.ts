import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-steps-step3-teammembers',
  templateUrl: './teammembers.component.html'
})

export class TeammembersComponent implements OnInit, OnDestroy {  

  private subscription: Subscription;
  teammembers: '';
  teammemberslist: string[];

  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {
  }

  private addTeammembers() {
    this.appService.addTeammember(this.teammembers);
  }

  private deleteTeammember(index: number) {
    this.appService.deleteTeammember(index);
  }

  ngOnInit() {
    this.teammemberslist = this.appService.getTeammembers();
    this.subscription = this.appService.teammembersChanged
      .subscribe(
      (teammemberlist: string[]) => {
        this.teammemberslist = teammemberlist;
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
