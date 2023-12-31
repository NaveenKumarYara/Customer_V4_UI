import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { JobdetailsService } from '../../../jobdetails.service';
import { CloudOptions } from 'angular-tag-cloud-module';
import { HttpParams } from '@angular/common/http';
import * as Chart from 'chart.js'
import * as FileSaver from 'file-saver';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Location } from '@angular/common';
import { mappingdetails } from '../../../view-jobdetails/viewjobdetails-candidate-profile/view-candidateprofile/mappingdetails';
import { ApiService } from '../../../../../shared/services';
declare var $: any;
@Component({
  selector: 'app-view-candidateprofile-detail',
  templateUrl: './view-candidateprofile-detail.component.html',
  styleUrls: ['./view-candidateprofile-detail.component.css'],
  providers: [ApiService]
})
export class ViewCandidateprofileDetailComponent implements OnInit {
  customer: any;
  customerId: any;
  cultureresults: any = [];
  userId: any;
  hideme = [];
  check = 0;
  email: any;
  Rating: profileRating;
  startPage: number;
  jobHistory = new CandidateDetailsHistory();
  paginationLimit: number;
  stroke: number = 15;
  radius: number = 125;
  groupId: any = 0;
  list: any = [];
  otherSkills: any = [];
  show: boolean = false;
  profileStatistics: any;
  start: number;
  pagination: number;
  CulturalTestStatusNew: number = 0;
  suggestedSkill: any = [];
  skillLimit: any = [];
  videoUrl: videoUrl;
  /*rouded progress bar*/
  semicircle: boolean = false;
  isPublicAvailable1: boolean = false;
  isMore: boolean = false;
  isMoreSkill = 10;
  isMoreOption = 10;
  moreShow: boolean = false;
  rounded: boolean = false;
  responsive: boolean = false;
  clockwise: boolean = true;
  profExperience: any = [];
  color: string = '#448AFA';
  background: string = '#eaeaea';
  duration: number = 800;
  animation: string = 'easeOutCubic';
  animationDelay: number = 0;
  animations: string[] = [];
  realCurrent: number = 0;
  profileview: any;
  profileId: any;
  cuserId: any;
  jobId: any;
  fileType = new Resume();
  fileExt: any;
  details: mappingdetails;
  noTest: boolean = false;
  usersList: any = [];
  isPublicAvailable: boolean = false;
  options: CloudOptions = {
    // if width is between 0 and 1 it will be set to the size of the upper element multiplied by the value
    width: 0.8,
    height: 400,
    overflow: false,
    realignOnResize: true,
  };
  graphData: any[] = [];
  graphLabel: any[] = [];
  graphDataCult: any[] = [];
  graphLabelCult: any[] = [];
  graphLabelList: LegendList[] = [];
  graphLabelList1: LegendList[] = [];
  @ViewChild('testChart') testChart: ElementRef;
  @ViewChild('testChart1') testChart1: ElementRef;
  @ViewChild('testChart9') testChart9: ElementRef;
  skilllist: any;
  companyName:String;
  currentSlide = 1;
  maxSlide = 2;
  isPersonality: boolean = false;
  isCulture: boolean = false;

  chartOptions = {
    responsive: true,
    legend: {
      labels: {
        fontSize: 0
      }
    },
  };

  TeamFitLabels = {
    labels: ["Majestic", "Artistic", "Unit", "Dev", "Energy"]
  }
  TeamFit = {
    labels: ["M", "A", "U", "D", "E"],
    datasets: [
      {
        label: "Team Fit",
        fill: true,
        backgroundColor: "rgb(54, 162, 235, 0.2)",
        borderColor: "#4472C4",
        pointBackgroundColor: "#4472C4",
        pointBorderColor: "#4472C4",
        pointHoverBackgroundColor: "#4472C4",
        borderWidth: 5,
        pointBorderWidth: 5,
        pointHoverBorderColor: "rgba(179,181,198,1)",
        data: [75, 30, 85, 60, 40],
      },
    ],
  };
  chartData = [
    { data: [330, 600, 260, 700, 200], label: 'Account A' },
  ];

  chartLabels = ['Openess to Experience', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Neuroticism'];
  private doughnutChartColors: any[] = [{ backgroundColor: ["#6569A9", "#3FB8B3", "#EC8885", "#666666", "#64A489"] }];
  alist: any = [];
  showMaskedData: boolean;
  constructor(private toastr: ToastsManager, private _vcr: ViewContainerRef,private _location: Location,
    private _service: ApiService, private router: Router, private jobdetailsservice: JobdetailsService) {
    //this.preId = sessionStorage.getItem('Preid');
    this.noTest = false;
    this.startPage = 0;
    this.paginationLimit = 5;
    this.skillLimit = 5;
    this.start = 0;
    this.pagination = 5;
    this.customer = JSON.parse(sessionStorage.getItem("userData"));
    this.profileId = localStorage.getItem('cprofileId');
    this.cuserId = localStorage.getItem('cuserId'); 

    this.CheckDesc(0);
  }

  showMore() {
    this.isMore = !this.isMore;
  }

  showMoreskill() {
    this.isMoreSkill += 10;
  }

  showMoreoptional() {
    this.isMoreOption += 10;
  }

  backcheck() {
    if(localStorage.getItem('checku')!= null)
    {
      localStorage.removeItem('checku');
      this.router.navigateByUrl('/search');
    }
    else
    {
      $("#activeMyjob").addClass('active');
      let jobactive= true;
      localStorage.setItem('jobactive', JSON.stringify(jobactive));
      this.router.navigateByUrl('/app-view-jobdetails');
    }
  
  }

  moreContent() {
    this.moreShow = !this.moreShow;
  }

  CheckDesc(i) {
    this.check = i;
  }

  personalityClick() {
    this.isPersonality = true;
    this.isCulture = false;
  }

  populateCompanyProfile() {
    return this.jobdetailsservice.getCompanyProfile(this.customer.CustomerId).subscribe(res => {
      this.companyName = res.CompanyName;
    });
}


  GetCandidateCultureResult() {
    this._service.GetService("ProfileAPI/api/GetProfileEmail?profileId=", this.profileId).subscribe((email) => {
      this.email = email.UserName;
      this._service.GetService('ProfileAPI/api/GetCultureFitReport?email=', this.email)
        .subscribe(
          data4 => {
            this.CulturalTestStatusNew = data4.Total;
            this.cultureresults = data4;
            // if (data4!=null) {
            //    this.Culture.datasets[0].data = [data4.Valuematch,data4.Rankmatch,data4.Total];           
            // }
          })

    });
  }


  GetCandidateJobHistory() {
    this._service.GetService("ProfileAPI/api/GetCandidateDetailHistrory?profileId=", this.profileId + '&customerId=' + this.customer.CustomerId).subscribe((info) => {
      this.jobHistory = info;
    });
  }

  cultureClick() {
    this.isPersonality = false;
    this.isCulture = true;
  }

  closeSkills() {
    this.isCulture = false;
    this.isPersonality = false;
  }
  Logout() {
    sessionStorage.removeItem('userData');
    sessionStorage.clear();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  DownloadResume(val): void {
    this._service.GetService('ProfileAPI/api/GetResume?profileId=', this.profileId)
      .subscribe(fileData => {
        this.fileType = fileData;
        let exp = this.fileType.Url.split('.').pop();
        this.fileExt = exp;
        this.toastr.success('Downloading!', 'Success!');
        setTimeout(() => {
          this.toastr.dismissToast;
        }, 3000);

        if (this.fileExt == 'pdf') {
          let byteArr = this.base64ToArrayBuffer(fileData.ResumeFile);
          let blob = new Blob([byteArr], { type: 'application/pdf' });
          FileSaver.saveAs(blob, val);
        }
        else if (this.fileExt == 'doc' || this.fileExt == 'docx') {
          var extension = '.doc';
          let byteArr = this.base64ToArrayBuffer(fileData.ResumeFile);
          let blob = new Blob([byteArr], { type: 'application/pdf' });
          FileSaver.saveAs(blob, val + extension);
        }
      });



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

  ngOnInit() {
    let profileData = JSON.parse(sessionStorage.getItem('selectedProfile'));
    this.GetProfileDetails();
    this.GetUserProfileInfo();
    this.populateCompanyProfile();
    this.GetProfileRating();
    this.GetCandidateJobHistory();
    this.GetCandidateCultureResult();
    this.GetExperience();
    this.GetVideo();
    this.GetAchivements();
    this.GetCandidateProfileStatistics();
    this.showMaskedData = (profileData.ResponseStatusId <= 4 || profileData.ResponseStatusId == 8) &&  profileData.UserId > 0 && profileData.IsConfirmed == null;
    if (sessionStorage.getItem('redirect') != null) {
      $('.nav-pills a[href="#' + 'detailView' + '"]').tab('show');
      sessionStorage.removeItem('redirect');

    }
    this.getOverlayStyle();

    function cloudspan() {
      setTimeout(cloudAttr, 9000);
    }

    function cloudAttr() {
      $(".word-cloud angular-tag-cloud span").each(function () {
        $(this).addClass("tooltip1")
        $('<div class="tooltip fade bottom hover-active"><div class="tooltip-arrow"></div><div class="tooltip-inner">' + $(this).text() + '</div></div>').appendTo(this);
      });
    }
    cloudspan();

    $(document).ready(function () {
      $('.history__container .main__history').each(function () {
        $(this).click(function () {
          $('.history__container .main__history').removeClass('active');
          if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $('.experience__slide').removeClass('active');
            $('#' + $(this).data('id')).addClass('active');
          }
        })
      });
    })
  }

  onChartClick(event) {
    console.log(event);
  }
  getOverlayStyle() {
    let isSemi = this.semicircle;
    let transform = (isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

    return {
      'top': isSemi ? 'auto' : '50%',
      'bottom': isSemi ? '5%' : 'auto',
      'left': '50%',
      'transform': transform,
      '-moz-transform': transform,
      '-webkit-transform': transform,
      'font-size': this.radius / 3.5 + 'px'
    };
  }
  GetVideo() {
    this._service.GetService('ProfileAPI/api/GetCandidateVideo?userId=', this.cuserId)
      .subscribe(
        data => {
          this.videoUrl = data[0];
        });
  }



  GetExperience() {
    this._service.GetService("ProfileAPI/api/GetExperience?profileId=", this.profileId + "&freeLance=false")
      .subscribe(
        (profExp) => {
          this.profExperience = profExp;
        }
      );

  }

  Check() {
    this._service.GetService('ProfileAPI/api/GetProfileStatus?profileId=', this.profileId).subscribe(
      data => {
        var apiData = data;
        this.noTest = apiData.profileStatus;
        this.isPublicAvailable = apiData.isPublicAvailable;
        if (this.noTest) {
          this.GetCandidatePersonalityResult();
          this.GetCultGraph();
        }
      });
  }


  GetProfileDetails() {
    this._service.GetService('JobsAPI/api/GetUserInfoByProfileMapping?profileId=', this.profileId).subscribe(
      data => {
        this.details = data;
        this.Check();
      })
  }

  GetCandidateSKills() {

    let params = new HttpParams();
    params = params.append('jobId', this.jobId);
    params = params.append('profileId', this.profileId);
    this._service.GetService('JobsAPI/api/GetCandidatePrimarySkillUpdated?', params).subscribe(
      data => {
        this.skilllist = data;
      })
  }



  GetCultGraph() {
    this.show = true;
    this._service.GetService('ProfileAPI/api/GetProfileEmail?profileId=', this.profileId).subscribe(
      email => {
        this.email = email.UserName;
        // var mail = this.candidateDetails.mail;
        this._service.GetService('QuestionAPI/api/QuestionnaireResult/GetCulturalGraphDetails?mail=', this.email)
          .subscribe(
            data => {
              if (data.length === 0) {
                this.isPublicAvailable1 = false;
              }
              if (data.length > 0) {
                this.isPublicAvailable1 = true;
                this.graphData = [];

                var userResponsedata = data;

                var count = 0;
                this.graphLabelList1 = [];

                if (this.testChart9) {

                  var testChart9Canvas = this.testChart9.nativeElement.getContext('2d');
                  this.graphLabelCult = [];
                  this.graphDataCult = [];
                  userResponsedata[0].questionnaireResultList.forEach((b, index) => {
                    var value = (b.response / (3 * 16)) * 100
                    this.graphDataCult.push(value);
                    this.graphLabelCult.push(b.groupName);
                    this.graphLabelList1.push(new LegendList());
                    //this.graphLabelList[index].GroupId = (b.questionnaireGroupId);
                    this.graphLabelList1[index].GroupLabel = (b.groupName);
                    this.graphLabelList1[index].GroupPer = (value.toFixed(2));
                  })
                  this.graphLabelList1[0].GroupColor = ('rgba(101,105, 169, 1)');
                  this.graphLabelList1[1].GroupColor = ('rgba(63, 184, 179, 1)');
                  this.graphLabelList1[2].GroupColor = ('rgba(236, 136, 133, 1)');
                  this.graphLabelList1[3].GroupColor = ('rgba(235, 189, 78, 1)');
                  var weekChart = new Chart(testChart9Canvas, {
                    type: 'doughnut',
                    options: {
                      title: {
                        display: true,
                        text: "Cultural Test Chart"
                      },
                      legend: {
                        display: false,
                      },
                    },
                    data: {
                      labels: this.graphLabelCult,// ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
                      render: 'labels',
                      datasets: [{
                        labels: [
                          'Red',
                          'Yellow',
                          'Blue',
                          'pink',
                          'black'
                        ],
                        label: '# of Votes',
                        data: this.graphDataCult,
                        backgroundColor: [
                          'rgba(101,105, 169, 1)',
                          'rgba(63, 184, 179, 1)',
                          'rgba(236, 136, 133, 1)',
                          'rgba(235, 189, 78, 1)',
                          'rgba(100, 164, 137, 1)'
                        ],

                      }
                      ]
                    }
                  });
                }
              }
            });
      })
    // this.CulturalResponse.forEach(a=>a.)
    // QuestionnaireAssignment
  }

  GetAchivements() {
    this._service.GetService('ProfileAPI/api/GetCandidateAchievementList?profileId=', this.profileId).subscribe(
      data => {
        this.alist = data;
      }
    )
  }

  GetQuestionnariePersonsList(Ud) {
    this._service.GetService('ProfileAPI/api/GetQuestionnaireAssignmentNew?userId=' + Ud, '&showId=5')
      .subscribe(
        data => {
          if (data != "No records found") {
            this.usersList = data;
          }
          else {
            this.usersList = [];
          }


        });
  }

  GetCandidatePersonalityResult() {
    this.show = false;
    this._service.GetService('ProfileAPI/api/GetProfileEmail?profileId=', this.profileId).subscribe(
      email => {
        this.email = email.UserName;
        this.jobdetailsservice.getPersonalityTest(this.email).subscribe(
          data => {
            if (data.length === 0) {
              this.noTest = false;
              this.isPublicAvailable = false;
            }
            if (data.length > 0) {
              this.graphData = [];
              this.graphLabel = [];
              var userResponse = data;
              this.graphLabelList = [];

              var count = 0;
              if (this.testChart) {
                var testChartCanvas = this.testChart.nativeElement.getContext('2d');
                userResponse.forEach((a, index) => {
                  this.graphData.push(a.response.toFixed(2));
                  this.graphLabel.push(a.groupName);
                  this.graphLabelList.push(new LegendList());
                  this.graphLabelList[index].GroupLabel = (a.groupName);
                  this.graphLabelList[index].GroupPer = (a.response.toFixed(2));
                  this.noTest = true;
                });

                this.graphLabelList[0].GroupColor = ('rgba(101,105, 169, 1)');
                this.graphLabelList[1].GroupColor = ('rgba(63, 184, 179, 1)');
                this.graphLabelList[2].GroupColor = ('rgba(236, 136, 133, 1)');
                this.graphLabelList[3].GroupColor = ('rgba(235, 189, 78, 1)');
                this.graphLabelList[4].GroupColor = ('rgba(100, 164, 137, 1)');

                var weekChart = new Chart(testChartCanvas, {
                  type: 'doughnut',
                  options: {
                    title: {
                      display: true,
                      text: "Personality Test Chart"
                    },
                    legend: {
                      display: false,
                    },
                  },
                  data: {
                    labels: this.graphLabel,
                    render: 'labels',
                    datasets: [{
                      labels: [
                        'Red',
                        'Yellow',
                        'Blue',
                        'pink',
                        'black'
                      ],
                      label: '# of Votes',
                      data: this.graphData,
                      backgroundColor: [
                        'rgba(101,105, 169, 1)',
                        'rgba(63, 184, 179, 1)',
                        'rgba(236, 136, 133, 1)',
                        'rgba(235, 189, 78, 1)',
                        'rgba(100, 164, 137, 1)'
                      ],

                    }
                    ]
                  }
                });
              }
            }
            else {
              this.testChart1;
            }
          })
      })
  }

  //   GetUserProfileInfo() {
  //     this._service.GetService('ProfileAPI/api/GetUserProfileInfo?profileId=', this.data.ProfileId).subscribe(
  //       datas => {
  //         this.profileview = datas;
  //         // this.profileview.ProfileBasicInfo.Email = this.profileview.ProfileBasicInfo.Email.contains('Esolvit') ? '' : this.profileview.ProfileBasicInfo.Email;
  //         this.list = datas.ProfileSkillset.filter(u => (u.ExpInYears > 0 || u.ExpInMonths > 0)
  //           && (u.ExpInYears != null && u.ExpInMonths != null));

  //         this.otherSkills = datas.ProfileSkillset.filter(u => (u.ExpInYears === 0 && u.ExpInMonths === 0)
  //           || (u.ExpInYears == null && u.ExpInMonths == null));

  //       }, error => {
  //         this._service.DebugMode(error);
  //       });
  //   }

  GetProfileRating() {
    this._service.GetService('IdentityAPI/api/GetCandidateProfileCompletenessByProfileId?profileId=', this.profileId)
      .subscribe(
        data => {
          this.Rating = data;
        }, error => { this._service.DebugMode(error); });
  }


  GetUserProfileInfo() {
    this._service.GetService('ProfileAPI/api/GetUserProfileInfo?profileId=', this.profileId).subscribe(
      datas => {
        this.profileview = datas;

        if (datas !== null) {
          var contentVal = this.profileview.ProfileBasicInfo.AboutMe;
          var showChar = 250;  // How many characters are shown by default
          var ellipsestext = "";
          var moretext = "Show less >";
          var lesstext = "Show more";


          //$('.more').each(function () {
          var content = contentVal;// $(this).html();
          if (content.length > showChar) {
            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);

            var html = c + '<span class="moreellipses">' + ellipsestext + '</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';

            $('.more,.moreDetails').html(html);
          }

          // });
          if ($('.morelink').hasClass("less")) {
            $('.morelink').removeClass("less");
            $('.morelink').html(moretext);
          } else {
            $('.morelink').addClass("less");
            $('.morelink').html(lesstext);
          }
          $('.morelink').parent().prev().toggle();
          $('.morelink').prev().toggle();
          $(".morelink").click(function () {
            if ($(this).hasClass("less")) {
              $(this).removeClass("less");
              $(this).html(moretext);
            } else {
              $(this).addClass("less");
              $(this).html(lesstext);
            }
            $(this).parent().prev().toggle();
            $(this).prev().toggle();
            return false;
          });
          this.list = datas.ProfileSkillset.filter(u => (u.ExpInYears > 0 || u.ExpInMonths > 0)
            && (u.ExpInYears != null && u.ExpInMonths != null));
          this.otherSkills =
            datas.ProfileSkillset.filter(u => (u.ExpInYears === 0 && u.ExpInMonths === 0)
              || (u.ExpInYears == null && u.ExpInMonths == null));
        }
        this.GetQuestionnariePersonsList(datas.ProfileBasicInfo.UserId);

      }, error => {
        this._service.DebugMode(error);
      });


  }

  GetCandidateProfileStatistics() {
    this._service.GetService('IdentityAPI/api/GetCandidateProfileCounts?profileId=', this.profileId)
      .subscribe(
        data => {
          this.profileStatistics = data;
        }, error => {
          this._service.DebugMode(error);
        });
  }
  add3Dots(string, limit) {
    const dots = '...';
    if (string.length > limit) {
      string = string.substring(0, limit) + dots;
    }
    return string;
  }

  // ngOnDestroy() {
  //   localStorage.removeItem('cprofileId');
  //   localStorage.removeItem('cjobid');
  //   localStorage.removeItem('cuserId');
  //   localStorage.removeItem('checku');
  // }

}

export class LegendList {
  GroupId: Number;
  GroupLabel: string;
  GroupColor: string;
  GroupPer: string;
  groupName: any;
  response: any;
}

export class Resume {
  ResumeId: number;
  ProfileId: number;
  Url: string;
  ResumeFile: string;
}
export class profileRating {
  ProfilePercentage: number;
  Skills: boolean;
  Experience: boolean;
  Domain: boolean;
  Education: boolean;
  Certification: boolean;
  SkillCount: string;
}

export class videoUrl {
  VideoURL: string;
}


export class CandidateDetailsHistory {
  AppliedHistory: any = [];
  ScheduledHistory: any = [];
  InterviewHistory: any = [];
  InProgressHistory: any = [];
  MatchingHistory: any = [];
}