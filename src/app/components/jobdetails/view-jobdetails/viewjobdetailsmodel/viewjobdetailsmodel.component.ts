import { Component, Inject  } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-viewjobdetailsmodel',
  templateUrl: './viewjobdetailsmodel.component.html',
  styleUrls: ['./viewjobdetailsmodel.component.css']
})
export class ViewjobdetailsmodelComponent  {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

}
