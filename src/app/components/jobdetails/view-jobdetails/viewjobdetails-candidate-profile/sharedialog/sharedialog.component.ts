import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { concat } from 'rxjs/observable/concat';
import { Component, Inject, Input, ViewContainerRef } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Subject } from 'rxjs/Subject';
import { CustomerUsers, PjTechnicalTeam } from '../../../../Postajob/models/jobPostInfo';
import { AppService } from '../../../../../app.service';
import { JobdetailsService } from '../../../jobdetails.service';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { CustomerContacts } from '../../../../../../models/customercontacts';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { of } from 'rxjs/observable/of';
import { SettingsService } from '../../../../../../settings/settings.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../../../shared/services';
declare var $: any;
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-sharedialog',
  templateUrl: './sharedialog.component.html',
  styleUrls: ['./sharedialog.component.css']
})
export class SharedialogComponent {
  managersList: Observable<CustomerUsers[]>;
  teammembers: '';
  GetContactsList: contactInfo[];
  customercontacts: CustomerContacts[];
  teammemberslist: CustomerUsers[];
  whatsapp: any;
  whatsappform: FormGroup;
  inviteform: FormGroup;
  getTeammember: CustomerUsers;
  profileSharing = new ProfileShare();
  customer: any;
  AddUser: boolean = false;
  customerId: number;
  UserId: any;
  SaveInfo = new contactInfo();
  info: number;
  EmailId: any = null;
  Name: any = null;
  usersloading: boolean;
  customerUser: number;
  @Input() shareUrl: string;
  navUrl: string;
  selectedUserName: number;
  selectedComments: any;
  userId: number;
  type:string;
  private subscription: Subscription;
  selectedUserInput = new Subject<string>();
  isSharingStarted: boolean;
  arr: any=[];
  constructor(public dialogRef: MatDialogRef<SharedialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private _service: ApiService,private fb: FormBuilder,private jobdetailsservice: JobdetailsService, private appService: AppService, private _vcr: ViewContainerRef, private toastr: ToastsManager, private settingsService: SettingsService) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId = this.customer.CustomerId;
    this.customerUser = this.customer.UserId;
  }

  ngOnInit() {
    this.GetProfileCard();
    this.GetContacts();
    this.clearTeamMemebers();
    this.getcustomerusers();
    this.AddUser = false;
    this.info = 0;
    this.shareUrl=this.settingsService.settings.CustomerAppprofile + ';Preid=' + this.data.ProfileId + ';Id=' + this.data.jobId + ';Cid=' + this.customerId;
    //this.GetInterView();
    //this.GetType();
    this.whatsappform = this.fb.group({
      'mobilenumber': ['', Validators.compose([Validators.required, Validators.minLength(10)])],
    });
    this.inviteform = this.fb.group({
      'inviteEmail'   : ['', Validators.compose([Validators.required, this.commaSepEmail])],
    });
    this.teammemberslist = this.appService.getTeammembers();
    this.subscription = this.appService.teammembersChanged
      .subscribe(
        (teammemberlist: CustomerUsers[]) => {
          this.teammemberslist = teammemberlist;
        }
      );
  }

 GetProfileCard()
 {
  
  return this._service.GetService('IdentityAPI/api/GetSmartCard?jobId='+  this.data.jobId + '&profileId=',this.data.ProfileId)
  .subscribe(res => {
         this.profileSharing.Image = res;
  });
 }

  copyToClipboard() {
    // var copyText = <HTMLInputElement>document.querySelector('.rjobLink');
    // copyText.select();
    // document.execCommand('Copy');
    // alert('copied');
    let element = $('#nbtnCpy');
    let inputGroup = element.closest('.input-group');
    let input = inputGroup.find('.text-to-copy');
    let inputValue = inputGroup.find('.text-to-copy').val();

    let msg = inputGroup.next('.copied');

    if (inputValue.length > 0 && inputValue !== 'undefined') {
        input.select();
        document.execCommand('copy');
        element.find('span').text('Copied!');
        msg.addClass('show');
    }

    if (msg.hasClass('show')) {
        setTimeout(function () {
            msg.removeClass('show');
        }, 1500);
    }
}

  onItemDeleted(index) {
    this.GetContactsList.splice(index, 1);
  }

  public share(val) {
    this.type = val;
    this.createNavigationUrl();
    this.dialogRef.close();
    return window.open(this.navUrl, "_blank");

  }

  WhatsappShare() {
    let url = 'https://wa.me/' + this.whatsappform.value.mobilenumber + '?text=' +    this.settingsService.settings.CustomerAppprofile + ';Preid=' + this.data.ProfileId + ';Id=' + this.data.jobId + ';Cid=' + this.customerId;
    window.open(url, '_blank');
    this.toastr.success('Successfully shared', 'Success!!');
    this.whatsapp = undefined;
    $("#Whatsapp").Modal('hide');
    this.whatsappform.reset();
  }

  // DeleteContactInfo(Id)
  // {
  //   return this.appService.DeleteShareContactInfo(Id).subscribe(res => {
  //     if(res == 0)
  //     {
  //       this.GetContacts();
  //     }    
  //   });
  // }

  GetContacts() {
    return this.appService.GetContactInfo(this.customerId, 0).subscribe(res => {
      this.GetContactsList = res;
    });
  }

  AddContacts() {
    if ((this.Name == undefined && this.EmailId == undefined) || (this.Name == '' && this.EmailId == '')) {
      this.toastr.error('Please provide the valid details!', 'Oops!');
      setTimeout(() => {
        this.toastr.dismissToast;
      }, 3000);
    }
    else {
      this.SaveInfo.Infoid = 0;
      this.SaveInfo.CustomerId = this.customerId;
      this.SaveInfo.UserId = this.userId;
      this.SaveInfo.Fullname = this.Name;
      this.SaveInfo.EmailId = this.EmailId;
      this.appService.AddContactInfo(this.SaveInfo).subscribe(res => {
        this.toastr.success('Added successfully', 'Success');
        setTimeout(() => {
          this.toastr.dismissToast;
          this.Name = '';
          this.EmailId = '';
          this.GetContacts();
        }, 3000);

      })
    }
  }

  teamchange(val, inf) {
    this.AddUser = val;
    this.info = inf;
  }

  //  getcustomerusers() {
  //         this.managersList = concat(
  //           of([]), // default items
  //           this.selectedUserInput.pipe(
  //             debounceTime(200),
  //             distinctUntilChanged(),
  //             tap(() => this.usersloading = true),
  //             switchMap(term => this.appService.getCustomerUsers(this.customerId,  this.customerUser , false, term).pipe(
  //               catchError(() => of([])), // empty list on error
  //               tap(() => this.usersloading = false)
  //             ))
  //           )
  //         );
  //       }


  getcustomerusers() {
    return this.appService.getCustomerContacts(this.customerId).subscribe(res => {
      this.customercontacts = res;
      this.customercontacts = this.customercontacts.filter(
        name => name.FirstName != "Invited" && name.IsRemove === false);
    });
  }

  private createNavigationUrl() {
    let searchParams = new URLSearchParams();
    this.shareUrl=this.settingsService.settings.CustomerAppprofile + ';Preid=' + this.data.ProfileId + ';Id=' + this.data.jobId + ';Cid=' + this.customerId;
    switch(this.type) {
      case 'facebook':
        searchParams.set('u', this.shareUrl);
        this.navUrl = 'https://www.facebook.com/sharer/sharer.php?' + searchParams;
        break;
      case 'linkedin':
          searchParams.set('url', this.shareUrl);
          this.navUrl =  'https://www.linkedin.com/sharing/share-offsite/?url=' + searchParams;
          break;
      case 'twitter':
        searchParams.set('url', this.shareUrl);
        this.navUrl =  'https://twitter.com/share?' + searchParams;
        break;
    }
  }

  changeTeam(val) {
    this.getTeammember = val;
  }

  clearTeamMemebers() {
    for (let i = 0; i <= 10; i++) {
      const index = i;
      this.appService.deleteTeammember(index);
    }
    this.deleteTeammember(0);
  }
  public addTeammembers() {
    // const newDomain = new CustomerUsers();
    // newDomain.FirstName = this.selectedUserName;
    if (this.getTeammember !== undefined) {
      const check = this.teamExists(this.getTeammember, this.teammemberslist);
      if (check === false) {
        this.appService.addTeammember(this.getTeammember);
      }
      // this.selectedUserName = '';
      $('#teamMbr').val('');
    }
  }
  private deleteTeammember(index: number) {
    this.appService.deleteTeammember(index);
  }
  teamExists(team, list) {
    return list.some(function (elem) {
      return elem.UserId === team.UserId;
    });
  }

  Whatsapp() {
    this.whatsapp = undefined;
    this.whatsappform.reset();
  }

  commaSepEmail = (control: AbstractControl): { [key: string]: any } | null => {
    const emails = control.value.split(',');
    const forbidden = emails.some(email => Validators.email(new FormControl(email)));
    console.log(forbidden);
    return forbidden ? { 'inviteEmail': { value: control.value } } : null;
  };

  
  ShareProfile() {
    this.isSharingStarted = true;
    this.profileSharing.FromUser = this.customer.FirstName +' ' + this.customer.LastName;
    if (this.info = 0) {
      this.profileSharing.InviteFriendId = 0;
      this.profileSharing.FromuserId = this.customerUser;
      this.profileSharing.ToUserId = this.teammemberslist.map(x => x.UserId).toString();
      this.profileSharing.ToEmailId = this.teammemberslist.map(x => x.Email).toString();
      this.profileSharing.ApplicationName = 'Arytic';
      this.profileSharing.AppLink = this.settingsService.settings.CustomerAppLogin + ';Preid=' + this.data.ProfileId + ';Id=' + this.data.jobId + ';Cid=' + this.customerId;
      this.profileSharing.Comments = this.selectedComments;
    }
    if (this.info = 1) {
      this.profileSharing.InviteFriendId = 0;
      this.profileSharing.FromuserId = this.customerUser;
      this.profileSharing.ToUserId = "0";
      this.profileSharing.ToEmailId = this.EmailId;
      this.profileSharing.ApplicationName = 'Arytic';
      this.profileSharing.AppLink = this.settingsService.settings.CustomerAppprofile + ';Preid=' + this.data.ProfileId + ';Id=' + this.data.jobId + ';Cid=' + this.customerId;
      this.profileSharing.Comments = this.selectedComments!=null?this.selectedComments:'Please review the profile shared to you';
    }
    if (this.profileSharing.ToEmailId == "" && this.profileSharing.Comments == undefined) {
      this.toastr.error('Please provide the valid details!', 'Oops!');
      setTimeout(() => {
        this.toastr.dismissToast;
      }, 3000);
    }
    else if (this.profileSharing.Comments == undefined) {
      this.toastr.error('Please provide Comments!', 'Oops!');
      setTimeout(() => {
        this.toastr.dismissToast;
      }, 3000);
    }
    if (this.profileSharing.ToEmailId != "" && this.profileSharing.Comments != "") {
      if(this.info = 1 )
      {
        this.arr =this.inviteform.value.inviteEmail.split(',');
        this.arr.forEach(element => {
          this.profileSharing.ToEmailId = element;
          debugger
        this.jobdetailsservice.ProfileShareInvite(this.profileSharing).subscribe(data => {
          if (data === 0) {
            //this.inviteform.reset();
            this.teammemberslist = [];
            $('#teamMbr').val('');
            //this.selectedUserName = ''
            this.getTeammember = new CustomerUsers();
            this.profileSharing = new ProfileShare();
            this.clearTeamMemebers();
            this.selectedComments = "";
            this.EmailId = " ";
            this.isSharingStarted = false;
            this.dialogRef.close();
            this.toastr.success('Mail sent successfully', 'Success');
            setTimeout(() => {
              this.toastr.dismissToast;
            }, 3000);
          }
        }, error => {
          this.isSharingStarted = false;
          console.log('error:', JSON.stringify(error));
        });
      });
      }
      else
      {
        this.jobdetailsservice.ProfileShareInvite(this.profileSharing).subscribe(data => {
          if (data === 0) {
            //this.inviteform.reset();
            this.teammemberslist = [];
            $('#teamMbr').val('');
            //this.selectedUserName = ''
            this.getTeammember = new CustomerUsers();
            this.profileSharing = new ProfileShare();
            this.clearTeamMemebers();
            this.selectedComments = "";
            this.EmailId = " ";
            this.isSharingStarted = false;
            this.dialogRef.close();
            this.toastr.success('Mail sent successfully', 'Success');
            setTimeout(() => {
              this.toastr.dismissToast;
            }, 3000);
          }
        }, error => {
          this.isSharingStarted = false;
          console.log('error:', JSON.stringify(error));
        });

      }
 
    }
  }
}





export class ProfileShare {
  InviteFriendId: number;
  FromuserId: number;
  ToUserId: string;
  Comments: string;
  AppLink: string;
  ToEmailId: string;
  FromEmailId: string;
  FromUser:string;
  Image:string;
  ApplicationName: string;
  readonly modules: ReadonlyArray<{}> = []
}

export class contactInfo {
  Infoid: number;
  CustomerId: number;
  UserId: number;
  Fullname: string;
  EmailId: string;
}