import { Component, OnInit,ViewContainerRef } from '@angular/core';
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
  customercontacts : CustomerContacts[];
  constructor(private toastr:ToastsManager,private _vcr: ViewContainerRef,private route: ActivatedRoute,private fb: FormBuilder, private router: Router,private appService: AppService) 
  { 
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId =this.customer.CustomerId;
    this.userId = this.customer.UserId;
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
  }



  SaveUser()
  {
    debugger
    if(this.Addform.invalid)
    {
      this.Addform.controls['Email'].markAsTouched()
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
      this.Addform.value.InviteId = 0;
      this.Addform.value.CustomerId = this.customerId;
      this.Addform.value.AccessId=2;
      this.Addform.value.UserRoleId = 8;
      this.Addform.value.IsActive = false;
      debugger
        this.appService.addInviteCustomerUser(this.Addform.value)
        .subscribe(
        data => {   
          debugger  
          this.showStep2=true;
          this.GetCustomerInviteUsers();  
        // if(data>0)
        // {   
        // this.Forgotform.value.EmailId = this.Addform.value.Email;
        // this.appService.ActivateCustomerUser(this.Forgotform.value)
        // .subscribe(
        // data1 => {
        //    this.toastr.success('Please check your email','Success');
        //       setTimeout(() => { 
        //           this.Addform.reset();            
        //           this.toastr.dismissToast; 
        //           this.GetCustomerInviteUsers();  
        //         }, 3000);
               
        //      } 
                        
        //);
        //}  
      });
    }
  }

  GetEmailValidate()
  {
    this.show = false;
    this.appService.validateemail(this.Addform.value.Email)
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
  {
    debugger
    return this.appService.getCustomerInviteUsers(this.customerId).subscribe(res => {
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
      'InviteId':  [0, Validators.compose([Validators.nullValidator])],
      'CustomerId': ['', Validators.compose([Validators.nullValidator])],  
      'Email'   : ['', Validators.compose([Validators.required])],
      'AccessId': [1, Validators.compose([Validators.nullValidator])],                   
      'UserRoleId':[8, Validators.compose([Validators.nullValidator])],   
      'IsActive':[0, Validators.compose([Validators.nullValidator])],    
    });
    this.Forgotform = this.fb.group({
      'EmailId': ['', Validators.compose([Validators.required])],  
    });
    this.GetCustomerInviteUsers();
    this.GetUserLevels();
    this.GetUserRoles();
  }

}
