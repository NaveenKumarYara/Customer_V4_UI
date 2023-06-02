import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/components/services/api.service';

@Component({
  selector: 'app-manage-load-jobs',
  templateUrl: './manage-load-jobs.component.html',
  styleUrls: ['./manage-load-jobs.component.scss'],
  providers: [ApiService]
})
export class ManageLoadJobsComponent implements OnInit {
  title = 'manage-jobs';
  viewLayout = 'grid';
  rowShow = 0;
  customer:any;
  p:number = 1;
  filterTerm: string='';
  Jobs:any=[];
  start:number=1;
  last:any;
  panelTitle:any = '';
  panelShow: any = '';
  select: any;

  layoutView(name:string){
   this.viewLayout = name;
  }

  panelHandler(name: string) {
    this.panelShow = name;
  }

  panelCloseHandler() {
    this.panelShow = '';
  }

  clearAll(select:any)
  {
    select = 0;
    this.onChange(select);
    this.addItem('');
  }

  onChange(selected: any) {
    if(Number(selected) == 0)
    {
     this.Jobs.sort((n1: { PostedDate: any; }, n2: { PostedDate: any; }) => {
       if (n1.PostedDate < n2.PostedDate) {
         return 1;
       }

       if (n1.PostedDate > n2.PostedDate) {
         return -1;
       }

       return 0;
     })
    }
       if(Number(selected) == 1)
       {
        this.Jobs.sort((n1: { PostedDate: any; }, n2: { PostedDate: any; }) => {
          if (n1.PostedDate > n2.PostedDate) {
            return 1;
          }
  
          if (n1.PostedDate < n2.PostedDate) {
            return -1;
          }
  
          return 0;
        })
       }

       if(Number(selected) == 2)
       {
        this.Jobs.sort((n1: { TotalApplicants: any; }, n2: { TotalApplicants: any; }) => {
          if (n1.TotalApplicants < n2.TotalApplicants) {
            return 1;
          }
  
          if (n1.TotalApplicants > n2.TotalApplicants) {
            return -1;
          }
  
          return 0;
        })
       }



  }
 
  constructor(private _service : ApiService) {
    this.customer = JSON.parse(localStorage.getItem('customer')||'');
    this.GetCustomerJobs(this.customer.CustomerId,0);
   }

  ngOnInit(): void {
  
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

      //console.log(response);
			this.Jobs = response;
      //this.Jobs.sort((a: { PostedDate: any; }, b: { PostedDate: any; }) => (b.PostedDate as any) - (a.PostedDate as any));
		});
  }

}
