import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import{draftDetails} from '../../../../../models/draftDetails';
import { AppService } from '../../../../app.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any; 
@Component({
  
  selector: 'app-editdraft',
  templateUrl: './draft.component.html',
  providers: [AppService,NgxSpinnerService]
})
export class EditDraftComponent {
  customer: any;
  customerId: any;
  complete:any;
  counter:number;
  userId: any;
  draft : any;
  isFullDisplayed:any= false;
  drafts: draftDetails[];
  constructor( private fb: FormBuilder, private router: Router,private appService: AppService,private spinner: NgxSpinnerService) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId = this.customer.CustomerId;
    this.userId = this.customer.UserId;
    this.counter=0;
  }
 
  editJob(jobId,active) {

      this.complete = 4;
      this.router.navigate(['/app-createajob/', {jobId} ]);
      localStorage.setItem('completed', JSON.stringify(this.complete));
      this.router.navigate(['/app-createajob/app-steps-step1/', {jobId} ]);
    

      // this.router.navigateByUrl('/app-createajob/app-steps-step1/id='+ jobId);
   // [routerLink]="['/app-createajob/app-steps-step1/',job.JobId]"
  }

  getData(){
    if(this.draft.length < this.drafts.length){  
      let len = this.draft.length;
      for(let i=len;i<=len+5;i++)
      {
        this.draft.push(this.drafts[i]);
      }
      this.spinner.hide();
    }
    else{
      this.isFullDisplayed = true;
  }
  
  }

  DeleteDraft(jobId)
  {
    this.spinner.show();
    return this.appService.Deletedraft(jobId).subscribe(res => {
     if(res == 0)
     {
     this.GetEditDrafts();
     }
    })
  }

  back()
  {
    this.router.navigateByUrl('/app-postajob');
  }

  GetEditDrafts()
  {
    return this.appService.GetEditDrafts(this.customerId,this.userId).subscribe(res => {
      this.drafts = res;
      this.draft = this.drafts.slice(0,6);
      this.spinner.hide();
    })
  }

  ngOnInit() {
  this.spinner.show();
  this.GetEditDrafts();
  }
}

