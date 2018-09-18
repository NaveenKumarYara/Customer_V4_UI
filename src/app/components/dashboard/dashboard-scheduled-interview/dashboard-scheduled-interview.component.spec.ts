import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardScheduledInterviewComponent } from './dashboard-scheduled-interview.component';

describe('DashboardScheduledInterviewComponent', () => {
  let component: DashboardScheduledInterviewComponent;
  let fixture: ComponentFixture<DashboardScheduledInterviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardScheduledInterviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardScheduledInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
