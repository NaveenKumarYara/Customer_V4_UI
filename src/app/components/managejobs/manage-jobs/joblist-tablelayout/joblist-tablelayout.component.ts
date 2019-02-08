import { Component, OnInit,  Input, ViewChild  } from '@angular/core';
import { JobDetails } from '../../models/jobdetails';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Jobs } from '../../models/jobs';
import { ManageJobService } from '../../managejobs.service';
// import { ApiService } from '../../../../shared/services/api.service/api.service';
import {deactivate} from '../../models/deactivate';
import {LoadJoblistComponent} from '../load-joblist/load-joblist.component';
import { AppService } from '../../../../app.service';
import { AlertService } from '../../../../shared/alerts/alerts.service';
declare var $: any;

@Component({
  selector: 'app-manage-joblist-tablelayout',
  templateUrl: './joblist-tablelayout.component.html',
  styleUrls: ['./joblist-tablelayout.component.css'],
  providers: [AppService,AlertService]
})
export class JoblistTablelayoutComponent implements OnInit {

  @Input() job: Jobs;
  @Input() index: number;
  @Input() joblist: JobDetails;
  jobId:any;
  customer:any;
  complete:any;
  userId:any;
  jobData:any;
  customerId:any;
  isActive:any;
  deactivate = new deactivate();
  constructor(private route: ActivatedRoute,
    private router: Router, private managejobservice: ManageJobService,private appService: AppService, private loadJobs :LoadJoblistComponent,private alertService : AlertService) { 
      this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId = this.customer.CustomerId;
    this.userId = this.customer.UserId;
    }

  ngOnInit() {
    this.GetProfileCount();
  }
  ViewJobdetails(customerId,userId,jobId)
  {
    sessionStorage.setItem('customerId', JSON.stringify(customerId));
    sessionStorage.setItem('userId', JSON.stringify(userId));
    sessionStorage.setItem('jobId', JSON.stringify(jobId));
    this.router.navigateByUrl('app-view-jobdetails');
  }
  changeJobStatus(job,val) {
    this.alertService.clear();
    var search = '';
    this.deactivate.jobId = job.JobId;
    this.deactivate.customerId = this.customerId;
    this.deactivate.isActive = val;  
      this.appService.deactivateJob(this.deactivate)
      .subscribe(
      data => {
      this.loadJobs.populateJoblist(this.customerId, this.userId,search);
    },
      error => console.log(error));
}
editJob(jobId,active) {
  if(active == false )
  {
    this.alertService.error('Inactive Job Please Activate to Edit');
  }
  else
  {
    this.complete = 4;
    this.router.navigate(['/app-createajob/', {jobId} ]);
    localStorage.setItem('completed', JSON.stringify(this.complete));

    this.router.navigate(['/app-createajob/app-steps-step1/', {jobId} ]);
  }

    // this.router.navigateByUrl('/app-createajob/app-steps-step1/id='+ jobId);
 // [routerLink]="['/app-createajob/app-steps-step1/',job.JobId]"
}
  GetProfileCount()
  {
    this.jobId = this.job.JobId;
    return this.managejobservice.getJobCount(this.jobId,this.customerId).subscribe(res => {
     this.jobData = res;
   });
  }
}
