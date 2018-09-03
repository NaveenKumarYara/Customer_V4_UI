import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { JobdetailsService } from '../../jobdetails.service';

@Component({
  selector: 'app-filter-view-jobs',
  templateUrl: './filter-view-jobs.component.html',
  styleUrls: ['./filter-view-jobs.component.css']
})
export class FilterViewJobsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router, private jobdetailsservice: JobdetailsService) { }


  showdetailssearch = false;

  updateDetailAdvanceSearch() {
    this.showdetailssearch = !this.showdetailssearch;
    this.jobdetailsservice.updateDetailsAdvanceSearch(this.showdetailssearch);
  }

  ngOnInit() {
    

  }

}
