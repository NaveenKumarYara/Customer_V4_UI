import { Component, OnInit,  Input, ViewChild,ViewContainerRef, EventEmitter,Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ManageJobService } from '../../managejobs.service';
import { AppService } from '../../../../app.service';
import {  ParentComponentApi } from '../load-joblist/load-joblist.component';
import { IfObservable } from 'rxjs/observable/IfObservable';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import { Subscription } from 'rxjs/Subscription';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Subject, Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError, startWith, map, takeUntil, take } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { concat } from 'rxjs/observable/concat';
import { FormControl } from '@angular/forms';
import { MatSelect, MatDialogRef } from '@angular/material';
import { Cities } from '../../../Postajob/models/jobPostInfo';
declare var $: any;

@Component({
  selector: 'app-manage-advance-search',
  templateUrl: './advance-search.component.html',
  styleUrls: ['./advance-search.component.css'],
  providers: [AppService]
})
export class AdvanceSearchComponent implements OnInit {
  customerId: any;
  customer: any;
  userId: any;
  location:any;
  exp:any;
  departmentId:any;
  clientId:any;
  advancesearch:any;
  skilllist: Observable<string[]>;
  skilltitleloading = false;
  selectedskillinput = new Subject<string>();
  cn = new client();
  dn = new dept();
  showadvancesearch = false;
  empolymentId:any;
  clientName: any;
  convertObservable: Cities[];
  cities: Cities[];
selectedCityInput = new Subject<string>();
cityloading = false;
  deptName:any;
  searchString:any;
  minSal:any;
  maxSal:any;
  minExp:any;
  maxExp:any;
  SearchDept:any =[];
  SearchClients:any = [];
  SearchList: any = [];
  expYears: any = [];
  // employmentList: any = [];
  employmentMainList: any = [];
  selectedCity :any[]=[];
  selectedJobType :any[]=[];
  
  states: Cities[] = [
    {
      CityId:1,
      CityName: 'Locations'
    } 
    
  ];
  stateCtrl = new FormControl();
  filteredStates: Observable<State[]>;

  toppings = new FormControl();
  // emp = new FormControl();

  toppingList: string[] = ['PUNE', 'MUMBAI', 'DELHI', 'AHMEDNAGAR', 'KOTA', 'SHIRDI'];
  @Input() parentApi: ParentComponentApi; 
  @Output() OutputtoParent =  new EventEmitter<any[]>();


  ClientList: any = [];
  JobtitleList: any = [];
  DepartmentList: any = [];
  DomainList: any = [];
  ProfileStatusList: any = [];
  SkillList: any = [];
  LastPostedList: any = [];
  DesignationList: any = [];
  RolesList: any = [];
  CategoryList: any = [];
  UsersList: any = []; 
  profiletypeList: any = []; 
  immigrationstatusList: any = []; 
  EducationList: any = []; 
  

  SelectedClientList: any = [];
  SelectedJobtitleList: any = [];
  SelectedDepartmentList: any = [];
  SelectedDomainList: any = [];
  SelectedProfileStatusList: any = [];
  SelectedSkillList: any = [];
  SelectedLastPostedList: any = [];
  SelectedDesignationList: any = [];
  SelectedRolesList: any = [];
  SelectedCategoryList: any = [];
  SelectedUsersList: any = []; 
  SelectedprofiletypeList: any = []; 
  SelectedimmigrationstatusList: any = []; 
  SelectedEducationList: any = []; 
  SelectedCityList: any = []; 


  ClientMainList: any = [];
  JobtitleMainList: any = [];
  DepartmentMainList: any = [];
  DomainMainList: any = [];
  ProfileStatusMainList: any = [];
  SkillMainList: any = [];
  LastPostedMainList: any = [];
  DesignationMainList: any = [];
  RolesMainList: any = [];
  CategoryMainList: any = [];
  UsersMainList: any = []; 
  profiletypeMainList: any = []; 
  immigrationstatusMainList: any = []; 
  EducationMainList: any = []; 
  CityMainList: any = []; 

  Clients: any = [];
  Jobtitles: any = [];
  Departments: any = [];
  Domains: any = [];
  Profiles: any = [];
  Skill: any = [];
  LastPostes: any = [];
  Designations: any = [];
  Role: any = [];
  Categories: any = [];
  User: any = []; 
  profiletypes: any = []; 
  immigrations: any = []; 
  Educations: any = [];  
  /** list of banks */
  protected banks: Cities[] = this.states;

  /** control for the selected bank for multi-selection */
  public emp: FormControl = new FormControl();
  public Client: FormControl = new FormControl();
  public Department: FormControl = new FormControl();
  public Domain: FormControl = new FormControl();
  public ProfileStatus: FormControl = new FormControl();
  public LastPosted: FormControl = new FormControl();
  public Designation: FormControl = new FormControl();
  public Roles: FormControl = new FormControl();
  public Category: FormControl = new FormControl();
  public profiletype: FormControl = new FormControl();
  public Users: FormControl = new FormControl();
  public Skills: FormControl = new FormControl();
  public bankMultiCtrl: FormControl = new FormControl();
  public immigrationstatus: FormControl = new FormControl();
  public Experience: FormControl = new FormControl();
  public Jobtitle: FormControl = new FormControl(); 
  public Education: FormControl = new FormControl(); 



  /** control for the MatSelect filter keyword multi-selection */
  public bankMultiFilterCtrl: FormControl = new FormControl();
  public empFilter: FormControl = new FormControl();
  public ClientFilter: FormControl = new FormControl();
  public DepartmentFilter: FormControl = new FormControl();
  public DomainFilter: FormControl = new FormControl();
  public ProfileStatusFilter: FormControl = new FormControl();
  public SkillFilter: FormControl = new FormControl();
  public LastPostedFilter: FormControl = new FormControl();
  public DesignationFilter: FormControl = new FormControl();
  public RolesFilter: FormControl = new FormControl();
  public CategoryFilter: FormControl = new FormControl();
  public profiletypefilter: FormControl = new FormControl();
  public UsersFilter: FormControl = new FormControl(); 
  public SkillsFilter: FormControl = new FormControl(); 
  public ExperienceFilter: FormControl = new FormControl();
  public immigrationstatusFilter: FormControl = new FormControl(); 
  public JobtitleFilter: FormControl = new FormControl(); 
  public EducationFilter: FormControl = new FormControl(); 
  

  /** list of banks filtered by search keyword */
  public filteredBanksMulti: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  public employmentList: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  public filteredClientList: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  public filteredDepartmentList: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  public filteredDomainList: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  public filteredProfileStatusList: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  public filteredSkillList: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  public filteredLastPostedList: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  public filteredDesignationList: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  public filteredRolesList: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  public filteredCategoryList: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  public filteredUsersList: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  public filteredJobtitle: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  public filteredEducation: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  public filteredimmigrationstatus : ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  
  
  @ViewChild('multiSelect') multiSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  

  
  constructor( public dialogRef: MatDialogRef<AdvanceSearchComponent>,private route: ActivatedRoute, private toastr:ToastsManager,private _vcr: ViewContainerRef,
    private router: Router, private managejobservice: ManageJobService,private appService: AppService) {
      this.customer = JSON.parse(sessionStorage.getItem('userData'));
      this.customerId = this.customer.CustomerId;
      this.userId = this.customer.UserId;
      this.toastr.setRootViewContainerRef(_vcr);
     }
    public getExpYears() {
      this.expYears = [];
      for (let i = 0; i <= 50; i++) {
          this.expYears.push(i);
      }
      return this.expYears;
  }

  GetEmployementType()
  {
    // this.employmentMainList = this.employmentList;
    return this.appService.getEmploymentType()
    .subscribe(data => {         
            this.employmentMainList =data;          
            this.employmentList.next( this.employmentMainList);
          },     
        error => {        
         });

  }

  SetSearch(val)
  {
    this.location = val.join(',').toString();
    debugger
    this.parentApi.callSearchMethod(this.location); 
  }

  SetSearchCName(val,str)
  {
    this.clientName = str;
    this.SearchClients = [];
    this.clientId = val;
  }

  SetSearchDName(val,str)
  {
    this.deptName = str;
    this.SearchDept  = [];
    this.departmentId = val;
  }

  all()
  {
    this.parentApi.callFilterMethod(0,0,0,0,0);
  }

   populateCities() {
    // this.cities = concat(
    //   of([]), // default items
    //   this.selectedCityInput.pipe(
    //     debounceTime(200),
    //     distinctUntilChanged(),
    //     tap(() => this.cityloading = true),
    //     switchMap(term => this.appService.getCities(term).pipe(
    //       catchError(() => of([])), // empty list on error
    //       tap(() => this.cityloading = false)
    //     ))
    //   )
    // );
  }

  apply()
  {
    if(this.empolymentId>0||this.exp>0||this.location>0||this.clientId>0||this.departmentId>0)
    {

      debugger
      // this.filter.getFilterCall();

      // this.OutputtoParent.emit(this.empolymentId);
      this.dialogRef.close({ data:this.empolymentId});
       //this.parentApi.callFilterMethod(this.empolymentId,this.exp,this.location,this.clientId,this.departmentId);
    }
    else
    {
      this.toastr.error('Please provide valid details to apply filters!', 'Oops!');
      setTimeout(() => {
          this.toastr.dismissToast;
      }, 10000);
    }

  }

  changeExperience(exp) {
    this.exp= exp;
  }
  changeJobType(empolyment,value) { 
    this.empolymentId= empolyment;
    if(this.selectedJobType.length==0)
      this.selectedJobType.push(this.employmentMainList.find(a=>a.EmploymentTypeId == empolyment));
    else if(this.selectedJobType.find(a=>a.EmploymentTypeId == empolyment) == null)
      this.selectedJobType.push(this.employmentMainList.find(a=>a.EmploymentTypeId == empolyment));
    else
   {
      var index = this.selectedJobType.indexOf(this.employmentMainList.find(a=>a.EmploymentTypeId == empolyment));
      this.selectedJobType.splice(index,1);
   }
      
  }
changeCategory(JobCategoryId){
  if(this.SelectedCategoryList.length==0)
    this.SelectedCategoryList.push(this.CategoryMainList.find(a=>a.JobCategoryId == JobCategoryId));
  else if(this.SelectedCategoryList.find(a=>a.JobCategoryId == JobCategoryId) == null)
    this.SelectedCategoryList.push(this.CategoryMainList.find(a=>a.JobCategoryId == JobCategoryId));
  else
 {
    var index = this.SelectedCategoryList.indexOf(this.CategoryMainList.find(a=>a.JobCategoryId == JobCategoryId));
    this.SelectedCategoryList.splice(index,1);
 }
}
changeEducation(QualificationId){
  if(this.SelectedEducationList.length==0)
    this.SelectedEducationList.push(this.EducationMainList.find(a=>a.QualificationId == QualificationId));
  else if(this.SelectedEducationList.find(a=>a.QualificationId == QualificationId) == null)
    this.SelectedEducationList.push(this.EducationMainList.find(a=>a.QualificationId == QualificationId));
  else
 {
    var index = this.SelectedEducationList.indexOf(this.EducationMainList.find(a=>a.QualificationId == QualificationId));
    this.SelectedEducationList.splice(index,1);
 }
}
changeImmigration(ImmigrationStatusId){
  if(this.SelectedimmigrationstatusList.length==0)
    this.SelectedimmigrationstatusList.push(this.immigrationstatusMainList.find(a=>a.ImmigrationStatusId == ImmigrationStatusId));
  else if(this.SelectedimmigrationstatusList.find(a=>a.ImmigrationStatusId == ImmigrationStatusId) == null)
    this.SelectedimmigrationstatusList.push(this.immigrationstatusMainList.find(a=>a.ImmigrationStatusId == ImmigrationStatusId));
  else
 {
    var index = this.SelectedimmigrationstatusList.indexOf(this.immigrationstatusMainList.find(a=>a.ImmigrationStatusId == ImmigrationStatusId));
    this.SelectedimmigrationstatusList.splice(index,1);
 }
}
changeClient(ClientId){
  if(this.SelectedClientList.length==0)
    this.SelectedClientList.push(this.ClientMainList.find(a=>a.ClientId == ClientId));
  else if(this.SelectedClientList.find(a=>a.ClientId == ClientId) == null)
    this.SelectedClientList.push(this.ClientMainList.find(a=>a.ClientId == ClientId));
  else
 {
    var index = this.SelectedClientList.indexOf(this.ClientMainList.find(a=>a.ClientId == ClientId));
    this.SelectedClientList.splice(index,1);
 }
}
changeLocation(CityId){
  if(this.SelectedCityList.length==0)
    this.SelectedCityList.push(this.CityMainList.find(a=>a.CityId == CityId));
  else if(this.SelectedCityList.find(a=>a.CityId == CityId) == null)
    this.SelectedCityList.push(this.CityMainList.find(a=>a.CityId == CityId));
  else
 {
    var index = this.SelectedCityList.indexOf(this.CityMainList.find(a=>a.CityId == CityId));
    this.SelectedCityList.splice(index,1);
 }
}
changeDepartment(DepartmentId){
  if(this.SelectedDepartmentList.length==0)
    this.SelectedDepartmentList.push(this.DepartmentMainList.find(a=>a.DepartmentId == DepartmentId));
  else if(this.SelectedDepartmentList.find(a=>a.DepartmentId == DepartmentId) == null)
    this.SelectedDepartmentList.push(this.DepartmentMainList.find(a=>a.DepartmentId == DepartmentId));
  else
 {
    var index = this.SelectedDepartmentList.indexOf(this.ClientMainList.find(a=>a.DepartmentId == DepartmentId));
    this.SelectedDepartmentList.splice(index,1);
 }
}

changeDomain(DomainId){
  if(this.SelectedDomainList.length==0)
    this.SelectedDomainList.push(this.DomainMainList.find(a=>a.DomainId == DomainId));
  else if(this.SelectedDomainList.find(a=>a.DomainId == DomainId) == null)
    this.SelectedDomainList.push(this.DomainMainList.find(a=>a.DomainId == DomainId));
  else
 {
    var index = this.SelectedDomainList.indexOf(this.DomainMainList.find(a=>a.DomainId == DomainId));
    this.SelectedDomainList.splice(index,1);
 }
}

ChnageLocations(DomainId){
  if(this.SelectedDomainList.length==0)
    this.SelectedDomainList.push(this.DomainMainList.find(a=>a.DomainId == DomainId));
  else if(this.SelectedDomainList.find(a=>a.DomainId == DomainId) == null)
    this.SelectedDomainList.push(this.DomainMainList.find(a=>a.DomainId == DomainId));
  else
 {
    var index = this.SelectedDomainList.indexOf(this.DomainMainList.find(a=>a.DomainId == DomainId));
    this.SelectedDomainList.splice(index,1);
 }
}
  GetSearchClients(cname)
  {
    this.cn.ClientName = cname;
    this.cn.IsSuggested = false;
    return this.appService.SearchClients(this.cn)
    .subscribe(data => {
          if (data.length > 0) {  
            this.SearchClients =data;
          }
          else {
            this.SearchClients = [];
          }
        
          }, 
     
        error => { 
          this.SearchClients  = [];
         });
  
  }

  getSkills() {
    this.skilllist = concat(
      of([]), // default items
      this.selectedskillinput.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => this.skilltitleloading = true),
        switchMap(term => this.appService.getSkills(term).pipe(
          catchError(() => of([])), // empty list on error
          tap(() => this.skilltitleloading = false)
        ))
      )
    );
  }

  GetSearchDepartments(dname)
  {
    this.dn.DepartmentName = dname;
    this.dn.IsSuggested = false;
    return this.appService.SearchDepartments(this.dn)
    .subscribe(data => {
          if (data.length > 0) {  
            this.SearchDept = data;
          }
          else {
            this.SearchDept = [];
          }
        
          }, 
     
        error => { 
          this.SearchDept   = [];
         });
  
  }

  ClearAll()
  {
    this.exp = 0;
    this.empolymentId= 0;
    this.clientId= 0;
    this.departmentId= 0;
  }
  saveLocations(bank,event){
    this.getAllCity("au"); 
    if(this.selectedCity.length ==0){
      this.selectedCity.push(bank);
    }else if(this.selectedCity.find(a=>a == bank)!= null){
      this.selectedCity.push(bank);
    }
  }
  getAllCity(s){
    return this.appService.getCities(s)
    .subscribe(data => {         
            this.cities =data;          
          },     
        error => {        
         });

    // this.appService.getCities(s).subscribe( data=>{
    //  this.cities = data;
    //   console.log("data",data);
    // })
    // var cities = this.appService.getCities(s).subscribe( data=>{
    //   //  this.cities = data;
    //     this.cities = concat(
    //         of([]), // default items
    //         this.selectedCityInput.pipe(
    //           debounceTime(200),
    //           distinctUntilChanged(),
    //           tap(() => this.cityloading = true),
    //           switchMap(term => data.pipe(
    //             catchError(() => of([])), // empty list on error
    //             tap(() => this.cityloading = false)
    //           ))
    //         )
    //       );
    //     console.log("data",data);
    //   })
     
    //  concat(
    //   of([]), // default items
    //   this.selectedCityInput.pipe(
    //     debounceTime(200),
    //     distinctUntilChanged(),
    //     tap(() => this.cityloading = true),
    //     switchMap(term => this.appService.getCities(s).pipe(
    //       catchError(() => of([])), // empty list on error
    //       tap(() => this.cityloading = false)
    //     ))
    //   )
    // );
    // console.log("new Cities",cities.subscribe(event =>{  event}));
    // this.cities.subscribe(event =>{  
    //   console.log("citessss",event); 
    //   });
  }
  private _filterStates(value: string): Cities[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.CityName.toLowerCase().indexOf(filterValue) === 0);
  }
  GetCity(val) {
    return this.managejobservice.GetSearch(val)
    .subscribe(data => {
          if (data.length > 0) {  
            this.SearchList =data;
          }
          else {
            this.SearchList = [];
          }
        
          }, 
     
        error => { 
          this.SearchList = [];
         });
  
  }
  ngAfterViewInit() {
    this.setInitialValue();
  }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  /**
   * Sets the initial value after the filteredBanks are loaded initially
   */
  protected setInitialValue() {
    this.filteredBanksMulti
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.multiSelect.compareWith = (a: Cities, b: Cities) => a && b && a.CityId === b.CityId;
      }); 

  }
filterEmpType(){
  let search = this.empFilter.value;
  if (!search) {
    this.employmentList.next(this.employmentMainList.slice());
    return;
  } else {
    search = search.toLowerCase();
  }
  // filter the banks
  this.employmentList.next(this.employmentMainList.filter(b  => b.EmploymentType.toLowerCase().indexOf(search) > -1));
   
}
  
  protected filterBanksMulti() {
    if (!this.banks) {
      return;
    }
    // get the search keyword
    let search = this.bankMultiFilterCtrl.value;
    if(search == ""){
      search ="a";
    }
    this.appService.getCities(search)
    .subscribe(data => {         
            this.cities =data;   
            this.banks =data;   
            this.CityMainList = data;
            if (!search) {
              this.filteredBanksMulti.next(this.banks.slice());
              return;
            } else {
              search = search.toLowerCase();
            }
            // filter the banks
            this.filteredBanksMulti.next(
              this.banks.filter(bank => bank.CityName.toLowerCase().indexOf(search) > -1)
            );
          });  
  }
  
  protected filterSkillsMulti() {
    if (!this.skilllist) {
      return;
    }
    // get the search keyword
    let search = this.SkillsFilter.value;
    if(search == ""){
      search ="a";
    }
    // this.appService.getSkills(search)
    // .subscribe(data => {         
    //         this.skilllist =data;   
    //         this.banks =data;   
    //         if (!search) {
    //           this.filteredBanksMulti.next(this.banks.slice());
    //           return;
    //         } else {
    //           search = search.toLowerCase();
    //         }
    //         // filter the banks
    //         this.filteredBanksMulti.next(
    //           this.banks.filter(bank => bank.CityName.toLowerCase().indexOf(search) > -1)
    //         );
    //       });  
  } 
  protected filterJobCategory() {
    if (!this.Category) {
      return;
    }
    // get the search keyword
    let search = this.CategoryFilter.value;
    if(search == ""){
      search ="a";
    }
    this.appService.searchJobCategory(search)
    .subscribe(data => {         
            // this.Category =data;   
            this.Categories =data;   
            if (!search) {
              this.filteredCategoryList.next(this.Categories.slice());
              return;
            } else {
              search = search.toLowerCase();
            }
            // filter the banks
            this.filteredCategoryList.next(
              this.Categories.filter(Categories => Categories.Category.toLowerCase().indexOf(search) > -1)
            );
          });  
  }
  protected filterClient(){
  // if (!this.Category) {
  //   return;
  // }
  // get the search keyword
  let search = this.ClientFilter.value;
  if(search == ""){
    search ="a";
  }
  this.cn.ClientName = search;
    this.cn.IsSuggested = false;
  this.appService.SearchClients(this.cn)
  .subscribe(data => {         
          // this.Category =data;   
          this.ClientMainList = data;
          this.Clients =data;   
          if (!search) {
            this.filteredClientList.next(this.Clients.slice());
            return;
          } else {
            search = search.toLowerCase();
          }
          // filter the banks
          this.filteredClientList.next(
            this.Clients.filter(Clients => Clients.ClientName.toLowerCase().indexOf(search) > -1)
          );
        });  
} protected filterimmigrationstatus(){
  // if (!this.Category) {
  //   return;
  // }
  // get the search keyword
  let search = this.immigrationstatusFilter.value;
  if(search == ""){
  this.GetImmigrationStatus();
  }  
          this.immigrations =this.immigrationstatusMainList;   
          if (!search) {
            this.filteredimmigrationstatus.next(this.immigrations.slice());
            return;
          } else {
            search = search.toLowerCase();
          }
          // filter the banks
          this.filteredimmigrationstatus.next(
            this.immigrations.filter(immigrations => immigrations.ImmigrationStatus.toLowerCase().indexOf(search) > -1)
          ); 
}

protected filterDepartment(){ 
  let search = this.DepartmentFilter.value;
  if(search == ""){
    search ="a";
  } 
  this.appService.searchDepartment(search,false,this.customerId)
  .subscribe(data => {           
          this.DepartmentMainList = data;
          this.Departments =data;   
          if (!search) {
            this.filteredDepartmentList.next(this.Departments.slice());
            return;
          } else {
            search = search.toLowerCase();
          } 
          this.filteredDepartmentList.next(
            this.Departments.filter(Departments => Departments.CustomerDepartment.toLowerCase().indexOf(search) > -1)
          );
        });  
}
protected filterEducation(){ 
  let search = this.EducationFilter.value;
  if(search == ""){
    // search ="a";
    this.getQualificationDetails();
  } 
  // this.appService.searchDepartment(search,false,this.customerId)
  // .subscribe(data => {           
          // this.DepartmentMainList = data;
          this.Educations =this.EducationMainList;   
          if (!search) {
            this.filteredEducation.next(this.Educations.slice());
            return;
          } else {
            search = search.toLowerCase();
          } 
          this.filteredEducation.next(
            this.Educations.filter(Educations => Educations.QualificationName.toLowerCase().indexOf(search) > -1)
          );
        // });  
}
protected filterDomain(){ 
  let search = this.DomainFilter.value;
  if(search == ""){
    search ="a";
  } 
             
          
           this.Domains = this.DomainMainList;// = data;
          if (!search) {
            this.filteredDomainList.next(this.Domains.slice());
            return;
          } else {
            search = search.toLowerCase();
          } 
          this.filteredDomainList.next(
            this.Domains.filter(Domains => Domains.DomainName.toLowerCase().indexOf(search) > -1)
          );
       
}
  getAllSkills(){
    this.appService.getSkills("a")
    .subscribe(data => {         
            this.SkillList = data;    
            console.log(this.SkillList ,"skillllllllllllll")
             // set initial selection
        // this.Skills.setValue([this.SkillList[0]]);

        // load the initial bank list
        this.filteredSkillList.next(this.SkillList.slice()); 
    
        // listen for search field value changes
        this.SkillsFilter.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filterBanksMulti();
          });

          },     
        error => {        
         });
  }
  GetImmigrationStatus() {
    this.appService.GetImmigrationStatus().subscribe(res => {
     this.immigrationstatusList = res;
     this.immigrationstatusMainList = res;
     console.log(this.immigrationstatusList ,"immigrationstatusList")
     
     this.filteredimmigrationstatus.next(this.immigrationstatusList.slice()); 
     this.immigrationstatusFilter.valueChanges
       .pipe(takeUntil(this._onDestroy))
       .subscribe(() => {
         this.filterimmigrationstatus();
       });

       },     
     error => {        
 });
 }
 GetJobCategory(){ 
    this.appService.searchJobCategory("a")
    .subscribe(data => {         
            this.CategoryList = data;    
            this.CategoryMainList = data;    
            console.log(this.CategoryList ,"CategoryList")
        // this.Skills.setValue([this.CategoryList[0]]);
        this.filteredCategoryList.next(this.CategoryList.slice()); 
        this.CategoryFilter.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filterJobCategory();
          });

          },     
        error => {        
         });
 }
  getAllJobTitle(){ 
      this.appService.searchJobTitle("a")
      .subscribe(data => {         
              this.JobtitleList = data;    
              console.log(this.JobtitleList ,"searchJobTitle")
               // set initial selection
          this.Skills.setValue([this.JobtitleList[0]]);
  
          // load the initial bank list
          this.filteredJobtitle.next(this.JobtitleList.slice()); 
      
          // listen for search field value changes
          this.JobtitleFilter.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
              this.filterBanksMulti();
            });
  
            },     
          error => {        
           });
  }
  getQualificationDetails(){
    this.appService.getQualificationDetails()
    .subscribe(data => {         
            this.EducationList = data;    
            this.EducationMainList = data;
            console.log(this.EducationList ,"EducationList")
        // this.Education.setValue([this.EducationList[0]]);
        this.filteredEducation.next(this.EducationList.slice()); 
        this.EducationFilter.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filterEducation();
          });

          },     
        error => {        
         });
  }
  
  getDomainDetails(){
    this.appService.getDomainDetails()
    .subscribe(data => {         
            this.DomainList = data;    
            this.DomainMainList = data;    
            console.log(this.DomainList ,"DomainList")
        // this.Domain.setValue([this.DomainList[0]]);
        this.filteredDomainList.next(this.DomainList.slice()); 
        this.DomainFilter.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filterDomain();
          });

          },     
        error => {        
         });
  }
  getAllDepartments(){
    this.appService.searchDepartment('a', false, this.customerId)
    .subscribe(data => {         
            this.DepartmentList = data;    
            this.DepartmentMainList = data;
            console.log(this.DepartmentList ,"department")
        // this.Department.setValue([this.DepartmentList[0]]);
        this.filteredDepartmentList.next(this.DepartmentList.slice()); 
        this.DepartmentFilter.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filterDepartment();
          });

          },     
        error => {        
         });
  }
  getAllClients(){
    this.cn.ClientName = 'a';
    this.cn.IsSuggested = false;
    this.appService.SearchClients(this.cn)
    .subscribe(data => {         
            this.ClientList = data;    
            this.ClientMainList = data;    
            console.log(this.ClientList ,"filteredClientList")
        // this.Client.setValue([this.ClientList[0]]);
        this.filteredClientList.next(this.ClientList.slice()); 
        this.ClientFilter.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filterClient();
          });

          },     
        error => {        
         });
  }
  ngOnInit() {
    this.getQualificationDetails();
    this.getAllJobTitle();
    this.getAllClients();
    this.getAllDepartments();
    this.GetJobCategory();
    this.getDomainDetails();
    this.GetImmigrationStatus();
    this.getAllSkills();
    // this.getAllCity("a");

    this.appService.getCities("a")
    .subscribe(data => {         
            this.cities =data;    
            this.CityMainList =data;
             // set initial selection
        // this.bankMultiCtrl.setValue([this.cities[0]]);

        // load the initial bank list
        this.filteredBanksMulti.next(this.cities.slice());
    
        // listen for search field value changes
        this.bankMultiFilterCtrl.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filterBanksMulti();
          });

          },     
        error => {        
         });

         this.empFilter.valueChanges
         .pipe(takeUntil(this._onDestroy))
         .subscribe(() => {
           this.filterEmpType();
         });

      //  var ClientList = this.appService.GetCustomerClients()
    this.ClearAll();
    $('#searchStr').val('');
    this.GetEmployementType();
    this.getExpYears();
    this.populateCities();
    this.getSkills();
  }

}

export interface State {
  id:number;
  flag: string;
  name: string;
  population: string;
}
export class dept
{
  DepartmentName: string;
  IsSuggested: boolean;
}

export class client
{
  ClientName: string;
  IsSuggested: boolean;
}

// export class Cities {
//   public CityId: number;
//   public CityName: string;
//   }

  export class Jobskills {
    public SkillName: string;
    public SkillType: boolean;
    public MinimumExp: number;
    public MaximumExp: number;
  }