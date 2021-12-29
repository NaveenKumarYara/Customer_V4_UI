import { Component, OnInit, Inject, ViewContainerRef,ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-jobcard',
  templateUrl: './jobcard.component.html',
  styleUrls: ['./jobcard.component.css']
})
export class JobcardComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<JobcardComponent> ) { 

  }

  ngOnInit() {
  }

  onYesClicked() {
    this.closeDialog(DialogResult.Yes);
  }

  onNoClicked() {
    this.closeDialog(DialogResult.No);
  }

  private closeDialog(result: DialogResult) {
    this.dialogRef.close(result);
  }

}


export enum DialogResult {
  Cancel = -1,
  No = 0,
  Yes = 1,
}