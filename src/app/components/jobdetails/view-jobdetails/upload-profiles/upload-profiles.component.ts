import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { JobdetailsService } from '../../../jobdetails/jobdetails.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { SearchProfileDeatils } from '../../models/SearchProfileDeatils';
import { Profile } from '../../models/SearchProfileDeatils';
import { AlertService } from '../../../../shared/alerts/alerts.service';
import { BulkApply, XmlJobResponse } from './bulkApply';
import { AppService } from '../../../../app.service';
import { SettingsService } from '../../../../../settings/settings.service';
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
  fileUploadForm: FormGroup;
  totalFile: number = 0;
  searchprofilesFrom: FormGroup;
  searchprofiles: Profile[];
  isPublic: any = false;
  public profileStatus: ProfileStatus[] = [];
  formDAtaList: Array<FormData> = [];
  formData = new FormData();
  fileCount: number = 0;
  successCount: number = 0;
  issueCount: number = 0;
  profiles: Profile[];
  searchprocess: any;
  Count: any;
  selectedFileNames: string[] = [];
  totalSelectedDoc: number = 0;
  inviteinfo = new InviteInfo();
  bulkApply = new BulkApply();
  xmlJobResponse: XmlJobResponse[] = [];
  loaddata = true;
  uploadResponse: UploadResponse[] = [];
  tempuploadResponse: UploadResponse[] = [];
  displayprofiles: any;
  searchString: any;
  SearchList: any = [];
  norecord: any = false;
  isFullDisplayed: any = false;
  email: any;
  customerId = null;
  // userId: number;
  customerName = null;
  slice: number;
  // tslint:disable-next-line:max-line-length
  constructor(private appService: AppService, private spinner: NgxSpinnerService, private toastr: ToastsManager, private _vcr: ViewContainerRef, private fb: FormBuilder, private jobdetailsservice: JobdetailsService, @Inject(MAT_DIALOG_DATA) public data: DialogData, private alertService: AlertService, private settingsService: SettingsService) {
    this.selectedFileNames = [];
    this.customerName = JSON.parse(sessionStorage.getItem('userData'));
    this.displayprofiles = JSON.parse(localStorage.getItem('DisplayUpload'));
    this.customerId = this.customerName.CustomerId;
    // this.userId = this.customerName.UserId;
    this.toastr.setRootViewContainerRef(_vcr);
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
    this.alertService.clear();
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
  //   debugger
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
  getFileDetails(e) {
    this.fileCount = 0;
    this.successCount = 0;
    this.issueCount = 0;
    this.tempuploadResponse = [];
    this.selectedFileNames = [];
    this.formDAtaList = [];
    this.profileStatus = [];
    // this.spinner.show();
    let request = '';
    var formData = new FormData();
    this.fileUploadForm.value.Url = '';
    this.fileUploadForm.value.FileName = e.target.files[0].name;
    this.fileUploadForm.value.FileExtension = e.target.files[0].type;
    this.fileUploadForm.value.UserName = null;
    this.fileUploadForm.value.JobId = (<HTMLInputElement>document.getElementById('jobId')).value;
    this.fileUploadForm.value.EmailCheck = this.emailCheck;
    // document.getElementById('jobId').value; //this.jobid;
    // this.fileUploadForm.value.ResumeFile = e.target.files[0];
    if (this.fileUploadForm.value !== '') {
      request = JSON.stringify(this.fileUploadForm.value);
    }
    this.totalFile = e.target.files.length;
    this.totalSelectedDoc = e.target.files.length;
    if (e.target.files.length > 5) {
      this.toastr.warning('Please select max 5 files.');
      this.spinner.hide();
      setTimeout(() => {
             this.toastr.dismissToast;
         }, 3000);
     
      e.preventDefault();
    } else {
      this.slice = 100 / e.target.files.length;
      for (let i = 0; i < e.target.files.length; i++) {
        var Profdata = new ProfileStatus();
        Profdata.id = i;
        Profdata.percentage = (e.target.files.length - i - 1) * this.slice;
        if (!Profdata.percentage)
          Profdata.percentage = 5;
        Profdata.text = "Parsing the Document......";
        Profdata.id = i;
        this.profileStatus.push(Profdata);
        formData = new FormData();
        var temp = new UploadResponse()
        this.selectedFileNames.push(e.target.files[i].name);
        temp.FirstName = e.target.files[i].name;
        temp.DocId = i;
        temp.ResumeStatus = null;
        this.tempuploadResponse.push(temp);
        formData.append('ResumeFile', e.target.files[i]);
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
  }
  uploadMultiple(formData, DocId) {
    this.jobdetailsservice.byteStorage(formData, 'ProfileApi/api/ParseResume').subscribe(data => {  // 'api/JobDescriptionParse'
      if (data) {
        this.uploadResponse = data;
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
              // alert("asdasdasdas");
              this.tempuploadResponse[index].ResumeStatus = "Requested";
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
            this.jobdetailsservice.byteStorage(a, 'ProfileApi/api/ParseResume').subscribe(data => {  // 'api/JobDescriptionParse'
              if (data) {
                this.spinner.hide();
                // alert("asdasdasdas");
                this.tempuploadResponse[index].ResumeStatus = "Arytic_prof";
              }
            });
          }
        })

      } else {
        this.jobdetailsservice.byteStorage(data, 'ProfileApi/api/UpdateAction').subscribe(data => {  // 'api/JobDescriptionParse'
          if (data) {
            this.spinner.hide();
            this.tempuploadResponse[index].ResumeStatus = "ProfileAsscociated";

          }
        });
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
          // debugger;
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
}

export class ProfileStatus {
  text: string;
  percentage: number;
  id: number;
}