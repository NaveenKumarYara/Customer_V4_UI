import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateProfileDetailComponent } from './candidate-profile-detail.component';

describe('CandidateProfileDetailComponent', () => {
  let component: CandidateProfileDetailComponent;
  let fixture: ComponentFixture<CandidateProfileDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateProfileDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateProfileDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
