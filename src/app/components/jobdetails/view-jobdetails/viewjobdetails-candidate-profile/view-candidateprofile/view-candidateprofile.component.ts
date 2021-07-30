import { Component, OnInit, Inject, ViewChild, ElementRef, ViewContainerRef, Output } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatPaginator } from "@angular/material";
import { ApiService } from "../../../../../shared/services/api.service/api.service";
import { Router, ActivatedRoute } from "@angular/router";
import { JobdetailsService } from "../../../jobdetails.service";
import { CloudData, CloudOptions } from "angular-tag-cloud-module";
import { HttpParams } from "@angular/common/http";
import * as Chart from "chart.js";
import { ChartsModule } from "ng2-charts";
import * as FileSaver from "file-saver";
import { ToastsManager, Toast } from "ng2-toastr/ng2-toastr";
import { saveAs } from "file-saver";
import { mappingdetails } from "./mappingdetails";
import { SettingsService } from "../../../../../../settings/settings.service";
import { DataService } from "angular2-multiselect-dropdown/lib/multiselect.service";
import { AppService } from "../../../../../app.service";
import { EventEmitter } from "events";
import { PageEvent, Sort } from "@angular/material";
import { RequestdialogComponent } from "../ManageReferences/RequestInfo/requestInfo.component";
declare var $: any;

// import { DialogData } from '../schedule-interview/schedule-interview.component';
export interface DialogData {
  animal: "panda" | "unicorn" | "lion";
}
@Component({
  selector: "app-view-candidateprofile",
  templateUrl: "./view-candidateprofile.component.html",
  styleUrls: ["./view-candidateprofile.component.css"],
  providers: [ApiService],
})
export class ViewCandidateprofileComponent implements OnInit {
  customer: any;
  customerId: any;
  userId: any;
  email: any;
  showMenu: boolean;
  jobStatus: any;
  skillfitcheck:any=[];
  showShortDesciption = true;
  checkPersonality:any=[];
  CulturalTestStatusNew: number = 0;
  profileview: any;
  aboutShow: any;
  aboutContent: any;
  FitDetails:any;
  MatchingPercentage: any;
  profileId: any;
  fileType = new Resume();
  fileExt: any;
  CandidateNotes: any = [];
  Match: any;
  details: mappingdetails;
  list: any;
  noTest: boolean = false;
  isPublicAvailable: boolean = false;
  otherSkills: any = [];
  hideme = [];
  options: CloudOptions = {
    // if width is between 0 and 1 it will be set to the size of the upper element multiplied by the value
    width: 0.8,
    height: 400,
    overflow: false,
    realignOnResize: true,
  };
  graphData: any[] = [];
  graphLabel: any[] = [];
  graphLabelList: LegendList[] = [];
  @ViewChild("testChart") testChart: ElementRef;
  @ViewChild("testChart1") testChart1: ElementRef;
  skilllist: any = [];

  chartOptions = {
    responsive: true,
    legend: {
      labels: {
        fontSize: 0,
      },
    },
  };

  chartData = [{ data: [330, 600, 260, 700, 200], label: "Account A" }];

  chartLabels = ["Openess to Experience", "Conscientiousness", "Extraversion", "Agreeableness", "Neuroticism"];
  private doughnutChartColors: any[] = [{ backgroundColor: ["#6569A9", "#3FB8B3", "#EC8885", "#666666", "#64A489"] }];
  radarChart: boolean = false;
  radarChartMenu: any = [];
  selectedMenuItem: any;
  menuHeading: any;
  smallRadarChartData = {
    labels: ["Job Fit", "Skill Fit",  "Culture Fit", "Personality Fit" ,"Team Fit"],
    datasets: [
      {
        label: "Arytic Fit",
        fill: true,
        backgroundColor: "rgb(54, 162, 235, 0.2)",
        borderColor: "#4472C4",
        pointBackgroundColor: "#4472C4",
        pointBorderColor: "#4472C4",
        pointHoverBackgroundColor: "#4472C4",
        borderWidth: 5,
        pointBorderWidth: 5,
        pointHoverBorderColor: "rgba(179,181,198,1)",
        data: [75, 100, 85, 60, 70],
      },
    ],
  };
  Job = {
    labels: ["Experience Fit", "Role Fit", "Job Hopping", "Education"],
    datasets: [
      {
        label: "Job Fit",
        fill: true,
        backgroundColor: "rgb(54, 162, 235, 0.2)",
        borderColor: "#4472C4",
        pointBackgroundColor: "#4472C4",
        pointBorderColor: "#4472C4",
        pointHoverBackgroundColor: "#4472C4",
        borderWidth: 5,
        pointBorderWidth: 5,
        pointHoverBorderColor: "rgba(179,181,198,1)",
        data: [],
      },
    ],
  };
  PersonalityFitLabels = {
    labels: []
  }
  PersonalityFit = {
    labels: [],
    datasets: [
      {
        label: "Personality Fit",
        fill: true,
        backgroundColor: "rgb(54, 162, 235, 0.2)",
        borderColor: "#4472C4",
        pointBackgroundColor: "#4472C4",
        pointBorderColor: "#4472C4",
        pointHoverBackgroundColor: "#4472C4",
        borderWidth: 5,
        pointBorderWidth: 5,
        pointHoverBorderColor: "rgba(179,181,198,1)",
        data: [],
      },
    ],
  };
  TeamFitLabels = {
    labels: ["Majestic","Artistic", "Unit", "Dev", "Energy"]
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
  Skill = {
    labels: [],
    datasets: [
      {
        label: "Skill Fit",
        data: [],
        
        backgroundColor: [
          "rgb(255, 99, 132, 0.7)",
          "rgb(75, 192, 192, 0.7)",
          "rgb(255, 205, 86, 0.7)",
          "rgb(201, 203, 207, 0.7)",
          "rgb(54, 162, 235, 0.7)",
        ],
      },
    ],
  };
  Team = {
    labels: ["Leader", "Member", "Manager"],
    datasets: [
      {
        label: "Team Fit",
        data: [300, 50, 100],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)"],
        hoverOffset: 4,
      },
    ],
  };
  Culture = {
    labels: ['Applicant Culture Fit','Company Culture Fit','CultureFit'],
    datasets: [
      {
        label: "Culture Fit",
        data: [],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)"],
        hoverOffset: 4,
      },
    ],
  };
  Personality = {
    labels: [],
    datasets: [
      {
        label: "Personality Fit",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(255, 159, 64, 0.8)",
          "rgba(255, 205, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(153, 102, 255, 0.8)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
        ],
        borderWidth: 1,
      },
    ],
  };

  showRes: boolean = false;
  ShowVer: boolean = false;
  showone: boolean = false;
  val1 = 0;
  val2 = 0;
  val3 = 0;
  val4 = 0;
  name: any;
  lname: any;
  subtotal: string;
  bgverification = new BackgroundVerification();
  Bglist: any = [];
  Dlist: any = [];
  addon = new addon();
  loading: boolean = false;
  usersList: any = [];
  Verification: BackgroundVerification;
  @Output() eventStat = new EventEmitter();

  salaryDetails: any;
  // addon = new addon();
  valueSal: number;
  TypeId: any;
  checkId: any = 0;
  sortingName: string;
  isDesc: boolean;
  isAsc: boolean;
  pageIndex: number = 0;
  pageSize: number = 10;
  lowValue: number = 0;
  highValue: number = 10;
  CommentProfile: any;
  CurrentTime: any;
  dateAgo: Date = new Date();
  dateYesterday: Date = new Date();
  pageSizeOptions: any;

  referenceUsersList: GetQuestionnarieAssignement[] = [];
  // MatPaginator Output
  pageEvent: PageEvent;
  sortedData;
  @ViewChild("paginator") paginator: MatPaginator;

  constructor(
    private dialogRef: MatDialogRef<ViewCandidateprofileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastsManager,
    private _vcr: ViewContainerRef,
    private settingsService: SettingsService,
    private _service: ApiService,
    private router: Router,
    private jobdetailsservice: JobdetailsService,
    private appService: AppService,
    private dialog: MatDialog
  ) {
    //this.preId = sessionStorage.getItem('Preid');
    this.customer = JSON.parse(sessionStorage.getItem("userData"));
    this.noTest = false;
    this.profileId = JSON.parse(sessionStorage.getItem("Preid"));
    this.jobStatus = this.data.jobStatus;

    this.GetBG();
    this.name = this.data.Name;
    this.lname = this.data.Lname;
    this.toastr.setRootViewContainerRef(_vcr);
    this.GetDrugVerification();
    this.GetBGTestResult();
    this.GetQuestionnariePersonsList();

    this.CurrentTime = new Date();
    this.dateYesterday = new Date(this.dateYesterday.setDate(this.dateYesterday.getDate() - 1));
    this.dateAgo = new Date(this.dateYesterday.setDate(this.dateYesterday.getDate() - 3));
    this.customerId = JSON.parse(sessionStorage.getItem("customerId"));

    this.showMenu = false;
  }

  GetMatchingPercentage(Pid, JId): any {
    this.jobdetailsservice.GetJobMatchingCriteriaEndPoint(Pid, JId).subscribe((res) => {
      this.Match = res;
      this.MatchingPercentage = res.Total_Match_Per;
    });
  }

  alterDescriptionText() {
    this.showShortDesciption = !this.showShortDesciption;
  }

  DownloadResume(val): void {
    this._service.GetService("ProfileAPI/api/GetResume?profileId=", this.data.ProfileId).subscribe((fileData) => {
      this.fileType = fileData;
      let exp = this.fileType.Url.split(".").pop();
      this.fileExt = exp;
      this.toastr.success("Downloading!", "Success!");
      setTimeout(() => {
        this.toastr.dismissToast;
      }, 3000);

      if (this.fileExt == "pdf") {
        let byteArr = this.base64ToArrayBuffer(fileData.ResumeFile);
        let blob = new Blob([byteArr], { type: "application/pdf" });
        FileSaver.saveAs(blob, val);
      } else if (this.fileExt == "doc" || this.fileExt == "docx") {
        var extension = ".doc";
        let byteArr = this.base64ToArrayBuffer(fileData.ResumeFile);
        let blob = new Blob([byteArr], { type: "application/pdf" });
        FileSaver.saveAs(blob, val + extension);
      }
    });
  }

  OpenCandidate(profileId, userId) {
    this.dialogRef.close();
    localStorage.setItem("cprofileId", profileId);
    localStorage.setItem("cuserId", userId);
    //this.router.navigateByUrl('/app-view-candidateprofile-detail');
    const url = this.customer.Defaulturl.Purl;
    //const url ='http://localhost:4200/app-view-candidateprofile-detail';
    window.open(url, "_blank");
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

  /*dashboard graph*/
  // public lineChartData: Array<any> = [
  //   {data: [1, 2, 2, 3, 3, 4, 5], label: 'ANGULAR'},
  //   {data: [4, 4, 4, 5, 5, 5, 5], label: '.NET'},
  //   {data: [3, 4, 2, 4, 3, 5, 4], label: 'AWS'}
  // ];
  // public lineChartLabels: Array<any> = ['2013', '2014', '2015', '2016', '2017', '2018', '2019'];
  // public lineChartOptions: any = {
  //   responsive: true
  // };

  // public lineChartColors: Array<any> = [
  //   {
  //     backgroundColor: 'rgba(172,154,249,0.2)',
  //     borderColor: 'rgba(172,154,249,1)',
  //     pointBackgroundColor: 'rgba(172,154,249,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(172,154,249,0.8)'
  //   },
  //   {
  //     backgroundColor: 'rgba(132,222,203,0.2)',
  //     borderColor: 'rgba(132,222,203,1)',
  //     pointBackgroundColor: 'rgba(132,222,203,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(132,222,203,1)'
  //   },
  //   {
  //     backgroundColor: 'rgba(231, 172, 243,0.2)',
  //     borderColor: 'rgba(231, 172, 243,1)',
  //     pointBackgroundColor: 'rgba(231, 172, 243,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(231, 172, 243,0.8)'
  //   }
  // ];
  // public lineChartLegend = true;
  // public lineChartType = 'line';
  /*#dashboard graph*/

  ngOnInit() {
    function cloudspan() {
      setTimeout(cloudAttr, 9000);
    }

    $(document).on('click touchend', function (e) {
			if (!$(".revamp__filter__sidebar__box .scroll-box > ul").is(e.target) && $(".revamp__filter__sidebar__box .scroll-box > ul").has(e.target).length == 0 && !$(".revamp__filter__sidebar__box .btn-filter").is(e.target) && $(".revamp__filter__sidebar__box .btn-filter").has(e.target).length == 0) {
				$('.revamp__filter__sidebar__box').removeClass('full');
				$('.revamp__filter__sidebar__box').removeClass('show');
				$('.revamp__filter__sidebar__box').removeClass('big');
				$('.data-grid-view').removeClass('open');
				$('.data-grid-table').removeClass('open');
				$('.sub__item').removeClass('active');
			}
		});

    function cloudAttr() {
      $(".word-cloud angular-tag-cloud span").each(function () {
        $(this).addClass("tooltip1");
        // $('<div class="tooltip fade top in">'+$( this ).text()+'</div>').appendTo( this );
        $(
          '<div class="tooltip fade bottom hover-active"><div class="tooltip-arrow"></div><div class="tooltip-inner">' +
            $(this).text() +
            "</div></div>"
        ).appendTo(this);
      });
    }
    cloudspan();
    this.GetCandidateSKills();
    this.GetProfileDetails();
    this.GetUserProfileInfo();
    this.GetJobNotes();
    this.GetCandidateJobFitResult();
    this.GetCandidateSkillFitResult();
    this._service.GetService("ProfileAPI/api/GetProfileStatus?profileId=", this.data.ProfileId).subscribe((data) => {
      var apiData = data;
      this.noTest = apiData.profileStatus;
      this.isPublicAvailable = apiData.isPublicAvailable;
      if (this.noTest) {
        this.GetCandidatePersonalityResult();
        this.GetCandidateCultureResult();
      }
    });
  }


  
  onChartClick(event) {
    console.log(event);
  }

  GetProfileDetails() {
    this._service
      .GetService("JobsAPI/api/GetUserInfoByProfileMapping?profileId=", this.data.ProfileId)
      .subscribe((data) => {
        this.details = data;
      });
  }

  GetCandidateSKills() {
    let params = new HttpParams();
    params = params.append("jobId", this.data.jobId);
    params = params.append("profileId", this.data.ProfileId);
    this._service.GetService("JobsAPI/api/GetCandidatePrimarySkillUpdated?", params).subscribe((datas) => {
      if (datas != "No records found") {
        this.skilllist = datas;
      } else {
        this.skilllist = [];
      }
    });
  }

  // GetCandidatePersonalityResult() {
  //   this._service.GetService("ProfileAPI/api/GetProfileEmail?profileId=", this.data.ProfileId).subscribe((email) => {
  //     this.email = email.UserName;
  //     this.jobdetailsservice.getPersonalityTest(this.email).subscribe((data) => {
  //       if (data.length === 0) {
  //         this.noTest = false;
  //         this.isPublicAvailable = false;
  //       }
  //       if (data.length > 0) {
  //         this.graphData = [];
  //         this.graphLabel = [];
  //         var userResponse = data;
  //         this.graphLabelList = [];

  //         var count = 0;
  //         if (this.testChart) {
  //           var testChartCanvas = this.testChart.nativeElement.getContext("2d");
  //           userResponse.forEach((a, index) => {
  //             this.graphData.push(a.response.toFixed(2));
  //             this.graphLabel.push(a.groupName);
  //             this.graphLabelList.push(new LegendList());
  //             this.graphLabelList[index].GroupLabel = a.groupName;
  //             this.graphLabelList[index].GroupPer = a.response.toFixed(2);
  //             this.noTest = true;
  //           });

  //           this.graphLabelList[0].GroupColor = "rgba(101,105, 169, 1)";
  //           this.graphLabelList[1].GroupColor = "rgba(63, 184, 179, 1)";
  //           this.graphLabelList[2].GroupColor = "rgba(236, 136, 133, 1)";
  //           this.graphLabelList[3].GroupColor = "rgba(235, 189, 78, 1)";
  //           this.graphLabelList[4].GroupColor = "rgba(100, 164, 137, 1)";

  //           var weekChart = new Chart(testChartCanvas, {
  //             type: "doughnut",
  //             options: {
  //               title: {
  //                 display: true,
  //                 text: "Personality Test Chart",
  //               },
  //               legend: {
  //                 display: false,
  //               },
  //             },
  //             data: {
  //               labels: this.graphLabel,
  //               render: "labels",
  //               datasets: [
  //                 {
  //                   labels: ["Red", "Yellow", "Blue", "pink", "black"],
  //                   label: "# of Votes",
  //                   data: this.graphData,
  //                   backgroundColor: [
  //                     "rgba(101,105, 169, 1)",
  //                     "rgba(63, 184, 179, 1)",
  //                     "rgba(236, 136, 133, 1)",
  //                     "rgba(235, 189, 78, 1)",
  //                     "rgba(100, 164, 137, 1)",
  //                   ],
  //                 },
  //               ],
  //             },
  //           });
  //         }
  //       } else {
  //         this.testChart1;
  //       }
  //     });
  //   });
  // }

  GetJobNotes() {
    this.jobdetailsservice
      .GetProfileNotes(this.data.ProfileId, this.data.jobId, this.customer.UserId)
      .subscribe((datr7) => {
        this.CandidateNotes = datr7;
      });
  }

  GetUserProfileInfo() {
    this._service.GetService("ProfileAPI/api/GetUserProfileInfo?profileId=", this.data.ProfileId).subscribe(
      (datas) => {
        this.profileview = datas;
        this.GetMatchingPercentage(this.data.ProfileId, this.data.jobId);

        // this.profileview.ProfileBasicInfo.Email = this.profileview.ProfileBasicInfo.Email.contains('Esolvit') ? '' : this.profileview.ProfileBasicInfo.Email;
        this.list = datas.ProfileSkillset.filter(
          (u) => (u.ExpInYears > 0 || u.ExpInMonths > 0) && u.ExpInYears != null && u.ExpInMonths != null
        );

        this.otherSkills = datas.ProfileSkillset.filter(
          (u) => (u.ExpInYears === 0 && u.ExpInMonths === 0) || (u.ExpInYears == null && u.ExpInMonths == null)
        );
      },
      (error) => {
        this._service.DebugMode(error);
      }
    );
  }

  GetCandidatePersonalityResult() {
    this._service.GetService("ProfileAPI/api/GetProfileEmail?profileId=", this.data.ProfileId).subscribe((email) => {
      this.email = email.UserName;
      this.jobdetailsservice.getPersonalityTest(this.email).subscribe((data) => {
        this.checkPersonality=data;
        if (data.length > 0) {
          data.forEach((a)=>
          {         
           this.PersonalityFit.labels.push(a.groupName);
           this.PersonalityFit.datasets[0].data.push(a.response.toFixed(2));
           this.PersonalityFitLabels.labels.push(a.groupName);
           this.Personality.datasets[0].data.push(a.response.toFixed(2));
          })             
        }
      });
    });
  }

  GetCandidateCultureResult() {
    this._service.GetService("ProfileAPI/api/GetProfileEmail?profileId=", this.data.ProfileId).subscribe((email) => {
      this.email = email.UserName;
      this._service.GetService('ProfileAPI/api/GetCultureFitReport?email=', this.email)
      .subscribe(
        data4 => {
          this.CulturalTestStatusNew = data4.Total; 
          if (data4!=null) {
             this.Culture.datasets[0].data = [data4.Valuematch,data4.Rankmatch,data4.Total];           
          }
        })
        
      });
  }

  GetCandidateJobFitResult() {
      this._service.GetService('ProfileAPI/api/GetJobFitDetailsInfo?profileId=', this.data.ProfileId + '&jobId=' + this.data.jobId)
      .subscribe(
        data2 => {
          if (data2!=null) {
            var exp;
              if(data2.ExperienceFit == null)
              {
               exp  = 0;
              }
              else
              {
                exp =  data2.ExperienceFit;
              }
             this.Job.datasets[0].data = [exp,data2.RoleFit,data2.JobHopping,data2.Education];           
          }
          this.FitDetails= data2.JobFit; 
       
        })
  }

  GetCandidateSkillFitResult() {
      this._service.GetService('ProfileAPI/api/GetSkillFitDetailsInfo?profileId=', this.data.ProfileId + '&jobId=' + this.data.jobId)
      .subscribe(
        data3 => {
          this.skillfitcheck = data3;
          if (data3.length > 0) {
            data3.forEach((a)=>
            {         
             this.Skill.labels.push(a.SkillName);
             this.Skill.datasets[0].data.push(a.SkillFit.toFixed(2));
            //  this.PersonalityFitLabels.labels.push(a.groupName);
            //  this.Personality.datasets[0].data.push(a.response.toFixed(2));
            })             
          }
        })
  }
  add3Dots(string, limit) {
    const dots = "...";
    if (string.length > limit) {
      string = string.substring(0, limit) + dots;
    }
    return string;
  }

  showRadarChart(type) {
    if (type == "radar") {
      this.menuHeading = "Arytic Fit";
      this.radarChartMenu = [
        { className: "icon__job__fit", label: "Job Fit" },
        { className: "icon__skill__fit", label: "Skill Fit" },
        { className: "icon__culture__fit", label: "Culture Fit" },
        { className: "icon__personality__fit", label: "Personality Fit" },
        { className: "icon__team__fit", label: "Team Fit" }
      ];
      this.selectedMenuItem = "Job Fit";
    } else {
      this.GetQuestionnariePersons(5);
      this.menuHeading = "Arytic Check";
      this.radarChartMenu = [
        { className: "icon__job__fit", label: "Reference Check" },
        { className: "icon__skill__fit", label: "Skills Verified" },
        { className: "icon__personality__fit", label: "Background Verified" },
      ];
      this.selectedMenuItem = type;
    }
    this.radarChart = !this.radarChart;
  }

  selectedItem(item) {
    this.selectedMenuItem = item;
  }

  getColor(arr, i) {
    return arr[i];
  }

  GetBG() {
    this.loading = true;
    this._service.GetService("IdentityAPI/api/GetBackgroundList", "").subscribe((data) => {
      this.loading = false;
      this.Bglist = data;
    });
  }

  GetDrugVerification() {
    this._service.GetService("IdentityAPI/api/GetDrugList", "").subscribe((data) => {
      this.Dlist = data;
    });
  }

  GetValues(val) {
    if (val == 1) {
      this.ShowVer = false;
    } else {
      this.ShowVer = true;
    }
  }

  GetBGTestResult() {
    this._service
      .GetService(
        "IdentityAPI/api/GetCandidateBackgroundVerification?profileId=" + this.data.ProfileId,
        "&jobId=" + this.data.JobId
      )
      .subscribe((data) => {
        this.Verification = data[0];
        if (this.Verification.ProfileId > 0) {
          this.ShowVer = true;
          this.bgverification.CriminalOptionSelected = this.Verification.CriminalOptionSelected;
          this.bgverification.DrugOptionSelected = this.Verification.DrugOptionSelected;
          this.bgverification.Education = this.Verification.Education;
          this.bgverification.Employment = this.Verification.Employment;
          this.subtotal = this.Verification.Price;
          this.bgverification.Certification = this.Verification.Certification;
          this.bgverification.Reference = this.Verification.Reference;
          this.bgverification.CriminalOption = this.Verification.CriminalOption;
          this.bgverification.DrugTest = this.Verification.DrugTest;
        } else {
          this.ShowVer = false;
          this.Verification = new BackgroundVerification();
        }
      });
  }

  SaveBgVerIfication() {
    this.bgverification.FromEmail = this.customer.Email;
    this.bgverification.ToEmailID = this.customer.Email;
    this.bgverification.Admin = this.customer.Email;
    this.bgverification.Candidate = this.data.Name;
    this.bgverification.CustUserName = this.customer.FirstName;
    this.bgverification.JobId = this.data.JobId;
    this.bgverification.Comment = "Requested Drug Test and Few Background Verification Process...";
    //debugger
    return this._service.PostService(this.bgverification, "EmailAPI/api/BackGroundVerification").subscribe((data) => {
      if (data >= 0) {
        this.toastr.success("Processing Request", "Success");
        this.eventStat.emit(null);
        this.appService.GetCustomerSubscription(this.data.CuserId).subscribe((res) => {
          if (res == null || res.subscriptionId == null) {
            this.toastr.warning("Access denied contact admin for arytic subscription!!", "Oops");
            //this.dialogRef.close();
            //this.GetBGTestResult();
          }
          if (res.subscriptionId != undefined && res.subscriptionId != null) {
            this.addon.SubscriptionId = res.subscriptionId;
            this.addon.AddonId = "2";
            this.addon.AddonUnitPrice = Number(this.subtotal);
            this.addon.AddonQuantity = 1;
            this.jobdetailsservice.AddonHirefee(this.addon).subscribe((result) => {
              console.log(result);
              this.toastr.success("Mail Sent", "Success");
              this.GetBGTestResult();
            });
            //this.dialogRef.close();
          }
          this.eventStat.emit(null);
        });
      }
    });
  }

  SaveBgG(val) {
    // if(val == 1)
    // {
    //   this.ShowVer = true;
    //   this.showone = false;
    // }
    // if(val == 2)
    // {
    //   this.showone = true;
    // }
    if (val == 3) {
      this.ShowVer = false;
    }
  }

  GetQuestionnariePersonsList() {
    this._service
      .GetService("ProfileAPI/api/GetQuestionnaireAssignmentNew?userId=" + this.data.UserId, "&showId=0")
      .subscribe((data) => {
        this.usersList = data;
      });
  }

  SaveBg(val) {
    if (this.bgverification.CriminalOptionSelected > 0) {
      this.bgverification.CriminalOption = true;
      this.val1 = 49.99;
    }
    if (this.bgverification.CriminalOptionSelected === 0) {
      this.bgverification.CriminalOption = false;
      this.val1 = 0;
    }
    if (this.bgverification.DrugOptionSelected > 0) {
      this.bgverification.DrugTest = true;
      this.val2 = 49.99;
    }
    if (this.bgverification.DrugOptionSelected === 0) {
      this.bgverification.DrugTest = false;
      this.val2 = 0;
    }
    if (this.bgverification.Education === true) {
      this.val3 = 39.99;
    }
    if (this.bgverification.Education === false) {
      this.val3 = 0;
    }
    if (this.bgverification.Certification === true) {
      this.val4 = 69.99;
    }
    if (this.bgverification.Certification === false) {
      this.val4 = 0;
    }
    const total = (this.val1 + this.val2 + this.val3 + this.val4).toFixed(2);
    this.subtotal = total.toString();
    this.bgverification.Price = this.subtotal;
    this.bgverification.ProfileId = this.data.ProfileId;
    this.bgverification.JobId = this.data.JobId;
    this.bgverification.CustomerUserId = this.data.CuserId;
    if (val == 1) {
      this.ShowVer = false;
      this.showRes = false;
    }
    if (val == 3) {
      this.showRes = true;
      this.SaveBgVerIfication();
    }
    if (val == 2) {
      if (this.bgverification.DrugTest == null || this.bgverification.DrugOptionSelected == 0) {
        this.toastr.warning("Please Choose Drug Test", "Oops");
        return false;
      } else {
        this.showRes = true;
      }
    }
  }

  sort(name: string) {
    if (name && this.sortingName !== name) {
      this.isDesc = false;
    } else {
      this.isDesc = !this.isDesc;
    }
    this.sortingName = name;
  }

  sortData(sort: Sort) {
    const data = this.referenceUsersList.slice();
    if (!sort.active || sort.direction == "") {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction == "asc";
      switch (sort.active) {
        case "FullName":
          return compare(a.FullName, b.FullName, isAsc);
        case "Referrer Details":
          return compare(+a.KnownOrWorkedAt, +b.KnownOrWorkedAt, isAsc);
        // case 'fat': return compare(+a.KnownOrWorkedAt, +b.KnownOrWorkedAt, isAsc);
        // case 'carbs': return compare(+a.carbs, +b.carbs, isAsc);
        // case 'protein': return compare(+a.protein, +b.protein, isAsc);
        default:
          return 0;
      }
    });
  }

  GetQuestionnariePersons(Id) {
    this.checkId = Id;
    //debugger
    console.log(this.data.UserId, Id);
    this._service
      .GetService("ProfileAPI/api/GetQuestionnaireAssignmentNew?userId=" + this.data.UserId, "&showId=" + Id)
      .subscribe((data) => {
        console.log(data);
        if (data != "No records found") {
          this.referenceUsersList = data;
          if (this.referenceUsersList.length > 10) {
            this.paginator.previousPage();
            this.paginator.pageIndex = 0;
          }
        } else {
          this.referenceUsersList = [];
          this.paginator.pageIndex = 0;
        }
      });
  }

  OpenRequestDialog(company, Id) {
    const AdialogRef = this.dialog.open(RequestdialogComponent, {
      width: "450px",
      height: "200px",
      position: { right: "180px", top: "150px" },

      data: {
        ProfileId: this.data.profileId,
        CompanyName: company,
        Email: this.data.Email,
        FirstName: this.data.FirstName,
        Qid: Id,
        // status : this.statusid
      },
    });
    AdialogRef.afterClosed().subscribe((result) => {
      // this.jobDetails.populateJobsStaticInfo(this.jobid);
      //this.myEvent.emit(null);
      console.log("hire Dialog result: ${result}");
    });
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
export class BackgroundVerification {
  CustomerUserId: number;
  ProfileId: number;
  JobId: number;
  CriminalOption: boolean;
  CriminalOptionSelected: number;
  DrugOptionSelected: number;
  DrugTest: boolean;
  Employment: boolean;
  Education: boolean;
  Certification: boolean;
  Reference: boolean;
  Price: string;
  ToEmailID: string;
  FromEmail: string;
  CustUserName: string;
  Comment: string;
  Admin: string;
  Candidate: string;
}

export class addon {
  SubscriptionId: string;
  AddonId: string;
  AddonUnitPrice: number;
  AddonQuantity: number;
}

export class LegendList {
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
export class CandidateReferenceDetails {
  //constructor(
  public QuestionId: number;
  public Answer: string;
  // ) { }
}
export class GetQuestions {
  constructor(
    public Id: number,
    public Question: string,
    public QuestionTypeId: number,
    public QuestionType: string,
    public Answers: string,
    public ModifiedAnswers: string
  ) {}
}
export class InsertReferences {
  constructor(
    public CandidateReferenceId: number = 0,
    public ListCandidateReferenceDetails: CandidateReferenceDetails[] = []
  ) {}
}
export class GetQuestionnarieAssignement {
  constructor(
    public QuestionnaireAssignmentId: number,
    public QuestionnaireId: number,
    public FullName: string,
    public KnownOrWorkedAt: string,
    public InYear: number,
    public Location: string,
    public Comments: string,
    public IsPublish: boolean,
    public RequestedTo: string,
    public RequestedById: number,
    public RequestedBySourceId: number,
    public StatusId: number,
    public ReferenceStatus: string,
    public Code: string
  ) {}
}

export class GetQuestionnarieResponse {
  constructor(
    public QuestionnaireId: number,
    public QuestionId: number,
    public ResponseId: number,
    public Question: string,
    public Response: string,
    public ResponseValue: string
  ) {}
}

export class RequestRefernce {
  public ToEmailID: string;
  public CustomerId: number;
  public UserId: number;
  public ProfileId: number;
  public UserName: string;
  public AppLink: string;
  public FromEmail: string;
  public CompanyName: string;
  public Comment: string;
}
