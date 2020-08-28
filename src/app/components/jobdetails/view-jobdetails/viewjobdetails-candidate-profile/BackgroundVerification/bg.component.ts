import { Component, Inject, Input, Output,ViewContainerRef } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EventEmitter } from 'events';
import { ScheduleInterview } from '../schedule-interview/schedule-interview.component';
import { JobdetailsService } from '../../../jobdetails.service';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import { AppService } from '../../../../../app.service';
import { ApiService } from '../../../../../shared/services/api.service/api.service';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-bgdialog',
  templateUrl: './bg.component.html',
  styleUrls: ['./bg.component.css']
})
export class backgrounddialogComponent {
    Bglist: any=[];
    Dlist: any=[];
    addon = new addon();
    loading : boolean=false;
    usersList:any=[];
    Verification : BackgroundVerification;
    @Input() jobid: number;
    @Input() statusid: number;
    @Output() eventStat = new EventEmitter();
    bgverification = new BackgroundVerification();
    showRes : boolean = false;
    ShowVer : boolean = false;
    showone : boolean = false;
    val1 = 0;
    val2 = 0;
    val3 = 0;
    val4 = 0;
    name:any;
    customer:any;
    subtotal : string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<backgrounddialogComponent>,private appService: AppService,private _service: ApiService, private jobdetailsservice: JobdetailsService,private toastr: ToastsManager, private _vcr: ViewContainerRef) {
     this.GetBG();
     this.name = this.data.Name;
     this.customer = JSON.parse(sessionStorage.getItem('userData'));
     this.toastr.setRootViewContainerRef(_vcr);
     this.GetDrugVerification();
     this.GetBGTestResult();
     this.GetQuestionnariePersonsList();
   }

  GetBG()
  {
    this.loading= true;
    this._service.GetService('IdentityAPI/api/GetBackgroundList', '').subscribe(
        data => {
          this.loading =false;
            this.Bglist=data;
        }
    )
  }

  GetDrugVerification()
  {
    this._service.GetService('IdentityAPI/api/GetDrugList', '').subscribe(
      data => {
          this.Dlist=data;
      }
  )
  }

  GetValues(val)
  {
    if(val == 1)
    {
      this.ShowVer = false;
    }
    else
    {
      this.ShowVer = true;
    }
  }

  GetBGTestResult()
  {
    this._service.GetService('IdentityAPI/api/GetCandidateBackgroundVerification?profileId=' + this.data.ProfileId, '&customerUserId=' + this.data.CuserId).subscribe(
      data => {
          this.Verification = data[0];
          if(this.Verification.ProfileId>0)
          {
            this.ShowVer = true;
            this.bgverification.CriminalOptionSelected = this.Verification.CriminalOptionSelected;
            this.bgverification.DrugOptionSelected = this.Verification.DrugOptionSelected;
            this.bgverification.Education = this.Verification.Education;
            this.bgverification.Employment = this.Verification.Employment;
            this.subtotal = this.Verification.Price;
            this.bgverification.Certification = this.bgverification.Certification;
            this.bgverification.Reference = this.bgverification.Reference;
            this.bgverification.CriminalOption = this.bgverification.CriminalOption;
            this.bgverification.DrugTest = this.bgverification.DrugTest;
          }
          else
          {
            this.ShowVer = false;
            this.Verification = new BackgroundVerification();
          }
      }
  )
  }

  SaveBgVerIfication()
  {
    this.bgverification.FromEmail = this.customer.Email;
    this.bgverification.ToEmailID = this.customer.Email;
    this.bgverification.Admin = this.customer.Email;
    this.bgverification.Candidate = this.data.Name;
    this.bgverification.Comment = 'Requested Drug Test and Few Background Verification Process...' ;
    return this._service.PostService(this.bgverification, 'EmailAPI/api/BackGroundVerification')
    .subscribe(data => {
      if(data >=0)
      {
      this.toastr.success('Processing Request', 'Success');
      this.eventStat.emit(null);
      this.appService.GetCustomerSubscription(this.data.CuserId).subscribe(res => {
      if(res == null || res.subscriptionId==null)
        {
       this.toastr.warning('Access denied contact admin for arytic subscription!!', 'Oops');
        //this.dialogRef.close();
       //this.GetBGTestResult(); 
        }
      if(res.subscriptionId!=undefined && res.subscriptionId!=null)
      {
        this.addon.SubscriptionId = res.subscriptionId;
        this.addon.AddonId = "2";
        this.addon.AddonUnitPrice = Number(this.subtotal);
       this.addon.AddonQuantity = 1;
       this.jobdetailsservice.AddonHirefee(this.addon).subscribe(result => {
        console.log(result);
        this.toastr.success('Mail Sent', 'Success');
        this.GetBGTestResult();

         });
       //this.dialogRef.close();
       }
       this.eventStat.emit(null);
     
    });
  }
  });
  }

  SaveBgG(val)
  {
    if(val == 1)
    {
      this.ShowVer = true;
      this.showone = false;
    }
    if(val == 2)
    {
      this.showone = true;
    }
    if(val == 3)
    {
      this.showone = true;
      this.toastr.info('Your request is In-progress','Thank You');
    }

  }

  GetQuestionnariePersonsList() {
    this._service.GetService('ProfileAPI/api/GetQuestionnaireAssignmentNew?userId=' + this.data.UserId, '&showId=0')
      .subscribe(
        data => {
            this.usersList = data;         
        });
  }

  SaveBg(val)
  {
 

    if(this.bgverification.CriminalOptionSelected>0)
    {
      this.bgverification.CriminalOption = true;
      this.val1 = 49.99;
    }
    if(this.bgverification.CriminalOptionSelected ===0)
    {
      this.bgverification.CriminalOption = false;
      this.val1 = 0;
    }
    if(this.bgverification.DrugOptionSelected>0)
    {       
      this.bgverification.DrugTest = true;
      this.val2 = 49.99;
    }
    if(this.bgverification.DrugOptionSelected===0)
    {     
      this.bgverification.DrugTest = false;  
      this.val2 = 0;
    }
    if(this.bgverification.Education === true)
    {
      this.val3 = 39.99;
    }
    if(this.bgverification.Education === false)
    {
      this.val3 = 0;
    }
    if(this.bgverification.Certification === true)
    {
      this.val4 = 69.99;
    }
    if(this.bgverification.Certification === false)
    {
      this.val4 = 0;
    }   
   const total = (this.val1+this.val2+this.val3+this.val4).toFixed(2);
   this.subtotal = total.toString();
   this.bgverification.Price = this.subtotal;
   this.bgverification.ProfileId = this.data.ProfileId;
   this.bgverification.CustomerUserId = this.data.CuserId;
   if(val == 1)
   {
     this.ShowVer = false;
     this.showRes = false;
   }
   if(val == 3)
   {
      this.showRes = true; 
      this.SaveBgVerIfication();
   }
   if(val == 2)
   {
     if(this.bgverification.DrugTest == null || this.bgverification.DrugOptionSelected==0)
     {
       this.toastr.warning('Please Choose Drug Test','Oops');
        return false;
     }
     else
     {
     this.showRes = true; 
     
    }
   }
  
  }
 
}

export class BackgroundVerification
{
  CustomerUserId: number;
  ProfileId: number;
  CriminalOption:boolean; 
  CriminalOptionSelected: number;
  DrugOptionSelected:number;
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

export class addon
{
    SubscriptionId: string;
    AddonId:string;
    AddonUnitPrice:number;
    AddonQuantity:number;
}
