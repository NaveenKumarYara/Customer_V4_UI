import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobShareProfileComponent } from './job-share-profile.component';

describe('JobShareProfileComponent', () => {
  let component: JobShareProfileComponent;
  let fixture: ComponentFixture<JobShareProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobShareProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobShareProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
