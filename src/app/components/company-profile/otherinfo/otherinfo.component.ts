import { Component,Input,OnInit } from '@angular/core';
import { OtherInfo } from '../../../../models/OtherInfo';

@Component({
  selector: 'app-otherinfo',
  templateUrl: './otherinfo.component.html',
  styleUrls: ['./otherinfo.component.css']
})
export class OtherinfoComponent implements OnInit {
  @Input() otherinfo : OtherInfo;
  constructor() { }

  ngOnInit() {
  }

}
