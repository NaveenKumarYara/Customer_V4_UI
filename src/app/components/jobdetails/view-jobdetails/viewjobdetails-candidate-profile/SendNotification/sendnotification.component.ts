import { distinctUntilChanged, debounceTime, switchMap, tap, catchError} from 'rxjs/operators';
import { concat } from 'rxjs/observable/concat';
import { Component, Inject,ViewContainerRef } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Subject } from 'rxjs/Subject';
import { CustomerUsers, PjTechnicalTeam } from '../../../../Postajob/models/jobPostInfo';
import { AppService } from '../../../../../app.service';
import { JobdetailsService } from '../../../jobdetails.service';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import {CustomerContacts} from '../../../../../../models/customercontacts';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { of } from 'rxjs/observable/of';
import { SettingsService } from '../../../../../../settings/settings.service';
declare var $: any;
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-sendnotification',
  templateUrl: './sendnotification.component.html',
  styleUrls: ['./sendnotification.component.css']
})
export class sendnotificationdialogComponent {
 managersList: Observable<CustomerUsers[]>;
 teammembers: '';
 loading = false;
 loginstyle(): void {
   this.loading = true;
 }
 GetContactsList : contactInfo[];
 customercontacts : CustomerContacts[];
  teammemberslist: CustomerUsers[];
  savenote = new Notes();
  getTeammember: CustomerUsers;
  profileSharing= new ProfileShare();
  customer: any;
  AddUser:boolean= false;
  customerId: number;
  UserId:any;
  checkemail:any;
  matching:any;
  SaveInfo = new contactInfo();
  info:number;
  EmailId:any = null;
  Name:any = null;
  PStatus:any;
  usersloading: boolean;
  customerUser: number;
  selectedUserName :number;
  selectedComments:any;
  userId:number;
  private subscription: Subscription;
  selectedUserInput = new Subject<string>();
  constructor( public dialogRef: MatDialogRef<sendnotificationdialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private jobdetailsservice: JobdetailsService,private appService: AppService, private _vcr: ViewContainerRef, private toastr: ToastsManager, private settingsService: SettingsService) { 
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId = this.customer.CustomerId;
    this.customerUser = this.customer.UserId;
    this.matching= this.data.Matching;
    this.checkemail=this.data.Email;
    if(this.data.StatusId===4)
    {
      this.PStatus = 'Applied';
    }
    if(this.data.StatusId===5)
    {
      this.PStatus = 'ShortListed';
    }
    if(this.data.StatusId==6)
    {
      this.PStatus = 'Rejected';
    }
    if(this.data.StatusId===7)
    {
      this.PStatus = 'Scheduled Interview';
    }
    if(this.data.StatusId===8)
    {
      this.PStatus = 'Screening';
    }
    if(this.data.StatusId===9)
    {
      this.PStatus = 'WithDrawn';
    }
    if(this.data.StatusId===11)
    {
      this.PStatus = 'Hire';
    }
    if(this.data.StatusId===13)
    {
      this.PStatus = 'Uploaded';
    }
    if(this.data.StatusId===14)
    {
      this.PStatus = 'Waiting for response';
    }
  }
 
  ngOnInit() {
    this.GetContacts();
    this.clearTeamMemebers();
    this.getcustomerusers();
    this.AddUser = false;
    this.info = 0;
    this.checkemail=this.data.Email;
    //this.GetInterView();
    //this.GetType();
    if(this.data.StatusId===4)
    {
      this.PStatus = 'Applied';
    }
    if(this.data.StatusId===5)
    {
      this.PStatus = 'ShortListed';
    }
    if(this.data.StatusId==6)
    {
      this.PStatus = 'Rejected';
    }
    if(this.data.StatusId===7)
    {
      this.PStatus = 'Scheduled Interview';
    }
    if(this.data.StatusId===8)
    {
      this.PStatus = 'Screening';
    }
    if(this.data.StatusId===9)
    {
      this.PStatus = 'WithDrawn';
    }
    if(this.data.StatusId===11)
    {
      this.PStatus = 'Hire';
    }
    if(this.data.StatusId===13)
    {
      this.PStatus = 'Uploaded';
    }
    if(this.data.StatusId===14)
    {
      this.PStatus = 'Waiting for response';
    }
    this.teammemberslist = this.appService.getTeammembers();
    this.subscription = this.appService.teammembersChanged
      .subscribe(
      (teammemberlist: CustomerUsers[]) => {
        this.teammemberslist = teammemberlist;
        }
      );
  }

onItemDeleted(index){ 
    this.GetContactsList.splice(index, 1); 
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

  GetContacts()
  {
    return this.appService.GetContactInfo(this.customerId,0).subscribe(res => {
      this.GetContactsList = res;
    });
  }

  AddContacts()
  {
    if((this.Name == undefined && this.EmailId == undefined)|| (this.Name == '' && this.EmailId == ''))
    {
      this.toastr.error('Please provide the valid details!', 'Oops!');
        setTimeout(() => {
            this.toastr.dismissToast;
        }, 3000);
    }
    else
    {
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
         this.EmailId= '';
         this.GetContacts();
        }, 3000);  
      
    })
  }
  }

  teamchange(val,inf)
  {
  this.AddUser= val;
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

        
getcustomerusers()
 {
   return this.appService.getCustomerContacts(this.customerId).subscribe(res => {
     //this.customercontacts = res;

       this.customercontacts =  res.filter((i) => { 

          if(i.FirstName !="Invited"  && i.FirstName != this.customer.FirstName)
          {
            return i.FirstName=i.FirstName + ' ' + i.LastName + ' - ' + i.RoleName; 
          }                      
         })
      });
 }

 SaveNotes()
{
 this.savenote.ProfileId=this.data.ProfileId;
 this.savenote.JobId = this.data.jobId;
 this.savenote.customerUserId = this.customerUser;
 if(this.info===0)
 {
  this.savenote.toUserId = this.teammemberslist.map(x => x.UserId).toString() +','+this.customerUser.toString();
  this.savenote.isCandidate=false;
 }
 else
 {
  this.savenote.toUserId=this.data.CUserId.toString()+','+this.customerUser.toString(); 
  this.savenote.isCandidate=true;
 }
 this.savenote.Comments=this.selectedComments;
 this.savenote.statusId = this.data.StatusId;
 this.jobdetailsservice.SaveProfileNote(this.savenote)
 .subscribe(
 status => {
  this.teammemberslist = [];
  $('#teamMbr').val('');
  //this.selectedUserName = ''
  this.getTeammember = new CustomerUsers();
  this.clearTeamMemebers();
  this.selectedComments = "";
  this.EmailId = " ";
  this.toastr.success('Sent successfully', 'Success');
  setTimeout(() => {
   this.toastr.dismissToast;
   //this.SaveNotes(this.selectedComments);
   this.dialogRef.close();
  }, 3000);   
 }                
 );
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
  teamExists(team, list)
   {
    return list.some(function(elem) {
         return elem.UserId === team.UserId;
    });
 }
 ShareProfile() {
   if(this.info = 0)
  {
      this.profileSharing.InviteFriendId = 0;
      this.profileSharing.FromuserId = this.customerUser;
      this.profileSharing.ToUserId = this.teammemberslist.map(x => x.UserId).toString();
      this.profileSharing.ToEmailId = this.teammemberslist.map(x => x.Email).toString();
      this.profileSharing.ApplicationName = 'Arytic';
      this.profileSharing.AppLink = this.settingsService.settings.CustomerAppLogin+';Preid='+this.data.ProfileId+';Id='+this.data.jobId+';Cid='+ this.customerId;
      this.profileSharing.Comments=this.selectedComments;
   }
   if(this.info = 1)
   {
    this.profileSharing.InviteFriendId = 0;
    this.profileSharing.FromuserId = this.customerUser;
    this.profileSharing.ToUserId = this.data.CUserId;
    this.profileSharing.ToEmailId = this.data.Email;
    this.profileSharing.ApplicationName = 'Arytic';
    this.profileSharing.AppLink = this.settingsService.settings.CandidateAppLogin;
    this.profileSharing.Comments=this.selectedComments;
   }
   if(this.profileSharing.ToEmailId == "" && this.profileSharing.Comments == undefined)
   {
     this.toastr.error('Please provide the valid details!', 'Oops!');
       setTimeout(() => {
           this.toastr.dismissToast;
       }, 3000);
   }
   else if(this.profileSharing.Comments == undefined)
   {
     this.toastr.error('Please provide Comments!', 'Oops!');
       setTimeout(() => {
           this.toastr.dismissToast;
       }, 3000);
   }
   if(this.profileSharing.ToEmailId != "" && this.profileSharing.Comments != "")
    {
   this.jobdetailsservice.ProfileShareInvite(this.profileSharing).subscribe(data => {
   if (data === 0) {
    //this.inviteform.reset();
    this.teammemberslist = [];
    $('#teamMbr').val('');
    //this.selectedUserName = ''
    this.getTeammember = new CustomerUsers();
    this.profileSharing= new ProfileShare();
    this.clearTeamMemebers();
    this.selectedComments = "";
    this.EmailId = " ";
    this.toastr.success('Sent successfully', 'Success');
    setTimeout(() => {
     this.toastr.dismissToast;
     //this.SaveNotes(this.selectedComments);
     this.dialogRef.close();
    }, 3000);      
     }
   }, error => {
        console.log('error:', JSON.stringify(error));
       });
    }
  }
 }
  
 


export class ProfileShare {
  InviteFriendId : number;
  FromuserId: number;
  ToUserId: string;
  Comments:string;
  AppLink: string;
  ToEmailId: string;
  FromEmailId:string;
  ApplicationName:string;
  readonly modules: ReadonlyArray<{}> = []
}

export class contactInfo
{
  Infoid :number;
  CustomerId: number;
  UserId: number;
  Fullname: string;
  EmailId: string;
}

export class Notes{
  public ProfileId :Number
  public JobId :Number
  public customerUserId:Number
  public statusId :Number
  public toUserId :string
  public isCandidate:boolean
  public Comments :string
}