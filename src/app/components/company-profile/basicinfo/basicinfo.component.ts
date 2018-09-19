import { Component, Input,OnInit } from '@angular/core';
import { CompanyBasicInfo } from '../../../../models/CompanyBasicInfo';

@Component({
  selector: 'app-basicinfo',
  templateUrl: './basicinfo.component.html',
  styleUrls: ['./basicinfo.component.css']
})
export class BasicinfoComponent implements OnInit {
  @Input() companybasicinfo : CompanyBasicInfo;
  constructor() { }

  ngOnInit() {
  }

}
