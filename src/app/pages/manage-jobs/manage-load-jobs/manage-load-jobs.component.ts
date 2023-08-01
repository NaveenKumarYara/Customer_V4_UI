import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
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
  jobCard: boolean = false;
  select: any;
  showJobForm: any = '';
  MainJobs: any=[];
  selectedJob: any = null;
  isAdvancedFilterApplied = false;
  advancedFilters: any = {};
  filteredJobs = [];
  isShareType: boolean = false;
  layoutView(name:string) {
   this.viewLayout = name;
  }

  panelHandler(event: {panelName: string, job: any}) {
    this.panelShow = event.panelName;
    this.selectedJob = event.job;
    console.log('selectedJob', event);
  }

  panelCloseHandler() {
    this.panelShow = '';
  }


  shareType() {
    this.isShareType = !this.isShareType;
  }


  clearAll(select:any) {
    select = 0;
    this.onChange(select);
    this.addItem('');
  }

  onChange(selected: any) {
    if(Number(selected) == 0) {
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
    if(Number(selected) == 1) {
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

      if(Number(selected) == 2) {
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
      this.applyFilters();
  }


  onquickChange(selected: any) {
    if(selected != 'All Jobs')
    {
      this.addItem(selected);
    }
    else
    {
      this.addItem('');
    }
    
  }
 
  constructor(private _service : ApiService) {
    this.customer = JSON.parse(localStorage.getItem('customer')||'');
    this.GetCustomerJobs(this.customer.CustomerId,0);
   }

  ngOnInit(): void {
    this.showJobForm = 'false';
  }

  showJobFormHandler() {
    this.showJobForm = 'true';
  }

  showJobFormHideHandler() {
    this.showJobForm = 'false';
  }

  listCount(count:any) {
    this.start = count;
    
    this.start = this.start * 6 - 6;
    if(this.start == 0)
    {
      this.start = 1;
    }
    this.last = count * 6;
    if (this.last > this.filteredJobs.length) {
      this.last = this.filteredJobs.length;
    }
    //console.log('start'+ '      '+this.start + '      '+'last' + '      '+ this.last);
  }

  addItem(newItem: string) {
    this.p = 1;
    this.start = 1;
    this.last = 6;
    this.filterTerm = newItem;
    this.applyFilters();
  }

  GetCustomerJobs(CustomerId:number,UserId:number)
  {
    let params = new HttpParams();
		params = params.append("CustomerId", CustomerId);
		params = params.append("UserId", UserId);
    this._service.GetEmployerService("/api/GetCustomerJobs?", params).subscribe((response) => { 
      this.MainJobs = response;
      console.log("customerJobs",response);
			this.Jobs = response;
      this.applyFilters();
      //this.Jobs.sort((a: { PostedDate: any; }, b: { PostedDate: any; }) => (b.PostedDate as any) - (a.PostedDate as any));
		});
  }

  advancedFiltersApplied(filters: any) {
    this.isAdvancedFilterApplied = true;
    this.advancedFilters = filters;
    this.applyFilters();
  }

  isAdvancedFilterEmpty() {
    
  }

  applyFilters() {
    this.filteredJobs = this.Jobs.filter((v: any) => this.applyFiltersOnAJob(v));
  }

  advancedFilterOpenStatusChanged(opened: boolean): void {
    this.isAdvancedFilterApplied = opened;
  }

  applyFiltersOnAJob(job: any): any {
    if (!this.isAdvancedFilterApplied) {
      if (this.filterTerm)
        return this.applyQuickSearchTerm(job, this.filterTerm);
      else return true;
    }
    return this.applyAdvancedFiltersOnAJob(job);
  }

  applyAdvancedFiltersOnAJob(job: any): boolean {
    if (!this.advancedFilters) return true;
    let returnVal = true;
    if (this.advancedFilters.jobTitle.length > 0) {
      returnVal = this.advancedFilters.jobTitle.map((v: any) => v.JobTitle).indexOf(job.JobTitle) > -1;
    }
    if (!returnVal) return false;
    
    if (this.advancedFilters.skills.length > 0) {
      // returnVal = this.advancedFilters.location.map((v: any) => v.CityName).indexOf(job.JobLocations.substr(0,job.JobLocations.length-1)) > -1;
      returnVal = this.advancedFilters.skills.filter((v: any) => (job.Skills || '').toLowerCase().includes(v.SkillName.toLowerCase())).length > 0;

    }
    if (!returnVal) return false;
    
    if (this.advancedFilters.location.length > 0) {
      // returnVal = this.advancedFilters.location.map((v: any) => v.CityName).indexOf(job.JobLocations.substr(0,job.JobLocations.length-1)) > -1;
      returnVal = this.advancedFilters.location.filter((v: any) => (job.JobLocations || '').toLowerCase().includes(v.CityName.toLowerCase())).length > 0;

    }
    if (!returnVal) return false;

    if (this.advancedFilters.employmentType.length > 0) {
      returnVal = this.advancedFilters.employmentType.map((v: any) => v.employment).indexOf(job.EmploymentType) > -1;
    }
    if (!returnVal) return false;



    if (this.advancedFilters.customerUsers.length > 0) {
      returnVal = this.advancedFilters.customerUsers.filter((v: any) => (job.Assignee || '').toLowerCase().includes(v.name.toLowerCase())).length > 0;
    }
    if (!returnVal) return false;

    if (this.advancedFilters.lastPosted) {
      let postedDate = new Date(job.PostedDate);
      postedDate.setHours(0);
      postedDate.setMinutes(0);
      postedDate.setSeconds(0);
      postedDate.setMilliseconds(0);

      let currentDate = new Date();
      currentDate.setHours(0);
      currentDate.setMinutes(0);
      currentDate.setSeconds(0);
      currentDate.setMilliseconds(0);

      if (this.advancedFilters.lastPosted.id == '1') {
        returnVal = currentDate.getTime() == postedDate.getTime();
      } else if (this.advancedFilters.lastPosted.id == '2') {
        const lastWeekDate = currentDate;
        lastWeekDate.setDate(currentDate.getDate() - 7);
        returnVal = postedDate.getTime() >= lastWeekDate.getTime();
      } else if (this.advancedFilters.lastPosted.id == '3') {
        const lastMonthDate = currentDate;
        lastMonthDate.setMonth(currentDate.getMonth() - 1);
        returnVal = postedDate.getTime() >= lastMonthDate.getTime();
      } else if (this.advancedFilters.lastPosted.id == '4') {
        const last3MonthDate = currentDate;
        last3MonthDate.setMonth(currentDate.getMonth() - 3);
        returnVal = postedDate.getTime() >= last3MonthDate.getTime();
      } else {
        returnVal = false;
      }
    }
    if (!returnVal) return false;


    // Client Filter
    if (this.advancedFilters.client.length > 0) {
      returnVal = this.advancedFilters.client
      .map((v: any) => v.ClientName).indexOf(job.ClientName) > -1;
    }
    if (!returnVal) return false;
 
    if (this.advancedFilters.immigrationStatus.length > 0) {
      returnVal = this.advancedFilters.immigrationStatus.filter((v: any) => (job.JobImmigration || '').toLowerCase().includes(v.ImmigrationStatus.toLowerCase())).length > 0;
    }
    if (!returnVal) return false;
    // Domain Filter - No Data in List API
    // if (this.advancedFilters.domain.length > 0) {
    //   returnVal = this.advancedFilters.domain
    //   .map((v: any) => v.DomainName).indexOf(job.JobDomains) > -1;
    // }
    // if (!returnVal) return false;
     
    if (this.advancedFilters.domain.length > 0) {
      returnVal = this.advancedFilters.domain.filter((v: any) => (job.JobDomains || '').toLowerCase().includes(v.DomainName.toLowerCase())).length > 0;
    }
    if (!returnVal) return false;
    // Experience Filter
    if (this.advancedFilters.experience.min > -1) {
      returnVal = job.MinExperience >= this.advancedFilters.experience.min;
    }
    if (!returnVal) return false;

    if (this.advancedFilters.experience.max > -1) {
      returnVal = job.MaxExperience <= this.advancedFilters.experience.max;
    }
    if (!returnVal) return false;
    
    
    // Salary Filter
    if (this.advancedFilters.salaryRange.min > -1) {
      returnVal = parseInt(job.MinimumSalary) >= this.advancedFilters.salaryRange.min;
    }
    if (!returnVal) return false;
    if (this.advancedFilters.salaryRange.max > -1) {
      returnVal = parseInt(job.MaximumSalary) <= this.advancedFilters.salaryRange.max;
    }
    if (!returnVal) return false;


    // Job Status Filter
    if (this.advancedFilters.jobStatus.length > 0) {
      returnVal = this.advancedFilters.jobStatus.map((v: any) => v.jobStatus.toLowerCase()).indexOf(job.JobStatus.toLowerCase()) > -1;
    }
    if (!returnVal) return false;
    // Priority Filter
    if (this.advancedFilters.priority.length > 0) {
      returnVal = this.advancedFilters.priority.map((v: any) => v.priority).indexOf(job.JobPriority) > -1;
    }
    if (!returnVal) return false;
    return returnVal;
  }

  applyQuickSearchTerm(job: any, search: string) {
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

}
