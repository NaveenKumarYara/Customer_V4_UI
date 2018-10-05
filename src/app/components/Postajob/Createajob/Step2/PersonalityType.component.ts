import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { Subscription } from 'rxjs/Subscription';
import { PjDisc } from '../../models/jobPostInfo';

@Component({
  selector: 'app-steps-step2-personalityType',
  templateUrl: './personalityType.component.html'
})

export class PersonalityTypeComponent implements OnInit, OnDestroy {
  selectedPersonType: number;
checkpersonType: PjDisc[] = [];
  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {
  }


  personType(val) {
    const person = new PjDisc;
    person.DiscTestId = val;
    this.appService.addPersonType(person);
    this.checkpersonType.push(person);
  }

  // isSelected(value: number): boolean {
  //   return this.selectedTopics.indexOf(value) >= 0;
  // }

  // onChange(value: string, checked: boolean) {
  //   console.log(value, checked);
  //   if (checked) {
  //     this.selectedTopics.push(value);
  //   } else {
  //     let index = this.selectedTopics.indexOf(value);
  //     this.selectedTopics.splice(index, 1);
  //   }
  //   console.log(this.selectedTopics);
  // }

  ngOnInit() {

  }

  ngOnDestroy() {
  }
}
