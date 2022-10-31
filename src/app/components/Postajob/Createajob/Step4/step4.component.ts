import { Component, OnInit, Inject, ViewContainerRef,ViewChild } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { AppService } from "../../../../app.service";
import { InsertJob, PjDepartments } from "../../models/jobPostInfo";
import { Location } from "@angular/common";
import { ToastsManager, Toast } from "ng2-toastr/ng2-toastr";
import { StepsComponent } from "../steps.component";
import { JobcardComponent } from "./jobcard/jobcard.component";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { GetJobDetailCustomer } from "../../../../../models/GetJobDetailCustomer";
import { JobdetailsService } from "../../../jobdetails/jobdetails.service";
import { JobCompletenessInfo } from "../../../jobdetails/models/jobdetailsbasicinfo";
import { ApiService } from "../../../../shared/services";
import { FormBuilder,FormGroup, Validators } from "@angular/forms";
import * as _html2canvas from "html2canvas";
const html2canvas: any = _html2canvas;
import * as introJs from 'intro.js/intro.js';
@Component({
  selector: "app-steps-step4",
  templateUrl: "./step4.component.html",
  styleUrls: ["./step4.component.css"],
})
export class Step4Component implements OnInit {
  z;
  // step1
  jobdetailscustomer: GetJobDetailCustomer;
  getjobCompleteinfo :JobCompletenessInfo;
  //Loader Condition
  loading = false;
  Education:any;
  srlist:any=[];
  introJS = introJs();
  fileUploadForm: FormGroup;
  Employement:any;
  Reference:any;
  WFH:any;
  Background:any;
  //Loader Condition
  insertJob = new InsertJob();
  jobCategory: number;
  jobMinExp: number;
  jobMaxExp: number;
  Template: number;
  ExpiryDate: Date;
  jobTitle: string;
  TemplateName: string;
  jobDescription: string;
  jobPositionId: string;
  jobHasDescription: boolean;
  jobResponsibility: any;
  jobSkillsPrimary: any;
  jobSkillsSecondary: any;
  departments: any;
  client: any;
  pjDepartments: PjDepartments[] = [];
  // step2
  domain: any;
  locations: any;
  openings: any;
  personalityType: any;
  qualification: any;
  draftItem: any;
  JobIds = [];
  // step3
  profileImage:boolean=false;
  contractDuration: any;
  contractExtension: any;
  empType: any;
  complete: any;
  salaryType: any;
  intwType: any;
  reporting: any;
  customer: any;
  filedata=new FormData();
  disable: any;
  userId: any;
  customerId: any;
  flag: boolean = true;
  team: any;
  jobCardshow: boolean = true;
  constructor(
    private _service:ApiService,
    private route: ActivatedRoute,
    private toastr: ToastsManager,
    private _vcr: ViewContainerRef,
    private router: Router,
    private jobdetailsservice: JobdetailsService,
    private appService: AppService,
    private fb: FormBuilder,
    private location: Location,
    private steps: StepsComponent,
    public matDialog: MatDialog
  ) {
    this.customer = JSON.parse(sessionStorage.getItem("userData"));
    this.customerId = this.customer.CustomerId;
    this.disable = localStorage.getItem("Item");
    this.toastr.setRootViewContainerRef(_vcr);
    this.complete = JSON.parse(localStorage.getItem("completed"));
    this.draftItem = JSON.parse(localStorage.getItem("draftItem"));
    this.userId = this.customer.UserId;
    this.appService.currentcategorytitle.subscribe((data) => {
      this.jobCategory = data.JobCategoryId; // And he have data here too!
    });
    this.appService.currentjobtitle.subscribe((data) => {
      this.jobTitle = data; // And he have data here too!
    });
    this.appService.currentminExp.subscribe((data) => {
      this.jobMinExp = data; // And he have data here too!
    });
    this.appService.currentmaxExp.subscribe((data) => {
      this.jobMaxExp = data; // And he have data here too!
    });
    this.appService.addedresponsibilitiesChanged.subscribe((data) => {
      this.jobResponsibility = data; // And he have data here too!
    });
    this.appService.currentDescriptionChecked.subscribe((data) => {
      this.jobHasDescription = data; // And he have data here too!
    });
    this.appService.currentDescription.subscribe((data) => {
      this.jobDescription = data; // And he have data here too!
    });
    this.appService.currentjobPosition.subscribe((data) => {
      this.jobPositionId = data; // And he have data here too!
    });
    this.appService.jobprimaryskillsChanged.subscribe((data) => {
      this.jobSkillsPrimary = data; // And he have data here too!
    });
    this.appService.jobsecondaryskillsChanged.subscribe((data) => {
      this.jobSkillsSecondary = data; // And he have data here too!
    });
    this.appService.currentClient.subscribe((data) => {
      this.client = data; // And he have data here too!
    });
    this.appService.addeddepartmentsChanged.subscribe((data) => {
      this.departments = data; // And he have data here too!
    });
    // step2:

    this.appService.adddomainChanged.subscribe((data) => {
      this.domain = data; // And he have data here too!
    });
    this.appService.currentlocation.subscribe((data) => {
      this.locations = data; // And he have data here too!
    });
    this.appService.currentOpenings.subscribe((data) => {
      this.openings = data; // And he have data here too!
    });
    this.appService.personTypeSingleChanged.subscribe((data) => {
      this.personalityType = data; // And he have data here too!
    });
    this.appService.addqualificationsChanged.subscribe((data) => {
      this.qualification = data; // And he have data here too!
    });
    this.fileUploadForm = this.fb.group({ 
      'CustomerId': ['', Validators.required],
      'ProfileId': [0, Validators.nullValidator],
      'JobId': [0, Validators.nullValidator],
      'SmartCard':[null, Validators.nullValidator],
      'JobSmartCard': ['', Validators.nullValidator],
      'Url': ['', Validators.nullValidator],
      'FileExtension': ['', Validators.nullValidator],
    });
    // step3:

    this.appService.currentEmploymentType.subscribe((data) => {
      this.empType = data.EmploymentTypeId; // And he have data here too!
    });
    this.appService.currentSalaryTYpe.subscribe((data) => {
      this.salaryType = data.SalaryTypeId; // And he have data here too!
    });
    this.appService.currentContractDuration.subscribe((data) => {
      this.contractDuration = data; // And he have data here too!
    });
    this.appService.currentInterviewType.subscribe((data) => {
      this.intwType = data.InterviewTypeId; // And he have data here too!
    });
    this.appService.currentcustomerUsers.subscribe((data) => {
      this.reporting = data.UserId; // And he have data here too!
    });
    this.appService.addedteammembersChanged.subscribe((data) => {
      this.team = data; // And he have data here too!
    });
    this.flag = false;
  }

  ngOnInit() {
    this.JobIds = this.appService.JobIds;
    if(localStorage.getItem("JobId")!=null)
    {
      let jobId = localStorage.getItem("JobId");
      this.jobCardDetails(jobId);
    }
    this.GetInterviewStatus(this.JobIds[0]);
    this.GetJobStatus(this.JobIds[0]);
  }

  showJobCard() {
    this.jobCardshow = !this.jobCardshow
  }

  checkValue(event: any) {
    this.Template = event;
  }

  start()
  {
    this.introJS.start();
  }

  GetInterviewStatus(JId)
  {
   if(localStorage.getItem('jobId') != null)
   {
     const res = localStorage.getItem('jobId');
     JId = parseInt(res, 10);
   }
   this._service.GetService('ProfileAPI/api/GetInterviewJobRounds?jobId=', JId)
   .subscribe(
     dat => {
     if(dat!=null)
     {
       dat.forEach(x=>{
         this.srlist.push(x.Round);
       })
     
     }
     });
  }

  GetJobStatus(JId)
  {
   if(localStorage.getItem('jobId') != null)
   {
     const res = localStorage.getItem('jobId');
     JId = parseInt(res, 10);
   }
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
     
     };
     });
  }

  jobCardDetails(jobId)
  {
    return this.jobdetailsservice.getJobDetailCustomer(this.customerId, jobId).subscribe(res => {
      this.jobdetailscustomer = res;
      this.check(jobId);
      this.PopulateJobCompleteness(jobId);
    });
  }

  PopulateJobCompleteness(jobId) {
    return this.jobdetailsservice.GetJobCompleteness(jobId).subscribe(res => {
      this.getjobCompleteinfo = res;
    });
  
  }

  
check(val)
{
  this.profileImage = ! this.profileImage;
  let secondsRemaining = 1
  const interval = setInterval(() => {
  if (secondsRemaining === 0) {
   this.clickme(val);
   clearInterval(interval);
   }
   secondsRemaining--;
  }, 1000);
}

 dataURLtoFile(dataurl, filename) {

  var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), 
      n = bstr.length, 
      u8arr = new Uint8Array(n);
      
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new File([u8arr], filename, {type:mime});
}





clickme(val) {
  this.profileImage = true;
  let request = '';
  const formData = new FormData();
//   htmlToImage.toJpeg(document.getElementById('aaa' + val), { quality: 0.95 })
// .then(function (canvas) {
  html2canvas(document.getElementById('aap' + val),{
    useCORS: true,letterRendering: 1,backgroundColor:"transparent",scale: 2,
    logging: true }).then(canvas => {
    // document.querySelector(".results").appendChild(canvas);
      var image = canvas.toDataURL();
      var file = this.dataURLtoFile(image,val+'.png');
      this.fileUploadForm.value.Url = '';
      this.fileUploadForm.value.customerId = this.customerId;
      this.fileUploadForm.value.JobId = val;
      this.fileUploadForm.value.JobSmartCard = file.name;
      this.fileUploadForm.value.FileExtension = '.png';
      request = JSON.stringify(this.fileUploadForm.value);
      formData.append('SmartCard', file);
      formData.append('Model', request);
      this.filedata= formData;
      this._service.byteStorage(this.filedata, 'IdentityAPI/api/SaveJobCard').subscribe(data => {
        let res = data;
        console.log(res);
        this.profileImage = false;
   });  


  });
}


  postJob(step) {
    // this.appService.updateJobIndustry(" ");
    //for loader placed the below condition
    this.loading = true;
    //
    // this.appService.updateStepNumber(step);
    if (this.disable == "true") {
      const res = localStorage.getItem("JobId");
      this.insertJob.JobId = res != null ? parseInt(res, 10) : 0;
    } else {
      const res = localStorage.getItem("jobId");
      // if (res != null) {
      this.insertJob.JobId = res != null ? parseInt(res, 10) : 0;
    }
    this.insertJob.CustomerId = this.customerId;
    this.insertJob.UserId = this.userId;
    this.insertJob.JobPositionId = this.jobPositionId;
    this.insertJob.HideSalary = this.appService.HideSalary;
    this.insertJob.BonusOffered = this.appService.BonusOffered;
    this.insertJob.JobCategoryId = this.jobCategory; // this.appService.jobcategory.value.JobCategoryId;
    this.insertJob.JobTitle = this.jobTitle; // this.appService.jobtitle.value;
    this.insertJob.MinExperienceId = Math.round(this.jobMinExp); // this.appService.minExperience.value;
    this.insertJob.MaxExperienceId = Math.round(this.jobMaxExp); // this.appService.maxExperience.value;
    this.insertJob.XmlRoleId = this.appService.addedresponsibilities; // this.jobResponsibility ;
    this.insertJob.CompleteDescription = this.jobHasDescription; // this.appService.hasDescription.value;
    this.insertJob.JobDescription = this.jobDescription; // this.appService.description.value;
    this.insertJob.XmlSkills = this.appService.primaryjobskills.concat(this.appService.secondaryjobskills);
    // this.jobSkillsPrimary.concat(this.jobSkillsSecondary);
    this.insertJob.ClientId = this.client.ClientId;
    this.insertJob.ClientName = this.insertJob.ClientId > 0 ? "" : this.client.ClientName;
    // this.insertJob.ClientId = parseInt(localStorage.getItem('clientId'), 10);
    // this.insertJob.ClientName = localStorage.getItem('clientName');
    this.insertJob.XmlDepartment = this.appService.addeddepartments; // this.pjDepartments; //  this.departments;
    // step2

    //this.insertJob.NumberOfVacancies = this.openings; // this.appService.noofOpenings.value;
    //this.insertJob.PreferredLocationId = this.locations ; // this.appService.location.value.locationId.toString();
    this.insertJob.XmlQualifications = this.appService.addqualifications; //  this.qualification;
    this.insertJob.XmlDomains = this.appService.adddomain; // this.domain;
    this.insertJob.XmlPersonType = this.appService.personTypeSingle; //  this.personalityType;
    //matching Criteria
    this.insertJob.MatchingCrieterias = this.appService.skillPostData;

    // this.insertJob.JobCategoryId = this.appService.jobcategory.value.JobCategoryId;
    // this.insertJob.JobTitle = this.appService.jobtitle.value;
    // this.insertJob.XmlSkills = this.appService.primaryjobskills.concat(this.appService.secondaryjobskills);

    // this.insertJob.MinExperienceId = this.appService.minExperience.value;
    // this.insertJob.MaxExperienceId = this.appService.maxExperience.value;
    // this.insertJob.XmlRoleId = this.appService.addedresponsibilities;
    // this.insertJob.CompleteDescription = this.appService.hasDescription.value;
    // this.insertJob.JobDescription = this.appService.description.value;
    // this.insertJob.SalaryTypeId = 1;
    // this.insertJob.MinimumSalary = '1';
    // this.insertJob.MaximumSalary = '200';

    // this.insertJob.NumberOfVacancies = this.appService.noofOpenings.value;
    // this.insertJob.PreferredLocationId = this.appService.location.value.locationId.toString();
    // this.insertJob.XmlQualifications = this.appService.addqualifications;
    // this.insertJob.XmlDomains = this.appService.adddomain;
    //  this.insertJob.XmlPersonType = this.appService.personTypeSingle;

    this.insertJob.EmploymentTypeId = this.empType; // this.appService.employmentType.value.EmploymentTypeId;
    // if (localStorage.getItem('EditMode') != null && this.insertJob.JobId > 0) {
    // this.appService.currentEmploymentType.subscribe((data) => {
    //   this.insertJob.EmploymentTypeId = data.EmploymentTypeId; // And he have data here too!
    // });
    if (this.insertJob.EmploymentTypeId === 2) {
      this.appService.currentContractExtension.subscribe((data) => {
        this.insertJob.WorkAuthorizationId = this.appService.Workauthorize.toString(); // And he have data here too!
      });
      this.appService.currentContractDuration.subscribe((data) => {
        this.insertJob.ContractDuration = data; // And he have data here too!
      });
    }
    this.insertJob.SalaryTypeId = this.salaryType;
    if (this.insertJob.EmploymentTypeId === 2) {
      this.appService.currentMinRate.subscribe((x) => (this.insertJob.MinimumSalary = x.toString()));
      this.appService.currentMaxRate.subscribe((x) => (this.insertJob.MaximumSalary = x.toString()));
    } else if (this.insertJob.EmploymentTypeId === 1) {
      this.appService.currentMinHourlyRate.subscribe((x) => (this.insertJob.MinimumSalary = x.toString()));
      this.appService.currentMaxHourlyRate.subscribe((x) => (this.insertJob.MaximumSalary = x.toString()));
      // this.insertJob.ContractExtended = true;
      // this.insertJob.ContractDuration = this.contractDuration;
    }
    // this.insertJob.MinimumSalary = this.insertJob.SalaryTypeId==1?this.appService.currentMinRate.subscribe(x => this.insertJob.MinimumSalary = x) :this.appService.currentMinHourlyRate.subscribe(x => this.insertJob.MinimumSalary= x);
    // this.insertJob.MaximumSalary =  this.insertJob.SalaryTypeId==1?this.appService.currentMaxRate.subscribe(x => this.maxAnnualRate = x):    this.appService.currentMaxHourlyRate.subscribe(x => this.maxHourRate = x);
    // this.insertJob.IsDrafted = true;
    if (localStorage.getItem("EditMode") != null && this.insertJob.JobId > 0) {
      this.appService.currentDraft.subscribe((x) => (this.insertJob.IsDrafted = x));
      // this.insertJob.StepNumber = 4;
    } else {
      this.insertJob.IsDrafted = true;
    }
    this.insertJob.StepNumber = 4;
    if (this.appService.stepNumber.value <= step) {
      this.appService.updateStepNumber(step);
    }
    if (this.appService.isDrafted.value != null) {
      this.appService.updateJobDraft(this.insertJob.IsDrafted);
    }
    // }
    //   else {
    //   this.insertJob.EmploymentTypeId = 1;
    //   this.insertJob.SalaryTypeId = 1;
    //   this.insertJob.MinimumSalary = '1';
    //   this.insertJob.MaximumSalary = '200';
    //   this.insertJob.IsDrafted = false;
    //   this.insertJob.StepNumber = 4;
    // }
    //   if (this.insertJob.EmploymentTypeId === 2) {
    //   this.insertJob.ContractExtended = true;
    //   this.insertJob.ContractDuration = this.contractDuration;
    // } // this.appService.contractDuration.value;
    // let date = new Date();
    // let val = new Date(date.setDate(date.getDate() + 30 )) ;
    // this.insertJob.ExpiryDate = this.ExpiryDate ? this.ExpiryDate : val;
    this.insertJob.HiringProcessId = this.intwType; // this.appService.interviewType.value.InterviewTypeId;
    this.insertJob.HiringManagerId = this.reporting; // this.appService.reportingManager.value.UserId;
    this.insertJob.XmlTechnicalTeam = this.appService.addedteammembers;
    this.insertJob.SaveAsTemplate = this.Template;
    if (this.draftItem === true) {
      this.insertJob.Draft = this.draftItem;
      this.insertJob.Email = this.customer.Email;
    } // this.team;
    if ((this.Template == 1 && this.TemplateName == "") || (this.Template == 1 && this.TemplateName == undefined)) {
      this.toastr.error("Template name is required!", "Oops");
      setTimeout(() => {
        this.toastr.dismissToast;
      }, 3000);
    } else {
      if (this.JobIds && this.JobIds.length > 0) {
        var res = new Promise<void>((resolve, reject) => {
          this.JobIds.forEach((value, index, array) => {
            this.insertJob.JobId = value;
            this.insertJob.TemplateSaveTitle = this.TemplateName;
            debugger
            this.appService.postjob(this.insertJob).subscribe((data) => {
              if (data) {
                // this.insertJob.JobId = data;
                // window.location.href = '/app-manage-jobs/app-manage-load-joblist/1';
                // this.location.go('/app-manage-jobs/app-manage-load-joblist/1');
                localStorage.removeItem("draftItem");
                localStorage.removeItem("hide");
                localStorage.removeItem("SalaryTypeId");
                this.TemplateName = null;
                this.appService.locationselect = false;
                this.appService.JobLocationsMulti = [];
                // this.router.navigate(['/app-manage-jobs/app-manage-load-joblist/1']);
                this.router.navigate([
                  localStorage.getItem("EditViewJob") != null
                    ? this.ViewJobdetails(this.insertJob.JobId)
                    : "/app-manage-jobs/app-manage-load-joblist/1",
                ]);
                localStorage.setItem("post", "1");
              }
            });
            if (index === array.length - 1) {
              resolve();
            }
          });
        });

        res.then(() => {
          setTimeout(function () {
            debugger
            this.router.navigate(["/app-manage-jobs/app-manage-load-joblist/1"]);
            this.appService.resetJob();
          }, 3000);
          
        });
      }
      if (this.JobIds.length == 0 || this.JobIds == undefined) {
        if (localStorage.getItem("EditMode") != null)
        {
      debugger
          this.insertJob.TemplateSaveTitle = this.TemplateName;
          //debugger
          this.appService.postjob(this.insertJob).subscribe((data) => {
            if (data) {
              // this.insertJob.JobId = data;
              // window.location.href = '/app-manage-jobs/app-manage-load-joblist/1';
              // this.location.go('/app-manage-jobs/app-manage-load-joblist/1');
              localStorage.removeItem("draftItem");
              localStorage.removeItem("hide");
              localStorage.removeItem("SalaryTypeId");
              this.TemplateName = null;
              // this.router.navigate(['/app-manage-jobs/app-manage-load-joblist/1']);
              this.router.navigate([
                localStorage.getItem("EditViewJob") != null
                  ? this.ViewJobdetails(this.insertJob.JobId)
                  : "/app-manage-jobs/app-manage-load-joblist/1",
              ]);
              localStorage.setItem("post", "1");
              this.appService.resetJob();
            }
          });
        }
        else
        {
          const dialogConfig = new MatDialogConfig();
          // The user can't close the dialog by clicking outside its body
          dialogConfig.id = "modal-component";
          dialogConfig.height = "300px";
          dialogConfig.width = "600px";
          dialogConfig.panelClass = "preview-custom-modal";
          // https://material.angular.io/components/dialog/overview
          const modalDialog = this.matDialog.open(JobcardComponent, dialogConfig);    
          modalDialog.afterClosed().subscribe(result => {
            if (result === 1) {
           this.insertJob.TemplateSaveTitle = this.TemplateName;
          this.appService.postjob(this.insertJob).subscribe((data) => {
            if (data) {
              // this.insertJob.JobId = data;
              // window.location.href = '/app-manage-jobs/app-manage-load-joblist/1';
              // this.location.go('/app-manage-jobs/app-manage-load-joblist/1');
              localStorage.removeItem("draftItem");
              localStorage.removeItem("hide");
              localStorage.removeItem("SalaryTypeId");
              this.TemplateName = null;
              // this.router.navigate(['/app-manage-jobs/app-manage-load-joblist/1']);
              this.router.navigate([
                localStorage.getItem("EditViewJob") != null
                  ? this.ViewJobdetails(this.insertJob.JobId)
                  : "/app-manage-jobs/app-manage-load-joblist/1",
              ]);
              localStorage.setItem("post", "1");
              this.appService.resetJob();
            }
          });
            }
            else
            {
              localStorage.getItem("EditViewJob") == null
            }
        });
        }
       
      }
    }
  }
  ViewJobdetails(jobId) {
    this.appService.resetJob();
    sessionStorage.setItem("jobId", JSON.stringify(jobId));
    this.router.navigateByUrl("app-view-jobdetails");
  }
  backtoStep3() {
    if (this.complete > 0) {
      this.steps.step3toggleClass(this.complete);
    } else {
      this.steps.step3toggleClass(2);
    }
  }

  asyncFunction(item, cb) {
    setTimeout(() => {
      console.log("done with", item);
      cb();
    }, 3000);
  }
}
