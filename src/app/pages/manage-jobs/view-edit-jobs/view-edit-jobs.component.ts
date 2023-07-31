import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-view-edit-jobs',
  templateUrl: './view-edit-jobs.component.html',
  styleUrls: ['./view-edit-jobs.component.scss']
})
export class ViewEditJobsComponent implements OnInit {
  currentRate = 3;
  public isCollapsed = false;
  showCard: boolean = false;

  salMinValue: number = 120;
  salMaxValue: number = 1370;
  minValue: number = 20;
  maxValue: number = 80;
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 10,
    showTicks: true
  };
  optionsSal: Options = {
    floor: 0,
    ceil: 10000,
    step: 10,
    showTicks: true
  };

  config = {
    uiColor: '#F0F3F4',
    height: '100%',
    toolbarGroups: [{
      "name": "basicstyles",
      "groups": ["basicstyles"]
    },
    {
      "name": "links",
      "groups": ["links"]
    },
    {
      "name": "paragraph",
      "groups": ["list", "blocks"]
    },
    {
      "name": "document",
      "groups": ["mode"]
    },
    {
      "name": "insert",
      "groups": ["insert"]
    },
    {
      "name": "styles",
      "groups": ["styles"]
    },
    {
      "name": "about",
      "groups": ["about"]
    }
  ],
  // Remove the redundant buttons from toolbar groups defined above.
  removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
  };
  
  constructor() { }

  ngOnInit(): void {
  }

  showCardHandler() {
    this.showCard = !this.showCard;
  }

}
