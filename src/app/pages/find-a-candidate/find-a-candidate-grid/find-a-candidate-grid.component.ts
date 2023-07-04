import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-find-a-candidate-grid',
  templateUrl: './find-a-candidate-grid.component.html',
  styleUrls: ['./find-a-candidate-grid.component.scss']
})
export class FindACandidateGridComponent implements OnInit {
  @Input() candidate: any;
  constructor() { }

  ngOnInit(): void {
  }

}
