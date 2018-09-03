import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRecentApplicationsComponent } from './dashboard-recent-applications.component';

describe('DashboardRecentApplicationsComponent', () => {
  let component: DashboardRecentApplicationsComponent;
  let fixture: ComponentFixture<DashboardRecentApplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardRecentApplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardRecentApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
