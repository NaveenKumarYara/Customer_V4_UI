import { Component,Input,OnInit } from '@angular/core';
import { GetAboutCompany } from '../../../../models/GetAboutCompany';

@Component({
  selector: 'app-aboutcompany',
  templateUrl: './aboutcompany.component.html',
  styleUrls: ['./aboutcompany.component.css']
})
export class AboutcompanyComponent implements OnInit {
@Input()  getaboutcompany: GetAboutCompany;
  constructor() { }

  ngOnInit() {
  }

}
