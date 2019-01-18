import { Component, OnInit, ViewContainerRef, ViewChild  } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JobdetailsService } from '../../jobdetails/jobdetails.service';
// import { Observable, Subject } from 'rxjs';
import { ViewjobdetailsmodelComponent } from './viewjobdetailsmodel/viewjobdetailsmodel.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { filter } from 'rxjs/operators';
import { JobdetailsBasicInfo } from '../models/jobdetailsbasicinfo';
import {deactivate} from '../../managejobs/models/deactivate';
import { Jobstatistics } from '../models/jobstatistics';
import { UploadProfilesComponent } from './upload-profiles/upload-profiles.component';
// import { UploadCandidatesComponent } from './upload-candidates/upload-candidates.component';
import { JobdetailsProfile } from '../models/jobdetailsprofile';
import { SharedialogComponent } from './viewjobdetails-candidate-profile/sharedialog/sharedialog.component';
import { ConversationComponent } from './viewjobdetails-candidate-profile/conversations/conversation.component';
import { AppService } from '../../../app.service';
import { AlertService } from '../../../shared/alerts/alerts.service';
import {FilterViewJobsComponent} from '../view-jobdetails/filter-view-jobs/filter-view-jobs.component';
// tslint:disable-next-line:max-line-length
import {ViewjobdetailsCandidateProfileComponent} from '../view-jobdetails/viewjobdetails-candidate-profile/viewjobdetails-candidate-profile.component';
// import * as $ from 'jquery';
// import 'owl.carousel';
declare var $: any;


@Component({
  selector: 'app-view-jobdetails',
  templateUrl: './view-jobdetails.component.html',
  styleUrls: ['./view-jobdetails.component.css'],
  providers: [AppService, AlertService]
})
export class ViewJobdetailsComponent implements OnInit {
@ViewChild(ViewjobdetailsCandidateProfileComponent ) child: ViewjobdetailsCandidateProfileComponent;
@ViewChild(FilterViewJobsComponent) base: FilterViewJobsComponent;
  viewdetailsdialogueref: MatDialogRef<ViewjobdetailsmodelComponent>;
  viewshareddialogueref: MatDialogRef<ConversationComponent>;
  jobdetailsbasicinfo: JobdetailsBasicInfo;
  joblocation: any;
  jobstatistics: Jobstatistics;
  statistics: number;
  closedjob:any;
  customerId: any;
  userId: any;
  jobid: any;
  viewJobJobId: any;
  statusid = 4;
  sortBy = 1;
  loadMore = false;
  // loadMoreStat:number;
  profileLoader = false;
  uploadProfile = 0;
  fileUploadForm: FormGroup;
  jobdetailsprofiles: JobdetailsProfile[] = [];
  profilecount: number;
  // showVar:  = true;
  // readChild: any;
  deactivate = new deactivate();
  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService, private jobdetailsservice: JobdetailsService,
    private dialog: MatDialog, private fb: FormBuilder, private alertService: AlertService
   ) {
    this.customerId = JSON.parse(sessionStorage.getItem('customerId'));
    this.userId = JSON.parse(sessionStorage.getItem('userId'));
    this.jobid = JSON.parse(sessionStorage.getItem('jobId'));
    this.statusid = JSON.parse(sessionStorage.getItem('statusid')) === null ? 4 : JSON.parse(sessionStorage.getItem('statusid'));

   }
  showDetailadvancesearch = false;
  openDialog() {
    const abc = {
      'animal': 'panda',
      'JobId' : this.jobid
    };
    const dialogRef = this.dialog.open(ViewjobdetailsmodelComponent,
      {
        width: '1000px',
        position: {right : '0px'},
        height : '750px',
        data: abc,
        // closeOnNavigation:false,
        // disableClose:true
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result: ${result}');
    });
  }
  OpenDialog() {
    const dialogRef = this.dialog.open(ConversationComponent,
      {
        // width: '1000px',
        // position: {right : '0px'},
        // height : '750px',
        data: {
          animal: 'panda'
        }
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      console.log('share Dialog result: ${result}');
    });
  }
  openCandidate() {
    this.alertService.error('Job is Inactive Please activate to Upload the Profiles');
    setTimeout(() => {
      this.alertService.clear();
    }, 2000);
  }
  openCandidateUploadDialog() {
    if(this.closedjob === 2)
    {
    this.alertService.error('Job is Closed');
    setTimeout(() => {
      this.alertService.clear();
    }, 2000);
  }
  else{
    const abc = {
      'animal': 'panda',
       'JobId' : this.jobid
    };
    const dialogRef = this.dialog.open(UploadProfilesComponent,
      {
        width: '750px',
        position: {right : '0px'},
        height : '750px',
        data: abc,
        // closeOnNavigation:false,
        // disableClose:true
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      this.populateJobsStaticInfo(this.jobid, 1);
      // this.updateappliedstatus();
      console.log('Dialog result: ${result}');
    });
  }
  }

  // toggleChild() {
  //   this.showVar = !this.showVar;
  //    }
  ViewJobdetailsModel(customerId, viewJobJobId) {
    sessionStorage.setItem('customerId', JSON.stringify(customerId));
    sessionStorage.setItem('viewJobJobId', JSON.stringify(viewJobJobId));
    this.dialog.open(ViewjobdetailsmodelComponent,
      {
        width: '1000px',
        position: {right : '0px'},
        height : '750px',
        // closeOnNavigation:false,
        // disableClose:true
      }
    );

  }
  updateallcandidatesstatus() {
    this.base.ViewBy = 1;
    this.sortBy =1;
    this.statusid = 0;
    this.profilecount = 6;
    if (this.jobstatistics.AllCandidates > 0) {
    this.child.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, this.statusid, this.jobstatistics.AllCandidates,
      this.sortBy, 6);
    this.loadMore =  this.jobstatistics.AllCandidates > 6 ? true : false;
  } else {
   this.loadMore = false;
   this.child.NoRecords();
  }
  }
  updatesuggestedstatus() { // what is the status id for suggested why api looks differe from others
    this.base.ViewBy = 1; 
    this.sortBy =1;
    this.statusid = 15;
    // this.loadMoreStat=this.statusid;
    this.profilecount = 6;
    // this.PopulateJobdetailProfiles();
    if (this.jobstatistics.Suggested > 0) {
    this.child.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, this.statusid, this.jobstatistics.Suggested,
      this.sortBy, 6);
    this.loadMore = this.jobstatistics.Suggested > 6 ? true : false;
  } else {
    // this.child.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, this.statusid, this.jobstatistics.Suggested,
    //   this.sortBy, 6);
   this.loadMore = false;
   this.child.NoRecords();
  }
  }
  updateappliedstatus() {// 1000080;
    this.base.ViewBy = 1;
    this.sortBy =1;
    this.statusid = 4;
   // this.loadMoreStat=this.statusid;
   this.profilecount = 6;
    // console.log(this.statusid);
    // this.PopulateJobdetailProfiles();
    // console.log(this.jobid);
    if (this.jobstatistics.Applied > 0) {
    this.child.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, this.statusid, this.jobstatistics.Applied,
      this.sortBy, 6);
      this.loadMore =  this.jobstatistics.Applied > 6 ? true : false;
   } else {
    this.loadMore = false;
    this.child.NoRecords();
   }
  }
  updateshortlistedstatus() { // 1000007;
    this.sortBy =1;
    this.base.ViewBy = 1; 
    this.statusid = 5;
   // this.loadMoreStat=this.statusid;
   this.profilecount = 6;
     if (this.jobstatistics.ShortListed > 0) {
    this.child.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, this.statusid, this.jobstatistics.ShortListed,
      this.sortBy, 6);
    this.loadMore =  this.jobstatistics.ShortListed > 6 ? true : false;

   } else {
    this.loadMore = false;
    this.child.NoRecords();
   }
  }
  updatescreeningstatus() { // 1000007;
    this.base.ViewBy = 1;
    this.sortBy =1; 
    this.statusid = 8;
  //  this.loadMoreStat=this.statusid;
  this.profilecount = 6;
  if (this.jobstatistics.Screening > 0) {
    this.child.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, this.statusid, this.jobstatistics.Screening,
      this.sortBy, 6);
    this.loadMore =  this.jobstatistics.Interviewed > 6 ? true : false;
  } else {
   this.loadMore = false;
   this.child.NoRecords();
  }
  }
  updateinterviewedstatus() { // 1000007;
    this.base.ViewBy = 1;
    this.sortBy =1; 
    this.statusid = 7;
  //  this.loadMoreStat=this.statusid;
  this.profilecount = 6;
  if (this.jobstatistics.Interviewed > 0) {
    this.child.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, this.statusid, this.jobstatistics.Interviewed,
      this.sortBy, 6);
    this.loadMore =  this.jobstatistics.Interviewed > 6 ? true : false;

  } else {
   this.loadMore = false;
   this.child.NoRecords();
  }
  }
  updatehiredstatus() { // 1000028;
    this.base.ViewBy = 1;
    this.sortBy =1;
    this.statusid = 11;
   // this.loadMoreStat=this.statusid;
   this.profilecount = 6;
   if (this.jobstatistics.Hired > 0) {
    this.child.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, this.statusid, this.jobstatistics.Hired,
      this.sortBy, 6);
    this.loadMore =  this.jobstatistics.Hired > 6 ? true : false;
  } else {
   this.loadMore = false;
   this.child.NoRecords();
  }
  }
  updaterejectedstatus() {
    this.base.ViewBy = 1;
    this.sortBy =1;
    this.statusid = 6;
    // this.loadMoreStat=this.statusid;
    this.profilecount = 6;
    if (this.jobstatistics.RejectedORWithdrawn > 0) {
    this.child.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, this.statusid, this.jobstatistics.RejectedORWithdrawn,
       this.sortBy, 6);
    this.loadMore =  this.jobstatistics.RejectedORWithdrawn > 6 ? true : false;
  } else {
   this.loadMore = false;
   this.child.NoRecords();
  }
   }
   updateProfileCount() {
    // if (this.statusid === this.loadMoreStat) {
    this.profilecount += 6;
    // } else {
    //  this.profilecount = 0;
    //  this.profilecount += 6;
    // }
    if (this.statusid === 4) {
      // this.statistics=this.jobstatistics.Applied;
      this.statistics = this.jobstatistics.Applied;
     }   else if (this.statusid === 5) {
      this.statistics = this.jobstatistics.ShortListed;
     } else if (this.statusid === 7) {
      this.statistics = this.jobstatistics.Interviewed;
     } else if (this.statusid === 11) {
      this.statistics = this.jobstatistics.Hired;
     } else if (this.statusid === 6) {
      this.statistics = this.jobstatistics.RejectedORWithdrawn;
    } else if (this.statusid === 15) {
      this.statistics = this.jobstatistics.Suggested; }
    this.profileLoader = true;
    this.jobdetailsservice.updateprofileCount(this.profilecount);
    this.child.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, this.statusid, this.statistics,
       this.sortBy, this.profilecount);
    this.loader();
   }
   loader() {
      this.profileLoader = false;
   }

   updateLoadMore() {
     this.loadMore = false;
   }
  populateJobsBasicInfo(customerId, jobid) {
    return this.jobdetailsservice.getJobDetailsBasicInfo(this.customerId, this.jobid).subscribe(res => {
      this.jobdetailsbasicinfo = res,
      this.closedjob=this.jobdetailsbasicinfo.IsOpen;
        this.joblocation = res.JobLocations[0].CityName + ', ' + res.JobLocations[0].StateCode;
    });
  }

  populateJobsStaticInfo(jobid, onload?) {
    return this.jobdetailsservice.getJobDetailsStatisticsInfo(this.jobid).subscribe(res => {
      this.jobstatistics = res;
      if (onload === 1) {
        this.updateappliedstatus();
      }
    });
  }
  // PopulateJobdetailProfiles() {
  //   return this.jobdetailsservice.getJobDetailsProfileInfo(this.jobid, this.statusid).subscribe(res => {
  //     this.jobdetailsprofiles = res;
  //   });
  // }
  updateStatistics(value: any) {
    this.populateJobsStaticInfo(this.jobid);
    if (value === 'max' || value === 'min') {
      this.loadMore = false;
    }  else { // if (value === true) {
    this.child.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, this.statusid,
      this.jobstatistics.Applied, 1,  this.profilecount);
   }
  }
  changeJobStatus(job, val) {
    // debugger
    if (val === true) {
     $('#Inactive').replaceWith('#Active');

    } else if (val === false) {
      $('#Active').replaceWith('#Inactive');
    }
    this.deactivate.jobId = job.JobId;
    this.deactivate.customerId = job.CustomerId;
    this.deactivate.isActive = val;
      this.appService.deactivateJob(this.deactivate)
      .subscribe(
      data => {
       // alert("success")
        this.populateJobsBasicInfo(this.deactivate.customerId, this.deactivate.jobId);
        this.populateJobsStaticInfo(this.deactivate.jobId, 1);
    },
      error => console.log(error));
}
  ngOnInit() {
     // this.loadMoreStat=0;
    this.jobdetailsservice.currentProfilecount.subscribe(x => this.profilecount = x);
    this.jobdetailsservice.ShowDetailsadvanceSearch.subscribe(x => this.showDetailadvancesearch = x);
    this.populateJobsBasicInfo(this.customerId, this.jobid);
    this.populateJobsStaticInfo(this.jobid, 1);
    // this.updateappliedstatus();
    this.fileUploadForm = this.fb.group({
      'userId': [5, Validators.required],
      'Url': ['', Validators.nullValidator],
      'FileName': ['', Validators.nullValidator],
      'UserName': ['', Validators.nullValidator],
      'ResumeFile': ['', Validators.compose([Validators.required])],
      'FileExtension': ['', Validators.nullValidator],
      'JobId': [ this.jobid, Validators.nullValidator]
    });
  }
  // ngAfterViewInit() {
  //   this.readChild = this.child.childToViewjobdetails;
  //   if (this.readChild === 1) {
  //     this.populateJobsStaticInfo(this.jobid);
  //    }
  // }
  getParentApi(): ParentComponentApi {
    return {
      callParentMethod: (sortBy) => {
        this.sortBy = sortBy;
        if (this.statusid === 4) {
          // this.statistics=this.jobstatistics.Applied;
          this.statistics = this.jobstatistics.Applied;
         }   else if (this.statusid === 5) {
          this.statistics = this.jobstatistics.ShortListed;
         } else if (this.statusid === 7) {
          this.statistics = this.jobstatistics.Interviewed;
         } else if (this.statusid === 11) {
          this.statistics = this.jobstatistics.Hired;
         } else if (this.statusid === 6) {
          this.statistics = this.jobstatistics.RejectedORWithdrawn;
        } else if (this.statusid === 15) {
          this.statistics = this.jobstatistics.Suggested; }
          this.loadMore = this.statistics > 6 ? true : false;
       // this.parentMethod(name);
        this.child.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, this.statusid, this.statistics, this.sortBy, 6);
      }
    };
  }

}
export interface ParentComponentApi {
  callParentMethod: (number) => void;
}
