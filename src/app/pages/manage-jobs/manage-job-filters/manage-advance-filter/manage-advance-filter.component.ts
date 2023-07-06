import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-manage-advance-filter',
  templateUrl: './manage-advance-filter.component.html',
  styleUrls: ['./manage-advance-filter.component.scss']
})
export class ManageAdvanceFilterComponent implements OnInit {
  salMinValue: number = 120;
  salMaxValue: number = 1370;
  minValue: number = 20;
  maxValue: number = 80;
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 10,
    showTicks: true
  };
  optionsSal: Options = {
    floor: 0,
    ceil: 10000,
    step: 10,
    showTicks: true
  };
  
  @Input() advanceFilter = false; // decorate the property with @Input();
  @Output("filterHideHandler") filterHideHandler: EventEmitter<any> = new EventEmitter();

  dropdownList = [
    { item_id: 1, item_text: 'UI' },
    { item_id: 2, item_text: 'UX' },
    { item_id: 3, item_text: 'Web Designer' },
    { item_id: 4, item_text: 'React' },
    { item_id: 5, item_text: 'Angular' }
  ];

  dropdownSettings:IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 1,
    allowSearchFilter: true
  };
  
  
  constructor() { }

  ngOnInit(): void {
   
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
}
