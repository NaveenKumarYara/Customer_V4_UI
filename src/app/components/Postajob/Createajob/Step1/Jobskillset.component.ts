import { Component, OnInit, Inject, OnDestroy  } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../../../../app.service';
// tslint:disable-next-line:import-blacklist
import { Subject, Observable } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';
import { Jobskills } from '../../../../../models/jobskills.model';
import { Subscription } from 'rxjs/Subscription';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-steps-step1-jobskillset',
  templateUrl: './Jobskillset.component.html'
})
export class JobskillsetComponent implements OnInit, OnDestroy  {

  primaryjobskills: Jobskills[];
  secondaryjobskills: Jobskills[];
  minexperience: string;
  maxexperience: string;
  expYears: any = [];
  skillType = false;
  private subscription: Subscription;



  skilllist: Observable<string[]>;
  selectedSkillName = '';
  skilltitleloading = false;
  selectedskillinput = new Subject<string>();


  private selectedLink = 'Primary';


  setSkillType() {
    // if(!this.skillType)
    //   {
        this.selectedLink = this.skillType === true ? 'primary' : 'secondary';
      // }
      // else

}

  setSkillType1(e: string): void {
    this.selectedLink = e;
  }

  isSelected(name: string): boolean {
    if (!this.selectedLink) { // if no radio button is selected, always return false so every nothing is shown
      return false;
    }
    return (this.selectedLink === name); // if current radio button is selected, return true, else return false
  }
  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {

  }
  private addSkills() {
    const newskills = new Jobskills();
    newskills.skillname = this.selectedSkillName;
    newskills.skilltype = this.selectedLink;
    newskills.maxexperience = this.maxexperience;
    newskills.minexperience = this.minexperience;
    this.appService.addJobSkill(newskills);
  }
  public getExpYears() {
    this.expYears = [];
    for (let i = 0; i <= 50; i++) {
        this.expYears.push(i);
    }
    return this.expYears;
}
  private deletePrimarySkills(index: number) {
    this.appService.deletePrimarySkills(index);
  }

  private deleteSecondarySkills(index: number) {
    this.appService.deleteSecondarySkills(index);
  }

  private getSkills() {
    this.skilllist = concat(
      of([]), // default items
      this.selectedskillinput.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => this.skilltitleloading = true),
        switchMap(term => this.appService.getSkills().pipe(
          catchError(() => of([])), // empty list on error
          tap(() => this.skilltitleloading = false)
        ))
      )
    );
  }


  updateSkillType() {
    this.appService.updateSkillType(this.selectedLink);
  }

  ngOnInit() {
    this.getSkills();
    this.getExpYears();
    this.primaryjobskills = this.appService.getPrimaryAddedJobSkills();
    this.subscription = this.appService.jobprimaryskillsChanged
      .subscribe(
      (jobskills: Jobskills[]) => {
        this.primaryjobskills = jobskills;
      }
    );

    this.secondaryjobskills = this.appService.getSecondaryAddedJobSkills();
    this.subscription = this.appService.jobsecondaryskillsChanged
      .subscribe(
      (jobskills: Jobskills[]) => {
        this.secondaryjobskills = jobskills;
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
