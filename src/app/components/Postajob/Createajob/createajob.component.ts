import { Component, OnInit, Inject, Input, HostListener ,AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { JobdetailsService } from '../../jobdetails/jobdetails.service';
import { GetJobDetailCustomer } from '../../../../models/GetJobDetailCustomer';
import { AppService } from '../../../app.service';
import { CategoryList, CustomerUsers, PrefLocation, PjTechnicalTeam, PjJobAccessTo, Roles, GetDomain, PjDomain, PjSkill, DiscResult, PjDisc, PjEducationDetails, Salary, DepartmentModel, PjDepartments, ClientModel, SkillPostData } from '../models/jobPostInfo';
import { EmploymentType } from '../../../../models/employmenttype.model';
import { InterviewType } from '../../../../models/interviewtype.model';
import { PjRole } from './Step2/Jobresponsibilities.component';
import { Jobskills } from '../../../../models/jobskills.model';
import { Qualifications } from '../../../../models/qualifications.model';
import { WorkAuthorization } from '../../../../models/workAuthorization';

@Component({
  selector: 'app-createajob',
  templateUrl: './createajob.component.html'
})
export class CreateajobComponent implements OnInit, AfterViewChecked {
@Input() jobId: number;
customerId: number;
customer: any;
val:any=true;
personType: DiscResult[] = [];
personTypes: DiscResult[] = [];
jobdetailscustomer: GetJobDetailCustomer;
eJcategory = new CategoryList();
ejEmploymentType = new EmploymentType();
ejSalaryType = new Salary(1, 'Hourly');
ejInterviewType = new InterviewType();
ejHiringManager = new CustomerUsers();
ejLocations = new PrefLocation();
ejLocationsList = [];
ejTechnicalTeamList: CustomerUsers[] = [];
// ejTechnicalTeam = new CustomerUsers();
ejTechnicalTeamIdList: PjTechnicalTeam[] = [];
eJclient = new ClientModel();
ejDepartmentList: DepartmentModel[] = [];
ejDepartmentIdList: PjDepartments[] = [];
// ejTechnicalTeamId = new PjTechnicalTeam();
ejRoleList: Roles[] = [];
// ejRole = new Roles();
// ejRoleId = new  PjRole();
ejRoleIdList: PjRole[] = [];
// ejDomainList: GetDomain[] = [];
ejDomainIdList: PjDomain[] = [];
// ejDomainId = new PjDomain();
// ejDomain = new GetDomain();
ejPrimarySkills: PjSkill[] = [];
skillList: SkillPostData[] = [];
ejSecondarySkills: PjSkill[] = [];
// ejSkills = new PjSkill();
// ejQualificationList: Qualifications[] = [];
ejQualificationIdList: PjEducationDetails[] = [];
// ejQualification = new Qualifications();
// ejPersonType = new DiscResult();
// ejPersonTypeList: DiscResult[] = [];
// ejPersonSingle = new PjDisc();
ejPersonSingleList: PjDisc[] = [];
editMode: string;
@HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
      event.returnValue = false;
}
  constructor(private route: ActivatedRoute,
    private router: Router, private jobdetailsservice: JobdetailsService, private appService: AppService) {
     // this.customerId = JSON.parse(sessionStorage.getItem('customerId'));
     this.customer = JSON.parse(sessionStorage.getItem('userData'));
     this.customerId = this.customer.CustomerId;
     //this.val = localStorage.getItem('Item');
     this.val = localStorage.getItem('Item') != null ? localStorage.getItem('Item'): "true";
    //  this.route.params.subscribe(params => {
    //   console.log(params);
    //   if (params['jobId'] > 0) {
    //     this.populatePersonType(params['jobId']);
    //     this.PopulateJobdetail(params['jobId']);
    //   }
    // });

    // OR

    // this.jobId = localStorage.getItem('jobId') != null ? parseInt(localStorage.getItem('jobId'), 10) : 0;
    // if (this.jobId > 0) {
    //   this.populatePersonType(this.jobId);
    //    this.PopulateJobdetail(this.jobId);
    // }
  }

  ngOnInit() {
    // localStorage.getItem('jobId');
    // this.jobId=1000163;
  //  if (this.jobId != null) {
  //     this.PopulateJobdetail(this.jobId);
  //  }

  }
  ngAfterViewChecked() {
    if(this.val == "true")
    {
      this.editMode = null;
    }
    else if (this.val == "false")
    {
      this.editMode = localStorage.getItem('EditMode');
    }
  }
  // populatePersonType(jobid) {


  // }
  back() {
    if (localStorage.getItem('EditViewJob') === null &&  localStorage.getItem('EditMode') === null) {
      this.router.navigateByUrl('/app-postajob');
    } else {
    this.router.navigate([localStorage.getItem('EditViewJob') != null ?
    this.ViewJobdetails() : '/app-manage-jobs/app-manage-load-joblist/1']);
    }
    // this.router.navigateByUrl('/app-postajob');
  }
  ViewJobdetails() {
    sessionStorage.setItem('jobId', JSON.stringify(localStorage.getItem('jobId')));
    this.router.navigateByUrl('app-view-jobdetails');
  }
  PopulateJobdetail (jobId) {
    // localStorage.removeItem('clientName');
    localStorage.setItem('jobId', jobId);
   localStorage.setItem('EditMode', 'Yes');

    const workAuthorization = new WorkAuthorization();
    return this.jobdetailsservice.getJobDetailCustomer(this.customerId, jobId).subscribe(res => {
      this.jobdetailscustomer = res;
      // Departments
      if (this.jobdetailscustomer.JobDepartments.length > 0) {
        for (const dept of this.jobdetailscustomer.JobDepartments) {
          const ejDepartment = new DepartmentModel();
          const ejDepartmentId = new PjDepartments();
          ejDepartment.DepartmentId = dept.DepartmentId;
          ejDepartment.CustomerDepartment = dept.DepartmentName;
            ejDepartmentId.DepartmentId = dept.DepartmentId;
            this.ejDepartmentList.push(ejDepartment);
            this.ejDepartmentIdList.push(ejDepartmentId);
        }
      }
      this.appService.departments = this.jobdetailscustomer.JobDepartments;
      this.appService.departmentsChanged.next(this.appService.departments);
      this.appService.addeddepartments = this.ejDepartmentIdList;
      this.appService.addeddepartmentsChanged.next(this.appService.addeddepartments);
      // Client model
      this.eJclient.ClientId = this.jobdetailscustomer.JobInfo.ClientId;
      this.eJclient.ClientName = this.jobdetailscustomer.JobInfo.ClientName;
      // // localStorage.setItem('clientName', this.eJclient.ClientName );
      this.appService.clientModel.next(this.eJclient);
      //Matchingcriteria
      // for (const team of this.jobdetailscustomer.MatchingCrieterias) {
        for ( var i= 0; i<this.jobdetailscustomer.MatchingCrieterias.length;i++) {
        const skill = new SkillPostData();
        skill.ParameerId = this.jobdetailscustomer.MatchingCrieterias[i].ParameerId;
        skill.Percentage = this.jobdetailscustomer.MatchingCrieterias[i].Percentage;
        this.skillList.push(skill);
      }
      // this.appService.skillDataList=(this.jobdetailscustomer.MatchingCrieterias);
        this.appService.skillDataList = [];
        this.appService.skillPostData = [];
        this.appService.skillDataList = this.skillList;
        this.appService.skillPostData = this.skillList;

      this.appService.skillDataListChanged.next(this.appService.skillDataList);

      // category
      this.eJcategory.Category = this.jobdetailscustomer.JobInfo.JobCategory;
      this.eJcategory.JobCategoryId = this.jobdetailscustomer.JobInfo.JobCategoryId;
      this.appService.jobcategory.next(this.eJcategory);
      this.appService.jobtitle.next(this.jobdetailscustomer.JobInfo.JobTitle);
      this.appService.videoProfile.next(this.jobdetailscustomer.JobInfo.VideoURL);
      this.appService.minExperience.next(parseInt(this.jobdetailscustomer.JobInfo.MinExperience, 10));
      this.appService.maxExperience.next(parseInt(this.jobdetailscustomer.JobInfo.MaxExperience, 10));
      this.appService.hasDescription.next(this.jobdetailscustomer.JobInfo.CompleteDescription);
      this.appService.description.next(this.jobdetailscustomer.JobInfo.JobDescription);
      this.appService.jobPosition.next(this.jobdetailscustomer.JobInfo.JobPositionId);
      this.appService.noofOpenings.next(this.jobdetailscustomer.JobInfo.NumberOfVacancies);
      if (this.jobdetailscustomer.JobInfo.SalaryTypeId === 2) {
      this.appService.minAnnualRate.next(parseInt(this.jobdetailscustomer.JobInfo.MinimumSalary, 10));
      this.appService.maxAnnualRate.next(parseInt(this.jobdetailscustomer.JobInfo.MaximumSalary, 10));
      } else if (this.jobdetailscustomer.JobInfo.SalaryTypeId === 1) {
      this.appService.minHourlyRate.next(parseInt(this.jobdetailscustomer.JobInfo.MinimumSalary, 10));
      this.appService.maxHourlyRate.next(parseInt(this.jobdetailscustomer.JobInfo.MaximumSalary, 10));
      }
      // this.appService.stepNumber.next(this.jobdetailscustomer.JobInfo.StepNumber);
      this.appService.updateStepNumber(this.jobdetailscustomer.JobInfo.StepNumber);
      this.appService.updateJobDraft(this.jobdetailscustomer.JobInfo.IsDrafted);

      this.ejEmploymentType.EmploymentType = this.jobdetailscustomer.JobInfo.EmploymentType;
      this.ejEmploymentType.EmploymentTypeId = this.jobdetailscustomer.JobInfo.EmploymentTypeId;
      this.appService.employmentType.next(this.ejEmploymentType);

      this.ejSalaryType.SalaryType = this.jobdetailscustomer.JobInfo.SalaryType;
      this.ejSalaryType.SalaryTypeId = this.jobdetailscustomer.JobInfo.SalaryTypeId;
      this.appService.salaryType.next(this.ejSalaryType);

      this.appService.contractDuration.next(this.jobdetailscustomer.JobInfo.ContractDuration);
      // this.jobdetailscustomer.ContractExtended= this.jobdetailscustomer.EmploymentTypeId==2 ? true : false;
      workAuthorization.WorkAuthorizationId = this.jobdetailscustomer.JobInfo.WorkAuthorizationId;
      workAuthorization.WorkAuthorizationType = this.jobdetailscustomer.JobInfo.WorkAuthorizationType;
      this.appService.contractExtension.next(workAuthorization);
      this.ejInterviewType.InterviewType = this.jobdetailscustomer.JobInfo.InterviewType;
      this.ejInterviewType.InterviewTypeId = this.jobdetailscustomer.JobInfo.HiringProcessId;
      this.appService.interviewType.next(this.ejInterviewType);
      this.ejHiringManager.FirstName = this.jobdetailscustomer.JobInfo.ReportingManager;
      this.ejHiringManager.UserId = this.jobdetailscustomer.JobInfo.HiringManagerId;
      this.appService.reportingManager.next(this.ejHiringManager);
      if (this.jobdetailscustomer.JobLocation.length > 0) {
        // this.jobdetailscustomer.JobLocation.forEach(element => {
        //   this.ejLocations.PreferredLocationId = element.PreferredLocationId;
        //   this.ejLocations.location = element.CityName;
        //   });
        for (const loc of this.jobdetailscustomer.JobLocation) {
          this.ejLocations.CityId = loc.CityId;
          this.ejLocations.location = loc.CityName;
          this.ejLocationsList.push(this.ejLocations);
        }
      }
      this.appService.location.next(this.ejLocations);
      //this.appService.JobLocations=this.ejLocationsList;
      if (this.jobdetailscustomer.TechnicalTeam.length > 0) {
        // this.jobdetailscustomer.TechnicalTeam.forEach(element => {
        //     this.ejTechnicalTeam.UserId = element.UserId;
        //     this.ejTechnicalTeam.FirstName = element.FirstName;
        //     this.ejTechnicalTeamId.UserId = element.UserId;
        //     this.ejTechnicalTeamList.push(this.ejTechnicalTeam);
        //     this.ejTechnicalTeamIdList.push(this.ejTechnicalTeamId);
        //   });
        for (const team of this.jobdetailscustomer.TechnicalTeam) {
          const ejTechnicalTeam = new CustomerUsers();
          const ejTechnicalTeamId = new PjTechnicalTeam();
          ejTechnicalTeam.UserId = team.UserId;
            ejTechnicalTeam.FirstName = team.FirstName;
            ejTechnicalTeamId.UserId = team.UserId;
            this.ejTechnicalTeamList.push(ejTechnicalTeam);
            this.ejTechnicalTeamIdList.push(ejTechnicalTeamId);

        }
      }
      this.appService.teammembers = this.jobdetailscustomer.TechnicalTeam;
      this.appService.teammembersChanged.next(this.appService.teammembers);
      this.appService.addedteammembers = this.ejTechnicalTeamIdList;
      this.appService.addedteammembersChanged.next(this.appService.addedteammembers); //  =new Subject<PjTechnicalTeam[]>();



      if (this.jobdetailscustomer.JobResponsibility.length > 0) {
        // this.jobdetailscustomer.JobResponsibility.forEach(element => {
        //     this.ejRole.RoleId = element.RoleId;
        //     this.ejRole.Role = element.RolesAndResponsibilities;
        //     this.ejRoleId.RoleId = element.RoleId;
        //     this.ejRoleList.push(this.ejRole);
        //     this.ejRoleIdList.push(this.ejRoleId);
        //   });
        for (const resp of this.jobdetailscustomer.JobResponsibility) {
          const ejRole = new Roles();
          const ejRoleId = new PjRole();
          ejRole.RoleId = resp.RoleId;
            ejRole.Role = resp.RolesAndResponsibilities;
            ejRoleId.RoleId = resp.RoleId;
            this.ejRoleList.push(ejRole);
            this.ejRoleIdList.push(ejRoleId);
        }
      }
      this.appService.responsibilities = this.ejRoleList;
      this.appService.responsibilitesChanged.next(this.appService.responsibilities); // = new Subject<Roles[]>();
      this.appService.addedresponsibilities = this.ejRoleIdList;
      this.appService.addedresponsibilitiesChanged.next(this.appService.addedresponsibilities ); // = new Subject<PjRole[]>();
      if (this.jobdetailscustomer.JobRequiredDomain.length > 0) {
        //  this.jobdetailscustomer.JobRequiredDomain.forEach(element => {
        //      this.ejDomain.DomainId = element.DomainId;
        //      this.ejDomain.DomainName = element.DomainName;
        //      this.ejDomainId.DomainId = element.DomainId;
        //      this.ejDomainList.push(this.ejDomain);
        //      this.ejDomainIdList.push(this.ejDomainId);
        //    });
           for (const dom of this.jobdetailscustomer.JobRequiredDomain) {
            const ejDomainId = new PjDomain();
          //  const ejDomain = new GetDomain();
          //  ejDomain.DomainId = dom.DomainId;
          //  ejDomain.DomainName = dom.DomainName;
          ejDomainId.MinimumExperience = dom.MinimumExperience;
          ejDomainId.MaximumExperience = dom.MaximumExperience;
            ejDomainId.DomainId = dom.DomainId;
          //  this.ejDomainList.push(ejDomain);
            this.ejDomainIdList.push(ejDomainId);
          }
       }
      this.appService.domain = this.jobdetailscustomer.JobRequiredDomain; // this.ejDomainList;
      this.appService.domainChanged.next(this.appService.domain); // = new Subject<GetDomain[]>();
      this.appService.adddomain = this.ejDomainIdList;
      this.appService.adddomainChanged.next(this.appService.adddomain); // = new Subject<PjDomain[]>();
      if (this.jobdetailscustomer.JobRequiredSkills.length > 0) {
        // this.jobdetailscustomer.JobRequiredSkills.forEach(element => {
        //   this.ejSkills.SkillName = element.SkillName;
        //   this.ejSkills.SkillType = element.SkillType;
        //   this.ejSkills.MinimumExp = element.MinimumExp;
        //   this.ejSkills.MaximumExp = element.MaximumExp;
        //   if (element.SkillType === true) {
        //   this.ejPrimarySkills.push(this.ejSkills);
        //   } else {
        //     this.ejSecondarySkills.push(this.ejSkills);
        //   }
        // });
        for (const skill of this.jobdetailscustomer.JobRequiredSkills) {
         const ejSkills = new PjSkill();
          ejSkills.SkillName = skill.SkillName;
          ejSkills.SkillType = skill.SkillType;
          ejSkills.MinimumExp = skill.MinimumExp;
          ejSkills.MaximumExp = skill.MaximumExp;
          if (skill.SkillType === true) {
          this.ejPrimarySkills.push(ejSkills);
          } else {
            this.ejSecondarySkills.push(ejSkills);
          }
        }
        }
        this.appService.primaryjobskills = this.ejPrimarySkills;
        this.appService.secondaryjobskills = this.ejSecondarySkills;
        this.appService.jobsecondaryskillsChanged.next(this.appService.secondaryjobskills); // = new Subject<Jobskills[]>(); // .closed();
        this.appService.jobprimaryskillsChanged.next(this.appService.primaryjobskills ); // = new Subject<Jobskills[]>();
        this.appService.selectedskilltype.next('');
        // Education Detail
        if (this.jobdetailscustomer.EducationDetails.length > 0) {
            // this.jobdetailscustomer.EducationDetails.forEach(element => {
            //     this.ejQualification.QualificationId = element.QualificationId;
            //     this.ejQualification.QualificationName = element.QualificationName;
            //     this.ejQualificationList.push(this.ejQualification);
            //   });
              for (const edu of this.jobdetailscustomer.EducationDetails) {
              //  const ejQualification = new Qualifications();
                const ejQualificationSingle = new PjEducationDetails();
              //  ejQualification.QualificationId = edu.QualificationId;
              //  ejQualification.QualificationName = edu.QualificationName;
                ejQualificationSingle.QualificationId = edu.QualificationId;
                ejQualificationSingle.IsActive = true;
               // this.ejQualificationList.push(ejQualification);
                this.ejQualificationIdList.push(ejQualificationSingle);
              }
        }
        this.appService.qualifications = this.jobdetailscustomer.EducationDetails; // this.ejQualificationList;
        this.appService.qualificationsChanged.next(this.appService.qualifications);
        this.appService.addqualifications = this.ejQualificationIdList;
        this.appService.addqualificationsChanged.next(this.appService.addqualifications);

        this.jobdetailsservice.getPersonType(jobId).subscribe(pType => {
          this.personType = pType;
          this.appService.getDisc().subscribe(pTypes => {
            this.personTypes = pTypes;
              this.personTypes.forEach(x => {
              x.checked = this.personType.some(y => y.DISCTestId === x.DISCTestId);
           });
        //   this.personTypes.map(employee => {
        //     return employee.checked = this.personType.some(cobay => cobay.DISCTestId === employee.DISCTestId);
        //  });
            if ( this.personType.length > 0) {
              // this.personType.forEach(element => {
              //     this.ejPersonType.DISCTestId = element.DISCTestId;
              //     this.ejPersonSingle.DiscTestId = element.DISCTestId;
              //     this.ejPersonType.Description = element.Description;
              //     this.ejPersonType.PersonType = element.PersonType;
              //     this.ejPersonType.SubType = element.SubType;
              //     this.ejPersonType.checked = element.checked;
              //     this.ejPersonTypeList.push(this.ejPersonType);
              //     this.ejPersonSingleList.push(this.ejPersonSingle);
              //   });
                for (const prType of this.personType) {
                 // const ejPersonType = new DiscResult();
                  const ejPersonSingle = new PjDisc();
                 // ejPersonType.DISCTestId = pType.DISCTestId;
                  ejPersonSingle.DiscTestId = prType.DISCTestId;
                 // ejPersonType.Description = pType.Description;
                 // ejPersonType.PersonType = pType.PersonType;
                 // ejPersonType.SubType = pType.SubType;
                 // ejPersonType.checked = pType.checked;
                 // this.ejPersonTypeList.push(ejPersonType);
                  this.ejPersonSingleList.push(ejPersonSingle);
                }
            }
            this.appService.personTypes = this.personTypes;
            this.appService.personTypeChanged.next(this.appService.personTypes);
            this.appService.personTypeSingle = this.ejPersonSingleList;
            this.appService.personTypeSingleChanged.next(this.appService.personTypeSingle);
          });

        });

      });
    }
  }

  // add from db end
  // this.appService.personTypes =[];
  // this.appService.personTypeChanged = new Subject<DiscResult[]>();
  // this.appService.personTypeSingle= [];
  // this.appService.personTypeSingleChanged = new Subject<PjDisc[]>();











  //  });
// }
// }

// JobRequiredDomain: JobRequiredDomain;
// JobRequiredSkills:JobRequiredSkills;
// JobResponsibility:JobResponsibility;
// EducationDetails: Qualifications;


// JobInfoId: number;
// JobId: number;
// JobPositionId: number;
// UserId:number;
// CustomerId: number;
// JobCategoryId: number;
// JobCategory: string;
// JobTitle: string;
// MinExperienceId: number;
// MaxExperienceId: number;
// MinExperience: number;
// MaxExperience: number;
// CompleteDescription:string;
// JobDescription: string;
// NumberOfVacancies: number;
// EmploymentTypeId: number;
// EmploymentType: string;
// SalaryTypeId: number;
// SalaryType: string;
// MinimumSalary: string;
// MaximumSalary: string;
// BonusOffered: string;

// ContractDuration: string;
// ContractExtended: string;
// PossibilityOfFullTime: string;
// AfterWhatDuration: string;
// InterviewType:string;
// HiringProcessId: number;
// HiringManagerId: number;
// ReportingManager: string;
// IsActive: boolean;
// StatusId: number;
// FirstName: string;
// LastName: string;
// EmailId: string;
// PhoneNumber: string;
// CompanyName: string;
// CompanyDescription:string;
// CompanyLogo: string;
// WebSite: string;
// FromTime: string;
// ToTime: string;
// TimeZoneId: string;
// TimeZone: string;
// PostedOn: string;
// ModifiedDate: string;
// PostedBy: string;
// ExpiryDate: string;
// SaveAsTemplate: string;
// RemoteWorkId: number;
// RemoteWorkType: string;
// Travel: string;
// TravelPercentage: string;
// IsPrivate: boolean;
// JobAccessTo: string;
// JobStatus: string;
// JobLocation: JobLocations;
// JobRequiredDomain: JobRequiredDomain;
// JobRequiredSkills:JobRequiredSkills;
// JobResponsibility:JobResponsibility;
// EducationDetails: Qualifications;
// //TechnicalTeam: CustomerUsers;
