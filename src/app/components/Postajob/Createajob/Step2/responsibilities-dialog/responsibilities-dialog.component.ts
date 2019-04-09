import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { a } from '@angular/core/src/render3';
declare var $: any;
@Component({
  selector: 'app-responsibilities-dialog',
  templateUrl: './responsibilities-dialog.component.html',
  styleUrls: ['./responsibilities-dialog.component.css']
})
export class ResponsibilitiesDialogComponent implements OnInit {

  constructor(@Inject (MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    
      $("#text-data").click(function() {
        var x = $("#copy-data").val();
	      var str = x;
	      var result = str.match( /[^\.!,\.$\?]+[\.!,\.$\?]+/g );
        console.log(result);
        var i=0;
        /*
        for(i=0;i<=result.length-1;i++)
        {
        document.write("<option>"+result[i]+"</option>");
        }
        */


      });
    
  }

}
