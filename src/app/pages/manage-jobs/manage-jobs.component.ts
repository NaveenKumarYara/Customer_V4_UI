import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/components/services/api.service';

@Component({
  selector: 'app-manage-jobs',
  templateUrl: './manage-jobs.component.html',
  styleUrls: ['./manage-jobs.component.scss'],
  providers: [ApiService]
})
export class ManageJobsComponent implements OnInit {
 
  constructor(private _service : ApiService) { }

  ngOnInit(): void {
    
  }
}
