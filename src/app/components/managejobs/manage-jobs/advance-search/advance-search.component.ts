import { Component, OnInit,  Input, ViewChild,ViewContainerRef } from '@angular/core';
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
import { MatSelect } from '@angular/material';
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
  
  /** list of banks */
  protected banks: Cities[] = this.states;

  /** control for the selected bank for multi-selection */
  public emp: FormControl = new FormControl();
  public Client: FormControl = new FormControl();
  public Department: FormControl = new FormControl();
  public Domain: FormControl = new FormControl();
  public ProfileStatus: FormControl = new FormControl();
  public Skill: FormControl = new FormControl();
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
  
  
  @ViewChild('multiSelect') multiSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  
  constructor(private route: ActivatedRoute, private toastr:ToastsManager,private _vcr: ViewContainerRef,
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
      this.parentApi.callFilterMethod(this.empolymentId,this.exp,this.location,this.clientId,this.departmentId);
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
    console.log("asdasdsa");
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
  getAllSkills(){
    this.appService.getSkills("a")
    .subscribe(data => {         
            this.SkillList = data;    
            console.log(this.SkillList ,"skillllllllllllll")
             // set initial selection
        this.Skills.setValue([this.SkillList[0]]);

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
     console.log(this.immigrationstatusList ,"immigrationstatusList")

 });
 }
 GetJobCategory(){ 
    this.appService.searchJobCategory("a")
    .subscribe(data => {         
            this.CategoryList = data;    
            console.log(this.CategoryList ,"CategoryList")
        this.Skills.setValue([this.CategoryList[0]]);
        this.filteredCategoryList.next(this.CategoryList.slice()); 
        this.CategoryFilter.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filterBanksMulti();
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
            console.log(this.EducationList ,"EducationList")
        this.Education.setValue([this.EducationList[0]]);
        this.filteredEducation.next(this.EducationList.slice()); 
        this.EducationFilter.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filterBanksMulti();
          });

          },     
        error => {        
         });
  }

  ngOnInit() {
    this.getQualificationDetails();
    this.getAllJobTitle();
    this.GetJobCategory();
    this.GetImmigrationStatus();
    this.getAllSkills();
    // this.getAllCity("a");

    this.appService.getCities("a")
    .subscribe(data => {         
            this.cities =data;    
             // set initial selection
        this.bankMultiCtrl.setValue([this.cities[0]]);

        // load the initial bank list
        this.filteredBanksMulti.next(this.cities.slice());
        console.log("filteredBanksMulti",this.filteredBanksMulti);
    
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