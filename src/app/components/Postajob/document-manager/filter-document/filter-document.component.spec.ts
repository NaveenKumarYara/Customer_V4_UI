import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDocumentComponent } from './filter-document.component';

describe('FilterDocumentComponent', () => {
  let component: FilterDocumentComponent;
  let fixture: ComponentFixture<FilterDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
