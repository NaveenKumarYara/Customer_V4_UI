import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateProfileSummaryComponent } from './candidate-profile-summary.component';

describe('CandidateProfileSummaryComponent', () => {
  let component: CandidateProfileSummaryComponent;
  let fixture: ComponentFixture<CandidateProfileSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateProfileSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateProfileSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
