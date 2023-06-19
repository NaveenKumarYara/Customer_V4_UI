import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindACandidateComponent } from './find-a-candidate.component';

describe('FindACandidateComponent', () => {
  let component: FindACandidateComponent;
  let fixture: ComponentFixture<FindACandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindACandidateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindACandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
