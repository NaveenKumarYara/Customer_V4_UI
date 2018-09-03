import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterViewJobsComponent } from './filter-view-jobs.component';

describe('FilterViewJobsComponent', () => {
  let component: FilterViewJobsComponent;
  let fixture: ComponentFixture<FilterViewJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterViewJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterViewJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
