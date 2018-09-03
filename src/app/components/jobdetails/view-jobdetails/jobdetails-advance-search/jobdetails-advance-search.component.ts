import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { JobdetailsService } from '../../jobdetails.service';

@Component({
  selector: 'app-jobdetails-advance-search',
  templateUrl: './jobdetails-advance-search.component.html',
  styleUrls: ['./jobdetails-advance-search.component.css']
})
export class JobdetailsAdvanceSearchComponent implements OnInit {

  constructor(private jobdetailsservice: JobdetailsService) { }
  updateDetailAdvanceSearch() {
    this.jobdetailsservice.updateDetailsAdvanceSearch(false);
  }

  ngOnInit() {
  }

}
