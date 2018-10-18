import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { JobdetailsService } from '../../jobdetails.service';
import { ChatboxdialogComponent } from './chatboxdialog/chatboxdialog.component';
import { SharedialogComponent } from './sharedialog/sharedialog.component';
import { RejectdialogComponent } from './rejectdialog/rejectdialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { JobdetailsProfile } from '../../models/jobdetailsprofile';
import {MatchingDetails} from '../../models/matchingDetails';
import { ScheduleInterviewComponent } from './schedule-interview/schedule-interview.component';
declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-viewjobdetails-candidate-profile',
  templateUrl: './viewjobdetails-candidate-profile.component.html',
  styleUrls: ['./viewjobdetails-candidate-profile.component.css']
})
export class ViewjobdetailsCandidateProfileComponent implements OnInit {
  viewchatboxdialogueref: MatDialogRef<ChatboxdialogComponent>;
  viewshareddialogueref: MatDialogRef<SharedialogComponent>;
  viewscheduleInterviewDialgoref : MatDialogRef<ScheduleInterviewComponent>;
   jobdetailsprofiles: JobdetailsProfile[] = [];
   matchingDetails: MatchingDetails;
   customerId: any;
   userId: any;
  @Input() jobid: number;
  @Input() statusid: number;
 // @Input() jobdetailsprofiles: JobdetailsProfile[] = [];
  constructor(private router: Router, private jobdetailsservice: JobdetailsService,
    private dialog: MatDialog) {
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

  OpenRejectDialog() {
    const rejectdialogRef = this.dialog.open(RejectdialogComponent,

      {

        data: {
          animal: 'panda'
        }
      }
    );

    rejectdialogRef.afterClosed().subscribe(result => {
      console.log('reject Dialog result: ${result}');
    });
  }

  OpenScheduleInterviewDialog() {
    const scheduleIntwdialogRef = this.dialog.open(SharedialogComponent,

      { 
        width: '250px',
        data: {
          animal: 'panda'
        }
      }
    );

    scheduleIntwdialogRef.afterClosed().subscribe(result => {
      console.log('Chatbox Dialog result: ${result}');
    });
  }
  GetCandidateProfile(profileId)
  {
    sessionStorage.setItem('profileId', JSON.stringify(profileId));
    this.router.navigateByUrl('app-cprofile');
  }
  PopulateJobdetailProfiles (customerId, userid, jobid, statusid, pageNumber=6) {
    if (jobid != null && statusid != null) {
      this.jobid = jobid;
      this.statusid = statusid;
    }
    if (this.statusid === 15) {
      return this.jobdetailsservice.getJobDetailsSuggestedProfileInfo(this.customerId, this.userId, this.jobid).subscribe(res => {
        this.jobdetailsprofiles = res;
      });
    } else {
    return this.jobdetailsservice.getJobDetailsProfileInfo(this.customerId, this.userId, this.jobid, this.statusid, pageNumber).subscribe(res => {
      this.jobdetailsprofiles = res;
    });
  }
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
    (function ($) {
      $('#cultural-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        navText: ['<span class="icon-down-arrow"><img src="/images/slider-nav-right.png" alt=""></span>', '<span class="icon-down-arrow"><img src="/images/slider-nav-right.png" alt=""></span>'],
        responsive: {
          0: {
            items: 3
          },
          600: {
            items: 3
          },
          1000: {
            items: 6
          }
        }
      });

      $('.skills-carousel').owlCarousel({
        loop: true,
        margin: 15,
        nav: true,
        navText: ['<img src="/images/left-chev.svg" alt="">', '<img src="/images/right-chev.svg" alt="">'],
        0: {
          items: 2
        },
        600: {
          items: 3
        }
      });
    });
    this.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, this.statusid);
    console.log('abc');
  }
  ngOnChange() {
    console.log('on change', this.jobid, this.statusid);
  }
}
