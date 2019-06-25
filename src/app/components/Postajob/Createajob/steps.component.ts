import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {
  complete: any;
  step1isClicked = true;
  step2isClicked = false;
  step3isClicked = false;
  step4isClicked = false;
  stepNumber: string;
  draft = false;
  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {
      this.complete = JSON.parse(localStorage.getItem('completed'));
  }

  step1toggleClass(complete) {
    this.complete = complete;
    this.step1isClicked = !this.step1isClicked;
    this.step2isClicked = false;
    this.step3isClicked = false;
    this.step4isClicked = false;
  }

  step2toggleClass(complete) {
    this.complete = complete;
    this.step2isClicked = !this.step2isClicked;
    this.step1isClicked = false;
    this.step3isClicked = false;
    this.step4isClicked = false;
  }

  step3toggleClass(complete) {
    this.complete = complete;
    this.step3isClicked = !this.step3isClicked;
    this.step1isClicked = false;
    this.step2isClicked = false;
    this.step4isClicked = false;
  }

  step4toggleClass(complete) {
    this.complete = complete;
    this.step4isClicked = !this.step4isClicked;
    this.step1isClicked = false;
    this.step2isClicked = false;
    this.step3isClicked = false;
  }
  ngOnInit() {
  this.stepNumber = this.appService.getStepNumber();
  this.draft = this.appService.getDraftStatus();
  }
// getStepCount() {
//   return this.appService.getStepNumber();
// }



}
