import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidate-experience-detail',
  templateUrl: './candidate-experience-detail.component.html',
  styleUrls: ['./candidate-experience-detail.component.scss']
})
export class CandidateExperienceDetailComponent implements OnInit {
  currentRate = 3;
  constructor() { }

  ngOnInit(): void {
  }

}
