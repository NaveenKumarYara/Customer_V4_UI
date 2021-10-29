import { Component, OnInit, Inject, OnDestroy, ViewChild ,ViewContainerRef} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { FormControl } from '@angular/forms';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import { AppService } from '../../../../app.service';
import { Subscription } from 'rxjs/Subscription';
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { CustomerUsers, PjTechnicalTeam } from '../../models/jobPostInfo';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../../../../shared/services/api.service/api.service';
declare var $: any;
@Component({
  selector: 'app-steps-step3-teammembers',
  templateUrl: './teammembers.component.html'
})

export class TeammembersComponent implements OnInit, OnDestroy {
@ViewChild('teamForm') teamForm: any;
  private subscription: Subscription;
  teammembers: '';
  teammemberslist: CustomerUsers[];
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$";
  customer: any;
  show : any = false;
  flag : any = false;
  Value: number;
  Forgotform: any;
  result :any;
  customerId: any;
  userId: any;
  JobIds:any=[];
  job = new SendNoteEmail();
  addedteammembers: '';
  addedteammemberslist: PjTechnicalTeam[];
  Addform: FormGroup;
  selectedUserInput = new Subject<string>();
  usersloading: boolean;
  selectedUserName :string;
  slist=[];
  managersList:CustomerUsers[]=[];
  // completeMembersList: CustomerUsers[];
  getTeammember: CustomerUsers;
  constructor(private route: ActivatedRoute, private fb: FormBuilder,private _service:ApiService, private toastr: ToastsManager, private _vcr: ViewContainerRef,
    private router: Router, private appService: AppService) {
      this.customer = JSON.parse(sessionStorage.getItem('userData'));
      this.customerId = this.customer.CustomerId;
      this.userId = this.customer.UserId;
      //this.toastr.setRootViewContainerRef(_vcr);
  }
  changeTeam(val) {
    this.getTeammember = val;
    //this.GetJobAssigned();
  }
  public addTeammembers() {
    // const newDomain = new CustomerUsers();
    // newDomain.FirstName = this.selectedUserName;
    if(this.getTeammember.FirstName!=undefined)
    {
      this.appService.addTeammember(this.getTeammember);
      //this.slist.push(this.selectedManager);
     // this.teammemberslist=this.slist;
      this.selectedUserName=null;
      this.flag=false;
     //this.appService.teammembers=this.teammemberslist;
    }


  }
  teamExists(team, list) {​
    return list.some(function(elem) {
         return elem.UserId === team.UserId;
    });
 }
  private deleteTeammember(index: number) {
    this.appService.deleteTeammember(index);
  }
  getcustomerusers() {
    return this.appService.getTechinicalTeam(this.customerId).subscribe(res =>{
      this.managersList= res;
      this.managersList = this.managersList.filter((i) => {
        if(i.FirstName !="Invited"   && i.IsRemove!=true)
{
  return i.FirstName=i.FirstName + ' ' + i.LastName + ' - ' + i.RoleName; 
}                      
});
    });
  }

  GetJobAssigned()
  {
    this.JobIds = this.appService.JobIds;
    if(this.JobIds&&this.JobIds.length>0)
    {
      this.JobIds.forEach((e)=>
      {
    this.teammemberslist.forEach(y=>{
      this._service.GetService('IdentityAPI/api/GetJobAssigned?userId=', y.UserId + '&jobId=' + e.jobId)
      .subscribe(
        dat => {
          this.managersList.filter(z=>{
          if(z.UserId == y.UserId)
          {
            this.job.ToEmailID = z.Email
          }
          });
         this.job.FullName = dat.FirstName+dat.LastName;
         this.job.Body = dat.FirstName + dat.LastName + ' Assigned  @' + dat.JobTitle +  '  position for you go through the details!';
         this._service.PostService(this.job,'EmailApi/api/EmailForAssignJob').subscribe(
          check=>
          {
                  this.job = new SendNoteEmail();                 
          }
        )
        });
    })
    })
   }
   if(this.JobIds.length == 0 )

   {
    const res = localStorage.getItem('jobId');
    this.teammemberslist.forEach(y=>{
      this._service.GetService('IdentityAPI/api/GetJobAssigned?userId=', y.UserId + '&jobId=' + res)
      .subscribe(
        dat => {
          this.managersList.filter(z=>{
          if(z.UserId == y.UserId)
          {
            this.job.ToEmailID = z.Email
          }
          });
         this.job.FullName = dat.FirstName+dat.LastName;
         this.job.Body = dat.FirstName + dat.LastName + ' Assigned  @' + dat.JobTitle +  '  position for you go through the details!';
         this._service.PostService(this.job,'EmailApi/api/EmailForAssignJob').subscribe(
          check=>
          {
                  this.job = new SendNoteEmail();                 
          }
        )
        });
    })
   }
  }
  PopulateRoles(val)
  {
   this.Value= val;
  }
  ResetUser()
  {
    this.show = false;
    this.Addform.reset();            
  }

  SaveUser()
  {
    if(this.Addform.invalid)
    {
      this.Addform.controls['FirstName'].markAsTouched()
      this.Addform.controls['LastName'].markAsTouched()
      this.Addform.controls['ContactEmail'].markAsTouched()
      this.toastr.error('Please provide the valid details!', 'Oops!');
        setTimeout(() => {
            this.toastr.dismissToast;
        }, 3000);
    }
    else if(this.result.UserId>0)
    {  
      this.show = true;    
    }
    else if(this.result.UserId==0)
    {
      this.Addform.value.UserId = 0;
      this.Addform.value.CustomerId = this.customerId;
      this.Addform.value.Password = 123456;
      this.Addform.value.UserRoleId = "9";
      this.Addform.value.IsActive = true;
        this.appService.addCustomerUser(this.Addform.value)
        .subscribe(
        data => {         
        if(data>0)
        {   
        this.Forgotform.value.EmailId = this.Addform.value.ContactEmail;
        this.appService.ActivateCustomerUser(this.Forgotform.value)
        .subscribe(
        data1 => {
           this.toastr.success('Please check your email to reset the password','Success');
           setTimeout(() => { 
            this.Addform.reset();  
            this.selectedUserName=undefined;  
            //this.flag=false;       
            this.toastr.dismissToast;                   
            this.getcustomerusers();
            $("#othersdialogs").modal('hide');
            this.ngOnInit();
          }, 1000);
               
             } 
                        
        );
        }  
      });
    }
  }
  GetEmailValidate()
  {
    this.show = false;
    this.appService.validateemail(this.Addform.value.ContactEmail)
    .subscribe(
    data => {
      this.result = data;
      if(this.result.UserId>0&&this.result.CustomerId>0)
      {  
        this.show = true;    
      }
    })
  }
  ngOnInit() {
    this.getcustomerusers();
    this.show = false;
    this.flag=false;
    this.Addform = this.fb.group({
      'CandidateIdentifier':  ['', Validators.compose([Validators.nullValidator])],
      'CustomerId': ['', Validators.compose([Validators.nullValidator])],
      'UserId'  : ['', Validators.compose([Validators.nullValidator])],    
      'FirstName': ['', Validators.compose([Validators.required])],   
      'LastName': ['', Validators.compose([Validators.required])],
      'PhoneNumber': ['',  Validators.compose([Validators.nullValidator])],   
      'ContactEmail'   : ['', Validators.compose([Validators.required])],
      'Password': ['', Validators.compose([Validators.nullValidator])],                   
      'UserRoleId':['', Validators.compose([Validators.nullValidator])],   
      'IsActive':[ '', Validators.compose([Validators.nullValidator])],    
    });
    this.Forgotform = this.fb.group({
      'EmailId': ['', Validators.compose([Validators.required])],  
    });
    // this.managersList.subscribe(countries => {
    //   this.completeMembersList = countries as CustomerUsers[];
    // });
  //  if (localStorage.getItem('jobId') != null) {
    this.teammemberslist = this.appService.getTeammembers();
    this.subscription = this.appService.teammembersChanged
      .subscribe(
      (teammemberlist: CustomerUsers[]) => {
        this.teammemberslist = teammemberlist;
        }
      );

      this.addedteammemberslist = this.appService.getaddedTeammembers();
      this.subscription = this.appService.addedteammembersChanged
        .subscribe(
        (teammemberlist: PjTechnicalTeam[]) => {
          this.addedteammemberslist = teammemberlist;
          }
        );
   //     }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

export class SendNoteEmail
{
  public FullName :string
  public Body :string
  public ToEmailID :string
}