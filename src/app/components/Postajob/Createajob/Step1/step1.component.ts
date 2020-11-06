import { Component, OnInit, Inject, ViewChild , HostListener,AfterViewChecked, ViewContainerRef} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../../../../app.service';
import { AlertService } from '../../../../shared/alerts/alerts.service';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import { JobcategoryComponent } from './Jobcategory.component';
import { JobdetailsComponent } from './Jobdetails.component';
import { JobprofileComponent } from './Jobprofile.component';
// import { JobskillsetComponent } from '../Step2/Jobskillset.component';
// import { JobResponsibilitiesComponent } from '../Step2/Jobresponsibilities.component';

declare var $: any;
declare var jQuery: any;

import {InsertJob, PjSkill, PjRole, PjDisc, PjDomain, PjEducationDetails, PjTechnicalTeam, PjJobAccessTo, PjDepartments} from '../../models/jobPostInfo';
import { CreateajobComponent } from '../createajob.component';
import { StepsComponent } from '../steps.component';
import { ClientsComponent } from './clients.component';
import { DepartmentsComponent } from './departments.component';
import { LocationwiseJobsComponent } from './locationwisejobs.component';
import { NoofopeningsComponent } from './noofopenings.component';
import { StepEmploymentTypeComponent } from './employment.component';
import { ImmigrationManagerComponent } from './immigration.component';
import { StepSalarysliderComponent } from './salaryslider.component';
import { StepContractExtensionComponent } from './contractextension.component';
import { StepContractDurationComponent } from './contractduration.component';
import { EmploymentType } from '../../../../../models/employmenttype.model';
@Component({
  selector: 'app-steps-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component implements OnInit, AfterViewChecked {
  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    event.returnValue = false;
}
  @ViewChild(JobcategoryComponent) jobCategory: JobcategoryComponent;
  @ViewChild(JobdetailsComponent) jobDetail: JobdetailsComponent;
  @ViewChild(JobprofileComponent) jobProfile: JobprofileComponent;
  // @ViewChild(JobResponsibilitiesComponent) jobResponsibility: JobResponsibilitiesComponent;
  // @ViewChild(JobskillsetComponent) jobSkills: JobskillsetComponent;
  @ViewChild(LocationwiseJobsComponent) locations: LocationwiseJobsComponent;
  @ViewChild(NoofopeningsComponent) openings: NoofopeningsComponent;
  @ViewChild(ClientsComponent) client: ClientsComponent;
  @ViewChild(DepartmentsComponent) department: DepartmentsComponent;
  @ViewChild(StepContractDurationComponent) contractDuration: StepContractDurationComponent;
  @ViewChild(StepContractExtensionComponent) contractExtension: StepContractExtensionComponent;
  @ViewChild(StepEmploymentTypeComponent) empType: StepEmploymentTypeComponent;
  @ViewChild(StepSalarysliderComponent) salSlider: StepSalarysliderComponent;
  // formData: any;
  // joblist = new InsertJob();
  disable1:any;
  disableLoc = false;
  isDrafted: boolean;
  customer: any;
  userId: any;
  customerId: any;
  jobIdExists: any;
  show = false;
  insertJob = new InsertJob();
  employmentType: EmploymentType;
  jobIdVals = [];
  pjSkill: PjSkill;
  pjRole: PjRole;
  scroll:boolean=false;
  pjDisc: PjDisc;
  pjDomain: PjDomain;
  pjEducationDetails: PjEducationDetails;
  pjTechnicalTeam: PjTechnicalTeam;
  pjJobAccessTo: PjJobAccessTo;
  complete: any;
  disable:any;
  pjSkillList: any = [];
  pjRoleList: any = [];
  pjDiscList: any = [];
  pjDomainList: any = [];
  pjEducationDetailsList: any = [];
  pjTechnicalTeamList: any = [];
  pjJobAccessToList: any = [];
  pjDepartments: PjDepartments[] = [];
  constructor(private route: ActivatedRoute, private toastr: ToastsManager, private _vcr: ViewContainerRef,
    private router: Router, private appService: AppService, private creteComponent: CreateajobComponent
    , private steps: StepsComponent, private alertService: AlertService) {
      this.customer = JSON.parse(sessionStorage.getItem('userData'));
      this.customerId = this.customer.CustomerId;
      this.disable =  localStorage.getItem('Item');
      this.complete = JSON.parse(localStorage.getItem('completed'));
      this.userId = this.customer.UserId;
      this.route.params.subscribe(params => {
        console.log(params);
        if (params['jobId'] > 0) {
          // this.populatePersonType(params['jobId']);
          // this.PopulateJobdetail(params['jobId']);
          this.creteComponent.PopulateJobdetail(params['jobId']);
          this.jobIdExists = params['jobId'];
        } else {
          this.jobIdExists = 0;
        }
        localStorage.setItem('hide', this.jobIdExists);
      });
      this.toastr.setRootViewContainerRef(_vcr);
  }
  ngOnInit() {
    this.alertService.clear();
    window.addEventListener('scroll', this.scrolling, true);
    // $(window).scroll(function(event) {
    //   function footer()
    //     {
    //         var scroll = $(window).scrollTop(); 
    //         if(scroll < 800)
    //         { 
    //             $(".poj-footer").fadeIn("slow").addClass("show");
    //         }
          
    //         else
    //         {
    //             $(".poj-footer").fadeOut("slow").removeClass("show");
    //         }
            
    //         clearTimeout($.data(this, 'scrollTimer'));
    //         $.data(this, 'scrollTimer', setTimeout(function() {
    //             if ($('.poj-footer').is(':hover')) {
    //             footer();
    //         }
    //             else
    //             {
    //               $(".poj-footer").fadeOut("slow");
    //             }
    //     }, 2000));
    //     }
    //     footer();
    // });
  }

  scrolling=(s)=>{
    let sc = s.target.scrollingElement.scrollTop;
    console.log();
    if(sc >=100){this.scroll=true}
    else{this.scroll=false}
  }

    changeEmploymentType() {
    this.appService.currentEmploymentType.subscribe(x => this.employmentType = x);
    if (this.employmentType.EmploymentTypeId === 2) {
      this.show = true;
    } else {
      this.show = false;
    }
  }

  postJob(step, exit?) {

    this.insertJob.CustomerId = this.customerId;
    this.insertJob.UserId = this.userId;
    // this.insertJob.JobPositionId = '';
   // this.insertJob.JobId = 0;
   if(this.disable == "true")
   {
    this.insertJob.JobId =  0;
   }
   else 
   {
    const res = localStorage.getItem('jobId');
    // if (res != null) {
    this.insertJob.JobId = res != null ? parseInt(res, 10) : 0;
   }
   // }this.jobCategory.selectedCategory.JobCategoryId !== undefined   &&
   if ((this.jobDetail.selectedTitle !== '' || null) // && (this.jobProfile.jobPositionId!== '' || null || undefined)
   && this.jobDetail.minExperience !== undefined && this.jobDetail.maxExperience !== undefined &&
  //  this.jobSkills.primaryjobskills.concat(this.jobSkills.secondaryjobskills).length > 0
      (this.locations.locationwisejobs.length>0)||(this.locations.locationwithpostions.length>0)
   ) {
   //  && this.jobResponsibility.roleIdList.length > 0
   if (this.jobDetail.minExperience > this.jobDetail.maxExperience) {
    this.toastr.error('minimum experience should not be greater than maximum experience!', 'Oops!');
        setTimeout(() => {
            this.toastr.dismissToast;
        }, 3000);
        return false;
   }
   if (this.jobProfile.hasCompleteDescription === true && this.jobProfile.jobDescription === '') {
    this.toastr.error('Please enter description!', 'Oops!');
    setTimeout(() => {
        this.toastr.dismissToast;
    }, 3000);
     return false;
   }
    //  && this.jobResponsibility.roleIdList.length > 0
   


    this.insertJob.JobTitle = this.jobDetail.selectedTitle;
    this.insertJob.MinExperienceId = this.jobDetail.minExperience;
    this.insertJob.MaxExperienceId = this.jobDetail.maxExperience;
    this.insertJob.CompleteDescription = this.jobProfile.hasCompleteDescription;
    this.insertJob.JobDescription = this.jobProfile.jobDescription;
    this.insertJob.JobPositionId = this.jobProfile.jobPositionId;
    this.appService.currentjobImp.subscribe(x=>this.insertJob.JobPriority=x);
    this.appService.currentjobDue.subscribe(x=>this.insertJob.JobDue=x);
    // moved to step1
    // this.insertJob.XmlSkills = this.jobSkills.primaryjobskills.concat(this.jobSkills.secondaryjobskills);
    // this.insertJob.XmlRoleId = this.jobResponsibility.roleIdList;
    this.appService.currentjobDueDate.subscribe(y=>this.insertJob.ExpiryDate=y);
    this.insertJob.NumberOfVacancies = this.locations.noOfOpenings?this.locations.noOfOpenings:1;
// Ending moved to step1
    //this.insertJob.ClientId = this.client.selectedClient.ClientId;
    this.insertJob.ClientId = 0;
    this.insertJob.ClientName = '';
    this.insertJob.EmploymentTypeId = this.empType.employmentType.EmploymentTypeId;
    this.insertJob.SalaryTypeId = this.salSlider.salaryTypeSelected.SalaryTypeId;
    localStorage.setItem('SalaryTypeId', this.salSlider.salaryTypeSelected.SalaryTypeId.toString());
    if (this.insertJob.EmploymentTypeId === 2) {
      this.insertJob.ContractExtended = true;
      this.insertJob.ContractDuration = this.contractDuration.contractDuration;
      this.insertJob.WorkAuthorizationId = this.contractExtension.contractExtension.WorkAuthorizationId;
    }
    this.insertJob.MatchingCrieterias = this.appService.skillPostData;
    this.insertJob.RemoteWorkId= this.appService.RemoteWork;

    
    // this.insertJob.ClientId = parseInt(localStorage.getItem('clientId'), 10);
    //this.insertJob.ClientName =  this.insertJob.ClientId > 0 ? '' : this.client.selectedClient.ClientName ;
    //this.insertJob.XmlDepartment = this.department.addedDepartmentList;
    //if (this.insertJob.XmlDepartment.length > 0) {
      //this.appService.departmentsChanged.next(this.department.departmentsList);
    //}
  //     if (localStorage.getItem('EditMode') != null && this.insertJob.JobId > 0) {
  //     this.appService.currentEmploymentType.subscribe((data) => {
  //       this.insertJob.EmploymentTypeId = data.EmploymentTypeId;
  //        // And he have data here too!
  //     });
  //     this.appService.currentSalaryTYpe.subscribe((data) => {
  //       this.insertJob.SalaryTypeId = data.SalaryTypeId; // And he have data here too!
  //     });
  //     if (this.insertJob.EmploymentTypeId === 2) {
  //       this.appService.currentContractExtension.subscribe((data) => {
  //         this.insertJob.WorkAuthorizationId = data.WorkAuthorizationId; // And he have data here too!
  //       });
  //       this.appService.currentContractDuration.subscribe((data) => {
  //         this.insertJob.ContractDuration = data; // And he have data here too!
  //       });
  //     }
  //   // this.insertJob.SalaryTypeId = this.insertJob.EmploymentTypeId;
  //   if (this.insertJob.SalaryTypeId === 2) {
  //     this.appService.currentMinRate.subscribe(x => this.insertJob.MinimumSalary = x.toString());
  //     this.appService.currentMaxRate.subscribe(x => this.insertJob.MaximumSalary = x.toString());
  //   } else if (this.insertJob.SalaryTypeId === 1) {
  //     // this.insertJob.ContractExtended = true;
  //     this.appService.currentMinHourlyRate.subscribe(x => this.insertJob.MinimumSalary = x.toString());
  //     this.appService.currentMaxHourlyRate.subscribe(x => this.insertJob.MaximumSalary = x.toString());
  //   }
  //   // this.insertJob.MinimumSalary = this.insertJob.SalaryTypeId==1?this.appService.currentMinRate.subscribe(x => this.insertJob.MinimumSalary = x) :this.appService.currentMinHourlyRate.subscribe(x => this.insertJob.MinimumSalary= x);
  //   // this.insertJob.MaximumSalary =  this.insertJob.SalaryTypeId==1?this.appService.currentMaxRate.subscribe(x => this.maxAnnualRate = x):    this.appService.currentMaxHourlyRate.subscribe(x => this.maxHourRate = x);
  //   this.appService.currentDraft.subscribe(x => this.insertJob.IsDrafted = x);
  //  // this.insertJob.StepNumber = 4;
  //     } 
  //     else {
  //     this.insertJob.EmploymentTypeId = 1;
  //   this.insertJob.SalaryTypeId = 1;
  //     this.insertJob.MinimumSalary = '1';
  //   this.insertJob.MaximumSalary = '200';
  //   this.insertJob.IsDrafted = true;

  //     }
  if (this.insertJob.SalaryTypeId === 2) {
    this.appService.currentMinRate.subscribe(x => this.insertJob.MinimumSalary = x.toString());
    this.appService.currentMaxRate.subscribe(x => this.insertJob.MaximumSalary = x.toString());
  } else if (this.insertJob.SalaryTypeId === 1) {
    this.appService.currentMinHourlyRate.subscribe(x => this.insertJob.MinimumSalary = x.toString());
    this.appService.currentMaxHourlyRate.subscribe(x => this.insertJob.MaximumSalary = x.toString());
}
  this.insertJob.HiringManagerId=this.userId;
  this.insertJob.SaveAsTemplate = 0;
this.insertJob.StepNumber = step;
//this.insertJob.RemoteWorkId=this.appService.RemoteWork;
if (this.appService.stepNumber.value <= step) {
this.appService.updateStepNumber(step);
}
if (this.appService.isDrafted.value != null) {
  this.appService.updateJobDraft(this.insertJob.IsDrafted);
  }
  // this.locations.locationwisejobs.forEach((e)=>{

  // })

  this.insertJob.JobCategoryId = 1;




  if(this.locations.locationwithpostions&&this.locations.locationwithpostions.length>0)
  {
    var res = new Promise((resolve, reject) => {
      this.locations.locationwithpostions.forEach((value, index, array) => {
        this.insertJob.Industry = "1";
        this.insertJob.PositionType = this.jobProfile.SelectDepartment.toString();
        this.insertJob.Category = this.jobProfile.selectedCategory.toString();
        this.insertJob.TitleInfo = this.jobProfile.selectedTitle.toString();
        this.insertJob.XmlKeyResponses = this.jobProfile.addkeyList;
        this.insertJob.PreferredLocationId = value.CityId.toString();
        this.insertJob.NumberOfVacancies = Number(value.Positons);

        this.appService.postjob(this.insertJob).subscribe(data => {
          if (data) {
            this.insertJob.JobId = data;
            this.jobIdVals.push(data);           
            localStorage.setItem('jobId', this.insertJob.JobId.toString());
            localStorage.setItem('JobId', this.insertJob.JobId.toString());
            localStorage.setItem('Item', false.toString());
    
            if (exit === 0) {
              this.router.navigate([localStorage.getItem('EditViewJob') != null ?
              this.ViewJobdetails(this.insertJob.JobId) : '/app-manage-jobs/app-manage-load-joblist/1']);
            }
            else {
            if (this.complete > 0) {
              this.steps.step2toggleClass(this.complete);
            } else {
              this.steps.step2toggleClass(1);
            }
            //this.router.navigate(['/app-createajob/app-steps-step2']);
          }
          }
        });       
          if (index === array.length -1)
          {
            resolve();
            this.appService.JobIds=this.jobIdVals;
          }          
      });
  });
  
  res.then(() => {
      this.router.navigate(['/app-createajob/app-steps-step2']); 
  });
    // let requests =  this.locations.locationwithpostions.map((item) => {
    //   this.insertJob.PreferredLocationId = item.CityId.toString();
    //   this.insertJob.NumberOfVacancies = item.Positons;
    //   debugger
    //   this.appService.postjob(this.insertJob).subscribe(data => {
    //     if (data) {
    //       this.insertJob.JobId = data;
    //       this.createJobId(data);
    //       debugger
    //       localStorage.setItem('jobId', this.insertJob.JobId.toString());
    //       localStorage.setItem('JobId', this.insertJob.JobId.toString());
    //       localStorage.setItem('Item', false.toString());
  
    //       if (exit === 0) {
    //         this.router.navigate([localStorage.getItem('EditViewJob') != null ?
    //         this.ViewJobdetails(this.insertJob.JobId) : '/app-manage-jobs/app-manage-load-joblist/1']);
    //       } else {
    //      // this.steps.step2isClicked = true;
    //       if (this.complete > 0) {
    //         this.steps.step2toggleClass(true);
    //       } else {
    //         this.steps.step2toggleClass(1);
    //       }
    //       //this.router.navigate(['/app-createajob/app-steps-step2']);
    //     }
    //     }
    //   });
    //   return new Promise((resolve) => {
    //     this.asyncFunction(item, resolve);
    //   });
    // })
    //Promise.all(requests).then(() => this.router.navigate(['/app-createajob/app-steps-step2']))
  }
  if(this.locations.locationwisejobs&&this.locations.locationwisejobs.length>0)
  {

    this.insertJob.Industry = "1";
    this.insertJob.PositionType = this.jobProfile.SelectDepartment.toString();
    this.insertJob.Category = this.jobProfile.selectedCategory.toString();
    this.insertJob.TitleInfo = this.jobProfile.selectedTitle.toString();
    this.insertJob.XmlKeyResponses = this.jobProfile.addkeyList;
    //this.insertJob.NumberOfVacancies = this.openings.noOfOpenings;
    this.insertJob.PreferredLocationId = this.locations.locationwisejobs.map(x=>x.CityId).join(",").toString();
    
    this.appService.postjob(this.insertJob).subscribe(data => {
      if (data) {
        this.insertJob.JobId = data;
        //this.createJobId(data);
        localStorage.setItem('jobId', this.insertJob.JobId.toString());
        localStorage.setItem('JobId', this.insertJob.JobId.toString());
        localStorage.setItem('Item', false.toString());

        if (exit === 0) {
          this.router.navigate([localStorage.getItem('EditViewJob') != null ?
          this.ViewJobdetails(this.insertJob.JobId) : '/app-manage-jobs/app-manage-load-joblist/1']);
        } else {
       // this.steps.step2isClicked = true;
        if (this.complete > 0) {
          this.steps.step2toggleClass(this.complete);
        } else {
          this.steps.step2toggleClass(1);
        }
        this.router.navigate(['/app-createajob/app-steps-step2']);
      }
      }
    });
  
  } 
  } 
 else 
 {
    // if ((this.openings.noOfOpenings === undefined || this.openings.noOfOpenings === 0 || this.openings.noOfOpenings === '' ) && this.locations.locationwithpostions.length==0){
    //   this.toastr.error('Please enter No of Positions!', 'Oops!');
    // }
    // if (this.jobProfile.jobPositionId === undefined || this.openings.noOfOpenings === '' || this.openings.noOfOpenings === null ) {
    //   this.toastr.error('Please enter Job Id!', 'Oops!');
    // }
    if (this.jobDetail.selectedTitle === '' || this.jobDetail.selectedTitle === undefined) {
    this.toastr.error('Please enter Job Title!', 'Oops!');
    }
    if (this.locations.locationwisejobs.length==0 || this.locations.locationwithpostions.length==0) {
      this.toastr.error('Please Select Location!', 'Oops!');
    }
    if (this.jobDetail.minExperience === undefined && this.jobDetail.maxExperience === undefined) {
      this.toastr.error('Please Select Experience!', 'Oops!');
    }
        setTimeout(() => {
            this.toastr.dismissToast;
        }, 2500);
    return false;
   }
  }

  createJobId(val)
  {
    this.jobIdVals.push(val);
    this.appService.JobIds=this.jobIdVals;
  }

  asyncFunction (item, cb) {
    setTimeout(() => {      
      console.log('done with', item);
      cb();
    }, 3000);
  }


  ViewJobdetails(jobId) {
    sessionStorage.setItem('jobId', JSON.stringify(jobId));
    this.router.navigateByUrl('app-view-jobdetails');
  }
  postJob1(step) {
    this.pjSkill = new PjSkill();
    this.pjSkill.MaximumExp = 10;
    this.pjSkill.MinimumExp = 3;
    this.pjSkill.SkillName = 'Javascript';
    this.pjSkill.SkillType = true;

    this.pjRole = new PjRole();
    this.pjRole.RoleId = 10;

    this.pjDisc = new PjDisc();
    this.pjDisc.DiscTestId = 1; // PjDisc;

    this.pjDomain = new PjDomain();
    this.pjDomain.Description = 'xxx';
    this.pjDomain.DomainId = 1;
    this.pjDomain.ExperienceRequired = true;
    this.pjDomain.MaximumExperience = 10;
    this.pjDomain.MinimumExperience = 1;

    this.pjEducationDetails = new PjEducationDetails();
    this.pjEducationDetails.IsActive = true; // PjEducationDetails;
    this.pjEducationDetails.QualificationId = 1;

    this.pjTechnicalTeam = new PjTechnicalTeam();
    this.pjTechnicalTeam.UserId = 17;

    this.pjJobAccessTo = new PjJobAccessTo();
    this.pjJobAccessTo.CustomerId = 1;
    this.pjJobAccessTo.UserId = 17;


    this.pjSkillList.push(this.pjSkill);
    this.pjRoleList.push(this.pjRole);
    this.pjDiscList.push(this.pjDisc);
    this.pjDomainList.push(this.pjDomain);
    this.pjEducationDetailsList.push(this.pjEducationDetails);
    this.pjTechnicalTeamList.push(this.pjTechnicalTeam);
    this.pjJobAccessToList.push(this.pjJobAccessTo);

    this.insertJob = new InsertJob();
    this.insertJob.JobId = 0;
    this.insertJob.JobPositionId = 'Microsoft-123';
    this.insertJob.UserId = 5;
    this.insertJob.CustomerId = 1;
    this.insertJob.JobCategoryId = 1;
    this.insertJob.JobTitle = 'Bigdata Developer';
    this.insertJob.MinExperienceId = 3;
    this.insertJob.MaxExperienceId = 5;
    this.insertJob.CompleteDescription = true;
    this.insertJob.JobDescription = 'Responsible for setup,';
    this.insertJob.NumberOfVacancies = 3;
    this.insertJob.PreferredLocationId = '1';
    this.insertJob.EmploymentTypeId = 1;
    this.insertJob.ContractDuration = null;
    this.insertJob.ContractExtended = true;
    this.insertJob.WorkAuthorizationId = 1;
    // this.insertJob.PossibilityOfFullTime = true;
    this.insertJob.AfterWhatDuration = '2 Months';
    this.insertJob.SalaryTypeId = 1;
    this.insertJob.MinimumSalary = '300';
    this.insertJob.MaximumSalary = '500';
    this.insertJob.HideSalary = false;
    this.insertJob.BonusOffered = true;
    this.insertJob.HiringProcessId = 1;
    this.insertJob.HiringManagerId = 5;
    this.insertJob.IsPrivate = true;
    //this.insertJob.ExpiryDate = new Date();
    this.insertJob.SaveAsTemplate = true;
    this.insertJob.StepNumber = 4;
    this.insertJob.IsDrafted = false;
    this.insertJob.XmlTechnicalTeam = this.pjTechnicalTeamList;
    this.insertJob.XmlAccessToUsers = this.pjJobAccessToList;
    this.insertJob.XmlSkills = this.pjSkillList;
    this.insertJob.XmlRoleId = this.pjRoleList;
    this.insertJob.XmlPersonType = this.pjDiscList;
    this.insertJob.XmlDomains = this.pjDomainList;
    this.insertJob.XmlQualifications = this.pjEducationDetailsList;



    this.appService.postjob(this.insertJob)
      .subscribe(
      data => {
        // this.expForm.reset();
        $('#expModalCO').removeClass('modalOpen');
        $('#expModalCO').addClass('modalClose');
        $('#professionalexperience').modal('hide');
        // $('#professionalexperience').find('input,textarea,select').val('');
        $('#Loding').hide('');
        // this.GetExperience();
      }); // error => { this._service.DebugMode(error); });

  }

  ngAfterViewChecked() {
    this.appService.currentDraft.subscribe(x => this.isDrafted = x);
    this.disable1= (localStorage.getItem('EditMode') != null && this.isDrafted === false) ? true : false;      
  }


}
