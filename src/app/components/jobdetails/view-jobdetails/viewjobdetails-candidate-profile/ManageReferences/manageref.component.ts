import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ScheduleInterview } from '../schedule-interview/schedule-interview.component';
import { JobdetailsService } from '../../../jobdetails.service';
import { AppService } from '../../../../../app.service';
import {  NgbModal, NgbModule, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../../../shared/services/api.service/api.service';
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
  customer: any;
  salaryDetails:any;
  addon = new addon();
  valueSal:number;
  TypeId:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _service: ApiService,private appService: AppService,private jobdetailsservice: JobdetailsService) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId = JSON.parse(sessionStorage.getItem('customerId')); 
   }

   ngOnInit()
   {

     
    
   }


}





  


export class addon
{
    SubscriptionId: string;
    AddonId:string;
    AddonUnitPrice:number;
    AddonQuantity:number;
}

