import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-manage-job-list',
  templateUrl: './manage-job-list.component.html',
  styleUrls: ['./manage-job-list.component.scss']
})
export class ManageJobListComponent implements OnInit {
  @Input() rowShow = 0; // decorate the property with @Input();
  public showRow: number = 0;
  

  constructor() {
    this.showRow = 0;
  }

  ngOnInit(): void {
  }

  rowHandler(no: number) {
    if(this.showRow != this.rowShow) {
      this.showRow = this.rowShow;
    } else {
      this.showRow = 0;
    }
  }
}
