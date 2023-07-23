import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidate-documents',
  templateUrl: './candidate-documents.component.html',
  styleUrls: ['./candidate-documents.component.scss']
})
export class CandidateDocumentsComponent implements OnInit {
  isDocumentType: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  changeHandler() {
    this.isDocumentType = !this.isDocumentType;
  }
}
