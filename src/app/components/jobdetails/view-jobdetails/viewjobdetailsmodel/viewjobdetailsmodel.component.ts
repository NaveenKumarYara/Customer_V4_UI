import { Component, Inject, OnInit, Input, ViewChild, ViewContainerRef} from '@angular/core';
import { JobdetailsService } from '../../jobdetails.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GetJobDetailCustomer } from '../../../../../models/GetJobDetailCustomer';
import { JobComments } from '../../models/JobComments';
import { GetCompanyBenefit } from '../../../../../models/GetCompanyBenefit';
import {deactivate} from '../../../managejobs/models/deactivate';
import { AppService } from '../../../../app.service';
import {ShareJobComponent} from '../share-job/sharejob.component';
import {ViewJobdetailsComponent} from '../../view-jobdetails/view-jobdetails.component';
import { animation } from '@angular/core/src/animation/dsl';
import { ToastsManager } from 'ng2-toastr';
declare var $: any;
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-viewjobdetailsmodel',
  templateUrl: './viewjobdetailsmodel.component.html',
  styleUrls: ['./viewjobdetailsmodel.component.css'],
  providers: [AppService]
})
export class ViewjobdetailsmodelComponent  implements OnInit {
  // @Input() jobid: number;
  viewshareddialogueref: MatDialogRef<ShareJobComponent>;
  complete: any;
  customerId: any;
  userId: any;
 jobid: number;
 deactivate = new deactivate();
 getcompanybenfit: GetCompanyBenefit[];
  jobdetailscustomer: GetJobDetailCustomer;
  jobComments: JobComments[];
  constructor(private dialog: MatDialog ,private toastr: ToastsManager, private _vcr: ViewContainerRef, private router: Router, private appService: AppService, private jobdetailsservice: JobdetailsService, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.customerId = JSON.parse(sessionStorage.getItem('customerId'));
    this.jobid = JSON.parse(sessionStorage.getItem('viewJobJobId'));
   }


   OpenShareJobDialog() {
    const sharedRef = this.dialog.open(ShareJobComponent,
      {
         // width: '1000px',
         position: {right : '0px'},
        // height : '750px',
        data: {
          animal: 'panda',
          JobId: this.jobid

        }
      }
    );
    sharedRef.afterClosed().subscribe(result => {
      console.log('share Dialog result: ${result}');
    });
  }
  


  PopulateJobdetail (customerId, jobid) {
    return this.jobdetailsservice.getJobDetailCustomer(this.customerId, this.jobid).subscribe(res => {
      this.jobdetailscustomer = res;
    });

}
PopulateJobComments (jobid) {
  return this.jobdetailsservice.getJobDetailsComments(this.jobid).subscribe(res => {
    this.jobComments = res;
  });

}
changeJobStat(job, val) {
  if (val === true) {
   $('#InactiveJob').replaceWith('#ActiveJob');

  } else if (val === false) {
    $('#ActiveJob').replaceWith('#InactiveJob');
  }
  this.deactivate.jobId = job.JobInfo.JobId;
  this.deactivate.customerId = job.JobInfo.CustomerId;
  this.deactivate.isActive = val;
    this.appService.deactivateJob(this.deactivate)
    .subscribe(
    data => {
      this.PopulateJobdetail(this.deactivate.customerId, this.deactivate.jobId);
      // this.load.populateJobsBasicInfo(this.deactivate.customerId, this.deactivate.jobId);
  },
    error => console.log(error));
}
populateCompanyBenfits(customerId) {
  return this.jobdetailsservice.getCompanyBenfits(this.customerId).subscribe(res => {
      this.getcompanybenfit = res;
  });
}
editJob(jobId, active) {
  if (active === false ) {
  this.toastr.error('Inactive Job Please Activate to Edit!', 'Oops!');
  setTimeout(() => {
      this.toastr.dismissToast;
  }, 3000);
  } else {
    this.complete = 4;
    this.router.navigate(['/app-createajob/', {jobId} ]);
    localStorage.setItem('completed', JSON.stringify(this.complete));
    localStorage.setItem('EditViewJob', 'yes');
    this.router.navigate(['/app-createajob/app-steps-step1/', {jobId} ]);
  }

    // this.router.navigateByUrl('/app-createajob/app-steps-step1/id='+ jobId);
 // [routerLink]="['/app-createajob/app-steps-step1/',job.JobId]"
}

ngOnInit() {
  this.PopulateJobdetail(this.customerId, this.jobid);
  this.PopulateJobComments(this.jobid);
  this.populateCompanyBenfits(this.customerId);
  // console.log('abc');

  /*tabs animation*/
  (function ($) {
    function navLineResizeHandler() {
      const nav = $('.nav-tabs');
      const activeLink = nav.children('li.active');
      const activeLine = nav.children('.active-line');
      const windowWidth = $(window).scrollLeft();

      $.each(activeLine, function (index, element) {
        const $element = $(element);
        $element.css({
          width: $element.parent().children('.active').css('width'),
          left: $element.parent().children('.active').position().left - windowWidth
        });
      });
    }

    function navLineClickHandler() {
      const btnWidth = $(this).css('width');
      const line = $(this).parent().find('.active-line');
      const btnBox = this.getBoundingClientRect();
      const windowBox = this.parentNode.getBoundingClientRect();

      line.css({
        width: btnWidth,
        left: btnBox.left - windowBox.left
      });
    }

    $(document).ready(navLineResizeHandler);

    $(window).resize(function () {
      setTimeout(navLineResizeHandler, 1000);
    });

    const appliedTabBtn = $('.modal-body .nav-tabs li');
    const appliedLine = $('.modal-body .nav-tabs .active-line');
    appliedTabBtn.on('click', navLineClickHandler);


  })($);


}
}
