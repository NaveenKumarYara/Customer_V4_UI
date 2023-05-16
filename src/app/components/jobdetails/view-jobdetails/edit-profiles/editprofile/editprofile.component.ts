import { Component, OnInit, Inject, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { JobdetailsService } from '../../../../jobdetails/jobdetails.service';
import { MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { SearchProfileDeatils } from '../../../models/SearchProfileDeatils';
import { Profile } from '../../../models/SearchProfileDeatils';
import { AlertService } from '../../../../../shared/alerts/alerts.service';
import { BulkApply, XmlJobResponse } from './../../upload-profiles/bulkApply';
import { AppService } from '../../../../../app.service';
import { SettingsService } from '../../../../../../settings/settings.service';
import { CustomerSubscription } from '../../../../../../models/CustomerSubscription';
import { GetSubscriptionDetails } from '../../../../../../models/GetSubscriptionDetails';
import { FileUploader } from 'ng2-file-upload';
import { CustStatusRes } from '../../../models/ScheduleType';
import { ApiService } from '../../../../../shared/services';
import { MatchingParameterDetails } from '../../../models/jobdetailsprofile';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { setTheme } from 'ngx-bootstrap/utils';
import { promise } from 'protractor';
import { resolve } from 'url';
import { c } from '@angular/core/src/render3';
const URL = 'http://localhost:4200/fileupload/';
const http = require('https');
const fs = require('fs');
declare var $: any;
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css'],
  providers: [NgxSpinnerService, AlertService]
})
export class EditprofileComponent implements OnInit {
  emailCheck = false;
  selectedIndex = -1;
  selectedeIndex = -1;
  selectedcIndex = -1;
  TitleId:any=0;
  Inprogress : boolean = false;
  EditSkill:boolean=false;
  EditDomain:boolean=false;
  EditE:boolean=false;
  EditBD:boolean=false;
  EditT:boolean=false;
  EditKey:boolean=false;
  roleweight:any;
  expweight:any;
  selectedskill  = -1;
  selectedDomain  = -1;
  selectedkey  = -1;
  errorText: number = 0;
  editCertification:boolean=false;
  fileUploadForm: FormGroup;
  moreShow: number;
  totalFile: number = 0;
  pprofiles = new processProfiles();
  searchprofilesFrom: FormGroup;
  searchprofiles: Profile[];
  isPublic: any = false;
  Jskills:any=[];
  JMskills:any=[];
  FitDetails: any;
  Jdomains:any=[];
  JMdomains:any=[];
  public profileStatus: ProfileStatus[] = [];
  formDAtaList: Array<FormData> = [];
  formData = new FormData();
  fileCount: number = 0;
  editWorkExperience:boolean=false;
  successCount: number = 0;
  issueCount: number = 0;
  ProfileIds:any = [];
  subdetails= new CustomerSubscription();
  sdetails= new GetSubscriptionDetails();
  profiles: Profile[];
  searchprocess: any;
  Count: any;
  CProfileId:any;
  expMonthExp: number;
  yearerror: number = 0;
  expYearExp: number;
  public certForm: FormGroup;
  filteredProviders = [];
  filteredCertificate = [];
  Id:any;
  Ccode:any;
  selectCountry : any;
  roleFitDetails :any;
  provide:Provider;
  isLoading = false;
  cisLoading = false;
  profileDetails:ProfileDetails;
  education:ProfileEducation[]=[];
  experience:ProfileExperience[]=[];
  certificate:ProfileCertification[]=[];
  achievements:any=[];
  eduForm: FormGroup;
  CandidateExp: CandidateExp = new CandidateExp();
  selectedFileNames: string[] = [];
  totalSelectedDoc: number = 0;
  inviteinfo = new InviteInfo();
  bulkApply = new BulkApply();
  xmlJobResponse: XmlJobResponse[] = [];
  loaddata = true;
  degreeList: any = [];
  years: any = [];
  uploadRes:any = [];
  uploadResponse: UploadResponse[] = [];
  tempuploadResponse: UploadResponse[] = [];
  displayprofiles: any;
  skillfitcheck: any = [];
  editRoleFitShow = false;
  editExperience = false;
  editSkills = false;
  Skill = {
  labels: [],
  datasets: [
    {
      label: "Skill Fit",
      data: [],

      backgroundColor: ["rgb(255, 99, 132)"],
    },
  ],
};
insertrole = new InsertRole();
Job = {
  labels: ["Experience Fit", "Role Fit", "Job Hopping", "Education"],
  datasets: [
    {
      label: "Job Fit",
      fill: true,
      backgroundColor: "rgb(54, 162, 235, 0.2)",
      borderColor: "#4472C4",
      pointBackgroundColor: "#4472C4",
      pointBorderColor: "#4472C4",
      pointHoverBackgroundColor: "#4472C4",
      borderWidth: 5,
      pointBorderWidth: 5,
      pointHoverBorderColor: "rgba(179,181,198,1)",
      data: [],
    },
  ],
};
  searchString: any;
  SearchList: any = [];
  norecord: any = false;
  isFullDisplayed: any = false;
  email: any;
  jobdetailscustomer:any;
  editEducation:boolean=false;
  customerId = null;
  // userId: number;
  customerName = null;
  slice: number;
  proForm:FormGroup;
  expForm:FormGroup;
  showThis: string;
  open: boolean = true;
  showMenu: boolean;
  matchingParameterDetails = new MatchingParameterDetails();
  matchingParameterData = new MatchingParameterDetails();
  selectedMenuItem: any;
  selectedSubMenuItem: any;
  sideBarMenu: any = [];
  saveUsername: boolean;
  editPersonalDetails: boolean;
  selectedFiles: any= [];
  selecteeJobId: any;
  isProcessing: boolean;
  processedProfiles: any=[];
  processedProfile: any=[];
  haveProfiles: boolean=false;
  currentRecordIndex: number;
  selectedCandidate: any;
  uploader:FileUploader;
  statuscheck : CustStatusRes;
  status:any=[];
  checks:any=[];
  showInput:string;
  processed:boolean=false;
  Cfile:File;
  @ViewChild('divClick') divClick: ElementRef;
  JobdId: any;
  IndustryId: string;
  Title: string ='';
  CoreId: string;
  CategoryId: string;
  addkeyList: any=[];
  expMonth: number=0;
  expYear: number=0;
  expsMonth: number=0;
  expsYear: number=0;
  Percentweightage: any;
  // tslint:disable-next-line:max-line-length
  constructor(private appService: AppService,private _service: ApiService,private _snackBar: MatSnackBar, private spinner: NgxSpinnerService, private toastr: ToastsManager, private _vcr: ViewContainerRef, private fb: FormBuilder, private jobdetailsservice: JobdetailsService, @Inject(MAT_DIALOG_DATA) public data: any, private alertService: AlertService, private settingsService: SettingsService) {
    this.selectedFileNames = [];

      setTheme('bs3');
    this.customerName = JSON.parse(sessionStorage.getItem('userData'));
    this.displayprofiles = JSON.parse(localStorage.getItem('DisplayUpload'));
    this.customerId = this.customerName.CustomerId;
    // this.userId = this.customerName.UserId;
    this.toastr.setRootViewContainerRef(_vcr);
    let maxFileSize = 2 * 1024 * 1024;
    this.uploader = new FileUploader({
      url: URL,
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      allowedFileType: ['pdf','doc','rtf','docx'],
      maxFileSize : maxFileSize,
      formatDataFunction: async (item) => {
        return new Promise( (resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date()
          });
        });
      }
    });

    this.selectCountry = [
      {
        "name": "United States/Canada",
        "dial_code": "+1",
        "code": "US/CA"
        },
      {
      "name": "Afghanistan",
      "dial_code": "+93",
      "code": "AF"
      },
      {
      "name": "Aland Islands",
      "dial_code": "+358",
      "code": "AX"
      },
      {
      "name": "Albania",
      "dial_code": "+355",
      "code": "AL"
      },
      {
      "name": "Algeria",
      "dial_code": "+213",
      "code": "DZ"
      },
      {
      "name": "AmericanSamoa",
      "dial_code": "+1 684",
      "code": "AS"
      },
      {
      "name": "Andorra",
      "dial_code": "+376",
      "code": "AD"
      },
      {
      "name": "Angola",
      "dial_code": "+244",
      "code": "AO"
      },
      {
      "name": "Anguilla",
      "dial_code": "+1 264",
      "code": "AI"
      },
      {
      "name": "Antarctica",
      "dial_code": "+672",
      "code": "AQ"
      },
      {
      "name": "Antigua and Barbuda",
      "dial_code": "+1268",
      "code": "AG"
      },
      {
      "name": "Argentina",
      "dial_code": "+54",
      "code": "AR"
      },
      {
      "name": "Armenia",
      "dial_code": "+374",
      "code": "AM"
      },
      {
      "name": "Aruba",
      "dial_code": "+297",
      "code": "AW"
      },
      {
      "name": "Australia",
      "dial_code": "+61",
      "code": "AU"
      },
      {
      "name": "Austria",
      "dial_code": "+43",
      "code": "AT"
      },
      {
      "name": "Azerbaijan",
      "dial_code": "+994",
      "code": "AZ"
      },
      {
      "name": "Bahamas",
      "dial_code": "+1 242",
      "code": "BS"
      },
      {
      "name": "Bahrain",
      "dial_code": "+973",
      "code": "BH"
      },
      {
      "name": "Bangladesh",
      "dial_code": "+880",
      "code": "BD"
      },
      {
      "name": "Barbados",
      "dial_code": "+1 246",
      "code": "BB"
      },
      {
      "name": "Belarus",
      "dial_code": "+375",
      "code": "BY"
      },
      {
      "name": "Belgium",
      "dial_code": "+32",
      "code": "BE"
      },
      {
      "name": "Belize",
      "dial_code": "+501",
      "code": "BZ"
      },
      {
      "name": "Benin",
      "dial_code": "+229",
      "code": "BJ"
      },
      {
      "name": "Bermuda",
      "dial_code": "+1 441",
      "code": "BM"
      },
      {
      "name": "Bhutan",
      "dial_code": "+975",
      "code": "BT"
      },
      {
      "name": "Bolivia, Plurinational State of",
      "dial_code": "+591",
      "code": "BO"
      },
      {
      "name": "Bosnia and Herzegovina",
      "dial_code": "+387",
      "code": "BA"
      },
      {
      "name": "Botswana",
      "dial_code": "+267",
      "code": "BW"
      },
      {
      "name": "Brazil",
      "dial_code": "+55",
      "code": "BR"
      },
      {
      "name": "British Indian Ocean Territory",
      "dial_code": "+246",
      "code": "IO"
      },
      {
      "name": "Brunei Darussalam",
      "dial_code": "+673",
      "code": "BN"
      },
      {
      "name": "Bulgaria",
      "dial_code": "+359",
      "code": "BG"
      },
      {
      "name": "Burkina Faso",
      "dial_code": "+226",
      "code": "BF"
      },
      {
      "name": "Burundi",
      "dial_code": "+257",
      "code": "BI"
      },
      {
      "name": "Cambodia",
      "dial_code": "+855",
      "code": "KH"
      },
      {
      "name": "Cameroon",
      "dial_code": "+237",
      "code": "CM"
      },
      {
      "name": "Cape Verde",
      "dial_code": "+238",
      "code": "CV"
      },
      {
      "name": "Cayman Islands",
      "dial_code": "+ 345",
      "code": "KY"
      },
      {
      "name": "Central African Republic",
      "dial_code": "+236",
      "code": "CF"
      },
      {
      "name": "Chad",
      "dial_code": "+235",
      "code": "TD"
      },
      {
      "name": "Chile",
      "dial_code": "+56",
      "code": "CL"
      },
      {
      "name": "China",
      "dial_code": "+86",
      "code": "CN"
      },
      {
      "name": "Christmas Island",
      "dial_code": "+61",
      "code": "CX"
      },
      {
      "name": "Cocos (Keeling) Islands",
      "dial_code": "+61",
      "code": "CC"
      },
      {
      "name": "Colombia",
      "dial_code": "+57",
      "code": "CO"
      },
      {
      "name": "Comoros",
      "dial_code": "+269",
      "code": "KM"
      },
      {
      "name": "Congo",
      "dial_code": "+242",
      "code": "CG"
      },
      {
      "name": "Congo, The Democratic Republic of the Congo",
      "dial_code": "+243",
      "code": "CD"
      },
      {
      "name": "Cook Islands",
      "dial_code": "+682",
      "code": "CK"
      },
      {
      "name": "Costa Rica",
      "dial_code": "+506",
      "code": "CR"
      },
      {
      "name": "Cote d'Ivoire",
      "dial_code": "+225",
      "code": "CI"
      },
      {
      "name": "Croatia",
      "dial_code": "+385",
      "code": "HR"
      },
      {
      "name": "Cuba",
      "dial_code": "+53",
      "code": "CU"
      },
      {
      "name": "Cyprus",
      "dial_code": "+357",
      "code": "CY"
      },
      {
      "name": "Czech Republic",
      "dial_code": "+420",
      "code": "CZ"
      },
      {
      "name": "Denmark",
      "dial_code": "+45",
      "code": "DK"
      },
      {
      "name": "Djibouti",
      "dial_code": "+253",
      "code": "DJ"
      },
      {
      "name": "Dominica",
      "dial_code": "+1 767",
      "code": "DM"
      },
      {
      "name": "Dominican Republic",
      "dial_code": "+1 849",
      "code": "DO"
      },
      {
      "name": "Ecuador",
      "dial_code": "+593",
      "code": "EC"
      },
      {
      "name": "Egypt",
      "dial_code": "+20",
      "code": "EG"
      },
      {
      "name": "El Salvador",
      "dial_code": "+503",
      "code": "SV"
      },
      {
      "name": "Equatorial Guinea",
      "dial_code": "+240",
      "code": "GQ"
      },
      {
      "name": "Eritrea",
      "dial_code": "+291",
      "code": "ER"
      },
      {
      "name": "Estonia",
      "dial_code": "+372",
      "code": "EE"
      },
      {
      "name": "Ethiopia",
      "dial_code": "+251",
      "code": "ET"
      },
      {
      "name": "Falkland Islands (Malvinas)",
      "dial_code": "+500",
      "code": "FK"
      },
      {
      "name": "Faroe Islands",
      "dial_code": "+298",
      "code": "FO"
      },
      {
      "name": "Fiji",
      "dial_code": "+679",
      "code": "FJ"
      },
      {
      "name": "Finland",
      "dial_code": "+358",
      "code": "FI"
      },
      {
      "name": "France",
      "dial_code": "+33",
      "code": "FR"
      },
      {
      "name": "French Guiana",
      "dial_code": "+594",
      "code": "GF"
      },
      {
      "name": "French Polynesia",
      "dial_code": "+689",
      "code": "PF"
      },
      {
      "name": "Gabon",
      "dial_code": "+241",
      "code": "GA"
      },
      {
      "name": "Gambia",
      "dial_code": "+220",
      "code": "GM"
      },
      {
      "name": "Georgia",
      "dial_code": "+995",
      "code": "GE"
      },
      {
      "name": "Germany",
      "dial_code": "+49",
      "code": "DE"
      },
      {
      "name": "Ghana",
      "dial_code": "+233",
      "code": "GH"
      },
      {
      "name": "Gibraltar",
      "dial_code": "+350",
      "code": "GI"
      },
      {
      "name": "Greece",
      "dial_code": "+30",
      "code": "GR"
      },
      {
      "name": "Greenland",
      "dial_code": "+299",
      "code": "GL"
      },
      {
      "name": "Grenada",
      "dial_code": "+1 473",
      "code": "GD"
      },
      {
      "name": "Guadeloupe",
      "dial_code": "+590",
      "code": "GP"
      },
      {
      "name": "Guam",
      "dial_code": "+1 671",
      "code": "GU"
      },
      {
      "name": "Guatemala",
      "dial_code": "+502",
      "code": "GT"
      },
      {
      "name": "Guernsey",
      "dial_code": "+44",
      "code": "GG"
      },
      {
      "name": "Guinea",
      "dial_code": "+224",
      "code": "GN"
      },
      {
      "name": "Guinea-Bissau",
      "dial_code": "+245",
      "code": "GW"
      },
      {
      "name": "Guyana",
      "dial_code": "+595",
      "code": "GY"
      },
      {
      "name": "Haiti",
      "dial_code": "+509",
      "code": "HT"
      },
      {
      "name": "Holy See (Vatican City State)",
      "dial_code": "+379",
      "code": "VA"
      },
      {
      "name": "Honduras",
      "dial_code": "+504",
      "code": "HN"
      },
      {
      "name": "Hong Kong",
      "dial_code": "+852",
      "code": "HK"
      },
      {
      "name": "Hungary",
      "dial_code": "+36",
      "code": "HU"
      },
      {
      "name": "Iceland",
      "dial_code": "+354",
      "code": "IS"
      },
      {
      "name": "India",
      "dial_code": "+91",
      "code": "IN"
      },
      {
      "name": "Indonesia",
      "dial_code": "+62",
      "code": "ID"
      },
      {
      "name": "Iran, Islamic Republic of Persian Gulf",
      "dial_code": "+98",
      "code": "IR"
      },
      {
      "name": "Iraq",
      "dial_code": "+964",
      "code": "IQ"
      },
      {
      "name": "Ireland",
      "dial_code": "+353",
      "code": "IE"
      },
      {
      "name": "Isle of Man",
      "dial_code": "+44",
      "code": "IM"
      },
      {
      "name": "Israel",
      "dial_code": "+972",
      "code": "IL"
      },
      {
      "name": "Italy",
      "dial_code": "+39",
      "code": "IT"
      },
      {
      "name": "Jamaica",
      "dial_code": "+1 876",
      "code": "JM"
      },
      {
      "name": "Japan",
      "dial_code": "+81",
      "code": "JP"
      },
      {
      "name": "Jersey",
      "dial_code": "+44",
      "code": "JE"
      },
      {
      "name": "Jordan",
      "dial_code": "+962",
      "code": "JO"
      },
      {
      "name": "Kazakhstan",
      "dial_code": "+7 7",
      "code": "KZ"
      },
      {
      "name": "Kenya",
      "dial_code": "+254",
      "code": "KE"
      },
      {
      "name": "Kiribati",
      "dial_code": "+686",
      "code": "KI"
      },
      {
      "name": "Korea, Democratic People's Republic of Korea",
      "dial_code": "+850",
      "code": "KP"
      },
      {
      "name": "Korea, Republic of South Korea",
      "dial_code": "+82",
      "code": "KR"
      },
      {
      "name": "Kuwait",
      "dial_code": "+965",
      "code": "KW"
      },
      {
      "name": "Kyrgyzstan",
      "dial_code": "+996",
      "code": "KG"
      },
      {
      "name": "Laos",
      "dial_code": "+856",
      "code": "LA"
      },
      {
      "name": "Latvia",
      "dial_code": "+371",
      "code": "LV"
      },
      {
      "name": "Lebanon",
      "dial_code": "+961",
      "code": "LB"
      },
      {
      "name": "Lesotho",
      "dial_code": "+266",
      "code": "LS"
      },
      {
      "name": "Liberia",
      "dial_code": "+231",
      "code": "LR"
      },
      {
      "name": "Libyan Arab Jamahiriya",
      "dial_code": "+218",
      "code": "LY"
      },
      {
      "name": "Liechtenstein",
      "dial_code": "+423",
      "code": "LI"
      },
      {
      "name": "Lithuania",
      "dial_code": "+370",
      "code": "LT"
      },
      {
      "name": "Luxembourg",
      "dial_code": "+352",
      "code": "LU"
      },
      {
      "name": "Macao",
      "dial_code": "+853",
      "code": "MO"
      },
      {
      "name": "Macedonia",
      "dial_code": "+389",
      "code": "MK"
      },
      {
      "name": "Madagascar",
      "dial_code": "+261",
      "code": "MG"
      },
      {
      "name": "Malawi",
      "dial_code": "+265",
      "code": "MW"
      },
      {
      "name": "Malaysia",
      "dial_code": "+60",
      "code": "MY"
      },
      {
      "name": "Maldives",
      "dial_code": "+960",
      "code": "MV"
      },
      {
      "name": "Mali",
      "dial_code": "+223",
      "code": "ML"
      },
      {
      "name": "Malta",
      "dial_code": "+356",
      "code": "MT"
      },
      {
      "name": "Marshall Islands",
      "dial_code": "+692",
      "code": "MH"
      },
      {
      "name": "Martinique",
      "dial_code": "+596",
      "code": "MQ"
      },
      {
      "name": "Mauritania",
      "dial_code": "+222",
      "code": "MR"
      },
      {
      "name": "Mauritius",
      "dial_code": "+230",
      "code": "MU"
      },
      {
      "name": "Mayotte",
      "dial_code": "+262",
      "code": "YT"
      },
      {
      "name": "Mexico",
      "dial_code": "+52",
      "code": "MX"
      },
      {
      "name": "Micronesia, Federated States of Micronesia",
      "dial_code": "+691",
      "code": "FM"
      },
      {
      "name": "Moldova",
      "dial_code": "+373",
      "code": "MD"
      },
      {
      "name": "Monaco",
      "dial_code": "+377",
      "code": "MC"
      },
      {
      "name": "Mongolia",
      "dial_code": "+976",
      "code": "MN"
      },
      {
      "name": "Montenegro",
      "dial_code": "+382",
      "code": "ME"
      },
      {
      "name": "Montserrat",
      "dial_code": "+1664",
      "code": "MS"
      },
      {
      "name": "Morocco",
      "dial_code": "+212",
      "code": "MA"
      },
      {
      "name": "Mozambique",
      "dial_code": "+258",
      "code": "MZ"
      },
      {
      "name": "Myanmar",
      "dial_code": "+95",
      "code": "MM"
      },
      {
      "name": "Namibia",
      "dial_code": "+264",
      "code": "NA"
      },
      {
      "name": "Nauru",
      "dial_code": "+674",
      "code": "NR"
      },
      {
      "name": "Nepal",
      "dial_code": "+977",
      "code": "NP"
      },
      {
      "name": "Netherlands",
      "dial_code": "+31",
      "code": "NL"
      },
      {
      "name": "Netherlands Antilles",
      "dial_code": "+599",
      "code": "AN"
      },
      {
      "name": "New Caledonia",
      "dial_code": "+687",
      "code": "NC"
      },
      {
      "name": "New Zealand",
      "dial_code": "+64",
      "code": "NZ"
      },
      {
      "name": "Nicaragua",
      "dial_code": "+505",
      "code": "NI"
      },
      {
      "name": "Niger",
      "dial_code": "+227",
      "code": "NE"
      },
      {
      "name": "Nigeria",
      "dial_code": "+234",
      "code": "NG"
      },
      {
      "name": "Niue",
      "dial_code": "+683",
      "code": "NU"
      },
      {
      "name": "Norfolk Island",
      "dial_code": "+672",
      "code": "NF"
      },
      {
      "name": "Northern Mariana Islands",
      "dial_code": "+1 670",
      "code": "MP"
      },
      {
      "name": "Norway",
      "dial_code": "+47",
      "code": "NO"
      },
      {
      "name": "Oman",
      "dial_code": "+968",
      "code": "OM"
      },
      {
      "name": "Pakistan",
      "dial_code": "+92",
      "code": "PK"
      },
      {
      "name": "Palau",
      "dial_code": "+680",
      "code": "PW"
      },
      {
      "name": "Palestinian Territory, Occupied",
      "dial_code": "+970",
      "code": "PS"
      },
      {
      "name": "Panama",
      "dial_code": "+507",
      "code": "PA"
      },
      {
      "name": "Papua New Guinea",
      "dial_code": "+675",
      "code": "PG"
      },
      {
      "name": "Paraguay",
      "dial_code": "+595",
      "code": "PY"
      },
      {
      "name": "Peru",
      "dial_code": "+51",
      "code": "PE"
      },
      {
      "name": "Philippines",
      "dial_code": "+63",
      "code": "PH"
      },
      {
      "name": "Pitcairn",
      "dial_code": "+872",
      "code": "PN"
      },
      {
      "name": "Poland",
      "dial_code": "+48",
      "code": "PL"
      },
      {
      "name": "Portugal",
      "dial_code": "+351",
      "code": "PT"
      },
      {
      "name": "Puerto Rico",
      "dial_code": "+1 939",
      "code": "PR"
      },
      {
      "name": "Qatar",
      "dial_code": "+974",
      "code": "QA"
      },
      {
      "name": "Romania",
      "dial_code": "+40",
      "code": "RO"
      },
      {
      "name": "Russia",
      "dial_code": "+7",
      "code": "RU"
      },
      {
      "name": "Rwanda",
      "dial_code": "+250",
      "code": "RW"
      },
      {
      "name": "Reunion",
      "dial_code": "+262",
      "code": "RE"
      },
      {
      "name": "Saint Barthelemy",
      "dial_code": "+590",
      "code": "BL"
      },
      {
      "name": "Saint Helena, Ascension and Tristan Da Cunha",
      "dial_code": "+290",
      "code": "SH"
      },
      {
      "name": "Saint Kitts and Nevis",
      "dial_code": "+1 869",
      "code": "KN"
      },
      {
      "name": "Saint Lucia",
      "dial_code": "+1 758",
      "code": "LC"
      },
      {
      "name": "Saint Martin",
      "dial_code": "+590",
      "code": "MF"
      },
      {
      "name": "Saint Pierre and Miquelon",
      "dial_code": "+508",
      "code": "PM"
      },
      {
      "name": "Saint Vincent and the Grenadines",
      "dial_code": "+1 784",
      "code": "VC"
      },
      {
      "name": "Samoa",
      "dial_code": "+685",
      "code": "WS"
      },
      {
      "name": "San Marino",
      "dial_code": "+378",
      "code": "SM"
      },
      {
      "name": "Sao Tome and Principe",
      "dial_code": "+239",
      "code": "ST"
      },
      {
      "name": "Saudi Arabia",
      "dial_code": "+966",
      "code": "SA"
      },
      {
      "name": "Senegal",
      "dial_code": "+221",
      "code": "SN"
      },
      {
      "name": "Serbia",
      "dial_code": "+381",
      "code": "RS"
      },
      {
      "name": "Seychelles",
      "dial_code": "+248",
      "code": "SC"
      },
      {
      "name": "Sierra Leone",
      "dial_code": "+232",
      "code": "SL"
      },
      {
      "name": "Singapore",
      "dial_code": "+65",
      "code": "SG"
      },
      {
      "name": "Slovakia",
      "dial_code": "+421",
      "code": "SK"
      },
      {
      "name": "Slovenia",
      "dial_code": "+386",
      "code": "SI"
      },
      {
      "name": "Solomon Islands",
      "dial_code": "+677",
      "code": "SB"
      },
      {
      "name": "Somalia",
      "dial_code": "+252",
      "code": "SO"
      },
      {
      "name": "South Africa",
      "dial_code": "+27",
      "code": "ZA"
      },
      {
      "name": "South Georgia and the South Sandwich Islands",
      "dial_code": "+500",
      "code": "GS"
      },
      {
      "name": "Spain",
      "dial_code": "+34",
      "code": "ES"
      },
      {
      "name": "Sri Lanka",
      "dial_code": "+94",
      "code": "LK"
      },
      {
      "name": "Sudan",
      "dial_code": "+249",
      "code": "SD"
      },
      {
      "name": "Suriname",
      "dial_code": "+597",
      "code": "SR"
      },
      {
      "name": "Svalbard and Jan Mayen",
      "dial_code": "+47",
      "code": "SJ"
      },
      {
      "name": "Swaziland",
      "dial_code": "+268",
      "code": "SZ"
      },
      {
      "name": "Sweden",
      "dial_code": "+46",
      "code": "SE"
      },
      {
      "name": "Switzerland",
      "dial_code": "+41",
      "code": "CH"
      },
      {
      "name": "Syrian Arab Republic",
      "dial_code": "+963",
      "code": "SY"
      },
      {
      "name": "Taiwan",
      "dial_code": "+886",
      "code": "TW"
      },
      {
      "name": "Tajikistan",
      "dial_code": "+992",
      "code": "TJ"
      },
      {
      "name": "Tanzania, United Republic of Tanzania",
      "dial_code": "+255",
      "code": "TZ"
      },
      {
      "name": "Thailand",
      "dial_code": "+66",
      "code": "TH"
      },
      {
      "name": "Timor-Leste",
      "dial_code": "+670",
      "code": "TL"
      },
      {
      "name": "Togo",
      "dial_code": "+228",
      "code": "TG"
      },
      {
      "name": "Tokelau",
      "dial_code": "+690",
      "code": "TK"
      },
      {
      "name": "Tonga",
      "dial_code": "+676",
      "code": "TO"
      },
      {
      "name": "Trinidad and Tobago",
      "dial_code": "+1 868",
      "code": "TT"
      },
      {
      "name": "Tunisia",
      "dial_code": "+216",
      "code": "TN"
      },
      {
      "name": "Turkey",
      "dial_code": "+90",
      "code": "TR"
      },
      {
      "name": "Turkmenistan",
      "dial_code": "+993",
      "code": "TM"
      },
      {
      "name": "Turks and Caicos Islands",
      "dial_code": "+1 649",
      "code": "TC"
      },
      {
      "name": "Tuvalu",
      "dial_code": "+688",
      "code": "TV"
      },
      {
      "name": "Uganda",
      "dial_code": "+256",
      "code": "UG"
      },
      {
      "name": "Ukraine",
      "dial_code": "+380",
      "code": "UA"
      },
      {
      "name": "United Arab Emirates",
      "dial_code": "+971",
      "code": "AE"
      },
      {
      "name": "United Kingdom",
      "dial_code": "+44",
      "code": "GB"
      },
      {
      "name": "Uruguay",
      "dial_code": "+598",
      "code": "UY"
      },
      {
      "name": "Uzbekistan",
      "dial_code": "+998",
      "code": "UZ"
      },
      {
      "name": "Vanuatu",
      "dial_code": "+678",
      "code": "VU"
      },
      {
      "name": "Venezuela, Bolivarian Republic of Venezuela",
      "dial_code": "+58",
      "code": "VE"
      },
      {
      "name": "Vietnam",
      "dial_code": "+84",
      "code": "VN"
      },
      {
      "name": "Virgin Islands, British",
      "dial_code": "+1 284",
      "code": "VG"
      },
      {
      "name": "Virgin Islands, U.S.",
      "dial_code": "+1 340",
      "code": "VI"
      },
      {
      "name": "Wallis and Futuna",
      "dial_code": "+681",
      "code": "WF"
      },
      {
      "name": "Yemen",
      "dial_code": "+967",
      "code": "YE"
      },
      {
      "name": "Zambia",
      "dial_code": "+260",
      "code": "ZM"
      },
      {
      "name": "Zimbabwe",
      "dial_code": "+263",
      "code": "ZW"
      }
      ]
  }

  chooseCountry(id)
  {
    this.Ccode =id;
  }
  SaveProfile()
  {
    if(this.proForm.valid)
    {
    this.proForm.value.Address1 = ' ';
    if(this.Ccode !=undefined)
    {
      this.proForm.value.PhoneNumber = this.Ccode + this.proForm.value.PhoneNumber;
    }
    else
    {
      this.proForm.value.PhoneNumber = '+1' + this.proForm.value.PhoneNumber;
    }

    this._service.PostService(this.proForm.value,'ProfileAPI/api/InsertUserProfile').subscribe(
      data1 => {
        this.editPersonalDetails = false;
       if(data1>=0)
       {
         this.GetProfileDetails(data1);
          this.proForm.reset();

      
       }
      },
        error => console.log(error));
    }
  }


  SaveExperience()
  {
    if(this.expForm.valid)
    {
   
    this.expForm.value.StartDate = new Date(this.expForm.value.StartDate).toDateString();
    this.expForm.value.EndDate = new Date(this.expForm.value.EndDate).toDateString();
    this._service.PostService(this.expForm.value,'ProfileAPI/api/SaveExperience').subscribe(
      data => {
       
       if(data>=0)
       {
         this.editWorkExperience = false;  
         this.GetExperience(this.expForm.value.ProfileId);     
         this.expForm.reset();
       }
      },
        error => console.log(error));
    }
  }

  SaveEducation() {
    if(this.eduForm.valid)
    {
    this.eduForm.value.QualificationId = parseInt(this.eduForm.value.QualificationId, 10);
    this.eduForm.value.FromYear = parseInt(this.eduForm.value.FromYear, 10);
    this.eduForm.value.ToYear = parseInt(this.eduForm.value.ToYear, 10);
    this._service.PostService(this.eduForm.value,'ProfileAPI/api/SaveEducation').subscribe(
      data => {
       if(data>=0)
       {
        this.editEducation = false;
        this.GetEducation(this.eduForm.value.ProfileId);
        this.eduForm.reset();
       }
      },
        error => console.log(error));
      }
     
  }

  GetJobMatching(JId)
  {
    this.appService.GetJobMatching(JId).subscribe(data => {
      if (data != "No records found") {
        //  this.minValue = data.SkillFit;
        //  this.JobFitval = data.JobFit;
        //  this.Domain  = data.JobDomain;
        //  this.TotalExperience = data.JobTotalExp;
        //  this.Title = data.JobRole;


        this.Percentweightage = data;
        this.roleweight = Math.round(data.JobFit / 3);

        this.expweight = Math.round(data.JobFit - this.roleweight);
      }
      })
  }

  returnFn(user: Provider): number | undefined {
    return user ? user.ProviderId : undefined;
  }

  displayFn1(user: string) {
    if (user) { return user; }
  }

  reset() {
    this.certForm.reset();
  }

  setProvider(val)
  {
    this.Id = val.ProviderId;
  }

  SaveCertification()
  {
   if(this.certForm.valid)
   {
      this.certForm.value.YearOfAchievement = "1/1/" + this.certForm.value.YearOfAchievement;   
      this.certForm.value.ProviderId = this.certForm.value.ProviderId ? this.certForm.value.ProviderId : this.Id;
      this._service.PostService(this.certForm.value,'ProfileAPI/api/SaveCertification').subscribe(
      data => {
       if(data>=0)
       {
         this.editCertification=false;        
         this.GetCertification(this.certForm.value.ProfileId);
         this.certForm.reset();
       }
      },
        error => console.log(error));
      }
     
  }

  dateLessThan(from: string, to: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let f = group.controls[from];
      let t = group.controls[to];
      let message = 'Please ensure that the End Date is greater than or equal to the Start Date';
      let action = 'Info';
      if (f.value != '' && f.value != '' && f.value > t.value) {
        return {
          dates: //Swal("Please ensure that the To Year is greater than or equal to the From Year.")
        
          this._snackBar.open(message, action, {
              duration: 2000,
              verticalPosition: 'top',
              horizontalPosition: 'end'              
          })
        };

      }
      return {};
    }
  }

  EditProfile(pro)
  {
    this.editPersonalDetails = true;  
      this.proForm = this.fb.group({
        'ProfileId': [pro.ProfileId, Validators.required],
        'ProfileTitle': [pro.ProfileTitle, Validators.nullValidator],
        'FirstName': [pro.FirstName, Validators.nullValidator],
        'LastName': [pro.LastName, Validators.nullValidator],
        'Email': [pro.UserName,[Validators.required, Validators.email]],
        'MobilePhone': [pro.MobilePhone, Validators.nullValidator],
        'Address1': [' ', Validators.nullValidator],
        'CityName': ['', Validators.nullValidator],
        'StateName': ['', Validators.nullValidator],
        'StateId': [0, Validators.nullValidator],
        'ZipCode': ['', Validators.nullValidator]   
      })   
    

  }

  editExp(dat,e)
  {
    document.querySelector('.primary__col').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    this.selectedIndex = e;   
    this.editWorkExperience = true;
    this.expForm = this.fb.group({
      'UserId': [0, Validators.compose([Validators.nullValidator])],
      'ExperienceId': [dat.ExperienceId, Validators.compose([Validators.nullValidator])],
      'ProfileId': [dat.ProfileId, Validators.required],
      'JobTitle': [dat.JobTitle, Validators.required],
      'JobLocation': [dat.JobLocation, Validators.nullValidator],
      'CompanyName': [dat.CompanyName, Validators.nullValidator],
      'StartDate': [new Date(dat.StartDate), Validators.nullValidator],
      'EndDate': [new Date(dat.EndDate), Validators.nullValidator],
      'Description': [dat.Description, Validators.nullValidator],
      'Achievements': [null, Validators.nullValidator],
      'ToolsUsed': [null, Validators.nullValidator],
      'TechnologiesUsed': [null, Validators.nullValidator],
      'CurrentEmployer': [false, Validators.nullValidator],
      'Roles': [null, Validators.nullValidator],
      'FreeLanceEmployer': [false, Validators.nullValidator]
    });
  }



  
  EditEducation(edu,f) {
    this.selectedeIndex = f;   
    this.editEducation = true;
    this.eduForm = this.fb.group({
      'UserId': [0, Validators.nullValidator],
      'EducationId': [edu.EducationId, Validators.compose([Validators.nullValidator])],
      'ProfileId': [edu.ProfileId, Validators.nullValidator],
      'QualificationId': [edu.QualificationId, Validators.nullValidator],
      'Specialization': [edu.Specialization, Validators.required],
      'Description': [edu.Description, Validators.nullValidator],
      'InstituteOrUniversity': [edu.InstituteORUniversity, Validators.nullValidator],
      'EducationTypeId': [1, Validators.nullValidator],
      'Location': [edu.Location, Validators.compose([Validators.nullValidator, Validators.minLength(3), Validators.maxLength(100)])],
      'FromYear': [edu.FromYear, Validators.nullValidator],
      'ToYear': [edu.ToYear, Validators.nullValidator],
      'TranscriptsAvailable': [false, Validators.nullValidator]
    },
      { validator: this.dateLessThan('FromYear', 'ToYear') });
   
  }

  EditCert(c,cc) {
    this.editCertification = true;
    this.selectedcIndex = cc;
    this.certForm = this.fb.group({
      'UserId': [0,Validators.compose([Validators.required])],
      'CertificationId': [c.CertificationId, Validators.nullValidator],
      'ProfileId': [c.ProfileId, Validators.nullValidator],
      'ProviderId': [c.ProviderId, Validators.nullValidator],
      'IsCertified': [c.IsCertified, Validators.nullValidator],
      'CertificationName': [c.CertificationName, Validators.nullValidator],     
      'IssuedBy': [c.IssuedBy, Validators.nullValidator],
      'YearOfAchievement': [c.YearOfAchievement, Validators.nullValidator],
      'LifeTime': [c.LifeTime, Validators.nullValidator],
      'ImageUrl': [c.ImageUrl, Validators.nullValidator]
    });
  }

  GetQualifications()
  {
    this.appService.getQualificationDetails()
    .subscribe(
      data => {
        this.degreeList = data;
      });
  }


  edits(sk,y)
  {
    this.EditSkill = true;
    this.selectedskill = sk;
    if(y>0)
    {
      var texp = Number(y);
      var tmonths = 0;
    }
    else
    {
      var texp = 0;
      var tmonths = 0;
    }
    this.expsYear = texp;
    this.expsMonth = tmonths;
  }

  editd(s,y)
  {
    this.EditDomain = true;
    this.selectedDomain = s;
    if(y>0)
    {
      var texp = Number(y);
      var tmonths = 0;
    }
    else
    {
      var texp = 0;
      var tmonths = 0;
    }

    this.expYear = texp;
    this.expMonth = tmonths;
    
  }

  
  edite()
  {
    this.EditE = true
  }

  editBd()
  {
    this.EditBD = true
  }

  editt()
  {
    this.EditT = true
  }

  editk(g)
  {
    this.EditKey = true;
    this.selectedkey = g;
  }


  PopulateJobdetail() {
    return this.jobdetailsservice.getJobDetailCustomer(this.customerId, this.data.jobId).subscribe(res => {
      this.jobdetailscustomer = res;
      this.GetJobMatching(this.data.jobId);
    });
}
  getCandidateExperience(job,Pid) {

    this._service.GetService('JobsAPI/api/GetCandidateExperiance?JobId=' + job + '&ProfileId=', Pid)
      // this._service.GetService('JobsAPI/api/GetMissingDomains', JobData)
      .subscribe(
        data => {
          if (1) {
            this.CandidateExp = data;  
            
            if (this.CandidateExp != null) {
              this.expMonthExp = (this.CandidateExp.Experience % 12);// this.CandidateExp.ExpInMonths;
              this.expYearExp = Math.round((this.CandidateExp.Experience / 12) - ((this.CandidateExp.Experience % 12) / 12));// this.CandidateExp.ExpInYears;
            }       
          }
        }, error => { this._service.DebugMode(error); });

  }

  SaveRoleFit() {

    this.insertrole.ProfileId = this.CProfileId;
    this.insertrole.ProfileTitle = this.Title;
    this.insertrole.Industry = this.IndustryId;
    this.insertrole.PositionType = this.CoreId;
    this.insertrole.Category = this.CategoryId;
    this.insertrole.TitleInfo = this.TitleId;
    this.insertrole.XmlKeyResponses = this.addkeyList;
    return this._service.PostService(this.insertrole, 'ProfileAPI/api/InsertCandidateProfileRoleFit').subscribe(data => {
      //location.reload();
      this.insertrole = new InsertRole();
      this.Title = '';
      this.IndustryId = '';
      this.CoreId = '';
      this.CategoryId = '';
      this.GetProfileRoleFitDetails(this.CProfileId);
    })
  }

  updateBD(bd)
  {
    this.IndustryId = this.roleFitDetails.CustomerJobIndustries[0].CustomerIndustryId;
    this.CoreId = this.roleFitDetails.CustomerJobPositionType[0].JobPositionTypeId;
    this.CategoryId = this.roleFitDetails.CustomerJobCategory[0].CustomerCategoryId;
    this.insertrole.ProfileId = this.CProfileId;
    this.insertrole.ProfileTitle = this.Title;
    this.insertrole.Industry = this.IndustryId;
    this.insertrole.PositionType = this.CoreId;
    this.insertrole.Category = this.CategoryId;
    this.insertrole.TitleInfo = this.TitleId;
    this.insertrole.XmlKeyResponses = this.addkeyList;
    return this._service.PostService(this.insertrole, 'ProfileAPI/api/InsertCandidateProfileRoleFit').subscribe(data => {
      //location.reload();
      this.EditBD = false;
      this.insertrole = new InsertRole();
      this.GetProfileRoleFitDetails(this.CProfileId);
      this.GetMatchingPercentage(this.CProfileId);
      this.GetJobRequiredDomain(this.CProfileId);
      this.GetCandidateJobFitResult(this.CProfileId);
    })
  }

  updateTitle(t)
  {
    this.IndustryId = this.roleFitDetails.CustomerJobIndustries[0].CustomerIndustryId;
    this.CoreId = this.roleFitDetails.CustomerJobPositionType[0].JobPositionTypeId;
    this.CategoryId = this.roleFitDetails.CustomerJobCategory[0].CustomerCategoryId;
    this.Title = this.roleFitDetails.CustomerJobTitle[0].JobTitle;
    this.TitleId = this.roleFitDetails.CustomerJobTitle[0].RoleId;
    this.insertrole.ProfileId = this.CProfileId;
    this.insertrole.ProfileTitle = this.Title;
    this.insertrole.Industry = this.IndustryId;
    this.insertrole.PositionType = this.CoreId;
    this.insertrole.Category = this.CategoryId;
    this.insertrole.TitleInfo = this.TitleId;
    this.insertrole.XmlKeyResponses = this.addkeyList;
    return this._service.PostService(this.insertrole, 'ProfileAPI/api/InsertCandidateProfileRoleFit').subscribe(data => {
      //location.reload();
      this.EditT = false;
      this.insertrole = new InsertRole();
      this.GetProfileRoleFitDetails(this.CProfileId);
      this.GetCandidateJobFitResult(this.CProfileId);
      this.GetMatchingPercentage(this.CProfileId);
      this.GetJobRequiredDomain(this.CProfileId);
     
    })
  }

  updateKey()
  {
    this.roleFitDetails.CustomerJobKeyResponses.forEach(k=>
      {
        const ejKeyResponsebility = new KeyRole();
        ejKeyResponsebility.KeyResponsebilityId =  k.CustomerKeyResponsebility;
        ejKeyResponsebility.KeyMinExperienceId =  0;
        ejKeyResponsebility.KeyMaxExperienceId =  k.CustomerKeyMaxExperienceId;
        this.addkeyList.push(ejKeyResponsebility);
      })
   
   
    this.IndustryId = this.roleFitDetails.CustomerJobIndustries[0].CustomerIndustryId;
    this.CoreId = this.roleFitDetails.CustomerJobPositionType[0].JobPositionTypeId;
    this.CategoryId = this.roleFitDetails.CustomerJobCategory[0].CustomerCategoryId;
    this.Title = this.roleFitDetails.CustomerJobTitle[0].JobTitle;
    this.TitleId = this.roleFitDetails.CustomerJobTitle[0].RoleId;
    this.insertrole.ProfileId = this.CProfileId;
    this.insertrole.ProfileTitle = this.Title;
    this.insertrole.Industry = this.IndustryId;
    this.insertrole.PositionType = this.CoreId;
    this.insertrole.Category = this.CategoryId;
    this.insertrole.TitleInfo = this.TitleId;
    this.insertrole.XmlKeyResponses = this.addkeyList;
    return this._service.PostService(this.insertrole, 'ProfileAPI/api/InsertCandidateProfileRoleFit').subscribe(data => {
      //location.reload();
      this.EditKey = false;
      this.insertrole = new InsertRole();
      this.GetProfileRoleFitDetails(this.CProfileId);
      this.GetMatchingPercentage(this.CProfileId);
      this.GetJobRequiredDomain(this.CProfileId);
      this.GetCandidateJobFitResult(this.CProfileId);
      this.addkeyList = [];
      this.Title = '';
      this.TitleId = '';
      this.IndustryId = '';
      this.CoreId = '';
      this.CategoryId = '';
    })
  }

  onYearChnage(data) {
    // alert(data);
    if (data > 50 || data < 0) {
      // this.expMonth = null;
      this.yearerror = 1;
    } else {
      this.yearerror = 0;
    }
  }

  updateExp(e) {
    var UpdatedMissingExperience = {
      "Id": 0,
      "ProfileId": this.CProfileId,
      "JobId": this.data.JobId,
      "CreatedOn": Date.now(),
      "CreatedBy": this.customerName.UserId,
      "ModifiedOn": Date.now(),
      "ModifiedBy": this.customerName.UserId,
      "IsUpdated": 1
    };
    var CandidateTotalExp = {
      "TotalExp": (Number(this.expYearExp) * 12) + Number(this.expMonthExp),
      "ProfileId": this.CProfileId,
    };
    this._service.PostService(CandidateTotalExp, 'JobsAPI/api/UpdateTotalExperience')
      .subscribe(da => {
        if (da === true) {
          this.EditE = false;
          this.GetMatchingPercentage(this.CProfileId);
          this.GetProfileDetails(this.CProfileId);
          this.GetCandidateJobFitResult(this.CProfileId);
          this.getCandidateExperience(this.data.jobId,this.CProfileId);
        }
        this._service.PostService(UpdatedMissingExperience, 'JobsAPI/api/UpdateCandidateExperiance')
          .subscribe(dt => {
            if (da === true) {
              this.GetMatchingPercentage(this.CProfileId);
              this.GetJobRequiredDomain(this.CProfileId);
              this.GetCandidateJobFitResult(this.CProfileId);
              this.getCandidateExperience(this.data.jobId,this.CProfileId);
            }
          });
      });

  }

  updateList(D) {
    // alert("dsd");
    var domainData = {
      "CandidateDomainId": D.CandidateDomainId,
      "DomainId": D.DomainId,
      "DomainIdSpecified": true,
      "ExpInMonths": D.ExpInMonths,
      "ExpInYears": this.expYear,
      "LastUsed": '2022',
      "ProfileId": this.CProfileId,
      "UserId": 0
    };
    const jobId = this.data.jobId;
    this._service.PostService(domainData, 'ProfileAPI/api/InsertDomain')
      .subscribe(dat => {
        if (dat>=0) {
          this.EditDomain = false;
          this.GetMatchingPercentage(this.CProfileId);
          this.GetJobRequiredDomain(this.CProfileId);
          this.GetCandidateJobFitResult(this.CProfileId);
          this.GetJobMatchedDomain(this.CProfileId);
          }
        })

      
      }
    

  updateSkill(skill)
  {
    var SkillData = {
      "ExpInMonths": this.expsMonth,
      "ExpInYears": this.expsYear,
      "LastUsed": "2022",
      "ProfileId": this.CProfileId,
      "SkillName": skill.Code,
      "SkillRating": "5",
      "SkillSetId": skill.CandidateSkillId,
      "UserId": 0
    };
    const jobId = this.data.jobId;
    this._service.PostService(SkillData, 'ProfileAPI/api/InsertSkillSet')
      .subscribe(data => {
     if(data === 0)
     {
       this.EditSkill = false;
       this.GetMatchingPercentage(this.CProfileId);
       this.GetJobMatchedSkills(this.CProfileId);
       this.GetJobRequiredSkills(this.CProfileId);

     }
      });
  }

  public getYears() {
    const date = new Date();
    const x = date.getFullYear();
    this.years = [];
    for (let i = x - 40; i <= x; i++) {
        this.years.push(i);
    }
    return this.years;
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
    this.proForm = this.fb.group({
      'ProfileId': [0, Validators.nullValidator],
      'ProfileTitle': ['', Validators.nullValidator],
      'FirstName': ['', Validators.nullValidator],
      'LastName': ['', Validators.nullValidator],
      'Email': ['', [Validators.required, Validators.email]],
      'MobilePhone': ['', Validators.nullValidator],
      'CityName': ['', Validators.nullValidator],
      'StateName': ['', Validators.nullValidator],
      'StateId': [0, Validators.nullValidator],
      'ZipCode': ['', Validators.nullValidator]   
    })
    this.expForm = this.fb.group({
      'UserId': [0, Validators.compose([Validators.nullValidator])],
      'ExperienceId': [0, Validators.compose([Validators.nullValidator])],
      'ProfileId': [0, Validators.nullValidator],
      'JobTitle': ['', Validators.required],
      'JobLocation': ['', Validators.nullValidator],
      'CompanyName': ['', Validators.required],
      // 'StartDate': [formatDate(this.post.StartDate, 'MM-yyyy', 'en'), [Validators.required]],
      // 'EndDate': [formatDate(this.post.EndDate, 'MM-yyyy', 'en'), [Validators.required]],
      'StartDate': ['', Validators.nullValidator],
      'EndDate': ['', Validators.nullValidator],
      'Description': ['', Validators.nullValidator],
      'Achievements': [null, Validators.nullValidator],
      'ToolsUsed': [null, Validators.nullValidator],
      'TechnologiesUsed': [null, Validators.nullValidator],
      'CurrentEmployer': [false, Validators.nullValidator],
      'Roles': [null, Validators.nullValidator],
      'FreeLanceEmployer': [false, Validators.nullValidator]
    },
     { validator: this.dateLessThan('StartDate', 'EndDate') 
     }
    );
    this.eduForm = this.fb.group({
      'UserId': ['', Validators.compose([Validators.nullValidator])],
      'EducationId': [0, Validators.compose([Validators.nullValidator])],
      'ProfileId': [this.data.profileId, Validators.required],
      'QualificationId': [0, Validators.nullValidator],
      'Specialization': ['', Validators.nullValidator],
      'Description': ['', Validators.nullValidator],
      'InstituteOrUniversity': ['', Validators.nullValidator],
      'EducationTypeId': [1, Validators.nullValidator],
      'Location': [null, Validators.compose([Validators.nullValidator, Validators.minLength(3), Validators.maxLength(100)])],
      'FromYear': ['', Validators.required],
      'ToYear': ['', Validators.required],
      'TranscriptsAvailable': [false, Validators.nullValidator]
    },
    { validator: this.dateLessThan('FromYear', 'ToYear') })

    this.certForm = this.fb.group({
      'UserId': [0, Validators.nullValidator],
      'ProfileId': [this.data.ProfileId, Validators.required],
      'CertificationId': [0, Validators.nullValidator],
      'ProviderId': [0, Validators.required],
      'IsCertified': [true, Validators.required],
      'CertificationName': ['', Validators.required],
      'IssuedBy': ['', Validators.required],
      'YearOfAchievement': ['',Validators.nullValidator],
      'LifeTime': ['',Validators.nullValidator],
      'ImageUrl': ['', Validators.nullValidator]
    })
  
    

    
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
    this.haveProfiles = false;
    this.alertService.clear();
    this.getYears();
    this.GetQualifications();
    this.PopulateJobdetail();
    this.GetCustomerSubscription();
    this.GetAllProfileDetails(this.data.ProfileId);
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
    this.showThis = "JobFit"
  }


  moreContent(e) {
    this.moreShow = e;
  }

  lessContent() {
    this.moreShow = -1;
  }

GetCustomerSubscription()
{
  return this.appService.GetCustomerSubscription(this.customerName.UserId).subscribe(res => {
    if(res!=null)
    {
      this.subdetails = res;
      this.GetSubscriptionDetails(res.subscriptionId);
      // this.GetInvoiceEstimates();
      // this.GetUnbilledChargeDetails();
    }

});
}

editPesonalDetailHandler() {
  this.editPersonalDetails = true;  
}

closePersonalDetailHandler() {
  this.editPersonalDetails = false;
}
  
selectedItem(item) {
  this.selectedMenuItem = item;
}

selectedSubItem(item) {
  if (this.selectedSubMenuItem === item) {
    this.selectedSubMenuItem = '';
  } else {
    this.selectedSubMenuItem = item;
  }
}



// onFileSelected(event) {
//   if (this.uploader.queue.length > 0) {
//     for (let i = 0; i < this.uploader.queue.length; i++) {
//       let file: File = this.uploader.queue[i]._file;
//        this.selectedFiles.push(file);
//     }
//     if(this.uploader.queue.length > 2)
//     {
//       this.toastr.warning('Please upload maximum of 2 profiles.','Oh no!!!');
//     }
//   }
// }


    
  
  


selectPreviousCandidate() {
  this.currentRecordIndex = this.currentRecordIndex - 1;

  if (this.currentRecordIndex < 0) {
    this.currentRecordIndex = 0;
  }
  this.selectedCandidate = this.processedProfiles[this.currentRecordIndex];
  this.GetProfileId(this.uploadRes[this.currentRecordIndex].MailId);
}

selectNextCandidate() {
  this.currentRecordIndex = this.currentRecordIndex + 1;

  if (this.currentRecordIndex > this.processedProfiles.length) {
    this.currentRecordIndex = this.processedProfiles.length - 1;
  }
  this.selectedCandidate = this.processedProfiles[this.currentRecordIndex];
  this.GetProfileId(this.uploadRes[this.currentRecordIndex].MailId);
  
}


SaveCandidate()
{
  this.selectedCandidate = this.processedProfiles[this.currentRecordIndex];
  return this._service.GetService('IdentityAPI/api/GetProfileIdFromEmail?email=',this.selectedCandidate.ContactInformation.EmailAddresses[0]).subscribe(
    ProfileId=>{
    //this.GetPercent(Id);
    this.CProfileId = ProfileId;
    this.GetAllProfileDetails(ProfileId)
    this.uploadRes.find(obj => {
      if(obj != null)
      {
        if(obj.ProfileId === ProfileId)
        {
          return obj.ProfileId === ProfileId;
        }
      
      }
    
    });
    let objIndex = this.uploadRes.findIndex((obj => obj.ProfileId == ProfileId));
    this.uploadRes[objIndex].ResumeStatus = "Requested";
  })
}




GetSubscriptionDetails(sid)
{
  return this.appService.GetSubscriptionDetails(sid).subscribe(res1 => {
    if(res1!=null)
    {
      this.sdetails = res1;
    }
    else
    {
      this.sdetails.planId='0';
    }
  });
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
  //   //debugger
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

GetProfileStatus(mail)
 {
   return this.jobdetailsservice.GetCustomerStatus(mail,this.data.JobId,this.customerId,true).subscribe(
     dta=>{
       //this.statuscheck = dta;
       let c = dta.Status;
       this.checks.push(c);
     }
   )
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



  processResumes() {

   
    if(this.selectedFiles.length>0)
    {
      this.isProcessing = true;
      this.getFileDetails();
    }
    
  }

//  Check()
// {
//   this.processedProfile.forEach(fs => {
//     let f = fs.sfile;
//     let val = fs.profiles;
//     let request = '';
//     this.tempuploadResponse = [];
//     this.selectedFileNames = [];
//     this.formDAtaList = [];
//     var formData = new FormData();
//     this.fileUploadForm.value.Url = '';
//     this.fileUploadForm.value.FileName = f.name;
//     this.fileUploadForm.value.FileExtension = f.type;
//     this.fileUploadForm.value.UserName = null;
//     this.fileUploadForm.value.JobId = this.data.jobId;
//     this.fileUploadForm.value.EmailCheck = this.emailCheck;
//     // document.getElementById('jobId').value; //this.jobid;
//     // this.fileUploadForm.value.ResumeFile = e.target.files[0];
//     if (this.fileUploadForm.value !== '') {
//       request = JSON.stringify(this.fileUploadForm.value);
//     }
//     var formData = new FormData();
//     var temp = new UploadResponse()
//     this.selectedFileNames.push(f.name);
//     temp.FirstName = f.name;
//     temp.DocId = fs;
//     temp.ResumeStatus = null;
//     this.tempuploadResponse.push(temp);
//     formData.append('ResumeFile', f);
//     formData.append('Model', request);
//     formData.append('SModel', JSON.stringify(val));
//     formData.append('CustomerId', this.customerId);
//     formData.append('DocId',this.selectedFiles.length.toString());//JSON.stringify(i.toString()));
//     formData.append('IsPublic', this.isPublic.toString());//JSON.stringify(this.isPublic.toString()));
//     formData.append("Upload", this.isPublic.toString());
//     formData.append("SendMail", this.isPublic.toString());
//     this.formDAtaList.push(formData);
//     new Promise<void>((resolve) => {
//    this.jobdetailsservice.byteStorage1(formData, 'api/ParseResumeSovren').subscribe(async dat => {
//      if(dat){
//         this.uploadResponse = dat[0];
//         this.uploadRes.push(this.uploadResponse);
//         if(this.uploadRes.length === this.processedProfile.length)
//         {
//           this.uploader.queue = [];
//           this.GetProfileId(this.selectedCandidate.ContactInformation.EmailAddresses[0]);
//         }
//         }
//         await resolve();
       
//        })
      
       
//       })
   
     
  

   
//   })
 
  
// }

// Getval()
// {
//   if(this.uploadRes.length === this.processedProfile.length)
//   {
//     this.uploader.queue = [];
//     this.GetProfileId(this.selectedCandidate.ContactInformation.EmailAddresses[0]);
//   }

 
// }

GetMatchingPercentage(profileId): any {
  this.GetJobMatching(this.data.jobId);
   this.jobdetailsservice.GetJobMatchingCriteriaEndPoint(profileId,this.data.jobId).subscribe((res) => {
     this.matchingParameterDetails = res;
     this.matchingParameterData.Jobfit_Total = this.matchingParameterDetails.Jobfit_Total;
     let rolefit = this.matchingParameterDetails.Role;
     if(rolefit>0)
     {
       rolefit = this.matchingParameterDetails.Role/10;
     }
     else
     {
       rolefit = this.matchingParameterDetails.Role;
     }

     if(rolefit >this.roleweight)
     {
      this.matchingParameterData.Role = this.roleweight;
     }
     else if(rolefit< this.roleweight)
     {
       this.matchingParameterData.Role = rolefit;
     }
     
   
     let expFit = this.matchingParameterDetails.Jobfit_Total -  this.matchingParameterData.Role/10;
     if(expFit>this.expweight)
     {
       this.matchingParameterData.JobFit = this.expweight;
     }
     else  if(expFit<this.expweight)
     {
      if(this.profileDetails.TotalExperience!=null)
      {
        if( Number(this.profileDetails.TotalExperience) >  Math.floor(this.jobdetailscustomer.JobInfo.MaxExperience / 12) )
        {
         this.matchingParameterData.JobFit = this.expweight;
        }
        else
        {
         this.matchingParameterData.JobFit = expFit;
        }
       
      }
      else
      {
       this.matchingParameterData.JobFit = expFit;
      }
     }

     let jobmFit = this.roleweight + this.expweight;
     if(jobmFit == this.matchingParameterData.Jobfit_Total)
     {
      this.matchingParameterData.Role = this.roleweight;
     }
    
    //this.matchingParameterData.Role = this.matchingParameterDetails.Role;

   
     this.matchingParameterData.Personalityfit_Total = this.matchingParameterDetails.Personalityfit_Total;
     this.matchingParameterData.Skillfit_Total = this.matchingParameterDetails.Skillfit_Total;
     this.matchingParameterData.Personalityfit = this.matchingParameterDetails.Personalityfit;
     this.matchingParameterData.CultureFit = this.matchingParameterDetails.CultureFit;
     this.matchingParameterData.SkillFit = this.matchingParameterDetails.SkillFit;

     //this.matchingParameterData.JobFit = this.matchingParameterDetails.JobFit;
     //debugger
   });
   return this.matchingParameterDetails;
  
 }

 GetCandidateSkillFitResult(ProfileId,jobId) {
  this._service.GetService('ProfileAPI/api/GetSkillFitDetailsInfo?profileId=', ProfileId + '&jobId=' + jobId)
    .subscribe(
      data3 => {
        
        let unique_c = [];
        data3.forEach((c) => {
          if (!unique_c.includes(c)) {
            unique_c.push(c);
          }
        });
        this.skillfitcheck = unique_c  ;
        if (unique_c.length > 0) {
          this.Skill.labels=[];
          this.Skill.datasets[0].data=[];
          unique_c.forEach((a) => {
            var color = Math.floor(0x1000000 * Math.random()).toString(16);
            var r = '#' + ('000000' + color).slice(-6);
            this.Skill.datasets[0].backgroundColor.push(r);
            this.Skill.labels.push(a.SkillName);
            this.Skill.datasets[0].data.push(a.SkillFit.toFixed(2));          
          })
        }    
      })
}

GetCandidateJobFitResult(Pid) {
  this._service.GetService('ProfileAPI/api/GetJobFitDetailsInfo?profileId=', Pid + '&jobId=' + this.data.jobId)
    .subscribe(
      data2 => {
        if (data2 != null) {
          var exp;
          if (data2.ExperienceFit == null) {
            exp = 0;
          }
          else {
            exp = data2.ExperienceFit;
          }
        }  
        this.Job.datasets[0].data = [exp, data2.RoleFit, data2.JobHopping, data2.Education];
//debugger
        this.FitDetails = data2.JobFit;

      })
}

getColor(arr, i) {
  return arr[i];
}

GetProfileId(email)
{
  return this._service.GetService('IdentityAPI/api/GetProfileIdFromEmail?email=',email).subscribe(
    ProfileId=>{
    //this.GetPercent(Id);
    this.CProfileId = ProfileId;
    this.GetAllProfileDetails(ProfileId)
    this.uploadRes.find(obj => {
      if(obj != null)
      {
        if(obj.ProfileId === ProfileId)
        {
          return obj.ProfileId === ProfileId;
        }
      
      }
    
    });
  })
}


GetAllProfileDetails(ProfileId)
{
              //  this.CProfileId = ProfileId;
                this.GetProfileDetails(ProfileId);
                this.getCandidateExperience(this.data.jobId,ProfileId);
                // this.GetProfileSummaryDetails(ProfileId);
                // this.GetSkills(ProfileId);
                // this.GetDomains(ProfileId);
                this.GetEducation(ProfileId);
                this.GetCertification(ProfileId);
                this.GetExperience(ProfileId);
                this.GetAchievements(ProfileId);
                this.GetMatchingPercentage(ProfileId);
                this.GetJobRequiredSkills(ProfileId);
                this.GetJobRequiredDomain(ProfileId);
                
                this.GetProfileRoleFitDetails(ProfileId);
                this.CProfileId = ProfileId;
                // this.uploadRes.find(obj => {
                //   if(obj != null)
                //   {
                //     if(obj.ProfileId === ProfileId)
                //     {
                //       return obj.ProfileId === ProfileId;
                //     }
                  
                //   }
                
                // });
                // this.GetProjects(ProfileId);
}


GetProfileDetails(Id)
{
  
  return this._service.GetService('ProfileAPI/api/GetProfileDetailsAndAddress?profileId=',Id).subscribe(
    ta=>{
    //this.GetPercent(Id);
    this.profileDetails = ta[0];
    let objIndex = this.uploadRes.findIndex((obj => obj.ProfileId == Id));
    this.uploadRes[objIndex].FirstName = this.profileDetails.FirstName;
    this.uploadRes[objIndex].LastName = this.profileDetails.LastName;
    this.uploadRes[objIndex].ProfileTitle = this.profileDetails.ProfileTitle;
    this.uploadRes[objIndex].ResumeStatus;  
    this.selectedCandidate =  this.processedProfiles.find((p => p == objIndex)); 
    this.currentRecordIndex = objIndex;
    // this.profileEdit = true;
    //this.flashcardInputExpanded = true;
  })
}



GetProfileRoleFitDetails(ProfileId) {
  return this._service.GetService('ProfileAPI/api/JobCandidateProfileForRoleFit?jobId='+this.data.jobId +'&profileId=',ProfileId)
    .subscribe(
      data => {
        this.roleFitDetails = data;
        }
      );
}

GetExperience(Id)
{
  return this._service.GetService('ProfileAPI/api/GetExperience?profileId=',Id + '&freeLance=false').subscribe(
    experiences=>{
    this.experience = experiences;
    //this.GetPercent(PId);
  })
}

GetEducation(Id)
{
  return this._service.GetService('ProfileAPI/api/GetEducation?profileId=',Id).subscribe(
    educations=>{
    this.education = educations;
    //this.GetPercent(PId);
  })
}

GetCertification(Id)
{
  return this._service.GetService('ProfileAPI/api/GetCertification?profileId=',Id).subscribe(
   certificates=>{
    this.certificate = certificates;
    //this.GetPercent(PId);
  })
}

GetAchievements(Id)
{
  return this._service.GetService('ProfileAPI/api/GetProfileAchievements?profileId=',Id).subscribe(
    achievement=>{
     this.achievements = achievement;
     //this.GetPercent(PId);
   })
}

GetJobRequiredSkills(PId) {
  const jobId = this.data.jobId;
  this.GetCandidateSkillFitResult(PId,this.data.jobId);
  return this._service.GetService('ProfileAPI/api/GetCandidateMissingSkills?JobId=' + jobId + '&ProfileId=', PId).subscribe(skills => {
    if(skills.length > 0)
    {
      this.Jskills =  skills.filter(
        (element, i) => i === skills.indexOf(element)
      );
    }
    else
    {
      this.Jskills = [];
      this.GetJobMatchedSkills(PId);
     
    }
  })
}

GetJobMatchedSkills(PId) {
  const jobId = this.data.jobId;
  return this._service.GetService('ProfileAPI/api/GetCandidateMatchedSkills?JobId=' + jobId + '&ProfileId=', PId).subscribe(skills => {
    this.JMskills =  skills;
  })
}

GetJobRequiredDomain(PId) {
  const jobId = this.data.jobId;
  return this._service.GetService('ProfileAPI/api/GetCandidateMissingDomains?jobId='+ jobId+ '&ProfileId=', PId).subscribe(domain => {
    this.GetCandidateJobFitResult(PId);
    if(domain.length>0)
    {
      //debugger
      this.Jdomains = domain; 
    }
    else
    {
       this.Jdomains = [];
       this.GetJobMatchedDomain(PId);
    }
   
   })
 }

 onOpenCalendar(container) {
  container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
  };
  container.setViewMode('month');
}

 GetJobMatchedDomain(PId) {
  const jobId = this.data.jobId;
  return this._service.GetService('ProfileAPI/api/GetCandidateMatchedDomains?jobId='+ jobId+ '&ProfileId=', PId).subscribe(domain => {
      this.JMdomains = domain; 
      this.GetCandidateJobFitResult(PId); 
   })
 }

  
 onChnage(data) {
  // alert(data);
  if (data > 11 || data < 0) {
    // this.expMonth = null;
    this.errorText = 1;
  } else {
    this.errorText = 0;
  }
}


  getFileDetails() {
    this.fileCount = 0;
    this.successCount = 0;
    this.issueCount = 0;
    this.tempuploadResponse = [];
    this.selectedFileNames = [];
    this.formDAtaList = [];
    this.profileStatus = [];
    // this.spinner.show();
   
    this.totalFile = this.selectedFiles.length;
    this.totalSelectedDoc = this.selectedFiles.length;
      this.slice = 100 / this.selectedFiles.length;
      for (let i = 0; i < this.selectedFiles.length; i++) {
        let request = '';
        var formData = new FormData();
        this.fileUploadForm.value.Url = '';
        this.fileUploadForm.value.FileName = this.selectedFiles[i].name;
        this.fileUploadForm.value.FileExtension = this.selectedFiles[i].type;
        this.fileUploadForm.value.UserName = null;
        this.fileUploadForm.value.JobId = this.data.jobId;
        this.fileUploadForm.value.EmailCheck = this.emailCheck;
        // document.getElementById('jobId').value; //this.jobid;
        // this.fileUploadForm.value.ResumeFile = e.target.files[0];
        if (this.fileUploadForm.value !== '') {
          request = JSON.stringify(this.fileUploadForm.value);
        }
        var Profdata = new ProfileStatus();
        Profdata.id = i;
        Profdata.percentage = (this.selectedFiles.length - i - 1) * this.slice;
        if (!Profdata.percentage)
          Profdata.percentage = 5;
        Profdata.text = "Parsing the Document......";
        Profdata.id = i;
        this.profileStatus.push(Profdata);
        formData = new FormData();
        var temp = new UploadResponse()
        this.selectedFileNames.push(this.selectedFiles[i].name);
        temp.FirstName = this.selectedFiles[i].name;
        temp.DocId = i;
        temp.ResumeStatus = null;
        this.tempuploadResponse.push(temp);
        formData.append('ResumeFile', this.selectedFiles[i]);
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

  DeleteRecord(i)
  {
    this.uploader.removeFromQueue(i);
    this.selectedFiles.splice(i, 1);
  }

  EditRoleFitHandler() {
    this.editRoleFitShow = true;
  }

  CloseEditRoleFit() {
    this.editRoleFitShow = false;
  }

  EditExperienceHandler() {
    this.editExperience = true;
  }

  CloseEditExperience() {
    this.editExperience = false;
  }

  EditSkillHandler() {
    this.editSkills = true;
  }

  CloseEditHandler() {
    this.editSkills = false;
  }

  DeleteCertification(id) {
    this._service
      .DeleteService("ProfileAPI/api/DeleteCertification?certificationId=", id)
      .subscribe(
        data => {
         this.GetCertification(this.CProfileId);
        },
        error => console.log(error)
      );
  }

  DeleteEducation(id) {
    this._service.DeleteService('ProfileAPI/api/DeleteEducation?educationId=', id)
      .subscribe(data => {
        this.GetEducation(this.CProfileId);
      },
        error => console.log(error));
  }

  DeleteExperience(id) {
    this._service
      .DeleteService("ProfileAPI/api/DeleteExperience?experienceId=", id)
      .subscribe(
        (data) => {
          this.GetExperience(this.CProfileId);
        },
        (error) => console.log(error)
      );
  }

  uploadMultiple(formData, DocId) {
    if(this.sdetails.planId !==  "enterprise" || this.sdetails.planId === undefined )
    {
      this.jobdetailsservice.byteStorage(formData, 'ProfileApi/api/ParseResumeMakePublic').subscribe(data => {  // 'api/JobDescriptionParse'
        if (data) {
          this.uploadResponse = data;
          this.processedProfiles.push(this.uploadResponse[0].ResumeData);
          this.uploadRes.push(this.uploadResponse[0]);
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
          if(this.selectedFiles.length === this.uploadRes.length)
          {
            this.isProcessing = false; 
            this.haveProfiles = true;
            this.currentRecordIndex =0;
            this.selectedCandidate = this.processedProfiles[this.currentRecordIndex];  
            this.GetAllProfileDetails(this.uploadResponse[0].ProfileId);
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
    if(this.sdetails.planId ===  "enterprise")
    {
      this.jobdetailsservice.byteStorage(formData, 'ProfileApi/api/ParseResume').subscribe(data => {  // 'api/JobDescriptionParse'
        if (data) {
          this.uploadResponse = data;
          this.processedProfiles.push(this.uploadResponse[0].ResumeData);
          this.uploadRes.push(this.uploadResponse[0]);
          if(this.selectedFiles.length === this.uploadRes.length)
          {
            this.isProcessing = false; 
            this.haveProfiles = true;
            this.currentRecordIndex =0;
            this.selectedCandidate = this.processedProfiles[this.currentRecordIndex];  
            this.GetAllProfileDetails(this.uploadResponse[0].ProfileId);
          }
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
    this.Inprogress = true;
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
              this.Inprogress = false;
              // alert("asdasdasdas");
              this.tempuploadResponse[index].ResumeStatus = "Requested";
              this.uploadRes[index].ResumeStatus = "Requested";
             
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
            this.spinner.hide();          
            this.jobdetailsservice.byteStoragePrivate(a, 'ProfileApi/api/ParseResume').subscribe(data => { // 'api/JobDescriptionParse'
              if (data) {
                this.Inprogress = false;
                //this.spinner.hide();
                // alert("asdasdasdas");
                this.tempuploadResponse[index].ResumeStatus = "Arytic_prof";
                this.uploadRes[index].ResumeStatus = "Arytic_prof";
                
              }
            });
          }
        })

      } else {
     if(this.sdetails.planId ===  "enterprise")
        {
        this.jobdetailsservice.byteStorage(data, 'ProfileApi/api/UpdateAction').subscribe(data => {  // 'api/JobDescriptionParse'
          if (data) {
            this.spinner.hide();
            this.Inprogress = false;
            this.tempuploadResponse[index].ResumeStatus = "ProfileAsscociated";
            this.uploadRes[index].ResumeStatus = "ProfileAsscociated";

          }                 
        });
      }
      else
      {
        this.jobdetailsservice.byteStorage(data, 'ProfileApi/api/UpdateActionPublic').subscribe(data => {  // 'api/JobDescriptionParse'
          if (data) {
            this.spinner.hide();
            this.Inprogress = false;
            this.tempuploadResponse[index].ResumeStatus = "ProfileAsscociated";
            this.uploadRes[index].ResumeStatus  = "ProfileAsscociated";
          }
         
        
        });
      }
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
          // //debugger;
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
  ProfileId: number;
  ResumeData:any;
}

export class ProfileStatus {
  text: string;
  percentage: number;
  id: number;
}

export class ProfileDetails
{
  public ProfileId:number;
  public UserId:number;
  public FirstName:string;
  public LastName:string;
  public UserName:string;
  public ProfileTitle:string;
  TotalExperience: any;
}

export class ProfileEducation
{
  public  EducationId:number;
  public  ProfileId:number;
  public  QualificationId:number;
  public  QualificationName: string;
  public  Specialization:string;
  public  InstituteORUniversity:string;
  public  FromYear:number;
  public  ToYear:number;
}

export class ProfileCertification
{
  public  CertificationId:number;
  public  ProfileId:number;
  public  ProviderId:number;
  public  CertificationName: string;
  public  IssuedBy:string;
  public  YearOfAchievement:string;
  public  ImageUrl:number;
}

export class ProfileExperience
{
  public  ExperienceId:number;
  public  ProfileId:number;
  public  JobTitle: string;
  public  JobLocation:string;
  public  CompanyName:string;
  public  Description:string;
  public  StartDate:string;
  public  EndDate:string;
}

export interface Certification {
  UserId: string;
  CertificationId: number;
  ProfileId: string;
  ProviderId: string;
  IsCertified: boolean;
  CertificationName: string;
  IssuedBy: string;
  YearOfAchievement: string;
  LifeTime: string;
  ImageUrl: string;
}

export class Provider
{
ProviderId:number;
ProviderName:string;
}



export class processProfiles
{
  sfile : File;
  profiles : any;
}

export class selectedFile
{
  sfile : File;
  bdata : any;
}

export class CandidateExp {
  public RecordId: number;
  public ProfileId: number;
  public JobId: number;
  public Experience: number;
  public MinExperienceId: number;
  public MaxExperience: number;
  public IsMissing: number;
}

export class InsertRole {

  public ProfileId: Number;
  public ProfileTitle: string;
  public Industry: string;
  public PositionType: string;
  public Category: string;
  public TitleInfo: string;
  public XmlKeyResponses: KeyRole[] = [];
}

export class KeyRole {
  public KeyResponsebilityId: number;
  public KeyMinExperienceId: number;
  public KeyMaxExperienceId: number;
}