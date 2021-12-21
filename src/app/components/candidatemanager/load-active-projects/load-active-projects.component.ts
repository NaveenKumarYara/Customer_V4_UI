import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-load-active-projects',
  templateUrl: './load-active-projects.component.html',
  styleUrls: ['./load-active-projects.component.css']
})
export class LoadActiveProjectsComponent implements OnInit {
  jobList: any;

  constructor(private appService: AppService, private readonly activeModal: NgbActiveModal,) { }

  ngOnInit() {
  }
}
