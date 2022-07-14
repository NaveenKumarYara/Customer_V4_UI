import { Component, OnInit, Inject, OnDestroy, ViewChild, ElementRef,ViewContainerRef } from '@angular/core';
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
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import { ChangeContext, LabelType, Options } from 'ng5-slider';
import { TOptions } from '../Step1/Jobprofile.component';
declare var $: any;
@Component({
  selector: 'app-steps-step1-jobskillset',
  templateUrl: './Jobskillset.component.html',
  styleUrls: ['./Jobskillset.component.css']
})
export class JobskillsetComponent implements OnInit, OnDestroy  {
  @ViewChild('f') form: NgForm;
  @ViewChild('skill') skill: ElementRef;
  primaryjobskills: Jobskills[];
  secondaryjobskills: Jobskills[];
  minexperience:number;
  maxexperience:number;
   maxexpval:any;
   minexpval:any;
  expYears: any = [];
  skillType  = false;
  selectedOption:TOptions = new TOptions(2, ' 3-5');
  options = [
     new TOptions(1, '0-2' ),
     new TOptions(2, '3-5' ),
     new TOptions(3, '6-8' ),
     new TOptions(4, '9-11'),
     new TOptions(5, '12+')
  ];
  private subscription: Subscription;
  showexp:boolean=true;
  skilllist: Observable<string[]>;
  selectedSkillName;
  skilltitleloading = false;
  selectedskillinput = new Subject<string>();
  private selectedLink = 'Primary';
  doptions: Options = {
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
  constructor(private route: ActivatedRoute, private toastr: ToastsManager, private _vcr: ViewContainerRef,
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
      if (Number(this.maxexperience) < Number(this.minexperience)) {
        this.toastr.info('Please provide valid Experience','Oh no!!!');
        return false;
      }
      this.appService.addSkills(localStorage.getItem('skill'));
     let newskills = new Jobskills();
      newskills.SkillName = localStorage.getItem('skill') === null ? this.selectedSkillName : localStorage.getItem('skill');
      newskills.SkillType = this.skillType;
      this.maxexpCalculation(this.maxexperience);
      this.maxexperience= this.maxexpval;
      this.minexpCalculation(this.minexperience);
      this.minexperience = this.minexpval;
      newskills.MaximumExp = this.maxexperience;
      newskills.MinimumExp = this.minexperience;
      //debugger
      const check = this.skillExists(newskills, this.primaryjobskills.concat(this.secondaryjobskills));
      if (check === false&&newskills.SkillName!=null) {
          this.appService.addJobSkill(newskills);
          this.selectedSkillName=undefined;
          this.minexperience = 3;
          this.maxexperience = 6;
          this.form.resetForm();
          localStorage.removeItem('skill');
          this.form.reset();
          newskills = new Jobskills();
      }
      // this.selectedSkillName = '';
      // this.minexperience = 0;
      // this.maxexperience = 0;
      this.minexperience = 3;
      this.maxexperience = 5;
      this.form.resetForm();
      localStorage.removeItem('skill');
     this.form.reset();
    }
    if (this.form.valid) {
      if (Number(this.maxexperience) < Number(this.minexperience)) {
        this.toastr.info('Please provide valid Experience','Oh no!!!');
        return false;
      }
      if(this.minexperience === undefined || this.minexperience === null)
      {
        this.getValue(2);
      }

      // if (Number(this.minexperience) === 0) {
      //   return false;
      // }

      // if (Number(this.maxexperience) === 0) {
      //   return false;
      // }
      this.appService.addSkills(localStorage.getItem('skill'));
      let newskills = new Jobskills();
      newskills.SkillName = localStorage.getItem('skill') === null ? this.selectedSkillName : localStorage.getItem('skill');
      newskills.SkillType = this.skillType;
      this.maxexpCalculation(this.maxexperience);
      this.maxexperience= this.maxexpval;
      this.minexpCalculation(this.minexperience);
      this.minexperience = this.minexpval;
      newskills.MaximumExp = this.maxexperience;
      newskills.MinimumExp = this.minexperience;
      const check = this.skillExists(newskills, this.primaryjobskills.concat(this.secondaryjobskills));

      if (check === true&&newskills.SkillName!=null) {
        let Id = this.primaryjobskills.findIndex(x=>x.SkillName === newskills.SkillName);
        this.deletePrimarySkills(Id);
        this.deleteSecondarySkills(Id);
        this.appService.addJobSkill(newskills);
        this.selectedSkillName=undefined;
        this.minexperience = 3;
        this.maxexperience = 5;
        newskills = new Jobskills();
        this.getValue(2);
        localStorage.removeItem('skill');
        this.form.reset();
    }
     
      if (check === false&&newskills.SkillName!=null) {
          this.appService.addJobSkill(newskills);
          this.selectedSkillName=undefined;
          this.minexperience = 0;
          this.maxexperience = 0;
          newskills = new Jobskills();
          this.getValue(2);
          localStorage.removeItem('skill');
          this.form.reset();
      }
      this.selectedSkillName = '';
      this.minexperience = 0;
      this.maxexperience = 0;
      localStorage.removeItem('skill');
     this.form.reset();
    } else {
      this.toastr.info('Please Add/Select Skill','Oops')
      setTimeout(() => {
        this.toastr.dismissToast;
    }, 3000);

}
  }
  skillExists(skill, list) {​   
    return list.some(function(elem) {
         return elem.SkillName === skill.SkillName;
    });
 }
  public getExpYears() {
    this.expYears = [];
    for (let i = 1; i <= 50; i++) {
        this.expYears.push(i);
    }
    return this.expYears;
}
   deletePrimarySkills(index: number) {
    this.appService.deletePrimarySkills(index);
  }

   deleteSecondarySkills(index: number) {
    this.appService.deleteSecondarySkills(index);
  }

   EditPrimarySkills(Skill) {
    this.maxexperience= Skill.MaximumExp/12;
    this.minexperience = Skill.MinimumExp/12;
    this.getval();
    this.selectedSkillName=Skill.SkillName;
    this.skillType = Skill.SkillType;
  }

   EditSecondarySkills(Skill) {
    this.maxexperience= Skill.MaximumExp/12;
    this.minexperience = Skill.MinimumExp/12;
    this.getval();
    this.selectedSkillName=Skill.SkillName;
    this.skillType = Skill.SkillType;
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

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)&& charCode !=46 ) {
      return false;
    }
    return true;
  
  }

  ngOnInit() {
    this.getSkills();
    this.showexp = this.appService.showskills;
     //this.getExpYears();
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

 maxexpCalculation(exp)
 {
   var m=exp.toString();
   if(m!=null)
   {
     var e = m.split('.');
     if(e.length > 1)
     {
      let s = (e[0] * 12) + +e[1];
      this.maxexpval= s;
      return s;
     }
     else
     {
       let s = e[0] * 12
       this.maxexpval= s;
       return s;
     }
   }
 }

 minexpCalculation(exp)
 {
   var m=exp.toString();
   if(m!=null)
   {
     var e = m.split('.');
     if(e.length > 1)
     {
      let s = (e[0] * 12) + +e[1];
      this.minexpval= s;
      return s;
     }
     else
     {
       let s = e[0] * 12
       this.minexpval= s;
       return s;
     }
      
   
   }
 }

 getValue(optionid) {
  if(optionid>0)
  {  
  this.selectedOption = this.options.filter((item)=> item.id == optionid)[0];
  if(this.selectedOption.id === 1)
  {
    this.minexperience = 1;
    this.maxexperience = 2; 
  }
  else if(this.selectedOption.id === 2)
  {
    this.minexperience = 3;
    this.maxexperience = 5;  
  }
  else if(this.selectedOption.id === 3)
  {
    this.minexperience = 6;
    this.maxexperience = 8;
  
  }
  else if(this.selectedOption.id === 4)
  {
    this.minexperience = 9;
    this.maxexperience = 11;  
  }
  else if(this.selectedOption.id === 5)
  {
    this.minexperience = 12;
    this.maxexperience = 12;  
  }
}
}

getval()
{
     if(this.minexperience<3)
      {
        this.getValue(1);
      }
      else if(this.minexperience>=3 && this.maxexperience <=5)
      {
        this.getValue(2); 
      }
      else if(this.minexperience>5 && this.maxexperience <=8)
      {
        this.getValue(3); 
      }
      else if(this.minexperience>8 && this.maxexperience <=11)
      {
        this.getValue(4); 
      }
      else if(this.minexperience>11)
      {
        this.getValue(5); 
      }       
}

  minExperienceChangeStart(changeContext: ChangeContext): void {
    this.appService.updateMinExp(this.minexpval);
}
onExperienceChange(changeContext: ChangeContext): void {
   this.appService.updateMinExp(this.minexpval);
   this.appService.updateMaxExp(this.maxexpval);
}
maxExperienceChangeEnd(changeContext: ChangeContext): void {
   this.appService.updateMaxExp(this.maxexpval);
}
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

