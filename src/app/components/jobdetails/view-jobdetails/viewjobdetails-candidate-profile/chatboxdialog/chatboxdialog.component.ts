import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-chatboxdialog',
  templateUrl: './chatboxdialog.component.html',
  styleUrls: ['./chatboxdialog.component.css']
})
export class ChatboxdialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

}
