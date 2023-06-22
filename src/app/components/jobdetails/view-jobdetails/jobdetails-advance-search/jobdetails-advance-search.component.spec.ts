import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobdetailsAdvanceSearchComponent } from './jobdetails-advance-search.component';

describe('JobdetailsAdvanceSearchComponent', () => {
  let component: JobdetailsAdvanceSearchComponent;
  let fixture: ComponentFixture<JobdetailsAdvanceSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobdetailsAdvanceSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobdetailsAdvanceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
