import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobReviewComponent } from './job-review.component';

describe('JobReviewComponent', () => {
  let component: JobReviewComponent;
  let fixture: ComponentFixture<JobReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
