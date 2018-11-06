import { Component, OnInit,  Input, ViewChild  } from '@angular/core';
import { JobDetails } from '../../models/jobdetails';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Jobs } from '../../models/jobs';
import { ManageJobService } from '../../managejobs.service';
// import { ApiService } from '../../../../shared/services/api.service/api.service';
import {deactivate} from '../../models/deactivate';
import {LoadJoblistComponent} from '../load-joblist/load-joblist.component';
import { AppService } from '../../../../app.service';

declare var $: any;


@Component({
  selector: 'app-manage-joblist-gridlayout',
  templateUrl: './joblist-gridlayout.component.html',
  styleUrls: ['./joblist-gridlayout.component.css'],
  providers: [AppService]
})
export class JoblistGridlayoutComponent implements OnInit {
  @Input() job: Jobs;
  @Input() index: number;
  @Input() joblist: JobDetails[];
  jobId: any;
  customer: any;
  userId: any;
  jobData: any;
  customerId: any;
  isActive: any;
  deactivate = new deactivate();

  constructor(private route: ActivatedRoute,
    private router: Router, private managejobservice: ManageJobService, private appService: AppService, private loadJobs: LoadJoblistComponent) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId = this.customer.CustomerId;
    this.userId = this.customer.UserId;
   }

  ngOnInit() {
    this.GetProfileCount();
  }

  editJob(jobId) {
    this.router.navigate(['/app-createajob/', {jobId} ]);

    this.router.navigate(['/app-createajob/app-steps-step1/', {jobId} ]);


    // this.router.navigateByUrl('/app-createajob/app-steps-step1/id='+ jobId);
   // [routerLink]="['/app-createajob/app-steps-step1/',job.JobId]"
  }

  ViewJobdetails(customerId, userId, jobId) {
    sessionStorage.setItem('customerId', JSON.stringify(customerId));
    sessionStorage.setItem('userId', JSON.stringify(userId));
    sessionStorage.setItem('jobId', JSON.stringify(jobId));
    this.router.navigateByUrl('app-view-jobdetails');
  }

  GetProfileCount() {
    this.jobId = this.job.JobId;
    return this.managejobservice.getJobCount(this.jobId, this.customerId).subscribe(res => {
     this.jobData = res;
   });
  }

  changeJobStatus(job, val) {
    if (val === true) {
     $('#Inactive').replaceWith('#Active');

    } else if (val === false) {
      $('#Active').replaceWith('#Inactive');
    }
    this.deactivate.jobId = job;
    this.deactivate.customerId = this.customerId;
    this.deactivate.isActive = val;
      this.appService.deactivateJob(this.deactivate)
      .subscribe(
      data => {
      this.loadJobs.populateJoblist(this.customerId, this.userId);
    },
      error => console.log(error));
}

}


