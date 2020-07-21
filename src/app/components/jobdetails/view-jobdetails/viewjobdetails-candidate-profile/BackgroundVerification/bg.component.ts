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
    alist : any=[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _service: ApiService, private jobdetailsservice: JobdetailsService) {
     this.GetAchivements();
   }

  GetAchivements()
  {
    this._service.GetService('ProfileAPI/api/GetCandidateAchievementList?profileId=', this.data.ProfileId).subscribe(
        data => {
            this.alist=data;
        }
    )
  }
 
}
