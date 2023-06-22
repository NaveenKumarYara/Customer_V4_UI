import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatedetailviewComponent } from './candidatedetailview.component';

describe('CandidatedetailviewComponent', () => {
  let component: CandidatedetailviewComponent;
  let fixture: ComponentFixture<CandidatedetailviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidatedetailviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatedetailviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
