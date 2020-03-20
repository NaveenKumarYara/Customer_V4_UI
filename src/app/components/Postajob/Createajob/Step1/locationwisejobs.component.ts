import { Component, OnInit, Inject, OnDestroy, AfterViewInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { Subscription } from 'rxjs/Subscription';
import { PrefLocation, Cities } from '../../models/jobPostInfo';
import { Subject, Observable } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { concat } from 'rxjs/observable/concat';

@Component({
  selector: 'app-steps-step2-locationwisejobs',
  templateUrl: './locationwisejobs.component.html'
})

export class LocationwiseJobsComponent implements OnInit, AfterViewChecked, OnDestroy {

  locationwisejobs: Cities[];
// location: string;
customer: any;
customerId: any;
userId: any;
cities: Observable<Cities[]>;
selectedCityInput = new Subject<string>();
cityloading = false;
prfLoc = new PrefLocation();
convertObservable: Cities[];
selectedCityName: Cities;
disable:any;
disableLoc = false;
isDrafted: boolean;
  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {
      this.customer = JSON.parse(sessionStorage.getItem('userData'));
      this.customerId = this.customer.CustomerId;
      this.userId = this.customer.UserId;
      this.disable =  localStorage.getItem('Item');
  }

  selectLocation(loc) {
  // this.location = loc;
  this.prfLoc.CityId = loc.CityId;  // as changes suggested by anil PreferredLocationId by cityid
  this.prfLoc.location = loc.CityName;
  this.appService.updateLocation(this.prfLoc);
  this.getSelectedOptionText(null);
  this.selectedCityName=null;
    // console.log(loc);
  }

  populateLocationwiseJobs() {
    this.appService.getLocationwisejobs(this.customerId).subscribe(res => { // , this.userId
      this.locationwisejobs = res;
      this.appService.JobLocations = this.locationwisejobs;
      const check = this.locationExists(this.prfLoc, this.locationwisejobs);
    if (!check && this.prfLoc.CityId > 0 ) {
      this.selectedCityName = new Cities();
      this.selectedCityName.CityId = this.prfLoc.CityId;
      this.selectedCityName.CityName = this.prfLoc.location;
      this.locationwisejobs.push(this.selectedCityName);
    }
    });
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
        tap(() => this.cityloading = true),
        switchMap(term => this.appService.getCities(term).pipe(
          catchError(() => of([])), // empty list on error
          tap(() => this.cityloading = false)
        ))
      )
    );
  }

  deleteLocation(index)
  {
    this.locationwisejobs.splice(index,1);
  }


  getSelectedOptionText(id: number) {
    this.selectedCityName = this.convertObservable.find(s => s.CityId === id);
    if (this.locationwisejobs.length > 0) {
    const check = this.locationExists(this.selectedCityName, this.locationwisejobs);
    if (!check) {
      this.locationwisejobs.push(this.selectedCityName);
    }
  } else {

    this.locationwisejobs.push(this.selectedCityName);
  }
 
  this.appService.JobLocations = this.locationwisejobs;
  //this.selectLocation(this.selectedCityName);

   }

   locationExists(loc, list) {​
    return list.some(function(elem) {
         return elem.CityId === loc.CityId;
    });
  }
  ngOnInit() {
    this.populateLocationwiseJobs();
    this.populateCities();
    this.cities.subscribe(city => {
      this.convertObservable = city as Cities[];
    });
    // if (localStorage.getItem('jobId') != null) {
    this.appService.currentlocation.subscribe(x => this.prfLoc = x);

    // }
  }
// ngAfterViewInit() {
//   this.appService.currentDraft.subscribe(x => this.isDrafted = x);
//   this.disableLoc = (localStorage.getItem('EditMode') != null && this.isDrafted === false) ? true : false;
// }
ngAfterViewChecked() {
  this.appService.currentDraft.subscribe(x => this.isDrafted = x);
  if(this.disable == "true")
  {
    this.disableLoc = false;
  }
  else 
  {
    this.disableLoc = (localStorage.getItem('EditMode') != null && this.isDrafted === false) ? true : false;
  }
 
}
  ngOnDestroy() {
  }
}
