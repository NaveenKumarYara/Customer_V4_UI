
import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { JobdetailsService } from '../../../jobdetails.service';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
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
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastsManager, private _vcr: ViewContainerRef,private jobdetailsservice: JobdetailsService) { 
    this.toastr.setRootViewContainerRef(_vcr);
  }
subject: string;
ToEmailID:string;
mailbox:any=false;
body: string;
  ngOnInit() {
  this.mailbox = false;
  this.body = 'Join hands with us and make your goals achieved!.';
  this.subject = 'Please submit the consent';
  }
sendEmail() {
  this.conversation.FullName = this.data.firstname + this.data.lastname;
  this.conversation.Subject = this.subject;
  this.conversation.Body = this.body;
  // this.conversation.FromID=
  this.conversation.ToEmailID = this.ToEmailID;
  this.jobdetailsservice.StartConversation(this.conversation).subscribe(data => {
    if (data === 0) {
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
  }
    );
}

EditMail()
{
  this.ToEmailID = this.data.EmailId;
  this.mailbox = true;
}
}

export class StartConversation {
  // userId: number;
  // jobId: number;
  // fullName::string;
  // userName::string;
  // statusId: number;
  // CustFullName::string;
  // CandFullName::string;
  // // AppLink::string;
  // ToEmailId::string;
  // ApplicationName::string;
  // ClientLogo::string;
    FullName: string;
   Subject: string;
 Body: string;
 ToEmailID: string;
 FromID: string;
 ApplicationName: string;
  }
