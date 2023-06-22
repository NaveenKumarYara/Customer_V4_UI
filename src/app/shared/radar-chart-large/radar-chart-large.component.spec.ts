import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarChartLargeComponent } from './radar-chart-large.component';

describe('RadarChartLargeComponent', () => {
  let component: RadarChartLargeComponent;
  let fixture: ComponentFixture<RadarChartLargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadarChartLargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadarChartLargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
