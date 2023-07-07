import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/shared/components/services/api.service';

@Component({
  selector: 'app-manage-quick-search',
  templateUrl: './manage-quick-search.component.html',
  styleUrls: ['./manage-quick-search.component.scss'],
  providers: [ApiService]
})
export class ManageQuickSearchComponent implements OnInit {
  @Input() quickSearch = false; // decorate the property with @Input();
  @Input() items:any;
  @Output("quickHideHandler") quickHideHandler: EventEmitter<any> = new EventEmitter();
  @Output("quicksort") quicksort: EventEmitter<any> = new EventEmitter();
  otherOption: boolean = false;
  selectedItem = 9;
  

  constructor(private _service : ApiService) {
   }

 

  changeStatus(val: any)
  {
    this.quicksort.emit(val);
  }

  clear(val: any)
  {
    this.selectedItem = 9;
    this.quicksort.emit(val);
  }

  ngOnInit(): void {
  }

  dropHandler() {
    this.otherOption = !this.otherOption
  }
}
