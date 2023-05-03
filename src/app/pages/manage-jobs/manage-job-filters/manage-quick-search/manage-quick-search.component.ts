import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-manage-quick-search',
  templateUrl: './manage-quick-search.component.html',
  styleUrls: ['./manage-quick-search.component.scss']
})
export class ManageQuickSearchComponent implements OnInit {
  @Input() quickSearch = false; // decorate the property with @Input();
  @Output("quickHideHandler") quickHideHandler: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

}
