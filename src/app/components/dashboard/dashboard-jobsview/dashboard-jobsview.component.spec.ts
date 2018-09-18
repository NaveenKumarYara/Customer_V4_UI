import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardJobsviewComponent } from './dashboard-jobsview.component';

describe('DashboardJobsviewComponent', () => {
  let component: DashboardJobsviewComponent;
  let fixture: ComponentFixture<DashboardJobsviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardJobsviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardJobsviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
