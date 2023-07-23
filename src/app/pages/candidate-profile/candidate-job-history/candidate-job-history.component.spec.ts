import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateJobHistoryComponent } from './candidate-job-history.component';

describe('CandidateJobHistoryComponent', () => {
  let component: CandidateJobHistoryComponent;
  let fixture: ComponentFixture<CandidateJobHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateJobHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateJobHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
