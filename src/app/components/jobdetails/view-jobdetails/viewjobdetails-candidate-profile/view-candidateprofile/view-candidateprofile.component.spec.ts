import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCandidateprofileComponent } from './view-candidateprofile.component';

describe('ViewCandidateprofileComponent', () => {
  let component: ViewCandidateprofileComponent;
  let fixture: ComponentFixture<ViewCandidateprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCandidateprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCandidateprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
