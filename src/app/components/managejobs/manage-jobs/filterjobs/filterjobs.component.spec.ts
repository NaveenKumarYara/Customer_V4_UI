import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterjobsComponent } from './filterjobs.component';

describe('FilterjobsComponent', () => {
  let component: FilterjobsComponent;
  let fixture: ComponentFixture<FilterjobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterjobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterjobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
