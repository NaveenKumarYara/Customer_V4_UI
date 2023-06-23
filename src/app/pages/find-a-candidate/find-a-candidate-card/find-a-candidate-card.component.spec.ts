import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindACandidateCardComponent } from './find-a-candidate-card.component';

describe('FindACandidateCardComponent', () => {
  let component: FindACandidateCardComponent;
  let fixture: ComponentFixture<FindACandidateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindACandidateCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindACandidateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
