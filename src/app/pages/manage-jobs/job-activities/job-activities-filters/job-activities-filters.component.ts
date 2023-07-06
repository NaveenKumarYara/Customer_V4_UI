import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/shared/components/services/api.service';

@Component({
  selector: 'app-job-activities-job-filters',
  templateUrl: './job-activities-filters.component.html',
  styleUrls: ['./job-activities-filters.component.scss'],
  providers: [ApiService]
})
export class JobFiltersComponent implements OnInit {
  advanceFilter:boolean = false;
  quickSearch:boolean = false;
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
  @Output() newItemEvent = new EventEmitter<string>();
  @Output() clearItemEvent = new EventEmitter<string>();
  @Input() filterTerm: any ='';
  @Input() Profiles: any ='';
  @Input() viewLayout = ''; // decorate the property with @Input();
  @Output() layoutView = new EventEmitter<string>();

  constructor(private _service : ApiService) {
   } 
  ngOnInit(): void {
  }
 
  download(job:any){
    this._service.downloadProfilesFile(job, 'MyJobProfiles');
  }
  onOptionsSelected(value:string){
    this.changed.emit(value);
}

filterChange(appliedfilters: any) {
  console.log(appliedfilters);
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
