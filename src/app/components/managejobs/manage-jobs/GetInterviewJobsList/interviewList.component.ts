import { Component, OnInit,  Input, ViewChild , ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ManageJobService } from '../../managejobs.service';
import { ScheduleInterviewComponent, ScheduleInterview } from '../../../jobdetails/view-jobdetails/viewjobdetails-candidate-profile/schedule-interview/schedule-interview.component';
import {UpdateInterviewComponent} from './UpdateScheduleInterview/updateInterview.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { JobDetails } from '../../models/jobdetails';
// import { ApiService } from '../../../../shared/services/api.service/api.service';
import { AppService } from '../../../../app.service';
import { AlertService } from '../../../../shared/alerts/alerts.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {GetInterviewSortList,Jobs} from '../../../../../models/GetInterviewSortList';
import {ValueArrayPipe} from '../../../managejobs/manage-jobs/ValueArrayPipe.pipe';
declare var $: any;

import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import { idLocale } from 'ngx-bootstrap';
@Component({
  selector: 'app-interviewList',
  templateUrl: './interviewList.component.html',
  styleUrls: ['./interviewList.component.css','./interviewListUI.component.css'],
  providers: [ ValueArrayPipe ]
})
export class InterviewListComponent implements OnInit {
    jobId: any;
    customer: any;
    customerId: any;
    loaddata = false;
    joblistcount: number;
    sort:any;
    search:any='';
    value:any;
    splitVal: any = [];
    SearchList: any = [];
    searchval:any;
    searchString:any;
    InterviewAcceptance = new ProposeDate();
    joblist= new GetInterviewSortList();
    userId: any;
    listSort:any;
    setActive:  number = null;
    jobs: any;

    invetviewListArray:any = [
      {
        id: 1,
        title: 'JavaScript Interview',
        time: '11:30 To 12:30',
        date: 'Monday, March 10, 2022',
        round: 'Technical Round',
        company:'Esolvit Solutions PVT. LTD.',
        type: 'zoom',
        subtype: 'In Sofa Meeting Room',
        address: 'Atlanta, GA, USA',
        jobDetails:[
          {
            name: 'Jenifer Lyonnais',
            interviewers:[
              'Murphy Jakubovic',
              'Joshua Monsef'
            ],
            position:'Product Designer',
            department: 'Design',
            status: 'Agreed on Sceduled',
            zoomLink: 'yes'
          }
        ]
      },
      {
        id: 2,
        title: 'Python Interview',
        time: '1:30 To 2:30',
        date: 'Monday, March 9, 2021',
        round: 'HR Round',
        company:'3M PVT. LTD.',
        type: 'In Person',
        subtype: 'In Sofa Meeting Room',
        address: '',
        jobDetails:[
          {
            name: 'Jhon Doe',
            interviewers:[
              'Murphy Jakubovic',
              'Lissa Ray'
            ],
            position:'UI Designer',
            department: 'Design',
            status: 'Agreed on Sceduled',
            zoomLink: ''
          }
        ]
      },
      {
        id: 3,
        title: 'UI Designer Interview',
        time: '1:30 To 2:30',
        date: 'Monday, March 9, 2021',
        round: 'Practical Round',
        company:'Google.',
        type: 'In Person',
        subtype: 'In Sofa Meeting Room',
        address: '',
        jobDetails:[
          {
            name: 'Kinjal Mehta',
            interviewers:[
              'Jhon Doe',
              'Lissa Day'
            ],
            position:'UI UX Designer',
            department: 'Design',
            status: 'Agreed on Sceduled',
            zoomLink: ''
          }
        ]
      },
      {
        id: 4,
        title: 'Wordpress Developer Interview',
        time: '1:30 To 2:30',
        date: 'Monday, March 8, 2020',
        round: 'HR Round',
        company:'ABC PVT. LTD.',
        type: 'In Person',
        subtype: 'In Sofa Meeting Room',
        address: '',
        jobDetails:[
          {
            name: 'Jhon Doe',
            interviewers:[
              'Murphy Jakubovic',
              'Lissa Ray'
            ],
            position:'Wordpress Developer',
            department: 'Developer',
            status: 'Agreed on Sceduled',
            zoomLink: ''
          }
        ]
      },
      {
        id: 5,
        title: 'Front End Developer Interview',
        time: '11:30 To 12:30',
        date: 'Monday, March 8, 2021',
        round: 'HR Round',
        company:'PVC PVT. LTD.',
        type: 'In Person',
        subtype: 'In Sofa Meeting Room',
        address: '',
        jobDetails:[
          {
            name: 'Jhon Doe',
            interviewers:[
              'Murphy Jakubovic',
              'Lissa Ray'
            ],
            position:'Front End Developer',
            department: 'Front End Developer',
            status: 'Agreed on Sceduled',
            zoomLink: ''
          }
        ]
      }
    ];
    filterInterviewDetail:any = [];
     
    viewscheduleInterviewDialgoref: MatDialogRef<UpdateInterviewComponent>;
    constructor( private spinner: NgxSpinnerService,private toastr: ToastsManager,private _vcr: ViewContainerRef,private route: ActivatedRoute,
    private router: Router, private managejobservice: ManageJobService, private appService: AppService,private alertService : AlertService, private dialog: MatDialog) {
      this.customer = JSON.parse(sessionStorage.getItem('userData'));
      this.customerId = this.customer.CustomerId;
      this.userId = this.customer.UserId;
      this.toastr.setRootViewContainerRef(_vcr);
    }

    detailIntviewHandler(index) {
      this.setActive = index;    
      // this.filterInterviewDetail.indexOf(index);
    }

    GetRedirect(jobId,profileId)  {
      sessionStorage.setItem('jobId', JSON.stringify(jobId));
      localStorage.setItem('rprofileId', JSON.stringify(profileId));;
      this.router.navigateByUrl('app-view-jobdetails');
      //let candidateProfile = this.recentapplicantlist.find(item => item.ProfileId === profileId);
      //sessionStorage.setItem("selectedProfile", JSON.stringify(candidateProfile));
        }

    ngOnInit() {
     this.spinner.show();
     this.managejobservice.updateListCount(6);
     this.managejobservice.currentlistcount.subscribe(x => this.joblistcount = x);
     this.populateJobInterViewlist(3,0,'');
     this.detailIntviewHandler(0);  
  }

  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }


  SortTheProfile(val)
  {
    if(val!=null||val!=undefined)
    {
      this.sort =val
      this.detailIntviewHandler(0); 
      this.joblistcount = 6; 
      this.populateJobInterViewlist(this.sort,this.listSort,this.searchString);
    }
    else
    {
      this.sort=3;
      this.detailIntviewHandler(0);  
      this.joblistcount = 6;
      this.populateJobInterViewlist(this.sort,this.listSort,this.searchString);
    }
  }

  OrderBy(val)
  {
    if(val!=null||val!=undefined)
    {
      this.listSort =val
      this.populateJobInterViewlist(this.sort,this.listSort,this.searchString);
    }
    else
    {
      this.listSort=0
      this.populateJobInterViewlist(this.sort,this.listSort,this.searchString);
    }
  }

  populateJobInterViewlist(sort=3,listsort=0,search='') { 
    if(this.sort==undefined)
    {
      this.sort=3;
    }
    else
    {
      this.sort=sort;
    }
    if(this.listSort==undefined)
    {
      this.listSort=0;
    }
    else
    {
      this.listSort=listsort;
    }
    this.searchString=search;
    return this.managejobservice.GetInterviewList(this.customerId,this.sort,this.listSort,this.searchString,this.joblistcount).subscribe(res => {
      this.loaddata = true;
      this.joblist = res;
      this.filterInterviewDetail = res.Jobs;
      this.spinner.hide();
    }); 
  }

 UpdateInterviewAccept(userId,jobid,cdate,ctime,cpdate,cpaccept)
 {
   if(cpaccept == 1 && cpdate == 1 )
   {
    this.InterviewAcceptance.CustomerId = this.customerId;
    this.InterviewAcceptance.UserId = userId;
    this.InterviewAcceptance.JobId = jobid;
    this.InterviewAcceptance.IsCandidateAccepted = true;
    this.InterviewAcceptance.IsCPNewDate = true;
    this.InterviewAcceptance.CPDate = cdate;
    this.InterviewAcceptance.CPFromTime = ctime;
    this.managejobservice.InterviewAccept(this.InterviewAcceptance)
    .subscribe(
    data => {
    this.populateJobInterViewlist(this.sort,1,'');
  })
   }
 }

  Search(val)
  {
   this.searchString = val;
   this.populateJobInterViewlist(this.sort,this.listSort,this.searchString);
   this.SearchList = [];
   this.GetSearchText(null);  

  }

  SearchEnter(searchval)
  {
    this.SearchList = [];
    this.GetSearchText(null);    
    this.Search(searchval);
  }

  SetSearch(val)
  {
    this.SearchList = [];
    this.Search(val);
  }

  GetSearchText(value) {
    this.value = value;
    return this.managejobservice.GetInterviewAutoSearch(value,this.customerId)
    .subscribe(data => {
          if (data.length > 0) {  
            this.SearchList =data;
          }
          else {
            if (this.value == "") {
             this.SearchList = [];
             this.Search(this.value);           
            }
            this.SearchList = [];
          }
        
          },     
        error => { 
          this.SearchList = [];
        });
  }

  updateListCount() {
    this.joblistcount += 6;
    this.managejobservice.updateListCount(this.joblistcount);
    this.populateJobInterViewlist(this.sort,this.listSort,this.searchString);   
  }


  OpenScheduleInterviewDialog(InterviewId,jobResponseId,jobid,profileId,userId,date,time,etime,Comment) {
    // var candidateUserId = $("#candidateUserId").val();
    // var candidateId = +candidateUserId;
    if(profileId>0)
    {
    const scheduleIntwdialogRef = this.dialog.open(UpdateInterviewComponent,
      {
        width: '750px',
        position: {right : '0px'},
        height : '750px',
        data: {
         InterviewId:InterviewId,
         jobResponseId: jobResponseId,
         jobId: jobid,
         ProfileId: profileId,
         userId: userId,
         iDate:date,
         iTime:time,
         Etime:etime,
         sComment:Comment
        }
      }
    );
    scheduleIntwdialogRef.afterClosed().subscribe(result => {
      if (result === 'submit') {
        this.populateJobInterViewlist(this.sort,0,'');
      }
    
     // this.jobDetails.populateJobsStaticInfo(this.jobid);
      console.log('Chatbox Dialog result: ${result}');
    });
  }
  else 
  {
    this.toastr.error('Profile Does not Exist','!Oops');
    
  }
  }



  ViewJobdetails(jobId) {
    sessionStorage.setItem('jobId', JSON.stringify(jobId));
    this.router.navigateByUrl('app-view-jobdetails');
  }

}



export class invterviewList
{
    public JobTitle :string;
    public JobLocations :string;
    public InterviewDate :Date;
    public InterviewType :string;
    public StartTime :string;
    public CPFromTime:string;
    public CandidateProfilePic : string;
    public CandidateFirstName:string;
    public CandidateLastName:string;
    public HiringLeaderProfilePic:string;
    public HiringLeaderFirstName:string;
    public HiringLeaderLastName:string;
}

export class ProposeDate {

      public CustomerId :string;
      public UserId: string;
      public JobId: string;
      public IsCandidateAccepted: boolean;
      public IsCPNewDate: boolean;
      public CPDate: Date;
      public CPFromTime: string;
}
