import { Component, OnInit, Input } from '@angular/core';
import { CompanyProfile } from '../../../../models/companyprofile';
import {GetCompanyLogo} from '../../../../models/GetCompanyLogo';
@Component({
  selector: 'app-basicinfo',
  templateUrl: './basicinfo.component.html',
  styleUrls: ['./basicinfo.component.css']
})
export class BasicinfoComponent implements OnInit {
    @Input() companyprofile: CompanyProfile;
    @Input() getcompanylogo:GetCompanyLogo;
  constructor() { }

  ngOnInit() {
  }

}
