import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';
import { ApiService } from 'src/app/shared/components/services/api.service';

@Component({
  selector: 'app-find-a-candidate-grid',
  templateUrl: './find-a-candidate-grid.component.html',
  styleUrls: ['./find-a-candidate-grid.component.scss'],
  providers: [ApiService]
})
export class FindACandidateGridComponent implements OnInit {
  @Input() candidate: any;
  constructor(private _service : ApiService,private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  base64ToArrayBuffer(base64: string) {
		const binary_string = window.atob(base64);
		const len = binary_string.length;
		const bytes = new Uint8Array(len);
		for (let i = 0; i < len; i++) {
			bytes[i] = binary_string.charCodeAt(i);
		}
		return bytes.buffer;
	}
  
	DownloadResume(val: string, ProfileId: any): void {
		this._service.getProfileApi("/api/GetResume?profileId="+ ProfileId).subscribe((fileData:any) => {
      if(fileData != 'No records found')
      {
        let fileType = fileData;
        let exp = fileType.Url.split(".").pop();
        let fileExt = exp;
        this.toastr.success("Downloading!", "Success!");
        setTimeout(() => {
          this.toastr.clear;
        }, 3000);
  
        if (fileExt == "pdf") {
          let byteArr = this.base64ToArrayBuffer(fileData.ResumeFile);
          let blob = new Blob([byteArr], { type: "application/pdf" });
          saveAs(blob, val);
        } else if (fileExt == "doc" || fileExt == "docx") {
          var extension = ".doc";
          let byteArr = this.base64ToArrayBuffer(fileData.ResumeFile);
          let blob = new Blob([byteArr], { type: "application/pdf" });
          saveAs(blob, val + extension);
        }
      
      }
      else
      {
        this.toastr.info("No file found!", "Oh no!");
        setTimeout(() => {
          this.toastr.clear;
        }, 3000);
  
      }
    });
		
	}



}
