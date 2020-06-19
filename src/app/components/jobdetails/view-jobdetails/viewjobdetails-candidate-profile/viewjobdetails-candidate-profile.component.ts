import { Component, OnInit, ViewContainerRef, Input, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { JobdetailsService } from '../../jobdetails.service';
import { AppService } from '../../../../app.service';
import { ChatboxdialogComponent } from './chatboxdialog/chatboxdialog.component';
import { SharedialogComponent } from './sharedialog/sharedialog.component';
import { RejectdialogComponent } from './rejectdialog/rejectdialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { JobdetailsProfile, MatchingParameterDetails } from '../../models/jobdetailsprofile';
import { AlertService } from '../../../../shared/alerts/alerts.service';
import * as Chart from 'chart.js';
import { MatchingDetails } from '../../models/matchingDetails';
import { NgxSpinnerService } from 'ngx-spinner';
import { ScheduleInterviewComponent, ScheduleInterview } from './schedule-interview/schedule-interview.component';
import { VideoSizzle, GetVideoProfile } from '../../models/VideoProfile';
import { ViewCandidateprofileComponent } from './view-candidateprofile/view-candidateprofile.component';
import { SendEmailComponent } from './send-email/send-email.component';
import { ParentComponentApi } from '../view-jobdetails.component';
import { ApiService } from '../../../../shared/services/api.service/api.service';
import{UniqueMonthYearPipe} from './../months.pipe';
import * as FileSaver from 'file-saver';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
// import {ViewJobdetailsComponent} from '../view-jobdetails.component';
declare var $: any;
declare var jQuery: any;

// import $ from 'jquery';
// import 'owl-carousel';
@Component({
  selector: 'app-viewjobdetails-candidate-profile',
  templateUrl: './viewjobdetails-candidate-profile.component.html',
  styleUrls: ['./viewjobdetails-candidate-profile.component.css'],
  providers: [NgxSpinnerService, AlertService,ApiService]
})
export class ViewjobdetailsCandidateProfileComponent implements OnInit {
  viewchatboxdialogueref: MatDialogRef<ChatboxdialogComponent>;
  viewshareddialogueref: MatDialogRef<SharedialogComponent>;
  viewscheduleInterviewDialgoref: MatDialogRef<ScheduleInterviewComponent>;
  viewCandidateProfilewDialgoref: MatDialogRef<ViewCandidateprofileComponent>;
  jobdetailsprofiles = new JobdetailsProfile();
  matchingDetails: MatchingDetails;
  // profileVideo= new  VideoProfile();
  profileFlipVideo = new GetVideoProfile();
  customerId: any;
  userId: any;
  addon = new addon();
  profiles: any;
  customer: any;
  CandidateCertification:CandidateCertifications;
  CandidateDomain:CandidateDomains;
  searchString: any;
  domainName: any;
  matchingParameterDetails = new MatchingParameterDetails();
  matchingParameterData = new MatchingParameterDetails();
  experience: any;
  location: any;
  fileType = new Resume();
  fileExt: any;
  skills: any = null;
  loading: boolean;
  schIntw = new ScheduleInterview();
  wsList = new WishList();
  TotalCount: any;
  @Input() jobid: number;
  @Input() statusid: number;
  @Output() myEvent = new EventEmitter();
  @Output() loadMoreEvent = new EventEmitter();
  @Input() jobStatus: string;
  debugger
  @Input() options: object;
  @Input() parentApi: ParentComponentApi;
  $owlElement: any;
  defaultOptions: object = {};
  images = [1, 2, 3].map(() => 'https://picsum.photos/900/500?random&t=${Math.random()}');
  mySlideImages = [1, 2, 3].map((i) => 'https://picsum.photos/640/480?image=${i}');
  myCarouselImages = [1, 2, 3, 4, 5, 6].map((i) => 'https://picsum.photos/640/480?image=${i}');
  mySlideOptions = { items: 1, dots: true, nav: false };
  myCarouselOptions = { items: 3, dots: true, nav: true };
  customOptions: any = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  };
  ProfileId: any;
  currentNo: number[] =[];
  constructor(private el: ElementRef,private appService: AppService, private spinner: NgxSpinnerService, private router: Router, private jobdetailsservice: JobdetailsService, private alertService: AlertService
    ,private _service: ApiService , private dialog: MatDialog , private toastr: ToastsManager, private _vcr: ViewContainerRef,) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId = this.customer.CustomerId;
    this.userId = this.customer.UserId;
    this.jobid = JSON.parse(sessionStorage.getItem('jobId'));
  }


  OpenChatboxDialog() {
    if (this.jobStatus !== 'InActive') {
      const chatboxdialogRef = this.dialog.open(ChatboxdialogComponent,
        {
          width: '750',
          position: { right: '0px' },
          height: '750px',
          data: {
            animal: 'panda'
          }
        }
      );
      chatboxdialogRef.afterClosed().subscribe(result => {
        console.log('Chatbox Dialog result: ${result}');
      });
    }
  }

  OpenShareDialog(title, jobResponseId, profileId) {
    if (this.jobStatus !== 'InActive') {
      const shareddialogRef = this.dialog.open(SharedialogComponent,
        {
          // width: '1000px',
          position: { right: '0px' },
          // height : '750px',
          data: {
            animal: 'panda',
            Title: title,
            jobResponseId: jobResponseId,
            jobId: this.jobid,
            ProfileId: profileId
          }
        }
      );
      shareddialogRef.afterClosed().subscribe(result => {
        console.log('share Dialog result: ${result}');
      });
    }
  }

  prevSkills(data,index) {
    console.log("current number",this.currentNo);
    if (this.currentNo[index] > 0) {


      this.currentNo[index] = this.currentNo[index] - 1;
    } else {
      this.currentNo[index] = 0;
    }
    console.log("current number",this.currentNo);
  }
  nextSkills(data,index) {
    var len  = data.split(",",10).length / 3; 
    if (len -1 > this.currentNo[index]) {


      this.currentNo[index] = this.currentNo[index] + 1;
    } else {
      this.currentNo[index] =Math.round(len - 1);
    }
  
}

OpenRejectDialog(jobResponseId, profileId) {
  if (this.jobStatus !== 'InActive') {
    const rejectdialogRef = this.dialog.open(RejectdialogComponent,
      {
        position: { right: '0px' },
        data: {
          jobResponseId: jobResponseId,
          jobId: this.jobid,
          ProfileId: profileId
          // status : this.statusid
        }
      }
    );
    rejectdialogRef.afterClosed().subscribe(result => {
      // this.jobDetails.populateJobsStaticInfo(this.jobid);
      this.myEvent.emit(null);
      console.log('reject Dialog result: ${result}');
    });
  }
}

OpenScheduleInterviewDialog(jobResponseId, userId, profileId) {
  // var candidateUserId = $("#candidateUserId").val();
  // var candidateId = +candidateUserId;
  const scheduleIntwdialogRef = this.dialog.open(ScheduleInterviewComponent,
    {
      width: '750px',
      position: { right: '0px' },
      height: '750px',
      data: {
        jobResponseId: jobResponseId,
        jobId: this.jobid,
        ProfileId: profileId,
        userId: userId
        // status : this.statusid
      }
    }
  );
  scheduleIntwdialogRef.afterClosed().subscribe(result => {
    // this.jobDetails.populateJobsStaticInfo(this.jobid);
    this.myEvent.emit(null);
    console.log('Chatbox Dialog result: ${result}');
  });
}

OpenCandidateDialog(profileId) {
  // if (this.jobStatus!='InActive') {
  this.spinner.show();
  setTimeout(() => {
    this.spinner.hide();
  }, 1500);
  const viewCandidatedialogRef = this.dialog.open(ViewCandidateprofileComponent,
    {
      width: '750',
      position: { right: '0px' },
      height: '750px',
      data: {
        ProfileId: profileId,
        jobId: this.jobid
        // status : this.statusid
      }
    }
  );
  viewCandidatedialogRef.afterClosed().subscribe(result => {
    // this.jobDetails.populateJobsStaticInfo(this.jobid);
    // this.myEvent.emit(null);
    console.log('candidate Dialog result: ${result}');
  });
  // }
}
OpenSendEmailDialog(noEmail, emailId, firstname, lastname, jobResponseId, profileId, responseStatusId, ccpid, userId) {
  // if (this.jobStatus!='InActive') {
  if (!noEmail) {
    const sendEmaildialogRef = this.dialog.open(SendEmailComponent,
      {
        width: '750',
        position: { right: '0px' },
        height: '750px',
        data: {
          EmailId: emailId,
          jobId: this.jobid,
          firstname: firstname,
          lastname: lastname,
          responseStatusId: responseStatusId,
          profileId: profileId,
          jobResponseId: jobResponseId,
          ccpid: ccpid,
          userId: userId
          // status : this.statusid
        }
      }
    );
    sendEmaildialogRef.afterClosed().subscribe(result => {
      // this.jobDetails.populateJobsStaticInfo(this.jobid);
      this.myEvent.emit(null);
      console.log('candidate Dialog result: ${result}');
    });
  }
  return false;
  // }
}

Check(val,ProfileId)
{
if(val==1)
{
  this._service.GetService('ProfileAPI/api/GetProfileStatus?profileId=', ProfileId).subscribe(
  data => {
  var IsPublic = data.isPublicAvailable;
  if(IsPublic==true)
  {
   debugger
  return this.appService.GetCustomerSubscription(this.customer.UserId).subscribe(res => {
  this.addon.SubscriptionId = res.subscriptionId;
  this.addon.AddonId = "2";
  this.addon.AddonUnitPrice = 400;
  this.addon.AddonQuantity = 1;
  this.jobdetailsservice.AddonHirefee(this.addon).subscribe(result => {
    console.log(result);
  });
  
});
}
});
}

}


// updateOnDialogClose() {
//   this.eventStat.emit(null);
//   this.myEvent.emit(null);
// }
shortlisthiredwithdrawn(stat, jobResponseId, profileId) {
  if(stat==11)
  {
    this.Check(1,profileId)
  }
  this.schIntw.UserId = null;
  this.schIntw.JobId = this.jobid;
  this.schIntw.ProfileId = profileId;
  this.schIntw.JobInterviewId = 0;
  this.schIntw.JobResponseId = jobResponseId; // gemerated when sortlisted or applied
  this.schIntw.InterviewDatevalue = '';
  // this.schIntw.InterviewDate = null;
  this.schIntw.StartTime = null;
  this.schIntw.EndTime = null;
  this.schIntw.InterviewTypeId = null; // skype or anytype
  this.schIntw.PhoneNumber = null;
  this.schIntw.BridgeUrl = null;
  this.schIntw.AccessId = null;
  this.schIntw.SkypeId = null;
  this.schIntw.Comments = '';
  this.schIntw.ResponseStatusId = stat; // what stage it is..hired...
  this.schIntw.IsActive = null;
  this.schIntw.Rating = null;
  this.schIntw.RequiredFurtherInterview = null;
  this.schIntw.StatusChangedByUserId = this.userId;
  this.schIntw.InterviewingPerson = null;
  this.jobdetailsservice.interviewProcess(this.schIntw).subscribe(res => {
    // this.jobDetails.populateJobsStaticInfo(this.jobid);
    this.myEvent.emit(null);
    console.log(res);
  });
}
GetCandidateProfile(profileId) {
  if (this.jobStatus !== 'InActive') {
    sessionStorage.setItem('profileId', JSON.stringify(profileId));
    this.router.navigateByUrl('app-cprofile');
  }
}
NoRecords() {
  this.jobdetailsprofiles = new JobdetailsProfile();
}

GetCandidateCertifications(profileId) {

  this._service.GetService('ProfileAPI/api/GetCertification?profileId=', profileId)
    .subscribe(
      dat => {
        this.CandidateCertification = dat;
      });
}

GetCandidateDomains(profileId) {

  this._service.GetService('ProfileAPI/api/GetCandidateDomain?profileId=', profileId)
    .subscribe(
      datr => {
        debugger
        this.CandidateDomain = datr;
      });
}



PopulateJobdetailProfiles(customerId, userid, jobid, statusid, statistics, sortBy = 1, searchString = '', experience = 0, location = '', domainName = '', uploaded = 0, suggested = 0, wishlist = 0, invited = 0,arytic=0, noofRows = 6) {
  this.alertService.clear();
  // $('#searchStr').val('');
  this.spinner.show();
  console.log("prolifees");
  if (jobid != null && statusid != null) {
    this.jobid = jobid;
    this.statusid = statusid; // === 0 ? 4 : statusid; // As all candidate status is 0 and it is enabled so condition for 4 is removed.
  }
  if (statistics === 0 && statusid > 4) {
    this.jobdetailsprofiles = new JobdetailsProfile();
  }
   else {
    return this.jobdetailsservice.getJobDetailsProfileInfo(this.customerId, this.userId, this.jobid, this.statusid, sortBy, searchString, experience, location, domainName, uploaded, suggested, wishlist, invited,arytic, noofRows)
      .subscribe(res => {
        this.jobdetailsprofiles = res;
        debugger
        this.profiles = res;
        this.TotalCount = this.jobdetailsprofiles;
        this.spinner.hide();
        this.jobdetailsprofiles.Profile.forEach((a,index)=>{
          // var num = 0;
          this.currentNo[index] = 0;
          
        });
        // if (this.jobdetailsprofiles.Profile.length > 0) {
        //   this.jobdetailsprofiles.Profile.forEach(a => {
        //     // this.GetMatchingPercentage(a.ProfileId, this.jobid);
        //     // this.jobdetailsservice.GetJobMatchingCriteriaEndPoint(Number(a.ProfileId), this.jobid).subscribe(res => {

        //     //   this.matchingParameterDetails = res;
        //     //   this.matchingParameterData  = res;
        //     //   // if (this.matchingParameterDetails.isPublic) {
        //     //   //   this.matchingParameterDetails.Jobfit_Total = ((this.matchingParameterDetails.Jobfit_Total) * 30 / 100);
        //     //   //   this.matchingParameterDetails.Skillfit_Total = ((this.matchingParameterDetails.Skillfit_Total) * 50 / 100);

        //     //   //   a.MatchingPercentage = ((
        //     //   //     ((this.matchingParameterDetails.Jobfit_Total))
        //     //   //     +
        //     //   //     ((this.matchingParameterDetails.Skillfit_Total))
        //     //   //     + 30
        //     //   //   )).toFixed(2).toString();
        //     //   // } else {
        //     //   //   this.matchingParameterDetails.Jobfit_Total = ((this.matchingParameterDetails.Jobfit_Total) * 40 / 100);
        //     //   //   this.matchingParameterDetails.Skillfit_Total = ((this.matchingParameterDetails.Skillfit_Total) * 60 / 100);

        //     //   //   a.MatchingPercentage = ((
        //     //   //     ((this.matchingParameterDetails.Jobfit_Total))
        //     //   //     +
        //     //   //     ((this.matchingParameterDetails.Skillfit_Total))
        //     //   //   )).toFixed(2).toString();

        //     //   // }
        //     //   this.matchingParameterData.Jobfit_Total = this.matchingParameterDetails.Jobfit_Total;
        //     //   this.matchingParameterData.Personalityfit_Total = this.matchingParameterDetails.Personalityfit_Total;
        //     //     this.matchingParameterData.Skillfit_Total = this.matchingParameterDetails.Skillfit_Total;

        //     // });

        //   });
        // }
        if (this.profiles === 'No records found') {
          this.myEvent.emit('min');
          // this.alertService.warn('No Profiles Matched!!');
        }
        if (((noofRows > 6) && res.TotalProfileCount < noofRows)) {
          // need to change the res.totalprofile count
          this.myEvent.emit('max'); // load more hide when max count is reached
        } else if ((noofRows === 6) && (res.Profile.length < noofRows)) {// need to change the res.totalprofile count
          this.myEvent.emit('min'); // load more when profiles count is min and low
        }
        //  else {
        //   this.myEvent.emit(true);
        //  }

      });
  }
}
add3Dots(string, limit) {
  const dots = '...';
  if (string.length > limit) {
    string = string.substring(0, limit) + dots;
  }
  return string;
}

CheckDisplay(val) {
  if (val === null) {
    return 'none';
  }
}


// getMatchingDetails(profileId)
// {
//   return this.jobdetailsservice.getMatchingDetails(profileId, this.jobid).subscribe(res => {
//     this.matchingDetails = res;
//   });
// }
callSkills(profileId,Val?) {
  // var $card = $('.page--job-details .tab-content .card');
  //   var $detailsBtn = $card.find('.show-matching-details');
  //   $detailsBtn.on('click', function (e) {

  //     e.preventDefault();
  //     var $selectedCard = $(this).closest('.card');
  //     var $detailsDiv = $selectedCard.find('.matching-details');
  //     var $detailsCloseBtn = $selectedCard.find('.close');

  this.ProfileId = profileId;
  if(Val==0)
  {
    this.GetCandidateCertifications(profileId);
    $('.matching-details').removeClass('open');
    $('#matchingDetailCert-' + profileId).toggleClass('open');
  }
  else if(Val==1)
  {
    this.GetCandidateDomains(profileId);
    $('.matching-details').removeClass('open');
    $('#matchingDetailDom-' + profileId).toggleClass('open');
  }
  else
  {
    var data = this.GetMatchingPercentage(profileId, this.jobid);
    console.log("matchingParameterDetails", this.matchingParameterDetails);
  
    return this.jobdetailsservice.getMatchingCriteriaDetails(profileId, this.jobid).subscribe(res => {
      this.matchingDetails = res;
      $('.matching-details').removeClass('open');
      $('#matchingDetail-' + profileId).toggleClass('open');
  
  
      // $('.matching-details1').removeClass('open');
      // $('#matchingDetails-' + profileId).toggleClass('open');
    });
  }


  // $detailsCloseBtn.on('click', function (e) {
  //   e.preventDefault();
  //   $detailsDiv.removeClass('open');
  // });
  // });
}
closeDetails(profileId, type) {
  if (type === 1) {
    $('#matchingDetail-' + profileId).removeClass('open');
    $('#matchingDetailCert-' + profileId).removeClass('open');
    $('#matchingDetailDom-' + profileId).removeClass('open');
  } else {
    $('#sizzleVideo-' + profileId).removeClass('open');
    $('#profileVideo-' + profileId).removeClass('open');
  }
}
ngOnInit() {
  this.alertService.clear();
  (function ($) {
    // TODO: test multiple cards -- open and close function
    const $card = $('.page--job-details .tab-content .card');
    const $detailsBtn = $card.find('.show-matching-details');
    $detailsBtn.on('click', function (e) {

      e.preventDefault();
      const $selectedCard = $(this).closest('.card');
      const $detailsDiv = $selectedCard.find('.matching-details');
      const $detailsCloseBtn = $selectedCard.find('.close');
      $detailsDiv.toggleClass('open');

      $detailsCloseBtn.on('click', function (e) {
        e.preventDefault();
        $detailsDiv.removeClass('open');
      });
    });
    // const $detailBtn = $card.find('.show-matching-details');
    // $detailBtn.on('click', function (e) {

    //   e.preventDefault();
    //   const $selectedCard = $(this).closest('.card');
    //   const $detailsDiv = $selectedCard.find('.matching-details');
    //   const $detailsCloseBtn = $selectedCard.find('.close');
    //   $detailsDiv.toggleClass('open');

    //   $detailsCloseBtn.on('click', function (e) {
    //     e.preventDefault();
    //     $detailsDiv.removeClass('open');
    //   });
    // });
  })(jQuery);
  // this.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, this.statusid, 0);
  console.log('abc');
}

// ngAfterViewInit() {
//   for (const key in this.options) {
//     this.defaultOptions[key] = this.options[key];
//   }
//   this.$owlElement = $(this.el.nativeElement).owlCarousel(this.defaultOptions);
// }
ngOnChange() {
  console.log('on change', this.jobid, this.statusid);
}
updateWishlist(event, profileId) {
  // this.wsList.IsSaved = event.target.checked;
  // this.wsList.ProfileId = profileId;
  // this.wsList.JobId = this.jobid;
  // this.jobdetailsservice.updateWishlist(this.wsList).subscribe(res => {
  //   console.log(res);
  // });
  this.parentApi.CallwishList(event, profileId, this.jobid);
}


displayVideoProfile(profileId, profileOrSizzle) {
  // (function ($) {
  // // TODO: test multiple cards -- open and close function
  // const $card = $('.page--job-details .tab-content .card');
  //  const $detailBtn = $card.find('.show-matching-details');
  //   $detailBtn.on('click', function (e) {

  //     e.preventDefault();
  //     const $selectedCard = $(this).closest('.card');
  //     const $detailsDiv = $selectedCard.find('.matching-details');
  //     const $detailsCloseBtn = $selectedCard.find('.close');
  //     $detailsDiv.toggleClass('open');

  //     $detailsCloseBtn.on('click', function (e) {
  //       e.preventDefault();
  //       $detailsDiv.removeClass('open');
  //     });
  //   });
  // })(jQuery);
  // this.jobdetailsservice.getVideoProfile(1,0 ).subscribe(res => {
  //   this.profileVideo = res[0]; });
  // profile.VideoSizzle,profile.VideoProfile

  // $('.matching-details').removeClass('open');
  // $('#matchingDetails-' + profileId).toggleClass('open');
  if (profileOrSizzle === true) {
    
      $('.matching-details').removeClass('open');
      $('#profileVideo-' + profileId).toggleClass('open');  
  }

}

base64ToArrayBuffer(base64) {
  const binary_string = window.atob(base64);
  const len = binary_string.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

DownloadResume(val,profileId): void {
  this._service.GetService('ProfileAPI/api/GetResume?profileId=', profileId)
   .subscribe(fileData => { 
      this.fileType = fileData;
      let exp = this.fileType.Url.split('.').pop();
      this.fileExt = exp;
    this.toastr.success('Downloading!', 'Success!');
    setTimeout(() => {
      this.toastr.dismissToast;
    }, 3000);   
     debugger 
     
      if(this.fileExt == 'pdf')
      {
      let byteArr = this.base64ToArrayBuffer(fileData.ResumeFile);
      let blob = new Blob([byteArr], { type: 'application/pdf' });
      FileSaver.saveAs(blob,val);
      }
      else if(this.fileExt == 'doc' ||  this.fileExt == 'docx')
      {
        var extension = '.doc';
        let byteArr = this.base64ToArrayBuffer(fileData.ResumeFile);
        let blob = new Blob([byteArr], { type: 'application/pdf' });
        FileSaver.saveAs(blob,val+extension);
      }
    });



}
displayVideo(profileId, videoSizzle, videoProfile, profileOrSizzle) {
  this.debugger
  // (function ($) {
  // // TODO: test multiple cards -- open and close function
  // const $card = $('.page--job-details .tab-content .card');
  //  const $detailBtn = $card.find('.show-matching-details');
  //   $detailBtn.on('click', function (e) {

  //     e.preventDefault();
  //     const $selectedCard = $(this).closest('.card');
  //     const $detailsDiv = $selectedCard.find('.matching-details');
  //     const $detailsCloseBtn = $selectedCard.find('.close');
  //     $detailsDiv.toggleClass('open');

  //     $detailsCloseBtn.on('click', function (e) {
  //       e.preventDefault();
  //       $detailsDiv.removeClass('open');
  //     });
  //   });
  // })(jQuery);
  // this.jobdetailsservice.getVideoProfile(1,0 ).subscribe(res => {
  //   this.profileVideo = res[0]; });
  // profile.VideoSizzle,profile.VideoProfile
  this.profileFlipVideo.VideoProfile = videoProfile;
  this.profileFlipVideo.VideoSizzle = videoSizzle;
  // $('.matching-details').removeClass('open');
  // $('#matchingDetails-' + profileId).toggleClass('open');
  if (profileOrSizzle === true) {
    if (this.profileFlipVideo.VideoSizzle == null && this.profileFlipVideo.VideoProfile != null) {
      $('.matching-details').removeClass('open');
      $('#profileVideo-' + profileId).toggleClass('open');
    } else {
      $('.matching-details').removeClass('open');
      $('#sizzleVideo-' + profileId).toggleClass('open');
    }
  } else {
    $('.matching-details').removeClass('open');
    $('#profileVideo-' + profileId).toggleClass('open');
  }

}
// this function is not required as of now as there is split in UI
splitSkills(skills) {
  // foreach(skills.)
  // for (let count = -1, index = -2; index !== -1; count++, index = Skills.indexOf(',', index + 1) ) {
  // this.skills.push();
  //  }
  // let a1 = new Array();
  if (skills != null) {
    this.skills = skills.split(',', 3);

    /// display elements  ///
    // let i = 0;
    // for (i = 0; i < a1.length; i++) {
    // // document.write(a1[i] + '<br >');
    // this.skills=
    // }
  }
}
GetMatchingPercentage(profileId, jobid): any {
  // var profileId = 10;
  // var jobid = 10;
  this.jobdetailsservice.GetJobMatchingCriteriaEndPoint(profileId, this.jobid).subscribe(res => {
    this.matchingParameterDetails = res;
    // if (this.matchingParameterDetails.isPublic) {
    //   this.matchingParameterDetails.Jobfit_Total = ((this.matchingParameterDetails.Jobfit_Total) * 30 / 100);
    //   this.matchingParameterDetails.Skillfit_Total = ((this.matchingParameterDetails.Skillfit_Total) * 50 / 100);
    // } else {
    //   this.matchingParameterDetails.Jobfit_Total = ((this.matchingParameterDetails.Jobfit_Total) * 40 / 100);
    //   this.matchingParameterDetails.Skillfit_Total = ((this.matchingParameterDetails.Skillfit_Total) * 60 / 100);
    // }
    this.matchingParameterData.Jobfit_Total = this.matchingParameterDetails.Jobfit_Total;
    this.matchingParameterData.Personalityfit_Total = this.matchingParameterDetails.Personalityfit_Total;
    this.matchingParameterData.Skillfit_Total = this.matchingParameterDetails.Skillfit_Total;

    console.log("matchingParameterDetails", this.matchingParameterDetails);
    this.getGraph();
  });
  return this.matchingParameterDetails;
}
GetPersonalityTestFit() {

}

// @ViewChild('testChart1') testChart1: ElementRef;
// getDetails(){
//     var responseList = [];
//     var count = 0;
//       if (this.testChart1) {
//       var testChartCanvas = this.testChart1.nativeElement.getContext('2d');
//          var weekChart = new Chart(testChartCanvas, {
//         type: 'doughnut',
//         options: {

//           title: {
//             display: true,
//           },
//           circumference: Math.PI,
//         rotation: 1.0 * Math.PI,
//         responsive: true,
//         legend: { position: 'top',},
//         animation: { animateScale: true, animateRotate: true }
//         },
//         data: {
//           value: 35,
//           labels: ["Skill Fit","Job Fit","Personality Fit"],
//           render: 'labels',
//           datasets: [{
//             labels: [
//               'Red',
//               'Yellow',
//               'Blue'
//             ],
//             label: '# of Votes',
//             // this.matchingParameterDetails.Skillfit_Total>0?this.matchingParameterDetails.Skillfit_Total:5
//             data: [this.matchingParameterDetails.Skillfit_Total,this.matchingParameterDetails.Jobfit_Total>0?this.matchingParameterDetails.Jobfit_Total:5,30],
//             backgroundColor: [
//               'rgba(101,105, 169, 1)',
//               'rgba(63, 184, 179, 1)',
//               'rgba(236, 136, 133, 1)'
//             ],
//           }
//           ]
//         }
//       });
//     }
//   }
@ViewChild('testChart') testChart: ElementRef;
getGraph() {
  var responseList = [];
  var count = 0;
  if (this.testChart) {
    var testChartCanvas = this.testChart.nativeElement.getContext('2d');
    if (this.matchingParameterDetails.isPublic) {
      var weekChart = new Chart(testChartCanvas, {
        type: 'doughnut',
        options: {

          title: {
            display: true,
          },
          circumference: Math.PI,
          rotation: 1.0 * Math.PI,
          responsive: true,
          legend: { position: 'bottom', },
          animation: { animateScale: true, animateRotate: true }
        },
        data: {
          value: 35,
          labels: ["Skill Fit", "Job Fit", "Personality-Fit"],
          render: 'labels',
          datasets: [{
            labels: [
              'Red',
              'Yellow',
              'Blue'
            ],
            label: '# of Votes',
            data: [this.matchingParameterData.Skillfit_Total > 0 ? Math.round(this.matchingParameterData.Skillfit_Total) : 0, this.matchingParameterData.Jobfit_Total > 0 ? Math.round(this.matchingParameterData.Jobfit_Total) : 0, Math.round(this.matchingParameterData.Personalityfit_Total)],
            backgroundColor: [
              'rgba(101,105, 169, 1)',
              'rgba(63, 184, 179, 1)',
              'rgba(236, 136, 133, 1)'
            ],

          },

          ]
        }

      });
    } else {
      var weekChart = new Chart(testChartCanvas, {
        type: 'doughnut',
        options: {

          title: {
            display: true,
          },
          circumference: Math.PI,
          rotation: 1.0 * Math.PI,
          responsive: true,
          legend: { position: 'bottom', },
          animation: { animateScale: true, animateRotate: true }
        },
        data: {
          value: 35,
          labels: ["Skill Fit", "Job Fit"],
          render: 'labels',
          datasets: [{
            labels: [
              'Red',
              'Yellow'
            ],
            label: '# of Votes',
            data: [this.matchingParameterData.Skillfit_Total > 0 ? Math.round(this.matchingParameterData.Skillfit_Total) : 0, this.matchingParameterData.Jobfit_Total > 0 ? Math.round(this.matchingParameterData.Jobfit_Total) : 0],
            backgroundColor: [
              'rgba(101,105, 169, 1)',
              'rgba(63, 184, 179, 1)'
            ],

          }
          ]
        }

      });
    }
  }

}
}
export class WishList {
  public JobId: number;
  public ProfileId: number;
  public IsSaved: boolean;
}
export class CandidateCertifications
{

CertificationId: number;
CertificationName: string;
Certified: boolean;
CreatedOn: string;
ImageUrl: string;
IssuedBy: string;
LifeTime: string;
ModifiedOn:string;
ProfileId: number;
ProviderId: string;
YearOfAchievement: string;

}

export class CandidateDomains
{

CandidateDomainId: number;
CreatedBy: number;
CreatedOn: string;
Description:string;
DomainId: number;
DomainName: string;
ExpInMonths: number;
ExpInYears: number;
LastUsed: number;
ModifiedBy: number;
ModifiedOn: string;
ProfileId: number;

}

export class Resume {
  ResumeId: number;
  ProfileId: number;
  Url: string;
  ResumeFile: string;
}


export class addon
{
    SubscriptionId: string;
    AddonId:string;
    AddonUnitPrice:number;
    AddonQuantity:number;
}