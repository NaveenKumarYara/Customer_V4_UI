import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFilterSearchResultComponent } from './manage-filter-search-result.component';

describe('ManageFilterSearchResultComponent', () => {
  let component: ManageFilterSearchResultComponent;
  let fixture: ComponentFixture<ManageFilterSearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageFilterSearchResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageFilterSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
