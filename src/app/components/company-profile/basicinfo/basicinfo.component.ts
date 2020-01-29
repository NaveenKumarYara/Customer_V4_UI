import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { CompanyProfile } from '../../../../models/companyprofile';
import {GetCompanyLogo} from '../../../../models/GetCompanyLogo';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service/api.service';
import { basicinfo } from './basicinfo';
import { Router } from '@angular/router';
import { CompanyProfileService } from '../company-profile.service';
import { AlertService } from '../../../shared/alerts/alerts.service';
declare var $: any;
declare var require: any;
const RecordRTC = require('recordrtc//RecordRTC.min');
// const video = document.querySelector('video');
@Component({
  selector: 'app-basicinfo',
  templateUrl: './basicinfo.component.html',
  styleUrls: ['./basicinfo.component.css'],
  providers: [ApiService, AlertService]
})
export class BasicinfoComponent implements AfterViewInit {
    @Input() companyprofile: CompanyProfile;
    @Input() getcompanylogo: GetCompanyLogo;
    private recordRTC: any;
    private stream: MediaStream;
    @ViewChild('video') video;
    recorder: any; // globally accessible


    customer: any;
    customerId: any;
    userId: any;
    videoUrl: string;
    basicinfo = new basicinfo();
    profileId: any;
    saveImage: FormGroup;
    public file_srcs: string[] = [];
    public debug_size_before: string[] = [];
    public debug_size_after: string[] = [];
    currentImageUpload: File;
    companyLogo: any;
    locations: any;
    companyName: any;
    website: any;
    contactEmail: any;
    linkedInURL: any;
    facebookURL: any;
    twitterURL: any;
    mobilePhone: any;
    homePhone: any;
    address1: any;
    address2: any;
    iseditProfile: any = false;
    fullname: any;
  firstname: any;
  lastname: any;
  currentVideoUpload: File;
  saveVideo: FormGroup;
  constructor(private _service: ApiService, private route: Router, private fb: FormBuilder, private companyprofileservice: CompanyProfileService, private alertService: AlertService) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId = this.customer.CustomerId;
    this.userId = this.customer.UserId;
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
      'IsProfile': [true, Validators.nullValidator],
      'VideoFile': [null, Validators.nullValidator],
      'JobId': [null, Validators.nullValidator],
      'VideoType': [2, Validators.nullValidator]
    });
    this.GetVideo();
   }
   ngAfterViewInit() {
    const video: HTMLVideoElement = this.video.nativeElement;
    video.muted = false;
    video.controls = true;
    video.autoplay = false;
  }

  ngOnInit() {
    this.GetCompanyLogo();
  //   $('#btn-start-recording').onclick = function() {
  //     this.disabled = true;
  //     this.captureCamera(function(camera) {
  //         this.video.srcObject = camera;
  //         this.recorder = RecordRTC(camera, {
  //             type: 'video'
  //         });
  //         const recordingDuration = parseInt($('#txt-recording-duration').val(), 10) || 5000;
  //         this.recorder.setRecordingDuration(recordingDuration).onRecordingStopped(this.stopRecordingCallback);
  //         this.recorder.startRecording();
  //         // release camera on stopRecording
  //         this.recorder.camera = camera;
  //         $('#btn-stop-recording').disabled = false;
  //         $('#btn-pause-recording').disabled = false;
  //     });
  // };

  // $('#btn-stop-recording').onclick = function() {
  //     this.disabled = true;
  //     this.recorder.stopRecording(this.stopRecordingCallback);
  // };
  // $('#btn-pause-recording').onclick = function() {
  //     this.disabled = true;
  //     if (this.innerHTML === 'Pause Recording') {
  //       this.recorder.pauseRecording();
  //         this.innerHTML = 'Resume Recording';
  //     } else {
  //       this.recorder.resumeRecording();
  //         this.innerHTML = 'Pause Recording';
  //     }
  //     setTimeout(function() {
  //         $('#btn-pause-recording').disabled = false;
  //     }, 2000);
  // };
  }

  GetVideo() {
    this._service.GetService('IdentityAPI/api/GetVideo?customerId=0&userId=', this.customer.UserId)
      .subscribe(
        data => {
          this.videoUrl = data;
        });
  }
  GetCompanyLogo() {
    return this.companyprofileservice.getCompanyLogo(this.customerId).subscribe(res => {
      this.companyLogo = res;
  });
  }

  populateCompanyProfile(customerId) {
    return this.companyprofileservice.getCompanyProfile(customerId).subscribe(res => {
        this.companyprofile = res;
    });
}
uploadPhoto() {
  let request = '';
  const _formData: FormData = new FormData();
  if (this.saveImage.value !== '') {
    request = JSON.stringify(this.saveImage.value);
  }
  _formData.append('companyLogo', this.currentImageUpload);
  _formData.append('Model', request);
  this._service.byteStorage(_formData, 'IdentityAPI/api/UpdateCompanyLogo').subscribe(data => {
    sessionStorage.setItem('ProfileThumbnail', data[0].toString());
    sessionStorage.setItem('companyLogo', data[1].toString());
    $('#headerProfilePic').attr('src', data[0]);
    this.customer.UserProfilePictureUrl = sessionStorage.getItem('companyLogo');
    this.iseditProfile = false;
    this.alertService.success('Photo uploaded successfully');
    setTimeout(() => {
      this.alertService.clear();
  }, 3000);
    this.populateCompanyProfile(this.customerId);
    this.GetCompanyLogo();

  });
}
onFileChange(event) {
  this.alertService.clear();
  const reader = new FileReader();
  if (event.target.files && event.target.files.length > 0) {
    const file = event.target.files[0];
    const stringToSplit = file.name;
    const x = stringToSplit.split('.');
    const ext = x[1];
    if ((ext === 'png' || ext === 'jpg' || ext === 'jpeg') || (ext === 'PNG' || ext === 'JPG' || ext === 'JPEG')) {
      if (file.size > 2048576) {
        this.alertService.error('Too Big Size.. File Not Allowed');
      } else {
        this.currentImageUpload = file;
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.customer.UserProfilePictureUrl = 'data:image/png;base64,' + reader.result.split(',')[1];
          this.uploadPhoto();
        };
      }
    } else {
      this.alertService.error('Please upload the files with extension jpg, png or jpeg');
      setTimeout(() => {
        this.alertService.clear();
    }, 3000);
    }

  }

}

  saveProfile() {
    this.locations = $('#searchZipCode').val();
    if (this.locations.length <= 7) {
      this.alertService.error('please select from Google Location');
      setTimeout(() => {
        this.alertService.clear();
    }, 3000);
    } else {
      this.iseditProfile = true;
      this.locations = $('#searchZipCode').val();
      this.companyName = $('#companyName').val();
      this.website = $('#webSite').val();
      this.contactEmail = $('#contactEmail').val();
      this.linkedInURL = $('#linkedinUrl').val();
      this.facebookURL = $('#facebookUrl').val();
      this.twitterURL = $('#twitterUrl').val();
      this.mobilePhone = $('#mobile').val();
      this.homePhone = $('#home').val();
      this.address1 = $('#address1').val();
      this.basicinfo.customerId = this.customerId;
      this.basicinfo.companyName =  this.companyName;
      this.basicinfo.website = this.website;
      this.basicinfo.contactEmail = this.contactEmail;
      this.basicinfo.linkedInURL = this.linkedInURL;
      this.basicinfo.facebookURL =  this.facebookURL;
      this.basicinfo.twitterURL = this.twitterURL;
      this.basicinfo.mobilePhone = this.mobilePhone;
      this.basicinfo.homePhone = this.homePhone;
      this.basicinfo.address1 = this.address1;
      this.basicinfo.address2 = this.locations;

     }
     this._service.PostService(this.basicinfo, 'ProfileAPI/api/UpdateCompanyprofile')
        .subscribe(data => {
          $('#autocompletezip').val('');
          const contents = $('#searchZipCode').val();
          $('#autocompletezip').val(contents);
          this.populateCompanyProfile(this.customerId);
          this.iseditProfile = false;
        },
          error => console.log(error));
    }

    onVideoFileChange(event) {
      const reader = new FileReader();
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        const stringToSplit = file.name;
        const x = stringToSplit.split('.');
        const ext = x[1].toLowerCase();
        if (ext === 'mp4' || ext === 'webm' || ext === 'flv') {
          if (file.size > 5048576) {
            this.alertService.error('Too Big Size.. File Not Allowed');
          } else {
            this.currentVideoUpload = file;
            this.uploadVideo(this.currentVideoUpload);
          }
        } else {
          this.alertService.error('Please upload the files with extension webm,flv,mp4');
          setTimeout(() => {
            this.alertService.clear();
        }, 3000);
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
        this.alertService.success('video upload successful');
        setTimeout(() => {
          this.alertService.clear();
      }, 3000);
        this.GetVideo();
      });
    }
    startRecording() {
      const mediaConstraints = {
        video: {
          mandatory: {
            minWidth: 1280,
            minHeight: 720
          }
        }, audio: true
      };
      navigator.mediaDevices
        .getUserMedia(null)
        .then(this.successCallback.bind(this), this.errorCallback.bind(this));


    }
    startrecord() {
      const video: HTMLVideoElement = this.video.nativeElement;
      $('#btn-stop-recording').show();
      $('#record_p').hide();
      $('#upload_p').show();
      $('#btn-start-recording').hide();
      $('#btn-upload-videofile').prop('disabled', true);
      this.captureCamera(function (camera) {
        // let video: HTMLVideoElement = this.video.nativeElement;
        // setSrcObject(camera, video);
        video.play();
        // this.recordRTC = RecordRTC(camera, {
        //   type: 'video'
        // });
        // var recordingDuration = 5000;
        // this.recordRTC.setRecordingDuration(recordingDuration).onRecordingStopped(this.stopRecordingCallback);
        this.recordRTC.startRecording();
        // release camera on stopRecording
        this.recordRTC.camera = camera;
        // $('#btn-stop-recording').disabled = false;
        // $('#btn-pause-recording').disabled = false;

        // $('#btn-stop-recording').show();
        // $('#record_p').hide();
        // $('#upload_p').show();
        // $('#btn-start-recording').hide();
      });
    }
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
      this.uploadVideo(recordedBlob);
      video.play();
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
  toggleControls() {
    const video: HTMLVideoElement = this.video.nativeElement;
    video.muted = !video.muted;
    video.controls = !video.controls;
    video.autoplay = !video.autoplay;
  }
  captureCamera(callback) {
    // navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(function (camera) {
    //   callback(camera);
    // }).catch(function (error) {
    //   alert('Unable to capture your camera. Please check console logs.');
    //   console.error(error);
    // });
    // const mediaConstraints = {
    //   video: {
    //     mandatory: {
    //       minWidth: 1280,
    //       minHeight: 720
    //     }
    //   }, audio: true
    // };
    // navigator.mediaDevices
    //   .getUserMedia(mediaConstraints)
    //   .then(this.successCallback.bind(this), this.errorCallback.bind(this));

    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
  }).then(async function(stream) {
      const recorder = RecordRTC(stream, {
          type: 'video'
      });
      recorder.startRecording();

      const sleep = m => new Promise(r => setTimeout(r, m));
      await sleep(3000);

      recorder.stopRecording(function() {
          const blob = recorder.getBlob();
          this.stopRecording(blob);
      });
  });
  }


  // -------------------------------------------------------------



//   ngAfterViewInit() {
//     // set the initial state of the video
//     const video: HTMLVideoElement = this.video.nativeElement;
//     video.muted = false;
//     video.controls = true;
//     video.autoplay = false;
//   }

//   toggleControls() {
//     const video: HTMLVideoElement = this.video.nativeElement;
//     video.muted = !video.muted;
//     video.controls = !video.controls;
//     video.autoplay = !video.autoplay;
//   }

//   successCallback(stream: MediaStream) {

//     const options = {
//       mimeType: 'video/webm', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
//       audioBitsPerSecond: 128000,
//       videoBitsPerSecond: 128000,
//       bitsPerSecond: 128000 // if this line is provided, skip above two
//     };
//     this.stream = stream;
//     this.recordRTC = RecordRTC(stream, options);
//     this.recordRTC.startRecording();
//     const video: HTMLVideoElement = this.video.nativeElement;
//     video.src = window.URL.createObjectURL(stream);
//     this.toggleControls();
//   }

//   errorCallback() {
//     // handle error here
//   }

//   processVideo(audioVideoWebMURL) {
//     const video: HTMLVideoElement = this.video.nativeElement;
//     const recordRTC = this.recordRTC;
//     video.src = audioVideoWebMURL;
//     this.toggleControls();
//     const recordedBlob = recordRTC.getBlob();
//     recordRTC.getDataURL(function (dataURL) { });
//   }

//   startRecording() {
//     $('#btn-stop-recording').show();
//         $('#record_p').hide();
//         $('#upload_p').show();
//         $('#btn-start-recording').hide();
//         $('#btn-upload-videofile').prop('disabled', true);
//     const mediaConstraints = {
//       video: {
//         mandatory: {
//           minWidth: 1280,
//           minHeight: 720
//         }
//       }, audio: true
//     };
//     navigator.mediaDevices
//       .getUserMedia(mediaConstraints)
//       .then(this.successCallback.bind(this), this.errorCallback.bind(this));


//   }

//   stopRecording() {
//     const recordRTC = this.recordRTC;
//     recordRTC.stopRecording(this.processVideo.bind(this));
//     const stream = this.stream;
//     stream.getAudioTracks().forEach(track => track.stop());
//     stream.getVideoTracks().forEach(track => track.stop());
//   }

//   download() {
//     this.recordRTC.save('video.webm');
//   }



//   // --------------------------------------------------------------

//   captureCamera(callback) {
//     navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(function(camera) {
//         callback(camera);
//     }).catch(function(error) {
//         alert('Unable to capture your camera. Please check console logs.');
//         console.error(error);
//     });
// }
//   stopRecordingCallback() {
//     video.srcObject = null;
//     const blob = this.recorder.getBlob();
//     video.src = URL.createObjectURL(blob);
//     this.recorder.camera.stop();
// }


  }
