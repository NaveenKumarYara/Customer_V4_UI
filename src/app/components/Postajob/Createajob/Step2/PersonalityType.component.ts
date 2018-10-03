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

checkpersonType: PjDisc[] = [];
  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {
  }


  personType(val) {
    const person = new PjDisc;
    person.DiscTestId = val;
    this.checkpersonType.push(person);
  }


  ngOnInit() {

  }

  ngOnDestroy() {
  }
}
