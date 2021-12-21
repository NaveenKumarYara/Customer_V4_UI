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
import { Item } from 'angular2-multiselect-dropdown';
import { ApiService } from '../../../../shared/services/api.service/api.service';
import { element } from 'protractor';
declare var $: any;

@Component({
  selector: 'app-steps-step2-immigrationmanager',
  templateUrl: './immi.component.html'
})

export class ImmigrationComponent implements OnInit, OnDestroy {

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
  ImmigrationList=[];
  ImmigrationListData=[];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
    
  // managersAdd: PjTechnicalTeam[] = [];
  // selectedItem: any;
 // private subscription: Subscription;


  constructor(private route: ActivatedRoute,private fb: FormBuilder,private _service: ApiService, private toastr: ToastsManager, private _vcr: ViewContainerRef,
    private router: Router, private appService: AppService) {
      this.customer = JSON.parse(sessionStorage.getItem('userData'));
      this.customerId = this.customer.CustomerId;
      this.userId = this.customer.UserId;
   
  }
  updateStatus(val) {

      this.selectStatus =  val.ImmigrationStatusId;
      let selected = new jobImmigration();
      selected.ImmigrationStatus  = val.ImmigrationStatus;
      selected.ImmigrationStatusId  = val.ImmigrationStatusId;
      this.selectedIms=selected;  
   // this.appService.updateManager(this.selectedItem.toString());

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

  onItemSelect(item: any) {
    this.selectedItems.push(Item);
   }
   onSelectAll(items: any) {
     this.selectedItems.push(Item);
   }

  deleteIms(index)
  {
    this.imsList.splice(index,1);
    this.slist.splice(index,1);
    this.ImmigrationListData.splice(index,1);
  }

//   GetImmigrationStatus() {
//     this.appService.GetImmigrationStatus().subscribe(res => {
//         res.forEach(element => {
//             this.ImmigrationList.push({ item_id: element.ImmigrationStatusId, item_text: element.ImmigrationStatus});
//             });
    
//   });
//  }



 GetImmigrationList()
 {
    this.selectedItems = this.appService.ImmigrationforJobs.filter(x=>x.item_id>0);
//    this.ImmigrationListData.forEach(element => {
//            if(element.ImmigrationStatus!=null)
//            {
//             this.selectedItems.push({ item_id: element.ImmigrationStatusId, item_text: element.ImmigrationStatus});
//            }
          
//   })
 }


  ngOnInit() {
    this.show = false;
    this.flag=false;
    this.JobIds = this.appService.JobIds;
    //this.GetImmigrationStatus();
    this.GetImmigrationList();
    this.dropdownList = [
        { item_id: 1, item_text: 'H1B' ,isDisabled: false},
        { item_id: 2, item_text: 'GreenCard',isDisabled: false },
        { item_id: 3, item_text: 'US citizen',isDisabled: false },
        { item_id: 4, item_text: 'TN visa' ,isDisabled: false},
        { item_id: 5, item_text: 'F1 visa' ,isDisabled: false},
        { item_id: 6, item_text: 'H4 EAD' ,isDisabled: false},
        { item_id: 7, item_text: 'GC EAD',isDisabled: false },
        { item_id: 8, item_text: 'OPT EAD' ,isDisabled: false},
        { item_id: 9, item_text: 'L2 EAD',isDisabled: false },
        { item_id: 10, item_text: 'Open',isDisabled: false },
        { item_id: 11, item_text: 'Others',isDisabled: false }
      ];
    this.dropdownSettings  = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 4,
        allowSearchFilter: true
      };
   
    
 
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
    //this.suggestedManager();
     //this.GetImmigrationStatus();
 
    // this.appService.ImmigrationforJobChanged.subscribe(
    //   (listd: jobImmigrationData[]) => {
    //     this.ImmigrationListData= listd;
    //     this.ImmigrationListData.forEach(element => {
    //         if(element.ImmigrationStatus!=null)
    //         {
    //          this.selectedItems.push({ item_id: element.ImmigrationStatusId, item_text: element.ImmigrationStatus});
    //         }
    //     })
    //     }
    // );

  //    this.getcustomerusers();
  //  //  if (localStorage.getItem('jobId') != null) {
  //     this.appService.currentcustomerUsers.subscribe(x => this.selectedManager = x);
  //     this.selectManager = this.selectedManager.FirstName;
  // //   }
    }


    AddStatus()
    {
        if( this.selectedItems!=undefined)
        {
        // this.imsList.push( this.selectedItems);
        //this.slist.push(this.selectedManager);
        //this.ImmigrationListData=this.selectedItems;
        //this.selectStatus=null;
        //this.appService.immigrations=this.ImmigrationListData;
        this.appService.ImmigrationforJobs=this.selectedItems;
        //this.appService.ImmigrationforJobChanged.next(this.appService.ImmigrationforJobs);
        if(this.JobIds&&this.JobIds.length>0)
        {
          this.JobIds.forEach((e)=>
          {
            
            this.immi.UserId=this.userId;
            this.immi.JobId=Number(e);
            this.immi.Immigration=this.selectedItems.map(x=>x.item_id).toString();
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
          this.immi.Immigration=this.selectedItems.map(x=>x.item_id).toString();
          this.appService.SaveJobImmigration(this.immi).subscribe(
            data => {
              if(data=0)
              {
                console.log("added");
              }
            });
        }
      }    
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
