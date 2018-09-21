import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { JobdetailsService } from '../../jobdetails.service';
import { ChatboxdialogComponent } from './chatboxdialog/chatboxdialog.component';
import { SharedialogComponent } from './sharedialog/sharedialog.component';
import { RejectdialogComponent } from './rejectdialog/rejectdialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { JobdetailsProfile } from '../../models/jobdetailsprofile';
@Component({
  selector: 'app-viewjobdetails-candidate-profile',
  templateUrl: './viewjobdetails-candidate-profile.component.html',
  styleUrls: ['./viewjobdetails-candidate-profile.component.css']
})
export class ViewjobdetailsCandidateProfileComponent implements OnInit {
  viewchatboxdialogueref: MatDialogRef<ChatboxdialogComponent>;
  viewshareddialogueref: MatDialogRef<SharedialogComponent>;
   jobdetailsprofiles: JobdetailsProfile[] = [];

  @Input() jobid: number;
  @Input() statusid: number;
 // @Input() jobdetailsprofiles: JobdetailsProfile[] = [];
  constructor(private router: Router, private jobdetailsservice: JobdetailsService,
    private dialog: MatDialog) { }
  OpenChatboxDialog() {
    const chatboxdialogRef = this.dialog.open(ChatboxdialogComponent,

      {
        data: {
          animal: 'panda'
        }
      }
    );

    chatboxdialogRef.afterClosed().subscribe(result => {
      console.log('Chatbox Dialog result: ${result}');
    });
  }

  OpenShareDialog() {
    const shareddialogRef = this.dialog.open(SharedialogComponent,

      {
        data: {
          animal: 'panda'
        }
      }
    );

    shareddialogRef.afterClosed().subscribe(result => {
      console.log('share Dialog result: ${result}');
    });
  }

  OpenRejectDialog() {
    const rejectdialogRef = this.dialog.open(RejectdialogComponent,

      {
        data: {
          animal: 'panda'
        }
      }
    );

    rejectdialogRef.afterClosed().subscribe(result => {
      console.log('reject Dialog result: ${result}');
    });
  }

  PopulateJobdetailProfiles (jobid, statusid) {
    if (jobid != null && statusid != null) {
      this.jobid = jobid;
      this.statusid = statusid;
    }
    if(this.statusid ===15)
    {
      return this.jobdetailsservice.getJobDetailsSuggestedProfileInfo(this.jobid).subscribe(res => {
        this.jobdetailsprofiles = res;
      });
    }
    else{

    }
    return this.jobdetailsservice.getJobDetailsProfileInfo(this.jobid, this.statusid).subscribe(res => {
      this.jobdetailsprofiles = res;
    });
  }

  CheckDisplay(val) {
    if (val === null ) {
      return 'none';
    }
  }

  ngOnInit() {
    this.PopulateJobdetailProfiles(this.jobid, this.statusid);
    console.log('abc');
  }
  ngOnChange() {
    console.log('on change', this.jobid, this.statusid);
  }
}
