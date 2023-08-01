import { HttpParams } from '@angular/common/http';
import { Conditional } from '@angular/compiler';
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
  profile :any = ''
  JobId: any;
  jp:number = 1;
  jfilterTerm: string='';
  jstart:number=1;
  jlast:any;
  isAdvancedFilterApplied = false;
  advancedFilters: any = {};
  Profiles:any=[];
  filteredJobs:any = [];
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
  advancedFiltersApplied(filters: any) {
    this.isAdvancedFilterApplied = true;
    this.advancedFilters = filters;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredJobs = this.Profiles.filter((v: any) => this.applyFiltersOnAJob(v));
  }

  applyFiltersOnAJob(job: any): any {
    // debugger;
    if (!this.isAdvancedFilterApplied) {
      if (this.jfilterTerm)
        return this.applyQuickSearchTerm(job, this.jfilterTerm);
      else return true;
    }
    return this.applyAdvancedFiltersOnAJob(job);
  }
  
  advancedFilterOpenStatusChanged(opened: boolean): void {
    this.isAdvancedFilterApplied = opened;
  }

   applyAdvancedFiltersOnAJob(job: any): boolean {
    if (!this.advancedFilters) return true;
    let returnVal = true;
    if (this.advancedFilters.jobTitle.length > 0) {
      // returnVal = this.advancedFilters.jobTitle.map((v: any) => v.JobTitle).indexOf(job.ProfileTitle) > -1;
      returnVal = this.advancedFilters.jobTitle.filter((v: any) => (job?.ProfileTitle || '').toLowerCase().includes(v.JobTitle.toLowerCase())).length > 0;

    }
    if (!returnVal) return false;

    if (this.advancedFilters.applicationStatus.length > 0) {
      // returnVal = this.advancedFilters.profileType.map((v: any) => v.value).indexOf(job?.ProfileType) > -1;
      returnVal = this.advancedFilters.applicationStatus.filter((v: any) => (job?.JobStatus || '').toLowerCase().includes(v.value.toLowerCase())).length > 0;
      
    }
    if (!returnVal) return false;


    if (this.advancedFilters.sourcType.length > 0) {
      returnVal = this.advancedFilters.sourcType.filter((v: any) => (job?.DataSource || '').toLowerCase().includes(v.name.toLowerCase())).length > 0;
    }
    if (!returnVal) return false;

    if (this.advancedFilters.experience.min > -1) {
      returnVal = job.TotalExperience >= this.advancedFilters.experience.min;
    }
    if (!returnVal) return false;

    if (this.advancedFilters.experience.max > -1) {
      returnVal = job.TotalExperience <= this.advancedFilters.experience.max;
    }
    if (!returnVal) return false;

    // console.log("matching",matchingCondition,job.MatchingPercentage,(matchingCondition  =='100% - 80%'),(job.MatchingPercentage > 80),"-",(matchingCondition  =='80% - 60%'),(job.MatchingPercentage > 60),"-",(matchingCondition  =='Below 60%'),( job.MatchingPercentage <= 60 ))

    if (this.advancedFilters.profileMatching.length > 0) {
      let matchingCondition = this.advancedFilters?.profileMatching[0].value;

      if(matchingCondition  =='100% - 80%'){
       returnVal =  (job.MatchingPercentage > 80);
      }
      else if(matchingCondition  =='80% - 60%'){
       returnVal =  (job.MatchingPercentage > 60  && job.MatchingPercentage < 80);
      }
      else if(matchingCondition  =='Below 60%'){
       returnVal = ( job.MatchingPercentage <= 60 );
      }
    }
    if (!returnVal) return false;

    if (this.advancedFilters?.domain.length > 0) {
      returnVal = this.advancedFilters?.DomainName.filter((v: any) => (job?.DomainName || '').toLowerCase().includes(v.DomainName.toLowerCase())).length > 0;
    }
    if (!returnVal) return false;

    if (this.advancedFilters.certification.length > 0) {
      returnVal = this.advancedFilters.certification.filter((v: any) => (job?.CertificationName || '').toLowerCase().includes(v.certificationname.toLowerCase())).length > 0;
    }
    if (!returnVal) return false;

    if (this.advancedFilters.profileType[0]?.value == "Private") {
      returnVal = (job.CompanyName !=  null)
    }
    if (!returnVal) return false;

    if (this.advancedFilters.profileType[0]?.value == "Public") {
      returnVal = (job.CompanyName ==  null)
    }
    if (!returnVal) return false;

    if (this.advancedFilters.profileType[0]?.value == "All") {
      returnVal = (job.CompanyName ==  null ||job.CompanyName !=  null )
    }
    if (!returnVal) return false;

    return returnVal;
  }
  applyQuickSearchTerm(job: any, search: string) {
    // debugger;
    const /** @type {?} */ toCompare = search.toLowerCase();
    for (let /** @type {?} */ property in job) {
        if (job[property] === null || job[property] == undefined) {
            continue;
        }
        if (typeof job[property] === 'object') {
            if (this.applyQuickSearchTerm(job[property], search)) {
                return true;
            }
        }
        if (job[property].toString().toLowerCase().includes(toCompare)) {
            return true;
        }
    }
    return false;
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
    this.applyFilters()
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
      this.applyFilters();

      console.log(response);
    });
  }

  panelHandler(event:{panelName:string,profile:any}) {
    this.panelShow = event.panelName;
    this.profile = event.profile
    console.log("profile",this.profile)
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
