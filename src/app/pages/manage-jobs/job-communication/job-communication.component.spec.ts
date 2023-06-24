import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCommunicationComponent } from './job-communication.component';

describe('JobCommunicationComponent', () => {
  let component: JobCommunicationComponent;
  let fixture: ComponentFixture<JobCommunicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobCommunicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
