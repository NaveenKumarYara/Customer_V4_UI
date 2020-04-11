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
import { PjTechnicalTeam, CustomerUsers,JobReporting, jobImmigration,JobImmigrationSave,jobImmigrationData } from '../../models/jobPostInfo';
import { Qualifications } from '../../../../../models/qualifications.model';
import { Observable } from 'rxjs/Observable';
import { ReportingTeam } from '../../../../../models/GetJobDetailCustomer';
declare var $: any;

@Component({
  selector: 'app-steps-step3-reportingmanager',
  templateUrl: './reportingmanager.component.html'
})

export class ReportingManagerComponent implements OnInit, OnDestroy {

  selectedManager: CustomerUsers;
  selectedIms: jobImmigration;
  selectManager: string;
  flag:any=false;
  reportingmanagersList: Observable<CustomerUsers[]>;
  reportingmanagers: CustomerUsers[]=[];
  customer: any;
  customerId: any;
  report =new JobReporting();
  immi = new JobImmigrationSave();
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$";
  show : any = false;
  Value: number;
  Forgotform: any;
  result :any;
  Addform: FormGroup;
  userId: any;
  isSuggsted: any;
  selectedInput = new Subject<string> ();
  selectStatus:string;
  usersload: boolean;
  suggestedManagers: ReportingTeam[] = [];
  slist=[];
  imsList=[];
  JobIds=[];
  ImmigrationList:jobImmigration[]=[];
  ImmigrationListData:jobImmigrationData[]=[];

  // managersAdd: PjTechnicalTeam[] = [];
  // selectedItem: any;
 // private subscription: Subscription;


  constructor(private route: ActivatedRoute,private fb: FormBuilder, private toastr: ToastsManager, private _vcr: ViewContainerRef,
    private router: Router, private appService: AppService) {
      this.customer = JSON.parse(sessionStorage.getItem('userData'));
      this.customerId = this.customer.CustomerId;
      this.userId = this.customer.UserId;
      
  }
  updateStatus(val) {
   // this.appService.updateManager(this.selectedItem.toString());
     this.selectStatus = val.FirstName;
     let selected = new jobImmigration();
     selected.ImmigrationStatus  = val.ImmigrationStatus;
     selected.ImmigrationStatusId  = val.ImmigrationStatusId;
     this.selectedIms=selected;  
  }

  updateManager(val) {
    // this.appService.updateManager(this.selectedItem.toString());
      this.selectManager = val.FirstName;
      let selected = new CustomerUsers();
      selected.FirstName  = val.FirstName;
      selected.UserId  = val.UserId;
      this.selectedManager=selected;
 
      if(val.FirstName=="others")
      {
       this.flag = true;
      }
      else if(val.FirstName!="others")
      {
        this.flag = false;
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

  deleteIms(index)
  {
    this.imsList.splice(index,1);
  }

  GetImmigrationStatus() {
    this.appService.GetImmigrationStatus().subscribe(res => {
     this.ImmigrationList = res;
 });
 }

 GetImmigrationList()
 {
   this.ImmigrationListData = this.appService.ImmigrationforJobs;
 }

  suggestedManager() {
    return this.appService.getCustomerallContacts(this.customerId).subscribe(res =>{
      this.reportingmanagers=res;
            this.suggestedManagers= this.appService.reportingList;
      // this.discResult.forEach(cc => cc.checked = false);
    });
  }
  ngOnInit() {
    this.show = false;
    this.flag=false;
    this.JobIds = this.appService.JobIds;
    this.GetImmigrationStatus();
    this.GetImmigrationList();
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
     this.GetImmigrationStatus();
    this.appService.reportingListChanged
    .subscribe(
    (list: ReportingTeam[]) => {
      this.suggestedManagers= list;
      }
    );

    this.appService.ImmigrationforJobChanged.subscribe(
      (listd: jobImmigrationData[]) => {
        this.ImmigrationListData= listd;
        }
    );

  //    this.getcustomerusers();
  //  //  if (localStorage.getItem('jobId') != null) {
  //     this.appService.currentcustomerUsers.subscribe(x => this.selectedManager = x);
  //     this.selectManager = this.selectedManager.FirstName;
  // //   }
    }

    Add()
    {
            this.flag=false;
        this.slist.push(this.selectedManager);
        //this.slist.push(this.selectedManager);
        this.suggestedManagers=this.slist;
        this.selectManager='';
        this.selectManager=null;
        this.appService.reportingList=this.suggestedManagers;
        
        if(this.JobIds&&this.JobIds.length>0)
        {
          this.JobIds.forEach((e)=>
          {
            
            this.report.UserId=this.userId;
            this.report.CustomerId=this.customerId;
            this.report.JobId=Number(e);
            this.report.HiringManager=this.suggestedManagers.map(x=>x.UserId).toString();
            this.appService.ReportingTeam(this.report).subscribe(
              data => {
                if(data=0)
                {
                  console.log("added");
                }
              });
          }
          )
        }
        else
        {
          const res = localStorage.getItem('jobId');
          this.report.UserId=this.userId;
          this.report.CustomerId=this.customerId;
          this.report.JobId=parseInt(res, 10);
          this.report.HiringManager=this.suggestedManagers.map(x=>x.UserId).toString();
          this.appService.ReportingTeam(this.report).subscribe(
            data => {
              if(data=0)
              {
                console.log("added");
              }
            });  
        }
     
      

        
      

      
     
    }

    AddStatus()
    {
          
        this.imsList.push(this.selectedIms);
        //this.slist.push(this.selectedManager);
        this.ImmigrationListData=this.imsList;
        this.selectStatus=null;
        this.appService.immigrations=this.ImmigrationListData;
        
        if(this.JobIds&&this.JobIds.length>0)
        {
          this.JobIds.forEach((e)=>
          {
            
            this.immi.UserId=this.userId;
            this.immi.JobId=Number(e);
            this.immi.Immigration=this.ImmigrationListData.map(x=>x.ImmigrationStatusId).toString();
            this.appService.SaveJobImmigration(this.immi).subscribe(
              data => {
                if(data=0)
                {
                  console.log("added");
                }
              });
          }
          )
        }
        else
        {
          const res = localStorage.getItem('jobId');
          this.immi.JobId=parseInt(res, 10);
          this.immi.UserId=this.userId;
          this.immi.Immigration=this.ImmigrationListData.map(x=>x.ImmigrationStatusId).toString();
          this.appService.SaveJobImmigration(this.immi).subscribe(
            data => {
              if(data=0)
              {
                console.log("added");
              }
            });
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
                    this.selectManager='';
                    this.selectManager=null;  
                    //this.flag=false;       
                    this.toastr.dismissToast;                   
                    this.suggestedManager();
                    $("#othersdialog").modal('hide');
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
