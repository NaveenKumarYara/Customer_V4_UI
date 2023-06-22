import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewjobdetailsCandidateProfileComponent } from './viewjobdetails-candidate-profile.component';

describe('ViewjobdetailsCandidateProfileComponent', () => {
  let component: ViewjobdetailsCandidateProfileComponent;
  let fixture: ComponentFixture<ViewjobdetailsCandidateProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewjobdetailsCandidateProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewjobdetailsCandidateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
