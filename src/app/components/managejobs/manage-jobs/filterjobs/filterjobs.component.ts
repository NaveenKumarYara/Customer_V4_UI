import { Component, OnInit, Output, EventEmitter, Input   } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ManageJobService } from '../../managejobs.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {  ParentComponentApi } from '../load-joblist/load-joblist.component';
import{AdvanceSearchComponent} from '../advance-search/advance-search.component';
import { Subject, Observable } from 'rxjs';


@Component({
  selector: 'app-manage-filterjobs',
  templateUrl: './filterjobs.component.html',
  styleUrls: ['./filterjobs.component.css']
})
export class FilterjobsComponent implements OnInit {
  constructor(private route: ActivatedRoute,private dialog: MatDialog,
    private router: Router, private managejobservice: ManageJobService) {
  }
  @Input() parentApi: ParentComponentApi; 
  viewfiltersDialgoref: MatDialogRef<AdvanceSearchComponent>;
  gridlayoutClicked = true;
  tablelayoutClicked = false;
  activeClassBool = true;


  
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
        // locations,minExp, MaxExp,minSal,maxSal
        this.parentApi.Filterjobs(result.data.locList,result.data.minExp,result.data.maxExp,result.data.minSal,result.data.maxSal,result.data.clients,result.data.domain,result.data.immigrations,result.data.lastWeek,result.data.lastTwoWeek,result.data.last30days,result.data.last90days,result.data.lastyear,result.data.today,result.data.category,result.data.empType,result.data.jobStatus,result.data.skills,result.data.departments,result.data.titles,result.data.education);
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
  
  }

 
}
