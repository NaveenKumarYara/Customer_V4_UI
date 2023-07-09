import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardJobCardComponent } from './dashboard-job-card.component';

describe('DashboardJobCardComponent', () => {
  let component: DashboardJobCardComponent;
  let fixture: ComponentFixture<DashboardJobCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardJobCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardJobCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
