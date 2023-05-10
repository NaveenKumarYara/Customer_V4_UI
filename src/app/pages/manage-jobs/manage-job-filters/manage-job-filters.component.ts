import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/shared/components/services/api.service';

@Component({
  selector: 'app-manage-job-filters',
  templateUrl: './manage-job-filters.component.html',
  styleUrls: ['./manage-job-filters.component.scss'],
  providers: [ApiService]
})
export class ManageJobFiltersComponent implements OnInit {
  advanceFilter:boolean = false;
  quickSearch:boolean = false;
  saveSearch = false;
  @Output() newItemEvent = new EventEmitter<string>();
  @Input() filterTerm: any ='';
  @Input() Jobs: any ='';
  @Input() viewLayout = ''; // decorate the property with @Input();
  @Output() layoutView = new EventEmitter<string>();

  constructor(private _service : ApiService) { }
  ngOnInit(): void {
  }
 
  download(job:any){
    debugger
    this._service.downloadFile(job, 'MyJobs');
  }

  addNewItem(value: string) {
    this.newItemEvent.emit(value);
  }


  filterHandler() {
    this.advanceFilter = !this.advanceFilter;
  }

  filterHideHandler() {
    this.advanceFilter = false;
  }

  quickHandler() {
    this.quickSearch = !this.quickSearch;
  }

  quickHideHandler() {
    this.quickSearch = false;
  }

  layoutSwitch(name: string){
    this.layoutView.emit(name);
  }
  
  saveClick() {
    this.saveSearch = !this.saveSearch;
  }
}
