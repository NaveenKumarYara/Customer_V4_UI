import { distinctUntilChanged, debounceTime, switchMap, tap, catchError} from 'rxjs/operators';
import { concat } from 'rxjs/observable/concat';
import { Component, Inject,ViewContainerRef } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { environment } from '../../../../../environments/environment.prod';
import { Subject } from 'rxjs/Subject';
import { CustomerUsers, PjTechnicalTeam } from '../../../Postajob/models/jobPostInfo';
import { AppService } from '../../../../app.service';
import { JobdetailsService } from '../../jobdetails.service';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import {CustomerContacts} from '../../../../../models/customercontacts';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { of } from 'rxjs/observable/of';
import { forEach } from '@angular/router/src/utils/collection';
declare var $: any;
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-sharejob',
  templateUrl: './sharejob.component.html',
  styleUrls: ['./sharejob.component.css']
})
export class ShareJobComponent {
 managersList: Observable<CustomerUsers[]>;
 teammembers: '';

 customercontacts : CustomerContacts[];
  teammemberslist: CustomerUsers[];
  getTeammember: CustomerUsers;
  userIds : any;
  emaiIds : any;
  Sharing= new JobShare();
  customer: any;
  AddUser:boolean= false;
  customerId: number;
  UserId:any;
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
  constructor( public dialogRef: MatDialogRef<ShareJobComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private jobdetailsservice: JobdetailsService,private appService: AppService, private _vcr: ViewContainerRef, private toastr: ToastsManager) { 
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId = this.customer.CustomerId;
    this.customerUser = this.customer.UserId;
    this.toastr.setRootViewContainerRef(_vcr);
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



  // DeleteContactInfo(Id)
  // {
  //   return this.appService.DeleteShareContactInfo(Id).subscribe(res => {
  //     if(res == 0)
  //     {
  //       this.GetContacts();
  //     }    
  //   });
  // }






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
 ShareJob() { 
            this.Sharing.ShareId = 0;
            this.Sharing.FromuserId = this.customerUser;
            this.Sharing.CustomerId = this.customerId;
            this.Sharing.ToUserId = this.teammemberslist.map(x => x.UserId).toString();
            this.Sharing.ToEmailID = this.teammemberslist.map(x => x.Email).toString();
            this.Sharing.JobId = this.data.JobId;
            this.Sharing.FromEmail = this.customer.Email;
            this.Sharing.ToUserName =this.teammemberslist.map(x => x.FirstName).toString();
            this.Sharing.AppLink = environment.CustomerAppLogin+';JobId='+this.data.JobId+';CId='+ this.customerId;
            this.Sharing.Comments = this.selectedComments;
            if(this.Sharing.ToEmailID == "" && this.Sharing.Comments == undefined)
            {
              this.toastr.error('Please provide the valid details!', 'Oops!');
                setTimeout(() => {
                    this.toastr.dismissToast;
                }, 3000);
            }
            if(this.Sharing.ToEmailID!= "" && this.Sharing.Comments != "")
            {
            this.jobdetailsservice.JobShareInvite(this.Sharing).subscribe(data => {
            if (data === 0) {
             //this.inviteform.reset();
             this.teammemberslist = [];
             $('#teamMbr').val('');
             this.selectedUserName = ''
             this.getTeammember = new CustomerUsers();
             this.Sharing= new JobShare();
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
  
 


export class JobShare {
  ShareId : number;
  FromuserId: number;
  CustomerId:number;
  ToUserId:string;
  ToEmailID: string;
  JobId :number;
  AppLink: string;
  Comments:string;
  ToUserName:string;
  FromEmail:string;
  readonly modules: ReadonlyArray<{}> = []
}

