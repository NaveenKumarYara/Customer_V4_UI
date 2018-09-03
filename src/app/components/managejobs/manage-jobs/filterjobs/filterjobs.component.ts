import { Component, OnInit, Output, EventEmitter, Input   } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ManageJobService } from '../../managejobs.service';
import { Subject, Observable } from 'rxjs';


@Component({
  selector: 'app-manage-filterjobs',
  templateUrl: './filterjobs.component.html',
  styleUrls: ['./filterjobs.component.css']
})
export class FilterjobsComponent implements OnInit {
  constructor(private route: ActivatedRoute,
    private router: Router, private managejobservice: ManageJobService) {
  }
  gridlayoutClicked = true;
  tablelayoutClicked = false;
  activeClassBool = true;


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
