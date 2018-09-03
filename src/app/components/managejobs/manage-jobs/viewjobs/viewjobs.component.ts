import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ManageJobService } from '../../managejobs.service';

@Component({
  selector: 'app-manage-viewjobs',
  templateUrl: './viewjobs.component.html',
  styleUrls: ['./viewjobs.component.css']
})
export class ViewjobsComponent implements OnInit {
  showadvancesearch = false;
  constructor(private route: ActivatedRoute,
    private router: Router, private managejobservice: ManageJobService) { }

  ngOnInit() {
    this.managejobservice.ShowadvanceSearch.subscribe(x => this.showadvancesearch = x);
  }
   
}
