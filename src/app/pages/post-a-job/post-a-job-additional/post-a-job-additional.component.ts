import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-post-a-job-additional',
  templateUrl: './post-a-job-additional.component.html',
  styleUrls: ['./post-a-job-additional.component.scss']
})
export class PostAJobAdditionalComponent implements OnInit {
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

  constructor() { }

  ngOnInit(): void {
  }

}
