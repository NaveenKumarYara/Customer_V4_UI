import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../../shared/services/api.service/api.service';
import { MAT_DIALOG_DATA } from '@angular/material';
declare var $: any;
declare var require: any;
const RecordRTC = require('recordrtc//RecordRTC.min');
@Component({
  selector: 'app-steps-step3-uploadvideoprofile',
  templateUrl: './uploadvideoprofile.component.html',
  styleUrls: ['./uploadvideoprofile.component.css']
})
export class UploadvideoprofileComponent implements OnInit {
  currentVideoUpload: File;
  private recordRTC: any;
  private stream: MediaStream;
  saveVideo: FormGroup;
  customer: any;
    customerId: any;
    userId: any;
    saveImage: FormGroup;
    videoSizzles: any;
  @ViewChild('video') video;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _service: ApiService, private fb: FormBuilder) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId = this.customer.CustomerId;
    this.userId = this.customer.UserId;
    this.createVideoForm();
this.GetVideoSizzle();
  }

  createVideoForm() {
    this.saveImage = this.fb.group({
      'customerId': [this.customerId, Validators.required],
      'UserName': [this.customer.FirstName, Validators.nullValidator],
      'companyLogo': [null, Validators.nullValidator],
    });
    this.saveVideo = this.fb.group({
      'UserId': [this.customer.UserId, Validators.required],
      'ProfileId': [null, Validators.nullValidator],
      'UserName': [this.customer.FirstName, Validators.nullValidator],
      'VideoProfileId': [null, Validators.nullValidator],
      'CustomerId': [this.customerId, Validators.nullValidator],
      'VideoUrl': [null, Validators.nullValidator],
      'VideoFormat': ['.mp4', Validators.nullValidator],
      'IsProfile': [false, Validators.nullValidator],
      'VideoFile': [null, Validators.nullValidator],
      'JobId': [this.data.jobId, Validators.nullValidator],
      'VideoType': [3, Validators.nullValidator]
    });
  }
  GetVideoSizzle() {
    this._service.GetService('ProfileAPI/api/GetVideoSizzles?customerId=' + this.customerId + '&userId=', 0)
      .subscribe(
        data => {
          this.videoSizzles = data;
        }, error => { this._service.DebugMode(error); });
  }
  ngOnInit() {
  }
  onVideoFileChange(event) {
    this.createVideoForm();
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const stringToSplit = file.name;
      const x = stringToSplit.split('.');
      const ext = x[1].toLowerCase();
      if (ext === 'mp4' || ext === 'webm' || ext === 'flv') {
        if (file.size > 2048576) {
          alert('Too Big Size.. File Not Allowed');
        } else {
          this.currentVideoUpload = file;
          this.uploadVideo(this.currentVideoUpload);
        }
      } else {
        alert('Please upload the files with extension webm,flv,mp4');
      }

    }
  }
  uploadVideo(blob) {
    this.currentVideoUpload = new File([blob], 'filename.mp4', {
      type: 'video/mp4'
    });
    let request = '';
    const _formData: FormData = new FormData();
    if (this.saveImage.value !== '') {
      request = JSON.stringify(this.saveVideo.value);
    }
    _formData.append('VideoFile', this.currentVideoUpload);
    _formData.append('Model', request);
    this._service.byteStorage(_formData, 'IdentityAPI/api/SaveProfileVideo').subscribe(data => {
      $('#btn-upload-videofile').prop('disabled', false);
      alert('video upload successful');
    });
  }
  InsertSizzle(sizzleId, jobId) {
    this.createVideoForm();
    this.saveVideo.value.VideoProfileId = sizzleId;
    //this.saveVideo.value.JobId = ;
    this._service.PostService(this.saveVideo.value, 'IdentityAPI/api/SaveVideo')
      .subscribe(data => {
        // alert(data);
        // this.saveVideo.reset();
      });
  }
}
