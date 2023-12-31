import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JobdetailsService } from '../../jobdetails/jobdetails.service';
// import { Observable, Subject } from 'rxjs';
import { ViewjobdetailsmodelComponent } from './viewjobdetailsmodel/viewjobdetailsmodel.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { filter } from 'rxjs/operators';
import { JobdetailsBasicInfo } from '../models/jobdetailsbasicinfo';
import { deactivate } from '../../managejobs/models/deactivate';
import { Jobstatistics } from '../models/jobstatistics';
import { UploadProfilesComponent } from './upload-profiles/upload-profiles.component';
import { DefaultModelsComponent } from './default-models/default-models.component';
// import { UploadCandidatesComponent } from './upload-candidates/upload-candidates.component';
import { JobdetailsProfile } from '../models/jobdetailsprofile';
import { SharedialogComponent } from './viewjobdetails-candidate-profile/sharedialog/sharedialog.component';
import { ConversationComponent } from './viewjobdetails-candidate-profile/conversations/conversation.component';
import { AppService } from '../../../app.service';
import { Options, LabelType  } from '@angular-slider/ngx-slider';
import { AlertService } from '../../../shared/alerts/alerts.service';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { WishlistCount } from '../models/WishlistCount';
import { ViewCandidateprofileComponent } from '../view-jobdetails/viewjobdetails-candidate-profile/view-candidateprofile/view-candidateprofile.component';
import { FilterViewJobsComponent } from '../view-jobdetails/filter-view-jobs/filter-view-jobs.component';
// tslint:disable-next-line:max-line-length
import { ViewjobdetailsCandidateProfileComponent } from '../view-jobdetails/viewjobdetails-candidate-profile/viewjobdetails-candidate-profile.component';
// import * as $ from 'jquery';
import { Location } from '@angular/common';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { CustomerSubscription } from '../../../../models/CustomerSubscription';
import { GetSubscriptionDetails } from '../../../../models/GetSubscriptionDetails';
import { InviteProfiledialogComponent } from './filter-view-jobs/invite-profiledialog/invite-profiledialog.component';
import { ShareJobComponent } from './share-job/sharejob.component';
import { SendnotificationdialogNcomponentComponent } from './viewjobdetails-candidate-profile/JobNotes/sendnotificationdialog-ncomponent/sendnotificationdialog-ncomponent.component';
import { DocumentManagerComponent } from '../../Postajob/document-manager/document-manager.component';
import { AshareJobComponentComponent } from './Assign-Job/ashare-job-component/ashare-job-component.component';
import { ApiService } from '../../../shared/services';
import * as introJs from 'intro.js/intro.js';
import { MatchingWeightage } from '../../Postajob/Createajob/Step3/step3.component';
// import 'owl.carousel';
declare var $: any;


@Component({
  selector: 'app-view-jobdetails',
  templateUrl: './view-jobdetails.component.html',
  styleUrls: ['./view-jobdetails.component.css','./view-job-details-top.css'],
  providers: [AppService, AlertService]
})
export class ViewJobdetailsComponent implements OnInit,OnDestroy {
  @ViewChild(ViewjobdetailsCandidateProfileComponent) child: ViewjobdetailsCandidateProfileComponent;
  @ViewChild(FilterViewJobsComponent) base: FilterViewJobsComponent;
  viewdetailsdialogueref: MatDialogRef<ViewjobdetailsmodelComponent>;
  viewshareddialogueref: MatDialogRef<ConversationComponent>;
  viewCandidateProfilewDialgoref: MatDialogRef<ViewCandidateprofileComponent>;
  acheck: boolean =false;
  @ViewChild('mmdivClick') mmdivClick: ElementRef;
  sval:any = 'All Applicants';
  JobDocuments:any=[];
  TotalExperience:boolean=true;
  Title:boolean=true;
  Domain:boolean=true;
  introJS = introJs();
  minValue: number = 60;
  maxValue: number = 100;
  JobFitval: number = 40;
  options: Options = {
    ceil: 100,
    floor: 0,
    step: 5,
    showSelectionBar: true,
    showTicks: true
  };
  match = new MatchingWeightage();
  //introJS = introJs();
  jobdetailsbasicinfo: JobdetailsBasicInfo;
  joblocation: any;
  totalCount: any;
  myjobstatistics:any;
  wishcheck : boolean =false;
  SuggestedCount: any;
  wsList = new WishList();
  wishlistCount: WishlistCount;
  jobstatistics: Jobstatistics;
  Counts: Jobstatistics;
  wishsort: 0;
  inprogressprofile: boolean = false;
  statistics: number;
  closedjob: any;
  exp: any;
  uploaded: any;
  suggested: any;
  invited: any;
  wishlist: any;
  arytic: any;
  recentapplicantlist:any=[];
  location: any;
  domain: any;
  customerId: any;
  Industry:any = 'All Applicants';;
  Industries:any
  = [
    {id: 1, name: 'All Applicants'},
    // {id: 2, name: 'In-Progress'},
    {id: 3, name: 'Applied Profiles'},
    {id: 4, name: 'Invited profiles' },
    {id: 5, name: 'Uploaded Profiles' },
    {id: 6, name: 'Social Media'},
    {id: 7, name: 'Freelancer'},
    {id: 8, name: 'Job Boards'},
    {id: 9, name: 'Agencies' },
    {id: 10, name: 'Customer Data' },
    {id: 11, name: 'Others'}
];

  Count: any;
  customer: any;
  subdetails = new CustomerSubscription();
  sdetails = new GetSubscriptionDetails();
  searchString: any;
  userId: any;
  jobid: any;
  viewBy: any;
  displayQuick: any;
  jobStatus: any;
  viewJobJobId: any;
  statusid = 4;
  sortBy = 1;
  preId:any;
  wishid = 0;
  loadMore = false;
  // loadMoreStat:number;
  profileLoader = false;
  uploadProfile = 0;
  ProfileId: any;
  Percentweightage:any;
  fileUploadForm: FormGroup;
  jobdetailsprofiles: JobdetailsProfile[] = [];
  profilecount: number;
  // showVar:  = true;
  // readChild: any;
  deactivate = new deactivate();
  complete: number;
  constructor(private route: ActivatedRoute, private _location: Location, private toastr: ToastsManager, private _vcr: ViewContainerRef,
    private router: Router, private appService: AppService, private jobdetailsservice: JobdetailsService,private _service: ApiService,
    private dialog: MatDialog, private fb: FormBuilder, private alertService: AlertService
  ) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId = this.customer.CustomerId;
    this.userId = this.customer.UserId;
    this.preId = JSON.parse(sessionStorage.getItem("Preid"));
    if(this.preId!=null)
    {
      this.GetProfileDetails();
    }
    if(sessionStorage.getItem('jobId')!=undefined && sessionStorage.getItem('jobId') != null)
    {
      this.jobid = JSON.parse(sessionStorage.getItem('jobId'));
    }

    if(localStorage.getItem('jId') != undefined && localStorage.getItem('jId') != null)
    {
      this.jobid = JSON.parse(localStorage.getItem('jId'));
      //this.reload();
    }
  
    let vjobId = JSON.parse(localStorage.getItem('vjobId'));
    let ij = localStorage.getItem('Ji');
    if(ij !=undefined && ij!=null)
    {
      this.ViewJobdetailsModel(this.jobid);
      localStorage.removeItem('Ji');
    }
    if(vjobId !=undefined && vjobId!=null)
    {
      this.ViewJobdetailsModel(vjobId);
    }
    this.ProfileId = localStorage.getItem('rprofileId');
    this.statusid = JSON.parse(sessionStorage.getItem('statusid')) === null ? 4 : JSON.parse(sessionStorage.getItem('statusid'));
    if (this.statusid == 4 || this.statusid == 0 || this.statusid == 15) {
      this.inprogressprofile = false;
    }
    else {
      this.inprogressprofile = true;
    }
    this.toastr.setRootViewContainerRef(_vcr);
  }
  showDetailadvancesearch = false;
  openDialog() {
    const abc = {
      'animal': 'panda',
      'JobId': this.jobid
    };
    const dialogRef = this.dialog.open(ViewjobdetailsmodelComponent,
      {
        width: '1000px',
        position: { right: '0px' },
        height: '750px',
        data: abc,
        // closeOnNavigation:false,
        // disableClose:true
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result: ${result}');
    });
  }


  SaveMatching()
  {
    this.JobFitval = Math.round(this.maxValue - this.minValue)
    this.match.jobFit = this.JobFitval;
    this.match.skillFit = this.minValue;
    this.match.domain = this.Domain;
    this.match.role = this.Title;
    this.match.totalExp = this.TotalExperience;
    this.match.jobId=this.jobid;
    this.match.userId = this.customer.UserId;
    this.appService.postjobMatching(this.match).subscribe(data => {
      if (data>=0) {
            this.match = new MatchingWeightage();
            this.GetJobMatching(this.jobid);
            this.populateJobsStaticInfo(this.customerId, this.jobid, 1);
            this.mmdivClick.nativeElement.click();
            // $('#skillFitEdit').modal('hide');
      }
      })

  }


  onValueChange(event: any)
  {
    this.minValue = event;
    this.JobFitval = this.maxValue-this.minValue;
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem("Preid");
    localStorage.removeItem('jId');
    localStorage.removeItem('vjobId');
  }

  OpenInviteProfileDialog() {
    // if (this.jobStatus !== 'InActive') {
      if (this.closedjob === 2)
      {
       this.toastr.error('Job is Filled');
     setTimeout(() => {
       this.toastr.dismissToast;
     }, 2000);
     return false;
   }
   if (this.jobStatus === 'InActive') {
    this.toastr.error('Job is In-Active');
    setTimeout(() => {
      this.toastr.dismissToast;
    }, 2000);
    return false;
   }

   else{
    const inviteProfiledialogRef = this.dialog.open(InviteProfiledialogComponent,
      {
        width: '750',
        position: {right : '0px'},
        height : '100vh',
        data: {
          animal: 'panda',
          jobId: this.jobid

        }
      }
    );
    inviteProfiledialogRef.afterClosed().subscribe(result => {
      console.log('Chatbox Dialog result: ${result}');
    });
  // }
}
}

  inprogressview(val) {
    if (val == 0) {
      this.inprogressprofile = false;

    }
    if (val == 1) {
      this.inprogressprofile = true;
    }
  }

  reload() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], { relativeTo: this.route });
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

  backClicked() {
   
  
    if(localStorage.getItem('posts')!=null&&localStorage.getItem('posts')!=undefined)
    {
      this.router.navigate(["/app-manage-jobs"]);
    }
    else
    {
      if(localStorage.getItem('search')!=null&&localStorage.getItem('search')!=undefined)
      {
        let search = localStorage.getItem('search');
        localStorage.setItem("lsearch",search);
        localStorage.removeItem('search');
      }
      localStorage.setItem('post', '1');
      this._location.back();
    }

  
  }


  PopulateJobDocuments(jobId) {
    this._service.GetService('ProfileAPI/api/GetJobDocuments?jobId=', jobId)
   .subscribe(
     r => {
      this.JobDocuments = r;
    });
  
  }

  
  startA()
  {
    this.introJS.start();
  }

  ttClose()
  {
    this.introJS.exit();
  }


  openCandidate() {
    this.toastr.error('Inactive Job Please Activate to Edit!', 'Oops!');
    setTimeout(() => {
      this.toastr.dismissToast;
    }, 3000);
  }
  openCandidateUploadDialog() {
    if (this.closedjob === 2)
    {
     this.toastr.error('Job is Filled');
   setTimeout(() => {
     this.toastr.dismissToast;
   }, 2000);
   return false;
 }
 if (this.jobStatus === 'InActive') {
  this.toastr.error('Job is In-Active');
  setTimeout(() => {
    this.toastr.dismissToast;
  }, 2000);
  return false;
 }
     else {
      localStorage.removeItem('DisplayUpload');
      const dialogRef = this.dialog.open(UploadProfilesComponent,
        {
          width: '65vw',
          position: { right: '0px' },
          height: '100vh',
          data: {
            jobId: this.jobid
          },
          panelClass:'upload__resume__modal'
          // closeOnNavigation:false,
          // disableClose:true
        }
      );

      dialogRef.afterClosed().subscribe(result => {
        this.populateJobsStaticInfo(this.customerId, this.jobid, 1);
        // this.updateappliedstatus();
        console.log('Dialog result: ${result}');
      });
    }
  }

  openDefaultDialog() {
    const dialogRef = this.dialog.open(DefaultModelsComponent,
      {
        width: '65vw',
        position: { right: '0px' },
        height: '100vh',
        panelClass:'default_component_modal'
        // closeOnNavigation:false,
        // disableClose:true
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      //this.populateJobsStaticInfo(this.customerId, this.jobid, 1);
      // this.updateappliedstatus();
      //console.log('Dialog result: ${result}');
    });
  }

  GetProfileDetails()
  {

      if(this.preId!=null)
      {
        this.OpenCandidateDialog(this.preId);
      }
      else
      {
        this.OpenCandidateDialog(this.ProfileId);
        localStorage.removeItem('rprofileId');  
      }
  }

  OpenCandidateDialog(profileId) {
   return  this.jobdetailsservice
    .getJobDetailsProfileInfo(
      this.customerId,
      this.userId,
      this.jobid,
      4,
      1,
      '',
      0,
      '',
      '',
      0,
      0,
      0,
      0,
      0,
      100,
      0
    ).subscribe((res) =>
    {3
      let candidateProfile = res.Profile.find(item => item.ProfileId == profileId);
      sessionStorage.setItem("selectedProfile", JSON.stringify(candidateProfile));
      if(candidateProfile!=null&&candidateProfile!=undefined)
      {
       const viewCandidatedialogRef = this.dialog.open(ViewCandidateprofileComponent,
         {
           width: '750',
           position: { right: '0px' },
           height: '750px',
           data: {
             ProfileId: profileId,
             jobId: this.jobid,
             profile: candidateProfile
             // status : this.statusid
           }
         }
       );
       viewCandidatedialogRef.afterClosed().subscribe(result => {
         console.log('candidate Dialog result: ${result}');
       });
      }
      else
      {
       this.toastr.info('Oh no!', 'Profile not found!!');
       sessionStorage.removeItem('Preid');
      }
 
  });
  } 

  OpenJobDialog(Jid) {
    if (this.jobStatus !== "InActive") {
      const senddialogRef = this.dialog.open(SendnotificationdialogNcomponentComponent, {
        position: { right: "0px" },
        width: '50vw',
        data: {
          jobId: Jid,
          // status : this.statusid
        },
      });
      senddialogRef.afterClosed().subscribe((result) => {
        this.publicstats();
        console.log("Screen Dialog result: ${result}");
      });
    }
  }


  // toggleChild() {
  //   this.showVar = !this.showVar;
  //    }
  ViewJobdetailsModel(viewJobJobId) {
    const viewdialogRef = this.dialog.open(ViewjobdetailsmodelComponent,
      {
        width: '1000px',
        position: { right: '0px' },
        height: '750px',
        panelClass: 'revamp__view__job__swiper',
        data: {
          JobId: viewJobJobId,
          // status : this.statusid
        }
      }
    );
    localStorage.removeItem('vjobId');
    viewdialogRef.afterClosed().subscribe(result => {
      this.populateJobsBasicInfoChange();
      //this.inprogressprofile = false;
      console.log('Dialog result: ${result}');
    });

  }
  ClearActiveClasses() {
    $("#Screening").removeClass('active');
    $("#Shortlisted").removeClass('active');
    $("#Interview").removeClass('active');
    $("#hired").removeClass('active');
    $("#rejected").removeClass('active');
  }
  updateallcandidatesstatus() {
    this.sortBy = 1;
    this.statusid = 0;
    this.displayQuick = 0;
    this.inprogressview(0);
    this.inprogressprofile = false;
    this.profilecount = 6;
    this.base.UploadedFlag = false;
    this.base.WishlistFlag = false;
    this.base.SuggestedFlag = false;
    this.base.InvitedFlag = false;
    this.base.AryticFlag = false;
    this.CallList(this.statusid);
    this.ClearallValues();
    if (this.jobstatistics.AllCandidates > 0) {
      this.child.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, this.statusid, this.jobstatistics.AllCandidates,
        this.sortBy, this.searchString, this.exp, this.location, this.domain, this.uploaded, this.suggested, this.wishlist, this.invited, this.arytic,6,0);
      this.loadMore = this.jobstatistics.AllCandidates > 6 ? true : false;
    } else {
      this.loadMore = false;
      this.child.NoRecords();
    }
  }
  updatesuggestedstatus() { // what is the status id for suggested why api looks differe from others  
    this.sortBy = 1;
    this.statusid = 15;
    this.displayQuick = 0;
    this.inprogressview(0);
    this.inprogressprofile = false;
    this.ClearallValues();
    this.ClearActiveClasses();
    // this.loadMoreStat=this.statusid;
    this.profilecount = 6;
    // this.PopulateJobdetailProfiles();
    if (this.SuggestedCount > 0) {
      this.child.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, this.statusid, this.SuggestedCount,
        this.sortBy, this.searchString, this.exp, this.location, this.domain, this.uploaded, this.suggested, this.wishlist, this.invited, this.arytic, 6);
      if (this.sdetails.planId === "enterprise") {
        this.loadMore = this.SuggestedCount > 6 ? true : false;
      }
      else {
        this.loadMore = false;
      }

    } else {
      // this.child.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, this.statusid, this.jobstatistics.Suggested,
      //   this.sortBy, 6);
      this.loadMore = false;
      this.child.NoRecords();
    }
  }
  updateappliedstatus() {   // 1000080;  
    this.ClearallValues();
    this.sortBy = 1;
    this.statusid = 4;
    this.displayQuick = 1;
    this.base.UploadedFlag = false;
    this.base.WishlistFlag = false;
    this.base.SuggestedFlag = false;
    this.base.AryticFlag = false;
    this.inprogressview(0);
    this.inprogressprofile = false;

    this.ClearActiveClasses();
    this.CallList(this.statusid);
    // this.loadMoreStat=this.statusid;
    this.profilecount = 6;
    // console.log(this.statusid);
    // this.PopulateJobdetailProfiles();
    // console.log(this.jobid);
    if (this.jobstatistics.Applied > 0) {
      //debugger
      this.child.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, this.statusid, this.jobstatistics.Applied,
        this.sortBy, this.searchString, this.exp, this.location, this.domain, this.uploaded, this.suggested, this.wishlist, this.invited, this.arytic, 6,0);
      this.loadMore = this.jobstatistics.Applied > 6 ? true : false;
    } else {
      this.loadMore = false;
      this.child.NoRecords();
    }
  }
  updateshortlistedstatus() { // 1000007;
    this.sortBy = 1;
    this.statusid = 5;
    this.displayQuick = 0;
    this.ClearallValues();
    let val = 17
    // this.loadMoreStat=this.statusid;
    this.profilecount = 6;
    if (this.jobstatistics.ShortListed > 0) {
      this.child.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, val, this.jobstatistics.ShortListed,
        this.sortBy, this.searchString, this.exp, this.location, this.domain, this.uploaded, this.suggested, this.wishlist, this.invited, this.arytic, 6, this.statusid);
      this.loadMore = this.jobstatistics.ShortListed > 6 ? true : false;

    } else {
      this.loadMore = false;
      this.child.NoRecords();
    }
  }
  updateinprogressstatus() {
    this.sortBy = 1;
    this.statusid = 17;
    //this.displayQuick = 0;
    // this.inprogressview(1);
    this.inprogressprofile = true;
    this.ClearallValues();
    // this.ClearActiveClasses();
    //  this.loadMoreStat=this.statusid;
    this.profilecount = 6;
    //debugger
    if (this.jobstatistics.InProgress > 0) {
      this.child.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, this.statusid, this.jobstatistics.InProgress,
        this.sortBy, this.searchString, this.exp, this.location, this.domain, this.uploaded, this.suggested, this.wishlist, this.invited, this.arytic, 6, 0);
      this.loadMore = this.jobstatistics.InProgress > 6 ? true : false;
    } else {
      this.loadMore = false;
      this.child.NoRecords();
    }
  }

  MyProfilesExport()
  {
    this.child.export();
  }

  updateinprogressstatusp(val) {
    this.sortBy = 1;
    this.statusid = 17;
    //this.displayQuick = 0;
    // this.inprogressview(1);
    this.inprogressprofile = true;
    this.ClearallValues();
    // this.ClearActiveClasses();
    //  this.loadMoreStat=this.statusid;
    this.profilecount = 6;
    //debugger
    if (this.jobstatistics.InProgress > 0) {
      this.child.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, this.statusid, this.jobstatistics.InProgress,
        this.sortBy, this.searchString, this.exp, this.location, this.domain, this.uploaded, this.suggested, this.wishlist, this.invited, this.arytic, 6, val);
      this.loadMore = this.jobstatistics.InProgress > 6 ? true : false;
    } else {
      this.loadMore = false;
      this.child.NoRecords();
    }
  }
  updatescreeningstatus() { // 1000007;
    this.sortBy = 1;
    this.statusid = 8;
    this.displayQuick = 0;
    this.ClearallValues();
    let val = 17
    //  this.loadMoreStat=this.statusid;
    this.profilecount = 6;
    if (this.jobstatistics.Screening > 0) {
      this.child.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, val, this.jobstatistics.Screening,
        this.sortBy, this.searchString, this.exp, this.location, this.domain, this.uploaded, this.suggested, this.wishlist, this.invited, this.arytic, 6, this.statusid);
      this.loadMore = this.jobstatistics.Screening > 6 ? true : false;
    } else {
      this.loadMore = false;
      this.child.NoRecords();
    }
  }

  GetCustomerSubscription() {
    return this.appService.GetCustomerSubscription(this.customer.UserId).subscribe(res => {
      if (res != null) {
        this.subdetails = res;
        this.GetSubscriptionDetails(res.subscriptionId);
        // this.GetInvoiceEstimates();
        // this.GetUnbilledChargeDetails();
      }

    });
  }

  GetSubscriptionDetails(sid) {
    return this.appService.GetSubscriptionDetails(sid).subscribe(res1 => {
      if (res1 != null) {
        this.sdetails = res1;
      }
      else {
        this.sdetails.planId = '0';
      }
    });
  }

  updateinterviewedstatus() { // 1000007;  
    this.sortBy = 1;
    this.statusid = 7;
    this.displayQuick = 0;
    this.ClearallValues();
    //  this.loadMoreStat=this.statusid;
    this.profilecount = 6;
    let val = 17
    if (this.jobstatistics.Interviewed > 0) {
      this.child.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, val, this.jobstatistics.Interviewed,
        this.sortBy, this.searchString, this.exp, this.location, this.domain, this.uploaded, this.suggested, this.wishlist, this.invited, this.arytic, 6, this.statusid);
      this.loadMore = this.jobstatistics.Interviewed > 6 ? true : false;

    } else {
      this.loadMore = false;
      this.child.NoRecords();
    }
  }
  updatehiredstatus() { // 1000028;
    this.sortBy = 1;
    this.statusid = 11;
    this.displayQuick = 0;
    this.ClearallValues();
    // this.loadMoreStat=this.statusid;
    this.profilecount = 6;
    let val = 17
    if (this.jobstatistics.Hired > 0) {
      this.child.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, val, this.jobstatistics.Hired,
        this.sortBy, this.searchString, this.exp, this.location, this.domain, this.uploaded, this.suggested, this.wishlist, this.invited, this.arytic, 6, this.statusid);
      this.loadMore = this.jobstatistics.Hired > 6 ? true : false;
    } else {
      this.loadMore = false;
      this.child.NoRecords();
    }
  }
  updaterejectedstatus() {

    this.sortBy = 1;
    this.statusid = 6;
    this.displayQuick = 0;
    this.ClearallValues();
    // this.loadMoreStat=this.statusid;
    this.profilecount = 6;
    let val = 17
    if (this.jobstatistics.RejectedORWithdrawn > 0) {
      this.child.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, val, this.jobstatistics.RejectedORWithdrawn,
        this.sortBy, this.searchString, this.exp, this.location, this.domain, this.uploaded, this.suggested, this.wishlist, this.invited, this.arytic, 6, this.statusid);
      this.loadMore = this.jobstatistics.RejectedORWithdrawn > 6 ? true : false;
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
    if (this.statusid === 0) {
      // this.statistics=this.jobstatistics.Applied;
      if (this.totalCount > 0 && (this.uploaded > 0 || this.suggested > 0 || this.wishlist > 0 || this.invited > 0 || this.arytic > 0)) {
        this.statistics = this.totalCount;
      } else if (this.totalCount === 0) {
        this.statistics = this.jobstatistics.AllCandidates;
      }
    } else if (this.statusid === 4) {
      if (this.totalCount > 0 && (this.uploaded > 0 || this.suggested > 0 || this.wishlist > 0 || this.invited > 0 || this.arytic > 0)) {
        this.statistics = this.totalCount;
      }else if (this.totalCount === 0 || this.totalCount === undefined) {
        this.statistics = this.jobstatistics.Applied;
      }
    } else if (this.statusid === 5) {
      this.statistics = this.jobstatistics.ShortListed;
    } else if (this.statusid === 7) {
      this.statistics = this.jobstatistics.Interviewed;
    } else if (this.statusid === 11) {
      this.statistics = this.jobstatistics.Hired;
    } else if (this.statusid === 6) {
      this.statistics = this.jobstatistics.RejectedORWithdrawn;
    } else if (this.statusid === 15) {
      this.statistics = this.SuggestedCount;
    }
    else if (this.statusid === 17) {
      this.statistics = this.jobstatistics.InProgress;
    }
    this.profileLoader = true;
    this.jobdetailsservice.updateprofileCount(this.profilecount);
    this.child.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, this.statusid, this.statistics,
      this.sortBy, this.searchString, this.exp, this.location, this.domain, this.uploaded, this.suggested, this.wishlist, this.invited, this.arytic, this.profilecount, 0);
    this.loader();
  }
  loader() {
    this.profileLoader = false;
  }

  updateLoadMore() {
    this.loadMore = false;
  }
  MySort(val)
  {
    this.ttClose();
    this.Industry = val;
    //this.checkR();
    this.sval = val;
    if(val === "All Applicants")
    {
      this.ClearallValues();
      this.updateappliedstatus();
      //this.inprogressview(0);
    }
    // else if(val === "In-Progress")
    // {
    //   this.ClearallValues();
    //   this.updateinprogressstatus();
    // }
    else if(val === "Invited profiles")
    {
      this.statusid=4;
      this.ClearallValues();
      this.GetInvitedList();
    }
    else if(val === "Uploaded Profiles")
    {
      this.statusid=4;
      this.ClearallValues();
      this.GetUploadList();
    }
    else if(val === "Applied Profiles")
    {
      this.statusid=4;
      this.ClearallValues();
      this.child.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, this.statusid, this.statistics, this.wishsort, '', this.exp, this.location, this.domain, 0,0,0,0,1, this.profilecount);
    }
    else
    {
      this.statusid=0;
      this.ClearallValues();
      this.child.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, this.statusid, this.statistics, this.wishsort, '', this.exp, this.location, this.domain, 0,0,0,0,0, this.profilecount);
    }
  }

  OpenAssignJob()
  {
    this.dialog.closeAll();
    const docRef = this.dialog.open(AshareJobComponentComponent, {
      // width: "80vw",
      position: { right: "0px" },
      height: "750px",
      data: {
        JobId:  this.jobid
      },
      panelClass: 'candiateModalPop'
    });
    docRef.afterClosed().subscribe(result => {
      console.log('share Dialog result: ${result}');
      //this.ViewJobdetailsModel(this.jobid);
    });
  }

  documentManagerDialog() {
    this.dialog.closeAll();
    const docRef = this.dialog.open(DocumentManagerComponent, {
      width: "80vw",
      position: { right: "0px" },
      height: "750px",
      data: {
        jobId:  this.jobid
      },
      panelClass: 'candiateModalPop'
    });
    docRef.afterClosed().subscribe(result => {
      console.log('share Dialog result: ${result}');
      this.PopulateJobDocuments(this.jobid);
      //this.ViewJobdetailsModel(this.jobid);
    });
  }

  
  populateJobsBasicInfo() {
    return this.jobdetailsservice.getJobDetailsBasicInfo(this.customerId, this.jobid).subscribe(res => {
      this.jobdetailsbasicinfo = res;
      debugger
        this.closedjob = this.jobdetailsbasicinfo.IsOpen;
      this.jobStatus = this.jobdetailsbasicinfo.JobStatus;
      this.inprogressview(1);
      //this.joblocation = res.JobLocations[0].CityName + ', ' + res.JobLocations[0].StateCode;
    });
  }

  populateJobsBasicInfoChange() {
    return this.jobdetailsservice.getJobDetailsBasicInfo(this.customerId, this.jobid).subscribe(res => {
      this.jobdetailsbasicinfo = res;
      debugger
        this.closedjob = this.jobdetailsbasicinfo.IsOpen;
      this.jobStatus = this.jobdetailsbasicinfo.JobStatus;
      this.inprogressview(0);
      //this.joblocation = res.JobLocations[0].CityName + ', ' + res.JobLocations[0].StateCode;
    });
  }

  GetJobMatching(JId)
  {
    this.appService.GetJobMatching(JId).subscribe(data => {
      if (data != "No records found") {
         this.minValue = data.SkillFit;
         this.JobFitval = data.JobFit;
         this.Domain  = data.JobDomain;
         this.TotalExperience = data.JobTotalExp;
         //this.Title = data.JobRole;

        this.Percentweightage = data;

      }
      })
  }

  OpenShareJobDialog(jobid,jobtitle) {
    if (this.closedjob === 2)
    {
     this.toastr.error('Job is Filled');
   setTimeout(() => {
     this.toastr.dismissToast;
   }, 2000);
   return false;
 }
 if (this.jobStatus === 'InActive') {
  this.toastr.error('Job is In-Active');
  setTimeout(() => {
    this.toastr.dismissToast;
  }, 2000);
  return false;
 }
 else
 {
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
  }

  publicstats()
  {
    return this.jobdetailsservice.GetJobStatsForManage(this.customerId, this.jobid,this.customer.UserId).subscribe(res => {
      this.myjobstatistics = res;
    });
  }

  populateJobsStaticInfo(customerId, jobid, onload?) {
    return this.jobdetailsservice.getJobDetailsStatisticsInfo(this.customerId, this.jobid).subscribe(res => {
      this.jobstatistics = res;
      this.publicstats();
    
      //this.CallList(this.statusid);
      this.GetJobMatching(this.jobid);
      this.SuggestedCount = res.AryticSuggested;
      this.Counts = this.child.TotalCount;
      if (onload === 1) {
        if (this.statusid === 4) {
          // //debugger
          this.inprogressview(0);
          $("#Prospect").addClass('active');
          $("#Shortlisted").removeClass('active');
          $("#Interview").removeClass('active');
          this.updateappliedstatus();
        } else if (this.statusid === 0) {
          this.inprogressview(0);
          this.updateallcandidatesstatus();
        }
        else if (this.statusid === 5) {
          $("#Prospect").removeClass('active');
          $("#Screening").removeClass('active');
          $("#inprogressprofiles").addClass('active');
          $("#Shortlisted").addClass('active');
          this.updateshortlistedstatus();

        }
        else if (this.statusid === 15) {
          $("#Prospect").removeClass('active');
          $("#Screening").removeClass('active');
          $("#inprogressprofiles").removeClass('active');
          $("#aryticbestfit").addClass('active');
          this.updatesuggestedstatus();

        }
        else if (this.statusid === 7) {
          $("#Prospect").removeClass('active');
          $("#Screening").removeClass('active');
          $("#inprogressprofiles").addClass('active');
          $("#Interview").addClass('active');
          this.updateinterviewedstatus();

        }
        else if (this.statusid === 11) {
          $("#Prospect").removeClass('active');
          $("#Screening").removeClass('active');
          $("#inprogressprofiles").addClass('active');
          $("#Hired").addClass('active');
          this.updatehiredstatus();

        }
      }
      sessionStorage.removeItem('statusid');
    });
  }
  // GetProfileSuggestedCount() {
  //   return this.jobdetailsservice.getSuggestedCount(this.jobid).subscribe(res => {
  //     ////debugger
  //    this.SuggestedCount = res;
  //  });
  // }
  // PopulateJobdetailProfiles() {
  //   return this.jobdetailsservice.getJobDetailsProfileInfo(this.jobid, this.statusid).subscribe(res => {
  //     this.jobdetailsprofiles = res;
  //   });
  // }
  updateStatistics(value: any) {
    this.ttClose();
    this.populateJobsStaticInfo(this.customerId, this.jobid);
    // if(this.statusid==)
    this.CallList(this.statusid);
    if (value === 'max' || value === 'min') {
      this.loadMore = false;
    } else { // if (value === true) {
      this.child.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, this.statusid,
        this.jobstatistics.Applied, 1, this.searchString, this.exp, this.location, this.domain, this.uploaded, this.suggested, this.wishlist, this.invited, this.arytic, this.profilecount);
    }
  }

  CallList(statusid) {
    if (statusid === 4 || statusid === 0) {
      return this.jobdetailsservice.getWishListCount(this.customerId, this.jobid, statusid).subscribe(res => {
        this.wishlistCount = res;
        this.Count = this.wishlistCount;
      });
    }
  }
  changeJobStatus(job, val) {
    // //debugger
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
          this.populateJobsBasicInfo();
          this.populateJobsStaticInfo(this.deactivate.jobId, 1);
        },
        error => console.log(error));
  }

  ClearallValues() {
    this.base.ViewBy = 1;
    this.searchString = '';
    this.base.SearchList = [];
    this.base.searchString = undefined;
    this.base.uploaded = 0;
    this.base.suggested = 0;
    this.base.wishlist = 0;
    this.base.invited = 0;
    this.base.arytic = 0;
    this.sortBy = 0;
    this.uploaded = 0;
    this.suggested = 0;
    this.wishlist = 0;
    this.invited = 0;
    this.arytic = 0;
  }
  ngOnInit() {
    this.PopulateJobDocuments(this.jobid);
    this.jobdetailsservice.updateDetailsAdvanceSearch(false);
    // this.loadMoreStat=0;
    this.jobdetailsservice.currentProfilecount.subscribe(x => this.profilecount = x);
    this.jobdetailsservice.ShowDetailsadvanceSearch.subscribe(x => this.showDetailadvancesearch = x);
    this.populateJobsBasicInfo();
    this.GetCustomerSubscription();
    //this.GetProfileSuggestedCount();
    this.populateJobsStaticInfo(this.customerId, this.jobid, 1);
    if (this.ProfileId != null || this.ProfileId != undefined) {
      this.GetProfileDetails();
    }
    // this.updateappliedstatus();
    this.fileUploadForm = this.fb.group({
      'userId': [5, Validators.required],
      'Url': ['', Validators.nullValidator],
      'FileName': ['', Validators.nullValidator],
      'UserName': ['', Validators.nullValidator],
      'ResumeFile': ['', Validators.compose([Validators.required])],
      'FileExtension': ['', Validators.nullValidator],
      'JobId': [this.jobid, Validators.nullValidator]
    });
  }
  // ngAfterViewInit() {
  //   this.readChild = this.child.childToViewjobdetails;
  //   if (this.readChild === 1) {
  //     this.populateJobsStaticInfo(this.jobid);
  //    }
  // }

  GetaSort(a)
  {
    if(a === true)
    {
      this.acheck = true;
      this.updatesuggestedstatus();
    }
    else
    {
      this.acheck = false;
      this.updateappliedstatus();
    }
  }

  checkR()
  {
    this.wishcheck = false;
    this.acheck = false;
    this.GetaSort(false);
    this.GetWishlistSort(false);
  }


  GetWishlistSort(wish)
  {
   
    let w ;
    if(wish== true)
    {
       w= 1;
    }
    else
    {
      w = 0;
    }
    this.wishcheck =wish;
    this.getParentApi().CallViewBy(0,0,w,0,0,0,undefined,this.profilecount);
  }

  GetInvitedList()
  {
    this.getParentApi().CallViewBy(0,0,0,1,0,0,undefined,this.profilecount);
  }

  GetUploadList()
  {
    this.getParentApi().CallViewBy(1,0,0,0,0,0,undefined,this.profilecount);
  }


  getParentApi(): ParentComponentApi {
    return {
      callfilterMethod: (exp, location, domain) => {
        if (this.statusid === 4) {
          this.sortBy = 0;
          this.searchString = '';
          // this.statistics=this.jobstatistics.Applied;
          this.statistics = this.jobstatistics.Applied;
        } else if (this.statusid === 5) {
          this.statistics = this.jobstatistics.ShortListed;
        } else if (this.statusid === 7) {
          this.statistics = this.jobstatistics.Interviewed;
        } else if (this.statusid === 11) {
          this.statistics = this.jobstatistics.Hired;
        } else if (this.statusid === 6) {
          this.statistics = this.jobstatistics.RejectedORWithdrawn;
        } else if (this.statusid === 15) {
          this.statistics = this.SuggestedCount;
        }
        else if (this.statusid === 17) {
          this.statistics = this.jobstatistics.InProgress;
        }
        this.loadMore = this.statistics > 6 ? true : false;
        // this.parentMethod(name);
        this.child.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, this.statusid, this.statistics, this.sortBy, this.searchString, exp, location, domain, this.uploaded, this.suggested, this.wishlist, this.invited, this.arytic, this.profilecount);
      },
      callSearchMethod: (searchString) => {
        this.exp = 0;
        this.domain = 0;
        this.location = '';
        if (this.statusid === 4) {
          // this.statistics=this.jobstatistics.Applied;
          this.statistics = this.jobstatistics.Applied;
        } else if (this.statusid === 5) {
          this.statistics = this.jobstatistics.ShortListed;
        } else if (this.statusid === 7) {
          this.statistics = this.jobstatistics.Interviewed;
        } else if (this.statusid === 11) {
          this.statistics = this.jobstatistics.Hired;
        } else if (this.statusid === 6) {
          this.statistics = this.jobstatistics.RejectedORWithdrawn;
        } else if (this.statusid === 15) {
          this.statistics = this.SuggestedCount;
        }
        else if (this.statusid === 17) {
          this.statistics = this.jobstatistics.InProgress;
        }
        this.loadMore = this.statistics > 6 ? true : false;
        // this.parentMethod(name);
        this.child.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, this.statusid, this.statistics, this.sortBy, searchString, this.exp, this.location, this.domain, this.uploaded, this.suggested, this.wishlist, this.invited, this.arytic, this.profilecount);
      },
      callSuggested: () => {
        this.openCandidateUploadDialog();
      },
      CallwishList: (ev, profileId, jobId) => {
        this.wsList.IsSaved = ev;
        this.wsList.ProfileId = profileId;
        this.wsList.JobId = jobId; 
        this.jobdetailsservice.updateWishlist(this.wsList).subscribe(res => {
          console.log(res);
          this.populateJobsStaticInfo(this.customerId, this.jobid, 1);
          this.CallList(this.statusid);
        });
      },
      CallViewBy: (uploaded, suggested, wishlist, invited, arytic, sortBy, search, count) => {
        this.searchString = search;
        this.totalCount = count;
        this.base.GetSearchText(null);
        this.exp = 0;
        this.domain = 0;
        this.uploaded = uploaded;
        this.suggested = suggested;
        this.wishlist = wishlist;
        this.invited = invited;
        this.location = '';
        this.wishsort = sortBy;
        this.sortBy = sortBy;
        this.searchString = search;
        if (this.statusid === 0) {
          if (count === 0) {
            this.statistics = this.jobstatistics.Applied;
          } else if (uploaded > 0 || suggested > 0 || wishlist > 0 || invited > 0 || arytic > 0) {
            this.statistics = this.jobstatistics.Applied;
          }

        } else if (this.statusid === 4) {
          if (count === 0) {
            this.statistics = this.jobstatistics.Applied;
          } else if (uploaded > 0 || suggested > 0 || wishlist > 0 || invited > 0 || arytic > 0) {
            this.statistics = this.jobstatistics.Applied;
          }
        }
        else if (this.statusid === 5 || this.statusid === 8) {
          this.statistics = this.jobstatistics.InProgress;
        }
         else if (this.statusid === 7) {
          this.statistics = this.jobstatistics.Interviewed;
        } else if (this.statusid === 11) {
          this.statistics = this.jobstatistics.Hired;
        } else if (this.statusid === 6) {
          this.statistics = this.jobstatistics.RejectedORWithdrawn;
        } else if (this.statusid === 15) {
          this.statistics = this.SuggestedCount;
        }
        else if (this.statusid === 17) {
          this.statistics = this.jobstatistics.InProgress;
        }
        this.loadMore = this.statistics > 6 ? true : false;
        // this.parentMethod(name);
        this.child.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, this.statusid, this.statistics, this.wishsort, search, this.exp, this.location, this.domain, uploaded, suggested, wishlist, invited, arytic, this.profilecount);
      }
    };


  }

  editJob(jobId, active) {
    if (active === false) {
      this.toastr.error('Inactive Job Please Activate to Edit!', 'Oops!');
      setTimeout(() => {
        this.toastr.dismissToast;
      }, 3000);
    } else {
      this.complete = 4;
      this.dialog.closeAll();
      this.router.navigate(['/app-createajob/', { jobId }]);
      localStorage.setItem('completed', JSON.stringify(this.complete));
      localStorage.setItem('EditViewJob', 'yes');
      this.router.navigate(['/app-createajob/app-steps-step1/', { jobId }]);
    }

    // this.router.navigateByUrl('/app-createajob/app-steps-step1/id='+ jobId);
    // [routerLink]="['/app-createajob/app-steps-step1/',job.JobId]"
  }

}
export interface ParentComponentApi {
  // callParentMethod: (number) => void;
  callSearchMethod: (string) => void;
  callfilterMethod: (exp, location, domain) => void;
  callSuggested: () => void;
  CallwishList: (ev, profileId, jobId) => void;
  CallViewBy: (uploaded, suggested, wishlist, invited, arytic, sortBy, search, count) => void;
}

export class WishList {
  public JobId: number;
  public ProfileId: number;
  public IsSaved: boolean;
}
