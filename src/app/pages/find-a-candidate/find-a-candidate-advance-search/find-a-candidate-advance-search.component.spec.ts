import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindACandidateAdvanceSearchComponent } from './find-a-candidate-advance-search.component';

describe('FindACandidateAdvanceSearchComponent', () => {
  let component: FindACandidateAdvanceSearchComponent;
  let fixture: ComponentFixture<FindACandidateAdvanceSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindACandidateAdvanceSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindACandidateAdvanceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
