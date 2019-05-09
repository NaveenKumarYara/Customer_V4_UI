import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { Observable, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';
import { AddDepartment} from '../../../../../models/jobskills.model';
import { AppService } from '../../../../app.service';
import {GetCustomerDepartments} from '../../../../../models/GetCustomerDepartments';
import { ClientModel, DepartmentModel, PjDepartments } from '../../models/jobPostInfo';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-steps-step1-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css'],
  // providers: [AppService]
})
export class DepartmentsComponent implements OnInit, OnDestroy {
  @ViewChild('deptForm') deptForm: NgForm;
  departmentList: Observable<DepartmentModel[]>;
  departmentInput = new Subject<string>();
  departmentLoading = false;
  // selectedClient: ClientModel;
  selectDepartment: string;
  selectedDepartment=new DepartmentModel();
  customerId: any;
  selectCustDept:any;
  department = new GetCustomerDepartments();
  suggestDepartments: DepartmentModel[];
  departmentsList: DepartmentModel[] = []; // to check added departments
  // convertObservable: DepartmentModel[];
  getDepartment: DepartmentModel;
  private subscription: Subscription;
  private subscriptions: Subscription;
  addedDepartmentList: PjDepartments[] = [];

  constructor(private appService: AppService) {
    // this.getDepartment = new DepartmentModel();
    this.customerId = parseInt(JSON.parse(sessionStorage.getItem('userData')).CustomerId, 10);
  }

  addDepartments(val) {
    const  department = new AddDepartment();
    department.DepartmentName = val; 
    return {name: department.DepartmentName};
  }
  updateDepartment(val) {
    if (val.name != null) {     
      this.selectDepartment = val.name;
      this.department.DepartmentId = 0;
      this.department.CustomerId = this.customerId;
      this.department.Department = this.selectDepartment;
      this.appService.AddDepartment(this.department).subscribe(
        data => {
          if(data>0)
          {
            this.selectedDepartment.DepartmentId =  data;
            this.selectedDepartment.CustomerDepartment = this.selectDepartment;
            this.getDepartment = this.selectedDepartment;
          }
        });   
    }
     else if(val.CustomerDepartment != null) {  
      this.selectDepartment = val.CustomerDepartment;   
      this.selectedDepartment  = val;   
      this.getDepartment = this.selectedDepartment;
    }  
   }
 // updateDepartment(val) {
  //   this.getDepartment = val;
  // }
 
  private deleteDepartment(index: number) {
    this.appService.deleteDepartment(index);
  }
  private searchDepartment() {
    this.departmentList = concat(of([]),
    this.departmentInput.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => this.departmentLoading = true),
      switchMap(term => this.appService.searchDepartment(term, false, this.customerId).pipe(
        catchError(() => of([])), // empty list on error
        tap(() => this.departmentLoading = false)
      ))
    )
  );
}
public addDepartment() {
  this.selectDepartment == '';
  if (this.deptForm.valid) {
  const check = this.departmentExists(this.getDepartment, this.departmentsList);
  if (check === false) {
      this.appService.addDepartment(this.getDepartment);
  }
  // this.selectDepartment = '';
  this.deptForm.reset();
  }
}
departmentExists(team, list) {​
  return list.some(function(elem) {
       return elem.DepartmentId === team.DepartmentId;
  });
}
suggestedDepartment() {
  this.appService.searchClient(this.customerId, true).subscribe(res => {
    this.suggestDepartments = res;
    // this.discResult.forEach(cc => cc.checked = false);
  });
}
ngOnInit() {
  this.searchDepartment();
  // if (this.departmentsList.length === 0) {
  // this.appService.GetJobDepartments(parseInt(localStorage.getItem('jobId'), 10)).subscribe(
  //   x => {this.departmentsList = x;
  //   if (this.departmentsList.length > 0) {
  //       for (const dept of this.departmentsList) {
  //         const ejDepartment = new DepartmentModel();
  //         const ejDepartmentId = new PjDepartments();
  //         ejDepartment.DepartmentId = dept.DepartmentId;
  //         ejDepartment.CustomerDepartment = dept.DepartmentName;
  //           ejDepartmentId.DepartmentId = dept.DepartmentId;
  //           // this.departmentsList.push(ejDepartment);
  //           this.addedDepartmentList.push(ejDepartmentId);
  //       }
  //     }

    // this.appService.departments = this.departmentsList;
    // this.appService.departmentsChanged.next(this.departmentsList);
    // this.appService.addeddepartments = this.addedDepartmentList;
    // this.appService.addeddepartmentsChanged.next(this.appService.addeddepartments);
    // localStorage.setItem('departments', JSON.stringify(this.departmentsList));
    this.subscription = this.appService.departmentsChanged
      .subscribe(
      (departmentlist: DepartmentModel[]) => {       
        this.departmentsList = departmentlist;
        }
      );

    this.addedDepartmentList = this.appService.getaddedDepartments();
    this.subscriptions = this.appService.addeddepartmentsChanged
      .subscribe(
      (departmentlist: PjDepartments[]) => {
        this.addedDepartmentList = departmentlist;
        }
      );
    // });
  // }

}
ngOnDestroy() {
  this.subscription.unsubscribe();
  this.subscriptions.unsubscribe();
  }
}
