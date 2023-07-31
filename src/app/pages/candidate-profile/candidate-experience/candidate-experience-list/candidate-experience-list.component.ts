import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-candidate-experience-list',
  templateUrl: './candidate-experience-list.component.html',
  styleUrls: ['./candidate-experience-list.component.scss']
})
export class CandidateExperienceListComponent implements OnInit {
  active = 1;
  currentRate = 3;
  @Input() index: any;
  @Input() tabActive: any;
  constructor() { }

  ngOnInit(): void {
  }

}
