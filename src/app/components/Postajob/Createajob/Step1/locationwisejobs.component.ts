import { Component, OnInit, Inject, OnDestroy, AfterViewInit, AfterViewChecked, ViewChild } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormControl } from "@angular/forms";
import { AppService } from "../../../../app.service";
import { Subscription } from "rxjs/Subscription";
import { PrefLocation, Cities, MCities } from "../../models/jobPostInfo";
import { NgSelectComponent } from "@ng-select/ng-select";
import { Subject, Observable } from "rxjs";
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from "rxjs/operators";
import { of } from "rxjs/observable/of";
import { concat } from "rxjs/observable/concat";

@Component({
  selector: "app-steps-step2-locationwisejobs",
  templateUrl: "./locationwisejobs.component.html",
  styleUrls: ["./locationwisejobs.component.css"],
})
export class LocationwiseJobsComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild("city") public ngSelect: NgSelectComponent;
  @ViewChild("mcity") public ngSelectM: NgSelectComponent;
  locationwisejobs: Cities[];
  multilocationwisejobs: MCities[];
  showMyContainer: boolean = false;
  noOfOpening: any;
  Remotework:boolean;
  openingsLists = [];
  noOfOpenings: any;
  openingsList: number[];
  // location: string;
  customer: any;
  customerId: any;
  userId: any;
  cities: Observable<Cities[]>;
  selectedCityInput = new Subject<string>();
  cityloading = false;
  mcities: Observable<Cities[]>;
  mselectedCityInput = new Subject<string>();
  mcityloading = false;
  prfLoc = new PrefLocation();
  convertObservable: Cities[];
  mconvertObservable: Cities[];
  selectedCityName: Cities;
  selectedCity: Cities;
  values = new Cities();
  disable: any;
  disableLoc = false;
  isDrafted: boolean;
  locationwithpostions = [];

  constructor(private route: ActivatedRoute, private router: Router, private appService: AppService) {
    this.customer = JSON.parse(sessionStorage.getItem("userData"));
    this.customerId = this.customer.CustomerId;
    this.userId = this.customer.UserId;
    this.disable = localStorage.getItem("Item");
    this.selectedCity = null;
  }

  // selectLocation(loc) {
  // // this.location = loc;
  // this.prfLoc.CityId = loc.CityId;  // as changes suggested by anil PreferredLocationId by cityid
  // this.prfLoc.location = loc.CityName;
  // this.appService.updateLocation(this.prfLoc);
  // this.getSelectedOptionText(null);
  // this.selectedCityName=null;
  //   // console.log(loc);
  // }

  populateopenings() {
    this.openingsList = this.appService.getnoofopenings();
  }
  Opening(val) {
    // this.service.
    this.noOfOpenings = val;


    if(this.noOfOpenings.charAt(0) === '0')
    {               
      this.noOfOpenings = 1;
    }
    
      

    this.appService.updateOpenings(this.noOfOpenings);
  }

  populateLocationwiseJobs() {
    this.locationwisejobs = this.appService.JobLocations;
    this.multilocationwisejobs = this.appService.JobLocationsMulti;
    this.locationwithpostions;
    this.showMyContainer = this.appService.locationselect;
    this.appService.currentOpenings.subscribe((x) => (this.noOfOpenings = x));
    //   const check = this.locationExists(this.prfLoc, this.locationwisejobs);
    // if (!check && this.prfLoc.CityId > 0 ) {
    //   this.selectedCityName = new Cities();
    //   this.selectedCityName.CityId = this.prfLoc.CityId;
    //   this.selectedCityName.CityName = this.prfLoc.location;
    //   this.locationwisejobs.push(this.selectedCityName);
    // }
  }

  // populateCities() {
  //   this.appService.getCities(string).subscribe(res => {
  //     this.locationwisejobs = res;
  //   });
  // }
  private populateCities() {
    this.cities = concat(
      of([]), // default items
      this.selectedCityInput.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => (this.cityloading = true)),
        switchMap((term) =>
          this.appService.getGoogleCities(term).pipe(
            catchError(() => of([])), // empty list on error
            tap(() => (this.cityloading = false))
          )
        )
      )
    );
  }

  private populatemultiCities() {
    this.mcities = concat(
      of([]), // default items
      this.mselectedCityInput.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => (this.mcityloading = true)),
        switchMap((term) =>
          this.appService.getGoogleCities(term).pipe(
            catchError(() => of([])), // empty list on error
            tap(() => (this.mcityloading = false))
          )
        )
      )
    );
  }

  Openings(val) {
    if (val != "" || val != undefined) {
      this.openingsLists.push(val);
    }
  }

  deleteLocation(index) {
    this.locationwisejobs.splice(index, 1);
  }

  deletemLocation(index) {
    this.locationwithpostions.splice(index, 1);
  }

  selectType(val)
  {
          this.appService.RemoteWork=val;   
  }

  getmultiSelectedOptionText(id: string) {
    this.selectedCity = this.mconvertObservable.find((s) => s.CityName === id);
    if (this.multilocationwisejobs.length > 0) {
      //const check = this.mlocationExists(this.selectedCity, this.multilocationwisejobs);
      //if (!check) {
      this.multilocationwisejobs.push(this.selectedCity);
      //}
    } else {
      this.multilocationwisejobs.push(this.selectedCity);
    }
    this.values.CityId = this.selectedCity.CityId;
    this.values.CityName = this.selectedCity.CityName;
    this.locationwisejobs.length = 0;
    this.locationwisejobs = [];
    this.appService.locationselect = true;
  }

  getSelectedOptionText(id: string) {
    this.selectedCityName = this.convertObservable.find((s) => s.CityName === id);
    if (this.locationwisejobs.length > 0 ) {
      // const check = this.locationExists(this.selectedCityName, this.locationwisejobs);
      // if (!check) {
      this.locationwisejobs.push(this.selectedCityName);
      //}
    } else{
      this.locationwisejobs.push(this.selectedCityName);
    }
    this.ngSelect.handleClearClick();
    this.appService.JobLocations = this.locationwisejobs;
    this.multilocationwisejobs = [];
    this.locationwithpostions.length = 0;
    this.locationwithpostions = [];
    this.appService.locationselect = false;
    //this.deletemLocation(1);
  }

  locationExists(loc, list) {
    return list.some(function (elem) {
      return elem.CityId === loc.CityId;
    });
  }

  mlocationExists(loc, list) {
    return list.some(function (elem) {
      return elem.CityId === loc.CityId;
    });
  }

  addArray() {
    if (this.noOfOpening != undefined && this.noOfOpening != "") {
      let locwithpostion = new Locationswithpostions();
      locwithpostion.CityId = this.values.CityId;
      locwithpostion.CityName = this.values.CityName;
      locwithpostion.Positons = this.noOfOpening;
      this.locationwithpostions.push(locwithpostion);
      this.appService.Locationswithpositions = this.locationwithpostions;
      this.appService.OpeningsList = this.openingsLists;
      this.noOfOpening = undefined;
      this.selectedCity = null;
      this.values = new Cities();
    }
  }

  ngOnInit() {
    this.populateLocationwiseJobs();
    this.populateCities();
    this.populatemultiCities();
    this.populateopenings();
    this.Remotework=this.appService.RemoteWork;
    this.appService.JobLocationsChanged.subscribe((cities: Cities[]) => {
      this.locationwisejobs = cities;
    });
    this.cities.subscribe((city) => {
      this.convertObservable = city as Cities[];
    });

    this.mcities.subscribe((mcity) => {
      this.mconvertObservable = mcity as MCities[];
    });

    // if (localStorage.getItem('jobId') != null) {
    //this.appService.currentlocation=;

    // }
  }
  // ngAfterViewInit() {
  //   this.appService.currentDraft.subscribe(x => this.isDrafted = x);
  //   this.disableLoc = (localStorage.getItem('EditMode') != null && this.isDrafted === false) ? true : false;
  // }
  // ngDoCheck(){
  //   this.Remotework = this.appService.RemoteWork;
  // }
  ngAfterViewChecked() {
    this.Remotework = this.appService.RemoteWork;
    this.appService.currentDraft.subscribe((x) => (this.isDrafted = x));
    if (this.disable == "true") {
      this.disableLoc = false;
    } else {
      this.disableLoc = localStorage.getItem("EditMode") != null && this.isDrafted === false ? true : false;
    }
  }
  ngOnDestroy() {}
}

export class Locationswithpostions {
  CityId: number;
  CityName: string;
  Positons: string;
}
