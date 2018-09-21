import { Component, OnInit,Input} from '@angular/core';
import { GetCompanyBenefit } from '../../../../models/GetCompanyBenefit';

@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.css']
})
export class BenefitsComponent implements OnInit {
@Input() getcompanybenfit:GetCompanyBenefit;
  constructor() { }

  ngOnInit() {
  }

}
