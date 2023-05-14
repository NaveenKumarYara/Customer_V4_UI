import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsActivitiesNavComponent } from './jobs-activities-nav.component';

describe('JobsActivitiesNavComponent', () => {
  let component: JobsActivitiesNavComponent;
  let fixture: ComponentFixture<JobsActivitiesNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsActivitiesNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsActivitiesNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
