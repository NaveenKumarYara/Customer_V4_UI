import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';

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

  constructor() { }

  ngOnInit(): void {
  }

}
