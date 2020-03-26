import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../app.service';

@Component({
  selector: 'app-steps-step2-noofopenings',
  templateUrl: './noofopenings.component.html',
 // styleUrls: ['./noofopenings.component.css']
})
export class NoofopeningsComponent implements OnInit {
  //noOfOpenings: any;
  //openingsList: number[];
  constructor(private appService: AppService) { }

  ngOnInit() {
   // this.populateopenings();
   // if (localStorage.getItem('jobId') != null) {
    //this.appService.currentOpenings.subscribe(x => this.noOfOpenings = x);
   // }
    // this.appService.currentDescriptionChecked.subscribe(x => this.noOfOpenings = x);
    // this.appService.currentDescription.subscribe(x => this.jobDescription = x);
  }
//   populateopenings() {
//     this.openingsList  = this.appService.getnoofopenings();
//   }
//   Opening(val) {
// // this.service.
// this.noOfOpenings = val;
// this.appService.updateOpenings(this.noOfOpenings);
//   }
}
