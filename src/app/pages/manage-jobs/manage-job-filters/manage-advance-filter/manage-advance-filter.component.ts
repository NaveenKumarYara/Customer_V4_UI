import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ApiService } from 'src/app/shared/components/services/api.service';


@Component({
  selector: 'app-manage-advance-filter',
  templateUrl: './manage-advance-filter.component.html',
  styleUrls: ['./manage-advance-filter.component.scss']
})
export class ManageAdvanceFilterComponent implements OnInit {

  experienceSliderOptions: Options = {
    floor: 0,
    ceil: 40,
    step: 1,
    showTicks: true
  };
  salarySliderOptions: Options = {
    floor: 0,
    ceil: 1000000,
    step: 1000,
    showTicks: true
  };
  
  @Input() advanceFilter = false; // decorate the property with @Input();
  @Input() customer: any;
  @Output("filterHideHandler") filterHideHandler: EventEmitter<any> = new EventEmitter();
  @Output("filtersApplied") filtersApplied: EventEmitter<any> = new EventEmitter();

  dropdownSettings:IDropdownSettings = {
    singleSelection: false,
    idField: 'SkillId',
    textField: 'SkillName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
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

  locationsDropdownSettings:IDropdownSettings = {
    singleSelection: false,
    idField: 'CityName',
    textField: 'CityName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 2,
    allowSearchFilter: true,
    searchPlaceholderText: 'Type the Job Location...',
    clearSearchFilter: false,
    allowRemoteDataSearch: true
  };

  companiesDropdownSettings:IDropdownSettings = {
    singleSelection: false,
    idField: 'ClientId',
    textField: 'ClientName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 2,
    allowSearchFilter: true,
    searchPlaceholderText: 'Type the Job Client Name...',
    clearSearchFilter: false,
    allowRemoteDataSearch: true
  };

  priorityDropdownSettings:IDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'priority',
    itemsShowLimit: 2
  };

  employmeentDropdownSettings:IDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'employment',
    itemsShowLimit: 2,
    // allowSearchFilter: true
  };

  statusDropdownSettings:IDropdownSettings = {
    singleSelection: true,
    idField: 'jobStatusId',
    textField: 'jobStatus',
    itemsShowLimit: 2,
    allowSearchFilter: true
  };

  customerUsersDropdownSettings:IDropdownSettings = {
    singleSelection: true,
    idField: 'UserId',
    textField: 'name',
    itemsShowLimit: 2,
    allowSearchFilter: true
  };

  lastPostedDropdownSettings:IDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'name',
    itemsShowLimit: 2,
    allowSearchFilter: true
  };

  ImmigrationDropdownSettings:IDropdownSettings = {
    singleSelection: false,
    idField: 'ImmigrationStatusId',
    textField: 'ImmigrationStatus',
    itemsShowLimit: 2,
    allowSearchFilter: true
  };

  // API Lists
  skillsList: any;
  domainList: any;
  jobTitles: any;
  cityList: any;
  customercontacts: any;
  jobStatus:any
  companies: any;
  clients:any

  // Static Lists
  employmentTypes =[
    {id:'1',employment:'Full-Time'},
    {id:'2',employment:'Part-Time'},
    {id:'3',employment:'Contractor'}
  ]

  priorities = [
    {id:'1',priority:'Low'},
    {id:'2',priority:'High'},
    {id:'3',priority:'Medium'}
  ]

  lastPostedList= [
    {id:"1",name:"Today"},
    {id:"2",name:"Within 1 week"},
    {id:"3",name:"Within 1 month"},
    {id:"4",name:"Within 3 months"},
  ]

  immigrationList = [
    {
      "ImmigrationStatusId": 1,
      "ImmigrationStatus": "H1B"
    },
    {
      "ImmigrationStatusId": 2,
      "ImmigrationStatus": "GreenCard"
    },
    {
      "ImmigrationStatusId": 3,
      "ImmigrationStatus": "US citizen"
    },
    {
      "ImmigrationStatusId": 4,
      "ImmigrationStatus": "TN visa"
    },
    {
      "ImmigrationStatusId": 5,
      "ImmigrationStatus": "F1 visa"
    },
    {
      "ImmigrationStatusId": 6,
      "ImmigrationStatus": "H4 EAD"
    },
    {
      "ImmigrationStatusId": 7,
      "ImmigrationStatus": "GC EAD"
    },
    {
      "ImmigrationStatusId": 8,
      "ImmigrationStatus": "OPT EAD"
    },
    {
      "ImmigrationStatusId": 9,
      "ImmigrationStatus": "L2 EAD"
    },
    {
      "ImmigrationStatusId": 10,
      "ImmigrationStatus": "Open"
    },
    {
      "ImmigrationStatusId": 11,
      "ImmigrationStatus": "Others"
    }
  ]

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

  // NGModels
  selectedJobTitles = [];
  selectedSkills = [];
  selectedLocations = [];
  selectedEmploymentTypes = [];
  selectedCustomerUsers = [];
  selectedLastPosted = [];
  selectedClients = [];
  selectedImmigrationStatus = [];
  selectedDomains = [];
  selectedMinExperience = 0;
  selectedMaxExperience = 30;
  selectedMinSalary = 0;
  selectedMaxSalary = 400000;
  selectedJobStatus = [];
  selectedPriorities = [];
  
  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.getClients('a')
   this.getDomain();
   this.getJobTitle("a");
   this.getLocations("a")
  //  this.getLocations()
  //  this.getAllCOmpanies();
   this.getJobStatus()
   this.getCustomerUsers();
   this.getSkills();

  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onjobTitleItemSelect(items: any){
    console.log("selectedTitle",items)
   
  }
  onjobTitleSelectAll(items: any){

  }
  searchTitle(v:any){
    // console.log("v",v)
  }

  getSkills(){
    this.apiService.getAllSkills().subscribe((res:any) =>{
      this.skillsList = res
      console.log("skills",this.skillsList)
    })
  }

  // getLocations(){
  //   this.apiService.getAllCityes().subscribe((res:any) =>{
  //     this.cityList = res
  //     console.log("cityList",this.cityList)
  //   })
  // }

  getLocations(searchText:any){
    this.apiService.getAllCityes(searchText).subscribe((res:any) =>{
      this.cityList = res
      console.log("jobTitles",this.jobTitles)
    })
  }

  getCustomerUsers() {
    console.log("gob2", this.customer)
    return this.apiService.GetProfileService("/api/GetCustomerUsers?CustomerId=", this.customer.CustomerId).subscribe((res: any) => {
      console.log("customerName", res)
      this.customercontacts = res.map((v: any) => {v.name = `${v.FirstName} ${v.LastName}`; return v});
      // this.getClients()
    });
  }

  getClients(event:any){
    console.log("getClients",event)

    const data={ClientName:event,
      IsSuggested: false}
    return this.apiService.postProfileService("/api/SearchClients",data).subscribe((v:any)=>{
      console.log("v",v)
      this.clients = v
    })
  }

  getJobTitle(searchText: string){
    this.apiService.getAllJobTitle(searchText).subscribe((res:any) =>{
      this.jobTitles = res
      console.log("jobTitles",this.jobTitles)
    })
  }

  getAllCOmpanies(){
    this.apiService.GetAllCompanies().subscribe((res:any) =>{
      this.companies = res
      console.log("jobTitles",this.companies)
    })
  }

  getDomain(){
    this.apiService.getAllDomain().subscribe((res:any) =>{
      this.domainList = res
      console.log("Domai",this.domainList)
    })
  }

  getJobStatus(){
    this.apiService.getJobStatus().subscribe((res:any) =>{
      this.jobStatus = res.jobstatus
      console.log("jobstatus",this.jobStatus)
    })
  }

  onJobTitleFilterChange(event: any) {
    this.getJobTitle(event ? event : "a");
  }
  onLocationFilterChange(event: any) {
    this.getLocations(event ? event : "a");
  }
  onClientFilterChange(event:any){
    this.getClients(event?event:"a")
  }

  applyClick() {
    this.appliedFilters.jobTitle = this.selectedJobTitles;
    this.appliedFilters.skills = this.selectedSkills;
    this.appliedFilters.location = this.selectedLocations;
    this.appliedFilters.employmentType = this.selectedEmploymentTypes;
    this.appliedFilters.customerUsers = this.selectedCustomerUsers;
    this.appliedFilters.lastPosted = this.selectedLastPosted.length > 0 ? this.selectedLastPosted[0] : null;
    this.appliedFilters.client = this.selectedClients;
    this.appliedFilters.immigrationStatus = this.selectedImmigrationStatus;
    this.appliedFilters.domain = this.selectedDomains;
    this.appliedFilters.experience.max = this.selectedMaxExperience;
    this.appliedFilters.experience.min = this.selectedMinExperience;
    this.appliedFilters.salaryRange.max = this.selectedMaxSalary;
    this.appliedFilters.salaryRange.min = this.selectedMinSalary;
    this.appliedFilters.jobStatus = this.selectedJobStatus;
    this.appliedFilters.priority = this.selectedPriorities;

    console.log("AdvancedFilters Applied", this.appliedFilters);
    this.filtersApplied.emit(this.appliedFilters);
  }

  cancelClicked() {
    this.appliedFilters = {...this.clearedFilters};
    this.selectedSkills = [];
    this.selectedLocations = [];
    this.selectedEmploymentTypes=[];
    this.selectedCustomerUsers=[];
    this.selectedLastPosted = [];
    this.selectedClients =[];
    this.selectedImmigrationStatus = [];
    this.selectedDomains =[];
    this.selectedJobStatus = [];
    this.selectedPriorities =[]
    this.selectedJobTitles = [];
    this.selectedMinExperience = 0;
    this.selectedMaxExperience = 40;
    this.selectedMinSalary = 0;
    this.selectedMaxSalary = 400000;
    this.applyClick();
    this.filterHideHandler.emit();
  }
  onDdeSelectAll(d:any){
console.log("ddd",d)
  }
}
