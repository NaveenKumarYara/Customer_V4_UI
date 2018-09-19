import { Component, OnInit, Input } from '@angular/core';
import { CustomerLocationInfo } from '../../../../models/customerlocationinfo';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
    @Input() companyprofilelocationinfo: CustomerLocationInfo;

  constructor() { }

  ngOnInit() {
  }

}
