import { Component, OnInit } from '@angular/core';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-job-notes',
  templateUrl: './job-notes.component.html',
  styleUrls: ['./job-notes.component.scss']
})
export class JobNotesComponent implements OnInit {
  panels = ['First', 'Second', 'Third'];
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

  constructor(config: NgbAccordionConfig) {
		// customize default values of accordions used by this component tree
		config.closeOthers = true;
		config.type = 'info';
	}

  ngOnInit(): void {
  }

}
