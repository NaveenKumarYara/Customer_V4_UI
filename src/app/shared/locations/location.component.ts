import { Component, OnInit, Output, EventEmitter, DoCheck } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
//import { } from '@types/googlemaps';
import { ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';
import { CompanyProfile } from '../../../models/companyprofile';
import { CompanyProfileService } from '../../components/company-profile/company-profile.service';


@Component({
	selector: 'app-location',
	templateUrl: './location.component.html',
	styleUrls: ['./location.component.css'],
	providers: []
})

export class locationComponent implements OnInit, DoCheck {
	candidateDetails: any = [];
	profileDetails: any;
	cityname: any;
	statename: any;
	customer:any;
    customerId:any;
    userId:any;
    companyprofile: CompanyProfile;
	@ViewChild('search') public searchElement: ElementRef;
	@Output() childEvent = new EventEmitter<any>();
	searchText: any = '';
	constructor(private mapsAPILoader: MapsAPILoader,  private companyprofileservice: CompanyProfileService,private ngZone: NgZone, private router: Router) { 
		this.customer = JSON.parse(sessionStorage.getItem('userData'));
        this.customerId =this.customer.CustomerId;
	}
	ngDoCheck() {
		if (this.searchText === '') {
			this.childEvent.emit('');
		}
	}
	ngOnInit() {
		//this.candidateDetails = JSON.parse(sessionStorage.getItem('userData'));
		this.mapsAPILoader.load().then(
			() => {
				const autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: ['(regions)'] });
				autocomplete.setComponentRestrictions({ 'country': ['us'] });
				autocomplete.addListener('place_changed', () => {
					this.ngZone.run(() => {
						const place: google.maps.places.PlaceResult = autocomplete.getPlace();
						console.log(place.address_components[0].short_name);
						this.childEvent.emit(place.address_components[0].short_name);
						if (place.geometry === undefined || place.geometry === null) {
							return;
						}
					});
				});
				
			});
	
	}



}