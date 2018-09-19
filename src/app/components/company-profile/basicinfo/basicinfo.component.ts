import { Component, OnInit, Input } from '@angular/core';
import { CompanyProfile } from '../../../../models/companyprofile';

@Component({
  selector: 'app-basicinfo',
  templateUrl: './basicinfo.component.html',
  styleUrls: ['./basicinfo.component.css']
})
export class BasicinfoComponent implements OnInit {
    @Input() companyprofile: CompanyProfile;

  constructor() { }

  ngOnInit() {
  }

}
