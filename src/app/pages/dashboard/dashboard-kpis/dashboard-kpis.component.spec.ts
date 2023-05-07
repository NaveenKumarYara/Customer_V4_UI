import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardKpisComponent } from './dashboard-kpis.component';

describe('DashboardKpisComponent', () => {
  let component: DashboardKpisComponent;
  let fixture: ComponentFixture<DashboardKpisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardKpisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardKpisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
