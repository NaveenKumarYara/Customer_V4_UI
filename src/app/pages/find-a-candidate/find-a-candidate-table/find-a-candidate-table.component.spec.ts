import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindACandidateTableComponent } from './find-a-candidate-table.component';

describe('FindACandidateTableComponent', () => {
  let component: FindACandidateTableComponent;
  let fixture: ComponentFixture<FindACandidateTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindACandidateTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindACandidateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
