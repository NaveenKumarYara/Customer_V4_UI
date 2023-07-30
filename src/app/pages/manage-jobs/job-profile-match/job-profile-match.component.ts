import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-job-profile-match',
  templateUrl: './job-profile-match.component.html',
  styleUrls: ['./job-profile-match.component.scss']
})
export class JobProfileMatchComponent implements OnInit {
  minValue: number = 20;
  maxValue: number = 100;
  skillMin: number = 0;
  skillMax: number = 50;
  jobMin: number = 0;
  jobMax: number = 50;
  personalMin: number = 0;
  personalMax: number = 50;
  cultureMin: number = 0;
  cultureMax: number = 50;
  teamMin: number = 0;
  teamMax: number = 50;
  options: Options = {
    floor: 0,
    ceil: 200
  };
  skillsOptions: Options = {
    floor: 0,
    ceil: 100
  };
  jobOptions: Options = {
    floor: 0,
    ceil: 100
  };
  personalOptions: Options = {
    floor: 0,
    ceil: 100,
    disabled: true
  };
  cultureOptions: Options = {
    floor: 0,
    ceil: 100,
    disabled: true
  };
  teamOptions: Options = {
    floor: 0,
    ceil: 100,
    disabled: true
  };
  constructor() { }

  ngOnInit(): void {
  }

}
