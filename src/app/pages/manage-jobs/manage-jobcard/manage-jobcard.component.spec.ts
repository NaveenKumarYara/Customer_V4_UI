import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageJobcardComponent } from './manage-jobcard.component';

describe('ManageJobcardComponent', () => {
  let component: ManageJobcardComponent;
  let fixture: ComponentFixture<ManageJobcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageJobcardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageJobcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
