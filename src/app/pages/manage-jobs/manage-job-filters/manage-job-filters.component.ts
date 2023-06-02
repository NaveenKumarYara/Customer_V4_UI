import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('newItem') fullNameInput: any; 
  @ViewChild('mySelect') fmySelectInput: any; 
  @Output() changed = new EventEmitter<string>();
  @Output() newItemEvent = new EventEmitter<string>();
  @Output() clearItemEvent = new EventEmitter<string>();
  @Input() filterTerm: any ='';
  @Input() Jobs: any ='';
  @Input() viewLayout = ''; // decorate the property with @Input();
  @Output() layoutView = new EventEmitter<string>();

  constructor(private _service : ApiService) { }
  ngOnInit(): void {
  }
 
  download(job:any){
    this._service.downloadFile(job, 'MyJobs');
  }
  onOptionsSelected(value:string){
    this.changed.emit(value);
}

  addNewItem(value: string) {
    this.newItemEvent.emit(value);
  }

  addclearItem(value: string) {
    this.clearItemEvent.emit(value);
    this.fullNameInput.nativeElement.value = '';
    this.fmySelectInput.nativeElement.value = 0;
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
