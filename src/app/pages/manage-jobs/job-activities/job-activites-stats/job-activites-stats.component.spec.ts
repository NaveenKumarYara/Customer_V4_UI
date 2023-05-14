import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobActivitesStatsComponent } from './job-activites-stats.component';

describe('JobActivitesStatsComponent', () => {
  let component: JobActivitesStatsComponent;
  let fixture: ComponentFixture<JobActivitesStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobActivitesStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobActivitesStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
