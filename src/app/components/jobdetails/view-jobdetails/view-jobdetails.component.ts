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
import { AppService } from '../../../app.service';
// tslint:disable-next-line:max-line-length
import {ViewjobdetailsCandidateProfileComponent} from '../view-jobdetails/viewjobdetails-candidate-profile/viewjobdetails-candidate-profile.component';
// import * as $ from 'jquery';
// import 'owl.carousel';
declare var $: any;


@Component({
  selector: 'app-view-jobdetails',
  templateUrl: './view-jobdetails.component.html',
  styleUrls: ['./view-jobdetails.component.css'],
  providers: [AppService]
})
export class ViewJobdetailsComponent implements OnInit {
@ViewChild(ViewjobdetailsCandidateProfileComponent ) child: ViewjobdetailsCandidateProfileComponent;
  viewdetailsdialogueref: MatDialogRef<ViewjobdetailsmodelComponent>;
  jobdetailsbasicinfo: JobdetailsBasicInfo;
  joblocation: any;
  jobstatistics: Jobstatistics;
  customerId: any;
  userId: any;
  jobid: any;
  viewJobJobId: any;
  statusid = 4;
  sortBy = 1;
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
    private dialog: MatDialog, private fb: FormBuilder
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
  openCandidateUploadDialog() {
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
      this.populateJobsStaticInfo(this.jobid);
      this.updateappliedstatus();
      console.log('Dialog result: ${result}');
    });
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
    this.statusid = 0;
    this.profilecount = 0;
    this.child.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, this.statusid);
  }
  updatesuggestedstatus() { // what is the status id for suggested why api looks differe from others
    this.statusid = 15;
    // this.loadMoreStat=this.statusid;
    this.profilecount = 0;
    // this.PopulateJobdetailProfiles();
    this.child.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, this.statusid);
  }
  updateappliedstatus() {// 1000080;
    this.statusid = 4;
   // this.loadMoreStat=this.statusid;
   this.profilecount = 0;
    // console.log(this.statusid);
    // this.PopulateJobdetailProfiles();
    // console.log(this.jobid);
    this.child.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, this.statusid);
  }
  updateshortlistedstatus() { // 1000007;
    this.statusid = 5;
   // this.loadMoreStat=this.statusid;
   this.profilecount = 0;
    this.child.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, this.statusid);
  }
  updateinterviewedstatus() { // 1000007;
    this.statusid = 7;
  //  this.loadMoreStat=this.statusid;
  this.profilecount = 0;
    this.child.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, this.statusid);
  }
  updatehiredstatus() { // 1000028;
    this.statusid = 11;
   // this.loadMoreStat=this.statusid;
   this.profilecount = 0;
    this.child.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, this.statusid);
  }
  updaterejectedstatus() {
    this.statusid = 6;
    // this.loadMoreStat=this.statusid;
    this.profilecount = 0;
    this.child.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, this.statusid);
   }
   updateProfileCount() {
    // if (this.statusid === this.loadMoreStat) {
    this.profilecount += 6;
    // } else {
    //  this.profilecount = 0;
    //  this.profilecount += 6;
    // }
    this.profileLoader = true;
    this.jobdetailsservice.updateprofileCount(this.profilecount);
    this.child.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, this.statusid, this.sortBy, this.profilecount);
   this.loader();
   }
   loader() {
      this.profileLoader = false;
   }


  populateJobsBasicInfo(customerId, jobid) {
    return this.jobdetailsservice.getJobDetailsBasicInfo(this.customerId, this.jobid).subscribe(res => {
      this.jobdetailsbasicinfo = res,
        this.joblocation = res.JobLocations[0].CityName + ', ' + res.JobLocations[0].StateCode;
    });
  }

  populateJobsStaticInfo(jobid) {
    return this.jobdetailsservice.getJobDetailsStatisticsInfo(this.jobid).subscribe(res => {
      this.jobstatistics = res;
    });
  }
  // PopulateJobdetailProfiles() {
  //   return this.jobdetailsservice.getJobDetailsProfileInfo(this.jobid, this.statusid).subscribe(res => {
  //     this.jobdetailsprofiles = res;
  //   });
  // }
  updateStatistics() {
    this.populateJobsStaticInfo(this.jobid);
    this.child.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, this.statusid);
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

    },
      error => console.log(error));
}
  ngOnInit() {
     // this.loadMoreStat=0;
    this.jobdetailsservice.currentProfilecount.subscribe(x => this.profilecount = x);
    this.jobdetailsservice.ShowDetailsadvanceSearch.subscribe(x => this.showDetailadvancesearch = x);
    this.populateJobsBasicInfo(this.customerId, this.jobid);
    this.populateJobsStaticInfo(this.jobid);
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
       // this.parentMethod(name);
        this.child.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, this.statusid, sortBy);
      }
    };
  }

}
export interface ParentComponentApi {
  callParentMethod: (number) => void;
}
