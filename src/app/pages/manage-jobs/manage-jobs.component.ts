import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/components/services/api.service';

@Component({
  selector: 'app-manage-jobs',
  templateUrl: './manage-jobs.component.html',
  styleUrls: ['./manage-jobs.component.scss'],
  providers: [ApiService]
})
export class ManageJobsComponent implements OnInit {
  title = 'manage-jobs';
  viewLayout = 'grid';
  rowShow = 0;
  Jobs:any=[];
  layoutView(name:string){
   this.viewLayout = name;
  }

 
  constructor(private _service : ApiService) { }

  ngOnInit(): void {
    this.GetCustomerJobs(10402,0);
  }

  GetCustomerJobs(CustomerId:number,UserId:number)
  {
    let params = new HttpParams();
		params = params.append("CustomerId", CustomerId);
		params = params.append("UserId", UserId);
    this._service.GetEmployerService("/api/GetCustomerJobs?", params).subscribe((response) => { 

 
			this.Jobs = response;
      this.Jobs.sort((a: { PostedDate: any; }, b: { PostedDate: any; }) => (b.PostedDate as any) - (a.PostedDate as any));
		});
  }

}
