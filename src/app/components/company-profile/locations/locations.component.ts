import { Component, Input,OnInit } from '@angular/core';
import { CompanyLocations} from '../../../../models/CompanyLocations';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  @Input() companylocations: CompanyLocations[];
  constructor() { }

  ngOnInit() {
  }

}
