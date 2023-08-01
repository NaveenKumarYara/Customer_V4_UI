import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/components/services/api.service';

@Component({
  selector: 'app-job-review',
  templateUrl: './job-review.component.html',
  styleUrls: ['./job-review.component.scss']
})
export class JobReviewComponent implements OnInit {
  currentRate = 0;
_job: any = null
  public isCollapsed = false;
  reviewsList: any;
  // @Input() job: any = null;
  // get job() {
  //   return this._job;
  // }
  // @Input() set job(val: any) {
  //   this._job = val;
  //   if(val){
  //     this.getReviews();
  //   }
  // }
 




  constructor( private ApiService:ApiService) { }
  // get job(): any {
  //   return this._job
  // }

  // @Input() set job(value: any) {
  //   this._job = value;
  //   if (value) {
  //     this.getReviews();
    
  //   }
  // }


  get job(): any {
    return this._job

  }

  @Input() set job(value: any) {
    this._job = value;
    if (value) {
      this.getReviews();
      // this.grtProfileNotes();

      // this.GetJobNotes()
    }
  }

  ngOnInit(): void {
  console.log('job')

  }
  


  getReviews(){
    
    console.log('job22222',this.job.JobId)
    let id = this.job.JobId
    console.log('ddddddddddddddddddddd',id)

    // this.ApiService.getComments('/api/GetJobComments?jobId=',id).subscribe( (res:any)=>{
    //   this.reviewsList = res
    //   console.log("reviews",this.reviewsList)
    // })

    let getComments='/api/GetJobComments?jobId='+this.job.JobId;
    this.ApiService.getJobApi(getComments).subscribe((res: any) => {
      // debugger;
      this.reviewsList = res;
    });
  }

}
