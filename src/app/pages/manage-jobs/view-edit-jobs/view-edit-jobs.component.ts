import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-edit-jobs',
  templateUrl: './view-edit-jobs.component.html',
  styleUrls: ['./view-edit-jobs.component.scss']
})
export class ViewEditJobsComponent implements OnInit {
  currentRate = 3;
  public isCollapsed = false;
  showCard: boolean = false;

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
