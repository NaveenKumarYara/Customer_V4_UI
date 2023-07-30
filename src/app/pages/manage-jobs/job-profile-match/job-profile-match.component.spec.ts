import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobProfileMatchComponent } from './job-profile-match.component';

describe('JobProfileMatchComponent', () => {
  let component: JobProfileMatchComponent;
  let fixture: ComponentFixture<JobProfileMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobProfileMatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobProfileMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
