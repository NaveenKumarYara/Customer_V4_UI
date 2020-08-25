import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ScheduleInterview } from '../schedule-interview/schedule-interview.component';
import { JobdetailsService } from '../../../jobdetails.service';
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
    bgverification = new BackgroundVerification();
    showRes : boolean = false;
    val1 = 0;
    val2 = 0;
    val3 = 0;
    val4 = 0;
    name:any;
    subtotal : string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _service: ApiService, private jobdetailsservice: JobdetailsService) {
     this.GetBG();
     this.name = this.data.Name;
     debugger
     this.GetDrugVerification();
   }

  GetBG()
  {
    this._service.GetService('IdentityAPI/api/GetBackgroundList', '').subscribe(
        data => {
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



  SaveBg(val)
  {
    if(val ==1)
    {
      this.showRes = false;
    }
    else
    {
      this.showRes = true; 
    }

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
   this.bgverification;
  debugger
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
}
