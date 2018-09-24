import { Component, Inject,OnInit,Input} from '@angular/core';
import { JobdetailsService } from '../../jobdetails.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { GetJobDetailCustomer } from '../../../../../models/GetJobDetailCustomer';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-viewjobdetailsmodel',
  templateUrl: './viewjobdetailsmodel.component.html',
  styleUrls: ['./viewjobdetailsmodel.component.css']
})
export class ViewjobdetailsmodelComponent  implements OnInit {
  // @Input() jobid: number;
  jobdetailscustomer: GetJobDetailCustomer;
  constructor(private router: Router, private jobdetailsservice: JobdetailsService,@Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  PopulateJobdetail () { 
    return this.jobdetailsservice.getJobDetailCustomer().subscribe(res => {
      this.jobdetailscustomer = res;
    });
}
ngOnInit() {
  this.PopulateJobdetail();
  console.log('abc');
}
}
