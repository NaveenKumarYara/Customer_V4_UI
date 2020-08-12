import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ScheduleInterview } from '../schedule-interview/schedule-interview.component';
import { JobdetailsService } from '../../../jobdetails.service';
import { AppService } from '../../../../../app.service';
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
  panelOpenState: boolean = false;
  customer: any;
  salaryDetails: any;
  addon = new addon();
  valueSal: number;
  TypeId: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _service: ApiService, private appService: AppService, private jobdetailsservice: JobdetailsService) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId = JSON.parse(sessionStorage.getItem('customerId'));
    this.sortedData = this.desserts.slice();
  }
  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

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
    const data = this.desserts.slice();
    if (!sort.active || sort.direction == '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'calories': return compare(+a.calories, +b.calories, isAsc);
        case 'fat': return compare(+a.fat, +b.fat, isAsc);
        case 'carbs': return compare(+a.carbs, +b.carbs, isAsc);
        case 'protein': return compare(+a.protein, +b.protein, isAsc);
        default: return 0;
      }
    });
  }
  ngOnInit() {



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

