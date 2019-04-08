import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { JobdetailsService } from '../../jobdetails.service';
import { ParentComponentApi } from '../view-jobdetails.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Jobstatistics } from '../../models/jobstatistics';
import {WishlistCount} from '../../models/WishlistCount';
import { JobdetailsProfile } from '../../models/jobdetailsprofile';
import { MatDialog } from '@angular/material';
import { InviteProfiledialogComponent } from './invite-profiledialog/invite-profiledialog.component';
import { UploadProfilesComponent } from '../upload-profiles/upload-profiles.component';
declare var $: any;
// import { ViewjobdetailsCandidateProfileComponent } from '../viewjobdetails-candidate-profile/viewjobdetails-candidate-profile.component';

@Component({
  selector: 'app-filter-view-jobs',
  templateUrl: './filter-view-jobs.component.html',
  styleUrls: ['./filter-view-jobs.component.css'],
 // providers: [ViewjobdetailsCandidateProfileComponent]
})
export class FilterViewJobsComponent implements OnInit {
  ViewBy: number ;
  searchString: any;
  uploaded:any;
  view :any;
  UploadedFlag:boolean;
  WishlistFlag:boolean;
  SuggestedFlag:boolean;
  SearchList: any = [];
  SearchResults: any = { Profile: [] };
  @Input() jobid: number;
  @Input() Counts: Jobstatistics;
  @Input() statusid: number;
  @Input() displayQuick: number;
  @Input() Count: WishlistCount;
  TotalCount: any;
  count:number;
  customer:any;
  customerId: any;
  userId: any;
  value:any;
  suggested:any;
  jobdetailsprofiles = new JobdetailsProfile() ;
  sortBy:0;
  wishlist:any;
  sortByOrder: any;
  @Input() parentApi: ParentComponentApi;
  // selectedCountry:Country = new Country(2, 'India');
  // countries = [
  //    new Country(1, 'USA' ),
  //    new Country(2, 'India' ),
  //    new Country(3, 'Australia' ),
  //    new Country(4, 'Brazil')
  // ];

  constructor(private route: ActivatedRoute, private fb: FormBuilder,
    private router: Router, private jobdetailsservice: JobdetailsService,  private dialog: MatDialog
   ) {
      this.customer = JSON.parse(sessionStorage.getItem('userData'));
      this.customerId = this.customer.CustomerId;
      this.userId =  this.customer.UserId;
      this.ViewBy = 1;    
     // this.jobid = JSON.parse(sessionStorage.getItem('jobId'));
     }


  showdetailssearch = false;

  updateDetailAdvanceSearch() {
    this.searchString ='';
    this.showdetailssearch = !this.showdetailssearch;
    this.jobdetailsservice.updateDetailsAdvanceSearch(this.showdetailssearch);
  }


  search(val) {
   this.searchString = val;
   //this.parentApi.callSearchMethod(this.searchString);
   this.parentApi.CallViewBy(this.uploaded,this.suggested,this.wishlist,this.sortBy,this.searchString,this.TotalCount);
   this.SearchList = [];
   this.GetSearchText(null);
  }

  updatestatus() {
    this.parentApi.callSuggested();
  }

  GetSearchText(value) {
      return this.jobdetailsservice.GetAutoSearch(value,this.customerId)
      .subscribe(data => 
        {
          if (data.length > 0) {  
            this.SearchList =data;
          }
          else {
            this.SearchList = [];
          }
        
          },     
        error => { 
          this.SearchList = [];
        });
 }

 viewby(value, isChecked: boolean,sortBy)
 {
   if(sortBy>0)
   {
     this.sortBy = sortBy;
   }  
  if(value === 1)
  {
    if(isChecked)
    {
      this.wishlist = 1;
    }
    else
    {
      this.wishlist = 0;
    } 
  }
  else if (value === 2)
  {
    if(isChecked)
    {
      this.uploaded = 1;
    }
    else
    {
      this.uploaded = 0;
    } 
  }
  else if (value === 3)
  {
    if(isChecked)
    {
      this.suggested = 1;
    }
    else
    {
      this.suggested = 0;
    }     
  } 
  if(this.suggested > 0 || this.uploaded > 0 || this.wishlist>0)
  {
    this.calldata(this.uploaded,this.suggested,this.wishlist);
  }
  else
  {
    this.parentApi.CallViewBy(0,0,0,this.sortBy,this.searchString,0);
  }
 
 }

 calldata(uploaded,suggested,wishlist)
 {
  return this.jobdetailsservice.getJobDetailsProfileInfo(this.customerId, this.userId, this.jobid, this.statusid,0, '',0, '', '', this.uploaded,this.suggested,this.wishlist,6)
  .subscribe(res => {
    this.jobdetailsprofiles = res;
    this.TotalCount = this.jobdetailsprofiles.TotalProfileCount;
    if(this.TotalCount>0)
    {
      this.parentApi.CallViewBy(this.uploaded,this.suggested,this.wishlist,this.sortBy,this.searchString,this.TotalCount);
    }
  });
 }



dislaySortByOptions() {
  this.jobdetailsservice.getSortByOption().subscribe(x => this.sortByOrder = x);
}
SearchEnter(searchval) {
  this.SearchList = [];
  this.GetSearchText(null);
  this.search(searchval);
}

 SetSearch(val) {
   this.SearchList = [];
   this.search(val);
 }
//  changeViewby(sortBy) {
//   this.sortBy = sortBy;
//   // this.viewdetailscand.PopulateJobdetailProfiles(this.customerId, this.userId, this.jobid, this.statusid, sortBy.target.value);
//   this.parentApi.callParentMethod(sortBy);
// }
  ngOnInit() {
  this.dislaySortByOptions();
  }
  OpenInviteProfileDialog() {
      // if (this.jobStatus !== 'InActive') {
      const inviteProfiledialogRef = this.dialog.open(InviteProfiledialogComponent,
        {
          width: '750',
          position: {right : '0px'},
          height : '750px',
          data: {
            animal: 'panda'
          }
        }
      );
      inviteProfiledialogRef.afterClosed().subscribe(result => {
        console.log('Chatbox Dialog result: ${result}');
      });
    // }
  }
  OpenUploadProfilesDialog() {
    // if (this.jobStatus !== 'InActive') {
    const uploadProfiledialogRef = this.dialog.open(UploadProfilesComponent,
      {
        width: '750',
        position: {right : '0px'},
        height : '750px',
        data: {
          animal: 'panda'
        }
      }
    );
    uploadProfiledialogRef.afterClosed().subscribe(result => {
      console.log('Chatbox Dialog result: ${result}');
    });
  // }
}
}
