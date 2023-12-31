import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material';
import { JobdetailsService } from '../../../../jobdetails.service';
import { AppService } from '../../../../../../app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SettingsService } from '../../../../../../../settings/settings.service';
import { NgbModal, NgbModule, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../../../../shared/services/api.service';
import { PageEvent, Sort } from '@angular/material';
declare var $: any;
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-requestdialog',
  templateUrl: './requestInfo.component.html',
  styleUrls: ['./request.component.css'],
  providers: [ApiService]
})
export class RequestdialogComponent {
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
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,  public dialogRef: MatDialogRef<RequestdialogComponent>,private _snackBar: MatSnackBar,private _service: ApiService, private appService: AppService, private jobdetailsservice: JobdetailsService,private settingsService: SettingsService) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId = JSON.parse(sessionStorage.getItem('customerId'));
    
    this.GetQuestionnariePersonsList(0);
  }
  // MatPaginator Inputs
  length = 100;
  loading : boolean=false;
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

 

  Request()
 {
  this.loading=true;
  this.requestRef.customerId= this.customer.CustomerId;
  this.requestRef.userId= this.customer.UserId;
  this.requestRef.appLink = this.settingsService.settings.CandidateAppLogin +';RsId=' + this.data.Qid;
  this.requestRef.fromEmail = this.customer.Email;
  this.requestRef.comment = this.CommentProfile != undefined ? this.CommentProfile : 'Please provide reference';
  this.requestRef.profileId = this.data.ProfileId;
  this.requestRef.toEmailID = this.data.Email;
  this.requestRef.userName = this.data.FirstName;
  this.requestRef.applicationName = 'arytic';
  this.requestRef.companyName = this.data.CompanyName;
  this.jobdetailsservice.RequestRefernce(this.requestRef).subscribe(result => {
    this.loading = false;
    this.CommentProfile = undefined;
    this.requestRef = new RequestRefernce();
    this.dialogRef.close();
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
  customerId: string
  userId: string
  profileId: string
  userName: string
  appLink: string
  toEmailID: string
  applicationName: string
  companyName: string
  comment: string
  fromEmail: string
}

