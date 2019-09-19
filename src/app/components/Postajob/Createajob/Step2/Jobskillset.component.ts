import { Component, OnInit, Inject, OnDestroy, ViewChild, ElementRef  } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../../../../app.service';
// tslint:disable-next-line:import-blacklist
import { Subject, Observable } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';
import { Jobskills, AddSkill } from '../../../../../models/jobskills.model';
import { Subscription } from 'rxjs/Subscription';
import { FormControl, NgForm } from '@angular/forms';
import { ChangeContext, LabelType, Options } from 'ng5-slider';
declare var $: any;
@Component({
  selector: 'app-steps-step1-jobskillset',
  templateUrl: './Jobskillset.component.html'
})
export class JobskillsetComponent implements OnInit, OnDestroy  {
  @ViewChild('f') form: NgForm;
  @ViewChild('skill') skill: ElementRef;
  primaryjobskills: Jobskills[];
  secondaryjobskills: Jobskills[];
  minexperience = 3;
  maxexperience = 6;
  expYears: any = [];
  skillType  = false;

  private subscription: Subscription;

  skilllist: Observable<string[]>;
  selectedSkillName = '';
  skilltitleloading = false;
  selectedskillinput = new Subject<string>();
  private selectedLink = 'Primary';
  options: Options = {
    floor: 1,
    ceil: 40,
    step : 0.1,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return  (value).toFixed(1)   + 'Years';
        case LabelType.High:
          return (value).toFixed(1)   + 'Years' ;
          default:
          return ' ';
      }
    }
  };
  setSkillType() {
        this.selectedLink = this.skillType === true ? 'primary' : 'secondary';
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
  addTagNow(val) {
    this.selectedSkillName = val;
  }

  addSkill(val) {
  const  SkillName = new AddSkill();
   SkillName.SkillName = val;
   // this.selectedSkillName = val;
   // this.selectedSkillName = this.skill.nativeElement.value;
   $('#skills').val('1');
     localStorage.setItem('skill', val);
    return { name: SkillName.SkillName , tag: true };
  }
  public addSkills() {
    if ($('#skills').val() === '1') {
      if (this.maxexperience < this.minexperience) {
        return false;
      }
      this.appService.addSkills(localStorage.getItem('skill'));
      const newskills = new Jobskills();
      newskills.SkillName = localStorage.getItem('skill') === null ? this.selectedSkillName : localStorage.getItem('skill');
      newskills.SkillType = this.skillType;
      newskills.MaximumExp = this.maxexperience;
      newskills.MinimumExp = this.minexperience;
      const check = this.skillExists(newskills, this.primaryjobskills.concat(this.secondaryjobskills));
      if (check === false) {
          this.appService.addJobSkill(newskills);
      }
      // this.selectedSkillName = '';
      // this.minexperience = 0;
      // this.maxexperience = 0;
      this.form.resetForm();
      localStorage.removeItem('skill');
     this.form.reset();
    }
    if (this.form.valid) {
      if (this.maxexperience < this.minexperience) {
        return false;
      }
      this.appService.addSkills(localStorage.getItem('skill'));
      const newskills = new Jobskills();
      newskills.SkillName = localStorage.getItem('skill') === null ? this.selectedSkillName : localStorage.getItem('skill');
      newskills.SkillType = this.skillType;
      newskills.MaximumExp = this.maxexperience;
      newskills.MinimumExp = this.minexperience;
      const check = this.skillExists(newskills, this.primaryjobskills.concat(this.secondaryjobskills));
      if (check === false) {
          this.appService.addJobSkill(newskills);
      }
      this.selectedSkillName = '';
      this.minexperience = 3;
      this.maxexperience = 6;
      localStorage.removeItem('skill');
     this.form.reset();
    } else {

}
  }
  skillExists(skill, list) {​
    return list.some(function(elem) {
         return elem.SkillName === skill.SkillName;
    });
 }
//   public getExpYears() {
//     this.expYears = [];
//     for (let i = 1; i <= 50; i++) {
//         this.expYears.push(i);
//     }
//     return this.expYears;
// }
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
        switchMap(term => this.appService.getSkills(term).pipe(
          catchError(() => of([])), // empty list on error
          tap(() => this.skilltitleloading = false)
        ))
      )
    );
  }
  add3Dots(string, limit) {
    const dots = '...';
    if (string.length > limit) {
      string = string.substring(0, limit) + dots;
    }
      return string;
  }

  updateSkillType() {
    this.appService.updateSkillType(this.selectedLink);
  }

  ngOnInit() {
    this.getSkills();
    // this.getExpYears();
    this.primaryjobskills = this.appService.getPrimaryAddedJobSkills();
    this.secondaryjobskills = this.appService.getSecondaryAddedJobSkills();
    this.subscription = this.appService.jobprimaryskillsChanged
      .subscribe(
      (jobskills: Jobskills[]) => {
        this.primaryjobskills = jobskills;
      }
    );
    this.subscription = this.appService.jobsecondaryskillsChanged
      .subscribe(
      (jobskills: Jobskills[]) => {
        this.secondaryjobskills = jobskills;
        }
      );
  }
  minExperienceChangeStart(changeContext: ChangeContext): void {
    this.appService.updateMinExp(this.minexperience);
}
onExperienceChange(changeContext: ChangeContext): void {
   this.appService.updateMinExp(this.minexperience);
   this.appService.updateMaxExp(this.maxexperience);
}
maxExperienceChangeEnd(changeContext: ChangeContext): void {
   this.appService.updateMaxExp(this.maxexperience);
}
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

