import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-review',
  templateUrl: './job-review.component.html',
  styleUrls: ['./job-review.component.scss']
})
export class JobReviewComponent implements OnInit {
  currentRate = 3;
  
  constructor() { }

  ngOnInit(): void {
  }

}
