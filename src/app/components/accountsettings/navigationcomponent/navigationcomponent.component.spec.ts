import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationcomponentComponent } from './navigationcomponent.component';

describe('NavigationcomponentComponent', () => {
  let component: NavigationcomponentComponent;
  let fixture: ComponentFixture<NavigationcomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationcomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
