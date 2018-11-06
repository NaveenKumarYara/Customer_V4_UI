import { Component, Inject,OnInit,Input} from '@angular/core';
import { JobdetailsService } from '../../jobdetails.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { GetJobDetailCustomer } from '../../../../../models/GetJobDetailCustomer';
import { JobComments } from '../../models/JobComments';
import { GetCompanyBenefit } from '../../../../../models/GetCompanyBenefit';
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
  customerId:any;
  userId:any;
 jobid: number;
 getcompanybenfit: GetCompanyBenefit[];;
  jobdetailscustomer: GetJobDetailCustomer;
  jobComments : JobComments[];
  constructor(private router: Router, private jobdetailsservice: JobdetailsService,@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.customerId = JSON.parse(sessionStorage.getItem('customerId'));
    this.jobid = JSON.parse(sessionStorage.getItem('viewJobJobId'));
   }
  PopulateJobdetail (customerId,jobid) { 
    return this.jobdetailsservice.getJobDetailCustomer(this.customerId,this.jobid).subscribe(res => {
      this.jobdetailscustomer = res;
    });
    
}
PopulateJobComments (jobid) { 
  return this.jobdetailsservice.getJobDetailsComments(this.jobid).subscribe(res => {
    this.jobComments = res;
  });
  
}

populateCompanyBenfits(customerId) {
  return this.jobdetailsservice.getCompanyBenfits(this.customerId).subscribe(res => {
      this.getcompanybenfit = res;
  });
}
ngOnInit() {
  this.PopulateJobdetail(this.customerId,this.jobid);
  this.PopulateJobComments(this.jobid);
  this.populateCompanyBenfits(this.customerId);
  console.log('abc');
}
}
