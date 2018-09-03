import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRecentjobsComponent } from './dashboard-recentjobs.component';

describe('DashboardRecentjobsComponent', () => {
  let component: DashboardRecentjobsComponent;
  let fixture: ComponentFixture<DashboardRecentjobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardRecentjobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardRecentjobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
