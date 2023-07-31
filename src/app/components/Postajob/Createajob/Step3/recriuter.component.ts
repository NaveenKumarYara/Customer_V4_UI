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
import { RecrutingTeam } from '../../../../../models/GetJobDetailCustomer';
import { ApiService } from '../../../../shared/services/api.service';
import { isDefaultChangeDetectionStrategy } from '@angular/core/src/change_detection/constants';
declare var $: any;

@Component({
  selector: 'app-steps-step3-recriuter',
  templateUrl: './recriuter.component.html',
  styleUrls: ["./recriuter.component.css"]
})

export class recriuterComponent implements OnInit, OnDestroy {

  selectedManager: CustomerUsers;
  selManager: CustomerUsers;
  selectedIms: jobImmigration;
  selectManager: string;
  iselectManager:any;
  srlist:any=[];
  Education:any;
  Employement:any;
  Reference:any;
  WFH:any;
  Background:any;
  sManager: string;
  flag:any=false;
  JobStatus:any=[];
  reportingmanagersList: Observable<CustomerUsers[]>;
  remanagers: CustomerUsers[]=[];
  rmanagers: CustomerUsers[]=[];
  customer: any;
  saveJob = new SaveJobProcess();
  saveCandidate = new SaveJobProcess();
  saveInterview = new SaveJobProcess();
  customerId: any;
  report =new JobReporting();
  immi = new JobImmigrationSave();
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$";
  show : any = false;
  Value: number;
  klist:any=[];
  selectedOption:Options = new Options(0, 'Select' );
  options = [
    new Options(0, 'Select' ),
    new Options(1, 'Screening' ),
     new Options(2, 'Technical' ),
     new Options(3, 'HR'),
      new Options(4, 'Manager' ),
      new Options(5, 'Others' )
  ];
  yes:any;
  No:any;
  Forgotform: any;
  result :any;
  Addform: FormGroup;
  userId: any;
  isSuggsted: any;
  dstatus:any;
  selectedInput = new Subject<string> ();
  selectInput = new Subject<string> ();
  selectJInput = new Subject<string> ();
  selectIInput = new Subject<string> ();
  selectedTInput = new Subject<string> ();
  selectStatus:string;
  usersload: boolean;
  suggestManagers: RecrutingTeam[] = [];
  isuggestManagers: RecrutingTeam[] = [];
  sManagers: RecrutingTeam[] = [];
  statusVal:boolean=false;
  JstatusVal:any;
  sslist=[];
  imsList=[];
  JobIds=[];
  job = new SendNoteEmail();
  ImmigrationList:jobImmigration[]=[];
  ImmigrationListData:jobImmigrationData[]=[];

  // managersAdd: PjTechnicalTeam[] = [];
  // selectedItem: any;
 // private subscription: Subscription;


  constructor(private route: ActivatedRoute,private fb: FormBuilder,private _service:ApiService, private toastr: ToastsManager, private _vcr: ViewContainerRef,
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
 
      if(val.FirstName=="others")
      {
       this.flag = true;
      }
      else if(val.FirstName!="others")
      {
        this.flag = false;
      }
      
    
   }

   updateManage(val) {
    if(val!=undefined)
    {
      this.appService.rList= val.UserId;      
    }
    else
    {
      this.appService.rList = this.customer.UserId;
    }  
   }

   AddIn()
   {
    if(this.iselectManager!=undefined)
    {
      if(this.JobIds&&this.JobIds.length>0)
      {
        this.JobIds.forEach((e)=>
        {
        this.saveInterview.userId = this.iselectManager.UserId;
        this.saveInterview.jobId = Number(e);
        this.saveInterview.verificationStatus =this.selectedOption.name.toString();
        }
        )
      }
      else
      {
        const res = localStorage.getItem('jobId');
        this.saveInterview.userId = this.iselectManager.UserId;
        this.saveInterview.jobId = parseInt(res, 10);       
        this.saveInterview.verificationStatus =this.selectedOption.name.toString();
 
      }
      this._service.PostService(this.saveInterview,'ProfileAPI/api/SaveJobInterviewRounds')
    .subscribe(
      data => {
          this.GetInterviewStatus(this.saveInterview.jobId);
      });
    }
   }



   setValue(val) {
    this.statusVal = val;
    if(val === false)
    {
      let v = this.dstatus.filter(x=>x.ReferralStatusId == 10)
      this.updateCStaus(v[0]);
    }
   
  }

  handleChange()
  {
    if(this.Education)
    {
      this.klist.push("Education");
    }
    if(this.Employement)
    {
      this.klist.push("Employement");
    }
    if(this.Reference)
    {
      this.klist.push("Reference");
    }
    if(this.WFH)
    {
      this.klist.push("WFH");
    }
    if(this.Background)
    {
      this.klist.push("Background");
    }
   this.AddStatus();  
   
  }

  AddStatus()
  {
    if(this.JobIds&&this.JobIds.length>0)
      {
        this.JobIds.forEach((e)=>
        {
        this.saveJob.userId=this.userId;
        this.saveJob.jobId = Number(e);
        this.saveJob.verificationStatus = this.klist.map(x=>x).toString();
        }
        )
      }
      else
      {
        const res = localStorage.getItem('jobId');
        this.saveJob.userId=this.userId;
        this.saveJob.jobId = parseInt(res, 10);       
        this.saveJob.verificationStatus = this.klist.map(x=>x).toString();
 
      }
      this._service.PostService(this.saveJob,'ProfileAPI/api/SaveJobVerification')
    .subscribe(
      data => {
          this.GetJobStatus(this.saveJob.jobId);
      });
  }

   updateCStaus(val) {
    if(val!=undefined)
    {
      if(this.JobIds&&this.JobIds.length>0)
      {
        this.JobIds.forEach((e)=>
        {
        this.saveCandidate.userId=this.userId;
        this.saveCandidate.jobId = Number(e);
        this.saveCandidate.verificationStatus =val.ReferralStatusId.toString();
        }
        )
      }
      else
      {
        const res = localStorage.getItem('jobId');
        this.saveCandidate.userId=this.userId;
        this.saveCandidate.jobId = parseInt(res, 10);       
        this.saveCandidate.verificationStatus =val.ReferralStatusId.toString();
 
      }
      this._service.PostService(this.saveCandidate,'ProfileAPI/api/SaveCandidateVerification')
    .subscribe(
      data => {
          this.GetCandidateStatus(this.saveCandidate.jobId);
      });
    }
   }

   GetCandidateStatus(JId)
   {
    if(localStorage.getItem('jobId') != null)
    {
      const res = localStorage.getItem('jobId');
      JId = parseInt(res, 10);
    }
    this._service.GetService('ProfileAPI/api/GetCandidateVerification?jobId=', JId)
    .subscribe(
      data => {
        if(data != null && data.length>0)
        {
          this.statusVal = data[0].IsRequired;
          if(this.statusVal === true)
          {
            this.JstatusVal = data[0].ReferralStatus;
          }
          this.saveCandidate = new SaveJobProcess();
         
        }
      });
   }

   GetInterviewStatus(JId)
   {
    if(localStorage.getItem('jobId') != null)
    {
      const res = localStorage.getItem('jobId');
      JId = parseInt(res, 10);
    }
    this.srlist = [];
    this._service.GetService('ProfileAPI/api/GetInterviewJobRounds?jobId=', JId)
    .subscribe(
      dat => {
      if(dat!=null)
      {
        dat.forEach(x=>{
          this.srlist.push({"Round": x.Round , "IPerson": x.FirstName + ' '+ x.LastName});
        })
      
      }
 
      this.selectedOption =  new Options(0, 'Select' );
      this.iselectManager = undefined;
      this.saveInterview = new SaveJobProcess();
      });
   }

   GetJobStatus(JId)
   {
    if(localStorage.getItem('jobId') != null)
    {
      const res = localStorage.getItem('jobId');
      JId = parseInt(res, 10);
    }
    this.klist=[];
    this._service.GetService('ProfileAPI/api/GetJobVerification?jobId=', JId)
    .subscribe(
      dat => {
      if(dat!=null)
      {
        dat.forEach(x=>{
          if(x.VerificationStatus === "Education")
          {
            this.Education = true;
          }
          if(x.VerificationStatus === "Employement")
          {
            this.Employement = true;
          }
          if(x.VerificationStatus === "Reference")
          {
            this.Reference = true;
          }
          if(x.VerificationStatus === "WFH")
          {
            this.WFH = true;
          }
          if(x.VerificationStatus === "Background")
          {
            this.Background = true;
          }
        })
      
      }
      this.saveJob= new SaveJobProcess();
      });
   }

   deleteI(I)
   {
     this.srlist.splice(I,1)
     this._service.DeleteService('ProfileAPI/api/DeleteInterviewer?Id=',I).subscribe(data=>{
     })
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
  delete(userId: number) {
    let index = this.suggestManagers.findIndex((manager) => manager.UserId === userId);
    while (index !== -1) {
      this.suggestManagers.splice(index, 1);
      this.sslist.splice(index,1);
      index = this.suggestManagers.findIndex((manager) => manager.UserId === userId);
    }
    this.appService.recrutingList = this.suggestManagers;
  
    if (this.JobIds && this.JobIds.length > 0) {
      this.JobIds.forEach((e) => {
        this.report.UserId = this.userId;
        this.report.CustomerId = this.customerId;
        this.report.JobId = Number(e);
        this.report.HiringManager = this.suggestManagers.map((x) => x.UserId).toString();

        this.appService.RecrutingTeam(this.report).subscribe(
          (data) => {
            if (data === 0) {
              console.log("added");
            }
          }
        );
        this.GetJobAssigned(e);
      });
    } else {
      const res = localStorage.getItem('jobId');
      this.report.UserId = this.userId;
      this.report.CustomerId = this.customerId;
      this.report.JobId = parseInt(res, 10);
      this.report.HiringManager = this.suggestManagers.map((x) => x.UserId).toString();
      this.appService.RecrutingTeam(this.report).subscribe(
        (data) => {
          if (data === 0) {
            console.log("added");
          }
        }
      );
      this.GetJobAssigned(Number(res));
    }
  }
  


  GetReferralStatus()
  {
    this._service.GetService('ReferralAPI/api/JobReferralStatus', '')
    .subscribe(
      data => {
        this.dstatus = data;
        this.JobStatus = data.filter(x=>x.ReferralStatusId > 3 && x.ReferralStatusId < 12 && x.ReferralStatusId!=6 && x.ReferralStatusId!=10 && x.ReferralStatusId!=9);
      });
  }


  GetJobAssigned(jobId: number) {
    const ids = this.suggestManagers.map(o => o.UserId);
    const filtered = this.suggestManagers.filter(({ UserId }, index) => !ids.includes(UserId, index + 1));
    this.suggestManagers = filtered;
  
    this.suggestManagers.forEach(manager => {
      this._service.GetService('IdentityAPI/api/GetJobAssigned?userId=' , manager.UserId + '&jobId=' + jobId)
        .subscribe(data => {
          const assignedManager = this.remanagers.find(z => z.UserId === manager.UserId);
          if (assignedManager) {
            this.job.toEmailID = assignedManager.Email;
          }
  
          this.job.fullName = data.FirstName + ' ' + data.LastName;
          this.job.body = data.FirstName + ' ' + data.LastName + ' Assigned @' + data.JobTitle + ' position for you. Please go through the details!';
          this.job.appLink ="https://customer.arytic.com";
          this.job.applicationName = "Arytic";
          this.job.assignedMemberName = this.customer.FirstName + ' ' + this.customer.LastName;
          this.job.fromEmail = this.customer.Email;
          this.appService.currentjobtitle.subscribe((data) => {
            this.job.jobTitle =  data; 
          });
          
          this._service.PostService(this.job, 'EmailV1Api/api/EmailForAssignJob').subscribe(() => {
            this.job = new SendNoteEmail();
          });
        });
    });
  }
  






  suggestedManager1() {
    this.appService.getCustomerallContacts(this.customerId).subscribe(res => {
      this.remanagers = res.filter((i) => i.FirstName !== "Invited" && !i.IsRemove);
      
      this.suggestManagers = this.appService.recrutingList;
      
      this.remanagers.forEach((manager) => {
        manager.FirstName = `${manager.FirstName} ${manager.LastName} - ${manager.RoleName}`;
      });
  
      // Now this.remanagers array contains objects with 'FullName' property.
  
      // You can use the 'this.remanagers' array as per your requirement.
    });
  }

  allManager1() {
    return this.appService.getCustomerallContacts(this.customerId).subscribe(res =>{
        this.rmanagers=res;
        let val = this.appService.rList;
        if(val!=undefined)
        {
         res.filter((i) => {
            if(i.FirstName !="Invited"   && i.IsRemove!=true && i.UserId== Number(val))
    {
     this.sManager = i.FirstName + ' ' + i.LastName + ' - ' + i.RoleName; 
    }                      
   });
   this.rmanagers = this.rmanagers.filter((i) => {
    if(i.FirstName !="Invited"   && i.IsRemove!=true)
{
return i.FirstName=i.FirstName + ' ' + i.LastName + ' - ' + i.RoleName; 
}                      
});
        } 
        else
        {
          
          //this.sManagers= this.appService.rList;
          this.rmanagers = this.rmanagers.filter((i) => {
            if(i.FirstName !="Invited"   && i.IsRemove!=true)
    {
      return i.FirstName=i.FirstName + ' ' + i.LastName + ' - ' + i.RoleName; 
    }                      
   });
        }
   

      // this.discResult.forEach(cc => cc.checked = false);
    });
  }
  ngOnInit() {
    this.show = false;
    this.flag=false;
    this.JobIds = this.appService.JobIds;
    this.GetReferralStatus();
    this.GetCandidateStatus(this.JobIds[0]);
    this.GetInterviewStatus(this.JobIds[0]);
    this.GetJobStatus(this.JobIds[0]);
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
    this.allManager1();
    this.suggestedManager1();

    this.appService.recrutingListChanged
    .subscribe(
    (list: RecrutingTeam[]) => {
      this.suggestManagers= list;
      }
    );

   


    // this.appService.rListChanged
    // .subscribe(
    // (list: RecrutingTeam[]) => {
    //   this.sManagers= list;
    //   }
    // );

    // this.appService.ImmigrationforJobChanged.subscribe(
    //   (listd: jobImmigrationData[]) => {
    //     this.ImmigrationListData= listd;
    //     }
    // );

  //    this.getcustomerusers();
  //  //  if (localStorage.getItem('jobId') != null) {
  //     this.appService.currentcustomerUsers.subscribe(x => this.selectedManager = x);
  //     this.selectManager = this.selectedManager.FirstName;
  // //   }
    }

    Add() {
      this.flag = false;
      if (this.selectManager !== undefined) {
        if (this.suggestManagers.length > 0) {
          // Instead of wrapping the existing suggestManagers and selectedManager in an array,
          // we will concatenate them using the spread operator.
          this.sslist = [...this.suggestManagers, this.selectedManager];
        } else {
          this.sslist.push(this.selectedManager);
        }
    
        this.suggestManagers = this.sslist;
        this.selectManager = null;
        this.appService.recrutingList = this.suggestManagers;
    
        this.suggestManagers = this.sslist;
        this.selectManager = null;
        this.appService.recrutingList = this.suggestManagers;
    
        if (this.JobIds && this.JobIds.length > 0) {
          this.JobIds.forEach(jobId => {
            this.report.UserId = this.userId;
            this.report.CustomerId = this.customerId;
            this.report.JobId = Number(jobId);
            const ids = this.suggestManagers.map(o => o.UserId);
            const filtered = this.suggestManagers.filter(({ UserId }, index) => !ids.includes(UserId, index + 1));
            this.report.HiringManager = filtered.map(x => x.UserId).toString();

            this.appService.RecrutingTeam(this.report).subscribe(
              data => {
                if (data === 0) {
                  console.log(data);
                }
              }
            );
            this.GetJobAssigned(jobId);
          });
        } else {
          const res = localStorage.getItem('jobId');
          this.report.UserId = this.userId;
          this.report.CustomerId = this.customerId;
          this.report.JobId = parseInt(res, 10);
          const ids = this.suggestManagers.map(o => o.UserId);
          const filtered = this.suggestManagers.filter(({ UserId }, index) => !ids.includes(UserId, index + 1));
          this.report.HiringManager = filtered.map(x => x.UserId).toString();
          this.GetJobAssigned(Number(res));

          this.appService.RecrutingTeam(this.report).subscribe(
            data => {
              if (data === 0) {
                console.log('added');
              }
            }
          );
        }
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
                    this.suggestedManager1();
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


export class SendNoteEmail
{
  fullName: string
  assignedMemberName: string
  jobTitle: string
  body: string
  appLink: string
  toEmailID: string
  applicationName: string
  fromEmail: string
}

export class SaveJobProcess
{
  
  verificationStatus: string;
  userId: number;
  jobId: number;
  
}
export class Options {
  constructor(public id: number, public name: string) { }
}