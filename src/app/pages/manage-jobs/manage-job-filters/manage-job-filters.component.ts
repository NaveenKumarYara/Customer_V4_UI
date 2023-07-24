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
  items :any = [];
  saveSearch = false;
  filterList = {
    Country : ['India', 'USA', 'Japan', ''],
    Domain: ['IT', 'Agriculture', 'Medical'],
    Jobtitles:['Java Developer','.Net Developer','Full-Stack Developer']
    //here you can add as many filters as you want.
    }; 
  @ViewChild('newItem') fullNameInput: any; 
  @ViewChild('mySelect') fmySelectInput: any; 
  @Output() changed = new EventEmitter<string>();
  @Output() quickchanged = new EventEmitter<string>();
  @Output() newItemEvent = new EventEmitter<string>();
  @Output() clearItemEvent = new EventEmitter<string>();
  @Input() filterTerm: any ='';
  @Input() Jobs: any ='';
  @Input() viewLayout = ''; // decorate the property with @Input();
  @Input() customer: any;
  @Output() layoutView = new EventEmitter<string>();
  @Output()  advancedFiltersApplied= new EventEmitter<any>();
  @Output() advancedFilterOpenStatus = new EventEmitter<boolean>();

  constructor(private _service : ApiService) {
    this.GetJobStatus();
  } 

  ngOnInit(): void {
  }

  GetJobStatus()
  {
    this._service.GetJobStatus().subscribe((response:any) => {
      this.items = response.jobstatus;
    })
  }
 
  download(job:any){
    this._service.downloadFile(job, 'MyJobs');
  }

  onOptionsSelected(value:string){
    this.changed.emit(value);
  }

  filterChange(appliedfilters: any) {
    console.log("appliedfilters", appliedfilters);
    /*let you have selected India as country and IT sector.
  
    you will get an object here i.e.
  
   { appliedFilterValues: {country: "India",sector: "IT"}
   isFilter: true
   }
    */

    //now do your awesome filtering work here.
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
    this.quickSearch = !this.advanceFilter;
    this.advancedFiltersAppliedInternal(null);
    this.advancedFilterOpenStatus.emit(this.advanceFilter);
  }

  filterHideHandler() {
    this.quickSearch = false;
    this.advanceFilter = false;
    this.advancedFiltersAppliedInternal(null);
    this.advancedFilterOpenStatus.emit(this.advanceFilter);
  }

  quickHandler() {
    this.quickSearch = !this.quickSearch;
  }

  quickHideHandler() {
    this.quickSearch = false;
  }


  quicksort(val: any)
  {
     this.quickchanged.emit(val);
  }
  

  layoutSwitch(name: string){
    this.layoutView.emit(name);
  }
  
  saveClick() {
    this.saveSearch = !this.saveSearch;
  }

  advancedFiltersAppliedInternal(filters: any) {
    console.log('appliedFilters', filters);
    this.advancedFiltersApplied.emit(filters);
  }
}
