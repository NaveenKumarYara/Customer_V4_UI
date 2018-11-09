import { Component, OnInit } from '@angular/core';
import { ManageJobService } from '../managejobs.service';
@Component({
  selector: 'app-manage-jobs',
  templateUrl: './manage-jobs.component.html',
  styleUrls: ['./manage-jobs.component.css']
})
export class ManageJobsComponent implements OnInit {

  constructor(private managejobservice: ManageJobService) { }

  ngOnInit() {
    this.managejobservice.updateJobListCount(6);
  }

}
