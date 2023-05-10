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
  p:number = 1;
  filterTerm: string='';
  Jobs:any=[];
  start:number=1;
  last:any;
  panelTitle:any = '';
  panelShow: any = '';

  layoutView(name:string){
   this.viewLayout = name;
  }

  panelHandler(name: string) {
    this.panelShow = name;
  }

  panelCloseHandler() {
    this.panelShow = '';
  }
 
  constructor(private _service : ApiService) { }

  ngOnInit(): void {
    this.GetCustomerJobs(10402,0);
  }

  listCount(count:any) {
    this.start = count;
    
    this.start = this.start * 6 - 6;
    if(this.start == 0)
    {
      this.start = 1;
    }
    this.last = count * 6;
    if (this.last > this.Jobs.length) {
      this.last = this.Jobs.length;
    }
    //console.log('start'+ '      '+this.start + '      '+'last' + '      '+ this.last);
  }

  addItem(newItem: string) {
    this.filterTerm = newItem;
  }

  GetCustomerJobs(CustomerId:number,UserId:number)
  {
    let params = new HttpParams();
		params = params.append("CustomerId", CustomerId);
		params = params.append("UserId", UserId);
    this._service.GetEmployerService("/api/GetCustomerJobs?", params).subscribe((response) => { 

      console.log(response);
			this.Jobs = response;
      this.Jobs.sort((a: { PostedDate: any; }, b: { PostedDate: any; }) => (b.PostedDate as any) - (a.PostedDate as any));
		});
  }

}
