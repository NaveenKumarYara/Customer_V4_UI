import { Component, OnInit,  Input, ViewChild,ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ManageJobService } from '../../managejobs.service';
import { AppService } from '../../../../app.service';
import {  ParentComponentApi } from '../load-joblist/load-joblist.component';
import { IfObservable } from 'rxjs/observable/IfObservable';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import { Subscription } from 'rxjs/Subscription';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Subject, Observable } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { concat } from 'rxjs/observable/concat';
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
  cities: Observable<Cities[]>;
selectedCityInput = new Subject<string>();
cityloading = false;
  deptName:any;
  searchString:any;
  SearchDept:any =[];
  SearchClients:any = [];
  SearchList: any = [];
  expYears: any = [];
  employmentList: any = [];
  @Input() parentApi: ParentComponentApi;

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
    return this.appService.getEmploymentType()
    .subscribe(data => {         
            this.employmentList =data;          
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
    this.cities = concat(
      of([]), // default items
      this.selectedCityInput.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => this.cityloading = true),
        switchMap(term => this.appService.getCities(term).pipe(
          catchError(() => of([])), // empty list on error
          tap(() => this.cityloading = false)
        ))
      )
    );
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
  changeJobType(empolyment) {
    this.empolymentId= empolyment;
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
  ngOnInit() {
    this.ClearAll();
    $('#searchStr').val('');
    this.GetEmployementType();
    this.getExpYears();
    this.populateCities();
    this.getSkills();
  }

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

export class Cities {
  public CityId: number;
  public CityName: string;
  }

  export class Jobskills {
    public SkillName: string;
    public SkillType: boolean;
    public MinimumExp: number;
    public MaximumExp: number;
  }