import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidate-experience',
  templateUrl: './candidate-experience.component.html',
  styleUrls: ['./candidate-experience.component.scss']
})
export class CandidateExperienceComponent implements OnInit {
  tabActive: any;
  index: any;

  constructor() { }

  ngOnInit(): void {
    this.tabActive = 1;
  }

  tabClickHandler(name: any) {
    this.tabActive = name;
  }

}
