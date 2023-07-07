import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/components/services/api.service';


@Component({
  selector: 'app-manage-jobcard',
  templateUrl: './manage-jobcard.component.html',  
  styleUrls: ['./manage-jobcard.component.scss'],
  providers: [ApiService]
})
export class ManageJobcardComponent implements OnInit {
  @Input() job: any;
  @Input() panelShow: any = '';
  @Output() panelHandler = new EventEmitter<{panelName:string, job: any}>(); 
  
  constructor(private _service : ApiService,private route:Router) { }

  ngOnInit(): void {
  }
  
  panelClick(name: string) {
    console.log(name);
    this.panelHandler.emit({panelName: name, job: this.job});
  }

}
