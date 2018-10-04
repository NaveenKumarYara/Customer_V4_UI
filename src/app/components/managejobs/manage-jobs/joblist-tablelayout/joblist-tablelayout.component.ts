import { Component, OnInit,  Input} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { JobDetails } from '../../models/jobdetails';
import { Jobs } from '../../models/jobs';
import { ManageJobService } from '../../managejobs.service';

@Component({
  selector: 'app-manage-joblist-tablelayout',
  templateUrl: './joblist-tablelayout.component.html',
  styleUrls: ['./joblist-tablelayout.component.css']
})
export class JoblistTablelayoutComponent implements OnInit {

  @Input() job: Jobs;
  @Input() index: number;
  @Input() joblist: JobDetails;
 
  constructor(private route: ActivatedRoute,
    private router: Router, private managejobservice: ManageJobService) { }

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
