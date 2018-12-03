import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { AppService } from '../../app.service';
import { AlertService } from '../../shared/alerts/alerts.service';
declare var $: any; 
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers:[AppService,AlertService]
})
export class SignUpComponent {
  
  signUpform: any;
  customerId:any;
  companyLogo:any;
  password:any;
  userId:any;
  constructor( private route: ActivatedRoute,private fb: FormBuilder, private router: Router,private appService: AppService,private alertService : AlertService) {
    this.route.params.subscribe(params => {
        console.log(params);
        if (params['id'] > 0) {
          // this.populatePersonType(params['jobId']);
          // this.PopulateJobdetail(params['jobId']);
          //  this.creteComponent.PopulateJobdetail(params['jobId']);
          // create session to it and store while loging in 
          sessionStorage.setItem('Id', params['id']);
        }
      });
  }
 
 

  SignUp() {
    this.signUpform.value.UserName = this.signUpform.value.Email;
    this.appService.signUp(this.signUpform.value)
    .subscribe(
    data => {
          this.router.navigateByUrl('home');
    },

    error => {
      this.signUpform.reset();
    },
    () => console.log('Call Sucessfull')
    );
   
  }
  MissClear() {
    this.alertService.clear();
  }

  ngOnInit() {
    this.signUpform = this.fb.group({
        'UserId'  : [0, Validators.compose([Validators.required])],
        'CandidateIdentifier':  ['', Validators.compose([Validators.nullValidator])],
        'FirstName': ['', Validators.compose([Validators.required])],
        'MiddleName': ['', Validators.compose([Validators.nullValidator])],
        'LastName': ['', Validators.compose([Validators.required])],
        'UserName': ['', Validators.compose([Validators.nullValidator])],
        'Email'   : ['', Validators.compose([Validators.required, Validators.email])],
        'DateofBirth': ['', Validators.compose([Validators.nullValidator])],
        'AlternateEmailId'   : ['abc@esolvit.com', Validators.compose([Validators.nullValidator, Validators.email])],
        'HomeAreaCode': ['', Validators.compose([Validators.nullValidator])],
        'HomeCountryCodeId'  : [1, Validators.compose([Validators.required])],
        'HomePhone': ['', Validators.compose([Validators.required])],
        'MobileCountryCodeId'  : [1, Validators.compose([Validators.required])],
        'MobilePhone': ['', Validators.compose([Validators.required])],             
        'Password': ['', Validators.compose([Validators.required])],
        'IsFaceBookUser':[true, Validators.compose([Validators.nullValidator])],
        'IsLinkedInUser': [true, Validators.compose([Validators.nullValidator])],
        'IsGooglePlusUser':[true, Validators.compose([Validators.nullValidator])],
        'UserRoleId':[5, Validators.compose([Validators.required])],
       'CustomerId': [null, Validators.compose([Validators.nullValidator])],
        'IsActive': [true, Validators.compose([Validators.nullValidator])],
        'UserProfilePictureUrl':['', Validators.compose([Validators.nullValidator])],
        'ProfilePic':['', Validators.compose([Validators.nullValidator])],
        'IpAddress':['', Validators.compose([Validators.nullValidator])],
       'Address1': ['austin', Validators.compose([Validators.required])],
       'Address2': ['', Validators.compose([Validators.nullValidator])],
      'StateId':  [1, Validators.compose([Validators.required])],
      'CityId':  [1, Validators.compose([Validators.required])],
      'ZipCode': ['56898', Validators.compose([Validators.required])],
      'CityName': ['austin', Validators.compose([Validators.required])],
      'StateCode': ['tx', Validators.compose([Validators.nullValidator])],
      'StateName': ['tx', Validators.compose([Validators.nullValidator])],
       'CountryName': ['USA', Validators.compose([Validators.required])],
      });
    $(".glyphicon-eye-open").on("click", function () {
      $(this).toggleClass("glyphicon-eye-close");
      var type = $("#password").attr("type");
      if (type == "text") {
        $("#password").prop('type', 'password');
      }
      else {
        $("#password").prop('type', 'text');
      }
    });

  }
}

