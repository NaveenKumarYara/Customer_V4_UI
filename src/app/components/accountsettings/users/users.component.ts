import { Component, OnInit,ViewContainerRef } from '@angular/core';
import {CustomerContacts} from '../../../../models/customercontacts';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../../../app.service';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
declare var $: any; 
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [AppService]
})
export class UsersComponent implements OnInit {
  customer:any; 
  Addform: FormGroup;
  customerId:any;
  userId:any;
  show : any = false;
  result :any;
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"; 
  Value: number;
  flag:boolean;
  ActiveFlag: any;
  customercontacts : CustomerContacts[]=[];
  constructor(private toastr:ToastsManager,private _vcr: ViewContainerRef,private route: ActivatedRoute,private fb: FormBuilder, private router: Router,private appService: AppService) 
  { 
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId =this.customer.CustomerId;
    this.userId = this.customer.UserId;
    this.Value= 4;
    this.toastr.setRootViewContainerRef(_vcr);
  }

  PopulateRoles(val)
  {
   this.Value= val;
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
      this.Addform.value.UserRoleId = this.Value;
        this.appService.addCustomerUser(this.Addform.value)
        .subscribe(
        data => {         
        if(data>0)
        {   
        this.appService.ForgotPassword(this.Addform.value.ContactEmail)
        .subscribe(
        data => {
           this.toastr.success('Please check your email to reset the password','Success');
              setTimeout(() => { 
                  this.Addform.reset();            
                  this.toastr.dismissToast; 
                  this.GetCustomerContacts();  
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
      if(this.result.UserId>0&&this.result.CustomerId>0)
      {  
        this.show = true;    
      }
    })
  }
  GetCustomerContacts()
  {
    return this.appService.getCustomerContacts(this.customerId).subscribe(res => {
      this.customercontacts = res;
  });
  }


  ngOnInit() {
    this.show = false;
    this.Addform = this.fb.group({
      'CandidateIdentifier':  ['', Validators.compose([Validators.nullValidator])],
      'CustomerId': [this.customerId, Validators.compose([Validators.nullValidator])],
      'UserId'  : [0, Validators.compose([Validators.required])],    
      'FirstName': ['', Validators.compose([Validators.required])],   
      'LastName': ['', Validators.compose([Validators.required])],
      'PhoneNumber': ['',  Validators.compose([Validators.nullValidator])],   
      'ContactEmail'   : ['', Validators.compose([Validators.required, Validators.email])],
      'Password': ['123456', Validators.compose([Validators.required])],                   
      'UserRoleId':['', Validators.compose([Validators.nullValidator])],   
      'IsActive':[ true, Validators.compose([Validators.required])],    
    });

    this.GetCustomerContacts();
  }

}
