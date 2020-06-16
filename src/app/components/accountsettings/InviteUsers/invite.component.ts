import { Component, OnInit,ViewContainerRef, ContentChild } from '@angular/core';
import {CustomerContacts} from '../../../../models/customercontacts';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../../../app.service';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
declare var $: any; 
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import { ResetComponent } from '../../ResetPassword/resetpassword.component';
@Component({
  selector: 'app-inviteusers',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css'],
  providers: [AppService]
})
export class InviteUsersComponent implements OnInit {
  customer:any; 
  Addform: FormGroup;
  customerId:any;
  userId:any;
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
  customercontacts : CustomerContacts[]=[];
  constructor(private toastr:ToastsManager,private _vcr: ViewContainerRef,private route: ActivatedRoute,private fb: FormBuilder, private router: Router,private appService: AppService) 
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



  ResetUser()
  {
    this.show = false;
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
      'UserRoleId':['', Validators.compose([Validators.nullValidator])],   
      'IsActive':[ '', Validators.compose([Validators.nullValidator])],
      'AccessId':['', Validators.compose([Validators.nullValidator])]     
    });           
  }

  RemoveUser()
  {

  }

EditUser(contact)
{
  this.showStep=true;
  this.Addform = this.fb.group({
    'CandidateIdentifier':  ['', Validators.compose([Validators.nullValidator])],
    'FirstName': [contact.FirstName, Validators.compose([Validators.nullValidator])],   
    'LastName': [contact.LastName, Validators.compose([Validators.nullValidator])],
    'PhoneNumber': ['',  Validators.compose([Validators.nullValidator])],   
    'ContactEmail'   : [contact.Email, Validators.compose([Validators.required])],
    'Password': ['', Validators.compose([Validators.nullValidator])],                   
    'CustomerId': [this.customerId, Validators.compose([Validators.nullValidator])],
    'UserId'  : [contact.UserId, Validators.compose([Validators.nullValidator])],                  
    'UserRoleId':[contact.RoleId, Validators.compose([Validators.nullValidator])],   
    'IsActive':[contact.IsActive, Validators.compose([Validators.nullValidator])],  
    'AccessId':[contact.AccessId, Validators.compose([Validators.nullValidator])]   
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
    else if(this.result.UserId==0||this.userId>0)
    {
      this.Addform.value.FirstName='Invited';
      this.Addform.value.LastName='User';
      this.Addform.value.CustomerId = this.customerId;
      this.Addform.value.Password = 123456;
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
                      this.toastr.dismissToast; 
                      this.GetCustomerInviteUsers();  
                    }, 3000);
                   
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
      if(this.result.UserId>0&&this.result.CustomerId>0||this.userId==undefined)
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
  {
    return this.appService.getCustomerContacts(this.customerId).subscribe(res => {
      this.showStep=false;
      this.customercontacts = res;
  });
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


  ngOnInit() {
    this.show = false;
    this.Addform = this.fb.group({
      'CandidateIdentifier':  ['', Validators.compose([Validators.nullValidator])],
      'CustomerId': ['', Validators.compose([Validators.nullValidator])],
      'UserId'  : [0, Validators.compose([Validators.nullValidator])],    
      'FirstName': ['', Validators.compose([Validators.nullValidator])],   
      'LastName': ['', Validators.compose([Validators.nullValidator])],
      'PhoneNumber': ['',  Validators.compose([Validators.nullValidator])],   
      'ContactEmail'   : ['', Validators.compose([Validators.required])],
      'Password': ['', Validators.compose([Validators.nullValidator])],                   
      'UserRoleId':['', Validators.compose([Validators.nullValidator])],   
      'IsActive':[ '', Validators.compose([Validators.nullValidator])], 
      'AccessId':['', Validators.compose([Validators.nullValidator])]    
    });
    this.Forgotform = this.fb.group({
      'EmailId': ['', Validators.compose([Validators.required])],  
    });
    this.GetCustomerInviteUsers();
    this.GetUserLevels();
    this.GetUserRoles();
  }

}
