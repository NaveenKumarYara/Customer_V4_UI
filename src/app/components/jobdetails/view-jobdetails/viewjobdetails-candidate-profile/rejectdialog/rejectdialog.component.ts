import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-rejectdialog',
  templateUrl: './rejectdialog.component.html',
  styleUrls: ['./rejectdialog.component.css']
})
export class RejectdialogComponent{

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }


}
