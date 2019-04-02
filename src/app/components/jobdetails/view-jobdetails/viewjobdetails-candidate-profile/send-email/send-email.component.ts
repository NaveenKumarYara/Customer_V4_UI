import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { JobdetailsService } from '../../../jobdetails.service';
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
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private jobdetailsservice: JobdetailsService) { }
subject: string;
body: string;
  ngOnInit() {
  this.body = 'We really appreciate your participation. But unfortunately, your profile has not matched our criteria with few skills. I suggest you to update skills which might enhance your skills.';
  this.subject = 'Need more profiles to get shortlisted';
  }
sendEmail() {
  this.conversation.FullName = this.data.EmailId;
  this.conversation.Subject = this.subject;
  this.conversation.Body = this.body;
  // this.conversation.FromID=
  this.conversation.ToEmailID = this.data.EmailId;
  this.jobdetailsservice.StartConversation(this.conversation).subscribe(data => {
    if (data === 0) {}});
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
