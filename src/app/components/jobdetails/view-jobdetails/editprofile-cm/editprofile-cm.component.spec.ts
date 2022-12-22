import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprofileCmComponent } from './editprofile-cm.component';

describe('EditprofileCmComponent', () => {
  let component: EditprofileCmComponent;
  let fixture: ComponentFixture<EditprofileCmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditprofileCmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditprofileCmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
