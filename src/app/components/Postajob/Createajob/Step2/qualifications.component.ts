import { Component, OnInit, Inject, OnDestroy  } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../../../../app.service';
// tslint:disable-next-line:import-blacklist
import { Subject, Observable } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';
import { Subscription } from 'rxjs/Subscription';
import { FormControl } from '@angular/forms';
import { Qualifications } from '../../../../../models/qualifications.model';

@Component({
  selector: 'app-steps-step2-qualifications',
  templateUrl: './qualifications.component.html'  
})
export class QualificationsComponent implements OnInit, OnDestroy  {

  private subscription: Subscription;

  qualifications: Observable<Qualifications[]>;
  selectedqualificationName = ''; 
  qualificationtitleloading = false;
  selectedqualificationinput = new Subject<string>();
  qualificationList: Qualifications[];


  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {

  }
  private addQualification() {
    const newqualification = new Qualifications();
    newqualification.QualificationName = this.selectedqualificationName;
    this.appService.addQualifications(newqualification);  

  }

  private deleteQualifications(index: number) {
    this.appService.deleteQualifications(index);    
  }

 
  private getQualifications() {
    this.qualifications = concat(
      of([]), // default items
      this.selectedqualificationinput.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => this.qualificationtitleloading = true),
        switchMap(term => this.appService.getQualificationDetails().pipe(
          catchError(() => of([])), // empty list on error
          tap(() => this.qualificationtitleloading = false)
        ))
      )
    );
  }


  ngOnInit() {
    this.getQualifications();
    this.qualificationList = this.appService.getaddedQualifications();
    this.subscription = this.appService.qualificationsChanged
      .subscribe(
      (qualifications: Qualifications[]) => {
        this.qualificationList = qualifications;
        }
      );

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
