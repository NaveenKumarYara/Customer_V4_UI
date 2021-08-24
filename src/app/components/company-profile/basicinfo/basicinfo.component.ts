import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { CompanyProfile } from '../../../../models/companyprofile';
import {GetCompanyLogo} from '../../../../models/GetCompanyLogo';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service/api.service';
import { basicinfo } from './basicinfo';
import { Router } from '@angular/router';
import { CompanyProfileService } from '../company-profile.service';
import { AlertService } from '../../../shared/alerts/alerts.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { Item } from 'angular2-multiselect-dropdown';
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
    @ViewChild('Indusrty') indusrty;
    dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
    imageChangedEvent: any = '';
    imgSrc: any = [];
    showimg:boolean=false;
    showP:boolean=false;
    CustomerIndustries:any=[];
    croppedImage: any = '';
    private recordRTC: any;
    private stream: MediaStream;
    @ViewChild('video') video;
    recorder: any; // globally accessible
    Ccode:any;
    Industries:any=[];

    private selectCountry : any;
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
    slist=[];
    Id:any;
    BusinessDomain:any=[];
    iseditProfile: any = false;
    fullname: any;
  firstname: any;
  lastname: any;
  ILoading = false;
  newIndustry = new NewIndustry();
  newCustomerIndustry = new NewCustomerIndustry();
  currentVideoUpload: File;
  saveVideo: FormGroup;
  options = {
    imgSrc: '', // base64 encoded image for default preview
    fileSize: 2048, // in Bytes (by default 2048 Bytes = 2 MB)
    minWidth: 0, // minimum width of image that can be uploaded (by default 0, signifies any width)
    maxWidth: 0,  // maximum width of image that can be uploaded (by default 0, signifies any width)
    minHeight: 0,  // minimum height of image that can be uploaded (by default 0, signifies any height)
    maxHeight: 0,  // maximum height of image that can be uploaded (by default 0, signifies any height)
    fileType: ['image/gif', 'image/jpeg', 'image/png'], // mime type of files accepted
    height: 400, // height of cropper
    quality: 0.8, // quality of image after compression
    crop: [  // array of objects for mulitple image crop instances (by default null, signifies no cropping)
      {
        autoCropArea: 0.8, // A number between 0 and 1. Define the automatic cropping area size (percentage).
        ratio: 1, // ratio in which image needed to be cropped (by default null, signifies ratio to be free of any restrictions)
        minWidth: 0, // minimum width of image to be exported (by default 0, signifies any width)
        maxWidth: 0,  // maximum width of image to be exported (by default 0, signifies any width)
        minHeight: 0,  // minimum height of image to be exported (by default 0, signifies any height)
        maxHeight: 0,  // maximum height of image to be exported (by default 0, signifies any height)
        width: 0,  // width of image to be exported (by default 0, signifies any width)
        height: 0,  // height of image to be exported (by default 0, signifies any height)
        output: 'base64',  // Output format. Can be 'base64' or 'blob'. (by default 'base64')
      }
    ]
  };
  public addTagIndustry: (name)=>void;
  constructor(private _service: ApiService, private route: Router,private ng2ImgMax: Ng2ImgMaxService, private fb: FormBuilder, private companyprofileservice: CompanyProfileService, private alertService: AlertService) {
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

   

    this.selectCountry = [
            {
      "name": "United States",
      "dial_code": "+1",
      "code": "US"
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
      "name": "Canada",
      "dial_code": "+1",
      "code": "CA"
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

    this.GetVideo();
   }
   ngAfterViewInit() {
    const video: HTMLVideoElement = this.video.nativeElement;
    video.muted = false;
    video.controls = true;
    video.autoplay = false;
  }
  chooseCountry(id)
  {
    this.Ccode =id;
  }
  onItemSelect(item: any) {
   this.selectedItems.push(Item);
  }
  onSelectAll(items: any) {
    this.selectedItems.push(Item);
  }
  ngOnInit() {
    this.GetCompanyLogo();
    this.GetCustomerDomain();
    this.GetCustomerIndustry();
    this.addTagIndustry = (name) => this.addIndustry(name);
    this.populateCompanyProfile(this.customer.CustomerId);
    this.dropdownSettings  = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };
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

  GetCustomerIndustry()
 {
  this._service.GetService('ProfileAPI/api/GetBussinessDomainList?','')
  .subscribe(
    data => {
    data.forEach(element => {
      if(element.BussinessDomain != null)
      {
      this.dropdownList.push(   { item_id: element.Id, item_text: element.BussinessDomain })
      }
     
    });
      
    });
 }


  GetCustomerDomain() {
    this._service.GetService('ProfileAPI/api/GetCustomerBussinessDomainList?CustomerId=', this.customer.CustomerId)
      .subscribe(
        data => {
          this.CustomerIndustries = data;
          data.forEach(element => {
            if(element.BussinessDomain !=null)
            {
              this.selectedItems.push({ item_id: element.DomainName, item_text: element.BussinessDomain });
            }

          });
        });
  }
  GetCompanyLogo() {
    return this.companyprofileservice.getCompanyLogo(this.customerId).subscribe(res => {
      this.companyLogo = res;
      this.showP = false;
      this.showimg=false;
  });
  }

  addIndustry(val)
  {
    const  Industries = new NewIndustry();
    Industries.BusinessDomain = val;
    if(val!=null)
    {
      this.ILoading = true;
      this.NewIndustry(val);
    }

    return { BussinessDomain: Industries.BusinessDomain , tag: true};
  }

  NewIndustry(val)
{
  this.newIndustry.BusinessDomain = val;
  this._service.PostService(this.newIndustry, 'ProfileAPI/api/InsertNewBussinessDomain')
        .subscribe(data => {
      if(data>0)
      {
        this.ILoading = false;
        this.Id = data;
        this.BusinessDomain = val;
        this.GetCustomerIndustry();
      }
    })
}

  updateJobIndustry() { 
    this.newCustomerIndustry.CustomerId = this.customer.CustomerId
    this.newCustomerIndustry.BusinessDomain = this.selectedItems.map(x => x.item_id).toString();
    this._service.PostService(this.newCustomerIndustry, 'ProfileAPI/api/InsertCustomerBussinessDomain')
        .subscribe(data => {
        this.newCustomerIndustry = new NewCustomerIndustry();
        this.GetCustomerDomain();
        this.populateCompanyProfile(this.customer.CustomerId);
      
    })
  }


  populateCompanyProfile(customerId) {
    return this.companyprofileservice.getCompanyProfile(customerId).subscribe(res => {
      this.companyprofile = res;
      this.companyName = this.companyprofile.CompanyName;
      this.contactEmail = this.companyprofile.ContactEmail;
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
    //$('#headerProfilePic').attr('src', data[0]);
    //this.customer.UserProfilePictureUrl = sessionStorage.getItem('companyLogo');
    this.iseditProfile = false;
    this.alertService.success('Photo uploaded successfully');
    setTimeout(() => {
      this.alertService.clear();
  }, 3000);
    this.populateCompanyProfile(this.customerId);
    this.GetCompanyLogo();

  });
}

dataURLtoFile(dataurl) {
 
  var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), 
      n = bstr.length, 
      u8arr = new Uint8Array(n);
      
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  
 let imgfile= new File([u8arr],'img.png', {type:mime});
 this.check(imgfile);
}

check(event)
{
  const reader = new FileReader();

  const file = event;
  const stringToSplit = file.name;
  const x = stringToSplit.split('.');
  const ext = x[1];
  this.ng2ImgMax.resizeImage(file, 400, 300).subscribe(
    result => {
      this.currentImageUpload = result;
      this.showimg=true;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.customer.UserProfilePictureUrl = 'data:image/png;base64,' + reader.result.split(',')[1];
        //this.uploadPhoto();
      };
    })
     

    

  

}

onSelect(event) {
  this.alertService.clear();
   this.dataURLtoFile(event);
 
  

}
SaveDomain()
{
  this.newCustomerIndustry.CustomerId = this.customer.CustomerId
  this.newCustomerIndustry.BusinessDomain = this.BusinessDomain;
  this._service.PostService(this.newCustomerIndustry, 'ProfileAPI/api/InsertCustomerBussinessDomain')
        .subscribe(data => {
        this.newCustomerIndustry = new NewCustomerIndustry();
        this.GetCustomerDomain();
        this.populateCompanyProfile(this.customer.CustomerId);
      
    })
}

  saveProfile() {
    this.updateJobIndustry();   
    this.locations = $('#searchZipCode').val();
    if (this.locations.length <= 7) {
      this.alertService.error('please select from Google Location');
      setTimeout(() => {
        this.alertService.clear();
    }, 3000);
    } else {
      this.iseditProfile = true;
      this.locations = $('#searchZipCode').val();
      //this.companyName = $('#companyName').val();
      this.website = $('#webSite').val();
      //this.contactEmail = $('#contactEmail').val();
      this.linkedInURL = $('#linkedinUrl').val();
      this.facebookURL = $('#facebookUrl').val();
      this.twitterURL = $('#twitterUrl').val();
      this.mobilePhone =  $('#mobile').val();
      this.homePhone = $('#home').val();
      this.address1 = $('#address1').val();
      this.basicinfo.customerId = this.customerId;
      this.basicinfo.companyName =  this.companyName;
      this.basicinfo.website = this.website;
      this.basicinfo.contactEmail = this.contactEmail;
      this.basicinfo.linkedInURL = this.linkedInURL;
      this.basicinfo.facebookURL =  this.facebookURL;
      this.basicinfo.twitterURL = this.twitterURL;
      this.basicinfo.countryCode=this.Ccode!=undefined?this.Ccode:"+1";
      this.basicinfo.mobilePhone = this.mobilePhone;
      this.basicinfo.homePhone = this.homePhone;
      this.basicinfo.address1 = this.address1;
      this.basicinfo.address2 = this.locations;

     }
     if((this.basicinfo.companyName!=null&&this.basicinfo.contactEmail!=null)||(this.basicinfo.companyName!=''&&this.basicinfo.contactEmail!=''))
     {
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

export class NewIndustry
{  
  BusinessDomain: string;  
}

export class NewCustomerIndustry
{
  CustomerId:number;
  BusinessDomain: string;
}