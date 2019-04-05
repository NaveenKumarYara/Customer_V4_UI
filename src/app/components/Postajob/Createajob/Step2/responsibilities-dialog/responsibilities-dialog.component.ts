import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-responsibilities-dialog',
  templateUrl: './responsibilities-dialog.component.html',
  styleUrls: ['./responsibilities-dialog.component.css']
})
export class ResponsibilitiesDialogComponent implements OnInit {

  constructor(@Inject (MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

  }

}
