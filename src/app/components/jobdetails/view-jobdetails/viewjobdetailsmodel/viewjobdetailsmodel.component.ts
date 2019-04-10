import { Component, Inject,OnInit,Input,ViewChild} from '@angular/core';
import { JobdetailsService } from '../../jobdetails.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { GetJobDetailCustomer } from '../../../../../models/GetJobDetailCustomer';
import { JobComments } from '../../models/JobComments';
import { GetCompanyBenefit } from '../../../../../models/GetCompanyBenefit';
import {deactivate} from '../../../managejobs/models/deactivate';
import { AppService } from '../../../../app.service';
import {ViewJobdetailsComponent} from '../../view-jobdetails/view-jobdetails.component';
import { animation } from '@angular/core/src/animation/dsl';
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
  customerId:any;
  userId:any;
 jobid: number;
 deactivate = new deactivate();
 getcompanybenfit: GetCompanyBenefit[];
  jobdetailscustomer: GetJobDetailCustomer;
  jobComments : JobComments[];
  constructor(private router: Router, private appService: AppService,private jobdetailsservice: JobdetailsService,@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.customerId = JSON.parse(sessionStorage.getItem('customerId'));
    this.jobid = JSON.parse(sessionStorage.getItem('viewJobJobId'));
   }
  PopulateJobdetail (customerId,jobid) {
    return this.jobdetailsservice.getJobDetailCustomer(this.customerId,this.jobid).subscribe(res => {
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
      //this.load.populateJobsBasicInfo(this.deactivate.customerId, this.deactivate.jobId);
  },
    error => console.log(error));
}
populateCompanyBenfits(customerId) {
  return this.jobdetailsservice.getCompanyBenfits(this.customerId).subscribe(res => {
      this.getcompanybenfit = res;
  });
}
ngOnInit() {
  this.PopulateJobdetail(this.customerId,this.jobid);
  this.PopulateJobComments(this.jobid);
  this.populateCompanyBenfits(this.customerId);
  //console.log('abc');

  /*tabs animation*/
  (function ($) {
    function navLineResizeHandler() {
      var nav = $('.nav-tabs');
      var activeLink = nav.children('li.active');
      var activeLine = nav.children('.active-line');
      var windowWidth = $(window).scrollLeft();
  
      $.each(activeLine, function (index, element) {
        var $element = $(element);
        $element.css({
          width: $element.parent().children('.active').css("width"),
          left: $element.parent().children('.active').position().left - windowWidth
        });
      });
    }

    function navLineClickHandler() {
      let btnWidth = $(this).css("width");
      let line = $(this).parent().find(".active-line");
      let btnBox = this.getBoundingClientRect();
      let windowBox = this.parentNode.getBoundingClientRect();

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
