import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { JobdetailsService } from '../../jobdetails.service';
import { ParentComponentApi } from '../view-jobdetails.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SortbyInProfiles } from '../../models/SortbyInProfiles';
declare var $: any;
// import { ViewjobdetailsCandidateProfileComponent } from '../viewjobdetails-candidate-profile/viewjobdetails-candidate-profile.component';

@Component({
  selector: 'app-filter-view-jobs',
  templateUrl: './filter-view-jobs.component.html',
  styleUrls: ['./filter-view-jobs.component.css'],
 // providers: [ViewjobdetailsCandidateProfileComponent]
})
export class FilterViewJobsComponent implements OnInit {
  ViewBy: number ;
  searchString: any;
  SearchList: any = [];
  SearchResults: any = { Profile: [] };
  @Input() jobid: number;
  @Input() statusid: number;
  customerId: any;
  userId: any;
  sortByOrder: any;
  @Input() parentApi: ParentComponentApi;
  // selectedCountry:Country = new Country(2, 'India');
  // countries = [
  //    new Country(1, 'USA' ),
  //    new Country(2, 'India' ),
  //    new Country(3, 'Australia' ),
  //    new Country(4, 'Brazil')
  // ];

  constructor(private route: ActivatedRoute, private fb: FormBuilder,
    private router: Router, private jobdetailsservice: JobdetailsService,
   ) {
      this.customerId = JSON.parse(sessionStorage.getItem('customerId'));
      this.userId = JSON.parse(sessionStorage.getItem('userId'));
      this.ViewBy = 1;
     // this.jobid = JSON.parse(sessionStorage.getItem('jobId'));
     }


  showdetailssearch = false;

  updateDetailAdvanceSearch() {
    $('#searchStr').val('');
    this.showdetailssearch = !this.showdetailssearch;
    this.jobdetailsservice.updateDetailsAdvanceSearch(this.showdetailssearch);
  }

  search(val) {
   this.searchString = val;
   this.parentApi.callSearchMethod(this.searchString);
   this.SearchList = [];
   this.GetSearchText(null);
  }

  GetSearchText(value) {
   return this.jobdetailsservice.GetAutoSearch(value)
   .subscribe(data => {
         if (data.length > 0) {
           this.SearchList = data;
         } else {
           this.SearchList = [];
         }

         },

       error => {
         this.SearchList = [];
        });

 }
dislaySortByOptions() {
  this.jobdetailsservice.getSortByOption().subscribe(x => this.sortByOrder = x);
}
 SearchEnter(searchval) {
   this.SearchList = [];
   this.GetSearchText(null);
   this.search(searchval);
 }

 SetSearch(val) {
   this.SearchList = [];
   this.search(val);
 }
  changeViewby(sortBy) {
    // this.viewdetailscand.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, this.statusid, sortBy.target.value);
    this.parentApi.callParentMethod(sortBy);
  }
  ngOnInit() {
  this.dislaySortByOptions();
  }

}
