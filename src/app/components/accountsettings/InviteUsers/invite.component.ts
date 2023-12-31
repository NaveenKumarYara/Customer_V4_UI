import { Component, OnInit,ViewContainerRef, ContentChild } from '@angular/core';
import {CustomerContacts} from '../../../../models/customercontacts';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../../../app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
declare var $: any; 
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import { ResetComponent } from '../../ResetPassword/resetpassword.component';
import * as introJs from 'intro.js/intro.js';
import { OnDestroy } from '@angular/core/public_api';
@Component({
  selector: 'app-inviteusers',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css'],
  providers: [AppService]
})
export class InviteUsersComponent implements OnInit,OnDestroy {
  customer:any; 
  Addform: FormGroup;
  IsEdit:boolean=false;
  introJS = introJs();
  customerId:any;
  userId:any;
  searchText:string;
  userLevels:any;
  userRoles:any;
  show : any = false;
  showStep:boolean=false;
  showStep2:boolean=false;
  result :any;
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"; 
  Value: number;
  Flag:boolean;
  Forgotform: any;
  ActiveFlag: any;
  filterUser:number=0;
  customercontacts : CustomerContacts[]=[];
  constructor(private toastr:ToastsManager,private spinner: NgxSpinnerService,private _vcr: ViewContainerRef,private route: ActivatedRoute,private fb: FormBuilder, private router: Router,private appService: AppService) 
  { 
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId =this.customer.CustomerId;
    // this.userId = this.customer.UserId;
    //this.Value= 4;
    this.toastr.setRootViewContainerRef(_vcr);
  }

  // PopulateRoles(val)
  // {
  //  this.Value= val;
  // }
  start()
  {
    this.introJS.start();
  }

  tClose()
  {
    this.introJS.exit();
  }

  ngOnDestroy() {
    this.tClose();
  }

  Rest()
  {
    //debugger
    this.showStep=false;
  }


  ResetUser()
  {
    this.show = false;
    this.IsEdit=false;
    this.Addform.reset(); 
    this.Addform = this.fb.group({
      'CandidateIdentifier':  ['', Validators.compose([Validators.nullValidator])],
      'CustomerId': ['', Validators.compose([Validators.nullValidator])],
      'UserId'  : [0, Validators.compose([Validators.nullValidator])],    
      'FirstName': ['', Validators.compose([Validators.nullValidator])],   
      'LastName': ['', Validators.compose([Validators.nullValidator])],
      'PhoneNumber': ['',  Validators.compose([Validators.nullValidator])],   
      'ContactEmail'   : ['', Validators.compose([Validators.required])],
      'Password': ['', Validators.compose([Validators.nullValidator])],                   
      'UserRoleId':['8', Validators.compose([Validators.nullValidator])],   
      'IsActive':[ '', Validators.compose([Validators.nullValidator])], 
      'AccessId':['2', Validators.compose([Validators.nullValidator])]        
    });           
  }

  RemoveUser(Id)
  {
    this.tClose();
    return this.appService.DeleteInviteUsers(Id).subscribe(
      data => 
      {
       this.GetCustomerInviteUsers();
      }
      )
  }

  GetUsers(val)
  {
    this.filterUser = val;
    return this.appService.getCustomerContacts(this.customerId).subscribe(res => {
    if(this.filterUser == 1)
    {
      this.customercontacts = res.filter(x=> x.IsActive === true );
    }
    else if(this.filterUser == 2)
    {
      this.customercontacts = res.filter(x=> x.IsActive === false );
    }
    else
    {
      this.customercontacts = res;
    }

    });
  }

  ActivateInviteUsers(contact)
  {
    this.tClose();
    return this.appService.ActivateInviteUsers(contact.Email).subscribe(
      data => 
      {
        this.Addform.value.FirstName = contact.FirstName;
        this.Addform.value.LastName = contact.LastName;
       this.Addform.value.ContactEmail = contact.Email;
       this.Addform.value.UserId= contact.UserId;
       this.Addform.value.UserRoleId= contact.RoleId;
       this.Addform.value.Password = 123456;
       this.Addform.value.CandidateIdentifier ='';
        this.Addform.value.CustomerId = this.customerId;
        this.Addform.value.IsActive = true;
        this.Addform.value.AccessId=contact.AccessId;
       this.Forgotform.value.EmailId = contact.Email;
       this.appService.addCustomerUser(this.Addform.value)
        .subscribe(
        data => {         
        if(data>0)
        { 
            this.Forgotform.value.EmailId = this.Addform.value.ContactEmail;
            this.appService.ActivateCustomerUser(this.Forgotform.value)
            .subscribe(
            data1 => {
               this.toastr.success('Invitation has sent successfully','Success');
                  setTimeout(() => { 
                    this.Addform.reset(); 
                    this.Addform = this.fb.group({
                      'CandidateIdentifier':  ['', Validators.compose([Validators.nullValidator])],
                      'CustomerId': ['', Validators.compose([Validators.nullValidator])],
                      'UserId'  : [0, Validators.compose([Validators.nullValidator])],    
                      'FirstName': ['', Validators.compose([Validators.nullValidator])],   
                      'LastName': ['', Validators.compose([Validators.nullValidator])],
                      'PhoneNumber': ['',  Validators.compose([Validators.nullValidator])],   
                      'ContactEmail'   : ['', Validators.compose([Validators.required])],
                      'Password': ['', Validators.compose([Validators.nullValidator])],                   
                      'UserRoleId':['8', Validators.compose([Validators.nullValidator])],   
                      'IsActive':[ '', Validators.compose([Validators.nullValidator])], 
                      'AccessId':['2', Validators.compose([Validators.nullValidator])]        
                    });             
                      this.toastr.dismissToast; 
                      this.GetCustomerInviteUsers();  
                    
                    }, 3000);
                   
                 } 
                            
            );
         
        }  
      });
      }
      )
  }

  ResendEmail(contact)
  {
    this.tClose();
    this.Forgotform.value.EmailId = contact.Email;
            this.appService.ActivateCustomerUser(this.Forgotform.value)
            .subscribe(
            data1 => {
               this.toastr.success('Invitation has sent successfully','Success');
                  setTimeout(() => { 
                    this.Addform.reset(); 
                    this.Addform = this.fb.group({
                      'CandidateIdentifier':  ['', Validators.compose([Validators.nullValidator])],
                      'CustomerId': ['', Validators.compose([Validators.nullValidator])],
                      'UserId'  : [0, Validators.compose([Validators.nullValidator])],    
                      'FirstName': ['', Validators.compose([Validators.nullValidator])],   
                      'LastName': ['', Validators.compose([Validators.nullValidator])],
                      'PhoneNumber': ['',  Validators.compose([Validators.nullValidator])],   
                      'ContactEmail'   : ['', Validators.compose([Validators.required])],
                      'Password': ['', Validators.compose([Validators.nullValidator])],                   
                      'UserRoleId':['8', Validators.compose([Validators.nullValidator])],   
                      'IsActive':[ '', Validators.compose([Validators.nullValidator])], 
                      'AccessId':['2', Validators.compose([Validators.nullValidator])]        
                    });             
                      this.toastr.dismissToast; 
                      this.GetCustomerInviteUsers();  
                    }, 3000);
                   
                 } 
                            
            );
  }

EditUser(contact)
{
  this.tClose();
  this.showStep=true;
  this.IsEdit=true;
  this.Addform = this.fb.group({
    'CandidateIdentifier':  ['', Validators.compose([Validators.nullValidator])],
    'FirstName': [contact.FirstName, Validators.compose([Validators.nullValidator])],   
    'LastName': [contact.LastName, Validators.compose([Validators.nullValidator])],
    'PhoneNumber': ['',  Validators.compose([Validators.nullValidator])],   
    'ContactEmail'   : [contact.Email, Validators.compose([Validators.required])],
    'Password': ['', Validators.compose([Validators.nullValidator])],                   
    'CustomerId': [this.customerId, Validators.compose([Validators.nullValidator])],
    'UserId'  : [contact.UserId, Validators.compose([Validators.nullValidator])],                  
    'UserRoleId':[contact.RoleId.toString(), Validators.compose([Validators.nullValidator])],  
    'AccessId':[contact.AccessId.toString(), Validators.compose([Validators.nullValidator])],    
    'IsActive':[contact.IsActive, Validators.compose([Validators.nullValidator])]  
  });
  this.userId=contact.UserId;
}


  SaveUser()
  {
    
    if(this.Addform.invalid)
    {
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
      if(this.customer.UserRoleId == 6 && this.Addform.value.UserRoleId == 7)
      {
        this.toastr.error('Please contact admin you dont have access to add admin role!', 'Oops!');
        setTimeout(() => {
            this.toastr.dismissToast;
        }, 3000);
        return false;
      }
      if(this.customer.UserRoleId == 4 && this.Addform.value.UserRoleId == 7)
      {
        this.toastr.error('Please contact admin you dont have access to add admin role!', 'Oops!');
        setTimeout(() => {
            this.toastr.dismissToast;
        }, 3000);
        return false;
      }
      if(this.customer.UserRoleId == 4 && this.Addform.value.UserRoleId == 6)
      {
        this.toastr.error('Please contact admin you dont have access to add account role!', 'Oops!');
            this.toastr.dismissToast;
         setTimeout(() => {
       }, 3000);
       return false;
      }
      if(this.customer.UserRoleId == 4 && this.Addform.value.UserRoleId == 4)
      {
        this.toastr.error('Please contact admin you dont have access to add account role!', 'Oops!');
            this.toastr.dismissToast;
         setTimeout(() => {
       }, 3000);
       return false;
      }
      if(this.customer.UserRoleId == 4 && this.Addform.value.UserRoleId == 10)
      {
        this.toastr.error('Please contact admin you dont have access to add account role!', 'Oops!');
            this.toastr.dismissToast;
         setTimeout(() => {
       }, 3000);
       return false;   
      }
      else
      {
      this.spinner.show();
      this.Addform.value.FirstName= 'Invited';
      this.Addform.value.LastName= 'User';
      this.Addform.value.CustomerId = this.customerId;
      this.Addform.value.Password = 123456;
      this.Addform.value.IsActive = true;
      if(this.Addform.value.AccessId == 1)
      {
        this.Addform.value.UserRoleId=7
      }
      if(this.Addform.value.AccessId == 2)
      {
        this.Addform.value.UserRoleId;
      }
      //debugger
        this.appService.addCustomerUser(this.Addform.value)
        .subscribe(
        data => {        
        if(data>0)
        { 
            this.Forgotform.value.EmailId = this.Addform.value.ContactEmail;
            this.appService.ActivateCustomerUser(this.Forgotform.value)
            .subscribe(
            data1 => {
               this.toastr.success('Invitation has sent successfully','Success');
                  setTimeout(() => { 
                    this.Addform.reset(); 
                    this.Addform = this.fb.group({
                      'CandidateIdentifier':  ['', Validators.compose([Validators.nullValidator])],
                      'CustomerId': ['', Validators.compose([Validators.nullValidator])],
                      'UserId'  : [0, Validators.compose([Validators.nullValidator])],    
                      'FirstName': ['', Validators.compose([Validators.nullValidator])],   
                      'LastName': ['', Validators.compose([Validators.nullValidator])],
                      'PhoneNumber': ['',  Validators.compose([Validators.nullValidator])],   
                      'ContactEmail'   : ['', Validators.compose([Validators.required])],
                      'Password': ['', Validators.compose([Validators.nullValidator])],                   
                      'UserRoleId':['8', Validators.compose([Validators.nullValidator])],   
                      'IsActive':[ '', Validators.compose([Validators.nullValidator])], 
                      'AccessId':['2', Validators.compose([Validators.nullValidator])]        
                    });               
                      this.toastr.dismissToast; 
                      this.GetCustomerInviteUsers();  
                    }, 3000);
                   
                 } 
                            
            );
         
        }  
      });
    }
    }
  }


  EditTheUser()
  {
    if(this.customer.UserRoleId == 6 && this.Addform.value.UserRoleId == 7)
    {
      this.toastr.error('Please contact admin you dont have access to add admin role!', 'Oops!');
      setTimeout(() => {
          this.toastr.dismissToast;
      }, 3000);
      return false;
    }
    if(this.customer.UserRoleId == 4 && this.Addform.value.UserRoleId == 7)
    {
      this.toastr.error('Please contact admin you dont have access to add admin role!', 'Oops!');
      setTimeout(() => {
          this.toastr.dismissToast;
      }, 3000);
      return false;
    }
    if(this.customer.UserRoleId == 4 && this.Addform.value.UserRoleId == 6)
    {
      this.toastr.error('Please contact admin you dont have access to add account role!', 'Oops!');
          this.toastr.dismissToast;
       setTimeout(() => {
     }, 3000);
     return false;
    }
    if(this.customer.UserRoleId == 4 && this.Addform.value.UserRoleId == 4)
    {
      this.toastr.error('Please contact admin you dont have access to add account role!', 'Oops!');
          this.toastr.dismissToast;
       setTimeout(() => {
     }, 3000);
     return false;
    }
    if(this.customer.UserRoleId == 4 && this.Addform.value.UserRoleId == 10)
    {
      this.toastr.error('Please contact admin you dont have access to add account role!', 'Oops!');
          this.toastr.dismissToast;
       setTimeout(() => {
     }, 3000);
     return false;   
    }
    else 
    {
    this.spinner.show();
    this.Addform.value.AccessId=Number(this.Addform.value.AccessId);
    if(this.Addform.value.AccessId == 1)
    {
      this.Addform.value.UserRoleId=7
    }
    if(this.Addform.value.AccessId == 2)
    {
      this.Addform.value.UserRoleId=Number(this.Addform.value.UserRoleId);
    }
        this.appService.addCustomerUser(this.Addform.value)
        .subscribe(
        data => {         
        if(data>0)
        { 
          this.toastr.success('Updated successfully','Success');
          setTimeout(() => { 
              this.Addform.reset();  
              this.Addform = this.fb.group({
                'CandidateIdentifier':  ['', Validators.compose([Validators.nullValidator])],
                'CustomerId': ['', Validators.compose([Validators.nullValidator])],
                'UserId'  : [0, Validators.compose([Validators.nullValidator])],    
                'FirstName': ['', Validators.compose([Validators.nullValidator])],   
                'LastName': ['', Validators.compose([Validators.nullValidator])],
                'PhoneNumber': ['',  Validators.compose([Validators.nullValidator])],   
                'ContactEmail'   : ['', Validators.compose([Validators.required])],
                'Password': ['', Validators.compose([Validators.nullValidator])],                   
                'UserRoleId':['8', Validators.compose([Validators.nullValidator])],   
                'IsActive':[ '', Validators.compose([Validators.nullValidator])], 
                'AccessId':['2', Validators.compose([Validators.nullValidator])]        
              });           
              this.toastr.dismissToast; 
              this.GetCustomerInviteUsers();  
            }, 3000);
            // this.Forgotform.value.EmailId = this.Addform.value.ContactEmail;
            // this.appService.ActivateCustomerUser(this.Forgotform.value)
            // .subscribe(
            // data1 => {
            //    this.toastr.success('Invitation has sent successfully','Success');
            //       setTimeout(() => { 
            //           this.Addform.reset();            
            //           this.toastr.dismissToast; 
            //           this.GetCustomerInviteUsers();  
            //         }, 3000);
                   
            //      } 
                            
            // );
         
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


  GetUserLevels()
  {
    return this.appService.getUserLevelAccess().subscribe(res => {
      this.userLevels = res;
  });
  }

  GetUserRoles()
  {
    return this.appService.getUserRoleAccess().subscribe(res => {
      this.userRoles = res;
  });
  }

  GetCustomerInviteUsers()
  { this.showStep=false;
    this.IsEdit=false;
    this.spinner.hide();
    //return this.appService.getCustomerContacts(this.customerId).subscribe(res => {
 
      //debugger
      //this.customercontacts = res;
      this.GetUsers(this.filterUser);
  //});
  }

  // userDeactivate(contact, isChecked: boolean)
  // {
  //   if(!isChecked)
  //   {
  //     this.Flag= false;
  //   }
  //   else if(isChecked)
  //   {
  //     this.Flag = true;
  //   }
  //   this.Addform.value.FirstName = contact.FirstName;
  //   this.Addform.value.LastName = contact.LastName;
  //   this.Addform.value.ContactEmail = contact.Email;
  //   this.Addform.value.UserId= contact.UserId;
  //   this.Addform.value.UserRoleId= contact.RoleId;
  //   this.Addform.value.Password = 123456;
  //   this.Addform.value.CandidateIdentifier ='';
  //   this.Addform.value.CustomerId = this.customerId;
  //   this.Addform.value.IsActive = this.Flag;
  //   this.appService.addCustomerUser(this.Addform.value)
  //   .subscribe(
  //   res => {         
  //   if(res>0)
  //      {  
  //         this.Addform.reset();            
  //         this.GetCustomerContacts();  
  //       }              
  // });
  // }

  getParentApi(): PaComponentApi {
    return {

      callRest: () => {
        this.GetCustomerInviteUsers();
      }

    };


  }


  ngOnInit() {
  
    this.show = false;
    this.spinner.show();
    //this.showStep=false;
    this.Addform = this.fb.group({
      'CandidateIdentifier':  ['', Validators.compose([Validators.nullValidator])],
      'CustomerId': ['', Validators.compose([Validators.nullValidator])],
      'UserId'  : [0, Validators.compose([Validators.nullValidator])],    
      'FirstName': ['', Validators.compose([Validators.nullValidator])],   
      'LastName': ['', Validators.compose([Validators.nullValidator])],
      'PhoneNumber': ['',  Validators.compose([Validators.nullValidator])],   
      'ContactEmail'   : ['', Validators.compose([Validators.required])],
      'Password': ['', Validators.compose([Validators.nullValidator])],                   
      'UserRoleId':['8', Validators.compose([Validators.nullValidator])],   
      'IsActive':[ '', Validators.compose([Validators.nullValidator])], 
      'AccessId':['2', Validators.compose([Validators.nullValidator])]    
    });
    this.Forgotform = this.fb.group({
      'EmailId': ['', Validators.compose([Validators.required])],  
    });
    this.GetCustomerInviteUsers();
    this.GetUserLevels();
    this.GetUserRoles();
    // return this.appService.getCustomerContacts(this.customerId).subscribe(res => {
    //   this.customercontacts = res;
    // })
  }

}


export interface PaComponentApi {
  callRest: () => void;
}