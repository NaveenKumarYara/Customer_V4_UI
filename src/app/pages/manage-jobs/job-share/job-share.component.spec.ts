import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobShareComponent } from './job-share.component';

describe('JobShareComponent', () => {
  let component: JobShareComponent;
  let fixture: ComponentFixture<JobShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobShareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
