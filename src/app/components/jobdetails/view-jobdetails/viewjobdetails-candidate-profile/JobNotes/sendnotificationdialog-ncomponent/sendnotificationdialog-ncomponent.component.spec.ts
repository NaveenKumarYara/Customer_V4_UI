import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendnotificationdialogNcomponentComponent } from './sendnotificationdialog-ncomponent.component';

describe('SendnotificationdialogNcomponentComponent', () => {
  let component: SendnotificationdialogNcomponentComponent;
  let fixture: ComponentFixture<SendnotificationdialogNcomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendnotificationdialogNcomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendnotificationdialogNcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
