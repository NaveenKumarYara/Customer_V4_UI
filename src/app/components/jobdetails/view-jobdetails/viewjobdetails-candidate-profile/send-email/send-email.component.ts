
import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { JobdetailsService } from '../../../jobdetails.service';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import { environment } from '../../../../../../environments/environment.prod';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {
conversation = new  StartConversation();
emailUpdate = new  EmailUpdateStatus();
subject: string;
ToEmailID: string;
mailbox: any = false;
body: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastsManager, private _vcr: ViewContainerRef, private jobdetailsservice: JobdetailsService) {
    this.toastr.setRootViewContainerRef(_vcr);
    this.emailUpdate.JobId = data.jobId;
    this.emailUpdate.JobResponseId =  data.jobResponseId;
    this.emailUpdate.ProfileId = data.profileId;
    this.emailUpdate.ResponseStatusId = data.responseStatusId;
    this.mailbox = false;
    this.body = 'Join hands with us and make your goals achieved!.';
    this.subject = 'Please submit the consent';
    this.ToEmailID = this.data.EmailId;
  }

  ngOnInit() {

  }
  sendEmail() {
    if (this.data.ccpid != null) {
    this.conversation.FullName = this.data.firstname + this.data.lastname;
    this.conversation.Subject = this.subject;
    this.conversation.Body = this.body;
    // if(){
    this.conversation.AppLink = this.data.userId > 0  ? environment.CandidateLogin + ';lid=' + this.data.ccpid :
    this.conversation.UserCheck = this.data.userId > 0 ? 'Login' :  'Yes I will Join';
    environment.CandidateSignUp + ';sid=' + this.data.ccpid;
    // }
    this.conversation.ToEmailID = this.ToEmailID;
    this.jobdetailsservice.StartConversation(this.conversation).subscribe(data => {
      if (data === 0) {
          this.jobdetailsservice.UpdateStatusOnEmailConversation(this.emailUpdate).subscribe(data1 => {
        });
        this.toastr.success('Mail Sent', 'Success');
        setTimeout(() => {
        this.toastr.dismissToast;
    }, 3000);
        this.conversation.FullName = '';
        this.conversation.Subject = '';
        this.conversation.Body = '';
        this.conversation.ToEmailID = '';
        this.mailbox = false;
    }
  });
} else {
  this.toastr.warning('User has applied for this job ', 'Mail not sent');
  setTimeout(() => {
  this.toastr.dismissToast;
}, 3000);
}
}

  EditMail() {
    this.ToEmailID = this.data.EmailId;
    this.mailbox = true;
  }
}

export class StartConversation {
  FullName: string;
  Subject: string;
  Body: string;
  ToEmailID: string;
  FromID: string;
  ApplicationName: string;
  AppLink: string;
  UserCheck: string;
}
export class EmailUpdateStatus {
  JobResponseId: number;
  ProfileId: number;
  JobId: number;
  ResumeId: number;
  ResponseStatusId: number;
}
