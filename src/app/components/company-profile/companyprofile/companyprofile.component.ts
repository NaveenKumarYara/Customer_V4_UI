import { Component, OnInit, Input, Inject, ViewContainerRef } from '@angular/core';
import { ChangeDetectorRef, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import * as Chart from 'chart.js'
import { ChartsModule } from 'ng2-charts';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {GetCustomerDepartments} from '../../../../models/GetCustomerDepartments';
import { GetCustomerClients } from "../../../../models/GetCustomerClients";
import { AppService } from '../../../app.service';
import { ApiService } from '../../../shared/services/api.service/api.service';
import { CompanyProfileService } from '../company-profile.service';
import { CompanyProfile } from '../../../../models/companyprofile';
import { CompanyProfileOtherIno } from '../../../../models/companyprofile-otherinfo';
import { CustomerLocationInfo } from '../../../../models/customerlocationinfo';
import { GetCompanyLogo } from '../../../../models/GetCompanyLogo';
import { GetAboutCompany } from '../../../../models/GetAboutCompany';
import { GetCompanyBenefit } from '../../../../models/GetCompanyBenefit';
import { CompanySpecialities } from '../../../../models/CompanySpecialities';
import { GetCompanyTechnology } from '../../../../models/GetCompanyTechnology';
import { GetCompanyWhitePaper } from '../../../../models/GetCompanyWhitePaper';
import { GetCompanyNewsInfo } from '../../../../models/GetCompanyNewsInfo';
import {  GetCompanyPartner } from '../../../../models/GetCompanyPartner';
import {  GetCompanyCulture } from '../../../../models/GetCompanyCulture';
import { GetCompanyCertification } from '../../../../models/GetCompanyCertification';
import { GetCompanyAchievement } from '../../../../models/GetCompanyAchievement';
import { CultureTestComponent } from '../culturetest/culturetest.component';
import { GetQuestionnarieAssignement, GetQuestionnarieResponse } from '../../../../models/SubmitReference';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-companyprofile',
  templateUrl: './companyprofile.component.html',
  styleUrls: ['./companyprofile.component.css'],
  providers: [AppService]
})
export class CompanyprofileComponent implements OnInit {
    //culturetestref: MatDialogRef<CultureTestComponent>;
    customer:any;
    customerId:any;
    userId:any;
    show:boolean=false;
    getCustomerDepartments: GetCustomerDepartments[];
    getCustomerClients:GetCustomerClients[];
    companyprofile: CompanyProfile;
    CustomDetails : GetCustomDomain;
    companyprofileotherinfo: CompanyProfileOtherIno;
    companyprofilelocationinfo: CustomerLocationInfo[];
    getaboutcompany: GetAboutCompany[];
    getcompanybenfit: GetCompanyBenefit[];
    companyspecialities : CompanySpecialities[];
    getcompanytechnology : GetCompanyTechnology[];
    getcompanylogo:GetCompanyLogo;
    getcompanywhitepaper: GetCompanyWhitePaper[];

    getcompanynewsinfo: GetCompanyNewsInfo[];
    getcompanypertner:GetCompanyPartner[];
    getcompanycertification: GetCompanyCertification[];
    getcompanycluture:GetCompanyCulture[];
    getcompanyachivements: GetCompanyAchievement[];
    graphLabelCult: any[] = [];
    graphDataCult: any[] = [];
    graphLabelList1: LegendList[] = [];
    pTestAvg: any;
    @ViewChild('testChart1') testChart1: ElementRef;
    @ViewChild('testChart2') testChart2: ElementRef;
    @ViewChild('testChart3') testChart3: ElementRef;
    @ViewChild('testChart4') testChart4: ElementRef;
    @ViewChild('testChart5') testChart5: ElementRef;
    @ViewChild('testChart6') testChart6: ElementRef;
    @ViewChild('testChart9') testChart9: ElementRef;
    fullname: any;
    questionnaireAssignmentDetails: any;
    param: Param = new Param();
    progress: number = -1;
    progressbarStatus: number = 0;
    progressTileSize: number = 0;
    firstname: any;
    lastname: any;
    graphPer: any[] = [];
    response: string[] = ['Agree', 'Somewhat Agree', 'Somewhat Disagree', 'Disagree'];
    profileRating;
    locations: any;
    city: any;
    zipcode: any;
    statename: any;
    statecode: any;
    success: any;
    culturalAvg: any;
    tempList: any[] = [];
    certifications: any = [];
    iseditProfile: any = false;
    public debug_size_before: string[] = [];
    public debug_size_after: string[] = [];
    userInfo: GetQuestionnarieResponse;
    questionList: any[] = [];
    personalityTestquestionList: any[] = [];
    culturalTestquestionList: any[] = [];
    displayQuestion: any[] = [];
  
    filterquestionList: any[] = [];
    cdomain = new CustomDomain();
    usersList: GetQuestionnarieAssignement[] = [];
    storequestionResponse: QuestionnaireResponses[] = [];
    questionResponse: QuestionnaireResponses[] = [];
    userResponse: UserResponse;
    PersonalityResponse: UserResponse;
    CulturalResponse: UserResponse;
    ShowDomain:boolean=false;
    questionRes: QueResponse = new QueResponse();
    listOfScore: number[] = [];
    listOfPercentage: ResponsePer[] = [];
    testType: any;
    groupId: any = 0;
    Radioans = [
      { value: 1, checked: "true" },
      { value: 2, checked: "true" },
      { value: 3, checked: "true" },
      { value: 4, checked: "true" },
      { value: 5, checked: "true" },
      { value: 6, checked: "true" },
      { value: 7, checked: "true" },
      { value: 8, checked: "true" },
      { value: 9, checked: "true" },
      { value: 10, checked: "true" },
      { value: 11, checked: "true" },
      { value: 12, checked: "true" }
    ];
    RankDataList: CulturalQuestionRankMapping[] = [];
    subs = new Subscription();
    graphData: any[] = [];
    responseData: ResponseData;
    graphLabel: any[] = [];
    graphLabel1: any[] = [];
    graphLabel2: any[] = [];
    graphLabel3: any[] = [];
    graphLabel4: any[] = [];
    graphLabel5: any[] = [];
    graphLabel6: any[] = [];
    graphData1: any[] = [];
    graphData2: any[] = [];
    graphData3: any[] = [];
    graphData4: any[] = [];
    graphData5: any[] = [];
    graphData6: any[] = [];
    culturalPref: CulturalQuestionRank[] = [];
    queans: number = 0;
    questionnaireAssignmentId: any;
    questionnaireId: any;
    CulturalTestStatus: number = 0;
    PersonalityTestStatus: number = 0;
    selectedSlice: number = -1;
    graphLabelList: LegendList[] = [];


  constructor(private toastr: ToastsManager,
    private _vcr: ViewContainerRef,
    private route: ActivatedRoute,
    private dragula: DragulaService,
    private _service: ApiService, private appService: AppService, private dialog: MatDialog, 
      private router: Router, private companyprofileservice: CompanyProfileService) { 
        
    this.dragula.createGroup('Cultural', {});
    this.dragula.dropModel('Cultural').subscribe((data: any) => console.log('dropModel: ', JSON.stringify(data['targetModel'], null, 2)));

        this.customer = JSON.parse(sessionStorage.getItem('userData'));
        debugger
        this.customerId =this.customer.CustomerId;
        this.userId=this.customer.UserId;
        this.toastr.setRootViewContainerRef(_vcr);  

      }

    populateCompanyProfile(customerId) {
        return this.companyprofileservice.getCompanyProfile(customerId).subscribe(res => {
            this.companyprofile = res;
        });
    }

    populateCompanyProfileOtherInfo(customerId) {
        return this.companyprofileservice.getCompanyProfileOtherInfo(customerId).subscribe(res => {
            this.companyprofileotherinfo = res;
        });
    }

    populateCompanyLogo(customerId) {
        return this.companyprofileservice.getCompanyLogo(customerId).subscribe(res => {
            this.getcompanylogo= res;
        });
    }

    populateAboutCompanyInfo(customerId) {
        return this.companyprofileservice.getCompanyAboutInfo(customerId).subscribe(res => {
            this.getaboutcompany = res;
        });
    }

    populateCompanyBenfits(customerId) {
        return this.companyprofileservice.getCompanyBenfits(customerId).subscribe(res => {
            this.getcompanybenfit = res;
        });
    }
drop(event: any): void {
    console.log('drop event: ', event);// JSON.stringify(event, null, 2));
    console.log('drop event: ', this.Radioans);
    // this.Radioans[4].checked = "34"
    var a = this.Radioans[1].checked.split("_");
    console.log(' a: ', a);
    for (var i = 0; i < this.filterquestionList.length; i++) {
      var queId = this.filterquestionList[i].id;
      for (var j = 0; j < this.Radioans.length; j++) {
        if (this.Radioans[j].checked != "true") {
          var a = this.Radioans[j].checked.split("_");
          if (queId == Number(a[0])) {
            var temp = this.Radioans[i].checked;
            this.Radioans[i].checked = a[0] + "_" + a[1] + "_" + a[2];
            this.Radioans[j].checked = temp;
          }
          // var index = this.filterquestionList.findIndex(x => x.id == Number(a[0]));
          //console.log('index: ', index);
        }
      }
    }
    console.log('drop event: ', this.Radioans);
  }
    populateCompanyTechnologies(customerId) {
        return this.companyprofileservice.GetCompanyTechnologies(customerId).subscribe(res => {
            this.getcompanytechnology = res;
        });
    }
    OpenCultureTestDialog() {
        const testRef = this.dialog.open(CultureTestComponent,
          {
             // width: '1000px',
             position: {right : '0px'},
            // height : '750px',
            data: {
              animal: 'panda',
    
            }
          }
        );
        testRef.afterClosed().subscribe(result => {
          console.log('share Dialog result: ${result}');
        });
      }


  

    populateCompanySpecialities(customerId)
    {
        return this.companyprofileservice.getCompanySpecialities(customerId).subscribe(res => {
            this.companyspecialities = res;
        });
    }

    populateCompanyProfileLocationInfo(customerId) {
        return this.companyprofileservice.getCompanyCustomerLocationList(customerId).subscribe(res => {
            this.companyprofilelocationinfo = res;
        });
    }

    GetCustomerClients(customerId)
    {
    return this.appService.GetCustomerClients(customerId,0).subscribe(res => {
        this.getCustomerClients = res;
    });
    }

    GetCustomerDepartment(customerId)
   {
    return this.appService.GetCustomerDepartments(customerId,0).subscribe(res => {
    this.getCustomerDepartments = res;
   });
   }

   GetCustomDomain()
   {
    this._service.GetService('IdentityAPI/api/GetCustomDomainDetails?email=',this.customer.Email).subscribe(data => {
      this.CustomDetails = data;
      if(data.CustomDomain === true)
      {     
        this.ShowDomain = true;
      }
      else
      {
        this.ShowDomain = false;
      }
      
    })
   }

   getcandidateview()
   {
     this.router.navigateByUrl('app-candidateview')
   }
    ngOnInit() {
        this.GetCustomDomain();
        this.populateCompanyProfile(this.customerId);
        this.populateCompanyProfileOtherInfo(this.customerId);
        this.populateCompanyProfileLocationInfo(this.customerId);
        this.populateCompanyLogo(this.customerId);
        this.populateAboutCompanyInfo(this.customerId);
        this.populateCompanyBenfits(this.customerId);
        this.populateCompanySpecialities(this.customerId);
        this.populateCompanyTechnologies(this.customerId);      
        this.GetCustomerClients(this.customerId);
        this.GetCustomerDepartment(this.customerId);
        this.GetAllQuestion();
        this.GetTestStatus();
        this.GetCulturalPref();
        this.userInfo = new GetQuestionnarieResponse(0, 0, 0, null, null, null);
  }

  
  GetCulturalPref() {
    this._service.GetServiceCall('QuestionAPI/api/Question/GetPrefference')
      .subscribe(
        data => {
          this.culturalPref = data;
          console.log("CulturalPref--------", this.culturalPref);          // console.log("Data-------------------", data);
        });
  }


  GetQuestionnaireResponses(questionnaireAssignmentId: any) {
    this._service.GetService('ProfileAPI/api/GetQuestionnaireResponses?questionnaireAssignmentId=', questionnaireAssignmentId)
      .subscribe(
        data => {
          this.userInfo = data;
        });
  }
  switchQue(el: HTMLElement, type) {
    if (this.queans == 6) {
      this.saveTestResponse(el, type);
    }
  }
  scroll(el: HTMLElement, type) {
    el.scrollIntoView();
    this.testType = type;
    this.questionResponse = [];
    this.storequestionResponse = [];
    this.Radioans.forEach(a => a.checked = "true");
    this.progressbarStatus = 0;
    this.progress = this.progress + 1;
    this.GetQuestionnaireResponse(this.customer.Email, type);
  }
  getDetails(mail) {
    this._service.GetService('QuestionAPI/api/QuestionnaireAssignment?mail=', mail).subscribe(data => {
      this.questionnaireAssignmentDetails = data;
    })
  }

  isChecked() {
    this.progress = -1;
    this.filterquestionList = [];
  }
  onChange(elements) {
    alert("ssss");
    console.log(elements, "elements");

  }

  AddRank() {
    for (var j = 0; j < this.Radioans.length; j++) {
      if (this.Radioans[j].checked != "true") {
        var RankData = new CulturalQuestionRankMapping();
        var a = this.Radioans[j].checked.split("_");
        RankData.CId = this.customerId;
        RankData.IsCustomer = true;
        RankData.QuestionId = Number(a[0]);
        RankData.Rank = j + 1;
        this.RankDataList.push(RankData);
        // var index = this.filterquestionList.findIndex(x => x.id == Number(a[0]));
        //console.log('index: ', index);
      }
    }
    this._service.PostService(this.RankDataList, 'QuestionAPI/api/Question/AddCulturalRank').subscribe(data => {
      if (data)
        console.log("Candidate Question Rank is added");
    });
  }

  saveTestResponse(el: HTMLElement, type) {
    this.calculateResponseval();
    this.AddRank();
    //Save Personal Test Details
    this.listOfPercentage = [];
    this.queans = 0;
    this.questionRes.questionnaireResponses = this.questionResponse;

    // this.questionRes.responsePer = this.listOfPercentage;
    if (this.progressbarStatus + this.progressTileSize == 100) {
      this.questionRes.state = "Completed";
    } else {
      this.questionRes.state = "Not Completed";
    }
    if (this.progressbarStatus >= 100) {
      this.progress = -1;
      this.getGraph();
    }
    if (this.questionResponse.length > 0) {
      console.log(this.questionRes);
      this._service.PostService(this.questionRes, 'QuestionAPI/api/QuestionnaireResponses')
        .subscribe(data => {

          if (this.questionRes.state == "Completed") {
            this.toastr.success('Saved Successfully!', 'Success!');
          }
          this.GetTestStatus();
          this.questionResponse = [];
          this.storequestionResponse = [];
          this.listOfScore = [];
          if (this.progressbarStatus < 100) {
            this.progress = this.progress + 1;
            this.progressbarStatus = this.progressbarStatus + this.progressTileSize;
            if (type != "Save") {
              this.scroll(el, type);
            } else if (this.progressbarStatus >= 100) {
              this.progress = -1;
              this.getGraph();
            }
            if (this.questionList[this.progress] != null) {
              this.groupId = this.questionList[this.progress].groupId;

              this.filterquestionList = this.questionList[this.progress].question;
            }

          } else {
            this.progress = -1;
          }
          setTimeout(() => {
            this.toastr.dismissToast;
          }, 3000);
        });
    }
  }


SaveCustomDomain()
{
this.cdomain.CustomerId = this.customerId;
if(this.cdomain.IsDomain === true)
{
  this.cdomain.DomainUrl = 'https://' + this.companyprofile.CompanyName + '.arytic.com'
}
debugger
this._service.PostService(this.cdomain, 'IdentityAPI/api/InsertCustomerCustomDomain')
.subscribe(data => {
  if(data==0)
  {
  this.GetCustomDomain();
  }
},

  error => console.log(error));

  }

  // getProgressBar Updated Value
  getprogressStatus() {
    return this.progressbarStatus;
  }
  showSubGraph(index) {
    this.selectedSlice = index;
    this.getGraph();
  }

  showGraph() {
    this.progress = -2;
    this.selectedSlice = -1;
    this.getGraph();
  }
  @ViewChild('testChart') testChart: ElementRef;
  getGraph() {
    var mail = this.customer.Email;
    this.getCultGraph(mail);

    var responseList = [];

    this._service.GetService('QuestionAPI/api/QuestionnaireResponses?mail=', mail)
      .subscribe(
        data => {
          var userResponse = data;
          userResponse.questionnaireResponses.forEach(as => {
            responseList.push(Number(as.responseValue));
          });

          for (var i = 0; i < responseList.length; i++) {
            if (i % 2 == 0) {
              var temp = i + 1;
              if (responseList[i + 1] > 0)
                this.graphPer.push(((Number(responseList[i]) + Number(responseList[i + 1])) / 8) * 100);
              else
                this.graphPer.push(((Number(responseList[i]) + 0) / 8) * 100);
            }
          }
        });
    if (this.selectedSlice == -1) {
      this._service.GetService('QuestionAPI/api/QuestionnaireResult/GetQuestionnaireGroupResult?mail=', mail)
        .subscribe(
          data => {
            this.graphData6 = [];
            this.graphLabel6 = [];
            var userResponse = data;
            this.graphLabelList = [];

            var count = 0;
            if (this.testChart) {
              var testChartCanvas = this.testChart.nativeElement.getContext('2d');
              userResponse.forEach((a, index) => {
                this.graphData6.push(a.response.toFixed(2));
                this.graphLabel6.push(a.groupName);
                this.graphLabelList.push(new LegendList());
                this.graphLabelList[index].GroupLabel = (a.groupName);
                this.graphLabelList[index].GroupPer = (a.response.toFixed(2));
                this.pTestAvg = a.response.toFixed(2);
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
                  labels: this.graphLabel6,
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
                    data: this.graphData6,
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
          });
    }
    this._service.GetService('QuestionAPI/api/QuestionnaireResult?mail=', mail)
      .subscribe(
        data => {
          this.graphData = [];
          var userResponsedata = data;

          var count = 0;


          if (this.testChart1) {

            var testChart1Canvas = this.testChart1.nativeElement.getContext('2d');
            this.graphLabel1 = [];
            this.graphData1 = [];
            userResponsedata[0].questionnaireResultList.forEach(b => {

              this.graphData1.push(b.response);
              this.graphLabel1.push(b.groupName);
            })
            var weekChart = new Chart(testChart1Canvas, {
              type: 'bar',
              options: {

                scales: {
                  yAxes: [{
                    ticks: {
                      max: 100,
                      min: 0,
                      stepSize: 10
                    }
                  }]
                },
                title: {
                  display: true,
                  text: userResponsedata[0].groupName
                },
                legend: {
                  display: false,
                },
              },
              scales: {
                yAxes: [{
                  ticks: {
                    max: 100,
                    min: 0,
                    stepSize: 10
                  }
                }]
              },
              data: {
                labels: this.graphLabel1,
                datasets: [{
                  labels: [
                    'Red',
                    'Yellow',
                    'Blue'
                  ],
                  data: this.graphData1,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(95, 102, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                    'rgba(235, 149, 164, 0.7)'
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(95, 102, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                    'rgba(235, 149, 164, 0.7)'
                  ],
                }
                ]
              }
            });
          }

          if (this.testChart2) {

            var testChart2Canvas = this.testChart2.nativeElement.getContext('2d');
            this.graphLabel2 = [];
            this.graphData2 = [];
            userResponsedata[1].questionnaireResultList.forEach(a => {

              this.graphData2.push(a.response);
              this.graphLabel2.push(a.groupName);
            })
            var weekChart = new Chart(testChart2Canvas, {
              type: 'bar',
              options: {
                title: {
                  display: true,
                  text: userResponsedata[1].groupName
                },
                scales: {
                  yAxes: [{
                    ticks: {
                      max: 100,
                      min: 0,
                      stepSize: 10
                    }
                  }]
                },
                legend: {
                  display: false,
                },

              },
              data: {
                labels: this.graphLabel2,
                datasets: [{
                  labels: [
                    'Red',
                    'Yellow',
                    'Blue'
                  ],
                  data: this.graphData2,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(95, 102, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                    'rgba(235, 149, 164, 0.7)'
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(95, 102, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                    'rgba(235, 149, 164, 0.7)'
                  ],
                }
                ]
              }
            });
          }

          if (this.testChart3) {

            var testChart3Canvas = this.testChart3.nativeElement.getContext('2d');
            this.graphLabel3 = [];
            this.graphData3 = [];
            userResponsedata[2].questionnaireResultList.forEach(a => {

              this.graphData3.push(a.response);
              this.graphLabel3.push(a.groupName);
            })
            var weekChart = new Chart(testChart3Canvas, {
              type: 'bar',
              options: {
                title: {
                  display: true,
                  text: userResponsedata[2].groupName
                },
                scales: {
                  yAxes: [{
                    ticks: {
                      max: 100,
                      min: 0,
                      stepSize: 10
                    }
                  }]
                },
                legend: {
                  display: false,
                },

              },
              data: {
                labels: this.graphLabel3,
                datasets: [{
                  labels: [
                    'Red',
                    'Yellow',
                    'Blue'
                  ],
                  data: this.graphData3,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(95, 102, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                    'rgba(235, 149, 164, 0.7)'
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(95, 102, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                    'rgba(235, 149, 164, 0.7)'
                  ],
                }
                ]
              }
            });
          }

          if (this.testChart4) {

            var testChart4Canvas = this.testChart4.nativeElement.getContext('2d');
            this.graphLabel4 = [];
            this.graphData4 = [];
            userResponsedata[3].questionnaireResultList.forEach(a => {

              this.graphData4.push(a.response);
              this.graphLabel4.push(a.groupName);
            })
            var weekChart = new Chart(testChart4Canvas, {
              type: 'bar',
              options: {
                title: {
                  display: true,
                  text: userResponsedata[3].groupName
                },
                scales: {
                  yAxes: [{
                    ticks: {
                      max: 100,
                      min: 0,
                      stepSize: 10
                    }
                  }]
                },
                legend: {
                  display: false,
                },

              },
              data: {
                labels: this.graphLabel4,
                datasets: [{
                  labels: [
                    'Red',
                    'Yellow',
                    'Blue'
                  ],
                  data: this.graphData4,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(95, 102, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                    'rgba(235, 149, 164, 0.7)'
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(95, 102, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                    'rgba(235, 149, 164, 0.7)'
                  ],
                }
                ]
              }
            });
          }
          if (this.testChart5) {

            var testChart5Canvas = this.testChart5.nativeElement.getContext('2d');
            this.graphLabel5 = [];
            this.graphData5 = [];
            userResponsedata[4].questionnaireResultList.forEach(a => {

              this.graphData5.push(a.response);
              this.graphLabel5.push(a.groupName);
            })
            var weekChart = new Chart(testChart5Canvas, {
              type: 'bar',
              options: {
                title: {
                  display: true,
                  text: userResponsedata[4].groupName
                },
                scales: {
                  yAxes: [{
                    ticks: {
                      max: 100,
                      min: 0,
                      stepSize: 10
                    }
                  }]
                },
                legend: {
                  display: false,
                },

              },
              data: {
                labels: this.graphLabel5,
                datasets: [{
                  labels: [
                    'Red',
                    'Yellow',
                    'Blue'
                  ],
                  data: this.graphData5,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(95, 102, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                    'rgba(235, 149, 164, 0.7)'
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(95, 102, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                    'rgba(235, 149, 164, 0.7)'
                  ],
                }
                ]
              }
            });
          }

        });

  }

  GetAllQuestion() {
    this.param.mail = this.customer.Email;
    this.param.queType = 'Cultural Test';
    this.param.groupId = 6;
    this._service.PostService(this.param, 'QuestionAPI/api/Question')
      .subscribe(
        data => {
          this.culturalTestquestionList = data;
          console.log("this.culturalTestquestionList ", this.culturalTestquestionList);
          this.calculateCulturalTestStatus();
        });

    this.param.mail = this.customer.Email;
    this.param.queType = 'Personality Test';
    this.param.groupId = 6;
    this._service.PostService(this.param, 'QuestionAPI/api/Question')
      .subscribe(
        data => {

          this.personalityTestquestionList = data;
          console.log("this.personalityTestquestionList ", this.personalityTestquestionList);
          this.CalculatePersonalityTestStatus();
        });
  }

  //function for get Question List 
  GetQuestionList(type: string) {
    var ans_no_of_que = 0;
    this.param.mail = this.customer.Email;
    this.param.queType = type;
    this.param.groupId = 6;
    if (this.userResponse != null) {
      if (this.userResponse.questionnaireResponses != null) {
        ans_no_of_que = (this.userResponse.questionnaireResponses.length);
      }
    }
    if ((ans_no_of_que == 60 && type == 'Personality Test') || (ans_no_of_que == 12 && type == 'Cultural Test')) {
      this.progress = -1;
      this.getGraph();
    } else {
      // this._service.PostService(this.param, 'QuestionAPI/api/Question')
      //   .subscribe(
      //     data => {
      if (this.testType == "Personality Test") {
        this.questionList = this.personalityTestquestionList;
        this.getDetails(this.param.mail);
        this.displayQuestion = this.personalityTestquestionList;
        this.progressTileSize = 100 / this.personalityTestquestionList.length;
      } else {
        this.questionList = this.culturalTestquestionList;
        this.getDetails(this.param.mail);
        this.displayQuestion = this.culturalTestquestionList;
        this.progressTileSize = 100 / this.culturalTestquestionList.length;
      }
      this.progressbarStatus = (ans_no_of_que / 6) * this.progressTileSize;
      if (this.progressbarStatus >= 100) {
        this.progress = -2;
        this.getGraph();
      } else {
        this.progress = (ans_no_of_que / 6)
        this.filterquestionList = this.questionList[(ans_no_of_que / 6)].question;
        this.questionnaireAssignmentId = this.questionList[(ans_no_of_que / 6)].questionnaireAssignmentId;
        this.questionnaireId = this.questionList[(ans_no_of_que / 6)].questionnaireId;
        this.groupId = this.questionList[ans_no_of_que / 6].groupId;
      }

      // });
    }
  }

  GetTestStatus() {
    var responseData = new ResponseData();
    responseData.mail = this.customer.Email;
    responseData.type = "Personality Test";
    this._service.PostService(responseData, 'QuestionAPI/api/QuestionnaireResponses/GetQuestionnaireRes')
      .subscribe(
        data => {
          this.PersonalityResponse = data;
          console.log("this.PersonalityResponse ", this.PersonalityResponse);
          if (data != null) {
            this.CalculatePersonalityTestStatus();
            // this.GetQuestionList(responseData.type);
          }
        });
    responseData = new ResponseData();
    responseData.mail = this.customer.Email;
    responseData.type = "Cultural Test";
    this._service.PostService(responseData, 'QuestionAPI/api/QuestionnaireResponses/GetQuestionnaireRes')
      .subscribe(
        data => {
          this.CulturalResponse = data;
          console.log("this.CulturalResponse ", this.CulturalResponse);
          if (data != null) {

            // this.GetQuestionList(responseData.type);
            this.calculateCulturalTestStatus();
          }
          var totalresponse = 0;
          if (this.CulturalResponse.questionnaireResponses.length == 12) {
            this.CulturalResponse.questionnaireResponses.forEach(element => {
              totalresponse = totalresponse + Number(element.responseValue);

            });
            this.culturalAvg = (totalresponse / (this.CulturalResponse.questionnaireResponses.length * 16)) * 100;
            // alert(totalresponse);
            // alert(avg);
          }
        });
  }



  getCultGraph(mail) {
    debugger
    //  var mail = "loft@gmail.com";
    this._service.GetService('QuestionAPI/api/QuestionnaireResult/GetCulturalGraphDetails?mail=', mail)
      .subscribe(
        data => {
          this.graphData = [];
          
          var userResponsedata = data;
          this.graphLabelList1 = [];
          var count = 0;

          if (this.testChart9) {

            var testChart9Canvas = this.testChart9.nativeElement.getContext('2d');
            this.graphLabelCult = [];
            this.graphDataCult = [];
            userResponsedata[0].questionnaireResultList.forEach((b, index) => {
              var value = (b.response / (3 * 16)) * 100
              this.graphDataCult.push(value);
              this.graphLabelCult.push(b.groupName);
              this.graphLabelList1.push(new LegendList());
              this.graphLabelList1[index].GroupId = (b.questionnaireGroupId);
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
        });
    // this.CulturalResponse.forEach(a=>a.)
    // QuestionnaireAssignment
  }

  calculateCulturalTestStatus() {
    var progressTileSize = 0;
    if (this.CulturalResponse != null) {
      if (this.CulturalResponse.questionnaireResponses != null) {
        var ans_no_of_que = (this.CulturalResponse.questionnaireResponses.length);
        progressTileSize = 100 / this.culturalTestquestionList.length;
        if (ans_no_of_que > 0 && progressTileSize > 0) {
          this.CulturalTestStatus = (ans_no_of_que / 12) * progressTileSize;
          console.log("CulturalTestStatus", this.CulturalTestStatus);
        }
      }
    }
  }
  CalculatePersonalityTestStatus() {
    var progressTileSize = 0;
    if (this.PersonalityResponse != null) {
      if (this.PersonalityResponse.questionnaireResponses != null) {
        var ans_no_of_que = (this.PersonalityResponse.questionnaireResponses.length);
        progressTileSize = 100 / this.personalityTestquestionList.length;
        if (ans_no_of_que > 0 && progressTileSize > 0) {
          this.PersonalityTestStatus = (ans_no_of_que / 6) * progressTileSize;
          console.log("PersonalityTestStatus", this.PersonalityTestStatus);
        }
      }
    }
  }

  GetQuestionnaireResponse(mail: string, type: string) {
    if (this.PersonalityResponse == null || this.CulturalResponse == null)
      this.GetTestStatus();
    if (type == "Cultural Test") {
      this.userResponse = this.CulturalResponse;
      this.GetQuestionList(type);
    }
    // else {
    //   this.userResponse = this.CulturalResponse;
    //   this.GetQuestionList(type);
    // }
  }
  getPesonalityTestStatus() {
    return this.PersonalityTestStatus;
  }
  getCulturalTestStatus() {
    return this.CulturalTestStatus;
  }
  handleChange(evt, value, queid) {
    var result = new QuestionnaireResponses();
    if (evt.target.checked) {
      // var res = value + 1;
      result.responseId = value;
      result.responseValue = (value + 1).toString();
      result.questionnaireAssignmentId = this.questionnaireAssignmentId;
      result.questionnaireId = this.questionnaireId;
      result.questionId = queid;
      if (this.storequestionResponse.find(a => a.questionId == queid)) {
        this.storequestionResponse.find(a => a.questionId == queid).responseId = value;
      } else {
        this.storequestionResponse.push(result);
      }
    }
    this.queans = this.storequestionResponse.length;
  }
  calculateResponseval() {
    var abc = 10;
    var list = this.storequestionResponse;
    this.storequestionResponse.forEach(a => {
      var value = a.responseId;
      var questionId = a.questionId;
      var cond = new QuestionCategoryMapping();
      this.userResponse.questionmappping.forEach(b => {
        if (b.questionId == questionId) {
          cond = b;
        }
      }
      );
      // var cond = this.userResponse.questionmappping.find(c => c.questionId == a.questionId);
      if (cond.questionId > 0) {

        a.responseId = a.responseId + 1;
        if (cond.questionCategoryId == 3) {
          a.responseValue = (value + 1).toString();
        }
        else {
          // a.responseId = a.responseId + 1;
          a.responseValue = (4 - value).toString();
        }
      } else {
        
        // var rank = new CulturalQuestionRank();
        // this.culturalPref.forEach(b => {
        //   if (b.questionId == questionId) {
        //     rank = b;
        //   }
        // }
        // );
        // if (rank.questionId > 0) {
        //   var data = 0;
        //   if (rank.preferrenceNo <= 3) {
        //     a.responseId = a.responseId + 1;
        //     data = a.responseId * 4;

        //     a.responseValue = (data).toString();
        //   } else if (rank.preferrenceNo >= 3 && rank.preferrenceNo <= 6) {
        //     a.responseId = a.responseId + 1;
        //     data = a.responseId * 3;

        //     a.responseValue = (data).toString();
        //   }
        //   else if (rank.preferrenceNo >= 6 && rank.preferrenceNo <= 9) {
        //     a.responseId = a.responseId + 1;
        //     data = a.responseId * 2;

        //     a.responseValue = (data).toString();
        //   }
        //   else {
        //     a.responseId = a.responseId + 1;
        //     data = a.responseId * 1;

        //     a.responseValue = (data).toString();
        //   }
        // }
        //  if(rank.PreferrenceNo > 9 && rank.PreferrenceNo < 12){}
        a.responseId = a.responseId + 1;
        // a.responseValue = value.toString();

        if (value == 0) {
          a.responseValue = (9).toString();
        } else if (value == 1) {
          a.responseValue = (3).toString();
        } else if (value == 2) {
          a.responseValue = (1).toString();
        } else if (value == 3) {
          a.responseValue = (0).toString();
        }
      }
    });
    this.questionResponse = this.storequestionResponse;
  }
}

export class LegendList {
  GroupLabel: string;
  GroupColor: string;
  GroupPer: string;
  GroupId: number;
}
export class CulturalQuestionRankMapping {
  Id: number;
  CId: number;
  QuestionId: number;
  IsCustomer: boolean;
  Rank: number;
}

export class Resume {
  ResumeId: number;
  ProfileId: number;
  Url: string;
  ResumeFile: string;
}

export class QuestionbyGroup {
  GroupName: any;
  Question: any[] = [];
}
export class Ans {
  checked: boolean;
}
export class Question {
  Id: number;
  Code: string;
  QuestionTypeId
  Description: string;
  Display: string
  DisplayOrder: string
  IsEnabled: boolean;
}
export class QuestionnaireResponses {
  questionnaireResponseId: number;
  questionnaireAssignmentId: number;
  questionnaireId: number;
  questionId: number;
  responseId: number;
  responseValue: string;
}

export class ResponsePer {
  groupId: number;
  QuestionnaireAssignmentId: number;
  QuestionnaireId: number;
  Percentage: number;
}

export class QueResponse {
  questionnaireResponses: QuestionnaireResponses[] = [];
  state: string;
  // responsePer: ResponsePer[] = [];
}

export class Param {
  mail: string;
  groupId: number;
  queType: string;
}
export class QuestionCategoryMapping {
  id: number;
  questionId: number;
  questionCategoryId: number;
  questionRelatedTo: number;
  code: string;
}
export class UserResponse {
  questionnaireResponses: QuestionnaireResponses[] = []
  questionmappping: QuestionCategoryMapping[] = [];
}

export class ResponseData {
  mail: string = '';
  type: string = '';

}

export class CustomDomain
{
  
    public CustomerId: number;
    public IsDomain: boolean;
    public DomainUrl: string;
  
}

export class GetCustomDomain
{
    CompanyName: string;
    CustomerId: number;
    ContactEmail: string;
    CustomDomain: boolean;
    CustomDomainUrl: string;
  
}

export class CulturalQuestionRank {
  id: number;
  customerId: number;
  candidateId: number;
  questionId: number;
  preferrenceNo: number;
}