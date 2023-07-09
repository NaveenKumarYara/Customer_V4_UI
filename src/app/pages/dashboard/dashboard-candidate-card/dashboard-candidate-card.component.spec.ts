import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCandidateCardComponent } from './dashboard-candidate-card.component';

describe('DashboardCandidateCardComponent', () => {
  let component: DashboardCandidateCardComponent;
  let fixture: ComponentFixture<DashboardCandidateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCandidateCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCandidateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
