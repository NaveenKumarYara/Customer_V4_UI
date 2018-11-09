import { Component, OnInit, Input } from '@angular/core';
import { CompanyProfile } from '../../../../models/companyprofile';
import {GetCompanyLogo} from '../../../../models/GetCompanyLogo';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service/api.service';
import { basicinfo } from './basicinfo';
import { Router } from '@angular/router';
import { CompanyProfileService } from '../company-profile.service';

import swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-basicinfo',
  templateUrl: './basicinfo.component.html',
  styleUrls: ['./basicinfo.component.css'],
  providers: [ApiService]
})
export class BasicinfoComponent implements OnInit {
    @Input() companyprofile: CompanyProfile;
    @Input() getcompanylogo:GetCompanyLogo;
    customer : any;
    customerId:any;
    userId:any;
    basicinfo =new basicinfo();
    profileId:any;
    saveImage: FormGroup;
    public file_srcs: string[] = [];
    public debug_size_before: string[] = [];
    public debug_size_after: string[] = [];
    currentImageUpload: File;
    companyLogo:any;
    locations: any;
    companyName:any; 
    website:any; 
    contactEmail:any; 
    linkedInURL:any; 
    facebookURL:any; 
    twitterURL:any; 
    mobilePhone:any; 
    homePhone:any; 
    address1:any; 
    address2:any; 
    iseditProfile: any = false;
    fullname: any;
  firstname: any;
  lastname: any;
  
  constructor(private _service: ApiService, private route: Router, private fb: FormBuilder,private companyprofileservice: CompanyProfileService) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId =this.customer.CustomerId;
    this.userId = this.customer.UserId;
    this.saveImage = this.fb.group({
      'customerId': [this.customerId, Validators.required],
      'UserName': [this.customer.FirstName, Validators.nullValidator],
      'companyLogo': [null, Validators.nullValidator],
    });
   }

  ngOnInit() {
    this.GetCompanyLogo();
  }
  GetCompanyLogo()
  {
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
  let _formData: FormData = new FormData();
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
    swal('Photo upload successful');
    this.populateCompanyProfile(this.customerId);
    this.GetCompanyLogo();

  });
}
onFileChange(event) {
  let reader = new FileReader();
  if (event.target.files && event.target.files.length > 0) {
    let file = event.target.files[0];
    let stringToSplit = file.name;
    let x = stringToSplit.split(".");
    var ext = x[1];
    if ((ext == 'png' || ext == 'jpg' || ext == 'jpeg') || (ext == 'PNG' || ext == 'JPG' || ext == 'JPEG')) {
      if (file.size > 2048576) {
        swal("Too Big Size.. File Not Allowed");
      }
      else {
        this.currentImageUpload = file;
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.customer.UserProfilePictureUrl = 'data:image/png;base64,' + reader.result.split(',')[1];
          this.uploadPhoto();
        };
      }
    }
    else {
      swal("Please upload the files with extension jpg, png or jpeg");
    }

  }

}

  saveProfile() {
    this.locations = $("#searchZipCode").val();
    if (this.locations.length <= 7) {
      alert('please select from Google Location');
    }
    else {
      this.iseditProfile = true;
      this.locations = $("#searchZipCode").val();
      this.companyName = $("#companyName").val(); 
      this.website= $("#webSite").val();
      this.contactEmail= $("#contactEmail").val();
      this.linkedInURL= $("#linkedinUrl").val();
      this.facebookURL= $("#facebookUrl").val();
      this.twitterURL= $("#twitterUrl").val();
      this.mobilePhone= $("#mobile").val();
      this.homePhone= $("#home").val();
      this.address1= $("#address1").val();
      this.basicinfo.customerId = this.customerId;
      this.basicinfo.companyName =  this.companyName;
      this.basicinfo.website= this.website;
      this.basicinfo.contactEmail=this.contactEmail;
      this.basicinfo.linkedInURL= this.linkedInURL;
      this.basicinfo.facebookURL=  this.facebookURL;
      this.basicinfo.twitterURL= this.twitterURL;
      this.basicinfo.mobilePhone=this.mobilePhone;
      this.basicinfo.homePhone= this.homePhone;
      this.basicinfo.address1= this.address1;
      this.basicinfo.address2=this.locations;

     }
     this._service.PostService(this.basicinfo, 'ProfileAPI/api/UpdateCompanyprofile')
        .subscribe(data => {
          $("#autocompletezip").val('');
          var contents = $("#searchZipCode").val();
          $("#autocompletezip").val(contents);
          this.populateCompanyProfile(this.customerId);
          this.iseditProfile = false;
        },
          error => console.log(error));
    }
  }