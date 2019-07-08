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
 customercontacts : CustomerContacts[];
  teammemberslist: CustomerUsers[];
  getTeammember: CustomerUsers;
  profileSharing= new ProfileShare();
  customer: any;
  customerId: number;
  UserId:any;
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
    this.clearTeamMemebers();
    this.getcustomerusers();
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
    this.profileSharing.InviteFriendId = 0;
    this.profileSharing.FromuserId = this.customerUser;
    this.profileSharing.ToUserId = this.teammemberslist.map(x => x.UserId).toString();
    //this.profileSharing.ToUserId= parseInt(this.UserId);
    this.profileSharing.ToEmailId = this.teammemberslist.map(x => x.Email).toString();
    this.profileSharing.ApplicationName = 'Arytic';
    this.profileSharing.AppLink = environment.CustomerAppLogin+';Preid='+this.data.ProfileId;
    this.profileSharing.Comments=this.selectedComments;
    if(this.profileSharing.ToEmailId == "")
    {
      this.toastr.error('Please provide the valid details!', 'Oops!');
        setTimeout(() => {
            this.toastr.dismissToast;
        }, 3000);
    }
    else if(this.profileSharing.ToEmailId != "")
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