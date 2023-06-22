import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsibilitiesDialogComponent } from './responsibilities-dialog.component';

describe('ResponsibilitiesDialogComponent', () => {
  let component: ResponsibilitiesDialogComponent;
  let fixture: ComponentFixture<ResponsibilitiesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsibilitiesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsibilitiesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
