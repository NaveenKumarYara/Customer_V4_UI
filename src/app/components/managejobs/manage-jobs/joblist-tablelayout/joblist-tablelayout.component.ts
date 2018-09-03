import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ManageJobService } from '../../managejobs.service';
import { Subject, Observable } from 'rxjs';
import { JobDetails } from '../../models/jobdetails';

@Component({
  selector: 'app-manage-joblist-tablelayout',
  templateUrl: './joblist-tablelayout.component.html',
  styleUrls: ['./joblist-tablelayout.component.css']
})
export class JoblistTablelayoutComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router, private managejobservice: ManageJobService) { }

  ngOnInit() {
  }

}
