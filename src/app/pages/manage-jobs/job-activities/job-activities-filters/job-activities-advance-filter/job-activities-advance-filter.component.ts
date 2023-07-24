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
  selectedMinExperience = 0;
  selectedMaxExperience = 30;
  jobMinValue = 0
  jobMaxValue = 40
  skillMinValue = 0
  skillMaxValue = 60
  experienceSliderOptions: Options = {
    floor: 0,
    ceil: 40,
    step: 1,
    showTicks: true
  };
  skillSet: Options = {
    floor: 0,
    ceil: 100,
    step: 10,
    minLimit: 0,
    
  };
  jobTitles: any;
  selectedJobTitles = [];
  selectedApplicationStatus = [];
  selectedProfileMatchings = [];
  selectedProfileType = [];
  selectedSourceType = [];
  selectedDomain = [];
  selectedCertifications = [];

  

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

  statusDropdownSettings:IDropdownSettings = {
    singleSelection: true,
    idField: 'jobStatusId',
    textField: 'jobStatus',
    itemsShowLimit: 2,
    allowSearchFilter: true
  };
  profileMatchingDropdownSettings:IDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'value',
    itemsShowLimit: 2,
    allowSearchFilter: true
  };

  certificationsDropdownSettings:IDropdownSettings = {
    singleSelection: true,
    idField: 'certificationnameid',
    textField: 'certificationname',
    itemsShowLimit: 2,
    allowSearchFilter: true
  };
  domainDropdownSettings:IDropdownSettings = {
    singleSelection: false,
    idField: 'DomainId',
    textField: 'DomainName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 2,
    allowSearchFilter: true
  };

  profileTypeDropdownSettings:IDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'value',
    itemsShowLimit: 2,
    allowSearchFilter: true
  };

  profileMatching = [
    {id:1,value:'100% - 80%'},
    {id:2,value:'80% - 60%'},
    {id:3,value:'Below 60%'},
  ]
  profileType = [
    {id:1,value:'Private'},
    {id:2,value:'Public'}
  ]

  sourceType = [
    { name: 'Arytic partners', id: '1', group:''},
    { name: 'Arytic profiles', id: '2', group:''},
    { name: 'Arytic recruiters', id: '3', group:''},
    { name: 'Bullhorn', id: '4', group:''},
    { name: 'Ceipal', id: '5', group:''},
    { name: 'Freshworks', id: '6', group:''},
    { name: 'Jazz HR', id: '7', group:''},
    { name: 'Workable', id: '8', group:''},
    { name: 'Zoho recruit', id: '9', group:''},
    { name: 'Email campaigns', id: '10', group:''},
    { name: 'Career builder', id: '11', group:''},
    { name: 'Dice', id: '12', group:''},
    { name: 'Glassdoor', id: '13', group:''},
    { name: 'Indeed', id: '14', group:''},
    { name: 'Monster', id: '15', group:''},
    { name: 'Ziprecruiter', id: '16', group:''},
    { name: 'Referrals', id: '17', group:''},
    { name: 'Facebook', id: '18', group:''},
    { name: 'LinkedIn', id: '19', group:''},
    { name: 'Twitter', id: '20', group:''},
    { name: 'Google +', id: '21', group:''},
    { name: 'Meetup', id: '22', group:''},
    { name: 'Slack', id: '23', group:''},
    { name: 'Reddit', id: '24', group:''},
    { name: 'Job Fairs', id: '25', group:''},
    { name: 'Trade Shows', id: '26', group:''},
    { name: 'Recruiting agency', id: '27', group:''},
    { name: 'Vendors', id: '28', group:''},

  
];

  @Input() advanceFilter = false; // decorate the property with @Input();
  @Output("filterHideHandler") filterHideHandler: EventEmitter<any> = new EventEmitter();
  @Output("filtersApplied") filtersApplied: EventEmitter<any> = new EventEmitter();
  jobStatus: any;
  domainList: any;
  certificationList: any;
  clearedFilters = {
    jobTitle: [],
    skills: [],
    location: [],
    employmentType: [],
    customerUsers: [],
    lastPosted: null,
    client: [],
    immigrationStatus: [],
    domain: [],
    experience: {min: 0, max: 40},
    salaryRange: {min: 0, max: 400000},
    jobStatus: [],
    priority: []
  };

  appliedFilters = {...this.clearedFilters};


  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.getJobStatus()
    this.getJobTitle("a")
    this.getSourceType()
    this.getDomain();
    this.getCertification()
  }
  onSlider1Change(event:any){

    console.log('Low value:', event.value[0]);
    console.log('High value:', event);
    this.skillMaxValue = 100 - event.value
  }
  onSlider2Change(event:any){
    this.jobMaxValue = 100 -event.value
  }

  onJobTitleFilterChange(event: any) {
    this.getJobTitle(event ? event : "a");
  }
  onjobTitleItemSelect(items: any){
    console.log("selectedTitle",items)
  }
  valuesChange(i:any){
    console.log("data",i)
  }

  getJobTitle(searchText: string){
    this.apiService.getAllJobTitle(searchText).subscribe((res:any) =>{
      this.jobTitles = res
      console.log("jobTitles",this.jobTitles)
    })
  }
  getJobStatus(){
    this.apiService.getJobStatus().subscribe((res:any) =>{
      this.jobStatus = res.jobstatus
      console.log("jobstatus",this.getJobStatus)
    })
  }
  getSourceType(){
    this.apiService.getSourceType().subscribe((res:any) =>{
      console.log("sourceType",res)
    })
  }

  getDomain(){
    this.apiService.getAllDomain().subscribe((res:any) =>{
      this.domainList = res
      console.log("Domai",this.domainList)
    })
  }
  getCertification(){
    this.apiService.getAllCertifications().subscribe((res:any) =>{
      this.certificationList = res
      console.log("cert",this.certificationList)
    })
  }
  applyClick() {
    // this.appliedFilters.jobTitle = this.selectedJobTitles;
    // this.appliedFilters.skills = this.selectedSkills;
    // this.appliedFilters.location = this.selectedLocations;
    // this.appliedFilters.employmentType = this.selectedEmploymentTypes;
    // this.appliedFilters.customerUsers = this.selectedCustomerUsers;
    // this.appliedFilters.lastPosted = this.selectedLastPosted.length > 0 ? this.selectedLastPosted[0] : null;
    // this.appliedFilters.client = this.selectedClients;
    // this.appliedFilters.immigrationStatus = this.selectedImmigrationStatus;
    // this.appliedFilters.domain = this.selectedDomains;
    // this.appliedFilters.experience.max = this.selectedMaxExperience;
    // this.appliedFilters.experience.min = this.selectedMinExperience;
    // this.appliedFilters.salaryRange.max = this.selectedMaxSalary;
    // this.appliedFilters.salaryRange.min = this.selectedMinSalary;
    // this.appliedFilters.jobStatus = this.selectedJobStatus;
    // this.appliedFilters.priority = this.selectedPriorities;

    console.log("AdvancedFilters Applied", this.appliedFilters);
    this.filtersApplied.emit(this.appliedFilters);
  }

  
}
