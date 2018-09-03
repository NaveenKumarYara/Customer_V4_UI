import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardActivejobsComponent } from './dashboard-activejobs.component';

describe('DashboardActivejobsComponent', () => {
  let component: DashboardActivejobsComponent;
  let fixture: ComponentFixture<DashboardActivejobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardActivejobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardActivejobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
