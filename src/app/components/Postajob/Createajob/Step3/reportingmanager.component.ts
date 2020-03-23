import { Component, OnInit, Inject, OnDestroy,ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { FormControl } from '@angular/forms';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import { AppService } from '../../../../app.service';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { EmploymentType } from '../../../../../models/employmenttype.model';
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { PjTechnicalTeam, CustomerUsers } from '../../models/jobPostInfo';
import { Qualifications } from '../../../../../models/qualifications.model';
import { Observable } from 'rxjs/Observable';
declare var $: any;

@Component({
  selector: 'app-steps-step3-reportingmanager',
  templateUrl: './reportingmanager.component.html'
})

export class ReportingManagerComponent implements OnInit, OnDestroy {

  selectedManager: CustomerUsers;
  selectManager: string;
  flag:any=false;
  reportingmanagersList: Observable<CustomerUsers[]>;
  reportingmanagers: CustomerUsers[]=[];
  customer: any;
  customerId: any;
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$";
  show : any = false;
  Value: number;
  Forgotform: any;
  result :any;
  Addform: FormGroup;
  userId: any;
  isSuggsted: any;
  selectedInput = new Subject<string> ();
  usersload: boolean;
  suggestedManagers: CustomerUsers[] = [];
  slist=[];

  // managersAdd: PjTechnicalTeam[] = [];
  // selectedItem: any;
 // private subscription: Subscription;


  constructor(private route: ActivatedRoute,private fb: FormBuilder, private toastr: ToastsManager, private _vcr: ViewContainerRef,
    private router: Router, private appService: AppService) {
      this.customer = JSON.parse(sessionStorage.getItem('userData'));
      this.customerId = this.customer.CustomerId;
      this.userId = this.customer.UserId;
  }
  updateManager(val) {
   // this.appService.updateManager(this.selectedItem.toString());
     this.selectManager = val.FirstName;
     let selected = new CustomerUsers();
     selected.FirstName  = val.FirstName;
     selected.UserId  = val.UserId;
     this.selectedManager=selected;

     if(val.FirstName='others')
     {
     $('#managereportingmanager').modal('show');
     }
     
   
  }

  // getjobaccessto1000042
  //   getcustomerusers() {
  //   this.reportingmanagersList = concat(
  //     of([]), // default items
  //     this.selectedInput.pipe(
  //       debounceTime(200),
  //       distinctUntilChanged(),
  //       tap(() => this.usersload = true),
  //       switchMap(term => this.appService.getCustomerUsers(this.customerId, this.userId, false, term).pipe(
  //         catchError(() => of([])), // empty list on error
  //         tap(() => this.usersload = false)
  //       ))
  //     )
  //   );
  // }

  delete(index)
  {
    this.slist.splice(index,1);
  }

  suggestedManager() {
    this.appService.getCustomerUsers(this.customerId, this.userId, true, '').subscribe(res => {
      this.reportingmanagers=res;
      let cus = new CustomerUsers();
      cus.FirstName ='others';
      cus.UserId=this.userId;
      this.reportingmanagers.push(cus);
            this.suggestedManagers= this.appService.reportingList;
      debugger
      // this.discResult.forEach(cc => cc.checked = false);
    });
  }
  ngOnInit() {
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
    this.suggestedManager();

  //    this.getcustomerusers();
  //  //  if (localStorage.getItem('jobId') != null) {
  //     this.appService.currentcustomerUsers.subscribe(x => this.selectedManager = x);
  //     this.selectManager = this.selectedManager.FirstName;
  // //   }
    }

    Add()
    {
      this.slist.push(this.selectedManager);
      //this.slist.push(this.selectedManager);
      this.suggestedManagers=this.slist;
      debugger
      this.selectManager='';
      this.selectManager=null;
      this.appService.reportingList=this.suggestedManagers;
     
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
                    //this.getcustomerusers();
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
     // this.appService.currentManager.subscribe(x => this.selectedInput = x);
    // this.getcustomerusers();
    // this.teammemberslist = this.appService.getTeammembers();
    // this.subscription = this.appService.teammembersChanged
    //   .subscribe(
    //   (teammemberlist: string[]) => {
    //     this.teammemberslist = teammemberlist;
    //     }
    //   );



  ngOnDestroy() {
   // this.subscription.unsubscribe();
  }
}
