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
  Value: number;
  Forgotform: any;
  result :any;
  customerId: any;
  userId: any;
  addedteammembers: '';
  addedteammemberslist: PjTechnicalTeam[];
  Addform: FormGroup;
  selectedUserInput = new Subject<string>();
  usersloading: boolean;
  selectedUserName = '';
  managersList: Observable<CustomerUsers[]>;
  // completeMembersList: CustomerUsers[];
  getTeammember: CustomerUsers;
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private toastr: ToastsManager, private _vcr: ViewContainerRef,
    private router: Router, private appService: AppService) {
      this.customer = JSON.parse(sessionStorage.getItem('userData'));
      this.customerId = this.customer.CustomerId;
      this.userId = this.customer.UserId;
      //this.toastr.setRootViewContainerRef(_vcr);
  }
  changeTeam(val) {
    this.getTeammember = val;
  }
  public addTeammembers() {
    // const newDomain = new CustomerUsers();
    // newDomain.FirstName = this.selectedUserName;
if (this.teamForm.valid) {
    const check = this.teamExists(this.getTeammember, this.teammemberslist);
      if (check === false) {
        this.appService.addTeammember(this.getTeammember);
      }

    this.selectedUserName = '';
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
    this.managersList = concat(
      of([]), // default items
      this.selectedUserInput.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => this.usersloading = true),
        switchMap(term => this.appService.getCustomerUsers(this.customerId, this.userId, false, term).pipe(
          catchError(() => of([])), // empty list on error
          tap(() => this.usersloading = false)
        ))
      )
    );
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
      this.Addform.value.UserRoleId = this.Value?this.Value:"8";
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
                  this.getcustomerusers();
                  this.ngOnInit();
                  //this.GetCustomerContacts();  
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
  ngOnInit() {
    this.getcustomerusers();
    this.show = false;
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
