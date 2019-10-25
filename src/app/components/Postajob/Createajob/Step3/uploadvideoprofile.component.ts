import { Component, OnInit, ViewChild, Inject, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../../shared/services/api.service/api.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import { AppService } from '../../../../app.service';
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
  uploadVideofile:any;
    customerId: any;
    userId: any;
    saveImage: FormGroup;
    videoSizzles: any;
  @ViewChild('video') video;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastsManager, private _vcr: ViewContainerRef, private _service: ApiService, private appService: AppService, private fb: FormBuilder) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId = this.customer.CustomerId;
    this.userId = this.customer.UserId;
    this.createVideoForm();
    this.toastr.setRootViewContainerRef(_vcr);
    this.GetVideoSizzle();
    this.appService.currentVideo.subscribe((data) => {
      this.videoProfile = data; // Preview of uploaded Video
    });
  }
  videoProfile: any;

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
        if (file.size > 5048576) {
          //alert('Too Big Size.. File Not Allowed');
          this.toastr.warning('Too Big Size.. File Greater than 5MB Not Allowed!', 'Oops!');
          setTimeout(() => {
              this.toastr.dismissToast;
          }, 3000);
        } else {
          this.currentVideoUpload = file;
          this.uploadVideo(this.currentVideoUpload);
        }
      } else {
        //alert('Please upload the files with extension webm,flv,mp4');
        this.toastr.warning('Please upload the files with extension webm,flv,mp4', 'Oops!');
        setTimeout(() => {
            this.toastr.dismissToast;
        }, 3000);
      }

    }
  }
  // startRecording() {
  //   const mediaConstraints = {
  //     video: {
  //       mandatory: {
  //         minWidth: 1280,
  //         minHeight: 720
  //       }
  //     }, audio: true
  //   };
  //   navigator.mediaDevices
  //     .getUserMedia(mediaConstraints)
  //     .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  //  }
   stopRecording() {
    const recordRTC = this.recordRTC;
    recordRTC.stopRecording(this.processVideo.bind(this));
    $('#btn-stop-recording').hide();
    $('#record_p').show();
    $('#upload_p').hide();
    $('#btn-start-recording').show();
    const stream = this.stream;
    stream.getAudioTracks().forEach(track => track.stop());
    stream.getVideoTracks().forEach(track => track.stop());
  }
  processVideo(audioVideoWebMURL) {
    const video: HTMLVideoElement = this.video.nativeElement;
    const recordRTC = this.recordRTC;
    video.src = audioVideoWebMURL;
    this.toggleControls();
    const recordedBlob = recordRTC.getBlob();
    // recordRTC.getDataURL(function (dataURL) { });

    // this.currentVideoUpload = new File([recordedBlob], 'filename.mp4', {
    //   type: 'video/mp4'
    // });
    // // var reader = new FileReader();
    // // reader.readAsDataURL(recordedBlob);
    // // let base64data = reader.result;
    // // console.log(base64data);
    // // localStorage.setItem('file', base64data)
    // // this.callstop();
    // // this.currentVideoUpload = this.dataURLtoFile(file, 'filename.webm');
    // // console.log(file);

    // let request = '';
    // let _formData: FormData = new FormData();
    // if (this.saveImage.value !== '') {
    //   request = JSON.stringify(this.saveVideo.value);
    // }
    // _formData.append('VideoFile', this.currentVideoUpload);
    // _formData.append('Model', request);
    // this._service.byteStorage(_formData, 'IdentityAPI/api/SaveProfileVideo').subscribe(data => {
    //   $('#btn-upload-videofile').prop('disabled', false);
    //   Swal('video upload successful');
    // });
    this.uploadVideo(recordedBlob);
    video.play();
  }
  // uploadVideo(blob) {
  //   this.currentVideoUpload = new File([blob], 'filename.mp4', {
  //     type: 'video/mp4'
  //   });
  //   let request = '';
  //   const _formData: FormData = new FormData();
  //   if (this.saveImage.value !== '') {
  //     request = JSON.stringify(this.saveVideo.value);
  //   }
  //   _formData.append('VideoFile', this.currentVideoUpload);
  //   _formData.append('Model', request);
  //   this._service.byteStorage(_formData, 'IdentityAPI/api/SaveProfileVideo').subscribe(data => {
  //     $('#btn-upload-videofile').prop('disabled', false);
  //     alert('video upload successful');
  //   });
  // }
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
   
      this.toastr.success('Video Uploaded Successfully', 'Success!');
      setTimeout(() => {
          this.toastr.dismissToast;
      }, 3000);
      // Preview of uploaded Video
      this.appService.currentVideo.subscribe((data) => {
        this.videoProfile = data;
      // Preview of uploaded Video
      });
      $('#btn-upload-videofile').prop('disabled', false);
      this.uploadVideofile = data;
      this.appService.updateVideoProfile(this.uploadVideofile);
      //alert('video upload successful');
      this.saveVideo.reset();
    });
  }
  InsertSizzle(sizzleId,sizzleUrl?) {
    this.createVideoForm();
    this.saveVideo.value.VideoProfileId = sizzleId;
    this.saveVideo.value.JobId = this.data.jobId ;
    this._service.PostService(this.saveVideo.value, 'IdentityAPI/api/SaveVideo')
      .subscribe(data => {
          //alert('video upload successful');
          this.toastr.success('Video Uploaded Successfully', 'Success!');
          setTimeout(() => {
              this.toastr.dismissToast;
          }, 3000);
          // this.appService.videoProfile.subscribe(x => this.prfLoc = x);
          this.appService.updateVideoProfile(sizzleUrl);
          this.saveVideo.reset();
      });
  }
  toggleControls() {
    const video: HTMLVideoElement = this.video.nativeElement;
    video.muted = !video.muted;
    video.controls = !video.controls;
    video.autoplay = !video.autoplay;
  }

  successCallback(stream: MediaStream) {
    const twoMinutes = 1 * 1000 * 60;
    const options = {
      mimeType: 'video/webm', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 128000,
      bitsPerSecond: 928000 // 8000000000  if this line is provided, skip above two
    };
    this.stream = stream;
    this.recordRTC = RecordRTC(stream, options);
    this.recordRTC.startRecording();
    const video: HTMLVideoElement = this.video.nativeElement;
    video.play();

    // var recordingDuration = 500;
    // this.recordRTC.setRecordingDuration(recordingDuration).onRecordingStopped(this.stopRecordingCallback);
    // this.recordRTC.startRecording();
    // release camera on stopRecording
    // this.recordRTC.camera = camera;

    // $('#btn-stop-recording').prop('disabled', false);
    // $('#btn-pause-recording').prop('disabled', false);

    video.src = URL.createObjectURL(stream);
    this.toggleControls();
    // this.recordRTC.setRecordingDuration(twoMinutes, function () {
    //   video.src = this.toURL();
    //   var blob = this.getBlob();
    //   video.src = this.toURL();
    //   var file = new File([blob], 'filename.webm', {
    //     type: 'video/webm'
    //   });
    //   // var base64Image = new Buffer(blob, 'binary').toString('base64');
    //   // localStorage.setItem('file', base64Image);
    //   var reader = new FileReader();
    //   reader.readAsDataURL(blob);
    //   // reader.onloadend = function () {
    //   let base64data = reader.result;
    //   console.log(base64data);
    //   localStorage.setItem('file', base64data)
    //   video.src = this.toURL();
    // });
  }

  errorCallback() {
    // handle error here
  }

}
