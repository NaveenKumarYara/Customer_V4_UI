import { Component, OnInit } from '@angular/core';
import { ManageJobService } from '../managejobs.service';
@Component({
  selector: 'app-manage-jobs',
  templateUrl: './manage-jobs.component.html',
  styleUrls: ['./manage-jobs.component.css']
})
export class ManageJobsComponent implements OnInit {

  constructor(private managejobservice: ManageJobService) { }
  showsearch: boolean = false;
  ngOnInit() {
    this.managejobservice.updateJobListCount(6);
    this.managejobservice.updateAdvanceSearch(this.showsearch);
  }

}
