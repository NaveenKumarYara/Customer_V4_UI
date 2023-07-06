import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSearchResultComponent } from './job-activities-filter-search-result.component';

describe('FilterSearchResultComponent', () => {
  let component: FilterSearchResultComponent;
  let fixture: ComponentFixture<FilterSearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterSearchResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
