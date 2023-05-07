import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTotalJobsComponent } from './dashboard-total-jobs.component';

describe('DashboardTotalJobsComponent', () => {
  let component: DashboardTotalJobsComponent;
  let fixture: ComponentFixture<DashboardTotalJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardTotalJobsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTotalJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
