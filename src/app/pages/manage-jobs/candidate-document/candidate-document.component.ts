import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-candidate-document',
  templateUrl: './candidate-document.component.html',
  styleUrls: ['./candidate-document.component.scss']
})
export class CandidateDocumentComponent implements OnInit {
  @Input() isDocumentType: boolean = false;
  @Input() showNoteForm: boolean = false;
  @Input() showFeedbackForm: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
