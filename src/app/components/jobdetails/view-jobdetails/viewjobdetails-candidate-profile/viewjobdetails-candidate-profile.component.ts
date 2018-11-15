import { Component, OnInit, ViewContainerRef, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { JobdetailsService } from '../../jobdetails.service';
import { ChatboxdialogComponent } from './chatboxdialog/chatboxdialog.component';
import { SharedialogComponent } from './sharedialog/sharedialog.component';
import { RejectdialogComponent } from './rejectdialog/rejectdialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { JobdetailsProfile } from '../../models/jobdetailsprofile';
import {MatchingDetails} from '../../models/matchingDetails';
import { ScheduleInterviewComponent, ScheduleInterview } from './schedule-interview/schedule-interview.component';
// import {ViewJobdetailsComponent} from '../view-jobdetails.component';
declare var $: any;
declare var jQuery: any;

// import $ from 'jquery';
// import 'owl-carousel';
@Component({
  selector: 'app-viewjobdetails-candidate-profile',
  templateUrl: './viewjobdetails-candidate-profile.component.html',
  styleUrls: ['./viewjobdetails-candidate-profile.component.css'],
 // providers: [ViewJobdetailsComponent]
})
export class ViewjobdetailsCandidateProfileComponent implements OnInit {
  viewchatboxdialogueref: MatDialogRef<ChatboxdialogComponent>;
  viewshareddialogueref: MatDialogRef<SharedialogComponent>;
  viewscheduleInterviewDialgoref: MatDialogRef<ScheduleInterviewComponent>;
   jobdetailsprofiles = new JobdetailsProfile() ;
   matchingDetails: MatchingDetails;
   customerId: any;
   userId: any;
   skills: any = null;
   loading: boolean;
   schIntw = new ScheduleInterview();
  @Input() jobid: number;
  @Input() statusid: number;
  @Output() myEvent = new EventEmitter();
  @Output() loadMoreEvent = new EventEmitter();

  @Input() options: object;
  $owlElement: any;
  defaultOptions: object = {};
  images = [1, 2, 3].map(() => 'https://picsum.photos/900/500?random&t=${Math.random()}');
 mySlideImages = [1, 2, 3].map((i) => 'https://picsum.photos/640/480?image=${i}');
 myCarouselImages = [1, 2, 3, 4, 5, 6].map((i) => 'https://picsum.photos/640/480?image=${i}');
 mySlideOptions = {items: 1, dots: true, nav: false};
 myCarouselOptions = {items: 3, dots: true, nav: true};
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
  constructor(private el: ElementRef, private router: Router, private jobdetailsservice: JobdetailsService,
    private dialog: MatDialog, ) {
      this.customerId = JSON.parse(sessionStorage.getItem('customerId'));
      this.userId = JSON.parse(sessionStorage.getItem('userId'));
      this.jobid = JSON.parse(sessionStorage.getItem('jobId'));
     }

  OpenChatboxDialog() {
    const chatboxdialogRef = this.dialog.open(ChatboxdialogComponent,
      {
        width: '750',
        position: {right : '0px'},
        height : '750px',
        data: {
          animal: 'panda'
        }
      }
    );
    chatboxdialogRef.afterClosed().subscribe(result => {
      console.log('Chatbox Dialog result: ${result}');
    });
  }

  OpenShareDialog() {
    const shareddialogRef = this.dialog.open(SharedialogComponent,
      {
        // width: '1000px',
        // position: {right : '0px'},
        // height : '750px',
        data: {
          animal: 'panda'
        }
      }
    );
    shareddialogRef.afterClosed().subscribe(result => {
      console.log('share Dialog result: ${result}');
    });
  }

  OpenRejectDialog(jobResponseId) {
    const rejectdialogRef = this.dialog.open(RejectdialogComponent,
      {
        data: {
          jobResponseId: jobResponseId,
          jobId: this.jobid,
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

  OpenScheduleInterviewDialog(jobResponseId) {
    const scheduleIntwdialogRef = this.dialog.open(ScheduleInterviewComponent,
      {
        width: '750',
        position: {right : '0px'},
        height : '750px',
        data: {
          jobResponseId: jobResponseId,
          jobId: this.jobid,
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
// updateOnDialogClose() {
//   this.eventStat.emit(null);
//   this.myEvent.emit(null);
// }
shortlisthiredwithdrawn(stat, jobResponseId) {
    this.schIntw.UserId = null;
    this.schIntw.JobId = this.jobid;
    this.schIntw.JobInterviewId = 0;
    this.schIntw.JobResponseId = jobResponseId; // gemerated when sortlisted or applied
    this.schIntw.InterviewDate = null;
    this.schIntw.InterviewDate = null;
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
      }) ;
    }
  GetCandidateProfile(profileId) {
    sessionStorage.setItem('profileId', JSON.stringify(profileId));
    this.router.navigateByUrl('app-cprofile');
  }
  PopulateJobdetailProfiles (customerId, userid, jobid, statusid, statistics, sortBy= 1, noofRows= 6) {
    if (jobid != null && statusid != null) {
      this.jobid = jobid;
      this.statusid = statusid === 0 ? 4 : statusid;
    }
    if (statistics === 0 && statusid >= 4 ) {
    this.jobdetailsprofiles = new JobdetailsProfile();
    } else if (this.statusid === 15) {
      return this.jobdetailsservice.getJobDetailsSuggestedProfileInfo(this.customerId, this.userId, this.jobid, this.statusid,
        sortBy, noofRows).subscribe(res => {
        this.jobdetailsprofiles = res;
        // this.jobdetailsprofiles[0].TotalProfileCount
      });
    } else {
    return this.jobdetailsservice.getJobDetailsProfileInfo(this.customerId, this.userId, this.jobid, this.statusid, sortBy, noofRows)
    .subscribe(res => {
      this.jobdetailsprofiles = res;
      if (((noofRows > 6 ) && res.TotalProfileCount < noofRows)) {
        this.myEvent.emit('max'); // load more hide when max count is reached
       } else if ((noofRows === 6 ) && (res.Profile.length < noofRows)) {
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
    if (val === null ) {
      return 'none';
    }
  }
  // getMatchingDetails(profileId)
  // {
  //   return this.jobdetailsservice.getMatchingDetails(profileId, this.jobid).subscribe(res => {
  //     this.matchingDetails = res;
  //   });
  // }
  callSkills(profileId) {
    // var $card = $('.page--job-details .tab-content .card');
    //   var $detailsBtn = $card.find('.show-matching-details');
    //   $detailsBtn.on('click', function (e) {

    //     e.preventDefault();
    //     var $selectedCard = $(this).closest('.card');
    //     var $detailsDiv = $selectedCard.find('.matching-details');
    //     var $detailsCloseBtn = $selectedCard.find('.close');
        return this.jobdetailsservice.getMatchingDetails(profileId, this.jobid).subscribe(res => {
          this.matchingDetails = res;
          $('.matching-details').removeClass('open');
          $('#matchingDetail-' + profileId).toggleClass('open');
        });


        // $detailsCloseBtn.on('click', function (e) {
        //   e.preventDefault();
        //   $detailsDiv.removeClass('open');
        // });
     // });
  }
  closeDetails(profileId) {
    $('#matchingDetail-' + profileId).removeClass('open');
  }
  ngOnInit() {
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
}
