import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTopPerformingJobsComponent } from './dashboard-top-performing-jobs.component';

describe('DashboardTopPerformingJobsComponent', () => {
  let component: DashboardTopPerformingJobsComponent;
  let fixture: ComponentFixture<DashboardTopPerformingJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardTopPerformingJobsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTopPerformingJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
