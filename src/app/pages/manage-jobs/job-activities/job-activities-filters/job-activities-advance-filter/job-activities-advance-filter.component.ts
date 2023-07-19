import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ApiService } from 'src/app/shared/components/services/api.service';

@Component({
  selector: 'app-job-activities-advance-filter',
  templateUrl: './job-activities-advance-filter.component.html',
  styleUrls: ['./job-activities-advance-filter.component.scss']
})
export class AdvanceFilterComponent implements OnInit {
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
  jobTitles: any;
  selectedJobTitles = [];

  jobTitlesDropdownSettings:IDropdownSettings = {
    singleSelection: false,
    idField: 'JobTitle',
    textField: 'JobTitle',
    // selectAllText: 'Select All',
    // unSelectAllText: 'UnSelect All',
    itemsShowLimit: 1,
    allowSearchFilter: true,
    searchPlaceholderText: 'Type the Job Title...',
    clearSearchFilter: false,
    allowRemoteDataSearch: true
  };
  
  @Input() advanceFilter = false; // decorate the property with @Input();
  @Output("filterHideHandler") filterHideHandler: EventEmitter<any> = new EventEmitter();
  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
  }

  onJobTitleFilterChange(event: any) {
    this.getJobTitle(event ? event : "a");
  }
  onjobTitleItemSelect(items: any){
    console.log("selectedTitle",items)
  }

  getJobTitle(searchText: string){
    this.apiService.getAllJobTitle(searchText).subscribe((res:any) =>{
      this.jobTitles = res
      console.log("jobTitles",this.jobTitles)
    })
  }

}
