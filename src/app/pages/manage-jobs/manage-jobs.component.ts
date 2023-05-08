import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-jobs',
  templateUrl: './manage-jobs.component.html',
  styleUrls: ['./manage-jobs.component.scss']
})
export class ManageJobsComponent implements OnInit {
  title = 'manage-jobs';
  viewLayout = 'grid';
  rowShow = 0;
  
  layoutView(name:string){
   this.viewLayout = name;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
