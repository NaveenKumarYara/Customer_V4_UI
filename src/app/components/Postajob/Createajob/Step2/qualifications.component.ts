import { Component, OnInit, Inject, OnDestroy, ViewChild, ViewContainerRef  } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../../../../app.service';
// tslint:disable-next-line:import-blacklist
import { Subject, Observable } from 'rxjs';
import { FormControl, NgForm } from '@angular/forms';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';
import { Subscription } from 'rxjs/Subscription';

import { Qualifications, AddEducation } from '../../../../../models/qualifications.model';
import { GetKeyRole, KeyRole, PjEducationDetails } from '../../models/jobPostInfo';
import { saveNewKeyRoles, TOptions } from '../Step1/Jobprofile.component';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
@Component({
  selector: 'app-steps-step2-qualifications',
  templateUrl: './qualifications.component.html'
})
export class QualificationsComponent implements OnInit, OnDestroy  {
@ViewChild('eduForm') eduForm: any;
  private addedsubscription: Subscription;
  private subscriptions: Subscription;
  private subscription: Subscription;
  @ViewChild('roleForm') roleForm: NgForm;
  qualificationId: number;
  KeyResponses:any=[];
  public addTagKey: (name)=>void;
  keyLoading= false;
KeyCheck = false;
newKeyResponse = new saveNewKeyRoles();
domainlist: GetKeyRole[];
domains: Observable<GetKeyRole[]>;
getDomain = new GetKeyRole();
addkeyList: KeyRole[];
keyslist:any=[];
SelectKey:any;
domminval:any;
dommaxval:any;
selectedOption:TOptions = new TOptions(2, ' 3-5');
options = [
   new TOptions(1, '0-2' ),
   new TOptions(2, '3-5' ),
   new TOptions(3, '6-8' ),
   new TOptions(4, '9-11'),
   new TOptions(5, '12+')
];
MinimumExperience:number;
MaximumExperience:number;
  qualifications: Observable<Qualifications[]>;
  qualificationsnew : Qualifications[]=[];
  selectedqualificationName: any;
  qualificationtitleloading = false;
  selectedqualificationinput = new Subject<string>();
  qualificationList: Qualifications[];
  addqualificationList: PjEducationDetails[];
  convertObservable: Qualifications[];
  selectedQualification: Qualifications;
  newQualification = '';
  newqualificationId:  number ;
  TitleId:string;
  constructor(private route: ActivatedRoute,private toastr: ToastsManager, private _vcr: ViewContainerRef,
    private router: Router, private appService: AppService) {

  }

  // addEducation(val) {
  //   const  eduName = new AddEducation();
  //    eduName.QualificationId = val;
  //      localStorage.setItem('edu', val);
  //     return { name: eduName.QualificationId , tag: true };
  // }

  getValue(optionid) {
    if(optionid>0)
    {  
    this.selectedOption = this.options.filter((item)=> item.id == optionid)[0];
    if(this.selectedOption.id === 1)
    {
      this.MinimumExperience = 1;
      this.MaximumExperience = 2; 
    }
    else if(this.selectedOption.id === 2)
    {
      this.MinimumExperience = 3;
      this.MaximumExperience = 5; 
    }
    else if(this.selectedOption.id === 3)
    {
      this.MinimumExperience = 6;
      this.MaximumExperience = 8; 
    
    }
    else if(this.selectedOption.id === 4)
    {
      this.MinimumExperience = 9;
      this.MaximumExperience = 11;  
    }
    else if(this.selectedOption.id === 5)
    {
      this.MinimumExperience = 12;
      this.MaximumExperience = 12;  
    }
  }
  }

  deleteDomain(index: number) {
    this.appService.deletekeyRole(index);
  }

  public addQualification() {
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
    this.selectedqualificationName = 0; // new Qualifications();
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
 // this.selectedqualificationName = new Qualifications();
}
  }
  return false;
}
add3Dots(string, limit) {
  const dots = '...';
  if (string.length > limit) {
    string = string.substring(0, limit) + dots;
  }
    return string;
}
educationExists(education, list) {​
  const ids = list.map(o => o.QualificationId);
  const filtered = list.filter(({QualificationId}, index) => !ids.includes(QualificationId, index + 1));
  return filtered.some(function(elem) {
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
  this.selectedQualification = this.qualificationsnew.find(s => s.QualificationId === id);
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

  GetQualificationsnew()
  {
    this.appService.getQualificationDetails().subscribe(dat=>{
      this.qualificationsnew =dat;
    })
  }

  
  SetQualification(val) {
   // $('#responsibilitiesName').val(val.RolesAndResponsibilities);
    this.qualificationId = val;
    // this.roleModel.RoleId = val.RoleId;
     // this.roleJobTitleList = [];
  }

  addKeyRes(val4)
  {
    if(this.appService.jobtitle!=undefined)
    {
    const kres = new saveNewKeyRoles();
    kres.Name = val4;
    if(val4!=null && kres.Name.length> 2 && kres.Name.length<25)
    {
      this.keyLoading = true;
      this.NewKeyResponse(val4);
      return { Code: kres.Name , tag: true};
    }
    else
    {
      this.toastr.info('Please add Key Responsibilities between 3 and 25 Limit','Oops')
      setTimeout(() => {
        this.toastr.dismissToast;
    }, 3000);
    return false;
    }
   }
  }

  NewKeyResponse(val)
{
  this.newKeyResponse.Name = val;
  this.newKeyResponse.RoleId = Number(this.appService.jobtitleId);
  this.appService.AddKeyResponsibilities(this.newKeyResponse).subscribe(
    data => {
      if(data>0)
      {
        this.keyLoading = false;
        this.getDomain.DCode = val;
        this.getDomain.CustomerKeyResponsebility = data;
      }
    })
}

GetKeyRespones(Id)
{
  this.appService.GetJobKeyResponses(Id).subscribe(res3 => {
    if(res3.length>0)
    {
      this.KeyResponses = res3; 
    }
    else
    {
      this.appService.GetJobKeyResponses(1).subscribe(res4 => {
        this.KeyResponses = res4; 
      });
    }

});
}

domainmaxCalculation(exp)
{
  var m=exp.toString();
  if(m!=null)
  {
    var e = m.split('.');
     if(e.length > 1)
     {
      let s = (e[0] * 12) + +e[1];
      this.dommaxval= s;
      return s;
     }
     else
     {
       let s = e[0] * 12
       this.dommaxval= s;
       return s;
     }
  }
}

domainminCalculation(exp)
{
  var m=exp.toString();
  if(m!=null)
  {
    var e = m.split('.');
    if(e.length > 1)
     {
      let s = (e[0] * 12) + +e[1];
      this.domminval= s;
      return s;
     }
     else
     {
       let s = e[0] * 12
       this.domminval= s;
       return s;
     }
  }
}

numberOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)&& charCode !=46 ) {
    return false;
  }
  return true;

}

public addkeyRole() {
  if (this.roleForm.valid) {
    if (Number(this.MaximumExperience) < Number(this.MinimumExperience)) {
      this.toastr.info('Please provide valid Experience','Oh no!!!');
      return false;
 
  }
  if(this.MinimumExperience === undefined)
  {
    this.getValue(2);
  }

    this.domainmaxCalculation(this.MaximumExperience);
    this.MaximumExperience= this.dommaxval;
    this.domainminCalculation(this.MinimumExperience);
    this.MinimumExperience = this.domminval;

   

   this.getDomain.CustomerKeyMinExperienceId =  this.MinimumExperience;  
   this.getDomain.CustomerKeyMaxExperienceId =  this.MaximumExperience;
   
    debugger

    // if(this.getDomain.CustomerKeyMinExperienceId === 0 )
    // {
    //   this.toastr.error('Minimum experience should be greater than 0!', 'Oops!');
    //   setTimeout(() => {
    //       this.toastr.dismissToast;
    //   }, 3000);
    //    return false;
    // } 
    // if(this.getDomain.CustomerKeyMaxExperienceId === 0)
    // {
    //   this.toastr.error('Maximum experience should be greater than 0!', 'Oops!');
    //   setTimeout(() => {
    //       this.toastr.dismissToast;
    //   }, 3000);
    //    return false;
    // }
    if (this.getDomain.CustomerKeyMinExperienceId > this.getDomain.CustomerKeyMaxExperienceId && this.getDomain.CustomerKeyMinExperienceId != 0) {
      this.toastr.error('Minimum experience should not be greater than Maximum experience!', 'Oops!');
          setTimeout(() => {
              this.toastr.dismissToast;
          }, 3000);
          return false;
     }
     if(this.getDomain.CustomerKeyMinExperienceId == 0 || Number(this.MinimumExperience) == 0)
     {
     this.toastr.error('Maximum experience should be greater than 0!', 'Oops!');
     setTimeout(() => {
         this.toastr.dismissToast;
     }, 3000);
      return false;
     }
    else
    {
      if(this.getDomain.CustomerKeyResponsebility > 0 && this.getDomain.CustomerKeyMinExperienceId != 0)
      {
      this.appService.addKeyRole(this.getDomain);
      this.SelectKey=undefined;
      this.roleForm.resetForm();
      this.MaximumExperience = undefined;
      this.MinimumExperience = undefined;
      this.getDomain = new GetKeyRole();
      }
     
    }

}
  }

  changeValue(val)
  {
     this.getDomain.DCode = val.Code;
     this.getDomain.CustomerKeyResponsebility = val.KeyId;
  }

  ngOnInit() {
    this.getQualifications();
    this.addTagKey = (name4) => this.addKeyRes(name4);
    this.appService.currentjobtitleId.subscribe(x=>
      {
        this.TitleId=x;
        if(this.TitleId !=='')
        {
          this.GetKeyRespones(this.TitleId);
        }
        else
        {
          this.GetKeyRespones(1);
        }
      }
     
      );

    this.keyslist = this.appService.getKeyRoleList();
   
    this.subscription = this.appService.keyroleChanged
      .subscribe(
      (domain: GetKeyRole[]) => {
        this.keyslist = domain;
        }
      );

      if(this.keyslist.length>2)
      {
        this.KeyCheck = true;
      }
      else
      {
        this.KeyCheck = false;
      }

      this.addkeyList = this.appService.getAddedKeyRole();
      this.subscriptions = this.appService.addkeyroleChanged
        .subscribe(
        (domain: KeyRole[]) => {
          this.addkeyList = domain;
          }
        );
    this.GetQualificationsnew();
   // if (localStorage.getItem('jobId') != null) {
    // this.qualificationsnew.subscribe(countries => {
    //   this.convertObservable = countries as Qualifications[];
    // });
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
