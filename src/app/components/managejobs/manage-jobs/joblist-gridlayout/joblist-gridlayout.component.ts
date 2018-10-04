import { Component, OnInit,  Input } from '@angular/core';
import { JobDetails } from '../../models/jobdetails';
import { Jobs } from '../../models/jobs';
import { ManageJobService } from '../../managejobs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-joblist-gridlayout',
  templateUrl: './joblist-gridlayout.component.html',
  styleUrls: ['./joblist-gridlayout.component.css']
})
export class JoblistGridlayoutComponent implements OnInit {

  @Input() job: Jobs;
  @Input() index: number;
  @Input() joblist: JobDetails;
 

  constructor(private managejobservice: ManageJobService, private router: Router) { }

  ngOnInit() {
   

  }
  ViewJobdetails(customerId,userId,jobId)
  {
    sessionStorage.setItem('customerId', JSON.stringify(customerId));
    sessionStorage.setItem('userId', JSON.stringify(userId));
    sessionStorage.setItem('jobId', JSON.stringify(jobId));
    this.router.navigateByUrl('app-view-jobdetails');
  }
}
