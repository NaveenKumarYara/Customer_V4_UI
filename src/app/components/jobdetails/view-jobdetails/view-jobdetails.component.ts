import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JobdetailsService } from '../../jobdetails/jobdetails.service';
import { Observable, Subject } from 'rxjs';
import { ViewjobdetailsmodelComponent } from './viewjobdetailsmodel/viewjobdetailsmodel.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { filter } from 'rxjs/operators';
import { JobdetailsBasicInfo } from '../models/jobdetailsbasicinfo';
import { Jobstatistics } from '../models/jobstatistics';
import { UploadProfilesComponent } from './upload-profiles/upload-profiles.component';
// import { UploadCandidatesComponent } from './upload-candidates/upload-candidates.component';

@Component({
  selector: 'app-view-jobdetails',
  templateUrl: './view-jobdetails.component.html',
  styleUrls: ['./view-jobdetails.component.css']
})
export class ViewJobdetailsComponent implements OnInit {
  viewdetailsdialogueref: MatDialogRef<ViewjobdetailsmodelComponent>;
  jobdetailsbasicinfo: JobdetailsBasicInfo;
  joblocation: any;
  jobstatistics: Jobstatistics;
  jobid = 1000100;
  statusid = 0;
  uploadProfile = 0;
  fileUploadForm: FormGroup;
  constructor(private route: ActivatedRoute,
    private router: Router, private jobdetailsservice: JobdetailsService,
    private dialog: MatDialog, private fb: FormBuilder
   ) { }
  showDetailadvancesearch = false;
  openDialog() {
    let abc = {
      'animal': 'panda',
      'JobId' : this.jobid
    }
    const dialogRef = this.dialog.open(ViewjobdetailsmodelComponent, 
      {
        width: '1000px',
        position: {right:'0px'},
        height :'700px',
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
    let abc =
    {
      'animal': 'panda',
       'JobId' : this.jobid
    };
    const dialogRef = this.dialog.open(UploadProfilesComponent, 
      {
        width: '750px',
        position: {right:'0px'},
        height :'750px',
        data: abc,
        // closeOnNavigation:false, 
        // disableClose:true
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result: ${result}');
    });
  }
  updateallcandidatesstatus() {
    this.jobid = 1000100;
    this.statusid = 0;
    
  }
  updatesuggestedstatus() {
    this.jobid = 1000003; // what is the status id for suggested why api looks differe from others
    // this.statusid=
   
  }
  updateappliedstatus() {
    this.jobid = 1000080;
    this.statusid = 4;
   
  }
  updateshortlistedstatus() {
    this.jobid = 1000007;
    this.statusid = 5;
   
  }
  updateinterviewedstatus() {
    this.jobid = 1000007;
    this.statusid = 7;
   
  }
  updatehiredstatus() {
    this.jobid = 1000028;
    this.statusid = 11;
   
  }

  updaterejectedstatus() {
    this.jobid = 1000024;
    this.statusid = 9;
  
   }

    uploadprofiles() {
       this.jobid = 1000024;
    
    }
    getFileDetails(e) {
      let request = '';
      const formData = new FormData();
      this.fileUploadForm.value.Url = '';
      this.fileUploadForm.value.FileName = e.target.files[0].name;
      this.fileUploadForm.value.FileExtension = e.target.files[0].type;
      this.fileUploadForm.value.UserName = null;
      this.fileUploadForm.value.JobId = this.jobid;
      if (this.fileUploadForm.value !== '') {
        request = JSON.stringify(this.fileUploadForm.value);
      }
      if (e.target.files.length > 5) {
        alert('Please select max 5 files.');
        e.preventDefault();
      } else {
        for (let i = 0; i < e.target.files.length; i++) {
          formData.append('ResumeFile', e.target.files[i]);
        }
        formData.append('Model', request);
        this.uploadMultiple(formData);
      }
    }
    uploadMultiple(formData) {
      this.jobdetailsservice.byteStorage(formData, 'ProfileAPI/api/ParseResume').subscribe(data => {
        if (data) {
          alert('parsed successfully');
        }
      });
    }

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

  ngOnInit() {
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
