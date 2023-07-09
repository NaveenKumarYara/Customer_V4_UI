import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardJobSharesComponent } from './dashboard-job-shares.component';

describe('DashboardJobSharesComponent', () => {
  let component: DashboardJobSharesComponent;
  let fixture: ComponentFixture<DashboardJobSharesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardJobSharesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardJobSharesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
