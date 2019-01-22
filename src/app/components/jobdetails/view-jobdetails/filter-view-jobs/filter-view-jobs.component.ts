import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { JobdetailsService } from '../../jobdetails.service';
import { ParentComponentApi } from '../view-jobdetails.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { ViewjobdetailsCandidateProfileComponent } from '../viewjobdetails-candidate-profile/viewjobdetails-candidate-profile.component';

@Component({
  selector: 'app-filter-view-jobs',
  templateUrl: './filter-view-jobs.component.html',
  styleUrls: ['./filter-view-jobs.component.css'],
 // providers: [ViewjobdetailsCandidateProfileComponent]
})
export class FilterViewJobsComponent implements OnInit {
  ViewBy: number ;
  searchstring :any;
  SearchResults: any = { Profile: [] };
  @Input() jobid: number;
  @Input() statusid: number;
  customerId: any;
  userId: any;
  @Input() parentApi: ParentComponentApi;
  constructor(private route: ActivatedRoute,private fb: FormBuilder,
    private router: Router, private jobdetailsservice: JobdetailsService,
   ) {
      this.customerId = JSON.parse(sessionStorage.getItem('customerId'));
      this.userId = JSON.parse(sessionStorage.getItem('userId'));
      this.ViewBy = 1;
     // this.jobid = JSON.parse(sessionStorage.getItem('jobId'));
     }


  showdetailssearch = false;

  updateDetailAdvanceSearch() {
    this.showdetailssearch = !this.showdetailssearch;
    this.jobdetailsservice.updateDetailsAdvanceSearch(this.showdetailssearch);
  }
  search()
  {
   this.parentApi.callSearchMethod(this.searchstring);
  }

  changeViewby(sortBy) {
    // this.viewdetailscand.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, this.statusid, sortBy.target.value);
    this.parentApi.callParentMethod(sortBy);
  }
  ngOnInit() {
  }

}
