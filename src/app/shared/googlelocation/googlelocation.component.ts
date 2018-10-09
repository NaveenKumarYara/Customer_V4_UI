import { Component, OnInit, Output, EventEmitter, DoCheck } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';
import { ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';



@Component({
	selector: 'app-googlelocation',
	templateUrl: './googlelocation.component.html',
	styleUrls: ['./googlelocation.component.css'],
	providers: []
})

export class GooglelocationComponent implements OnInit, DoCheck {
	candidateDetails: any = [];
	profileDetails: any;
	cityname: any;
	statename: any;
	@ViewChild('search') public searchElement: ElementRef;
	@Output() childEvent = new EventEmitter<any>();
	searchText: any = '';
	constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private router: Router) { }
	ngDoCheck() {
		if (this.searchText === '') {
			this.childEvent.emit('');
		}
	}
	ngOnInit() {
		this.candidateDetails = JSON.parse(sessionStorage.getItem('userData'));
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