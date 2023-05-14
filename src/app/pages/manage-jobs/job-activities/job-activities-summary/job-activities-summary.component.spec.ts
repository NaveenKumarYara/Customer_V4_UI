import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobActivitiesSummaryComponent } from './job-activities-summary.component';

describe('JobActivitiesSummaryComponent', () => {
  let component: JobActivitiesSummaryComponent;
  let fixture: ComponentFixture<JobActivitiesSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobActivitiesSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobActivitiesSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
