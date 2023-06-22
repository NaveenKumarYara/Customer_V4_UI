import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../../app.service';

@Component({
  selector: 'app-jobdescription',
  templateUrl: './jobdescription.component.html',
  styleUrls: ['./jobdescription.component.css']
})
export class JobdescriptionComponent implements OnInit {
hasCompleteDescription: boolean=false;
jobDescription: string;
hasCompleteDescriptionList: any;
constructor( private appService: AppService) {

 }

  ngOnInit() {
    this.appService.currentDescriptionChecked.subscribe(x => this.hasCompleteDescription = x);
    this.appService.currentDescription.subscribe(x => this.jobDescription = x);
  }

  setValue(val) {
    this.hasCompleteDescription = val;
    this.jobDescription = val ? this.jobDescription : '';
    this.appService.updatehaddescription(this.hasCompleteDescription);
  }
  

  
  changeDescription(val) {
    this.jobDescription = val;
    this.appService.updatedescription(this.jobDescription);
  }

}
