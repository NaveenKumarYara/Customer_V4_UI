import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-job-activities',
  templateUrl: './job-activities.component.html',
  styleUrls: ['./job-activities.component.scss']
})
export class JobActivitiesComponent implements OnInit {
  viewLayout = 'grid';
  constructor() { }

  ngOnInit(): void {
  }

  layoutView(name:string){
    this.viewLayout = name;
  }

}
