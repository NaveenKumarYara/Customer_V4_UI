import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatemanagerComponent } from './candidatemanager.component';

describe('CandidatemanagerComponent', () => {
  let component: CandidatemanagerComponent;
  let fixture: ComponentFixture<CandidatemanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidatemanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatemanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
