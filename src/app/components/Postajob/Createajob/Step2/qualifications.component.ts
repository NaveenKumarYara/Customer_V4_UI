import { Component, OnInit, Inject, OnDestroy, ViewChild  } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../../../../app.service';
// tslint:disable-next-line:import-blacklist
import { Subject, Observable } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';
import { Subscription } from 'rxjs/Subscription';
import { FormControl } from '@angular/forms';
import { Qualifications, AddEducation } from '../../../../../models/qualifications.model';
import { PjEducationDetails } from '../../models/jobPostInfo';

@Component({
  selector: 'app-steps-step2-qualifications',
  templateUrl: './qualifications.component.html'
})
export class QualificationsComponent implements OnInit, OnDestroy  {
@ViewChild('eduForm') eduForm: any;
  private addedsubscription: Subscription;
  private subscription: Subscription;
  qualificationId: number;
  qualifications: Observable<Qualifications[]>;
  selectedqualificationName: any;
  qualificationtitleloading = false;
  selectedqualificationinput = new Subject<string>();
  qualificationList: Qualifications[];
  addqualificationList: PjEducationDetails[];
  convertObservable: Qualifications[];
  selectedQualification: Qualifications;
  newQualification = '';
  newqualificationId:  number ;
  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {

  }

  // addEducation(val) {
  //   const  eduName = new AddEducation();
  //    eduName.QualificationId = val;
  //      localStorage.setItem('edu', val);
  //     return { name: eduName.QualificationId , tag: true };
  // }

  private addQualification() {
    // this.selectedqualificationName = 1;
    if (this.eduForm.valid) {
    // const newqualification = new Qualifications();
    // newqualification.QualificationId = this.selectedQualification.QualificationId;
    // newqualification.QualificationName = this.selectedQualification.QualificationName;
    if (this.newQualification === '' && this.selectedqualificationName === undefined) {
      return false;
    } else if (this.newQualification !== '' && this.newQualification.length > 0) {
      const addedu = new AddEducation();
      addedu.qualificationName = this.newQualification;
      this.appService.addNewQualification(addedu).
      subscribe(data => {
           this.newqualificationId = data;
           this.selectedQualification = new Qualifications();
           this.selectedQualification.QualificationId = this.newqualificationId;
           this.selectedQualification.QualificationName = addedu.qualificationName;

      const check = this.educationExists(this.selectedQualification, this.qualificationList);
      if (check === false) {
      this.appService.addQualifications(this.selectedQualification);
    }
    this.selectedqualificationName = 0;
  });
  } else if (this.selectedqualificationName != null || this.selectedqualificationName !== '' || this.selectedqualificationName !== undefined) {
    // const addedu = new AddEducation();
    // addedu.qualificationName = this.newQualification;
    // this.appService.addNewQualification(addedu).
    // subscribe(data => {
    //      this.newqualificationId = data;
    //      this.selectedQualification = new Qualifications();
    //      this.selectedQualification.QualificationId = this.newqualificationId;
    //      this.selectedQualification.QualificationName = addedu.qualificationName;
    //   });
    const check = this.educationExists(this.selectedQualification, this.qualificationList);
    if (check === false) {
    this.appService.addQualifications(this.selectedQualification);
  }
  this.selectedqualificationName = 0;
}
  }
  return false;
}
educationExists(education, list) {​
  return list.some(function(elem) {
       return elem.QualificationId === education.QualificationId;
  });
}
  private deleteQualifications(index: number) {
    this.appService.deleteQualifications(index);
  }

  // public setSelectedStatus(value: string): void {

  //   if (this.qualifications && value) {
  //      let status: Qualifications = this.qualifications.where(s => s.values == value);
  //      if (status)
  //        this.selectedStatus = status.name;
  //    }
  //    else
  //       this.selectedStatus = '';
  //  }
  getSelectedOptionText(id: number) {
   // return this.qualifications.find(movie => movie.QualificationId == id);
// this.getQualifications();
//    this.qualifications.subscribe(countries => {
//     this.qualificationList = countries as Qualifications[];
//       });
  this.selectedQualification = this.convertObservable.find(s => s.QualificationId === id);
  this.newQualification = '';
  // const abc = this.qualifications
  //   .map(movies => movies.find(movie => movie.QualificationId === id));

    // const status: Qualifications = this.qualificationList.find(s => s.QualificationName === id);
    //  if (status) {
    //    this.qualificationId = status.QualificationId;
    //  }
  }
  updateQualification(val) {
    // this.selectedQualification = val;
    this.selectedqualificationName = '';
  }
//   getSelectedOptionText(val) {
//     const selectedOptions = event.target['options'];
//     const selectedIndex = selectedOptions.selectedIndex;
//     const selectElementText = selectedOptions[selectedIndex].text;
//     console.log(selectElementText);
//  }
  private getQualifications() {
    this.qualifications = concat(
      of([]), // default items
      this.selectedqualificationinput.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => this.qualificationtitleloading = true),
        switchMap(term => this.appService.getQualificationDetails().pipe(
          catchError(() => of([])), // empty list on error
          tap(() => this.qualificationtitleloading = false)
        ))
      )
    );

  }
  SetQualification(val) {
   // $('#responsibilitiesName').val(val.RolesAndResponsibilities);
    this.qualificationId = val;
    // this.roleModel.RoleId = val.RoleId;
     // this.roleJobTitleList = [];
  }

  ngOnInit() {
    this.getQualifications();
   // if (localStorage.getItem('jobId') != null) {
    this.qualifications.subscribe(countries => {
      this.convertObservable = countries as Qualifications[];
    });
    this.qualificationList = this.appService.getaddedQualifications();
    this.subscription = this.appService.qualificationsChanged
    .subscribe(
    (qualifications: Qualifications[]) => {
      this.qualificationList = qualifications;
      }
    );
    this.addqualificationList = this.appService.getaddaddedQualifications();
    this.addedsubscription = this.appService.addqualificationsChanged
      .subscribe(
      (qualifications: PjEducationDetails[]) => {
        this.addqualificationList = qualifications;
        }
      );
    //  }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.addedsubscription.unsubscribe();
  }
}
