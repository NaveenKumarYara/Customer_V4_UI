import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorManagerComponent } from './vendor-manager.component';

describe('VendorManagerComponent', () => {
  let component: VendorManagerComponent;
  let fixture: ComponentFixture<VendorManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
