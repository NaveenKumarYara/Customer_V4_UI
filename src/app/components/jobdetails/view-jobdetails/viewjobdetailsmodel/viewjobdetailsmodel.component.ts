import { Component, Inject, OnInit, Input, ViewChild, ViewContainerRef} from '@angular/core';
import { JobdetailsService } from '../../jobdetails.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GetJobDetailCustomer } from '../../../../../models/GetJobDetailCustomer';
import { JobComments } from '../../models/JobComments';
import { GetCompanyBenefit } from '../../../../../models/GetCompanyBenefit';
import {deactivate} from '../../../managejobs/models/deactivate';
import { AppService } from '../../../../app.service';
import { DomSanitizer } from '@angular/platform-browser';
import {ShareJobComponent} from '../share-job/sharejob.component';
import {ViewJobdetailsComponent} from '../../view-jobdetails/view-jobdetails.component';
import { animation } from '@angular/core/src/animation/dsl';
import { ToastsManager } from 'ng2-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { ApiService } from '../../../../shared/services/api.service';
import * as _html2canvas from "html2canvas";
import * as FileSaver from "file-saver";
import { SettingsService } from '../../../../../settings/settings.service';
import { DocumentManagerComponent } from '../../../Postajob/document-manager/document-manager.component';
import { SendnotificationdialogNcomponentComponent } from '../viewjobdetails-candidate-profile/JobNotes/sendnotificationdialog-ncomponent/sendnotificationdialog-ncomponent.component';
import { Resume } from '../viewjobdetails-candidate-profile/viewjobdetails-candidate-profile.component';
const html2canvas: any = _html2canvas;
var htmlToImage = require('html-to-image');
declare var $: any;
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-viewjobdetailsmodel',
  templateUrl: './viewjobdetailsmodel.component.html',
  styleUrls: ['./viewjobdetailsmodel.component.css'],
  providers: [AppService]
})
export class ViewjobdetailsmodelComponent  implements OnInit {
  // @Input() jobid: number;
  viewshareddialogueref: MatDialogRef<ShareJobComponent>;
  complete: any;
  CuserDetails:any='';
  customerId: any;
  userId: any;
  hideme = [true];
  fileUploadForm: FormGroup;
 jobid: number;
 Education:any;
 srlist:any=[];
 JobDocuments:any=[];
 Employement:any;
 Reference:any;
 WFH:any;
 Background:any;
 customer: any;
 JobNotes:any=[];
 filedata=new FormData();
 viewJobDetails:any;
 fileType = new Resume();
 fileExt: any;
 deactivate = new deactivate();
 getjobCompleteinfo :JobCompletenessInfo;
 getcompanybenfit: GetCompanyBenefit[]=[];
  jobdetailscustomer = new  GetJobDetailCustomer();
  jobComments: JobComments[]=[];
  profileImage:boolean=false;
  constructor(private dialog: MatDialog ,private toastr: ToastsManager,private fb: FormBuilder,private _sanitizer: DomSanitizer,
        private _vcr: ViewContainerRef, private router: Router,private _service: ApiService,private settingsService: SettingsService,
     private appService: AppService, private jobdetailsservice: JobdetailsService, @Inject(MAT_DIALOG_DATA) public data: any) {
      this.customer = JSON.parse(sessionStorage.getItem('userData'));
      this.customerId = this.customer.CustomerId;
      this.jobid = this.data.JobId;
      this.fileUploadForm = this.fb.group({ 
        'CustomerId': ['', Validators.required],
        'ProfileId': [0, Validators.nullValidator],
        'JobId': [0, Validators.nullValidator],
        'SmartCard':[null, Validators.nullValidator],
        'JobSmartCard': ['', Validators.nullValidator],
        'Url': ['', Validators.nullValidator],
        'FileExtension': ['', Validators.nullValidator],
      });
   }


   documentManagerDialog() {
    this.dialog.closeAll();
    const docRef = this.dialog.open(DocumentManagerComponent, {
      width: "80vw",
      position: { right: "0px" },
      height: "750px",
      data: {
        jobId:  this.jobid
      },
      panelClass: 'candiateModalPop'
    });
    docRef.afterClosed().subscribe(result => {
      console.log('share Dialog result: ${result}');
      this.ViewJobdetailsModel(this.jobid);
    });
  }

  OpenJobDialog(Jid) {
    this.dialog.closeAll();
      const senddialogRef = this.dialog.open(SendnotificationdialogNcomponentComponent, {
        width: "80vw",
        position: { right: "0px" },
        height: "750px",
        data: {
          jobId: Jid,
          // status : this.statusid
        },
      });
      senddialogRef.afterClosed().subscribe((result) => {
        //this.GetJobNotes(profileId, this.jobid);
        console.log("Screen Dialog result: ${result}");
      });
    
  }

  GetJobNotes(profileId, jobId) {
    this.jobdetailsservice.GetProfileNotesNew(profileId, jobId, this.customer.UserId).subscribe((datr7) => {
      this.JobNotes = datr7;
    });
  }

  DownloadResumeNote(val, Name): void {
    this._service.GetService("ProfileAPI/api/GetNoteFilesDownload?url=", val).subscribe((fileData) => {
      this.fileType = fileData;
      let exp = Name.split(".").pop();
      this.fileExt = exp;
      this.toastr.success("Downloading!", "Success!");
      setTimeout(() => {
        this.toastr.dismissToast;
      }, 3000);

      if (this.fileExt == "pdf") {
        let byteArr = this.base64ToArrayBuffer(fileData);
        let blob = new Blob([byteArr], { type: "application/pdf" });
        FileSaver.saveAs(blob, Name);
      }
      if (this.fileExt == "png" || this.fileExt == "jpeg") {
        let byteArr = this.base64ToArrayBuffer(fileData);
        let blob = new Blob([byteArr], { type: "application/image" });
        FileSaver.saveAs(blob, Name);
      } else if (this.fileExt == "doc" || this.fileExt == "docx") {
        var extension = ".doc";
        let byteArr = this.base64ToArrayBuffer(fileData);
        let blob = new Blob([byteArr], { type: "application/pdf" });
        FileSaver.saveAs(blob, Name);
      }
    });
  }


  ViewJobdetailsModel(viewJobJobId) {
    const viewdialogRef = this.dialog.open(ViewjobdetailsmodelComponent,
      {
        width: '1000px',
        position: { right: '0px' },
        height: '750px',
        panelClass: 'revamp__view__job__swiper',
        data: {
          JobId: viewJobJobId,
          // status : this.statusid
        }
      }
    );
    localStorage.removeItem('vjobId');
    viewdialogRef.afterClosed().subscribe(result => {
      //this.inprogressprofile = false;
      console.log('Dialog result: ${result}');
    });

  }

   OpenShareJobDialog() {
    //this.check(this.jobid);
   
   this.dialog.closeAll();
    const sharedRef = this.dialog.open(ShareJobComponent,
      {
         // width: '1000px',
         position: {right : '0px'},
        // height : '750px',
        data: {
          animal: 'panda',
          JobId:  this.jobid

        }
      }
    );
    sharedRef.afterClosed().subscribe(result => {
      console.log('share Dialog result: ${result}');
    });
  }
  

 getcustomerusers() {
    return this.appService.getTechinicalTeam(this.customerId).subscribe(res =>{
      if(res.length>0)
      {
        this.CuserDetails = res.filter(x=> x.UserId === this.jobdetailscustomer.TechnicalTeam[0].UserId);
      }
     else
     {
      this.CuserDetails ='';
     }
    })
    }


  PopulateJobdetail() {
    return this.jobdetailsservice.getJobDetailCustomer(this.customerId, this.jobid).subscribe(res => {
      this.jobdetailscustomer = res;
      if(res.TechnicalTeam.length>0)
      {
        this.getcustomerusers();
      }

      this.GetInterviewStatus(this.jobid);
      this.GetJobStatus(this.jobid);
      this.GetJobNotes(0,this.jobid);
      this.PopulateJobDocuments();
      this.check(this.jobid);
      let params = new HttpParams();
      params = params.append('jobId', this.jobid.toString());
      params = params.append('userId', '3');
      this._service.GetService('JobsAPI/api/GetJobDetailCandidate?', params)
      .subscribe(      
        data => {
          this.viewJobDetails = data;
        })
    });

}

GetInterviewStatus(JId)
{
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

PopulateJobCompleteness() {
  return this.jobdetailsservice.GetJobCompleteness(this.jobid).subscribe(res => {
    this.getjobCompleteinfo = res;
  });

}

PopulateJobDocuments() {
  this._service.GetService('ProfileAPI/api/GetJobDocuments?jobId=', this.jobid)
 .subscribe(
   r => {
    this.JobDocuments = r;
  });

}

async getFileFromUrl(url, name, defaultType = 'application/pdf'){
  const response = await fetch(url);
  const data = await response.blob();
  return new File([data], name, {
    type: data.type || defaultType,
  });
}

DelDocument(d)
{
  this._service.DeleteService("ProfileAPI/api/DeleteCD?Id=", d).subscribe((dt) => {
    if(dt==0)
    { 
      this.toastr.success("File Deleted!", "Success!");
    setTimeout(() => {
      this.toastr.dismissToast;
    }, 3000);
      this.PopulateJobDocuments();
    }
  })
}

DownloadDocument(d)
{
  // let fileDat = this.JobDocuments.find(x=>x.DocName === d);
  let fileExt:any;
  let re = /\#/gi;
  let name = d.replace(re, "%23");
  let u = this.settingsService.settings.IdentitybaseUrl + '/home/WhitePapers?id=';
  let url = u + name;
  this._service.GetService("ProfileAPI/api/GetNoteFilesDownload?url=", url).subscribe((fileData) => {
    let exp = d.split("aryticDP")[0];
    fileExt = exp.split(".").pop();
    let Name = exp.split(".")[0];
    this.toastr.success("Downloading!", "Success!");
    setTimeout(() => {
      this.toastr.dismissToast;
    }, 3000);

    if (fileExt == "pdf") {
      let byteArr = this.base64ToArrayBuffer(fileData);
      let blob = new Blob([byteArr], { type: "application/pdf" });
      FileSaver.saveAs(blob, Name);
    }
    if (fileExt == "png" || fileExt == "jpeg") {
      let byteArr = this.base64ToArrayBuffer(fileData);
      let blob = new Blob([byteArr], { type: "application/image" });
      FileSaver.saveAs(blob, Name);
    } else if (fileExt == "doc" || fileExt == "docx") {
      let byteArr = this.base64ToArrayBuffer(fileData);
      let blob = new Blob([byteArr], { type: "application/pdf" });
      FileSaver.saveAs(blob, exp);
    }
  });
 


   
  
  
 

}



base64ToArrayBuffer(base64) {
  const binary_string = window.atob(base64);
  const len = binary_string.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

PopulateJobComments () {
  return this.jobdetailsservice.getJobDetailsComments(this.jobid).subscribe(res => {
    this.jobComments = res;
  });

}
changeJobStat(job, val) {
  if (val === true) {
   $('#InactiveJob').replaceWith('#ActiveJob');

  } else if (val === false) {
    $('#ActiveJob').replaceWith('#InactiveJob');
  }
  this.deactivate.jobId = job.JobInfo.JobId;
  this.deactivate.customerId = job.JobInfo.CustomerId;
  this.deactivate.isActive = val;
    this.appService.deactivateJob(this.deactivate)
    .subscribe(
    data => {
      this.PopulateJobdetail();
  },
    error => console.log(error));
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

dataURLtoFile1(dataurl, filename) {
 
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
    html2canvas(document.getElementById('aaa' + val),{
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

  
populateCompanyBenfits() {
  return this.jobdetailsservice.getCompanyBenfits(this.customerId).subscribe(res => {
      this.getcompanybenfit = res;
  });
}
editJob(jobId, active) {
  if (active === false ) {
  this.toastr.error('Inactive Job Please Activate to Edit!', 'Oops!');
  setTimeout(() => {
      this.toastr.dismissToast;
  }, 3000);
  } else {
    this.complete = 4;
    this.dialog.closeAll();
    this.router.navigate(['/app-createajob/', {jobId} ]);
    localStorage.setItem('completed', JSON.stringify(this.complete));
    localStorage.setItem('EditViewJob', 'yes');
    this.router.navigate(['/app-createajob/app-steps-step1/', {jobId} ]);
  }

    // this.router.navigateByUrl('/app-createajob/app-steps-step1/id='+ jobId);
 // [routerLink]="['/app-createajob/app-steps-step1/',job.JobId]"
}

ngOnInit() {
  this.PopulateJobdetail();
  this.PopulateJobComments();
  this.populateCompanyBenfits();
  this.PopulateJobCompleteness();
  // console.log('abc');

  /*tabs animation*/
  (function ($) {
    function navLineResizeHandler() {
      const nav = $('.nav-tabs');
      const activeLink = nav.children('li.active');
      const activeLine = nav.children('.active-line');
      const windowWidth = $(window).scrollLeft();

      $.each(activeLine, function (index, element) {
        const $element = $(element);
        $element.css({
          width: $element.parent().children('.active').css('width'),
          left: $element.parent().children('.active').position().left - windowWidth
        });
      });
    }

    function navLineClickHandler() {
      const btnWidth = $(this).css('width');
      const line = $(this).parent().find('.active-line');
      const btnBox = this.getBoundingClientRect();
      const windowBox = this.parentNode.getBoundingClientRect();

      line.css({
        width: btnWidth,
        left: btnBox.left - windowBox.left
      });
    }

    $(document).ready(navLineResizeHandler);

    $(window).resize(function () {
      setTimeout(navLineResizeHandler, 1000);
    });

    const appliedTabBtn = $('.modal-body .nav-tabs li');
    const appliedLine = $('.modal-body .nav-tabs .active-line');
    appliedTabBtn.on('click', navLineClickHandler);


  })($);


}
}

export class JobCompletenessInfo
    {
        JobCompleteness :number
        Industry :number
        Title :number
        Experience :number
        Keyresponses :number
        JobDomain :number
        JobDesc :number
        JobPriority :number
        Skill :number
        OptionalSkill :number
        SoftSkill :number
        Employment :number
        WorkAuthorise :number
        Qualification :number
        JobLocation :number
        JobAssigned :number
        Video :number
        Teamfit :number
    }
