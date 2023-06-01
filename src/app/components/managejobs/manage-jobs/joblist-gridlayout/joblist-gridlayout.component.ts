import { Component, OnInit,  Input, ViewChild , ViewContainerRef } from '@angular/core';
import { JobDetails } from '../../models/jobdetails';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Jobs } from '../../models/jobs';
import {ShareJobComponent} from '../../../jobdetails/view-jobdetails/share-job/sharejob.component';
import { ManageJobService } from '../../managejobs.service';
// import { ApiService } from '../../../../shared/services/api.service/api.service';
import {deactivate} from '../../models/deactivate';
import {LoadJoblistComponent} from '../load-joblist/load-joblist.component';
import { AppService } from '../../../../app.service';
import { AlertService } from '../../../../shared/alerts/alerts.service';
import {GetCustomerDepartments} from '../../../../../models/GetCustomerDepartments';
import { GetCustomerClients } from '../../../../../models/GetCustomerClients';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';

declare var $: any;


@Component({
  selector: 'app-manage-joblist-gridlayout',
  templateUrl: './joblist-gridlayout.component.html',
  styleUrls: ['./joblist-gridlayout.component.css'],
  providers: [AppService, AlertService]
})
export class JoblistGridlayoutComponent implements OnInit {
  @Input() job: Jobs;
  @Input() index: number;
  @Input() joblist: JobDetails[];
  jobId: any;
  assignList:any=[];
  customer: any;
  complete:any;
  userId: any;
  clients: any;
  dept: any;
  jobData: any;
  customerId: any;
  isActive: any;
  deactivate = new deactivate();
  viewshareddialogueref: MatDialogRef<ShareJobComponent>;
  constructor( private dialog: MatDialog ,private toastr: ToastsManager,private _vcr: ViewContainerRef,private route: ActivatedRoute,
    private router: Router, private managejobservice: ManageJobService, private appService: AppService, private loadJobs: LoadJoblistComponent,private alertService : AlertService) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId = this.customer.CustomerId;
    this.userId = this.customer.UserId;
    this.toastr.setRootViewContainerRef(_vcr);
   }

  ngOnInit() {
     //this.GetProfileCount();
    // this.GetCustomerClients();
    // this.GetCustomerDepartment();
    this.GetassignedList(this.job.JobId);
  }

  GetassignedList(jobId)
  {
    return this.managejobservice.GetAssignedList(jobId).subscribe(
      data=>{
         this.assignList = data;
      }
    )
  }

  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

  OpenShareJobDialog(jobid,jobtitle) {
    const sharedRef = this.dialog.open(ShareJobComponent,
      {
        //width: '90vw',
        position: {right : '0px'},
         height : '750px',
        panelClass:'shareModalPopup',
        data: {
          animal: 'panda',
          JobId: jobid,
          JobTitle: jobtitle
        }
      }
    );
    sharedRef.afterClosed().subscribe(result => {
      console.log('share Dialog result: ${result}');
    });
  
  }

  editJob(jobId,active) {
    localStorage.removeItem('EditViewJob');
    if(active === false ) {
    this.toastr.error('Inactive Job Please Activate to Edit!', 'Oops!');
    setTimeout(() => {
        this.toastr.dismissToast;
    }, 3000);
    } else {
      this.complete = 4;
      this.router.navigate(['/app-createajob/', {jobId} ]);
      localStorage.setItem('Item', false.toString());
      localStorage.setItem('completed', JSON.stringify(this.complete));
      this.router.navigate(['/app-createajob/app-steps-step1/', {jobId} ]);
    }

      // this.router.navigateByUrl('/app-createajob/app-steps-step1/id='+ jobId);
   // [routerLink]="['/app-createajob/app-steps-step1/',job.JobId]"
  }

  ViewJobdetails(jobId) {
    $("#activeMyjob").addClass('active');
    let jobactive= true;
    localStorage.setItem('jobactive', JSON.stringify(jobactive));
    sessionStorage.setItem('jobId', JSON.stringify(jobId));
    const url = '/app-view-jobdetails';
    window.open(url, "_blank");
    //this.router.navigateByUrl('app-view-jobdetails');
  }

  ViewJobdetailsModel(jobId) {
    $("#activeMyjob").addClass('active');
    let jobactive= true;
    localStorage.setItem('jobactive', JSON.stringify(jobactive));
    sessionStorage.setItem('jobId', JSON.stringify(jobId));
    localStorage.setItem('vjobId', JSON.stringify(jobId));
    const url = '/app-view-jobdetails';
    window.open(url, "_blank");
    //this.router.navigateByUrl('app-view-jobdetails');

  }

  GetProfileCount() {
    this.jobId = this.job.JobId;
    return this.managejobservice.getSuggestedCount(this.jobId).subscribe(res => {
     this.jobData = res;
   });
  }

  // GetCustomerClients()
  // {
  //   return this.appService.GetCustomerClients(this.customerId).subscribe(res => {
  //     this.clients = res;
  //   });
  // }

  // GetCustomerDepartment()
  // {
  //   return this.appService.GetCustomerDepartments(this.customerId).subscribe(res => {
  //     this.dept = res;
  //   });
  // }

  add3Dots(string, limit) {
    const dots = '...';
    if (string.length > limit) {
      string = string.substring(0, limit) + dots;
    }
      return string;
  }

  changeJobStatus(job, val) {
    this.alertService.clear();
    const search = '';
    if (val === true) {
     $('#Inactive').replaceWith('#Active');

    } else if (val === false) {
      $('#Active').replaceWith('#Inactive');
    }
    this.deactivate.jobId = job.JobId;
    this.deactivate.customerId = this.customerId;
    this.deactivate.isActive = val;
      this.appService.deactivateJob(this.deactivate)
      .subscribe(
      data => {
      this.loadJobs.populateJoblist(this.customerId, this.userId, search);
    },
      error => console.log(error));
}

}


