import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/shared/components/services/api.service';

@Component({
  selector: 'app-find-a-candidate-filter',
  templateUrl: './find-a-candidate-filter.component.html',
  styleUrls: ['./find-a-candidate-filter.component.scss'],
  providers: [ApiService]
})
export class FindACandidateFilterComponent implements OnInit {
  advanceFilter:boolean = false;
  quickSearch:boolean = false;
  saveSearch = false;

  @ViewChild('newfItem') fullfNameInput: any; 
  @ViewChild('mSelect') fmyfSelectInput: any; 
  @Output() fchanged = new EventEmitter<string>();
  @Output() newfItemEvent = new EventEmitter<string>();
  @Output() clearfItemEvent = new EventEmitter<string>();
  @Input() filterTerm: any ='';
  @Input() candidates: any ='';
  @Input() viewLayout = ''; // decorate the property with @Input();
  @Output() layoutView = new EventEmitter<string>();
  constructor(private _service : ApiService) { }

  ngOnInit(): void {
    this.layoutView.emit('grid');
  }

  download(){
    this._service.downloadFindCandidatesFile(this.candidates, 'My Profiles');
  }
  onOptionsSelected(value:string){
    this.fchanged.emit(value);
}



addfNewItem(value: string) {
    this.newfItemEvent.emit(value);
  }

  addfclearItem(value: string) {
    this.clearfItemEvent.emit(value);
    this.fullfNameInput.nativeElement.value = '';
    this.fmyfSelectInput.nativeElement.value = 0;
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

}
