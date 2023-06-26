import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule-interview-external',
  templateUrl: './schedule-interview-external.component.html',
  styleUrls: ['./schedule-interview-external.component.scss']
})
export class ScheduleInterviewExternalComponent implements OnInit {
  panelCloseHandler: any;

  constructor() { }

  ngOnInit(): void {
  }
  closePanel() {
    this.panelCloseHandler.emit();
  }

}
