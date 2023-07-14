import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-slidepanel',
  templateUrl: './slidepanel.component.html',
  styleUrls: ['./slidepanel.component.scss']
})
export class SlidepanelComponent implements OnInit {
  @Input() panelTitle = '';
  @Input() panelShow = '';

  @Output() panelCloseHandler = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  closePanel() {
    this.panelCloseHandler.emit();
  }

  isDropdownOpen: boolean = false;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  panelHandler(name: string) {
    this.panelShow = name;
  }
  Job:any=[];
}