import { Component, OnInit, ViewChild } from '@angular/core';

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
export class DepartmentsComponent implements OnInit {
  @ViewChild('deptForm') deptForm: any;
  departmentList: Observable<DepartmentModel[]>;
  departmentInput = new Subject<string>();
  departmentLoading = false;
  // selectedClient: ClientModel;
  selectDepartment: '';
  suggestDepartments: DepartmentModel[];
  departmentsList: DepartmentModel[]; // to check added departments
  // convertObservable: DepartmentModel[];
  getDepartment: DepartmentModel;
  private subscription: Subscription;
  addedDepartmentList: PjDepartments[] = [];

  constructor(private appService: AppService) { }

  updateDepartment(val) {
  this.getDepartment = val;
}
private deleteTeammember(index: number) {
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
  this.departmentsList = this.appService.getDepartment();
  this.subscription = this.appService.departmentsChanged
    .subscribe(
    (departmentlist: DepartmentModel[]) => {
      this.departmentsList = departmentlist;
      }
    );

    this.addedDepartmentList = this.appService.getaddedDepartments();
    this.subscription = this.appService.addeddepartmentsChanged
      .subscribe(
      (departmentlist: PjDepartments[]) => {
        this.addedDepartmentList = departmentlist;
        }
      );

}
}
