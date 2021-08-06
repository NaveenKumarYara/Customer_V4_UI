import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarSmartChartComponent } from './radar-smart-chart.component';

describe('RadarSmartChartComponent', () => {
  let component: RadarSmartChartComponent;
  let fixture: ComponentFixture<RadarSmartChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadarSmartChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadarSmartChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
