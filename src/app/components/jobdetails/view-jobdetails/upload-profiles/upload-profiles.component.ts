import { Component, OnInit, Inject, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { JobdetailsService } from '../../../jobdetails/jobdetails.service';
import { MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { SearchProfileDeatils } from '../../models/SearchProfileDeatils';
import { Profile } from '../../models/SearchProfileDeatils';
import { AlertService } from '../../../../shared/alerts/alerts.service';
import { BulkApply, XmlJobResponse } from './bulkApply';
import { AppService } from '../../../../app.service';
import { SettingsService } from '../../../../../settings/settings.service';
import { CustomerSubscription } from '../../../../../models/CustomerSubscription';
import { GetSubscriptionDetails } from '../../../../../models/GetSubscriptionDetails';
import { FileUploader } from 'ng2-file-upload';
import { CustStatusRes } from '../../models/ScheduleType';
import { ApiService } from '../../../../shared/services';
import { MatchingParameterDetails } from '../../models/jobdetailsprofile';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { setTheme } from 'ngx-bootstrap/utils';
import { promise } from 'protractor';
import { resolve } from 'url';
import { c } from '@angular/core/src/render3';
const URL = 'http://localhost:4200/fileupload/';
const http = require('https');
const fs = require('fs');
declare var $: any;
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-upload-profiles',
  templateUrl: './upload-profiles.component.html',
  styleUrls: ['./upload-profiles.component.css'],
  providers: [NgxSpinnerService, AlertService]
})
export class UploadProfilesComponent implements OnInit {
  emailCheck = false;
  selectedIndex = -1;
  selectedeIndex = -1;
  selectedcIndex = -1;
  TitleId:any=0;
  Inprogress : boolean = false;
  EditSkill:boolean=false;
  EditDomain:boolean=false;
  EditE:boolean=false;
  EditBD:boolean=false;
  EditT:boolean=false;
  EditKey:boolean=false;
  selectedskill  = -1;
  selectedDomain  = -1;
  selectedkey  = -1;
  editCertification:boolean=false;
  fileUploadForm: FormGroup;
  moreShow: boolean = false;
  totalFile: number = 0;
  pprofiles = new processProfiles();
  searchprofilesFrom: FormGroup;
  searchprofiles: Profile[];
  isPublic: any = false;
  Jskills:any=[];
  JMskills:any=[];
  FitDetails: any;
  Jdomains:any=[];
  JMdomains:any=[];
  public profileStatus: ProfileStatus[] = [];
  formDAtaList: Array<FormData> = [];
  formData = new FormData();
  fileCount: number = 0;
  editWorkExperience:boolean=false;
  successCount: number = 0;
  issueCount: number = 0;
  ProfileIds:any = [];
  subdetails= new CustomerSubscription();
  sdetails= new GetSubscriptionDetails();
  profiles: Profile[];
  searchprocess: any;
  Count: any;
  CProfileId:any;
  expMonthExp: number;
  expYearExp: number;
  public certForm: FormGroup;
  filteredProviders = [];
  filteredCertificate = [];
  Id:any;
  roleFitDetails :any;
  provide:Provider;
  isLoading = false;
  cisLoading = false;
  profileDetails:ProfileDetails;
  education:ProfileEducation[]=[];
  experience:ProfileExperience[]=[];
  certificate:ProfileCertification[]=[];
  achievements:any=[];
  eduForm: FormGroup;
  CandidateExp: CandidateExp = new CandidateExp();
  selectedFileNames: string[] = [];
  totalSelectedDoc: number = 0;
  inviteinfo = new InviteInfo();
  bulkApply = new BulkApply();
  xmlJobResponse: XmlJobResponse[] = [];
  loaddata = true;
  degreeList: any = [];
  years: any = [];
  uploadRes:any = [];
  uploadResponse: UploadResponse[] = [];
  tempuploadResponse: UploadResponse[] = [];
  displayprofiles: any;
  skillfitcheck: any = [];
  Skill = {
  labels: [],
  datasets: [
    {
      label: "Skill Fit",
      data: [],

      backgroundColor: ["rgb(255, 99, 132)"],
    },
  ],
};
insertrole = new InsertRole();
Job = {
  labels: ["Experience Fit", "Role Fit", "Job Hopping", "Education"],
  datasets: [
    {
      label: "Job Fit",
      fill: true,
      backgroundColor: "rgb(54, 162, 235, 0.2)",
      borderColor: "#4472C4",
      pointBackgroundColor: "#4472C4",
      pointBorderColor: "#4472C4",
      pointHoverBackgroundColor: "#4472C4",
      borderWidth: 5,
      pointBorderWidth: 5,
      pointHoverBorderColor: "rgba(179,181,198,1)",
      data: [],
    },
  ],
};
  searchString: any;
  SearchList: any = [];
  norecord: any = false;
  isFullDisplayed: any = false;
  email: any;
  jobdetailscustomer:any;
  editEducation:boolean=false;
  customerId = null;
  // userId: number;
  customerName = null;
  slice: number;
  proForm:FormGroup;
  expForm:FormGroup;
  showThis: string;
  open: boolean = true;
  showMenu: boolean;
  matchingParameterDetails = new MatchingParameterDetails();
  matchingParameterData = new MatchingParameterDetails();
  selectedMenuItem: any;
  selectedSubMenuItem: any;
  sideBarMenu: any = [];
  saveUsername: boolean;
  editPersonalDetails: boolean;
  selectedFiles: any= [];
  selecteeJobId: any;
  isProcessing: boolean;
  processedProfiles: any=[];
  processedProfile: any=[];
  haveProfiles: boolean=false;
  currentRecordIndex: number;
  selectedCandidate: any;
  uploader:FileUploader;
  statuscheck : CustStatusRes;
  status:any=[];
  checks:any=[];
  showInput:string;
  processed:boolean=false;
  Cfile:File;
  @ViewChild('divClick') divClick: ElementRef;
  JobdId: any;
  IndustryId: string;
  Title: string ='';
  CoreId: string;
  CategoryId: string;
  addkeyList: any=[];
  // tslint:disable-next-line:max-line-length
  constructor(private appService: AppService,private _service: ApiService,private _snackBar: MatSnackBar, private spinner: NgxSpinnerService, private toastr: ToastsManager, private _vcr: ViewContainerRef, private fb: FormBuilder, private jobdetailsservice: JobdetailsService, @Inject(MAT_DIALOG_DATA) public data: any, private alertService: AlertService, private settingsService: SettingsService) {
    this.selectedFileNames = [];

      setTheme('bs3');
    this.customerName = JSON.parse(sessionStorage.getItem('userData'));
    this.displayprofiles = JSON.parse(localStorage.getItem('DisplayUpload'));
    this.customerId = this.customerName.CustomerId;
    // this.userId = this.customerName.UserId;
    this.toastr.setRootViewContainerRef(_vcr);
    this.uploader = new FileUploader({
      url: URL,
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      allowedFileType: ['pdf','doc'],
      
      formatDataFunction: async (item) => {
        return new Promise( (resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date()
          });
        });
      }
    });
  }
  SaveProfile()
  {
    if(this.proForm.valid)
    {
    this.proForm.value.Address1 = ' ';
    this._service.PostService(this.proForm.value,'ProfileAPI/api/InsertUserProfile').subscribe(
      data1 => {
        this.editPersonalDetails = false;
       if(data1>=0)
       {
         this.GetProfileDetails(data1);
          this.proForm.reset();

      
       }
      },
        error => console.log(error));
    }
  }

  SaveExperience()
  {
    if(this.expForm.valid)
    {
   
    this.expForm.value.StartDate = new Date(this.expForm.value.StartDate).toDateString();
    this.expForm.value.EndDate = new Date(this.expForm.value.EndDate).toDateString();
    this._service.PostService(this.expForm.value,'ProfileAPI/api/SaveExperience').subscribe(
      data => {
       
       if(data>=0)
       {
         this.editWorkExperience = false;  
         this.GetExperience(this.expForm.value.ProfileId);     
         this.expForm.reset();
       }
      },
        error => console.log(error));
    }
  }

  SaveEducation() {
    if(this.eduForm.valid)
    {
    this.eduForm.value.QualificationId = parseInt(this.eduForm.value.QualificationId, 10);
    this.eduForm.value.FromYear = parseInt(this.eduForm.value.FromYear, 10);
    this.eduForm.value.ToYear = parseInt(this.eduForm.value.ToYear, 10);
    this._service.PostService(this.eduForm.value,'ProfileAPI/api/SaveEducation').subscribe(
      data => {
       if(data>=0)
       {
        this.editEducation = false;
        this.GetEducation(this.eduForm.value.ProfileId);
        this.eduForm.reset();
       }
      },
        error => console.log(error));
      }
     
  }

  returnFn(user: Provider): number | undefined {
    return user ? user.ProviderId : undefined;
  }

  displayFn1(user: string) {
    if (user) { return user; }
  }

  reset() {
    this.certForm.reset();
  }

  setProvider(val)
  {
    this.Id = val.ProviderId;
  }

  SaveCertification()
  {
   if(this.certForm.valid)
   {
      this.certForm.value.YearOfAchievement = "1/1/" + this.certForm.value.YearOfAchievement;   
      this.certForm.value.ProviderId = this.certForm.value.ProviderId ? this.certForm.value.ProviderId : this.Id;
      this._service.PostService(this.certForm.value,'ProfileAPI/api/SaveCertification').subscribe(
      data => {
       if(data>=0)
       {
         this.editCertification=false;        
         this.GetCertification(this.certForm.value.ProfileId);
         this.certForm.reset();
       }
      },
        error => console.log(error));
      }
     
  }

  dateLessThan(from: string, to: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let f = group.controls[from];
      let t = group.controls[to];
      let message = 'Please ensure that the End Date is greater than or equal to the Start Date';
      let action = 'Info';
      if (f.value != '' && f.value != '' && f.value > t.value) {
        return {
          dates: //Swal("Please ensure that the To Year is greater than or equal to the From Year.")
        
          this._snackBar.open(message, action, {
              duration: 2000,
              verticalPosition: 'top',
              horizontalPosition: 'end'              
          })
        };

      }
      return {};
    }
  }

  EditProfile(pro)
  {
    this.editPersonalDetails = true;  
      this.proForm = this.fb.group({
        'ProfileId': [pro.ProfileId, Validators.required],
        'ProfileTitle': [pro.ProfileTitle, Validators.nullValidator],
        'FirstName': [pro.FirstName, Validators.nullValidator],
        'LastName': [pro.LastName, Validators.nullValidator],
        'Email': [pro.UserName,[Validators.required, Validators.email]],
        'MobilePhone': [pro.MobilePhone, Validators.nullValidator],
        'Address1': [' ', Validators.nullValidator],
        'CityName': ['', Validators.nullValidator],
        'StateName': ['', Validators.nullValidator],
        'StateId': [0, Validators.nullValidator],
        'ZipCode': ['', Validators.nullValidator]   
      })   
    

  }

  editExp(dat,e)
  {
    this.selectedIndex = e;   
    this.editWorkExperience = true;
    this.expForm = this.fb.group({
      'UserId': [0, Validators.compose([Validators.nullValidator])],
      'ExperienceId': [dat.ExperienceId, Validators.compose([Validators.nullValidator])],
      'ProfileId': [dat.ProfileId, Validators.required],
      'JobTitle': [dat.JobTitle, Validators.required],
      'JobLocation': [dat.JobLocation, Validators.nullValidator],
      'CompanyName': [dat.CompanyName, Validators.nullValidator],
      'StartDate': [new Date(dat.StartDate), Validators.nullValidator],
      'EndDate': [new Date(dat.EndDate), Validators.nullValidator],
      'Description': [dat.Description, Validators.nullValidator],
      'Achievements': [null, Validators.nullValidator],
      'ToolsUsed': [null, Validators.nullValidator],
      'TechnologiesUsed': [null, Validators.nullValidator],
      'CurrentEmployer': [false, Validators.nullValidator],
      'Roles': [null, Validators.nullValidator],
      'FreeLanceEmployer': [false, Validators.nullValidator]
    });
  }



  
  EditEducation(edu,f) {
    this.selectedeIndex = f;   
    this.editEducation = true;
    this.eduForm = this.fb.group({
      'UserId': [0, Validators.nullValidator],
      'EducationId': [edu.EducationId, Validators.compose([Validators.nullValidator])],
      'ProfileId': [edu.ProfileId, Validators.nullValidator],
      'QualificationId': [edu.QualificationId, Validators.nullValidator],
      'Specialization': [edu.Specialization, Validators.required],
      'Description': [edu.Description, Validators.nullValidator],
      'InstituteOrUniversity': [edu.InstituteORUniversity, Validators.nullValidator],
      'EducationTypeId': [1, Validators.nullValidator],
      'Location': [edu.Location, Validators.compose([Validators.nullValidator, Validators.minLength(3), Validators.maxLength(100)])],
      'FromYear': [edu.FromYear, Validators.nullValidator],
      'ToYear': [edu.ToYear, Validators.nullValidator],
      'TranscriptsAvailable': [false, Validators.nullValidator]
    },
      { validator: this.dateLessThan('FromYear', 'ToYear') });
   
  }

  EditCert(c,cc) {
    this.editCertification = true;
    this.selectedcIndex = cc;
    this.certForm = this.fb.group({
      'UserId': [0,Validators.compose([Validators.required])],
      'CertificationId': [c.CertificationId, Validators.nullValidator],
      'ProfileId': [c.ProfileId, Validators.nullValidator],
      'ProviderId': [c.ProviderId, Validators.nullValidator],
      'IsCertified': [c.IsCertified, Validators.nullValidator],
      'CertificationName': [c.CertificationName, Validators.nullValidator],     
      'IssuedBy': [c.IssuedBy, Validators.nullValidator],
      'YearOfAchievement': [c.YearOfAchievement, Validators.nullValidator],
      'LifeTime': [c.LifeTime, Validators.nullValidator],
      'ImageUrl': [c.ImageUrl, Validators.nullValidator]
    });
  }

  GetQualifications()
  {
    this.appService.getQualificationDetails()
    .subscribe(
      data => {
        this.degreeList = data;
      });
  }


  edits(sk)
  {
    this.EditSkill = true;
    this.selectedskill = sk;
  }

  editd(s)
  {
    this.EditDomain = true;
    this.selectedDomain = s;
  }

  
  edite()
  {
    this.EditE = true
  }

  editBd()
  {
    this.EditBD = true
  }

  editt()
  {
    this.EditT = true
  }

  editk(g)
  {
    this.EditKey = true;
    this.selectedkey = g;
  }


  PopulateJobdetail() {
    return this.jobdetailsservice.getJobDetailCustomer(this.customerId, this.data.jobId).subscribe(res => {
      this.jobdetailscustomer = res;
    });
}
  getCandidateExperience(job,Pid) {

    this._service.GetService('JobsAPI/api/GetCandidateExperiance?JobId=' + job + '&ProfileId=', Pid)
      // this._service.GetService('JobsAPI/api/GetMissingDomains', JobData)
      .subscribe(
        data => {
          if (1) {
            this.CandidateExp = data;  
            
            if (this.CandidateExp != null) {
              this.expMonthExp = (this.CandidateExp.Experience % 12);// this.CandidateExp.ExpInMonths;
              this.expYearExp = Math.round((this.CandidateExp.Experience / 12) - ((this.CandidateExp.Experience % 12) / 12));// this.CandidateExp.ExpInYears;
            }       
          }
        }, error => { this._service.DebugMode(error); });

  }

  SaveRoleFit() {

    this.insertrole.ProfileId = this.CProfileId;
    this.insertrole.ProfileTitle = this.Title;
    this.insertrole.Industry = this.IndustryId;
    this.insertrole.PositionType = this.CoreId;
    this.insertrole.Category = this.CategoryId;
    this.insertrole.TitleInfo = this.TitleId;
    this.insertrole.XmlKeyResponses = this.addkeyList;
    return this._service.PostService(this.insertrole, 'ProfileAPI/api/InsertCandidateProfileRoleFit').subscribe(data => {
      //location.reload();
      this.insertrole = new InsertRole();
      this.Title = '';
      this.IndustryId = '';
      this.CoreId = '';
      this.CategoryId = '';
      this.GetProfileRoleFitDetails();
    })
  }

  updateBD(bd)
  {
    this.IndustryId = this.roleFitDetails.CustomerJobIndustries[0].CustomerIndustryId;
    this.CoreId = this.roleFitDetails.CustomerJobPositionType[0].JobPositionTypeId;
    this.CategoryId = this.roleFitDetails.CustomerJobCategory[0].CustomerCategoryId;
    this.insertrole.ProfileId = this.CProfileId;
    this.insertrole.ProfileTitle = this.Title;
    this.insertrole.Industry = this.IndustryId;
    this.insertrole.PositionType = this.CoreId;
    this.insertrole.Category = this.CategoryId;
    this.insertrole.TitleInfo = this.TitleId;
    this.insertrole.XmlKeyResponses = this.addkeyList;
    return this._service.PostService(this.insertrole, 'ProfileAPI/api/InsertCandidateProfileRoleFit').subscribe(data => {
      //location.reload();
      this.EditBD = false;
      this.insertrole = new InsertRole();
      this.GetProfileRoleFitDetails();
      this.GetMatchingPercentage(this.CProfileId);
      this.GetJobRequiredDomain(this.CProfileId);
      this.GetCandidateJobFitResult(this.CProfileId);
    })
  }

  updateTitle(t)
  {
    this.IndustryId = this.roleFitDetails.CustomerJobIndustries[0].CustomerIndustryId;
    this.CoreId = this.roleFitDetails.CustomerJobPositionType[0].JobPositionTypeId;
    this.CategoryId = this.roleFitDetails.CustomerJobCategory[0].CustomerCategoryId;
    this.Title = this.roleFitDetails.CustomerJobTitle[0].JobTitle;
    this.TitleId = this.roleFitDetails.CustomerJobTitle[0].RoleId;
    this.insertrole.ProfileId = this.CProfileId;
    this.insertrole.ProfileTitle = this.Title;
    this.insertrole.Industry = this.IndustryId;
    this.insertrole.PositionType = this.CoreId;
    this.insertrole.Category = this.CategoryId;
    this.insertrole.TitleInfo = this.TitleId;
    this.insertrole.XmlKeyResponses = this.addkeyList;
    return this._service.PostService(this.insertrole, 'ProfileAPI/api/InsertCandidateProfileRoleFit').subscribe(data => {
      //location.reload();
      this.EditT = false;
      this.insertrole = new InsertRole();
      this.GetProfileRoleFitDetails();
      this.GetCandidateJobFitResult(this.CProfileId);
      this.GetMatchingPercentage(this.CProfileId);
      this.GetJobRequiredDomain(this.CProfileId);
     
    })
  }

  updateKey()
  {
    this.roleFitDetails.CustomerJobKeyResponses.forEach(k=>
      {
        const ejKeyResponsebility = new KeyRole();
        ejKeyResponsebility.KeyResponsebilityId =  k.CustomerKeyResponsebility;
        ejKeyResponsebility.KeyMinExperienceId =  0;
        ejKeyResponsebility.KeyMaxExperienceId =  k.CustomerKeyMaxExperienceId;
        this.addkeyList.push(ejKeyResponsebility);
      })
   
   
    this.IndustryId = this.roleFitDetails.CustomerJobIndustries[0].CustomerIndustryId;
    this.CoreId = this.roleFitDetails.CustomerJobPositionType[0].JobPositionTypeId;
    this.CategoryId = this.roleFitDetails.CustomerJobCategory[0].CustomerCategoryId;
    this.Title = this.roleFitDetails.CustomerJobTitle[0].JobTitle;
    this.TitleId = this.roleFitDetails.CustomerJobTitle[0].RoleId;
    this.insertrole.ProfileId = this.CProfileId;
    this.insertrole.ProfileTitle = this.Title;
    this.insertrole.Industry = this.IndustryId;
    this.insertrole.PositionType = this.CoreId;
    this.insertrole.Category = this.CategoryId;
    this.insertrole.TitleInfo = this.TitleId;
    this.insertrole.XmlKeyResponses = this.addkeyList;
    return this._service.PostService(this.insertrole, 'ProfileAPI/api/InsertCandidateProfileRoleFit').subscribe(data => {
      //location.reload();
      this.EditKey = false;
      this.insertrole = new InsertRole();
      this.GetProfileRoleFitDetails();
      this.GetMatchingPercentage(this.CProfileId);
      this.GetJobRequiredDomain(this.CProfileId);
      this.GetCandidateJobFitResult(this.CProfileId);
      this.addkeyList = [];
      this.Title = '';
      this.TitleId = '';
      this.IndustryId = '';
      this.CoreId = '';
      this.CategoryId = '';
    })
  }

  updateExp(e) {
    var UpdatedMissingExperience = {
      "Id": 0,
      "ProfileId": this.CProfileId,
      "JobId": this.data.JobId,
      "CreatedOn": Date.now(),
      "CreatedBy": this.customerName.UserId,
      "ModifiedOn": Date.now(),
      "ModifiedBy": this.customerName.UserId,
      "IsUpdated": 1
    };
    var CandidateTotalExp = {
      "TotalExp": e,
      "ProfileId": this.CProfileId,
    };
    this._service.PostService(CandidateTotalExp, 'JobsAPI/api/UpdateTotalExperience')
      .subscribe(da => {
        if (da === true) {
          this.EditE = false;
          this.GetMatchingPercentage(this.CProfileId);
          this.GetProfileDetails(this.CProfileId);
          this.GetCandidateJobFitResult(this.CProfileId);
          this.getCandidateExperience(this.data.jobId,this.CProfileId);
        }
        this._service.PostService(UpdatedMissingExperience, 'JobsAPI/api/UpdateCandidateExperiance')
          .subscribe(dt => {
            if (da === true) {
              this.GetMatchingPercentage(this.CProfileId);
              this.GetJobRequiredDomain(this.CProfileId);
              this.GetCandidateJobFitResult(this.CProfileId);
              this.getCandidateExperience(this.data.jobId,this.CProfileId);
            }
          });
      });

  }

  updateList(D) {
    // alert("dsd");
    var domainData = {
      "CandidateDomainId": D.CandidateDomainId,
      "DomainId": D.DomainId,
      "DomainIdSpecified": true,
      "ExpInMonths": D.ExpInMonths,
      "ExpInYears": D.JExpInYears,
      "LastUsed": '2022',
      "ProfileId": this.CProfileId,
      "UserId": 0
    };
    const jobId = this.data.jobId;
    this._service.PostService(domainData, 'ProfileAPI/api/InsertDomain')
      .subscribe(dat => {
        if (dat>=0) {
          this.EditDomain = false;
          this.GetMatchingPercentage(this.CProfileId);
          this.GetJobRequiredDomain(this.CProfileId);
          this.GetCandidateJobFitResult(this.CProfileId);
          this.GetJobMatchedDomain(this.CProfileId);
          }
        })

      
      }
    

  updateSkill(skill)
  {
    var SkillData = {
      "ExpInMonths": skill.ExpInMonths,
      "ExpInYears": skill.JExpInYears,
      "LastUsed": "2022",
      "ProfileId": this.CProfileId,
      "SkillName": skill.Code,
      "SkillRating": "5",
      "SkillSetId": skill.CandidateSkillId,
      "UserId": 0
    };
    const jobId = this.data.jobId;
    this._service.PostService(SkillData, 'ProfileAPI/api/InsertSkillSet')
      .subscribe(data => {
     if(data === 0)
     {
       this.EditSkill = false;
       this.GetMatchingPercentage(this.CProfileId);
       this.GetJobMatchedSkills(this.CProfileId);
       this.GetJobRequiredSkills(this.CProfileId);

     }
      });
  }

  public getYears() {
    const date = new Date();
    const x = date.getFullYear();
    this.years = [];
    for (let i = x - 40; i <= x; i++) {
        this.years.push(i);
    }
    return this.years;
}


  ngOnInit() {
    this.searchprofilesFrom = this.fb.group({
      'CustomerId': [this.customerName.CustomerId, Validators.required],
      'JobId': ['', Validators.required],
      'SearchString': ['', Validators.nullValidator],
      'Experience': ['', Validators.nullValidator],
      'Location': ['', Validators.nullValidator],
      'QualificationId': [0, Validators.nullValidator],
      'PageNumber': [1, Validators.nullValidator],
      'NumberOfRows': [1000, Validators.nullValidator],
    });
    this.proForm = this.fb.group({
      'ProfileId': [0, Validators.nullValidator],
      'ProfileTitle': ['', Validators.nullValidator],
      'FirstName': ['', Validators.nullValidator],
      'LastName': ['', Validators.nullValidator],
      'Email': ['', [Validators.required, Validators.email]],
      'MobilePhone': ['', Validators.nullValidator],
      'CityName': ['', Validators.nullValidator],
      'StateName': ['', Validators.nullValidator],
      'StateId': [0, Validators.nullValidator],
      'ZipCode': ['', Validators.nullValidator]   
    })
    this.expForm = this.fb.group({
      'UserId': [0, Validators.compose([Validators.nullValidator])],
      'ExperienceId': [0, Validators.compose([Validators.nullValidator])],
      'ProfileId': [0, Validators.nullValidator],
      'JobTitle': ['', Validators.required],
      'JobLocation': ['', Validators.nullValidator],
      'CompanyName': ['', Validators.required],
      // 'StartDate': [formatDate(this.post.StartDate, 'MM-yyyy', 'en'), [Validators.required]],
      // 'EndDate': [formatDate(this.post.EndDate, 'MM-yyyy', 'en'), [Validators.required]],
      'StartDate': ['', Validators.nullValidator],
      'EndDate': ['', Validators.nullValidator],
      'Description': ['', Validators.nullValidator],
      'Achievements': [null, Validators.nullValidator],
      'ToolsUsed': [null, Validators.nullValidator],
      'TechnologiesUsed': [null, Validators.nullValidator],
      'CurrentEmployer': [false, Validators.nullValidator],
      'Roles': [null, Validators.nullValidator],
      'FreeLanceEmployer': [false, Validators.nullValidator]
    },
     { validator: this.dateLessThan('StartDate', 'EndDate') 
     }
    );
    this.eduForm = this.fb.group({
      'UserId': ['', Validators.compose([Validators.nullValidator])],
      'EducationId': [0, Validators.compose([Validators.nullValidator])],
      'ProfileId': [this.data.profileId, Validators.required],
      'QualificationId': [0, Validators.nullValidator],
      'Specialization': ['', Validators.nullValidator],
      'Description': ['', Validators.nullValidator],
      'InstituteOrUniversity': ['', Validators.nullValidator],
      'EducationTypeId': [1, Validators.nullValidator],
      'Location': [null, Validators.compose([Validators.nullValidator, Validators.minLength(3), Validators.maxLength(100)])],
      'FromYear': ['', Validators.required],
      'ToYear': ['', Validators.required],
      'TranscriptsAvailable': [false, Validators.nullValidator]
    },
    { validator: this.dateLessThan('FromYear', 'ToYear') })

    this.certForm = this.fb.group({
      'UserId': [0, Validators.nullValidator],
      'ProfileId': [this.data.ProfileId, Validators.required],
      'CertificationId': [0, Validators.nullValidator],
      'ProviderId': [0, Validators.required],
      'IsCertified': [true, Validators.required],
      'CertificationName': ['', Validators.required],
      'IssuedBy': ['', Validators.required],
      'YearOfAchievement': ['',Validators.nullValidator],
      'LifeTime': ['',Validators.nullValidator],
      'ImageUrl': ['', Validators.nullValidator]
    })
  
    

    
    this.fileUploadForm = this.fb.group({
      'userId': [this.customerName.UserId, Validators.required],
      'Url': ['', Validators.nullValidator],
      'FileName': ['', Validators.nullValidator],
      'UserName': ['', Validators.nullValidator],
      'ResumeFile': ['', Validators.compose([Validators.required])],
      'FileExtension': ['', Validators.nullValidator],
      'JobId': [null, Validators.nullValidator],
      'CustomerName': [this.customerName.FirstName + ' ' + this.customerName.LastName, Validators.nullValidator],
      'EmailCheck': ['', Validators.nullValidator]
    });
    this.SearchProfiles();
    this.haveProfiles = false;
    this.alertService.clear();
    this.getYears();
    this.GetQualifications();
    this.PopulateJobdetail();
    this.GetCustomerSubscription();
    /** */
    $(function () {
      $('[name="list1"]').change(function () {
        if ($(this).is(':checked')) {
          $(this).parent().parent().children('.hover-h').addClass('dblock');
        } else if ($(this).prop('checked', false)) {
          $(this).parent().parent().children('.hover-h').removeClass('dblock');
        }
      });
    });
    /** */
    this.showThis = "JobFit"
  }


  moreContent() {
    this.moreShow = !this.moreShow;
  }

GetCustomerSubscription()
{
  return this.appService.GetCustomerSubscription(this.customerName.UserId).subscribe(res => {
    if(res!=null)
    {
      this.subdetails = res;
      this.GetSubscriptionDetails(res.subscriptionId);
      // this.GetInvoiceEstimates();
      // this.GetUnbilledChargeDetails();
    }

});
}

editPesonalDetailHandler() {
  this.editPersonalDetails = true;  
}

closePersonalDetailHandler() {
  this.editPersonalDetails = false;
}
  
selectedItem(item) {
  this.selectedMenuItem = item;
}

selectedSubItem(item) {
  if (this.selectedSubMenuItem === item) {
    this.selectedSubMenuItem = '';
  } else {
    this.selectedSubMenuItem = item;
  }
}



onFileSelected(event) {
  if (this.uploader.queue.length > 0) {
    for (let i = 0; i < this.uploader.queue.length; i++) {
      let file: File = this.uploader.queue[i]._file;
       this.selectedFiles.push(file);
    }
  }
}


    
  
  


selectPreviousCandidate() {
  this.currentRecordIndex = this.currentRecordIndex - 1;

  if (this.currentRecordIndex < 0) {
    this.currentRecordIndex = 0;
  }
  this.selectedCandidate = this.processedProfiles[this.currentRecordIndex];
  this.GetProfileId(this.uploadRes[this.currentRecordIndex].MailId);
}

selectNextCandidate() {
  this.currentRecordIndex = this.currentRecordIndex + 1;

  if (this.currentRecordIndex > this.processedProfiles.length) {
    this.currentRecordIndex = this.processedProfiles.length - 1;
  }
  this.selectedCandidate = this.processedProfiles[this.currentRecordIndex];
  this.GetProfileId(this.uploadRes[this.currentRecordIndex].MailId);
  
}


SaveCandidate()
{
  this.selectedCandidate = this.processedProfiles[this.currentRecordIndex];
  return this._service.GetService('IdentityAPI/api/GetProfileIdFromEmail?email=',this.selectedCandidate.ContactInformation.EmailAddresses[0]).subscribe(
    ProfileId=>{
    //this.GetPercent(Id);
    this.CProfileId = ProfileId;
    this.GetAllProfileDetails(ProfileId)
    this.uploadRes.find(obj => {
      if(obj != null)
      {
        if(obj.ProfileId === ProfileId)
        {
          return obj.ProfileId === ProfileId;
        }
      
      }
    
    });
    let objIndex = this.uploadRes.findIndex((obj => obj.ProfileId == ProfileId));
    this.uploadRes[objIndex].ResumeStatus = "Requested";
  })
}




GetSubscriptionDetails(sid)
{
  return this.appService.GetSubscriptionDetails(sid).subscribe(res1 => {
    if(res1!=null)
    {
      this.sdetails = res1;
    }
    else
    {
      this.sdetails.planId='0';
    }
  });
}


  SetSearch(val) {
    this.SearchList = [];
    this.searchString = val;
  }

  searchProfile(value) {
    this.searchString = value;
    this.SearchProfiles();
  }

  GetSearchText(value) {
    return this.jobdetailsservice.GetAutoSearch(value, this.customerName.CustomerId)
      .subscribe(data => {
        if (data.length > 0) {
          this.SearchList = data;
        } else {
          this.SearchList = [];
        }
      },

        error => {
          this.SearchList = [];
        });

  }
  // getData(){
  //   //debugger
  //   if(this.profiles.length < this.searchprofiles.length){
  //     let len = this.profiles.length;
  //     for(let i=len;i<=len+9;i++)
  //     {
  //       this.profiles.push(this.searchprofiles[i]);
  //     }
  //   }
  //   else{
  //     this.isFullDisplayed = true;
  // }

  // }

GetProfileStatus(mail)
 {
   return this.jobdetailsservice.GetCustomerStatus(mail,this.data.JobId,this.customerId,true).subscribe(
     dta=>{
       //this.statuscheck = dta;
       let c = dta.Status;
       this.checks.push(c);
     }
   )
 }
  
 getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
      if ((encoded.length % 4) > 0) {
        encoded += '='.repeat(4 - (encoded.length % 4));
      }
      resolve(encoded);
    };
    reader.onerror = error => reject(error);
  });
}



  processResumes() {

   
    if(this.selectedFiles.length>0)
    {
      this.isProcessing = true;
      this.getFileDetails();
    }
    
  }

//  Check()
// {
//   this.processedProfile.forEach(fs => {
//     let f = fs.sfile;
//     let val = fs.profiles;
//     let request = '';
//     this.tempuploadResponse = [];
//     this.selectedFileNames = [];
//     this.formDAtaList = [];
//     var formData = new FormData();
//     this.fileUploadForm.value.Url = '';
//     this.fileUploadForm.value.FileName = f.name;
//     this.fileUploadForm.value.FileExtension = f.type;
//     this.fileUploadForm.value.UserName = null;
//     this.fileUploadForm.value.JobId = this.data.jobId;
//     this.fileUploadForm.value.EmailCheck = this.emailCheck;
//     // document.getElementById('jobId').value; //this.jobid;
//     // this.fileUploadForm.value.ResumeFile = e.target.files[0];
//     if (this.fileUploadForm.value !== '') {
//       request = JSON.stringify(this.fileUploadForm.value);
//     }
//     var formData = new FormData();
//     var temp = new UploadResponse()
//     this.selectedFileNames.push(f.name);
//     temp.FirstName = f.name;
//     temp.DocId = fs;
//     temp.ResumeStatus = null;
//     this.tempuploadResponse.push(temp);
//     formData.append('ResumeFile', f);
//     formData.append('Model', request);
//     formData.append('SModel', JSON.stringify(val));
//     formData.append('CustomerId', this.customerId);
//     formData.append('DocId',this.selectedFiles.length.toString());//JSON.stringify(i.toString()));
//     formData.append('IsPublic', this.isPublic.toString());//JSON.stringify(this.isPublic.toString()));
//     formData.append("Upload", this.isPublic.toString());
//     formData.append("SendMail", this.isPublic.toString());
//     this.formDAtaList.push(formData);
//     new Promise<void>((resolve) => {
//    this.jobdetailsservice.byteStorage1(formData, 'api/ParseResumeSovren').subscribe(async dat => {
//      if(dat){
//         this.uploadResponse = dat[0];
//         this.uploadRes.push(this.uploadResponse);
//         if(this.uploadRes.length === this.processedProfile.length)
//         {
//           this.uploader.queue = [];
//           this.GetProfileId(this.selectedCandidate.ContactInformation.EmailAddresses[0]);
//         }
//         }
//         await resolve();
       
//        })
      
       
//       })
   
     
  

   
//   })
 
  
// }

// Getval()
// {
//   if(this.uploadRes.length === this.processedProfile.length)
//   {
//     this.uploader.queue = [];
//     this.GetProfileId(this.selectedCandidate.ContactInformation.EmailAddresses[0]);
//   }

 
// }

GetMatchingPercentage(profileId): any {
 
   this.jobdetailsservice.GetJobMatchingCriteriaEndPoint(profileId,this.data.jobId).subscribe((res) => {
     this.matchingParameterDetails = res;
     this.matchingParameterData.Role = this.matchingParameterDetails.Role;
     this.matchingParameterData.Jobfit_Total = this.matchingParameterDetails.Jobfit_Total;
     this.matchingParameterData.Personalityfit_Total = this.matchingParameterDetails.Personalityfit_Total;
     this.matchingParameterData.Skillfit_Total = this.matchingParameterDetails.Skillfit_Total;
     this.matchingParameterData.Personalityfit = this.matchingParameterDetails.Personalityfit;
     this.matchingParameterData.CultureFit = this.matchingParameterDetails.CultureFit;
     this.matchingParameterData.SkillFit = this.matchingParameterDetails.SkillFit;
     this.matchingParameterData.JobFit = this.matchingParameterDetails.JobFit;
   });
   return this.matchingParameterDetails;
  
 }

 GetCandidateSkillFitResult(ProfileId,jobId) {
  this._service.GetService('ProfileAPI/api/GetSkillFitDetailsInfo?profileId=', ProfileId + '&jobId=' + jobId)
    .subscribe(
      data3 => {
        
        let unique_c = [];
        data3.forEach((c) => {
          if (!unique_c.includes(c)) {
            unique_c.push(c);
          }
        });
        this.skillfitcheck = unique_c  ;
        if (this.skillfitcheck.length > 0) {
          this.skillfitcheck.forEach((a) => {
            var color = Math.floor(0x1000000 * Math.random()).toString(16);
            var r = '#' + ('000000' + color).slice(-6);
            this.Skill.datasets[0].backgroundColor.push(r);
            this.Skill.labels.push(a.SkillName);
            this.Skill.datasets[0].data.push(a.SkillFit.toFixed(2));          
          })
        }    
      })
}

GetCandidateJobFitResult(Pid) {
  this._service.GetService('ProfileAPI/api/GetJobFitDetailsInfo?profileId=', Pid + '&jobId=' + this.data.jobId)
    .subscribe(
      data2 => {
        if (data2 != null) {
          var exp;
          if (data2.ExperienceFit == null) {
            exp = 0;
          }
          else {
            exp = data2.ExperienceFit;
          }
          this.Job.datasets[0].data = [exp, data2.RoleFit, data2.JobHopping, data2.Education];
        }
        this.FitDetails = data2.JobFit;

      })
}

getColor(arr, i) {
  return arr[i];
}

GetProfileId(email)
{
  return this._service.GetService('IdentityAPI/api/GetProfileIdFromEmail?email=',email).subscribe(
    ProfileId=>{
    //this.GetPercent(Id);
    this.CProfileId = ProfileId;
    this.GetAllProfileDetails(ProfileId)
    this.uploadRes.find(obj => {
      if(obj != null)
      {
        if(obj.ProfileId === ProfileId)
        {
          return obj.ProfileId === ProfileId;
        }
      
      }
    
    });
  })
}


GetAllProfileDetails(ProfileId)
{
              //  this.CProfileId = ProfileId;
                this.GetProfileDetails(ProfileId);
                this.getCandidateExperience(this.data.jobId,ProfileId);
                // this.GetProfileSummaryDetails(ProfileId);
                // this.GetSkills(ProfileId);
                // this.GetDomains(ProfileId);
                this.GetEducation(ProfileId);
                this.GetCertification(ProfileId);
                this.GetExperience(ProfileId);
                this.GetAchievements(ProfileId);
                this.GetMatchingPercentage(ProfileId);
                this.GetJobRequiredSkills(ProfileId);
                this.GetJobRequiredDomain(ProfileId);
                
                this.GetProfileRoleFitDetails();
                this.CProfileId = ProfileId;
                this.uploadRes.find(obj => {
                  if(obj != null)
                  {
                    if(obj.ProfileId === ProfileId)
                    {
                      return obj.ProfileId === ProfileId;
                    }
                  
                  }
                
                });
                // this.GetProjects(ProfileId);
}


GetProfileDetails(Id)
{
  
  return this._service.GetService('ProfileAPI/api/GetProfileDetailsAndAddress?profileId=',Id).subscribe(
    ta=>{
    //this.GetPercent(Id);
    this.profileDetails = ta[0];
    let objIndex = this.uploadRes.findIndex((obj => obj.ProfileId == Id));
    this.uploadRes[objIndex].FirstName = this.profileDetails.FirstName;
    this.uploadRes[objIndex].LastName = this.profileDetails.LastName;
    this.uploadRes[objIndex].ProfileTitle = this.profileDetails.ProfileTitle;
    this.uploadRes[objIndex].ResumeStatus;  
    this.selectedCandidate =  this.processedProfiles.find((p => p == objIndex)); 
    this.currentRecordIndex = objIndex;
    // this.profileEdit = true;
    //this.flashcardInputExpanded = true;
  })
}



GetProfileRoleFitDetails() {
  return this._service.GetService('ProfileAPI/api/JobCandidateProfileForRoleFit?jobId='+this.data.jobId +'&profileId=', this.CProfileId)
    .subscribe(
      data => {
        this.roleFitDetails = data;
        }
      );
}

GetExperience(Id)
{
  return this._service.GetService('ProfileAPI/api/GetExperience?profileId=',Id + '&freeLance=false').subscribe(
    experiences=>{
    this.experience = experiences;
    //this.GetPercent(PId);
  })
}

GetEducation(Id)
{
  return this._service.GetService('ProfileAPI/api/GetEducation?profileId=',Id).subscribe(
    educations=>{
    this.education = educations;
    //this.GetPercent(PId);
  })
}

GetCertification(Id)
{
  return this._service.GetService('ProfileAPI/api/GetCertification?profileId=',Id).subscribe(
   certificates=>{
    this.certificate = certificates;
    //this.GetPercent(PId);
  })
}

GetAchievements(Id)
{
  return this._service.GetService('ProfileAPI/api/GetProfileAchievements?profileId=',Id).subscribe(
    achievement=>{
     this.achievements = achievement;
     //this.GetPercent(PId);
   })
}

GetJobRequiredSkills(PId) {
  const jobId = this.data.jobId;
  this.GetCandidateSkillFitResult(PId,this.data.jobId);
  return this._service.GetService('ProfileAPI/api/GetCandidateMissingSkills?JobId=' + jobId + '&ProfileId=', PId).subscribe(skills => {
    if(skills.length > 0)
    {
      this.Jskills =  skills.filter(
        (element, i) => i === skills.indexOf(element)
      );
    }
    else
    {
      this.Jskills = [];
      this.GetJobMatchedSkills(PId);
     
    }
  })
}

GetJobMatchedSkills(PId) {
  const jobId = this.data.jobId;
  return this._service.GetService('ProfileAPI/api/GetCandidateMatchedSkills?JobId=' + jobId + '&ProfileId=', PId).subscribe(skills => {
    this.JMskills =  skills;
  })
}

GetJobRequiredDomain(PId) {
  const jobId = this.data.jobId;
  return this._service.GetService('ProfileAPI/api/GetCandidateMissingDomains?jobId='+ jobId+ '&ProfileId=', PId).subscribe(domain => {
    this.GetCandidateJobFitResult(PId);
    if(domain.length>0)
    {
      this.Jdomains = domain; 
    }
    else
    {
       this.Jdomains = [];
       this.GetJobMatchedDomain(PId);
    }
   
   })
 }

 onOpenCalendar(container) {
  container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
  };
  container.setViewMode('month');
}

 GetJobMatchedDomain(PId) {
  const jobId = this.data.jobId;
  return this._service.GetService('ProfileAPI/api/GetCandidateMatchedDomains?jobId='+ jobId+ '&ProfileId=', PId).subscribe(domain => {
      this.JMdomains = domain; 
      this.GetCandidateJobFitResult(PId); 
   })
 }

  

  getFileDetails() {
    this.fileCount = 0;
    this.successCount = 0;
    this.issueCount = 0;
    this.tempuploadResponse = [];
    this.selectedFileNames = [];
    this.formDAtaList = [];
    this.profileStatus = [];
    // this.spinner.show();
   
    this.totalFile = this.selectedFiles.length;
    this.totalSelectedDoc = this.selectedFiles.length;
      this.slice = 100 / this.selectedFiles.length;
      for (let i = 0; i < this.selectedFiles.length; i++) {
        let request = '';
        var formData = new FormData();
        this.fileUploadForm.value.Url = '';
        this.fileUploadForm.value.FileName = this.selectedFiles[i].name;
        this.fileUploadForm.value.FileExtension = this.selectedFiles[i].type;
        this.fileUploadForm.value.UserName = null;
        this.fileUploadForm.value.JobId = this.data.jobId;
        this.fileUploadForm.value.EmailCheck = this.emailCheck;
        // document.getElementById('jobId').value; //this.jobid;
        // this.fileUploadForm.value.ResumeFile = e.target.files[0];
        if (this.fileUploadForm.value !== '') {
          request = JSON.stringify(this.fileUploadForm.value);
        }
        var Profdata = new ProfileStatus();
        Profdata.id = i;
        Profdata.percentage = (this.selectedFiles.length - i - 1) * this.slice;
        if (!Profdata.percentage)
          Profdata.percentage = 5;
        Profdata.text = "Parsing the Document......";
        Profdata.id = i;
        this.profileStatus.push(Profdata);
        formData = new FormData();
        var temp = new UploadResponse()
        this.selectedFileNames.push(this.selectedFiles[i].name);
        temp.FirstName = this.selectedFiles[i].name;
        temp.DocId = i;
        temp.ResumeStatus = null;
        this.tempuploadResponse.push(temp);
        formData.append('ResumeFile', this.selectedFiles[i]);
        formData.append('Model', request);
        formData.append('CustomerId', this.customerId);
        formData.append('DocId', i.toString());//JSON.stringify(i.toString()));
        formData.append('IsPublic', this.isPublic.toString());//JSON.stringify(this.isPublic.toString()));
        formData.append("Upload", this.isPublic.toString());
        formData.append("SendMail", this.isPublic.toString());

        this.formDAtaList.push(formData);
        this.uploadMultiple(formData, i);

      }
    
  }

  DeleteRecord(i)
  {
    this.uploader.removeFromQueue(i);
    this.selectedFiles.splice(i, 1);
  }

  uploadMultiple(formData, DocId) {
    if(this.sdetails.planId !==  "enterprise" || this.sdetails.planId === undefined )
    {
      this.jobdetailsservice.byteStorage(formData, 'ProfileApi/api/ParseResumeMakePublic').subscribe(data => {  // 'api/JobDescriptionParse'
        if (data) {
          this.uploadResponse = data;
          this.processedProfiles.push(this.uploadResponse[0].ResumeData);
          this.uploadRes.push(this.uploadResponse[0]);
          if (this.uploadResponse[0].ResumeStatus != null) {
            // this.profileStatus[this.fileCount].percentage =this.profileStatus[this.fileCount].percentage  + this.slice;
            this.fileCount = this.fileCount + 1;
            // alert(this.fileCount);
            // setTimeout(() => {
            for (var i = 0; i < this.totalFile; i++) {
              if (data[0].DocId != this.profileStatus[i].id)
                this.profileStatus[i].percentage = this.profileStatus[i].percentage + 5;
              else
                this.profileStatus[i].percentage = 100;
              if (this.tempuploadResponse[i].DocId == data[0].DocId)
                this.tempuploadResponse[i] = data[0];
            }
  
            if (data[0].ResumeStatus == 'Successful') {
              this.successCount = this.successCount + 1;
              // this.toastr.success('Uploaded successfully', 'Success');
            } else {
              this.issueCount = this.issueCount + 1;
              // this.toastr.info('Partially Uploaded', 'Success');
            }
          } else {
            for (var i = 0; i < this.totalFile; i++) {
              if (data[0].DocId != this.profileStatus[i].id)
                this.profileStatus[i].percentage = this.profileStatus[i].percentage + 5;
              else
                this.profileStatus[i].percentage = 100;
              if (this.tempuploadResponse[i].DocId == data[0].DocId)
                this.tempuploadResponse[i].ResumeStatus = "Error";
              // this.tempuploadResponse[i].ResumeStatus="Error";
              // error in uploading profiles!
            }
  
          }
          if(this.selectedFiles.length === this.uploadRes.length)
          {
            this.isProcessing = false; 
            this.haveProfiles = true;
            this.currentRecordIndex =0;
            this.selectedCandidate = this.processedProfiles[this.currentRecordIndex];  
            this.GetAllProfileDetails(this.uploadResponse[0].ProfileId);
          }

         
          // setTimeout(() => {
          //   this.toastr.dismissToast;
          // }, 3000);
        }
        //   else if(data === null){
        //     this.toastr.warning('Email Not Exists', 'Oops!');
        //     this.spinner.hide();
        //     setTimeout(() => {
        //      this.toastr.dismissToast;
        //  }, 3000);
        // //  return false;
        //   }
      }, (error: any) => {
  
        for (var i = 0; i < this.totalFile; i++) {
          if (DocId != this.profileStatus[i].id)
            this.profileStatus[i].percentage = this.profileStatus[i].percentage + 5;
          else
            this.profileStatus[i].percentage = 100;
          if (this.tempuploadResponse[i].DocId == DocId)
            this.tempuploadResponse[i].ResumeStatus = "Error";
          // this.tempuploadResponse[i].ResumeStatus="Error";
          // error in uploading profiles!
        }
        // this.toastr.error('error in uploading profiles!', 'Oops!');
        // setTimeout(() => {
        //   this.toastr.dismissToast;
        // }, 3000);
        // this.spinner.hide();
        // console.log('download error:', error);
        // console.log('download i:', i);
      });
    }
    if(this.sdetails.planId ===  "enterprise")
    {
      this.jobdetailsservice.byteStorage(formData, 'ProfileApi/api/ParseResume').subscribe(data => {  // 'api/JobDescriptionParse'
        if (data) {
          this.uploadResponse = data;
          this.processedProfiles.push(this.uploadResponse[0].ResumeData);
          this.uploadRes.push(this.uploadResponse[0]);
          if(this.selectedFiles.length === this.uploadRes.length)
          {
            this.isProcessing = false; 
            this.haveProfiles = true;
            this.currentRecordIndex =0;
            this.selectedCandidate = this.processedProfiles[this.currentRecordIndex];  
            this.GetAllProfileDetails(this.uploadResponse[0].ProfileId);
          }
          if (this.uploadResponse[0].ResumeStatus != null) {
            // this.profileStatus[this.fileCount].percentage =this.profileStatus[this.fileCount].percentage  + this.slice;
            this.fileCount = this.fileCount + 1;
            // alert(this.fileCount);
            // setTimeout(() => {
            for (var i = 0; i < this.totalFile; i++) {
              if (data[0].DocId != this.profileStatus[i].id)
                this.profileStatus[i].percentage = this.profileStatus[i].percentage + 5;
              else
                this.profileStatus[i].percentage = 100;
              if (this.tempuploadResponse[i].DocId == data[0].DocId)
                this.tempuploadResponse[i] = data[0];
            }
  
            if (data[0].ResumeStatus == 'Successful') {
              this.successCount = this.successCount + 1;
              // this.toastr.success('Uploaded successfully', 'Success');
            } else {
              this.issueCount = this.issueCount + 1;
              // this.toastr.info('Partially Uploaded', 'Success');
            }
          } else {
            for (var i = 0; i < this.totalFile; i++) {
              if (data[0].DocId != this.profileStatus[i].id)
                this.profileStatus[i].percentage = this.profileStatus[i].percentage + 5;
              else
                this.profileStatus[i].percentage = 100;
              if (this.tempuploadResponse[i].DocId == data[0].DocId)
                this.tempuploadResponse[i].ResumeStatus = "Error";
              // this.tempuploadResponse[i].ResumeStatus="Error";
              // error in uploading profiles!
            }
  
          }                 
  
          // setTimeout(() => {
          //   this.toastr.dismissToast;
          // }, 3000);
        }

       
        //   else if(data === null){
        //     this.toastr.warning('Email Not Exists', 'Oops!');
        //     this.spinner.hide();
        //     setTimeout(() => {
        //      this.toastr.dismissToast;
        //  }, 3000);
        // //  return false;
        //   }
      }, (error: any) => {
  
        for (var i = 0; i < this.totalFile; i++) {
          if (DocId != this.profileStatus[i].id)
            this.profileStatus[i].percentage = this.profileStatus[i].percentage + 5;
          else
            this.profileStatus[i].percentage = 100;
          if (this.tempuploadResponse[i].DocId == DocId)
            this.tempuploadResponse[i].ResumeStatus = "Error";
          // this.tempuploadResponse[i].ResumeStatus="Error";
          // error in uploading profiles!
        }
        // this.toastr.error('error in uploading profiles!', 'Oops!');
        // setTimeout(() => {
        //   this.toastr.dismissToast;
        // }, 3000);
        // this.spinner.hide();
        // console.log('download error:', error);
        // console.log('download i:', i);
      });
    }

    
  
  }

  Clear() {
    this.searchString = '';
    this.SearchProfiles();
    this.searchprofilesFrom.reset();
    this.toastr.dismissToast;
  }
  CheckEmail() {
    this.email = $('#Email').val();
    this.jobdetailsservice.getUserId(this.email, this.customerId).subscribe(data => {
      if (data == null) {
        this.SaveInvite(this.email);
      } else if (data === this.email) {
        this.toastr.error('Email already exits!', 'Oops!');
        setTimeout(() => {
          this.toastr.dismissToast;
        }, 3000);
      }
    });
  }

  CanceledAction(data, index) {
    this.tempuploadResponse[index].ResumeStatus = "Canceled";

  }

  UploadAction(index, data, type) {
    this.spinner.show();
    this.Inprogress = true;
    if (type == 2) {
      data.isPublic = true;
    }
    else if (type == 3) {
      this.formDAtaList.forEach(a => {
        var docid = (a.get("DocId").valueOf());
        var doc = data.DocId.toString();
        if (docid == doc) {
          a.set("SendMail", true.toString());
          a.set("Upload", true.toString());
          this.jobdetailsservice.byteStorage(a, 'ProfileApi/api/ParseResume').subscribe(data => {  // 'api/JobDescriptionParse'
            if (data) {
              this.spinner.hide();
              this.Inprogress = false;
              // alert("asdasdasdas");
              this.tempuploadResponse[index].ResumeStatus = "Requested";
              this.uploadRes[index].ResumeStatus = "Requested";
             
            }
          });
        }
      })
    }
    if (type != 3) {
      if (data.isPublic == true) {
        // alert("asdasdasdas");

        this.formDAtaList.forEach(a => {
          var docid = (a.get("DocId").valueOf());
          var doc = data.DocId.toString();
          if (docid == doc) {
            a.set("SendMail", false.toString());
            a.set("Upload", true.toString()); 
            this.spinner.hide();          
            this.jobdetailsservice.byteStoragePrivate(a, 'ProfileApi/api/ParseResume').subscribe(data => { // 'api/JobDescriptionParse'
              if (data) {
                this.Inprogress = false;
                //this.spinner.hide();
                // alert("asdasdasdas");
                this.tempuploadResponse[index].ResumeStatus = "Arytic_prof";
                this.uploadRes[index].ResumeStatus = "Arytic_prof";
                
              }
            });
          }
        })

      } else {
     if(this.sdetails.planId ===  "enterprise")
        {
        this.jobdetailsservice.byteStorage(data, 'ProfileApi/api/UpdateAction').subscribe(data => {  // 'api/JobDescriptionParse'
          if (data) {
            this.spinner.hide();
            this.Inprogress = false;
            this.tempuploadResponse[index].ResumeStatus = "ProfileAsscociated";
            this.uploadRes[index].ResumeStatus = "ProfileAsscociated";

          }                 
        });
      }
      else
      {
        this.jobdetailsservice.byteStorage(data, 'ProfileApi/api/UpdateActionPublic').subscribe(data => {  // 'api/JobDescriptionParse'
          if (data) {
            this.spinner.hide();
            this.Inprogress = false;
            this.tempuploadResponse[index].ResumeStatus = "ProfileAsscociated";
            this.uploadRes[index].ResumeStatus  = "ProfileAsscociated";
          }
         
        
        });
      }
    }
      // 
    }
  }

  SaveInvite(email) {
    this.inviteinfo.userId = this.customerName.UserId;
    this.inviteinfo.jobId = JSON.parse(sessionStorage.getItem('jobId'));
    this.inviteinfo.userName = email;
    this.inviteinfo.fullName = 'user';
    this.inviteinfo.statusId = 0;
    this.inviteinfo.ToEmailId = email;
    this.inviteinfo.ApplicationName = 'Arytic';
    this.inviteinfo.CandFullName = email;
    this.inviteinfo.CustFullName = 'Arytic';
    this.inviteinfo.ClientLogo = '';
    this.inviteinfo.AppLink = this.settingsService.settings.CandidateSignUp;
    this.jobdetailsservice.InviteContact(this.inviteinfo).subscribe(data => {
      if (data === 0) {
        $('#Email').val('');
        this.toastr.success('Mail sent successfully', 'Success');
        setTimeout(() => {
          this.toastr.dismissToast;
        }, 3000);
      }
    }, error => {
      alert('error ');
      console.log('error:', JSON.stringify(error));
    });
  }

  SearchProfiles() {
    this.searchprofilesFrom.value.JobId = JSON.parse(sessionStorage.getItem('jobId'));
    if (this.searchString != null) {
      this.searchprofilesFrom.value.SearchString = this.searchString;
      this.searchprofilesFrom.value.CustomerId = this.customerName.CustomerId;
      this.searchprofilesFrom.value.QualificationId = 0;
      this.searchprofilesFrom.value.Location = '';
      this.searchprofilesFrom.value.Experience = '';
      this.searchprofilesFrom.value.PageNumber = 1;
      this.searchprofilesFrom.value.NumberOfRows = 1000;
    }
    this.jobdetailsservice.searchCandidateProfiles(this.searchprofilesFrom.value)
      .subscribe(
        data => {
          this.isFullDisplayed = true;
          this.Count = data.TotalProfileCount;
          this.profiles = data.Profile;
          // //debugger;
          this.searchprofilesFrom.reset();
          // this.searchprocess = data.Profile;
          // this.profiles = this.searchprofiles.slice(0,10);
        });

  }
  BulkApplyCandidates() {
    this.bulkApply.JobId = JSON.parse(sessionStorage.getItem('jobId'));
    this.bulkApply.XmlJobResponse = this.appService.xmlResponse; // new XmlJobResponse
    this.bulkApply.ResponseStatusId = 13;
    this.appService.bulkApply(this.bulkApply).subscribe(
      (data) => {
        console.log(data);
        this.appService.xmlResponse = [];
      });
  }
  onCheckboxChange(option, event) {
    const response = new XmlJobResponse;
    response.ProfileId = option.ProfileId;
    response.ResumeId = option.ResumeId;
    option.checked = event.target.checked;
    // this.xmlJobResponse.push(response);
    this.appService.addResponses(response, option.checked);
    // this.appService.bulkApply(this.xmlJobResponse, response, option.checked);
    // if (event.target.checked) {
    //    this.profiles.find(iitem => iitem.ProfileId === option.ProfileId).checked = option.checked;

    //    //  we need to send profiles that contained check mark so that add for loop in servidce page
    //     this.xmlJobResponse.push();
    //     this.appService.bulkApply(this.profiles, response, option.checked);
    //    } else {
    //      this.appService.bulkApply(this.profiles, response, option.checked); // false
    //    }
    // // console.log(this.checkpersonType);
    // }
  }
}






export class InviteInfo {
  userId: number;
  jobId: number;
  fullName: string;
  userName: string;
  statusId: number;
  CustFullName: string;
  CandFullName: string;
  AppLink: string;
  ToEmailId: string;
  ApplicationName: string;
  ClientLogo: string;
}

export class UploadResponse {
  FirstName: string;
  LastName: string;
  ResumeStatus: string;
  MailId: string;
  DocId: number;
  UserProfilePictureUrl: string;
  JobId: number;
  CustomerId: number;
  IsPublic: boolean;
  UserId: number;
  ProfileId: number;
  ResumeData:any;
}

export class ProfileStatus {
  text: string;
  percentage: number;
  id: number;
}

export class ProfileDetails
{
  public ProfileId:number;
  public UserId:number;
  public FirstName:string;
  public LastName:string;
  public UserName:string;
  public ProfileTitle:string;
}

export class ProfileEducation
{
  public  EducationId:number;
  public  ProfileId:number;
  public  QualificationId:number;
  public  QualificationName: string;
  public  Specialization:string;
  public  InstituteORUniversity:string;
  public  FromYear:number;
  public  ToYear:number;
}

export class ProfileCertification
{
  public  CertificationId:number;
  public  ProfileId:number;
  public  ProviderId:number;
  public  CertificationName: string;
  public  IssuedBy:string;
  public  YearOfAchievement:string;
  public  ImageUrl:number;
}

export class ProfileExperience
{
  public  ExperienceId:number;
  public  ProfileId:number;
  public  JobTitle: string;
  public  JobLocation:string;
  public  CompanyName:string;
  public  Description:string;
  public  StartDate:string;
  public  EndDate:string;
}

export interface Certification {
  UserId: string;
  CertificationId: number;
  ProfileId: string;
  ProviderId: string;
  IsCertified: boolean;
  CertificationName: string;
  IssuedBy: string;
  YearOfAchievement: string;
  LifeTime: string;
  ImageUrl: string;
}

export class Provider
{
ProviderId:number;
ProviderName:string;
}



export class processProfiles
{
  sfile : File;
  profiles : any;
}

export class selectedFile
{
  sfile : File;
  bdata : any;
}

export class CandidateExp {
  public RecordId: number;
  public ProfileId: number;
  public JobId: number;
  public Experience: number;
  public MinExperienceId: number;
  public MaxExperience: number;
  public IsMissing: number;
}

export class InsertRole {

  public ProfileId: Number;
  public ProfileTitle: string;
  public Industry: string;
  public PositionType: string;
  public Category: string;
  public TitleInfo: string;
  public XmlKeyResponses: KeyRole[] = [];
}

export class KeyRole {
  public KeyResponsebilityId: number;
  public KeyMinExperienceId: number;
  public KeyMaxExperienceId: number;
}