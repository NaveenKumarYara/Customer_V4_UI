import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import{draftDetails} from '../../../../../models/draftDetails';
import { AppService } from '../../../../app.service';
declare var $: any; 
@Component({
  
  selector: 'app-editdraft',
  templateUrl: './draft.component.html',
  providers: [AppService]
})
export class EditDraftComponent {
  customer: any;
  customerId: any;
  complete:any;
  userId: any;
  drafts: draftDetails[];
  constructor( private fb: FormBuilder, private router: Router,private appService: AppService) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId = this.customer.CustomerId;
    this.userId = this.customer.UserId;
  }
 
  editJob(jobId,active) {

      this.complete = 4;
      this.router.navigate(['/app-createajob/', {jobId} ]);
      localStorage.setItem('completed', JSON.stringify(this.complete));
      this.router.navigate(['/app-createajob/app-steps-step1/', {jobId} ]);
    

      // this.router.navigateByUrl('/app-createajob/app-steps-step1/id='+ jobId);
   // [routerLink]="['/app-createajob/app-steps-step1/',job.JobId]"
  }

  back()
  {
    this.router.navigateByUrl('/app-postajob');
  }

  GetEditDrafts()
  {
    return this.appService.GetEditDrafts(this.customerId,this.userId).subscribe(res => {
      this.drafts = res;
    })
  }

  ngOnInit() {
  this.GetEditDrafts();
  }
}

