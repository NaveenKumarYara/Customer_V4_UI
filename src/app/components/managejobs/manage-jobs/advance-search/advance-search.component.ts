import { Component, OnInit,  Input, ViewChild  } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ManageJobService } from '../../managejobs.service';
import { AppService } from '../../../../app.service';
import {  ParentComponentApi } from '../load-joblist/load-joblist.component';
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
  advancesearch:any;
  showadvancesearch = false;
  empolymentId:any;
  searchString:any;
  SearchList: any = [];
  expYears: any = [];
  employmentList: any = [];
  @Input() parentApi: ParentComponentApi;

  constructor(private route: ActivatedRoute,
    private router: Router, private managejobservice: ManageJobService,private appService: AppService) {
      this.customer = JSON.parse(sessionStorage.getItem('userData'));
      this.customerId = this.customer.CustomerId;
      this.userId = this.customer.UserId;
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

  SetSearch(val,str)
  {
    this.searchString = str;
    this.SearchList = [];
    this.location = val;
  }


  all()
  {
    this.parentApi.callFilterMethod(0,0,0);
  }

  apply()
  {
    this.parentApi.callFilterMethod(this.empolymentId,this.exp,this.location);
    this.managejobservice.ShowadvanceSearch.subscribe(x => this.showadvancesearch = x);
  }

  changeExperience(exp) {
    this.exp= exp;
  }
  changeJobType(empolyment) {
    this.empolymentId= empolyment;
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
    $('#searchStr').val('');
    this.GetEmployementType();
    this.getExpYears();
  }

}
