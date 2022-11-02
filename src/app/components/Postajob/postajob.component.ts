import { Component, OnInit, Inject, NgZone  } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEvent } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../../app.service';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import {Location } from '@angular/common';
import { Subject, Observable } from 'rxjs';
import {EmploymentType} from '../../../models/employmenttype.model';
import{InterviewType} from '../../../models/interviewtype.model';
import { Jobskills } from '../../../models/jobskills.model';
import { Qualifications } from '../../../models/qualifications.model';
import { PjDomain, GetDomain, CustomerUsers, KeyRole,PjTechnicalTeam,Cities,jobImmigrationData, CategoryList, PjEducationDetails, PjRole, PjDisc, Roles, DiscResult, PrefLocation, ClientModel, PjDepartments, DepartmentModel, SkillPostData, GetKeyRole, PjSkill } from '../../components/Postajob/models/jobPostInfo';
import { WorkAuthorization } from '../../../models/workAuthorization';
import { ApiService } from '../../shared/services';
import * as introJs from 'intro.js/intro.js';
import { OnDestroy } from '@angular/core/public_api';
declare var $: any;
@Component({
  selector: 'app-postajob',
  templateUrl: './postajob.component.html',
  styleUrls: ['./postajob.component.css']
})
export class PostajobComponent implements OnInit,OnDestroy {
  introJS = introJs();
parser : boolean =false;

  constructor(private route: ActivatedRoute, private toastr: ToastsManager,private _service:ApiService,
    private router: Router, private appService: AppService, private location: Location, private zone: NgZone) {

  }

  start()
  {
    
    this.introJS.start();
  }

  Close()
  {
    this.introJS.exit();
  }

  ngOnDestroy(): void {
    this.Close();
  }

  getFileDetails(e) {
    this.Close();
    const fileSelected: File = e.target.files[0];
    const stringToSplitDoc = fileSelected.name;
    const y = stringToSplitDoc.split('.');
    const exp = y[1];
    if (exp === 'pdf'  || exp === 'docx'  || exp === 'doc' ) {
      if (fileSelected.size > 2048576) {
        // Swal('Too Big Size.. File Not Allowed');
        this.toastr.error('Too Big Size.. File size greater than 2MB Not Allowed!');
        setTimeout(() => {
          this.toastr.dismissToast;
        }, 3000);
      }
      else
      {
        this.processResumes(fileSelected);
      }
      
    }
    else 
    {
      this.toastr.error('Please upload the files with extension pdf,docx');
      setTimeout(() => {
        this.toastr.dismissToast;
      }, 3000);    
  }

  
  }

  processResumes(file) {
    this.parser = true;
     let dta:any;
     this.getBase64(file).then(
      data => 
      {
       dta= data;
       var da = {  
    DocumentAsBase64String: dta,  
    DocumentLastModified: '2021-06-18',  
    GeocodeOptions: {  
      'IncludeGeocoding': false,  
      'Provider': null,  
      'ProviderKey': null,  
      'PostalAddress': null,  
      'GeoCoordinates': null  
    },  
    IndexingOptions: {  
      'IndexId': '',  
      'DocumentId': '',  
      'UserDefinedTags': [  
        ''  
      ]  
    },  
    OutputHtml: true,  
    HideHtmlImages: null,  
    OutputRtf: false,  
    OutputCandidateImage: false,  
    OutputPdf: false,  
    Configuration: 'Coverage.MilitaryHistoryAndSecurityCredentials = true; Coverage.PatentsPublicationsAndSpeakingEvents = true; Coverage.PersonalInformation = true; Coverage.Training = true; Coverage.EntryLevel = true',  
    SkillsData: [  
      ''  
    ],  
    NormalizerData: ''  
      }
      this._service.UploadSovrenJob(da).subscribe( dat => 
      {   
        let val  = dat.Value.JobData;   
        if(val!=null)
        {
          if(val.CurrentLocation!=null)
          {
           
            if(val.CurrentLocation.Municipality!=null)
            {
              let loc = new Cities();
              loc.CityId = 1;
              loc.CityName= val.CurrentLocation.Municipality+","+val.CurrentLocation.Regions[0];
              this.appService.JobLocations.push(loc);
              this.appService.JobLocationsChanged.next(this.appService.JobLocations);
            }
         
          }
          if(val.EmployerNames!=null)
          {
            if(val.EmployerNames.MainEmployerName!=null)
            {
                  let eJclient = new ClientModel();
                  eJclient.ClientName = val.EmployerNames.MainEmployerName;
                this.appService.updateClient(eJclient);
                this.appService.clientModel.next(eJclient);            
            }
          }
          let ejQualificationIdList:any=[];
          let ejQualificationList:any=[];
          if(val.Degrees!=null)
          {
            for (const s of val.Degrees)
            {
              const qual = new Qualifications();
              const ejQualificationSingle = new PjEducationDetails();
                this.appService.getQualificationDetails().subscribe(dat=>{
                  ejQualificationSingle.QualificationId = dat.find(x=> x.QualificationName === s.Name).QualificationId;
                  ejQualificationSingle.IsActive = true;         
                  if(ejQualificationSingle.QualificationId>0)
                  {
                    ejQualificationIdList.push( ejQualificationSingle);
                    qual.QualificationId = dat.find(x=> x.QualificationName === s.Name).QualificationId;
                    qual.QualificationName = dat.find(x=> x.QualificationName === s.Name).QualificationName;      
                    ejQualificationList.push(qual);     
                    this.appService.qualifications = ejQualificationList // this.ejQualificationList;
                    this.appService.qualificationsChanged.next(this.appService.qualifications);
                    this.appService.addqualifications = ejQualificationIdList;
                    this.appService.addqualificationsChanged.next(this.appService.addqualifications);
                  }                  
                })
               
               
            }
          }

          if(val.JobTitles!=null)
          {
            if(val.JobTitles.MainJobTitle!=null)
            {
              this.appService.jobtitle.next(val.JobTitles.MainJobTitle);
              this.appService.jobtitleId.next("1");
            }
          }
          if(val.SkillsData.length>0)
          {
              if(val.SkillsData[0].Taxonomies[0]!=null)
              {
                this.appService.jobIndustry.next(val.SkillsData[0].Taxonomies[0].Name);
                this.appService.IndustryId.next("1");                
              }
   
              let ejPrimarySkills:any=[];
               for (const ss of val.SkillsData[0].Taxonomies){
                for (const sa of ss.SubTaxonomies)
                {
                  for (const skill of sa.Skills)
                    {
                    if(skill.ExistsInText === true)
                    {
                      const ejSkills = new PjSkill();
                      ejSkills.SkillName = skill.Name;
                      ejSkills.SkillType = true;
                      ejSkills.MinimumExp = 1*12;
                      ejSkills.MaximumExp = 5*12;
                      ejPrimarySkills.push(ejSkills);
                    }
                 
                  }
                }
               }
               
               if(ejPrimarySkills.length>0)
               {
                const ids = ejPrimarySkills.map(o => o.SkillName)
                const filtered = ejPrimarySkills.filter(({SkillName}, index) => !ids.includes(SkillName, index + 1))
                this.appService.primaryjobskills = filtered; 
                this.appService.jobprimaryskillsChanged.next(this.appService.primaryjobskills ); 
                this.appService.selectedskilltype.next('');
               }
          

          }
          this.appService.hasDescription.next(true);
          this.appService.description.next(val.JobMetadata.PlainText);
          if(val.MinimumYears!=null)
          {
            this.appService.minExperience.next(val.MinimumYears.Value * 12);
            this.appService.maxExperience.next(val.MinimumYears.Value * 12);
          }
          this.appService.showskills = false;
          this.createJob();
        }
     
      })
      }
      );

    
  
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



  ngOnInit() {
   // this.appService.;
  // this.reload();
  localStorage.removeItem('completed');
  localStorage.removeItem('jobId');
  localStorage.removeItem('JobId');
  localStorage.removeItem('EditMode');
  localStorage.removeItem('hide');
  localStorage.removeItem('EditViewJob');
  localStorage.removeItem('draftItem');
  localStorage.removeItem('Item');
  this.appService.personTypes = [];
  this.appService.showskills = true;
  this.appService.Locationswithpositions=[];
  this.appService.personTypeChanged = new Subject<DiscResult[]>();
  this.appService.customerUsers = [];
  this.appService.customerUserChanged = new Subject<PjTechnicalTeam[]>();
  this.appService.skillDataList = [];
  this.appService.skillDataListChanged = new Subject<SkillPostData[]>();
  this.appService.skillPostData = [];
  this.appService.skillPostDataChanged = new Subject<SkillPostData[]>();
  this.appService.addedresponsibilities = [];
  this.appService.addedresponsibilitiesChanged = new Subject<PjRole[]>();
  this.appService.domain = [];
  this.appService.domainChanged = new Subject<GetDomain[]>();
  this.appService.personTypeSingle = [];
  this.appService.personTypeSingleChanged = new Subject<PjDisc[]>();
  this.appService.adddomain = [];
  this.appService.adddomainChanged = new Subject<PjDomain[]>();
  this.appService.JobIds=[];
  this.appService.JobLocations=[];
  this.appService.reportingList=[];
  this.appService.recrutingList=[];
  this.appService.JobLocationsMulti=[];
  this.appService.jobtitle.next('');
  this.appService.JobDue.next(5);
  this.appService.JobImp.next(3);
  this.appService.rList=undefined;
  //this.appService.JobDueDate.next(new Date());
  this.appService.ImmigrationforJobs=[];
  this.appService.ImmigrationforJobChanged = new Subject<jobImmigrationData[]>();
  this.appService.Workauthorize=[];
  this.appService.WorkauthorizeNames=[];
  this.appService.WorkauthorizeNameChanged = new Subject<WorkAuthorization[]>();
  this.appService.stepNumber.next('1');
  this.appService.OpeningsList=[];
  this.appService.locationselect=false;
  this.appService.JobLocationsMulti=[];
  this.appService.RemoteWork= false;
  this.appService.HideSalary = true;
  this.appService.BonusOffered = false;
  this.appService.JobLocationsChanged=  new Subject<Cities[]>();
  this.appService.jobcategory.next(new CategoryList());
  // this.appService.minExperience.next(1);
  // this.appService.maxExperience.next(1);
  this.appService.hasDescription.next(false);
  this.appService.description.next('');
  this.appService.jobPosition.next('');
  this.appService.IndustryId.next('');
  this.appService.jobcategorynew.next('');
  this.appService.jobcategorynewId.next('');
  this.appService.jobtypePosition.next('');
  this.appService.jobtypePositionId.next('');
  this.appService.jobtitleId.next('');
  this.appService.jobIndustry.next('');
  this.appService.clientModel.next(new ClientModel());
  this.appService.departments = [];
  this.appService.departmentsChanged = new Subject<DepartmentModel[]>();
  this.appService.addeddepartments = [];
  this.appService.addeddepartmentsChanged = new Subject<PjDepartments[]>();
  this.appService.keyrole = [];
  this.appService.keyroleChanged = new Subject<GetKeyRole[]>();
  this.appService.addkeyrole = [];
  this.appService.addkeyroleChanged = new Subject<KeyRole[]>();
  this.appService.ResponseList=[];
  this.appService.noofOpenings.next(1);
  this.appService.minAnnualRate.next(1000);
  this.appService.maxAnnualRate.next(10000);
  this.appService.minHourlyRate.next(20);
  this.appService.maxHourlyRate.next(100);
  this.appService.minExperience.next(0);
  this.appService.maxExperience.next(0);
  this.appService.location=[];
  this.appService.reportingManager.next(new CustomerUsers());
  this.appService.selectedskilltype.next('');
  this.appService.employmentType.next(new EmploymentType());
  this.appService.interviewType.next(new InterviewType());
  this.appService.contractDuration.next('');
  //this.appService.contractExtension.next(new WorkAuthorization());
  this.appService.addedteammembers = [];
  this.appService.addedteammembersChanged = new Subject<PjTechnicalTeam[]>();
  this.appService.teammembers = [];
  let date = new Date();  
  let val = new Date(date.setDate(date.getDate() + 30 )) ;
  this.appService.JobDueDate.next(val);
  this.appService.teammembersChanged = new Subject<CustomerUsers[]>();
  // this.appService.currentcustomerUsers = new Observable();
  // this.appService.selectedskilltypechanges = new Observable();
  // this.appService.currentContractDuration =  new Observable();
  // this.appService.currentContractExtension = new Observable();
  // this.appService.currentInterviewType = new Observable();
  // this.appService.currentEmploymentType =  new Observable();
  // this.appService.currentjobtitle =  new Observable();
  // this.appService.currentminExp = new Observable();
  // this.appService.currentmaxExp = new Observable();
  // this.appService.currentcustomerUsers = new Observable();
  // this.appService.currentDescriptionChecked = new Observable();
  // this.appService.currentDescription = new Observable();
  // this.appService.currentOpenings = new Observable();
  // this.appService.currentlocation = new Observable();
  this.appService.responsibilities = [];
  this.appService.responsibilitesChanged = new Subject<Roles[]>();
  this.appService.qualifications = [];
  this.appService.qualificationsChanged = new Subject<Qualifications[]>();
  this.appService.primaryjobskills = [];
  this.appService.secondaryjobskills = [];
  this.appService.jobsecondaryskillsChanged = new Subject<Jobskills[]>(); // .closed();
  this.appService.jobprimaryskillsChanged = new Subject<Jobskills[]>();
  this.appService.videoProfile.next('');
  // this._setOption.next(null);
  // setTimeout(() => {
  //   this._setOption.next(null);
  // }, 100);

  // leave page
  // window.addEventListener('beforeunload', function (e) {
  //   const confirmationMessage = '\o/';
  // console.log('cond');
  //   e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
  //   return confirmationMessage;
  // });
}
createJob() {
  $("#activepostjob").addClass('active');
  let activepostjob= true;
  localStorage.setItem('activepostjob', JSON.stringify(activepostjob));
  this.router.navigateByUrl('/app-createajob');
  // this.router.navigate(['/app-createajob'])
  // this.location.go('/app-createajob');
  // this.reload();
}

editTemplate()
{
  $("#activepostjob").addClass('active');
  let activepostjob= true;
  localStorage.setItem('activepostjob', JSON.stringify(activepostjob));
  this.router.navigateByUrl('/app-jobtemplate'); 
}

editDraft() {
  $("#activepostjob").addClass('active');
  let activepostjob= true;
  localStorage.setItem('activepostjob', JSON.stringify(activepostjob));
  this.router.navigateByUrl('/app-editdraft');
}
public reload(): any {
  return this.zone.runOutsideAngular(() => {
      location.reload();
  });
}
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }



}



