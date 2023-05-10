import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-manage-jobcard',
  templateUrl: './manage-jobcard.component.html',  
  styleUrls: ['./manage-jobcard.component.scss']
})
export class ManageJobcardComponent implements OnInit {
  @Input() job: any;
  @Input() panelShow: any = '';
  @Output() panelHandler = new EventEmitter<string>(); 
  
  constructor() { }

  ngOnInit(): void {
  }
  
  panelClick(name: string) {
    this.panelHandler.emit(name);
  }
}
