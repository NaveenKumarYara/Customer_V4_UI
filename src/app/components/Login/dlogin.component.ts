import { Component, ViewContainerRef } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { AppService } from '../../app.service';
import { AlertService } from '../../shared/alerts/alerts.service';
import { GetCandidateprofileComponent } from '../GetProfileDetails/GetProfile.component';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { SettingsService } from '../../../settings/settings.service';
declare var $: any;
@Component({

  selector: 'login',
  templateUrl: './dlogin.component.html',
  styleUrls: ['./dlogin.component.css'],
  providers: [AppService, AlertService]
})
export class dLoginComponent {
  loading = false;
  loginstyle(): void {
    this.loading = true;
  }

  currentURL = '';
  loginform: any;
  customerId: any;
  myRecaptcha = new FormControl(false);
  companyLogo: any;
  DomainUrl: any;
  show: any = false;
  result: any;
  Uid: any;
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$";
  password: any;
  userId: any;
  preId: any;
  cid: any;
  JobId: any;
  CId: any;

  constructor(private dialog: MatDialog, private toastr: ToastsManager, private _vcr: ViewContainerRef, private route: ActivatedRoute,
    private fb: FormBuilder, private router: Router, private appService: AppService, private alertService: AlertService, private settingsService: SettingsService) {
    this.route.params.subscribe(params => {
      if (params['Uid'] > 0) {
        this.ActivatetheUser(params['Uid']);
      }
      if (params['Preid'] > 0) {
        sessionStorage.setItem('Preid', params['Preid']);
        sessionStorage.setItem('jobId', params['Id']);
        sessionStorage.setItem('Cid', params['Cid'])
      }
      if (params['JobId'] > 0) {
        sessionStorage.setItem('JobId', params['JobId']);
        sessionStorage.setItem('CId', params['CId'])
      }

    });
    this.currentURL = window.location.href;
    this.toastr.setRootViewContainerRef(_vcr);

  }

  //   login1(username: string, password: string) {
  //     return this.http.post<any>('/api/authenticate', { username: username, password: password })
  //         .map(user => {
  //             // login successful if there's a jwt token in the response
  //             if (user && user.token) {
  //                 // store user details and jwt token in local storage to keep user logged in between page refreshes
  //                 localStorage.setItem('currentUser', JSON.stringify(user));
  //             }

  //             return user;
  //         });
  // }

  onScriptLoad() {
    console.log('Google reCAPTCHA loaded and is ready for use!')
  }

  onScriptError() {
    console.log('Something went long when loading the Google reCAPTCHA')
  }
  SignUp() {
    //this.router.navigateByUrl('signup'); 
    window.location.href = this.settingsService.settings.customerSignUp;
  }
  forgot() {
    //this.router.navigateByUrl('ForgotPassword'); 
    window.location.href = this.settingsService.settings.ForgotPasswordurl;
  }
  Redirect() {
    window.location.href = this.settingsService.settings.Arytic;
  }

  login() {
    this.loading = true;
    if (!this.loginform.valid && this.myRecaptcha.value === false) {
      this.loading = false;
      this.toastr.error('Please provide the valid details!', 'Oops!');
      setTimeout(() => {
        this.toastr.dismissToast;
      }, 3000);
      this.loginform.reset();
    }
    else if (!this.loginform.valid) {
      this.loading = false;
      this.toastr.error('Please provide the valid details!', 'Oops!');
      setTimeout(() => {
        this.toastr.dismissToast;
      }, 3000);
      this.loginform.reset();
    }
    else if (this.myRecaptcha.value === false) {
      this.loading = false;
      this.toastr.error('Please provide captcha!', 'Oops!');
      setTimeout(() => {
        this.toastr.dismissToast;
      }, 3000);
    }
    else if (this.myRecaptcha.value === true) {
      this.appService.validateCheckemail(this.loginform.value.Email)
        .subscribe(
          data2 => {
            this.result = data2;
            if (data2 != 5 && data2 != 2) {

              this.appService.Login(this.loginform.value)
                .subscribe(
                  data => {
                    this.DomainUrl = data.CustomDomainUrl + '/login';
                    // let Name =

                    if (data.IsActive == false) {
                      this.loading = false;
                      this.toastr.error('Please activate the link to login!', 'Oops!');
                      setTimeout(() => {
                        this.toastr.dismissToast;
                      }, 3000);
                      this.loginform.reset();
                    }
                    else {
                      if (data.CustomDomain != true && !this.currentURL.includes("esolvit")) {
                        //debugger   
                        this.password = $("#password").val();
                        sessionStorage.setItem('oldPassword', JSON.stringify(this.password));
                        sessionStorage.setItem('isLoggedin', JSON.stringify('true'));
                        sessionStorage.setItem('userData', JSON.stringify(data));
                        this.customerId = data.CustomerId;
                        this.userId = data.UserId;
                        if (this.preId != null) {
                          if (this.cid == this.customerId) {

                            this.router.navigateByUrl('app-view-jobdetails');
                            const chatboxdialogRef = this.dialog.open(GetCandidateprofileComponent,
                              {
                                width: '750',
                                position: { right: '0px' },
                                height: '750px',
                                data: {
                                  animal: 'panda'
                                }
                              }
                            );
                            chatboxdialogRef.afterClosed().subscribe(result => {
                              console.log('Chatbox Dialog result: ${result}');
                            });
                          }
                          else {
                            this.router.navigateByUrl('app-dashboardview');
                          }
                          //this.router.navigate(['/app-Getcandidateprofile']);
                        }
                        if (this.JobId != null) {
                          if (this.CId == this.customerId) {
                            sessionStorage.setItem('jobId', JSON.stringify(this.JobId));
                            this.router.navigateByUrl('app-view-jobdetails');
                          }
                          else {
                            this.router.navigateByUrl('app-dashboardview');
                          }
                          //this.router.navigate(['/app-Getcandidateprofile']);
                        }
                        else if (this.preId == null || this.preId == undefined) {
                          this.router.navigateByUrl('app-dashboardview');
                        }
                        else if (this.JobId == null || this.JobId == undefined) {
                          this.router.navigateByUrl('app-dashboardview');
                        }

                      }
                      if (data.CustomDomain === true && !this.currentURL.includes("esolvit")) {
                        //debugger   
                        this.password = $("#password").val();
                        sessionStorage.setItem('oldPassword', JSON.stringify(this.password));
                        sessionStorage.setItem('isLoggedin', JSON.stringify('true'));
                        sessionStorage.setItem('userData', JSON.stringify(data));
                        this.customerId = data.CustomerId;
                        this.userId = data.UserId;
                        if (this.preId != null) {
                          if (this.cid == this.customerId) {

                            this.router.navigateByUrl('app-view-jobdetails');
                            const chatboxdialogRef = this.dialog.open(GetCandidateprofileComponent,
                              {
                                width: '750',
                                position: { right: '0px' },
                                height: '750px',
                                data: {
                                  animal: 'panda'
                                }
                              }
                            );
                            chatboxdialogRef.afterClosed().subscribe(result => {
                              console.log('Chatbox Dialog result: ${result}');
                            });
                          }
                          else {
                            this.router.navigateByUrl('app-dashboardview');
                          }
                          //this.router.navigate(['/app-Getcandidateprofile']);
                        }
                        if (this.JobId != null) {
                          if (this.CId == this.customerId) {
                            sessionStorage.setItem('jobId', JSON.stringify(this.JobId));
                            this.router.navigateByUrl('app-view-jobdetails');
                          }
                          else {
                            this.router.navigateByUrl('app-dashboardview');
                          }
                          //this.router.navigate(['/app-Getcandidateprofile']);
                        }
                        else if (this.preId == null || this.preId == undefined) {
                          this.router.navigateByUrl('app-dashboardview');
                        }
                        else if (this.JobId == null || this.JobId == undefined) {
                          this.router.navigateByUrl('app-dashboardview');
                        }

                      }
                      if (data.CustomDomain === true && this.currentURL.includes("esolvit")) {
                        //debugger    
                        this.password = $("#password").val();
                        sessionStorage.setItem('oldPassword', JSON.stringify(this.password));
                        sessionStorage.setItem('isLoggedin', JSON.stringify('true'));
                        sessionStorage.setItem('userData', JSON.stringify(data));
                        this.customerId = data.CustomerId;
                        this.userId = data.UserId;
                        if (this.preId != null) {
                          if (this.cid == this.customerId) {

                            this.router.navigateByUrl('app-view-jobdetails');
                            const chatboxdialogRef = this.dialog.open(GetCandidateprofileComponent,
                              {
                                width: '750',
                                position: { right: '0px' },
                                height: '750px',
                                data: {
                                  animal: 'panda'
                                }
                              }
                            );
                            chatboxdialogRef.afterClosed().subscribe(result => {
                              console.log('Chatbox Dialog result: ${result}');
                            });
                          }
                          else {
                            this.router.navigateByUrl('app-dashboardview');
                          }
                          //this.router.navigate(['/app-Getcandidateprofile']);
                        }
                        if (this.JobId != null) {
                          if (this.CId == this.customerId) {
                            sessionStorage.setItem('jobId', JSON.stringify(this.JobId));
                            this.router.navigateByUrl('app-view-jobdetails');
                          }
                          else {
                            this.router.navigateByUrl('app-dashboardview');
                          }
                          //this.router.navigate(['/app-Getcandidateprofile']);
                        }
                        else if (this.preId == null || this.preId == undefined) {
                          this.router.navigateByUrl('app-dashboardview');
                        }
                        else if (this.JobId == null || this.JobId == undefined) {
                          this.router.navigateByUrl('app-dashboardview');
                        }

                      }

                      if (data.CustomDomain != true && this.currentURL.includes("esolvit")) {
                        this.loading = false;
                        this.toastr.error('Invalid Authentication please try to login from Arytic!', 'Oops!');
                        setTimeout(() => {
                          this.loading = false;
                          this.toastr.dismissToast;
                        }, 3000);

                      }

                    }
                  },

                  error => {
                    this.loading = false;
                    this.toastr.error('Please provide the valid details!', 'Oops!');
                    setTimeout(() => {
                      this.toastr.dismissToast;
                    }, 3000);
                    this.loginform.reset();
                  },
                  () => console.log('Call Sucessfull')
                );

            }
            if (data2 === 5 || data2 === 2) {
              this.loading = false;
              this.toastr.warning('Email registered as Jobseeker please try to login as Jobseeker!', 'Oh no!');
              setTimeout(() => {
                this.toastr.dismissToast;
              }, 3000);
              this.loginform.reset
            }
            if (data2 === 0) {
              this.loading = false;
              this.toastr.error('Email Not Registered!', 'Oops!');
              setTimeout(() => {
                this.toastr.dismissToast;
              }, 3000);
              this.loginform.reset();
            }
          });
    }
  }
  MissClear() {
    this.show = false;
    this.alertService.clear();
  }

  ActivatetheUser(Uid) {
    this.appService.ActivateUser(Uid).subscribe(
      data => {
        this.loading = false;
        this.toastr.success('Customer is activated. Please login to continue', 'Success');
        setTimeout(() => {
          this.toastr.dismissToast;
        }, 3000);
      })
  }




  ngOnInit() {
    this.show = false;
    this.preId = sessionStorage.getItem('Preid');
    this.cid = sessionStorage.getItem('Cid');
    this.CId = sessionStorage.getItem('CId');
    this.JobId = sessionStorage.getItem('JobId');
    this.loginform = this.fb.group({
      'Email': ['', Validators.compose([Validators.required])],
      'Password': ['', Validators.compose([Validators.required])],
    });
    $(".glyphicon-eye-open").on("click", function () {
      $(this).toggleClass("glyphicon-eye-close");
      var type = $("#password").attr("type");
      if (type === 'text') {
        $('#password').prop('type', 'password');
      } else {
        $('#password').prop('type', 'text');
      }
    });

    //

    //

  }
}

