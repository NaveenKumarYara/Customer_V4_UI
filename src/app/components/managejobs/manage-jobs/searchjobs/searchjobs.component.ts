import { Component, OnInit,  Input, ViewChild  } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ManageJobService } from '../../managejobs.service';
import { AppService } from '../../../../app.service';
import {  ParentComponentApi } from '../load-joblist/load-joblist.component';
import { IfObservable } from 'rxjs/observable/IfObservable';
declare var $: any;
@Component({
  selector: 'app-manage-searchjobs',
  templateUrl: './searchjobs.component.html',
  styleUrls: ['./searchjobs.component.css'],
  providers: [AppService]
})
export class SearchjobsComponent implements OnInit {
  customer: any;
  userId: any;
  splitVal: any = [];
  SearchList: any = [];
  customerId: any;
  searchval:any;
  searchString:any;
  @Input() parentApi: ParentComponentApi;
  constructor(private route: ActivatedRoute,
    private router: Router, private managejobservice: ManageJobService,private appService: AppService) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId = this.customer.CustomerId;
    this.userId = this.customer.UserId;
   }
   search(val)
   {
    this.searchString = val;
    this.parentApi.callSearchMethod(this.searchString); 
    this.SearchList = [];
    this.GetSearchText(null);    
   }

   GetSearchText(value) {
    return this.managejobservice.GetAutoSearch(value,this.customerId)
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

  SearchEnter(searchval)
  {
    this.SearchList = [];
    this.GetSearchText(null);    
    this.search(searchval);
  }

  SetSearch(val)
  {
    this.SearchList = [];
    this.search(val);
  }
  ngOnInit() {
  }

}
