import { Component,Input, OnInit } from '@angular/core';
import { CompanySpecialities } from '../../../../models/CompanySpecialities';
import { GetCompanyTechnology } from '../../../../models/GetCompanyTechnology';

@Component({
  selector: 'app-specialities',
  templateUrl: './specialities.component.html',
  styleUrls: ['./specialities.component.css']
})
export class SpecialitiesComponent implements OnInit {
   @Input() companyspecialities : CompanySpecialities;
   @Input() getcompanytechnology : GetCompanyTechnology;
  constructor() { }

  ngOnInit() {
  }

}
