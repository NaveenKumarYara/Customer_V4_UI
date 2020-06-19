import { Component,ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AppService } from '../../app.service';
import { AlertService } from '../../shared/alerts/alerts.service';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import {FormsValidationService} from '../../shared/validation/validation.service';
import {CustomerContacts} from '../../../models/customercontacts';
declare var $: any;

@Component({
  
  selector: 'ActivateAndResetPassword',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  providers:[AppService,AlertService]
})
export class AboutComponent { 
    Resetform: any;
    customerId:any;
    companyLogo:any;
    password:any;
    userId:any;
    pid:any;
    Id:any;
    Addform: FormGroup;
    customercontacts : CustomerContacts[]=[];
    constructor( private route: ActivatedRoute,private toastr:ToastsManager,private _vcr: ViewContainerRef,
        private fb: FormBuilder, private router: Router,private appService: AppService,private alertService : AlertService) {
          this.route.params.subscribe(params => {
              console.log(params);
              if (params['pid'] !==null) {
                sessionStorage.setItem('Pid', params['pid']);
              }
              if (params['Uid'] !==null) {
                sessionStorage.setItem('Uid', params['Uid']);
              }

            });
            this.toastr.setRootViewContainerRef(_vcr);
    }
  
  Login()
  {
    this.router.navigateByUrl('home'); 
  } 
  

  SaveUserName()
  {
         
  }
  // ActivatetheUser(id)
  // {
  //   this.appService.ActivateUser(id).subscribe(
  //     data => {
  //     this.toastr.success('Customer is activated. Please login to continue','Success');
  //     setTimeout(() => {
  //       this.toastr.dismissToast;
  //       sessionStorage.removeItem('Uid');
  //     }, 3000);
  //     })
  // }
    
    Send() {
      if(!this.Resetform.valid)
      {
        this.toastr.error('Please fill the Fields!', 'Oops!');
        setTimeout(() => {
            this.toastr.dismissToast;
        }, 3000);
      }
      else
      {
      this.Addform.value.FirstName = this.Resetform.value.FirstName;
      this.Addform.value.LastName = this.Resetform.value.LastName;
      this.appService.UpdateFullName(this.Addform.value)
      .subscribe(Res=>
     {
      this.appService.ResetPassword(this.Resetform.value)
        .subscribe(
        data => {
          this.toastr.success('Details changed successfully','Success');
              this.Resetform.reset();
              sessionStorage.removeItem('Pid');
              setTimeout(() => {
                this.toastr.dismissToast;
                  this.Login();    
                }, 3000);
             }     
        );
            });
            }
    }



    GetCustomerInviteUsers()
    {
      return this.appService.getCustomerContacts(this.customerId).subscribe(res => {
        this.customercontacts = res;
    });
    }
  
  
    ngOnInit() {
      this.pid =  sessionStorage.getItem('Pid');
      this.userId = sessionStorage.getItem('Uid');
      this.Addform = this.fb.group({
        'UserId'  : [this.userId, Validators.compose([Validators.nullValidator])],    
        'FirstName': ['', Validators.compose([Validators.nullValidator])],   
        'LastName': ['', Validators.compose([Validators.nullValidator])] 
      });
      //this.Id = sessionStorage.getItem('Uid');
      //this.ActivatetheUser(this.Id);
      this.Resetform = this.fb.group({
        'UserId'  : [this.userId, Validators.compose([Validators.nullValidator])],    
        'FirstName': ['', Validators.compose([Validators.required])],   
        'LastName': ['', Validators.compose([Validators.required])],
        'Email': [this.pid, Validators.compose([Validators.nullValidator])],
        'Password': ['', [Validators.required, FormsValidationService.password]],
        'ConfirmPassword': ['', [Validators.required, FormsValidationService.password, FormsValidationService.matchOtherValidator('Password')]]
      },
        { validator: matchingPasswords('Password', 'ConfirmPassword') });
     
    }
  }
  
  function matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
      return (group: FormGroup): { [key: string]: any } => {
        let Password = group.controls[passwordKey];
        let ConfirmPassword = group.controls[confirmPasswordKey];
    
        if (Password.value !== ConfirmPassword.value) {
          return {
            mismatchedPasswords: true
          };
        }
      }
    }

