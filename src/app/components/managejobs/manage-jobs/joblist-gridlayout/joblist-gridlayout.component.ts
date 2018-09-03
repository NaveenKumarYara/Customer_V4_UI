import { Component, OnInit,  Input } from '@angular/core';
import { JobDetails } from '../../models/jobdetails';
import { Jobs } from '../../models/jobs';
import { ManageJobService } from '../../managejobs.service';

@Component({
  selector: 'app-manage-joblist-gridlayout',
  templateUrl: './joblist-gridlayout.component.html',
  styleUrls: ['./joblist-gridlayout.component.css']
})
export class JoblistGridlayoutComponent implements OnInit {

  @Input() job: Jobs;
  @Input() index: number;
  @Input() joblist: JobDetails;
 

  constructor(private managejobservice: ManageJobService) { }

  ngOnInit() {
   

  }
}
