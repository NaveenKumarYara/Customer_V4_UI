import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GooglelocationComponent } from './googlelocation.component';

describe('GoogleLocationComponent', () => {
	let component: GooglelocationComponent;
	let fixture: ComponentFixture<GooglelocationComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [GooglelocationComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(GooglelocationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
