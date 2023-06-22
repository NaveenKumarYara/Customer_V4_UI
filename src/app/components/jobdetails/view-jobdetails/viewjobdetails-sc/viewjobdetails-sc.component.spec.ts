import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewjobdetailsScComponent } from './viewjobdetails-sc.component';

describe('ViewjobdetailsScComponent', () => {
  let component: ViewjobdetailsScComponent;
  let fixture: ComponentFixture<ViewjobdetailsScComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewjobdetailsScComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewjobdetailsScComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
