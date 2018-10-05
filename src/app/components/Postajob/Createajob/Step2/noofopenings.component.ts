import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../app.service';

@Component({
  selector: 'app-steps-step2-noofopenings',
  templateUrl: './noofopenings.component.html',
 // styleUrls: ['./noofopenings.component.css']
})
export class NoofopeningsComponent implements OnInit {
  noOfOpenings: number;
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.currentOpenings.subscribe(x => this.noOfOpenings = x);
  }
  Opening(val) {
// this.service.
this.noOfOpenings = val;
this.appService.updateOpenings(this.noOfOpenings);
  }
}
