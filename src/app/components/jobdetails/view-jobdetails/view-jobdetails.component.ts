import { Component, OnInit, ViewContainerRef, ViewChild  } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JobdetailsService } from '../../jobdetails/jobdetails.service';
// import { Observable, Subject } from 'rxjs';
import { ViewjobdetailsmodelComponent } from './viewjobdetailsmodel/viewjobdetailsmodel.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { filter } from 'rxjs/operators';
import { JobdetailsBasicInfo } from '../models/jobdetailsbasicinfo';
import { Jobstatistics } from '../models/jobstatistics';
import { UploadProfilesComponent } from './upload-profiles/upload-profiles.component';
// import { UploadCandidatesComponent } from './upload-candidates/upload-candidates.component';
import { JobdetailsProfile } from '../models/jobdetailsprofile';
// tslint:disable-next-line:max-line-length
import {ViewjobdetailsCandidateProfileComponent} from '../view-jobdetails/viewjobdetails-candidate-profile/viewjobdetails-candidate-profile.component';
// import * as $ from 'jquery';
// import 'owl.carousel';
declare var $: any; 


@Component({
  selector: 'app-view-jobdetails',
  templateUrl: './view-jobdetails.component.html',
  styleUrls: ['./view-jobdetails.component.css']
})
export class ViewJobdetailsComponent implements OnInit {
@ViewChild(ViewjobdetailsCandidateProfileComponent ) child: ViewjobdetailsCandidateProfileComponent;
  viewdetailsdialogueref: MatDialogRef<ViewjobdetailsmodelComponent>;
  jobdetailsbasicinfo: JobdetailsBasicInfo;
  joblocation: any;
  jobstatistics: Jobstatistics;
  jobid = 1000100;
  statusid = 0;
  uploadProfile = 0;
  fileUploadForm: FormGroup;
  jobdetailsprofiles: JobdetailsProfile[] = [];
  // showVar:  = true;

  constructor(private route: ActivatedRoute,
    private router: Router, private jobdetailsservice: JobdetailsService,
    private dialog: MatDialog, private fb: FormBuilder
   ) { }
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
      this.populateJobsStaticInfo();
      this.updateappliedstatus();
      console.log('Dialog result: ${result}');
    });
  }
  // toggleChild() {
  //   this.showVar = !this.showVar;
  //    }

  updateallcandidatesstatus() {
    this.jobid = 1000100;
    this.statusid = 0;
    this.child.PopulateJobdetailProfiles(this.jobid, this.statusid);
  }
  updatesuggestedstatus() {
    this.jobid = 1000003; // what is the status id for suggested why api looks differe from others
    this.statusid=15;
    // this.PopulateJobdetailProfiles();
    this.child.PopulateJobdetailProfiles(this.jobid, this.statusid);
  }
  updateappliedstatus() {
    this.jobid = 1000100; // 1000080;
    this.statusid = 4;
    // console.log(this.statusid);
    // this.PopulateJobdetailProfiles();
    // console.log(this.jobid);
    this.child.PopulateJobdetailProfiles(this.jobid, this.statusid);
  }
  updateshortlistedstatus() {
    this.jobid = 1000100; // 1000007;
    this.statusid = 5;
    this.child.PopulateJobdetailProfiles(this.jobid, this.statusid);
  }
  updateinterviewedstatus() {
    this.jobid = 1000100; // 1000007;
    this.statusid = 7;
    this.child.PopulateJobdetailProfiles(this.jobid, this.statusid);
  }
  updatehiredstatus() {
    this.jobid = 1000100; // 1000028;
    this.statusid = 11;
    this.child.PopulateJobdetailProfiles(this.jobid, this.statusid);
  }

  updaterejectedstatus() {
    this.jobid = 1000100; // 1000024;
    this.statusid = 9;
    this.child.PopulateJobdetailProfiles(this.jobid, this.statusid);
   }

    uploadprofiles() {
       this.jobid = 1000100; // 1000024;
    }
    // getFileDetails(e) {
    //   let request = '';
    //   const formData = new FormData();
    //   this.fileUploadForm.value.Url = '';
    //   this.fileUploadForm.value.FileName = e.target.files[0].name;
    //   this.fileUploadForm.value.FileExtension = e.target.files[0].type;
    //   this.fileUploadForm.value.UserName = null;
    //   this.fileUploadForm.value.JobId = this.jobid;
    //   if (this.fileUploadForm.value !== '') {
    //     request = JSON.stringify(this.fileUploadForm.value);
    //   }
    //   if (e.target.files.length > 5) {
    //     alert('Please select max 5 files.');
    //     e.preventDefault();
    //   } else {
    //     for (let i = 0; i < e.target.files.length; i++) {
    //       formData.append('ResumeFile', e.target.files[i]);
    //     }
    //     formData.append('Model', request);
    //     this.uploadMultiple(formData);
    //   }
    // }
    // uploadMultiple(formData) {
    //   this.jobdetailsservice.byteStorage(formData, 'ProfileAPI/api/ParseResume').subscribe(data => {
    //     if (data) {
    //       alert('parsed successfully');
    //     }
    //   });
    // }

  populateJobsBasicInfo() {
    return this.jobdetailsservice.getJobDetailsBasicInfo().subscribe(res => {
      this.jobdetailsbasicinfo = res,
        this.joblocation = res.JobLocations[0].CityName + ', ' + res.JobLocations[0].StateCode;
    });
  }

  populateJobsStaticInfo() {
    return this.jobdetailsservice.getJobDetailsStatisticsInfo().subscribe(res => {
      this.jobstatistics = res;
    });
  }
  // PopulateJobdetailProfiles() {
  //   return this.jobdetailsservice.getJobDetailsProfileInfo(this.jobid, this.statusid).subscribe(res => {
  //     this.jobdetailsprofiles = res;
  //   });
  // }
  ngOnInit() {
    
      // $('#cultural-carousel').owlCarousel({
      //   loop: true,
      //   margin: 10,
      //   nav: true,
      //   navText: ['<span class="icon-down-arrow"><img src="/images/slider-nav-right.png" alt=""></span>', '<span class="icon-down-arrow"><img src="/images/slider-nav-right.png" alt=""></span>'],
      //   responsive: {
      //     0: {
      //       items: 3
      //     },
      //     600: {
      //       items: 3
      //     },
      //     1000: {
      //       items: 6
      //     }
      //   }
      // });
    
      // $('.skills-carousel').owlCarousel({
      //   loop: true,
      //   margin: 15,
      //   nav: true,
      //   navText: ['<img src="/images/left-chev.svg" alt="">', '<img src="/images/right-chev.svg" alt="">'],
      //   0: {
      //     items: 2
      //   },
      //   600: {
      //     items: 3
      //   }
      // });
    
    this.jobdetailsservice.ShowDetailsadvanceSearch.subscribe(x => this.showDetailadvancesearch = x);

    this.populateJobsBasicInfo();
    this.populateJobsStaticInfo();
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



}
