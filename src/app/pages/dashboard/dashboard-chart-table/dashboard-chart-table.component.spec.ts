import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardChartTableComponent } from './dashboard-chart-table.component';

describe('DashboardChartTableComponent', () => {
  let component: DashboardChartTableComponent;
  let fixture: ComponentFixture<DashboardChartTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardChartTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardChartTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
