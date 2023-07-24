import { Component, OnInit, ViewContainerRef, Input, ViewChild, Output, EventEmitter, ElementRef } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { JobdetailsService } from "../../jobdetails.service";
import { AppService } from "../../../../app.service";
import { ChatboxdialogComponent } from "./chatboxdialog/chatboxdialog.component";
import { SharedialogComponent } from "./sharedialog/sharedialog.component";
import { RejectdialogComponent } from "./rejectdialog/rejectdialog.component";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { JobdetailsProfile, MatchingParameterDetails } from "../../models/jobdetailsprofile";
import { AlertService } from "../../../../shared/alerts/alerts.service";
import * as Chart from "chart.js";
import { MatchingDetails } from "../../models/matchingDetails";
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ScheduleInterviewComponent, ScheduleInterview } from "./schedule-interview/schedule-interview.component";
import { VideoSizzle, GetVideoProfile } from "../../models/VideoProfile";
import { ViewCandidateprofileComponent } from "./view-candidateprofile/view-candidateprofile.component";
import { SendEmailComponent } from "./send-email/send-email.component";
import { ParentComponentApi } from "../view-jobdetails.component";
import { ApiService } from "../../../../shared/services/api.service";
import { UniqueMonthYearPipe } from "./../months.pipe";
import * as FileSaver from "file-saver";
import { saveAs } from "file-saver";
import { SettingsService } from "../../../../../settings/settings.service";
import { ToastsManager, Toast } from "ng2-toastr/ng2-toastr";
import { HiredialogComponent } from "./Hiringdialog/hire.component";
import { AchivementdialogComponent } from "./Achivements/achivement.component";
import { ReferencedialogComponent } from "./ManageReferences/manageref.component";
import { backgrounddialogComponent } from "./BackgroundVerification/bg.component";
import { GetJobDetailCustomer } from "../../../../../models/GetJobDetailCustomer";
import { screeningdialogComponent } from "./screening/screening.component";
import { shortlisteddialogComponent } from "./ShortListed/shortlisted.component";
import { WithDrawndialogComponent } from "./Withdrawn/withdrawn.component";
import { sendnotificationdialogComponent } from "./SendNotification/sendnotification.component";
import { CustomerSubscription } from '../../../../../models/CustomerSubscription';
import { GetSubscriptionDetails } from '../../../../../models/GetSubscriptionDetails';
import swal from 'sweetalert2';
import * as _html2canvas from "html2canvas";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { pid, title } from "process";
import { UploadProfilesComponent } from "../upload-profiles/upload-profiles.component";
import { EditprofileComponent } from "../edit-profiles/editprofile/editprofile.component";
import { CdocumentManagerComponent } from "../../../Postajob/document-manager/Candidatedocuments/cdocument-manager/cdocument-manager.component";
import { DatasourceComponent } from "./Datasource/datasource/datasource.component";
import { Profile } from "../../models/SearchProfileDeatils";
const html2canvas: any = _html2canvas;

// import {ViewJobdetailsComponent} from '../view-jobdetails.component';
declare var $: any;
declare var jQuery: any;
// import $ from 'jquery';
// import 'owl-carousel';
@Component({
  selector: "app-viewjobdetails-candidate-profile",
  templateUrl: "./viewjobdetails-candidate-profile.component.html",
  styleUrls: ["./viewjobdetails-candidate-profile.component.css"],
  providers: [NgxSpinnerService, AlertService, ApiService],
})



export class ViewjobdetailsCandidateProfileComponent implements OnInit {
  viewchatboxdialogueref: MatDialogRef<ChatboxdialogComponent>;
  viewsourceboxdialogueref: MatDialogRef<DatasourceComponent>;
  viewshareddialogueref: MatDialogRef<SharedialogComponent>;
  viewscheduleInterviewDialgoref: MatDialogRef<ScheduleInterviewComponent>;
  valJobForm: FormGroup;

  viewCandidateProfilewDialgoref: MatDialogRef<ViewCandidateprofileComponent>;
  public show_dialog: boolean = false;
  // viewHireDialgoref: MatDialogRef<HiredialogComponent>;
  jobdetailsprofiles = new JobdetailsProfile();
  requestRef = new RequestRefernce();
  matchingDetails: MatchingDetails;
  image:any;
  DataSource:any;
  delProfile = new DeleteProfile();
  MyDocuments: any = [];
  show: boolean = false;
  // profileVideo= new  VideoProfile();
  profileFlipVideo = new GetVideoProfile();
  customerId: any;
  checkSmart:any;
  notes = new EditNotes();
  notify = new Notification();
  subdetails: CustomerSubscription;
  sdetails: GetSubscriptionDetails;
  Rloading: boolean = false;
  userId: any;
  CommentProfile: any;
  addon = new addon();
  CandidateNotes: any = [];
  CandidateFeedback: any = [];
  sedit: boolean = false;
  profiles: any;
  customer: any;
  newComment: any;
  profileImage:boolean=false;
  CandidateCertification: CandidateCertifications;
  CandidateDomain: CandidateDomains;
  searchString: any;
  domainName: any;
  savenote = new Notes();
  matchingParameterDetails = new MatchingParameterDetails();
  matchingParameterData = new MatchingParameterDetails();
  matchingParameter = new MatchingParameterDetails();
  experience: any;
  location: any;
  fileType = new Resume();
  fileExt: any;
  skills: any = null;
  loading: boolean;
  jobdetailscustomer = new GetJobDetailCustomer();
  status = new JobStatus();
  statusA = new JobStatusA();
  companyname: any;
  usersList: any;
  iconHide: boolean = false;
  @ViewChild('divClick') divClick: ElementRef;
  schIntw = new ScheduleInterview();
  wsList = new WishList();
  TotalCount: any;
  fileUploadForm: FormGroup;
  filedata=new FormData();
  @Input() jobid: number;
  @Input() statusid: number;
  @Output() myEvent = new EventEmitter();
  @Output() loadMoreEvent = new EventEmitter();
  @Input() jobStatus: string;
  //debugger
  @Input() options: object;
  @Input() parentApi: ParentComponentApi;
  $owlElement: any;
  defaultOptions: object = {};
  images = [1, 2, 3].map(() => "https://picsum.photos/900/500?random&t=${Math.random()}");
  mySlideImages = [1, 2, 3].map((i) => "https://picsum.photos/640/480?image=${i}");
  myCarouselImages = [1, 2, 3, 4, 5, 6].map((i) => "https://picsum.photos/640/480?image=${i}");
  mySlideOptions = { items: 1, dots: true, nav: false };
  myCarouselOptions = { items: 3, dots: true, nav: true };
  hideme = [true];
  hidemeed = [];
  radarChart: boolean = false;
  radarChartMenu: any = [];
  backRadarChartData = {
    labels: ["Job Fit", "Skill Fit", "Culture Fit", "Personality Fit", "Team Fit"],
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
        data: [],
      },
    ],
  };
  smartCardRadarChartData = {
    labels: ["Job Fit", "Skill Fit", "Team Fit", "Culture Fit", "Personality Fit"],
    datasets: [
      {
        fill: true,
        backgroundColor: "rgb(54, 162, 235, 0.2)",
        borderColor: "#4472C4",
        pointBackgroundColor: "#4472C4",
        pointBorderColor: "#4472C4",
        pointHoverBackgroundColor: "#4472C4",
        borderWidth: 1,
        pointBorderWidth: 1,
        data: []
      },
    ],

  };
  smallRadarChartData = {
    labels: ["Job Fit", "Skill Fit", "Culture Fit", "Personality Fit", "Team Fit"],
    datasets: [
      {
        fill: true,
        backgroundColor: "rgb(54, 162, 235, 0.2)",
        borderColor: "#448afa",
        pointBackgroundColor: "#448afa",
        pointBorderColor: "#448afa",
        pointHoverBackgroundColor: "#448afa",
        borderWidth: 1,
        pointBorderWidth: 1,
        data: []
      },
    ],

  };
  customOptions: any = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ["", ""],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };
  ProfileId: any;
  visibleIndex = -1;
  currentNo: number[] = [];
  constructor(
    private el: ElementRef,
    private _snackBar: MatSnackBar,
    private appService: AppService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private fb: FormBuilder,
    private jobdetailsservice: JobdetailsService,
    private alertService: AlertService,
    private settingsService: SettingsService,
    private _service: ApiService,
    private dialog: MatDialog,
    private toastr: ToastsManager,
    private _vcr: ViewContainerRef
  ) {
    const swal = require('sweetalert2');
    this.customer = JSON.parse(sessionStorage.getItem("userData"));
    this.customerId = this.customer.CustomerId;
    this.GetCompanyName();
    this.GetCustomerSubscription();
    this.userId = this.customer.UserId;
    this.jobid = JSON.parse(sessionStorage.getItem("jobId"));
    this.fileUploadForm = this.fb.group({ 
      'CustomerId': ['', Validators.required],
      'ProfileId': [0, Validators.nullValidator],
      'JobId': [0, Validators.nullValidator],
      'SmartCard':[null, Validators.nullValidator],
      'JobSmartCard': ['', Validators.nullValidator],
      'Url': ['', Validators.nullValidator],
      'FileExtension': ['', Validators.nullValidator],
    });
    this.valJobForm = this.fb.group({
      ProfileId: [0, Validators.compose([Validators.required])],
      JobId: [0, Validators.compose([Validators.nullValidator])],
      UserId: [0, Validators.compose([Validators.nullValidator])]
    });
  }

  toggle() {
    this.show_dialog = !this.show_dialog;
  }

  showSubItem(ind) {
    if (this.visibleIndex === ind) {
      this.visibleIndex = -1;
    } else {
      this.visibleIndex = ind;
    }
  }

  export()
  {
    
    let Name = this.jobdetailscustomer.JobInfo.JobTitle +' - '+  this.customer.FirstName ;
    this.downloadFile(this.jobdetailsprofiles.Profile,Name);

  }

  downloadFile(data: any, filename) {
    let csvData = this.ConvertToCSV(data, [ 'FirstName', 'LastName', 'Email','ProfileTitle', 'JobStatus', 'MatchingPercentage',  'MobileCountryCodeId', 'MobilePhone', 'CreatedOn']);
    console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  ConvertToCSV(objArray: any, headerList: any) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'S.No,';

    for (let index in headerList) {
      row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = (i + 1) + '';
      for (let index in headerList) {
        let head = headerList[index];

        line += ',' + array[i][head];
      }
      str += line + '\r\n';
    }
    return str;
  }

  download(url, name) {
    const link = document.createElement("a");
    link.setAttribute("target", "_blank");
    link.click();
    link.remove();
    window.location.href = url;
  }

  GetCompanyName() {
    return this._service.GetService("ProfileAPI/api/GetCompanyBasicInfo?customerId=", this.customer.CustomerId).subscribe(re => {
      if (re != null) {

        this.companyname = re.CompanyName;
      }

    });
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




  GetJobDataSourceDetails()
  {
   this._service.GetService('IdentityAPI/api/GetJobDataSource?profileId='+ this.ProfileId +'&jobId=',this.jobid ).subscribe(
     data => {
      if(data != "No records found")
      {
        this.DataSource = data.DataSource;
      }


     });
  }

    openModal(profileId) {
      const databoxdialogRef = this.dialog.open(DatasourceComponent, {
        width: "750",
        position: { right: "0px" },
        height: "750px",
        data: {
          jobId: this.jobid,
          ProfileId: profileId
          // status : this.statusid
        },
      });
      databoxdialogRef.afterClosed().subscribe((result) => {
        console.log("databoxdialogRef Dialog result: ${result}");
      this.GetJobDataSourceDetails();
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

  OpenChatboxDialog() {
    if (this.jobStatus !== "InActive") {
      const chatboxdialogRef = this.dialog.open(ChatboxdialogComponent, {
        width: "750",
        position: { right: "0px" },
        height: "750px",
        data: {
          animal: "panda",
        },
      });
      chatboxdialogRef.afterClosed().subscribe((result) => {
        console.log("Chatbox Dialog result: ${result}");
      });
    }
  }

  OpenShareDialog(title, jobResponseId, profileId) {
    this.GetProfileCard(profileId,title,jobResponseId);
   
   
  
  }

  prevSkills(data, index) {
    console.log("current number", this.currentNo);
    if (this.currentNo[index] > 0) {
      this.currentNo[index] = this.currentNo[index] - 1;
    } else {
      this.currentNo[index] = 0;
    }
    console.log("current number", this.currentNo);
  }
  nextSkills(data, index) {
    var len = data.split(",", 10).length / 3;
    if (len - 1 > this.currentNo[index]) {
      this.currentNo[index] = this.currentNo[index] + 1;
    } else {
      this.currentNo[index] = Math.round(len - 1);
    }
  }

  OpenScreeningDialog(jobResponseId, profileId, Email, FirstName, LastName, userId, Match) {
    // if (this.jobStatus !== "InActive") {
      const screendialogRef = this.dialog.open(screeningdialogComponent, {
        position: { right: "0px" },
        panelClass: 'full-xl-dialog',
        data: {
          jobResponseId: jobResponseId,
          jobId: this.jobid,
          ProfileId: profileId,
          Email: Email,
          FullName: FirstName + LastName,
          CUserId: userId,
          Matching: Match,
          // status : this.statusid
        },
      });
      screendialogRef.afterClosed().subscribe((result) => {
        this.myEvent.emit(null);
        console.log("Screen Dialog result: ${result}");
      });
    //}
  }

  OpenShortListedDialog(jobResponseId, profileId, Email, FirstName, LastName, userId, Match) {
    //debugger
    //if (this.jobStatus !== "InActive") {
      const shortdialogRef = this.dialog.open(shortlisteddialogComponent, {
        position: { right: "0px" },
        panelClass: 'full-xl-dialog',
        data: {
          jobResponseId: jobResponseId,
          jobId: this.jobid,
          ProfileId: profileId,
          Email: Email,
          FullName: FirstName + LastName,
          CUserId: userId,
          Matching: Match,
          // status : this.statusid
        },
      });
      shortdialogRef.afterClosed().subscribe((result) => {
        this.myEvent.emit(null);
        console.log("Screen Dialog result: ${result}");
      });
    //}
  }

  OpenWithdrawnDialog(jobResponseId, profileId, Email, FirstName, LastName, userId, Match) {
    //if (this.jobStatus !== "InActive") {
      const shortdialogRef = this.dialog.open(WithDrawndialogComponent, {
        position: { right: "0px" },
        data: {
          jobResponseId: jobResponseId,
          jobId: this.jobid,
          ProfileId: profileId,
          Email: Email,
          FullName: FirstName + LastName,
          CUserId: userId,
          Matching: Match,
          // status : this.statusid
        },
      });
      shortdialogRef.afterClosed().subscribe((result) => {
        this.myEvent.emit(null);
        console.log("Screen Dialog result: ${result}");
      });
    //}
  }

  OpenSendNotificationDialog(jobResponseId, profileId, Email, FirstName, LastName, userId, Match, StatusId) {
    //if (this.jobStatus !== "InActive") {
      const senddialogRef = this.dialog.open(sendnotificationdialogComponent, {
        position: { right: "0px" },
        data: {
          jobResponseId: jobResponseId,
          jobId: this.jobid,
          JobTitle: this.jobdetailscustomer.JobInfo.JobTitle,
          ProfileId: profileId,
          Email: Email,
          FullName: FirstName + LastName,
          CUserId: userId,
          Matching: Match,
          StatusId: StatusId,
          // status : this.statusid
        },
      });
      senddialogRef.afterClosed().subscribe((result) => {
        this.GetJobNotes(profileId, this.jobid);
        console.log("Screen Dialog result: ${result}");
      });
    //}
  }

  OpenRejectDialog(jobResponseId, profileId, Email, FirstName, LastName, userId, Match) {
    //if (this.jobStatus !== "InActive") {
      const rejectdialogRef = this.dialog.open(RejectdialogComponent, {
        position: { right: "0px" },
        data: {
          jobResponseId: jobResponseId,
          jobId: this.jobid,
          ProfileId: profileId,
          Email: Email,
          FullName: FirstName + LastName,
          CUserId: userId,
          Matching: Match,
          // status : this.statusid
        },
      });
      rejectdialogRef.afterClosed().subscribe((result) => {
        // this.myEvent.emit(null);
        this.GetJobFeedback(profileId, this.jobid);
        console.log("reject Dialog result: ${result}");
      });
    //}
  }

  OpenAchiveDialog(profileId) {
    const AdialogRef = this.dialog.open(AchivementdialogComponent, {
      position: { right: "0px" },
      data: {
        ProfileId: profileId,
        // status : this.statusid
      },
    });
    AdialogRef.afterClosed().subscribe((result) => {
      // this.jobDetails.populateJobsStaticInfo(this.jobid);
      //this.myEvent.emit(null);
      console.log("hire Dialog result: ${result}");
    });
  }

  OpenReferDialog(profileId, userId, profile) {
    // this.Rloading = true;
    // this._service.GetService('ProfileAPI/api/GetQuestionnaireAssignmentNew?userId=' + userId, '&showId=0')
    // .subscribe(
    //   data => {
    //     this.Rloading = false;
    // if(data != 'No records found')
    // {
    const RdialogRef = this.dialog.open(ReferencedialogComponent, {
      width: "888px",
      position: { right: "0px" },
      data: {
        ProfileId: profileId,
        UserId: userId,
        Email: profile.Email,
        FirstName: profile.FirstName,
        // status : this.statusid
      },
    });
    RdialogRef.afterClosed().subscribe((result) => {
      // this.jobDetails.populateJobsStaticInfo(this.jobid);
      this.myEvent.emit(null);
      console.log("hire Dialog result: ${result}");
    });
    // }
    //   else
    //   {
    //this.RequestReference(profile);
    //   }
    // });
  }

  OpenReferDialogCheck(profileId, userId, profile) {
    this.RequestReference(profile);
  }

  OpenBgDialog(profileId, name, userId, lName) {
    const bdialogRef = this.dialog.open(backgrounddialogComponent, {
      width: "80vw",
      position: { right: "0px" },
      data: {
        ProfileId: profileId,
        CuserId: this.customer.UserId,
        UserId: userId,
        JobId: this.jobid,
        Name: name,
        Lname: lName,
        panelClass:'candiateModalPop'
        // status : this.statusid
      },
    });
    bdialogRef.afterClosed().subscribe((result) => {
      // this.jobDetails.populateJobsStaticInfo(this.jobid);
      //this.myEvent.emit(null);
      this.myEvent.emit(null);
      console.log("hire Dialog result: ${result}");
    });
  }

  OpenHireDialog(jobResponseId, profileId, Email, FirstName, LastName, userId, Match) {
    // if (this.jobStatus !== "InActive") {
      const hiredialogRef = this.dialog.open(HiredialogComponent, {
        width: "700px",
        position: { right: "0px" },
        data: {
          jobResponseId: jobResponseId,
          jobId: this.jobid,
          ProfileId: profileId,
          Email: Email,
          FullName: FirstName + LastName,
          CUserId: userId,
          Matching: Match,
          // status : this.statusid
        },
      });
      hiredialogRef.afterClosed().subscribe((result) => {
        // this.jobDetails.populateJobsStaticInfo(this.jobid);
        this.myEvent.emit(null);
        console.log("hire Dialog result: ${result}");
      });
    //}
  }

  OpenScheduleInterviewDialog(jobResponseId, userId, profileId, Email, FirstName, LastName, match) {
    //debugger
    // var candidateUserId = $("#candidateUserId").val();
    // var candidateId = +candidateUserId;
    var lName :string;
    if(LastName != null)
    {
      lName = LastName;
    }
    else
    {
      lName = '';
    }
    const scheduleIntwdialogRef = this.dialog.open(ScheduleInterviewComponent, {
      width: "750px",
      position: { right: "0px" },
      height: "750px",
      data: {
        jobResponseId: jobResponseId,
        jobId: this.jobid,
        ProfileId: profileId,
        userId: userId,
        Email: Email,
        FullName: FirstName + ' ' + lName,
        Matching: match,
        // status : this.statusid
      },
    });
    scheduleIntwdialogRef.afterClosed().subscribe((result) => {
      // this.jobDetails.populateJobsStaticInfo(this.jobid);
      this.myEvent.emit(null);
      console.log("Chatbox Dialog result: ${result}");
    });
  }

  OpenCandidateDialog(profileId, Uid, FirstName, LastName,CFirstName,CLastName) {
    // if (this.jobStatus!='InActive') {
      var lName :string;
      if(LastName != null)
      {
        lName = LastName;
      }
      else
      {
        lName = '';
      }
      let CName : string;
    if(CFirstName!=null)
    {
      CName = CFirstName + ' ' + CLastName;
    }
    else
    {
      CName = this.customer.FirstName + ' ' + this.customer.LastName;
    }
    this.spinner.show();
    let candidateProfile = this.jobdetailsprofiles.Profile.find(item => item.ProfileId === profileId);
    sessionStorage.setItem("selectedProfile", JSON.stringify(candidateProfile));
    this.jobdetailsservice.GetJobMatchingCriteriaEndPoint(profileId, this.jobid).subscribe((res) => {
      if (res) {
        this.matchingParameterDetails = res;
        const viewCandidatedialogRef = this.dialog.open(ViewCandidateprofileComponent, {
          width: "80vw",
          position: { right: "0px" },
          height: "750px",
          panelClass: 'candiateModalPop',
          data: {
            ProfileId: profileId,
            jobId: this.jobid,
            UserId: Uid,
            Name: FirstName + ' ' + lName,
            CName : CName,
            JobFit: this.matchingParameterDetails.JobFit,
            Personalityfit: this.matchingParameterDetails.Personalityfit,
            Skillfit: this.matchingParameterDetails.SkillFit,
            CulutureFit: this.matchingParameterDetails.CultureFit,
            profile: candidateProfile
            // status : this.statusid
          },
        });
        this.spinner.hide();
        viewCandidatedialogRef.afterClosed().subscribe((result) => {
        });
      }
      else {
        this.spinner.hide();
      }
    });
    // }
  }
  OpenSendEmailDialog(
    noEmail,
    emailId,
    firstname,
    lastname,
    jobResponseId,
    profileId,
    responseStatusId,
    ccpid,
    userId,
    Upload
  ) {
    // if (this.jobStatus!='InActive') {
    if (!noEmail) {
      const sendEmaildialogRef = this.dialog.open(SendEmailComponent, {
        width: "750",
        position: { right: "0px" },
        height: "100vh",
        data: {
          EmailId: emailId,
          jobId: this.jobid,
          firstname: firstname,
          lastname: lastname,
          CustomerId: this.customerId,
          responseStatusId: responseStatusId,
          profileId: profileId,
          jobResponseId: jobResponseId,
          ccpid: ccpid,
          userId: userId,
          profileUpload: Upload,
          // status : this.statusid
        },
      });
      sendEmaildialogRef.afterClosed().subscribe((result) => {
        // this.jobDetails.populateJobsStaticInfo(this.jobid);
        this.myEvent.emit(null);
        console.log("candidate Dialog result: ${result}");
      });
    }
    return false;
    // }
  }



  saveedit(comment, JId, Cid, Pid) {
    this.notes.JobId = JId;
    this.notes.OldComment = comment;
    this.notes.CId = Cid;
    this.notes.NewComment = this.newComment;
    this.notes.ProfileId = Pid;
    if (this.newComment != null && this.newComment != undefined) {
      this._service.PostService(this.notes, 'ProfileAPI/api/UpdateProfileNoteInfo').subscribe(data => {
        if (data == 0) {
          this.notes = new EditNotes();
          this.GetJobNotes(Pid, JId)
          this.newComment = undefined;
        }
      });
    }
  }


  Check(val, ProfileId) {
    if (val == 1) {
      this._service.GetService("ProfileAPI/api/GetProfileStatus?profileId=", ProfileId).subscribe((data) => {
        var IsPublic = data.isPublicAvailable;
        if (IsPublic == true) {
          return this.appService.GetCustomerSubscription(this.customer.UserId).subscribe((res) => {
            this.addon.SubscriptionId = res.subscriptionId;
            this.addon.AddonId = "2";
            this.addon.AddonUnitPrice = 400;
            this.addon.AddonQuantity = 1;
            this.jobdetailsservice.AddonHirefee(this.addon).subscribe((result) => {
              console.log(result);
            });
          });
        }
      });
    }
  }

  RequestReference(profile) {
    swal(
      {
        title: 'Do you want to Request Reference?',
        showConfirmButton: true,
        showCancelButton: true,
        type: "info",
        confirmButtonColor: '#66dab5',
        cancelButtonColor: '#FF0000',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value === true) {
          this.requestRef.appLink = this.settingsService.settings.CandidateAppLogin + ";RsId=0";
          this.requestRef.fromID = this.customer.Email;
          this.requestRef.jobId = this.jobdetailscustomer.JobInfo.JobId;
          this.requestRef.referenceType = "2";
          //this.requestRef.profileId = profile.ProfileId.toString();
          this.requestRef.toEmailId = profile.Email;
          this.requestRef.candFullName = profile.FirstName;
          this.requestRef.refereeFullName = this.customer.FirstName + ' ' + this.customer.LastName;
          this.requestRef.jobTitle= this.jobdetailscustomer.JobInfo.JobTitle;
          this.requestRef.clientLogo= ' ';
          this.requestRef.applicationName = 'Arytic';
          this.requestRef.appLink = this.settingsService.settings.CandidateAppLogin + ";RsId=0";
          this.requestRef.comments = this.CommentProfile != undefined ? this.CommentProfile : 'Please provide reference';
          this.jobdetailsservice.RequestRefernce(this.requestRef).subscribe((result) => {
            this.CommentProfile = undefined;
            this.requestRef = new RequestRefernce();
            // let message = "Requested Reference!";
            // let action = "Success";
            // this._snackBar.open(message, action, {
            //   duration: 2000,
            // });
            swal(
              {
                title: 'Request Sent!',
                showConfirmButton: true,
                timer: 3000,
                type: "success"
              });
          })
        }




      });
  }



  RequestCandidate(JobResponseId,
    ProfileId,
    Email,
    FirstName,
    LastName) {
      if(Email.includes('@noemail.com'))
      {
        swal(
          {
            
            title: 'Please add valid email to request ' + FirstName + ' ' + LastName,
            showConfirmButton: true,
            type: "info",
            confirmButtonColor: '#66dab5',
            confirmButtonText: 'ok.',
          });
      }
      else
      {
    swal(
      {
        
        title: 'Have you received the approval/consent from   ' + FirstName + ' ' + LastName ,
        showConfirmButton: true,
        showCancelButton: true,
        type: "info",
        confirmButtonColor: '#66dab5',
        cancelButtonColor: '#FF0000',
        confirmButtonText: 'Yes,Proceed.',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value === true) {
          //this.GetCandidateApproval(ProfileId);
          this.valJobForm.value.ProfileId = ProfileId;
          this.valJobForm.value.JobId = this.jobid;
          this._service.PostService(this.valJobForm.value, 'JobsAPI/api/GetCandidateApprovalById')
            .subscribe(data => {
              this.statusA.AppLink = this.settingsService.settings.CandidateLogin;
              this.statusA.JobStatus = "Applied";
              this.statusA.FromEmail = this.customer.Email;
              this.statusA.ToEmailID = Email;
              this.statusA.FullName =  FirstName + ' ' + LastName;
              this.statusA.JobTitle = this.jobdetailscustomer.JobInfo.JobTitle;
              this.statusA.JobLocation =
                this.jobdetailscustomer.JobLocation[0].CityName + "," + this.jobdetailscustomer.JobLocation[0].StateName;
                this.statusA.SCName = this.customer.FirstName + ' '+ this.customer.LastName;
                this.statusA.Company = this.jobdetailscustomer.JobInfo.CompanyName;
                this._service.PostService( this.statusA, 'EmailAPI/api/SendJobStatusApprove')
                .subscribe(data => {
                this.toastr.success("Email Sent", "Success");
                setTimeout(() => {
                  this.toastr.dismissToast;
                  swal(
                    {
                      title: 'Application is forwarded to next stages successfully !',
                      showConfirmButton: true,
                      timer: 3000,
                      type: "success"
                    });
                    this.parentApi.callSearchMethod('');
                }, 3000);
              });
            },
              error => console.log(error));
         

        }
      })
    }
  }


  RequestCandidateAp(NoEmail,
    Email,
    FirstName,
    LastName,
    JobResponseId,
    ProfileId,
    ResponseStatusId,
    CCPID,
    UserId,IsUploaded) {
      if(Email.includes('@noemail.com'))
      {
        swal(
          {
            
            title: 'Please add valid email to request ' + FirstName + ' ' + LastName,
            showConfirmButton: true,
            type: "info",
            confirmButtonColor: '#66dab5',
            confirmButtonText: 'ok.',
          });
      }
      else
      {
        swal(
          {
            
            title: 'Hey would you like to resend email to ' + FirstName + ' ' + LastName,
            showConfirmButton: true,
            showCancelButton: true,
            type: "info",
            confirmButtonColor: '#66dab5',
            cancelButtonColor: '#FF0000',
            confirmButtonText: 'Yes,Proceed.',
            cancelButtonText: 'No'
          }).then((result) => {
            if (result.value === true) {
                 this.OpenSendEmailDialog(NoEmail,Email,FirstName,LastName,JobResponseId,ProfileId,ResponseStatusId,CCPID,UserId,IsUploaded);
    
            }
          })
      }

  }

  RequestAchivement(profile) {
    swal(
      {
        title: 'Do you want to Request Achievement?',
        showConfirmButton: true,
        showCancelButton: true,
        type: "info",
        confirmButtonColor: '#66dab5',
        cancelButtonColor: '#FF0000',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value === true) {
          this.notify.CustomerId = this.customer.CustomerId;
          this.notify.JobId = this.jobid;
          this.notify.FromUserId = profile.UserId;
          this.notify.NotificationTypeId = 20;
          this.notify.ToUserId = profile.UserId;
          this.notify.Message = this.customer.FirstName + this.customer.LastName + ',' + "_Requested Achievements" + '@' + this.jobdetailscustomer.JobInfo.JobTitle + ' ' + 'Position';
          this._service.PostService(this.notify, 'IdentityAPI/api/InsertNotification')
            .subscribe(
              status => {
                if (status >= 0) {
                  swal(
                    {
                      title: 'Request Sent!',
                      showConfirmButton: true,
                      timer: 3000,
                      type: "success"
                    });
                }
              });
        }
      })
  }

  PopulateJobdetail() {
    return this.jobdetailsservice.getJobDetailCustomer(this.customerId, this.jobid).subscribe((res) => {
      this.jobdetailscustomer = res;
    });
  }

  // updateOnDialogClose() {
  //   this.eventStat.emit(null);
  //   this.myEvent.emit(null);
  // }
  shortlisthiredwithdrawn(stat, jobResponseId, profileId, Email, FirstName, LastName) {
    if (stat == 11) {
      this.Check(1, profileId);
    }
    this.schIntw.UserId = null;
    this.schIntw.JobId = this.jobid;
    this.schIntw.ProfileId = profileId;
    this.schIntw.JobInterviewId = 0;
    this.schIntw.JobResponseId = jobResponseId; // gemerated when sortlisted or applied
    this.schIntw.InterviewDatevalue = "";
    // this.schIntw.InterviewDate = null;
    this.schIntw.StartTime = null;
    this.schIntw.EndTime = null;
    this.schIntw.InterviewTypeId = null; // skype or anytype
    this.schIntw.PhoneNumber = null;
    this.schIntw.BridgeUrl = null;
    this.schIntw.AccessId = null;
    this.schIntw.SkypeId = null;
    this.schIntw.Comments = "";
    this.schIntw.ResponseStatusId = stat; // what stage it is..hired...
    this.schIntw.IsActive = null;
    this.schIntw.Rating = null;
    this.schIntw.RequiredFurtherInterview = null;
    this.schIntw.StatusChangedByUserId = this.userId;
    this.schIntw.InterviewingPerson = null;
    let FullName = FirstName + LastName;

    this.jobdetailsservice.interviewProcess(this.schIntw).subscribe((res) => {
      // this.jobDetails.populateJobsStaticInfo(this.jobid);
      this.SendStatusEmail(Email, FullName, stat);
      this.myEvent.emit(null);
      console.log(res);
    });
  }

  SendStatusEmail(Email, FullName, stat) {
    this.status.AppLink = this.settingsService.settings.CandidateLogin;
    if (stat == 8) {
      this.status.JobStatus = "Screening";
    }
    if (stat == 5) {
      this.status.JobStatus = "Shortlisted";
    }
    if (stat == 9) {
      this.status.JobStatus = "WithDrawn";
    }

    this.status.FromEmail = this.customer.Email;
    this.status.ToEmailID = Email;
    this.status.FullName = FullName;
    this.status.JobTitle = this.jobdetailscustomer.JobInfo.JobTitle;
    this.status.JobLocation =
      this.jobdetailscustomer.JobLocation[0].CityName + "," + this.jobdetailscustomer.JobLocation[0].StateName;
    this.appService.SendJobStatus(this.status).subscribe((status) => {
      this.toastr.success("Email Sent", "Success");
      setTimeout(() => {
        this.toastr.dismissToast;
      }, 3000);
    });
  }



  GetCandidateProfile(profileId) {
    if (this.jobStatus !== "InActive") {
      sessionStorage.setItem("profileId", JSON.stringify(profileId));
      this.router.navigateByUrl("app-cprofile");
    }
  }
  NoRecords() {
    this.jobdetailsprofiles = new JobdetailsProfile();
  }

  GetCandidateCertifications(profileId) {
    this._service.GetService("ProfileAPI/api/GetCertification?profileId=", profileId).subscribe((dat) => {
      this.CandidateCertification = dat;
    });
  }

  GetCandidateDomains(profileId) {
    this._service.GetService("ProfileAPI/api/GetCandidateDomain?profileId=", profileId).subscribe((datr) => {
      this.CandidateDomain = datr;
    });
  }

  GetJobNotes(profileId, jobId) {
    this.jobdetailsservice.GetProfileNotes(profileId, jobId, this.customer.UserId).subscribe((datr7) => {
      this.CandidateNotes = datr7;
    });
  }


  //   GetMatchingPercentageGraph(profileId, jobid): any {
  //     this.jobdetailsservice.GetJobMatchingCriteriaEndPoint(profileId, jobid).subscribe((res) => {
  //       this.matchingParameterDetails = res;
  //       debugger
  //       setInterval(() => {
  //         this.smartCardRadarChartData.datasets[0].data.forEach(a=>
  // a[] = this.matchingParameterDetails.JobFit,this.matchingParameterDetails.SkillFit,this.matchingParameterDetails.CultureFit,this.matchingParameterDetails.Personalityfit,0
  //           )
  //     }, 1000);      
  //     });
  //     return this.matchingParameterDetails;
  //   }

  GetProfileCard(profileId,title,jobResponseId)
 {
  
  return this._service.GetService('IdentityAPI/api/GetSmartCard?jobId='+  this.jobid + '&profileId=',profileId)
  .subscribe(res => {
         this.checkSmart = res;
         if (this.jobStatus !== "InActive") {
          if(res === "No data")
          {
            this.spinner.show();
            this.check(profileId,title,jobResponseId);
          }
          else
          {
            
              const shareddialogRef = this.dialog.open(SharedialogComponent, {
                // width: '1000px',
                position: { right: "0px" },
                // height : '750px',
                data: {
                  animal: "panda",
                  Title: title,
                  JobTitle:this.jobdetailscustomer.JobInfo.JobTitle,
                  jobResponseId: jobResponseId,
                  jobId: this.jobid,
                  ProfileId: profileId,
                },
              });
              shareddialogRef.afterClosed().subscribe((result) => {
                console.log("share Dialog result: ${result}");
              });
          }
        }
  });
 }


  GetJobFeedback(profileId, jobId) {
    this.jobdetailsservice.GetProfileFeedback(profileId, jobId, this.customer.UserId).subscribe((datr6) => {
      this.CandidateFeedback = datr6;
    });
  }

  deleteNote(id: number, profileId, jobId) {
    this.jobdetailsservice.DeleteNote(id).subscribe((data) => {
      if (data >= 0) {
        this.GetJobNotes(profileId, jobId);
      }
    });
  }

  DeleteProfile(Id,Fname,Lname,Email) {
    swal(
      {
        title: 'Delete Profile',
        text: 'Are you sure you want to delete?',
        showConfirmButton: true,
        showCancelButton: true,
        type: "info",
        confirmButtonColor: '#66dab5',
        cancelButtonColor: '#FF0000',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value === true) {
    this.jobdetailsservice.DeleteCandidateProfile(Id,this.jobid).subscribe((data) => {
      if (data >= 0) {
        // if(Email.substring(0, 7) != 'noemail')
        // {
        //   this.DelProfile(Fname,Lname,Email);
        // }
        // else
        // {
          this.toastr.info('profile deleted!', 'Success!');
          setTimeout(() => {
            this.toastr.dismissToast;
            this.myEvent.emit(null);
          }, 3000);
        //}
     
        
        //this.GetJobNotes(profileId, jobId);
      }
    });
  }
  });
  }

  DownloadResumeNote(val, Name): void {
    this._service.GetService("ProfileAPI/api/GetNoteFilesDownload?url=", val).subscribe((fileData) => {
      this.fileType = fileData;
      let exp = Name.split(".").pop();
      this.fileExt = exp;
      this.toastr.success("Downloading!", "Success!");
      setTimeout(() => {
        this.toastr.dismissToast;
      }, 3000);

      if (this.fileExt == "pdf") {
        let byteArr = this.base64ToArrayBuffer(fileData);
        let blob = new Blob([byteArr], { type: "application/pdf" });
        FileSaver.saveAs(blob, Name);
      }
      if (this.fileExt == "png" || this.fileExt == "jpeg") {
        let byteArr = this.base64ToArrayBuffer(fileData);
        let blob = new Blob([byteArr], { type: "application/image" });
        FileSaver.saveAs(blob, Name);
      } else if (this.fileExt == "doc" || this.fileExt == "docx") {
        var extension = ".doc";
        let byteArr = this.base64ToArrayBuffer(fileData);
        let blob = new Blob([byteArr], { type: "application/pdf" });
        FileSaver.saveAs(blob, Name);
      }
    });
  }

  DelProfile(Fname,Lname,Email) {
    this.delProfile.CustName = this.titleCase(this.customer.FirstName) + ' ' + this.titleCase(this.customer.LastName);
    this.delProfile.Name = this.titleCase(Fname) +' '+ this.titleCase(Lname);
    this.delProfile.JobTitle = this.jobdetailscustomer.JobInfo.JobTitle;
    this.delProfile.FromEmail = "info@arytic.com" ;
    this.delProfile.ToEmailId = Email;
    this._service.PostService(this.delProfile,"EmailAPI/api/SendDeleteProfileInfo").subscribe((fData) => {
      this.toastr.info('profile deleted!', 'Success!');
      setTimeout(() => {
        this.toastr.dismissToast;
        this.myEvent.emit(null);
      }, 3000);
    });
  }

 


  // GetMatchingPercentageGraph(ProfileId,jobid)
  // {
  //   this.jobdetailsservice.GetJobMatchingCriteriaEndPoint(ProfileId, jobid).subscribe((res) => {
  //     this.matchingParameter = res;
  //     debugger
  //     this.backRadarChartData.datasets.forEach(a=>{
  //       a.data=[this.matchingParameter.JobFit,this.matchingParameter.SkillFit,this.matchingParameter.CultureFit,this.matchingParameter.Personalityfit,0]
  //     })

  //   })
  // }
  PopulateJobdetailProfiles(
    customerId,
    userid,
    jobid,
    statusid,
    statistics,
    sortBy = 1,
    searchString = "",
    experience = 0,
    location = "",
    domainName = "",
    uploaded = 0,
    suggested = 0,
    wishlist = 0,
    invited = 0,
    arytic = 0,
    noofRows = 6,
    fstatus = 0
  ) {
    this.alertService.clear();
    // $('#searchStr').val('');
    this.spinner.show();
    console.log("prolifees");
    if (jobid != null && statusid != null) {
      this.jobid = jobid;
      this.statusid = statusid; // === 0 ? 4 : statusid; // As all candidate status is 0 and it is enabled so condition for 4 is removed.
    }
    if (statistics === 0 && statusid > 4) {
      this.spinner.hide();
      this.jobdetailsprofiles = new JobdetailsProfile();
    } else {
      return this.jobdetailsservice
        .getJobDetailsProfileInfo(
          this.customerId,
          this.userId,
          this.jobid,
          this.statusid,
          sortBy,
          searchString,
          experience,
          location,
          domainName,
          uploaded,
          suggested,
          wishlist,
          invited,
          arytic,
          noofRows,
          fstatus
        )
        .subscribe((res) => {
          this.jobdetailsprofiles = res;  
          debugger
          this.profiles = res;
          this.TotalCount = this.jobdetailsprofiles;
          this.spinner.hide();

          this.jobdetailsprofiles.Profile.forEach((a, index) => {
            // var num = 0;
            this.currentNo[index] = 0;

            //this.GetMatchingPercentageGraph(a.ProfileId,this.jobid);

            // this.backRadarChartData.datasets.map(x=>
            //   {
            //     x.data.push(a.JobFit,a.SkillFit,a.CultureFit,a.PersonalFit,a.TeamFit)
            //   });
            //this.backRadarChartData.datasets[0].data=[a.JobFit,a.SkillFit,a.CultureFit,a.PersonalFit,a.TeamFit];
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
          if (this.profiles === "No records found") {
            this.myEvent.emit("min");
            // this.alertService.warn('No Profiles Matched!!');
          }
          if (noofRows > 6 && res.TotalProfileCount < noofRows) {
            // need to change the res.totalprofile count
            this.myEvent.emit("max"); // load more hide when max count is reached
          } else if (noofRows === 6 && res.Profile.length < noofRows) {
            // need to change the res.totalprofile count
            this.myEvent.emit("min"); // load more when profiles count is min and low
          }
          //  else {
          //   this.myEvent.emit(true);
          //  }
        });
    }
  }
  add3Dots(string, limit) {
    const dots = "...";
    if (string.length > limit) {
      string = string.substring(0, limit) + dots;
    }
    return string;
  }

  CheckDisplay(val) {
    if (val === null) {
      return "none";
    }
  }

  DownloadDocument(d) {
    let fileDat = this.MyDocuments.find(x => x.DocName === d);
    let fileExt: any;

    this._service.GetService("ProfileAPI/api/GetNoteFilesDownload?url=", fileDat.DocUrl).subscribe((fileData) => {
      let exp = d.split("aryticDP")[0];
      fileExt = exp.split(".").pop();
      let Name = exp.split(".")[0];
      this.toastr.success("Downloading!", "Success!");
      setTimeout(() => {
        this.toastr.dismissToast;
      }, 3000);

      if (fileExt == "pdf") {
        let byteArr = this.base64ToArrayBuffer(fileData);
        let blob = new Blob([byteArr], { type: "application/pdf" });
        FileSaver.saveAs(blob, Name);
      }
      if (fileExt == "png" || fileExt == "jpeg") {
        let byteArr = this.base64ToArrayBuffer(fileData);
        let blob = new Blob([byteArr], { type: "application/image" });
        FileSaver.saveAs(blob, Name);
      } else if (fileExt == "doc" || fileExt == "docx") {
        let byteArr = this.base64ToArrayBuffer(fileData);
        let blob = new Blob([byteArr], { type: "application/pdf" });
        FileSaver.saveAs(blob, exp);
      }
    });








  }

  titleCase(str) {
    return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
  }

  // getMatchingDetails(profileId)
  // {
  //   return this.jobdetailsservice.getMatchingDetails(profileId, this.jobid).subscribe(res => {
  //     this.matchingDetails = res;
  //   });
  // }
  callSkills(profileId, Val?) {
    //debugger
    // var $card = $('.page--job-details .tab-content .card');
    //   var $detailsBtn = $card.find('.show-matching-details');
    //   $detailsBtn.on('click', function (e) {

    //     e.preventDefault();
    //     var $selectedCard = $(this).closest('.card');
    //     var $detailsDiv = $selectedCard.find('.matching-details');
    //     var $detailsCloseBtn = $selectedCard.find('.close');

    this.ProfileId = profileId;
    this.PopulateDocuments(profileId);
    this.iconHide = true;
    if (Val == 0) {
      this.GetCandidateCertifications(profileId);
      $(".matching-details").removeClass("open");
      $("#matchingDetailCert-" + profileId).toggleClass("open");
    }
    if (Val == 2) {
      //debugger
      this.GetJobNotes(profileId, this.jobid);
      $(".matching-details").removeClass("open");
      $("#matchingDetailNotes-" + profileId).toggleClass("open");
    }
    if (Val == 4) {
      //debugger
      this.GetJobFeedback(profileId, this.jobid);
      $(".matching-details").removeClass("open");
      $("#matchingDetailFeedback-" + profileId).toggleClass("open");
    }
    if (Val == 1) {
      this.GetCandidateDomains(profileId);
      $(".matching-details").removeClass("open");
      $("#matchingDetailDom-" + profileId).toggleClass("open");
    }
    if (Val == 3) {
      var data = this.GetMatchingPercentage(profileId, this.jobid);
      console.log("matchingParameterDetails", this.matchingParameterDetails);

      return this.jobdetailsservice.getMatchingCriteriaDetails(profileId, this.jobid).subscribe((res) => {
        this.matchingDetails = res;
        $(".matching-details").removeClass("open");
        $("#matchingDetail-" + profileId).toggleClass("open");

        // $('.matching-details1').removeClass('open');
        // $('#matchingDetails-' + profileId).toggleClass('open');
      });
    }

    if (Val == 4) {
      $(".matching-details").removeClass("open");
      $("#matchingDetailFeedback-" + profileId).toggleClass("open");
    }
    if (Val == 5) {
      var data = this.GetMatchingPercentage(profileId, this.jobid);

      console.log("matchingParameterDetails", this.matchingParameterDetails);

      return this.jobdetailsservice.getMatchingCriteriaDetails(profileId, this.jobid).subscribe((res) => {
        this.matchingDetails = res;
        $(".matching-details").removeClass("open");
        $("#matchingDetailRadar-" + profileId).toggleClass("open");
      });
    }
    if (Val == 6) {
      //debugger
      this.GetJobFeedback(profileId, this.jobid);
      $(".matching-details").removeClass("open");
      $("#matchingDetailDocuments-" + profileId).toggleClass("open");
    }
    if (Val == 7) {
      //debugger
      this.OpenUpload(profileId);
      $(".matching-details").removeClass("open");
      // $("#matchingDetailDocuments-" + profileId).toggleClass("open");
    }
    // $detailsCloseBtn.on('click', function (e) {
    //   e.preventDefault();
    //   $detailsDiv.removeClass('open');
    // });
    // });
  }
  closeDetails(profileId, type) {
    this.iconHide = false;
    if (type === 1) {
      $("#matchingDetail-" + profileId).removeClass("open");
      $("#matchingDetailCert-" + profileId).removeClass("open");
      $("#matchingDetailDom-" + profileId).removeClass("open");
      $("#matchingDetailNotes-" + profileId).removeClass("open");
      $("#matchingDetailFeedback-" + profileId).removeClass("open");
      $("#matchingDetailRadar-" + profileId).removeClass("open");
      $("#matchingDetailDocuments-" + profileId).removeClass("open");
    } else {
      $("#sizzleVideo-" + profileId).removeClass("open");
      $("#profileVideo-" + profileId).removeClass("open");
    }
  }

  check(val,title,Jd)
  {
    this.profileImage = true;
    let secondsRemaining = 1
    const interval = setInterval(() => {
    if (secondsRemaining === 0) {
     this.clickme(val,title,Jd);
     clearInterval(interval);
     }
     secondsRemaining--;
    }, 1000);
  }


  clickme(val,title,Jd) {
    let request = '';
    const formData = new FormData();
    html2canvas(document.getElementById('aa' + val),{
      useCORS: true,letterRendering: 1,backgroundColor:"transparent",scale: 2,
      logging: true }).then(canvas => {
      // document.querySelector(".result").appendChild(canvas);
        var image = canvas.toDataURL();
        var file = this.dataURLtoFile(image,val+'.png');
        this.fileUploadForm.value.Url = '';
        this.fileUploadForm.value.customerId = this.customerId;
        this.fileUploadForm.value.JobId = this.jobid;
        this.fileUploadForm.value.ProfileId = val;
        this.fileUploadForm.value.JobSmartCard = file.name;
        this.fileUploadForm.value.FileExtension = '.png';
        request = JSON.stringify(this.fileUploadForm.value);
        formData.append('SmartCard', file);
        formData.append('Model', request);
        this.filedata= formData;
        this._service.byteStorage(this.filedata, 'IdentityAPI/api/SaveSmartCard').subscribe(data => {
          let res = data;
          this.spinner.hide();
          console.log(res);
          this.profileImage = false;
          if (this.jobStatus !== "InActive") {
            const shareddialogRef = this.dialog.open(SharedialogComponent, {
              // width: '1000px',
              position: { right: "0px" },
              // height : '750px',
              data: {
                animal: "panda",
                Title: title,
                jobResponseId: Jd,
                jobId: this.jobid,
                ProfileId: val,
              },
            });
            shareddialogRef.afterClosed().subscribe((result) => {
              console.log("share Dialog result: ${result}");
            });
          }
     });  

      
    });
  }


  dataURLtoFile(dataurl, filename) {
 
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
}



  ngOnInit() {
    this.alertService.clear();
    // this.GetJobDataSourceDetails();
    (function ($) {
      // TODO: test multiple cards -- open and close function
      const $card = $(".page--job-details .tab-content .card");
      const $detailsBtn = $card.find(".show-matching-details");
      $detailsBtn.on("click", function (e) {
        e.preventDefault();
        const $selectedCard = $(this).closest(".card");
        const $detailsDiv = $selectedCard.find(".matching-details");
        const $detailsCloseBtn = $selectedCard.find(".close");
        $detailsDiv.toggleClass("open");

        $detailsCloseBtn.on("click", function (e) {
          e.preventDefault();
          $detailsDiv.removeClass("open");
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
    console.log("abc");
    this.PopulateJobdetail();
    this.GetCustomerSubscription();
  }

  // ngAfterViewInit() {
  //   for (const key in this.options) {
  //     this.defaultOptions[key] = this.options[key];
  //   }
  //   this.$owlElement = $(this.el.nativeElement).owlCarousel(this.defaultOptions);
  // }
  ngOnChange() {
    console.log("on change", this.jobid, this.statusid);
  }
  updateWishlist(ev, profileId) {
    // this.wsList.IsSaved = event.target.checked;
    // this.wsList.ProfileId = profileId;
    // this.wsList.JobId = this.jobid;
    // this.jobdetailsservice.updateWishlist(this.wsList).subscribe(res => {
    //   console.log(res);
    // });
    this.parentApi.CallwishList(ev, profileId, this.jobid);
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
    this.ProfileId = profileId;
    this.iconHide = true;
    if (profileOrSizzle === true) {
      $(".matching-details").removeClass("open");
      $("#profileVideo-" + profileId).toggleClass("open");
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

  DownloadResume(val, profileId): void {
    this._service.GetService("ProfileAPI/api/GetResume?profileId=", profileId).subscribe((fileData) => {
      this.fileType = fileData;
      let exp = this.fileType.Url.split(".").pop();
      this.fileExt = exp;
      this.toastr.success("Downloading!", "Success!");
      setTimeout(() => {
        this.toastr.dismissToast;
      }, 3000);
      //debugger

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
  displayVideo(profileId, videoSizzle, videoProfile, profileOrSizzle) {
    //this.debugger
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
    this.ProfileId = profileId;
    this.iconHide = true;
    this.profileFlipVideo.VideoProfile = videoProfile;
    this.profileFlipVideo.VideoSizzle = this.settingsService.settings.IdentityV1baseUrl + videoSizzle;
    // $('.matching-details').removeClass('open');
    debugger
    // $('#matchingDetails-' + profileId).toggleClass('open');
    if (profileOrSizzle === true) {
      if (this.profileFlipVideo.VideoSizzle == null && this.profileFlipVideo.VideoProfile != null) {
        $(".matching-details").removeClass("open");
        $("#profileVideo-" + profileId).toggleClass("open");
      } else {
        $(".matching-details").removeClass("open");
        $("#sizzleVideo-" + profileId).toggleClass("open");
      }
    } else {
      $(".matching-details").removeClass("open");
      $("#profileVideo-" + profileId).toggleClass("open");
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
      this.skills = skills.split(",", 3);

      /// display elements  ///
      // let i = 0;
      // for (i = 0; i < a1.length; i++) {
      // // document.write(a1[i] + '<br >');
      // this.skills=
      // }
    }
  }

  PopulateDocuments(PId) {
    this._service.GetService('ProfileAPI/api/GetProfileDocuments?jobId=', this.jobid + '&profileId=' + PId)
      .subscribe(
        r => {
          this.MyDocuments = r;
        });

  }

  DelDocument(d,Pid)
  {
    this._service.DeleteService("ProfileAPI/api/DeletePD?Id=", d).subscribe((dt) => {
      if(dt==0)
      { 
        this.toastr.success("File Deleted!", "Success!");
      setTimeout(() => {
        this.toastr.dismissToast;
      }, 3000);
    
        this.PopulateDocuments(Pid);
      }
    })
  }

  OpenDocuments(Name,PId)
  {
    const dialogRef = this.dialog.open(CdocumentManagerComponent,
      {
        width: '65vw',
        position: { right: '0px' },
        height: '100vh',
        data: {
          jobId: this.jobid,
          ProfileId: PId,
          Name:Name
        },
        panelClass:'upload__resume__modal'
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      // this.populateJobsStaticInfo(this.customerId, this.jobid, 1);
      // this.updateappliedstatus();
      this.PopulateDocuments(PId);
      this.myEvent.emit(null);
      this.iconHide = false;
      console.log('Dialog result: ${result}');
    });
  }



  GetCandidateApproval(job) {
    this.valJobForm.value.ProfileId = job;
    this.valJobForm.value.JobId = this.jobid;
    this._service.PostService(this.valJobForm.value, 'JobsAPI/api/GetCandidateApprovalById')
      .subscribe(data => {
        console.log('data');
      },
        error => console.log(error));
  }


  OpenUpload(profileId)
  {
    const dialogRef = this.dialog.open(EditprofileComponent,
      {
        width: '65vw',
        position: { right: '0px' },
        height: '100vh',
        data: {
          jobId: this.jobid,
          ProfileId: profileId
        },
        panelClass:'upload__resume__modal'
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      //this.populateJobsStaticInfo(this.customerId, this.jobid, 1);
      // this.updateappliedstatus();
      this.myEvent.emit(null);
      this.iconHide = false;
      this.GetMatchingPercentage(profileId, this.jobid);
      console.log('Dialog result: ${result}');
      
    });
  }


  GetMatchingPercentage(profileId, jobid): any {
    // var profileId = 10;
    // var jobid = 10;
    this.jobdetailsservice.GetJobMatchingCriteriaEndPoint(profileId, this.jobid).subscribe((res) => {
      this.matchingParameterDetails = res;
      // if (this.matchingParameterDetails.isPublic) {
      //   this.matchingParameterDetails.Jobfit_Total = ((this.matchingParameterDetails.Jobfit_Total) * 30 / 100);
      //   this.matchingParameterDetails.Skillfit_Total = ((this.matchingParameterDetails.Skillfit_Total) * 50 / 100);
      // } else {
      //   this.matchingParameterDetails.Jobfit_Total = ((this.matchingParameterDetails.Jobfit_Total) * 40 / 100);
      //   this.matchingParameterDetails.Skillfit_Total = ((this.matchingParameterDetails.Skillfit_Total) * 60 / 100);
      // }
      this.matchingParameterData.Role = this.matchingParameterDetails.Role;
      this.matchingParameterData.Jobfit_Total = this.matchingParameterDetails.Jobfit_Total;
      this.matchingParameterData.Personalityfit_Total = this.matchingParameterDetails.Personalityfit_Total;
      this.matchingParameterData.Skillfit_Total = this.matchingParameterDetails.Skillfit_Total;
      this.matchingParameterData.Personalityfit = this.matchingParameterDetails.Personalityfit;
      this.matchingParameterData.CultureFit = this.matchingParameterDetails.CultureFit;
      this.matchingParameterData.SkillFit = this.matchingParameterDetails.SkillFit;
      this.matchingParameterData.JobFit = this.matchingParameterDetails.JobFit;
      setInterval(() => {
        this.backRadarChartData.datasets[0].data = [this.matchingParameterData.JobFit, this.matchingParameterData.SkillFit, this.matchingParameterData.CultureFit, this.matchingParameterData.Personalityfit, 0]
        //this.smartCardRadarChartData.datasets[0].data=[this.matchingParameterData.JobFit,this.matchingParameterData.SkillFit,this.matchingParameterData.CultureFit,this.matchingParameterData.Personalityfit,0]
      }, 1000);

      console.log("matchingParameterDetails", this.matchingParameterDetails);
      this.getGraph();
    });
    return this.matchingParameterDetails;
  }
  GetPersonalityTestFit() { }

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
  @ViewChild("testChart") testChart: ElementRef;
  getGraph() {
    var responseList = [];
    var count = 0;
    if (this.testChart) {
      var testChartCanvas = this.testChart.nativeElement.getContext("2d");
      if (this.matchingParameterDetails.isPublic) {
        var weekChart = new Chart(testChartCanvas, {
          type: "doughnut",
          options: {
            title: {
              display: true,
            },
            circumference: Math.PI,
            rotation: 1.0 * Math.PI,
            responsive: true,
            legend: { position: "bottom" },
            animation: { animateScale: true, animateRotate: true },
          },
          data: {
            value: 35,
            labels: ["Skill Fit", "Job Fit"],
            render: "labels",
            datasets: [
              {
                labels: ["Red", "Yellow", "Blue"],
                label: "# of Votes",
                data: [
                  this.matchingParameterData.Skillfit_Total > 0
                    ? Math.round(this.matchingParameterData.Skillfit_Total)
                    : 0,
                  this.matchingParameterData.Jobfit_Total > 0 ? Math.round(this.matchingParameterData.Jobfit_Total) : 0
                  // ,
                  // Math.round(this.matchingParameterData.Personalityfit_Total),
                ],
                backgroundColor: ["rgba(101,105, 169, 1)", "rgba(63, 184, 179, 1)", "rgba(236, 136, 133, 1)"],
              },
            ],
          },
        });
      } else {
        var weekChart = new Chart(testChartCanvas, {
          type: "doughnut",
          options: {
            title: {
              display: true,
            },
            circumference: Math.PI,
            rotation: 1.0 * Math.PI,
            responsive: true,
            legend: { position: "bottom" },
            animation: { animateScale: true, animateRotate: true },
          },
          data: {
            value: 35,
            labels: ["Skill Fit", "Job Fit"],
            render: "labels",
            datasets: [
              {
                labels: ["Red", "Yellow", "Green"],
                label: "# of Votes",
                data: [
                  this.matchingParameterData.Skillfit_Total > 0
                    ? Math.round(this.matchingParameterData.Skillfit_Total)
                    : 0,
                  this.matchingParameterData.Jobfit_Total > 0 ? Math.round(this.matchingParameterData.Jobfit_Total) : 0,
                ],
                backgroundColor: ["rgba(101,105, 169, 1)", "rgba(63, 184, 179, 1)"],
              },
            ],
          },
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
export class CandidateCertifications {
  CertificationId: number;
  CertificationName: string;
  Certified: boolean;
  CreatedOn: string;
  ImageUrl: string;
  IssuedBy: string;
  LifeTime: string;
  ModifiedOn: string;
  ProfileId: number;
  ProviderId: string;
  YearOfAchievement: string;
}

export class CandidateDomains {
  CandidateDomainId: number;
  CreatedBy: number;
  CreatedOn: string;
  Description: string;
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

export class addon {
  SubscriptionId: string;
  AddonId: string;
  AddonUnitPrice: number;
  AddonQuantity: number;
}

export class RequestRefernce {
  refereeFullName: string
  candFullName: string
  referenceType: string
  comments: string
  jobTitle: string
  jobId: number
  appLink: string
  toEmailId: string
  applicationName: string
  clientLogo: string
  fromID: string
}

export class JobStatus {
  public FullName: string;
  public AppLink: string;
  public JobStatus: string;
  public ToEmailID: string;
  public JobLocation: string;
  public FromEmail: string;
  public JobTitle: string;
}

export class JobStatusA {
  public FullName: string;
  public AppLink: string;
  public JobStatus: string;
  public ToEmailID: string;
  public JobLocation: string;
  public FromEmail: string;
  public Company: string;
  public SCName: string;
  public JobTitle: string;
}

export class Notes {
  public ProfileId: Number
  public JobId: Number
  public customerUserId: Number
  public statusId: Number
  public toUserId: string
  public isCandidate: boolean
  public Comments: string
  public Doc: string
  public OtherInfo: string
}

export class Notification {
  FromUserId: Number;
  ToUserId: Number;
  CustomerId: Number;
  JobId: Number;
  NotificationTypeId: Number;
  Message: string
}
export class EditNotes {
  public JobId: Number;
  public CId: Number;
  public OldComment: string;
  public NewComment: string;
  public ProfileId: Number;
}

export class DeleteProfile {
  public Name: string;
  public CustName: string;
  public ToEmailId: string;
  public JobTitle: string;
  public FromEmail:string;
}

