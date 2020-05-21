import { Component, OnInit, Output, EventEmitter, Input   } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ManageJobService } from '../../managejobs.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {  ParentComponentApi } from '../load-joblist/load-joblist.component';
import{AdvanceSearchComponent} from '../advance-search/advance-search.component';
import { Subject, Observable } from 'rxjs';
import { Savefilter } from '../../models/Savefilter';


@Component({
  selector: 'app-manage-filterjobs',
  templateUrl: './filterjobs.component.html',
  styleUrls: ['./filterjobs.component.css']
})
export class FilterjobsComponent implements OnInit {
  constructor(private route: ActivatedRoute,private dialog: MatDialog,
    private router: Router, private managejobservice: ManageJobService) {
      this.customer = JSON.parse(sessionStorage.getItem('userData'));
      this.customerId = this.customer.CustomerId;
      this.userId = this.customer.UserId;
  }
  @Input() parentApi: ParentComponentApi; 
  customer: any;
  customerId:any;
  userId: any;
  viewfiltersDialgoref: MatDialogRef<AdvanceSearchComponent>;
  gridlayoutClicked = true;
  tablelayoutClicked = false;
  activeClassBool = true;
  saveFilter=new Savefilter();
  ischecked:boolean=false;

  GetSavedJobFilter()
  {


      return this.managejobservice.getSavedJobsFilter(this.customerId, this.userId).subscribe(res => {
        if(res!=null)
        {
         this.ischecked=true;
        }
        else
        {
         this.ischecked=false;
        }
           
      });  
 
   
    
  }
  
  OpenFiltersDialog() {
      const filtersdialogRef = this.dialog.open(AdvanceSearchComponent,
        {
          width: '600px',
          position: { right: '0px' },
          height: '750px',
          data: {
            animal: 'panda'
          }
        }
      );
      filtersdialogRef.afterClosed().subscribe(result => {
        console.log('Chatbox Dialog result: ${result}');
        debugger
        if(result != undefined){     
          this.saveFilter.CustomerId=this.customerId;
          this.saveFilter.UserId=this.userId;
          this.saveFilter.SortBy=0;       
          this.saveFilter.MinSal=result.data.minSal;
          this.saveFilter.MaxSal=result.data.maxSal;
          this.saveFilter.MinExp=result.data.minExp;
          this.saveFilter.MaxExp=result.data.maxExp;
          this.saveFilter.JobStatus=result.data.profileStatus;
          this.saveFilter.locations=result.data.locList;
          this.saveFilter.skills=result.data.skills;
          this.saveFilter.clients=result.data.clients;
          this.saveFilter.titles=result.data.titles;
          this.saveFilter.departments=result.data.departments;
          this.saveFilter.domain=result.data.domain;
          this.saveFilter.Immigration=result.data.immigrations;
          this.saveFilter.lastWeek=result.data.lastWeek;
          this.saveFilter.lastTwoWeek=result.data.lastTwoWeek;
          this.saveFilter.last30days=result.data.last30days;
          this.saveFilter.last90days=result.data.last90days;
          this.saveFilter.lastyear=result.data.lastyear;
          this.saveFilter.today=result.data.today;
          this.saveFilter.category=result.data.category;
          this.saveFilter.empType=result.data.empType;
          this.saveFilter.education=result.data.education;
          this.saveFilter.users=result.data.Users;
          debugger
          return this.managejobservice.SaveJobFilter(this.saveFilter).subscribe(data => {
            if(data==0)
            {
              this.parentApi.Filterjobs(result.data.locList,result.data.minExp,result.data.maxExp,result.data.minSal,result.data.maxSal,result.data.clients,result.data.domain,result.data.immigrations,result.data.lastWeek,result.data.lastTwoWeek,result.data.last30days,result.data.last90days,result.data.lastyear,result.data.today,result.data.category,result.data.empType,result.data.profileStatus,result.data.skills,result.data.departments,result.data.titles,result.data.education,result.data.isfiltered,result.data.Users);
            }
           
          });
        // locations,minExp, MaxExp,minSal,maxSal
        //this.parentApi.Filterjobs(result.data.locList,result.data.minExp,result.data.maxExp,result.data.minSal,result.data.maxSal,result.data.clients,result.data.domain,result.data.immigrations,result.data.lastWeek,result.data.lastTwoWeek,result.data.last30days,result.data.last90days,result.data.lastyear,result.data.today,result.data.category,result.data.empType,result.data.profileStatus,result.data.skills,result.data.departments,result.data.titles,result.data.education,result.data.isfiltered,result.data.Users);
      }
        // console.log('result.data',result.data);
      });
    
  }

  



  toggleGridLayout() {
    this.gridlayoutClicked = !this.gridlayoutClicked;
    this.tablelayoutClicked = false;
    this.activeClassBool = !this.activeClassBool;
    this.navigateToGridLayout();
   }

  navigateToGridLayout() {
    this.router.navigate(['app-manage-load-joblist/1'], { relativeTo: this.route });
  }

  navigateToTableLayout() {
    this.router.navigate(['app-manage-load-joblist/2'], { relativeTo: this.route });
  }

  toggleTableLayout() {
    this.tablelayoutClicked = !this.tablelayoutClicked;
    this.gridlayoutClicked = false;
    this.activeClassBool = !this.activeClassBool;
    this.navigateToTableLayout();
  }

  showsearch: boolean = false;

  updateAdvanceSearch() {
    this.showsearch = !this.showsearch;
    this.managejobservice.updateAdvanceSearch(this.showsearch);
  }



  ngOnInit() {
  this.GetSavedJobFilter();
  }

 
}
