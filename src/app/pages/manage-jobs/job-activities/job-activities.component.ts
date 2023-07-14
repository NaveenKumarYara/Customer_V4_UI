import { HttpParams } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/components/services/api.service';

@Component({
  selector: 'app-job-activities',
  templateUrl: './job-activities.component.html',
  styleUrls: ['./job-activities.component.scss'],
  providers: [ApiService]
})
export class JobActivitiesComponent implements OnInit {
  viewLayout = 'grid';
  JobDetail: any;
  panelTitle:any = '';
  panelShow: any = '';
  JobId: any;
  jp:number = 1;
  jfilterTerm: string='';
  jstart:number=1;
  jlast:any;
  Profiles:any=[];
  jobCard: boolean = false;
  isChecked: boolean = false;
  showNoteForm: boolean = false;
  showFeedbackForm: boolean = false;
  customer:any;
  isDocumentType: boolean = false;
  constructor(private _service : ApiService, private route: ActivatedRoute) { 
    this.customer = JSON.parse(localStorage.getItem('customer')||'');
    this.route.queryParams.subscribe(
      (queryParams: Params) => {
          this.JobId = queryParams['JobId'];
      }
      );
  }

  ngOnInit(): void {
    this.GetJobAppliedProfilesDetail(0,'');
    if(this.JobId!=null)
    {
      this.GetJobDetail();
    }
  }

  GetJobDetail() {       
    this._service.GetEmployerService("/api/GetCustomerJobDetailsInfo?JobId=", Number(this.JobId)).subscribe((response:any) => { 
      this.JobDetail =  response[0];
    });
  }

  clearAll(select:any) {
    select = 0;
    this.onChange(select);
    this.addItem('');
  }

  addItem(newItem: string) {
    this.jp = 1;
    this.jstart = 1;
    this.jlast = 6;
    this.jfilterTerm = newItem;
  }

  onChange(selected: any) {
    if(Number(selected) == 0) {
      this.Profiles.sort((n1: { MatchingPercentage: any; }, n2: { MatchingPercentage: any; }) => {
        if (n1.MatchingPercentage < n2.MatchingPercentage) {
          return 1;
        }

        if (n1.MatchingPercentage > n2.MatchingPercentage) {
          return -1;
        }

        return 0;
      })
      }

    if(Number(selected) == 1) {
      this.Profiles.sort((n1: { MatchingPercentage: any; }, n2: { MatchingPercentage: any; }) => {
        if (n1.MatchingPercentage > n2.MatchingPercentage) {
          return 1;
        }

        if (n1.MatchingPercentage < n2.MatchingPercentage) {
          return -1;
        }

        return 0;
      })
      }
      if(Number(selected) == 2) {
        this.Profiles.sort((n1: { TotalExperience : any; }, n2: { TotalExperience: any; }) => {
          if (n1.TotalExperience < n2.TotalExperience) {
            return 1;
          }
  
          if (n1.TotalExperience > n2.TotalExperience) {
            return -1;
          }
  
          return 0;
        })
      }
  
  }

  onquickChange(selected: any) {
    if(selected != 'All')
    {
      this.addItem(selected);
    }
    else
    {
      this.addItem('');
    }
    
  }

  jlistCount(count:any) {
    this.jstart = count;
    
    this.jstart = this.jstart * 6 - 6;
    if(this.jstart == 0)
    {
      this.jstart = 1;
    }
    this.jlast = count * 6;
    if (this.jlast > this.Profiles.length) {
      this.jlast = this.Profiles.length;
    }
    //console.log('start'+ '      '+this.start + '      '+'last' + '      '+ this.last);
  }
  
  GetJobAppliedProfilesDetail(FilterStatus: string | number | boolean,Search: string)
  {       
    let params = new HttpParams();
		params = params.append("CustomerId", this.customer.CustomerId);
		params = params.append("JobId",  Number(this.JobId));
    params = params.append("FilterStatus",FilterStatus );
    params = params.append("SearchString",Search);
    this._service.GetEmployerService("/api/GetCustomerApplicantJobProfiles?",params).subscribe((response:any) => { 
      this.Profiles =  response;
      this.Profiles.sort((n1: { MatchingPercentage: any; }, n2: { MatchingPercentage: any; }) => {
        if (n1.MatchingPercentage < n2.MatchingPercentage) {
          return 1;
        }

        if (n1.MatchingPercentage > n2.MatchingPercentage) {
          return -1;
        }

        return 0;
      })
      console.log(response);
    });
  }

  panelHandler(name: string) {
    this.panelShow = name;
  }

  layoutView(name:string){
    this.viewLayout = name;
  }

  changeView() {
    this.isChecked =  ! this.isChecked;
  }

  documentType() {
    this.isDocumentType = !this.isDocumentType;
  }

  panelCloseHandler() {
    this.panelShow = '';
  }

  showNoteFormHandler() {
    this.showNoteForm = true;
  }

  hideNoteFormhandler() {
    this.showNoteForm = false;
  }

  showFeedbackFormHandler() {
    this.showFeedbackForm = true;
  }

  hideFeedbackFormhandler() {
    this.showFeedbackForm = false;
  }
}