import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageJobFiltersComponent } from './manage-job-filters.component';

describe('ManageJobFiltersComponent', () => {
  let component: ManageJobFiltersComponent;
  let fixture: ComponentFixture<ManageJobFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageJobFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageJobFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
