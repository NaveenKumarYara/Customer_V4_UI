import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { StorageService } from '../../services';

@Component({
  selector: 'app-filter-component',
  templateUrl: './filter-component.html',
  styleUrls: ['./filter-component.css'],
  providers: [
    
 ],
})
export class FitlerComponent implements OnInit {

  @Input() Filters: any;
  @Input() Fields: any;

  constructor(private readonly storageService: StorageService, private readonly dialogRef: MatDialogRef<FitlerComponent>,) { }

  ngOnInit() {
  }
  applyFilter() {
    debugger;
    this.storageService.save('CurrentFilter', JSON.stringify(this.Filters));
    this.dialogRef.close({event:'Cancel'});
  }
}
