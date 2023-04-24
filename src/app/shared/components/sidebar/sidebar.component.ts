import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  @Input() menuOpen = false; // decorate the property with @Input();
  @Output("openMenu") openMenu: EventEmitter<any> = new EventEmitter();
  constructor() { }
  ngOnInit(): void {
  }
}
