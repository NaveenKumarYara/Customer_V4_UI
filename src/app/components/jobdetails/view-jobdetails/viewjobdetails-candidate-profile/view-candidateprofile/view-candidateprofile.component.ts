import { Component, OnInit, Inject, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from '../../../../../shared/services/api.service/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { JobdetailsService } from '../../../jobdetails.service';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';
import { HttpParams } from '@angular/common/http';
import * as Chart from 'chart.js'
import { ChartsModule } from 'ng2-charts';
import * as FileSaver from 'file-saver';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import { saveAs } from 'file-saver';
import { mappingdetails } from './mappingdetails';
declare var $: any;

// import { DialogData } from '../schedule-interview/schedule-interview.component';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-view-candidateprofile',
  templateUrl: './view-candidateprofile.component.html',
  styleUrls: ['./view-candidateprofile.component.css'],
  providers: [ApiService]
})
export class ViewCandidateprofileComponent implements OnInit {
  customer: any;
  customerId: any;
  userId: any;
  email: any;
  profileview: any;
  profileId: any;
  fileType = new Resume();
  fileExt: any;
  details: mappingdetails;
  list: any;
  noTest: boolean = false;
  isPublicAvailable: boolean = false;
  otherSkills: any = [];
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
  @ViewChild('testChart') testChart: ElementRef;
  @ViewChild('testChart1') testChart1: ElementRef;
  skilllist: any;

  chartOptions = {
    responsive: true,
    legend: {
      labels: {
        fontSize: 0
      }
    },
  };

  chartData = [
    { data: [330, 600, 260, 700, 200], label: 'Account A' },
  ];

  chartLabels = ['Openess to Experience', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Neuroticism'];
  private doughnutChartColors: any[] = [{ backgroundColor: ["#6569A9", "#3FB8B3", "#EC8885", "#666666", "#64A489"] }];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastsManager, private _vcr: ViewContainerRef,
    private _service: ApiService, private router: Router, private jobdetailsservice: JobdetailsService) {
    //this.preId = sessionStorage.getItem('Preid');
    this.noTest = false;
    this.profileId = JSON.parse(sessionStorage.getItem('Preid'));
  }

  DownloadResume(val): void {
      this._service.GetService('ProfileAPI/api/GetResume?profileId=', this.data.ProfileId)
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

    function cloudAttr() {

      $(".word-cloud angular-tag-cloud span").each(function () {
        $(this).addClass("tooltip1")
        // $('<div class="tooltip fade top in">'+$( this ).text()+'</div>').appendTo( this );
        $('<div class="tooltip fade bottom hover-active"><div class="tooltip-arrow"></div><div class="tooltip-inner">' + $(this).text() + '</div></div>').appendTo(this);
      });




    }
    cloudspan();
    this.GetCandidateSKills();
    this.GetProfileDetails();
    this.GetUserProfileInfo();
    this._service.GetService('ProfileAPI/api/GetProfileStatus?profileId=', this.data.ProfileId).subscribe(
      data => {
        var apiData = data;
        this.noTest = apiData.profileStatus;
        this.isPublicAvailable = apiData.isPublicAvailable;
        if (this.noTest) {
          this.GetCandidatePersonalityResult();
        }
      });
    
  }

  onChartClick(event) {
    console.log(event);
  }

  GetProfileDetails() {
    this._service.GetService('JobsAPI/api/GetUserInfoByProfileMapping?profileId=', this.data.ProfileId).subscribe(
      data => {
        this.details = data;
      })
  }

  GetCandidateSKills() {
    
     let params = new HttpParams();
     params = params.append('jobId',  this.data.jobId);
     params = params.append('profileId', this.data.ProfileId);
    this._service.GetService('JobsAPI/api/GetCandidatePrimarySkillUpdated?', params).subscribe(
      data => {
          this.skilllist = data;     
      })
  }

  GetCandidatePersonalityResult() {
    this._service.GetService('ProfileAPI/api/GetProfileEmail?profileId=', this.data.ProfileId).subscribe(
      email => {
        this.email = email.UserName;
        this.jobdetailsservice.getPersonalityTest(this.email).subscribe(
          data => {
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

  GetUserProfileInfo() {
    this._service.GetService('ProfileAPI/api/GetUserProfileInfo?profileId=', this.data.ProfileId).subscribe(
      datas => {
        this.profileview = datas;
        // this.profileview.ProfileBasicInfo.Email = this.profileview.ProfileBasicInfo.Email.contains('Esolvit') ? '' : this.profileview.ProfileBasicInfo.Email;
        this.list = datas.ProfileSkillset.filter(u => (u.ExpInYears > 0 || u.ExpInMonths > 0)
          && (u.ExpInYears != null && u.ExpInMonths != null));

        this.otherSkills = datas.ProfileSkillset.filter(u => (u.ExpInYears === 0 && u.ExpInMonths === 0)
          || (u.ExpInYears == null && u.ExpInMonths == null));

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
