import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
  public isCollapsed = false;
  @Input() profile : any;
  constructor() { }

  ngOnInit(): void {
  }

}
