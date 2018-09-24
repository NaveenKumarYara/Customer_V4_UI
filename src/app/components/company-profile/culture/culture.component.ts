import { Component, OnInit ,Input} from '@angular/core';
import {  GetCompanyCulture } from '../../../../models/GetCompanyCulture';
@Component({
  selector: 'app-culture',
  templateUrl: './culture.component.html',
  styleUrls: ['./culture.component.css']
})
export class CultureComponent implements OnInit {
@Input() getcompanycluture:GetCompanyCulture;
  constructor() { }

  ngOnInit() {
  }

}
