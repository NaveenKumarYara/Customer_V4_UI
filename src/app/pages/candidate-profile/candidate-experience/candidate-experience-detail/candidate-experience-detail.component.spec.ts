import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateExperienceDetailComponent } from './candidate-experience-detail.component';

describe('CandidateExperienceDetailComponent', () => {
  let component: CandidateExperienceDetailComponent;
  let fixture: ComponentFixture<CandidateExperienceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateExperienceDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateExperienceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
