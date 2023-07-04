import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-find-a-candidate-card',
  templateUrl: './find-a-candidate-card.component.html',
  styleUrls: ['./find-a-candidate-card.component.scss']
})
export class FindACandidateCardComponent implements OnInit {
  @Input() CandidateDetails: any;
  constructor() { }

  ngOnInit(): void {
  }

}
