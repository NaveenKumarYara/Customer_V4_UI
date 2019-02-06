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
  email:any;
  show : any = false;
  result :any;
  emailPattern = ".+@.+\\.[a-z]+"; 
  info =new Register();
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
 
  Login()
  {
    this.router.navigateByUrl('home'); 
  }

  Layout()
  {
    this.router.navigateByUrl('layout'); 
  }

  GetEmailValidate()
  {
    this.show = false;
    this.appService.validateemail(this.signUpform.value.ContactEmail)
    .subscribe(
    data => {
      this.result = data;
      if(this.result.UserId>0&&this.result.CustomerId>0)
      {  
        this.show = true;    
      }
    })
  }

  SignUp() {
    this.show = false;
    if(!this.signUpform.valid)
    {
      this.alertService.error('Please provide the valid details');
      setTimeout(() => {
        this.alertService.clear();
      }, 2000);
    }
    else
    {

        this.appService.signUp(this.signUpform.value)
        .subscribe(
        data => {
          
        if(data>0)
        {   
          this.Email(data);
        }
        
        },
    
        error => {
          this.alertService.error('Please provide the valid details');
          this.signUpform.reset();
          setTimeout(() => {
            this.alertService.clear();
          }, 2000);
        },
        () => console.log('Call Sucessfull')
        ); 

      
  }
  }

  Email(userId)
  {
    this.info.FullName = this.signUpform.value.ContactFirstName+this.signUpform.value.ContactLastName;
    this.info.ToEmailId = this.signUpform.value.ContactEmail;
    this.info.ApplicationName = 'Arytic';
    this.info.AppLink ='http://demo.tenendus.com:1060/home;Uid='+userId; 
    this.info.ClientLogo = '';
    this.appService.SignUpEmail(this.info).subscribe(data => {
      if (data==0) {
        this.alertService.success('Please check your Mail to Activate');
        this.signUpform.reset();
        setTimeout(() => {
          this.alertService.clear();
          this.router.navigateByUrl('home');   
        }, 2000);
      }

      });
  }
  MissClear() {
    this.alertService.clear();
  }

  ngOnInit() {
    this.show = false;
    this.signUpform = this.fb.group({
      'CandidateIdentifier':  ['', Validators.compose([Validators.nullValidator])],
      'CustomerId': [0, Validators.compose([Validators.nullValidator])],
      'UserId'  : [0, Validators.compose([Validators.required])],
      'CompanyName': ['', Validators.compose([Validators.required])],
      'CompanySizeId'  : [1, Validators.compose([Validators.required])],
      'CompanyLogo':['', Validators.compose([Validators.nullValidator])],
      'ContactFirstName': ['', Validators.compose([Validators.required])],
      'ContactMiddleName': ['', Validators.compose([Validators.nullValidator])],
      'ContactLastName': ['', Validators.compose([Validators.required])],
      'ContactNumber': ['',  Validators.compose([Validators.nullValidator,Validators.minLength(10)])],   
      'ContactEmail'   : ['', Validators.compose([Validators.required, Validators.email])],
      'Password': ['', Validators.compose([Validators.required])],
      'Address1': ['austin', Validators.compose([Validators.required])],
      'Address2': ['', Validators.compose([Validators.nullValidator])],
      'ZipCode': ['56898', Validators.compose([Validators.required])],
      'CountryName': ['USA', Validators.compose([Validators.required])],
      'StateName': ['texas', Validators.compose([Validators.required])],
      'CityName': ['austin', Validators.compose([Validators.required])],        
      'PreferredContactDate': ['', Validators.compose([Validators.nullValidator])],
      'FromTime':['', Validators.compose([Validators.nullValidator])],
      'ToTime'   : ['', Validators.compose([Validators.nullValidator])],
      'WebSite':['', Validators.compose([Validators.nullValidator])],        
      'Description': ['', Validators.compose([Validators.nullValidator])],
      'TimeZoneId'  : [1, Validators.compose([Validators.required])],
      'UserRoleId':[4, Validators.compose([Validators.required])],   
      'ObjCompany': ['', Validators.compose([Validators.nullValidator])],
      'ObjTimeZone':  ['', Validators.compose([Validators.nullValidator])]
    //   'ObjCompany': {
    //     'CompanySizeId'  : [1, Validators.compose([Validators.required])],
    //     'CompanySize': ['', Validators.compose([Validators.nullValidator])]
    //   },
     
    //  'ObjTimeZone': {
    //   'TimeZoneId'  : [1, Validators.compose([Validators.required])],
    //   'TimeZone': ['', Validators.compose([Validators.nullValidator])]
    //   },   
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


export class Register
{

   FullName: string;
   ToEmailId: string;
   ApplicationName: string;
   AppLink: string;
   ClientLogo: string;
   }
