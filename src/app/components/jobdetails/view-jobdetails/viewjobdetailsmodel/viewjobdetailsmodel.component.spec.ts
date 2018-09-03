import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewjobdetailsmodelComponent } from './viewjobdetailsmodel.component';

describe('ViewjobdetailsmodelComponent', () => {
  let component: ViewjobdetailsmodelComponent;
  let fixture: ComponentFixture<ViewjobdetailsmodelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewjobdetailsmodelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewjobdetailsmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
