import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-jobcard',
  templateUrl: './manage-jobcard.component.html',
  styleUrls: ['./manage-jobcard.component.scss']
})
export class ManageJobcardComponent implements OnInit {
  @Input() job: any;
  constructor() { }

  ngOnInit(): void {
  }

}
