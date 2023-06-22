import { Component ,  OnInit,ViewContainerRef} from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form, FormControl } from '@angular/forms';

import { AppService } from '../../app.service';
import { AlertService } from '../../shared/alerts/alerts.service';
declare var $: any; 
import { Router, ActivatedRoute } from '@angular/router';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import { SettingsService } from '../../../settings/settings.service';
import { companysize, ConfigurePassword } from '../../../models/companyprofile';
@Component({
  
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers:[AppService,AlertService]
})
export class SignUpComponent  implements OnInit{
  
  signUpform: FormGroup;
  customerId:any;
  companyLogo:any;
  freelance:boolean = false;
  sizelist:companysize[]=[];
  private selectCountry : any;
  email:any;
  show : any = false;
  result :any;
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"; 
  info =new Register();
  password:any;
  fieldTextType: boolean;
  userId:any;
  date: Date;
  addsubscription = new SubscriptionInputs();
  Ccode:any;
  sizeid:any;
  addPricing = new payment();
  showPassword: ConfigurePassword[] = [];
  puid:any;
  planId:any;
  afterRegistration=false;
  loading = false;
  loginstyle(): void {
    this.loading = true;
  }
  terms = new FormControl(false);
  selectedOption:Options = new Options(7, 'Employer' );
  options = [
    new Options(7, 'Employer' ),
     new Options(4, 'Hiring Agency' ),
     new Options(1, 'Freelance Recruiter' )
  ];
  
  constructor( private toastr:ToastsManager,private _vcr: ViewContainerRef,private route: ActivatedRoute,private fb: FormBuilder, private router: Router,private appService: AppService,private alertService : AlertService, private settingsService: SettingsService) {
    this.route.params.subscribe(params => {
        console.log(params);
        if (params['id'] > 0) {
          // this.populatePersonType(params['jobId']);
          // this.PopulateJobdetail(params['jobId']);
          //  this.creteComponent.PopulateJobdetail(params['jobId']);
          // create session to it and store while loging in 
          sessionStorage.setItem('Id', params['id']);
        }
        if(params.Pid !== null&& params.Pid > 0)
        {
          sessionStorage.setItem('planId',params.Pid);
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
      this.toastr.setRootViewContainerRef(_vcr);
      
  }

  login()
  {
    this.router.navigateByUrl('/login' , { replaceUrl: true });
  }

  Layout()
  {
    window.location.href = this.settingsService.settings.CandidateLogin; 
  }

  LayoutR()
  {
    window.location.href = 'https://arytic.com'; 
  }


  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }


  SignUp() {
    this.show = false;
    if(this.signUpform.invalid)
    {
      this.signUpform.controls['ContactFirstName'].markAsTouched()
      this.signUpform.controls['ContactLastName'].markAsTouched()
      if(this.freelance == false)
      {
        this.signUpform.controls['CompanyName'].markAsTouched()

      }
    
      this.signUpform.controls['ContactEmail'].markAsTouched()
      this.signUpform.controls['Password'].markAsTouched()
      this.toastr.error('Please provide the valid details!', 'Oops!');
        setTimeout(() => {
            this.toastr.dismissToast;
        }, 3000);
    }
    else if(this.result.UserId>0)
    {
      this.show = true;
    }
    else if(this.terms.value === false)
    {
      this.loading = false;
      this.toastr.error('Please do accept terms and conditions!', 'Oops!');
      setTimeout(() => {
        this.toastr.dismissToast;
      }, 3000);
    }
    else if(this.result.UserId === 0 && this.terms.value === true)
    {
      if(this.freelance == true)
      {
        this.signUpform.value.UserRoleId = 1;
      }
      this.signUpform.value.CountryCode = this.Ccode != undefined ? this.Ccode : '+1';
        this.appService.signUp(this.signUpform.value)
        .subscribe(
          data => {
            this.puid= data;
            // ********* check this commenting for now
            if (data !== null) {
              //this.AddPricing();
              this.AddSubscription();
              this.Email(data);
  
            // this.Email(data);
            this.showPassword.forEach(x => {
                if (x.Code === 'ShowRegisterPassword' && x.IsEnabled === false ) {
                   //this.Email(data);
                }
              });
            this.afterRegistration = true;
            // this.toastr.successToastr('Thank you for signing up, our team will get back to you shortly.', 'Success!');
         }
        });
        

  }
  
}

GetEmailValidate() {
  this.show = false;
  this.appService.validateemail(this.signUpform.value.ContactEmail)
  .subscribe(
  data => {
    this.result = data;
    if(this.result.UserId>0)
    {
      this.show = true;
    }
  })
}

  Email(userId)
  {
    this.info.FullName = this.signUpform.value.ContactFirstName+this.signUpform.value.ContactLastName;
    this.info.ToEmailId = this.signUpform.value.ContactEmail;
    this.info.ApplicationName = 'Arytic';
    this.info.AppLink = this.settingsService.settings.customerLogin+';Uid='+userId + ';Pid=' + this.planId; 
    this.info.ClientLogo = '';
    this.appService.SignUpEmail(this.info).subscribe(data => {
      if (data==0) {
        this.toastr.success('Please check your Mail to Activate','Success');
        this.signUpform.reset();
        setTimeout(() => {
          this.toastr.dismissToast;
          this.router.navigateByUrl('home');   
        }, 3000);
      }

      });
  }
  MissClear() {
    this.toastr.dismissToast;
  }

  GetCompany()
{
  return this.appService.GetCompanySize().subscribe(
    data => {
      this.sizelist = data;
    }
  )

}

chooseCountry(id)
{
  this.Ccode =id;
}

getValue(optionid) {
  this.selectedOption = this.options.filter((item)=> item.id == optionid)[0];
  
  if(optionid == 1)
  {
    this.signUpform.value.CompanyName = 'Arytic_Partner';
    this.freelance = true;

  }
  else
  {
    this.freelance = false;
  }

 }

 AddSubscription()
{
  this.addsubscription.customerId = this.puid;
  this.addsubscription.firstName = this.signUpform.value.ContactFirstName;
  this.addsubscription.lastName = this.signUpform.value.ContactLastName;
  this.addsubscription.eMail = this.signUpform.value.ContactEmail;
  if(this.planId == "1")
  {
    this.addsubscription.PlanId = 'starterdirect';
  }
  if(this.planId == "2")
  {
    this.addsubscription.PlanId = 'growthdirect';
  }
  if(this.planId >= "3")
  {
    this.addsubscription.PlanId = 'enterprise';
  }
  else if(this.planId == 0 || this.planId == undefined)
  {
    this.planId=1;
    this.addsubscription.PlanId = 'starterdirect';
  }
  this.appService.AddSubscription(this.addsubscription).subscribe(data => {
    if(data == true)
    {
      this.addsubscription= new SubscriptionInputs();
    }

  });
}

AddPricing()
{
  this.addPricing.UserId = this.puid;
  this.addPricing.PlanId = this.planId;
  this.addPricing.StartDate = new Date();
  this.date = new Date();
  this.addPricing.EndDate = new Date(this.date.setDate( this.date.getDate() + 7 )) ;
  this.addPricing.IsActive = true;
  // this.appService.AddPlanDetails(this.addPricing).subscribe(data => {
  //   if(data == true)
  //   {
  //     // this.toastr.successToastr('Thank you for Subscribing to Arytic', 'Success!');
  //     // setTimeout(() => {
  //     //        this.toastr.dismissToastr;
  //     //        }, 3000);
  //   }
  //   this.addPricing= new payment();
  // });
}

configurePassword() {
  this.appService.configurePassword().subscribe(x =>
    this.showPassword = x);
}



 onchange(id)
 {
   this.sizeid = parseInt(id, 10);
 }

  ngOnInit() {
    this.show = false;
    $('.glyphicon-eye-open').on('click', function() {
      $(this).toggleClass('glyphicon-eye-close');
      const type = $('#password').attr('type');
      if (type === 'text') {
        $('#password').prop('type', 'password');
      } else {
        $('#password').prop('type', 'text');
      }
    });
    this.GetCompany();
    this.planId = sessionStorage.getItem('planId')!== null ? parseInt(sessionStorage.getItem('planId'), 10) : 0;
    this.configurePassword();
    this.signUpform = this.fb.group({
      CandidateIdentifier:  ['', Validators.compose([Validators.nullValidator])],
      CustomerId: [0, Validators.compose([Validators.nullValidator])],
      UserId  : [0, Validators.compose([Validators.required])],
      CompanyName: ['', Validators.compose([Validators.nullValidator])],
      CompanySizeId  : [1, Validators.compose([Validators.nullValidator])],
      CompanyLogo: ['', Validators.compose([Validators.nullValidator])],
      ContactFirstName: ['', Validators.compose([Validators.required])],
      ContactMiddleName: ['', Validators.compose([Validators.nullValidator])],
      ContactLastName: ['', Validators.compose([Validators.required])],
      CountryCode:['+1',Validators.compose([Validators.nullValidator])],
      ContactNumber: ['',  Validators.compose([Validators.required])],
      ContactEmail   : ['', Validators.compose([Validators.required, Validators.email])],
      Password: ['', Validators.compose([Validators.required])],
      //Password: ['123456789', Validators.compose([Validators.nullValidator])],
      Address1: ['', Validators.compose([Validators.nullValidator])],
      Address2: ['', Validators.compose([Validators.nullValidator])],
      ZipCode: ['56898', Validators.compose([Validators.required])],
      CountryName: ['USA', Validators.compose([Validators.required])],
      StateName: ['texas', Validators.compose([Validators.required])],
      CityName: ['austin', Validators.compose([Validators.required])],
      PreferredContactDate: ['', Validators.compose([Validators.nullValidator])],
      FromTime: ['', Validators.compose([Validators.nullValidator])],
      ToTime   : ['', Validators.compose([Validators.nullValidator])],
      WebSite: ['', Validators.compose([Validators.nullValidator])],
      Description: ['', Validators.compose([Validators.nullValidator])],
      TimeZoneId  : [1, Validators.compose([Validators.required])],
      UserRoleId: [7, Validators.compose([Validators.nullValidator])],
      ObjCompany: ['', Validators.compose([Validators.nullValidator])],
      ObjTimeZone:  ['', Validators.compose([Validators.nullValidator])],
      IsDomain: [false, Validators.compose([Validators.nullValidator])]
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


   export class Options {
    constructor(public id: number, public name: string) { }
  }

  export class payment
  {
   public Id:number;
   public UserId:number;
   public PlanId:number;
   public StartDate:Date;
   public EndDate:Date;
   public IsActive:boolean;
  }


  export class SubscriptionInputs
  {
   public customerId:number;
   public firstName:string;
   public lastName:string;
   public eMail:string;
   public PlanId:string;
  }