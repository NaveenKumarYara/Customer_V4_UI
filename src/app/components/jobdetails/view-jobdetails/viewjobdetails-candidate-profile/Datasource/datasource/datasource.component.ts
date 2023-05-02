import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ApiService } from '../../../../../../shared/services/api.service';
import { SourceInfo } from '_debugger';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
export interface IItem {
  id:number;
  itemName?: string;
}

@Component({
  selector: 'app-datasource',
  templateUrl: './datasource.component.html',
  styleUrls: ['./datasource.component.css']
})
export class DatasourceComponent implements OnInit {
  customer: any;
  userId: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _service: ApiService,public dialogRef: MatDialogRef<DatasourceComponent>) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
      this.userId = this.customer.UserId;
   }
  selectedItem = null;
  source = new soInfo();
  itemsArray: IItem[] = [
    {id:0, itemName: 'Individual' },
    {id:1,  itemName: '3rd-Party' },
    {id:2, itemName: 'Dice' },
    {id:3, itemName: 'BullHorn' },
    {id:4, itemName: 'Agency' },
    {id:5, itemName: 'Others' },
  ];

  optionPlaceholder = null;
  showSomethingNew = 'Source yet to provide';
  ngOnInit() {
    this.GetJobDataSourceDetails();
  }

  onItemSelect(itemVal): any {
        this.selectedItem = itemVal;
        this.showSomethingNew = 'The source added from ' + itemVal;

  }

  GetJobDataSourceDetails()
  {
   this._service.GetService('IdentityAPI/api/GetJobDataSource?profileId='+ this.data.ProfileId +'&jobId=',this.data.jobId ).subscribe(
     data => {
      if(data != "No records found")
      {
        this.selectedItem = data.DataSource;
        this.itemsArray.find(x=>x.itemName == this.selectedItem);
        this.showSomethingNew = 'The source added from ' + data.DataSource;
      }


     });
  }

  SaveJobDataSource()
  {
    let str = this.itemsArray.find(x=>x.itemName == this.selectedItem);
    this.source.userId = this.userId;
    this.source.JobId = this.data.jobId;
    this.source.ProfileId = this.data.ProfileId;
    this.source.DataSourceId = str.id;
    this.source.DataSource = this.selectedItem;
   this._service.PostService(this.source,'IdentityAPI/api/JobDataSource').subscribe(
     data => {
      this.source = new soInfo();
       this.GetJobDataSourceDetails();
       this.dialogRef.close();
     });
  }


}

export class soInfo
{
  userId :number;
  JobId: number;
  ProfileId: number;
  DataSource: string;
  DataSourceId: number;
}
