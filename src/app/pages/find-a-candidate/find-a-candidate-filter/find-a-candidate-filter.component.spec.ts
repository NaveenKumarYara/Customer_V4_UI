import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindACandidateFilterComponent } from './find-a-candidate-filter.component';

describe('FindACandidateFilterComponent', () => {
  let component: FindACandidateFilterComponent;
  let fixture: ComponentFixture<FindACandidateFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindACandidateFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindACandidateFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
