import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef,MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ScheduleInterview } from '../schedule-interview/schedule-interview.component';
import { JobdetailsService } from '../../../jobdetails.service';
import { AppService } from '../../../../../app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SettingsService } from '../../../../../../settings/settings.service';
import { RequestdialogComponent} from './RequestInfo/requestInfo.component';
import { NgbModal, NgbModule, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../../../shared/services/api.service/api.service';
import { PageEvent, Sort } from '@angular/material';
declare var $: any;
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-refdialog',
  templateUrl: './manageref.component.html',
  styleUrls: ['./manageref.component.css']
})
export class ReferencedialogComponent {
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
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private _snackBar: MatSnackBar,private _service: ApiService, private appService: AppService, private jobdetailsservice: JobdetailsService,private settingsService: SettingsService) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId = JSON.parse(sessionStorage.getItem('customerId'));
    
    this.GetQuestionnariePersonsList(0);
  }
  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  CommentProfile:any;
  pageSizeOptions = [5, 10, 25, 100];
  usersList: GetQuestionnarieAssignement[] = [];
  // MatPaginator Output
  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

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

 

  Request()
 {

  this.requestRef.CustomerId= this.customer.CustomerId;
  this.requestRef.UserId= this.customer.UserId;
  this.requestRef.AppLink = this.settingsService.settings.CandidateLogin;
  this.requestRef.FromEmail = this.customer.Email;
  this.requestRef.Comment = this.CommentProfile != undefined ? this.CommentProfile : 'Please provide reference';
  this.requestRef.ProfileId = this.data.ProfileId;
  this.requestRef.ToEmailID = this.data.Email;
  this.requestRef.UserName = this.data.FirstName;
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
    this._service.GetService('ProfileAPI/api/GetQuestionnaireAssignmentNew?userId=' + this.data.UserId, '&showId=' + Id)
      .subscribe(
        data => {
          debugger
            this.usersList = data;
            this.sortedData = this.usersList.slice();
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
   public  ToEmailID: string;
   public  CustomerId:number;
   public  UserId:number;
   public  ProfileId:number;
   public  UserName: string;
   public  AppLink: string;
   public  FromEmail: string;
   public  CompanyName: string;
   public  Comment: string;
}

