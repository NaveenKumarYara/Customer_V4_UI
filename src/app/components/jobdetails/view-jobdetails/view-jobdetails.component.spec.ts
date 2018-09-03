import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJobdetailsComponent } from './view-jobdetails.component';

describe('ViewJobdetailsComponent', () => {
  let component: ViewJobdetailsComponent;
  let fixture: ComponentFixture<ViewJobdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewJobdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewJobdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
