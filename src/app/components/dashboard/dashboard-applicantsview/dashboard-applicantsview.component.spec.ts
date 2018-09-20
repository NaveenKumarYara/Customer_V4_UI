
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardApplicantsviewComponent  } from './dashboard-applicantsview.component';

describe('DashboardApplicantsviewComponent', () => {
  let component:DashboardApplicantsviewComponent ;
  let fixture: ComponentFixture<DashboardApplicantsviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardApplicantsviewComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardApplicantsviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
