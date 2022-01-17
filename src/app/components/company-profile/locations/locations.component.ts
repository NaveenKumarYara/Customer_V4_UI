import { Component, OnInit, Input } from '@angular/core';
import { CustomerLocationInfo } from '../../../../models/customerlocationinfo';
import { Router } from '@angular/router';
import { CompanyProfileService } from '../company-profile.service';
import { location } from './location';
import { ApiService } from '../../../shared/services';
declare var $: any;
@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  @Input() companyprofilelocationinfo: CustomerLocationInfo[] = [];
  customer: any;
  customerId: any;
  userId: any;
  locations: any;
  city: any;
  zipcode: any;
  statename: any;
  statecode: any;
  countryname: any;
  location = new location();
  constructor(private _service: ApiService, private route: Router, private companyprofileservice: CompanyProfileService) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.customerId = this.customer.CustomerId;
    this.userId = this.customer.UserId;
  }

  ngOnInit() {
  }
  populateCompanyProfileLocationInfo(customerId) {
    return this.companyprofileservice.getCompanyCustomerLocationList(this.customerId).subscribe(res => {
      this.companyprofilelocationinfo = res;
    });
  }
  deleteLocation(locationinfo) {
    return this.companyprofileservice.DeleteLocation(locationinfo, this.customerId)
      .subscribe(data => {
        this.populateCompanyProfileLocationInfo(this.customerId);
      }, error => { this._service.DebugMode(error); });
  }


  saveLocation() {
    this.locations = $("#ZipCode").val();
    let stringToSplit = this.locations;
    let x = stringToSplit.split(",");
    this.city = x[0];
    this.statecode = x[1];
    this.countryname = x[2];
    let stringtoSpilt = x[1];
    let y = stringtoSpilt.split(" ");
    this.zipcode = y[2];
    this.statename = y[1];

    if (this.locations.length <= 7) {
      alert('please select from Google Location');
    }
    else {
      this.location.customerId = this.customerId;
      this.location.cityName = this.city;
      this.location.stateName = this.statename;
      this.location.countryName = this.countryname;
      this.location.zipCode = this.zipcode;
    }
    this._service.PostService(this.location, 'ProfileAPI/api/InsertCustomerLocation')
      .subscribe(data => {
        $("#ZipCode").val('');
        $("#completezip").val('');
        var contents = $("#ZipCode").val();
        $("#completezip").val(contents);
        this.populateCompanyProfileLocationInfo(this.customerId);
      },
        error => console.log(error));
  }
}

