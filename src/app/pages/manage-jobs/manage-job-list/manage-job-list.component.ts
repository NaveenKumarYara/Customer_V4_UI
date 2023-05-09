import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manage-job-list',
  templateUrl: './manage-job-list.component.html',
  standalone: true,
  imports: [NgbCollapseModule,CommonModule],
  styleUrls: ['./manage-job-list.component.scss']
})
export class ManageJobListComponent implements OnInit {
  @Input() rowShow = 0; // decorate the property with @Input();
  public showRow: number = 0;
  expanded = new Set<number>();
  @Input() ljob: any;
  @Input() collapsing = true;
  public isCollapsed = false;
  @Input() panelShow: any = '';
  @Output() panelHandler = new EventEmitter<string>(); 

  constructor() {
    this.showRow = 0;
  }

   getToggleState = (index: number) => {
    return this.toggleState.bind(this, index);
  };

  toggleState = (index: number) => {
    if (this.expanded.has(index)) {
      this.expanded.delete(index);
    } else {
      if (this.collapsing) {
        this.expanded.clear();
      }
      this.expanded.add(index);
    }
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

  panelClick(name: string) {
    this.panelHandler.emit(name);
  }
}
