import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedialogueComponent } from './sharedialogue.component';

describe('SharedialogueComponent', () => {
  let component: SharedialogueComponent;
  let fixture: ComponentFixture<SharedialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
