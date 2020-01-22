import { Component, OnInit, Input,ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { JobdetailsService } from '../../jobdetails.service';
import { ParentComponentApi } from '../view-jobdetails.component';
import { AppService } from '../../../../app.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-jobdetails-advance-search',
  templateUrl: './jobdetails-advance-search.component.html',
  styleUrls: ['./jobdetails-advance-search.component.css'],
  providers:[AppService]
})
export class JobdetailsAdvanceSearchComponent implements OnInit {
  @Input() jobid: number;
  @Input() statusid: number;
  customerId: any;
  domains:any;
  location:any;
  exp:any;
  domain:any;
  searchString:any;
  SearchList: any = [];
  expYears: any = [];
  employmentList: any = [];
  userId: any;
  @Input() parentApi: ParentComponentApi;
  constructor(private route: ActivatedRoute,private fb: FormBuilder, private toastr:ToastsManager,private _vcr: ViewContainerRef,
    private router: Router, private jobdetailsservice: JobdetailsService,private appService: AppService
   ) {
      this.customerId = JSON.parse(sessionStorage.getItem('customerId'));
      this.userId = JSON.parse(sessionStorage.getItem('userId'));
      this.toastr.setRootViewContainerRef(_vcr);
     // this.jobid = JSON.parse(sessionStorage.getItem('jobId'));
     }
     public getExpYears() {
      this.expYears = [];
      for (let i = 0; i <= 50; i++) {
          this.expYears.push(i);
      }
      return this.expYears;
  }

  GetDomain()
  {
    return this.appService.getDomainDetails()
    .subscribe(data => {

            this.domains =data;      
          });
  }
     GetCity(val) {
      return this.jobdetailsservice.GetSearch(val)
      .subscribe(data => {
            if (data.length > 0) {  
              this.SearchList =data;
            }
            else {
              this.SearchList = [];
            }
          
            }, 
       
          error => { 
           });
    
    }
  
    SetSearch(val)
    {
      this.searchString = val;
      this.SearchList = [];
      this.location = val;
    }


    apply()
    {
      if(this.exp>0||this.location>0||this.domain>0)
      {
        this.parentApi.callfilterMethod(this.exp,this.location,this.domain);
        this.jobdetailsservice.updateDetailsAdvanceSearch(false);
      }
      else
      {
        this.toastr.error('Please provide valid details to apply filters!', 'Oops!');
        setTimeout(() => {
            this.toastr.dismissToast;
        }, 10000);
      }
    
    }
    
  updateDetailAdvanceSearch() {
    this.parentApi.callfilterMethod(0,'',0);
    this.jobdetailsservice.updateDetailsAdvanceSearch(false);
  }


  changeExperience(exp) {
    this.exp= exp;
  }
  changeDomain(domain) {
    this.domain= domain;
  }
  ngOnInit() {
    this.getExpYears();
    this.GetDomain();
  }
  

}
