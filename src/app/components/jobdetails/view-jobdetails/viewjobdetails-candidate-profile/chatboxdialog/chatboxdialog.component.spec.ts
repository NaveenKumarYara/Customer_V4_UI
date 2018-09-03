import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatboxdialogueComponent } from './chatboxdialogue.component';

describe('ChatboxdialogueComponent', () => {
  let component: ChatboxdialogueComponent;
  let fixture: ComponentFixture<ChatboxdialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatboxdialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatboxdialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
