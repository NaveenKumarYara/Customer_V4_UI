import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindACandidateGridComponent } from './find-a-candidate-grid.component';

describe('FindACandidateGridComponent', () => {
  let component: FindACandidateGridComponent;
  let fixture: ComponentFixture<FindACandidateGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindACandidateGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindACandidateGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
