import { Component, OnInit, Input } from '@angular/core';
import { CompanyProfileOtherIno } from '../../../../models/companyprofile-otherinfo';

@Component({
  selector: 'app-otherinfo',
  templateUrl: './otherinfo.component.html',
  styleUrls: ['./otherinfo.component.css']
})
export class OtherinfoComponent implements OnInit {
    @Input() companyprofileotherinfo: CompanyProfileOtherIno;

  constructor() { }

  ngOnInit() {
  }

}
