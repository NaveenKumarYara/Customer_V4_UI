import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ManageJobService } from '../../managejobs.service';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-manage-advance-search',
  templateUrl: './advance-search.component.html',
  styleUrls: ['./advance-search.component.css']
})
export class AdvanceSearchComponent implements OnInit {
 

  constructor(private route: ActivatedRoute,
    private router: Router, private managejobservice: ManageJobService ) { }

  ngOnInit() {

  }

}
