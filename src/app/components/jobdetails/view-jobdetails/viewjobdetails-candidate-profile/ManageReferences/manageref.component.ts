import { Component, Inject, Input, Output, EventEmitter,ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef,MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ScheduleInterview } from '../schedule-interview/schedule-interview.component';
import { JobdetailsService } from '../../../jobdetails.service';
import { AppService } from '../../../../../app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SettingsService } from '../../../../../../settings/settings.service';
import { RequestdialogComponent} from './RequestInfo/requestInfo.component';
import { NgbModal, NgbModule, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../../../shared/services/api.service';
import { PageEvent, Sort } from '@angular/material';
import { MatPaginator } from '@angular/material';
declare var $: any;
import swal from "sweetalert2";
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-refdialog',
  templateUrl: './manageref.component.html',
  styleUrls: ['./manageref.component.css']
})
export class ReferencedialogComponent {
  @ViewChild('paginator') paginator: MatPaginator;
  customerId: any;
  userId: any;
  employmenttypelist: any;
  employmentTypeId: number;

  Comment: string;
  requestRef = new RequestRefernce();
  panelOpenState: boolean = false;
  customer: any;
  salaryDetails: any;
  addon = new addon();
  valueSal: number;
  TypeId: any;
  checkId:any=0;
  sortingName: string;
  isDesc: boolean;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private changeDetector: ChangeDetectorRef, private dialog: MatDialog, private _snackBar: MatSnackBar,private _service: ApiService, private appService: AppService, private jobdetailsservice: JobdetailsService,private settingsService: SettingsService) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.CurrentTime = new Date();
    this.dateYesterday = new Date(this.dateYesterday.setDate(this.dateYesterday.getDate() - 1));
    this.dateAgo = new Date(this.dateYesterday.setDate(this.dateYesterday.getDate() - 3));
    this.customerId = JSON.parse(sessionStorage.getItem('customerId'));
    const swal = require('sweetalert2');
    this.GetQuestionnariePersonsList(5);
  }
  // MatPaginator Inputs
  pageIndex:number = 0;
  pageSize:number = 10;
  lowValue:number = 0;
  highValue:number = 10; 
  CommentProfile:any;
  CurrentTime: any;
  dateAgo: Date = new Date();
  dateYesterday: Date = new Date();
  pageSizeOptions:any;

  usersList: GetQuestionnarieAssignement[] = [];
  // MatPaginator Output
  pageEvent: PageEvent;

  // setPageSizeOptions(setPageSizeOptionsInput: string) {
  //   this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  // }

  //Sort
  desserts = [
    { name: 'TCS', calories: 'James barret', fat: 'In-Progress', carbs: '01-07-2020', protein: 'Download Report' },
    { name: 'Google', calories: 'Sundar Pichai', fat: 'Rejected', carbs: '01-06-2020', protein: 'N/A' },
    { name: 'Microsoft', calories: 'Satya nadella', fat: 'Success', carbs: '01-05-2020', protein: 'Download Report' },
    { name: 'ESOLVIT', calories: 'Sri Rao', fat: 'In-Progress', carbs: '10-07-2020', protein: 'Download Report' },
    { name: 'Technozant', calories: 'Usha B', fat: 'Success', carbs: '27-07-2020', protein: 'Download Report' },
  ];

  sortedData;

  // constructor() {
  //   this.sortedData = this.desserts.slice();
  // }

  sort(name: string){
    if (name && this.sortingName !== name) {
      this.isDesc = false;
    } else {
      this.isDesc = !this.isDesc;
    }
    this.sortingName = name;
  }

  sortData(sort: Sort) {
    const data = this.usersList.slice();
    if (!sort.active || sort.direction == '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'FullName': return compare(a.FullName, b.FullName, isAsc);
        case 'Referrer Details': return compare(+a.KnownOrWorkedAt, +b.KnownOrWorkedAt, isAsc);
        // case 'fat': return compare(+a.KnownOrWorkedAt, +b.KnownOrWorkedAt, isAsc);
        // case 'carbs': return compare(+a.carbs, +b.carbs, isAsc);
        // case 'protein': return compare(+a.protein, +b.protein, isAsc);
        default: return 0;
      }
    });
  }
  ngOnInit() {



  }


  OpenRequest(){
    swal(
      {
        title: 'Request more info from Arytic?',
        showConfirmButton: true,
        showCancelButton:true,
        type:"info",
        confirmButtonColor: '#66dab5',
        cancelButtonColor: '#FF0000',
        confirmButtonText: 'Yes',
        cancelButtonText:'No',
      }).then((result) => {
      if (result.value === true) {       
        swal({
          title: 'Information requested. You will receive an email shortly!',
          showConfirmButton: true,
          timer: 3000,
          type:"success"
        });
      }
    });
  }

  OpenRequestDialog(company,Id)
{
  const AdialogRef = this.dialog.open(RequestdialogComponent,
    {
      width: '450px',
      height: '300px',
      position: { right: '180px', top: '150px' },
      
      data: {
        ProfileId: this.data.profileId,
        CompanyName: company,
        Email:this.data.Email,
        FirstName:this.data.FirstName,
        Qid:Id
        // status : this.statusid
      }
    }
  );
  AdialogRef.afterClosed().subscribe(result => {
    // this.jobDetails.populateJobsStaticInfo(this.jobid);
    //this.myEvent.emit(null);
    console.log('hire Dialog result: ${result}');
  });
}

getPaginatorData(event){
  this.changeDetector.detectChanges();
  console.log(event);
  if(event.pageIndex === this.pageIndex + 1){
     this.lowValue = this.lowValue + this.pageSize;
     this.highValue =  this.highValue + this.pageSize;
    }
 else if(event.pageIndex === this.pageIndex - 1){
    this.lowValue = this.lowValue - this.pageSize;
    this.highValue =  this.highValue - this.pageSize;
   }   
    this.pageIndex = event.pageIndex;
}

 

  Request()
 {

  this.requestRef.CustomerId= this.customer.CustomerId;
  this.requestRef.UserId= this.customer.UserId;
  this.requestRef.AppLink = this.settingsService.settings.CandidateLogin;
  // this.requestRef.FromEmail = this.customer.Email;
  //this.requestRef.Comment = this.CommentProfile != undefined ? this.CommentProfile : 'Please provide reference';
  this.requestRef.ProfileId = this.data.ProfileId;
  this.requestRef.ToEmailID = this.data.Email;
  this.requestRef.UserName = this.data.FirstName;
  this.requestRef.FromId = "donotreply@arytic.com";
  this.requestRef.CompanyName = this.data.CompanyName;
  this.jobdetailsservice.RequestRefernce(this.requestRef).subscribe(result => {
    this.CommentProfile = undefined;
    this.requestRef = new RequestRefernce();
    let message = 'Requested Reference!';
        let action = 'Success';
        this._snackBar.open(message, action, {
            duration: 2000,
            
        });
  });
}



  GetQuestionnariePersonsList(Id) {
    this.checkId=Id;
    //debugger
    this._service.GetService('ProfileAPI/api/GetQuestionnaireAssignmentNew?userId=' + this.data.UserId, '&showId=' + Id)
      .subscribe(
        data => {
        if(data != "No records found")
        {
          this.usersList = data; 
          if(this.usersList.length>10)
          {
           this.paginator.previousPage();
           this.paginator.pageIndex = 0;
          }
        }
        else
        {
          this.usersList = []; 
          this.paginator.pageIndex = 0;
        }
  
         
        });
  }


}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}






export class addon {
  SubscriptionId: string;
  AddonId: string;
  AddonUnitPrice: number;
  AddonQuantity: number;
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
      public ModifiedAnswers: string) { }
}
export class InsertReferences {
  constructor(
      public CandidateReferenceId: number = 0,
      public ListCandidateReferenceDetails: CandidateReferenceDetails[] = []
  ) { }
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
      public Code: string) { }
}

export class GetQuestionnarieResponse {
  constructor(
      public QuestionnaireId: number,
      public QuestionId: number,
      public ResponseId: number,
      public Question: string,
      public Response: string,
      public ResponseValue: string
  ) { }
}

export class RequestRefernce
{
  public ToEmailID: string;
  public CustomerId: number;
  public UserId: number;
  public ProfileId: number;
  public UserName: string;
  public AppLink: string;
  public FromEmail: string;
  public CompanyName: string;
 // public Comment: string;
  public ApplicationName:string;
  public FromId: string;
}

