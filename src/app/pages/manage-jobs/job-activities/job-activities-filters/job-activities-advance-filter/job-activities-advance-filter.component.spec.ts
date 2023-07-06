import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAdvanceFilterComponent } from './manage-advance-filter.component';

describe('ManageAdvanceFilterComponent', () => {
  let component: ManageAdvanceFilterComponent;
  let fixture: ComponentFixture<ManageAdvanceFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAdvanceFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAdvanceFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
