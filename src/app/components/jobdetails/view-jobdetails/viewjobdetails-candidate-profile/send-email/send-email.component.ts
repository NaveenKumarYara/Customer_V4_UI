
import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { ApiService } from '../../../../../shared/services/api.service/api.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { JobdetailsService } from '../../../jobdetails.service';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import { SettingsService } from '../../../../../../settings/settings.service';
import { NgxSpinnerService } from 'ngx-spinner';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css'],
  providers: [ApiService]
})
export class SendEmailComponent implements OnInit {
conversation = new  StartConversation();
emailUpdate = new  EmailUpdateStatus();
subject: string;
ToEmailID: string;
mailbox: any = false;
isPublicAvailable:any;
checkvalue:any;
UserId:any;
UserRoleId:any;
body: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _service: ApiService,public dialogRef: MatDialogRef<SendEmailComponent>,private toastr: ToastsManager, private spinner: NgxSpinnerService, private _vcr: ViewContainerRef, private jobdetailsservice: JobdetailsService, private settingsService: SettingsService) {
    this.toastr.setRootViewContainerRef(_vcr);
    this.emailUpdate.JobId = data.jobId;
    this.emailUpdate.JobResponseId =  data.jobResponseId;
    this.emailUpdate.ProfileId = data.profileId;
    this.emailUpdate.ResponseStatusId = data.responseStatusId;
    this.mailbox = false;
    this.body = 'Join hands with us and make your goals achieved!.';
    this.subject = 'Please submit the consent';
    this.ToEmailID = this.data.EmailId;
    this.Check();
    this.UserCheck(this.data.ProfileId);
  }

  ngOnInit() {

  }


 UserCheck(ProfileId)
 {
  this._service.GetService('IdentityAPI/api/GetCandidateUserRoleByProfileId?profileId=', this.data.profileId).subscribe(
    res => {     
      this.UserRoleId = res.UserRoleId;
      this.UserId = res.UserId;
    });
 }

  sendEmail() {

    this.spinner.show();
    this.conversation.FullName = this.data.firstname + this.data.lastname;
    this.conversation.Subject = this.subject;
    this.conversation.Body = this.body;
    // if(){

      if(this.data.profileUpload === false)
      {
          if(this.UserRoleId === 5 && this.UserId >0)
          {
            this.conversation.AppLink = this.settingsService.settings.CandidateLogin + ';lid=' + this.data.ccpid ;
          }
          else
          {
            this.conversation.AppLink = this.settingsService.settings.CandidateSignUp + ';sid=' + this.data.ccpid;
          }     
      }
      if(this.data.profileUpload === true)
      {
        if(this.UserRoleId === 2 && this.UserId >0)
        {
          this.conversation.AppLink = this.settingsService.settings.CandidateLogin + ';lid=' + this.data.ccpid ;
        }
        else
        {
          this.conversation.AppLink = this.settingsService.settings.CandidateSignUp + ';Cid=' + this.data.CustomerId +';sid=' + this.data.ccpid;
        }        
      }

    this.conversation.UserCheck = this.data.userId > 0 ? 'Login' :  'Yes I will Join';
    // }
    this.conversation.ToEmailID = this.ToEmailID;
    this.jobdetailsservice.StartConversation(this.conversation).subscribe(data => {

      if (data === 0) {
          this.jobdetailsservice.UpdateStatusOnEmailConversation(this.emailUpdate).subscribe(data1 => {
        });

        this.spinner.hide();
        this.toastr.success('Mail Sent', 'Success');
        setTimeout(() => {
        this.toastr.dismissToast;

        this.dialogRef.close();
    }, 3000);  
        this.conversation.FullName = '';
        this.conversation.Subject = '';
        this.conversation.Body = '';
        this.conversation.ToEmailID = '';
        this.mailbox = false;
    }
  });
  

}

Check()
{
  this._service.GetService('ProfileAPI/api/GetProfileStatus?profileId=', this.data.profileId).subscribe(
    data => {
      let apiData = data;       
      this.isPublicAvailable = apiData.isPublicAvailable;
    });
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
