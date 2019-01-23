import { Component, OnInit,  Input, ViewChild  } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ManageJobService } from '../../managejobs.service';
import { AppService } from '../../../../app.service';
import {  ParentComponentApi } from '../load-joblist/load-joblist.component';
@Component({
  selector: 'app-manage-searchjobs',
  templateUrl: './searchjobs.component.html',
  styleUrls: ['./searchjobs.component.css'],
  providers: [AppService]
})
export class SearchjobsComponent implements OnInit {
  customer: any;
  userId: any;
  customerId: any;
  searchString:any;
  @Input() parentApi: ParentComponentApi;
  constructor(private route: ActivatedRoute,
    private router: Router, private managejobservice: ManageJobService,private appService: AppService) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId = this.customer.CustomerId;
    this.userId = this.customer.UserId;
   }
   search()
   {
     this.parentApi.callSearchMethod(this.searchString);
   }

  ngOnInit() {
  }

}
