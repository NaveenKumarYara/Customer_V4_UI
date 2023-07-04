import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-find-a-candidate-table',
  templateUrl: './find-a-candidate-table.component.html',
  styleUrls: ['./find-a-candidate-table.component.scss']
})
export class FindACandidateTableComponent implements OnInit {
  @Input() tcandidate: any;
  constructor() { }

  ngOnInit(): void {
  }

}
