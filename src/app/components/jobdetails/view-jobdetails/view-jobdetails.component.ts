import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { JobdetailsService } from '../../jobdetails/jobdetails.service';
import { Observable, Subject } from 'rxjs';
import { ViewjobdetailsmodelComponent } from './viewjobdetailsmodel/viewjobdetailsmodel.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { filter } from 'rxjs/operators';
import { JobdetailsBasicInfo } from '../models/jobdetailsbasicinfo';
import { Jobstatistics } from '../models/jobstatistics';

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
  jobid: number = 1000100;
  statusid: number=0;

  constructor(private route: ActivatedRoute,
    private router: Router, private jobdetailsservice: JobdetailsService,
    private dialog: MatDialog
   
   ) { }
  showDetailadvancesearch = false;
  openDialog() {
    const dialogRef = this.dialog.open(ViewjobdetailsmodelComponent,

      {
        data: {
          animal: 'panda'
        }
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
    //this.statusid=
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
    this.statusid =7;
  }
  updatehiredstatus() {
    this.jobid = 1000028;
    this.statusid =11;
  }

  updaterejectedstatus() {
    this.jobid = 1000024;
    this.statusid = 9; }

  populateJobsBasicInfo() {
    return this.jobdetailsservice.getJobDetailsBasicInfo().subscribe(res => {
      this.jobdetailsbasicinfo = res,
        this.joblocation = res.JobLocations[0].CityName + ", " + res.JobLocations[0].StateCode
    });
  }

  populateJobsStaticInfo() {
    return this.jobdetailsservice.getJobDetailsStatisticsInfo().subscribe(res => {
      this.jobstatistics = res
    });
  }

  ngOnInit() {
    this.jobdetailsservice.ShowDetailsadvanceSearch.subscribe(x => this.showDetailadvancesearch = x);

    this.populateJobsBasicInfo();
    this.populateJobsStaticInfo();
  }



}
