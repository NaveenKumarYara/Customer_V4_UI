import { Component, OnInit, Input } from '@angular/core';
import {  GetCompanyWhitePaper } from '../../../../models/GetCompanyWhitePaper';
import { GetCompanyNewsInfo } from '../../../../models/GetCompanyNewsInfo';
@Component({
  selector: 'app-whitepaper',
  templateUrl: './whitepaper.component.html',
  styleUrls: ['./whitepaper.component.css']
})
export class WhitepaperComponent implements OnInit {
@Input() getcompanywhitepaper: GetCompanyWhitePaper;
@Input() getcompanynewsinfo: GetCompanyNewsInfo;
  constructor() { }

  ngOnInit() {
  }

}
