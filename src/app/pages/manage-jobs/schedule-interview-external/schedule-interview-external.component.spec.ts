import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleInterviewExternalComponent } from './schedule-interview-external.component';

describe('ScheduleInterviewExternalComponent', () => {
  let component: ScheduleInterviewExternalComponent;
  let fixture: ComponentFixture<ScheduleInterviewExternalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleInterviewExternalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleInterviewExternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
