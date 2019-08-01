import { distinctUntilChanged, debounceTime, switchMap, tap, catchError} from 'rxjs/operators';
import { concat } from 'rxjs/observable/concat';
import { Component, Inject,ViewContainerRef } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { environment } from '../../../../../../environments/environment.prod';
import { Subject } from 'rxjs/Subject';
import { CustomerUsers, PjTechnicalTeam } from '../../../../Postajob/models/jobPostInfo';
import { AppService } from '../../../../../app.service';
import { JobdetailsService } from '../../../jobdetails.service';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import {CustomerContacts} from '../../../../../../models/customercontacts';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { of } from 'rxjs/observable/of';
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
 GetContactsList : contactInfo[];
 customercontacts : CustomerContacts[];
  teammemberslist: CustomerUsers[];
  getTeammember: CustomerUsers;
  profileSharing= new ProfileShare();
  customer: any;
  AddUser:boolean= false;
  customerId: number;
  UserId:any;
  SaveInfo = new contactInfo();
  info:number;
  EmailId:any = null;
  Name:any = null;
  usersloading: boolean;
  customerUser: number;
  selectedUserName = '';
  selectedComments:any;
  userId:number;
  private subscription: Subscription;
  selectedUserInput = new Subject<string>();
  constructor( public dialogRef: MatDialogRef<SharedialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private jobdetailsservice: JobdetailsService,private appService: AppService, private _vcr: ViewContainerRef, private toastr: ToastsManager) { 
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId = this.customer.CustomerId;
    this.customerUser = this.customer.UserId;
  }
 
  ngOnInit() {
    this.GetContacts();
    this.clearTeamMemebers();
    this.getcustomerusers();
    this.AddUser = false;
    this.info = 0;
    //this.GetInterView();
    //this.GetType();
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

   getcustomerusers() {
          this.managersList = concat(
            of([]), // default items
            this.selectedUserInput.pipe(
              debounceTime(200),
              distinctUntilChanged(),
              tap(() => this.usersloading = true),
              switchMap(term => this.appService.getCustomerUsers(this.customerId,  this.customerUser , false, term).pipe(
                catchError(() => of([])), // empty list on error
                tap(() => this.usersloading = false)
              ))
            )
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
      this.profileSharing.AppLink = environment.CustomerAppLogin+';Preid='+this.data.ProfileId+';Id='+this.data.jobId+';Cid='+ this.customerId;
      this.profileSharing.Comments=this.selectedComments;
   }
   if(this.info = 1)
   {
    this.profileSharing.InviteFriendId = 0;
    this.profileSharing.FromuserId = this.customerUser;
    this.profileSharing.ToUserId = "0";
    this.profileSharing.ToEmailId = this.GetContactsList.map(x => x.EmailId).toString();
    this.profileSharing.ApplicationName = 'Arytic';
    this.profileSharing.AppLink = environment.CustomerAppLogin+';Preid='+this.data.ProfileId+';Id='+this.data.jobId+';Cid='+ this.customerId;
    this.profileSharing.Comments=this.selectedComments;
   }
   if(this.profileSharing.ToEmailId == "" && this.profileSharing.Comments == undefined)
   {
     this.toastr.error('Please provide the valid details!', 'Oops!');
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
    this.selectedUserName = ''
    this.getTeammember = new CustomerUsers();
    this.profileSharing= new ProfileShare();
    this.clearTeamMemebers();
    this.selectedComments = "";
    this.EmailId = " ";
    this.toastr.success('Mail sent successfully', 'Success');
    setTimeout(() => {
     this.toastr.dismissToast;
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