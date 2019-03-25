import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { Observable, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';

import { AppService } from '../../../../app.service';
import { ClientModel, DepartmentModel, PjDepartments } from '../../models/jobPostInfo';

@Component({
  selector: 'app-steps-step1-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css'],
  providers: [AppService]
})
export class DepartmentsComponent implements OnInit, OnDestroy {
  @ViewChild('deptForm') deptForm: any;
  departmentList: Observable<DepartmentModel[]>;
  departmentInput = new Subject<string>();
  departmentLoading = false;
  // selectedClient: ClientModel;
  selectDepartment: '';
  suggestDepartments: DepartmentModel[];
  departmentsList: DepartmentModel[] = []; // to check added departments
  // convertObservable: DepartmentModel[];
  getDepartment: DepartmentModel;
  private subscription: Subscription;
  private subscriptions: Subscription;
  addedDepartmentList: PjDepartments[] = [];

  constructor(private appService: AppService) {
    // this.getDepartment = new DepartmentModel();
  }

  updateDepartment(val) {
  this.getDepartment = val;
}
private deleteDepartment(index: number) {
  this.appService.deleteDepartment(index);
}
  private searchDepartment() {
    this.departmentList = concat(of([]),
    this.departmentInput.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => this.departmentLoading = true),
      switchMap(term => this.appService.searchDepartment(term, false).pipe(
        catchError(() => of([])), // empty list on error
        tap(() => this.departmentLoading = false)
      ))
    )
  );
}
public addDepartment() {
  if (this.deptForm.valid) {
  const check = this.departmentExists(this.getDepartment, this.departmentsList);
  if (check === false) {
    this.appService.addDepartment(this.getDepartment);
  }
  this.selectDepartment = '';
  }
}
departmentExists(team, list) {​
  return list.some(function(elem) {
       return elem.DepartmentId === team.DepartmentId;
  });
}
suggestedDepartment() {
  this.appService.searchClient(true).subscribe(res => {
    this.suggestDepartments = res;
    // this.discResult.forEach(cc => cc.checked = false);
  });
}
ngOnInit() {
  this.searchDepartment();
  if (this.departmentsList.length === 0) {
 this.appService.GetJobDepartments(parseInt(localStorage.getItem('jobId'), 10)).subscribe(
  x => {this.departmentsList = x;
  if (this.departmentsList.length > 0) {
      for (const dept of this.departmentsList) {
        const ejDepartment = new DepartmentModel();
        const ejDepartmentId = new PjDepartments();
        ejDepartment.DepartmentId = dept.DepartmentId;
        ejDepartment.CustomerDepartment = dept.DepartmentName;
          ejDepartmentId.DepartmentId = dept.DepartmentId;
          // this.departmentsList.push(ejDepartment);
          this.addedDepartmentList.push(ejDepartmentId);
      }
    }

  this.appService.departments = this.departmentsList;
  this.appService.departmentsChanged.next(this.appService.departments);
  this.appService.addeddepartments = this.addedDepartmentList;
  this.appService.addeddepartmentsChanged.next(this.appService.addeddepartments);
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
    });
  }

}
ngOnDestroy() {
  this.subscription.unsubscribe();
   this.subscriptions.unsubscribe();
}
}
